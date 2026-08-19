export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendEmail(options: {
  name: string;
  fromEmail: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    return false;
  }

  const from =
    process.env.CONTACT_FROM ?? "Caracas Tech Meetup <beth.t@example.com>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: options.fromEmail,
      subject: `Contacto CCS Tech Meetup — ${options.name}`,
      text: [
        `Nombre: ${options.name}`,
        `Email: ${options.fromEmail}`,
        "",
        options.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("Resend failed", response.status, detail);
    return false;
  }

  return true;
}

async function notifySlack(options: {
  name: string;
  fromEmail: string;
  message: string;
}) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    return false;
  }

  const mention = process.env.SLACK_MENTION_USER_ID || "U097WQWPUTV";
  const slackResponse = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: [
        `<@${mention}> Nuevo mensaje de contacto — Caracas Tech Meetup`,
        `*Nombre:* ${options.name}`,
        `*Email:* ${options.fromEmail}`,
        `*Mensaje:* ${options.message}`,
      ].join("\n"),
    }),
  });

  if (!slackResponse.ok) {
    const detail = await slackResponse.text();
    console.error("Slack webhook failed", slackResponse.status, detail);
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return Response.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const fromEmail = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !fromEmail || !message) {
    return Response.json({ error: "Completa nombre, email y mensaje." }, { status: 400 });
  }

  if (!isEmail(fromEmail)) {
    return Response.json({ error: "Email inválido." }, { status: 400 });
  }

  if (message.length > 4000) {
    return Response.json({ error: "El mensaje es demasiado largo." }, { status: 400 });
  }

  const [emailed, slacked] = await Promise.all([
    sendEmail({ name, fromEmail, message }),
    notifySlack({ name, fromEmail, message }),
  ]);

  if (!emailed && !slacked) {
    console.error("Contact delivery failed: no email or Slack channel configured");
    return Response.json(
      { error: "No se pudo enviar el mensaje. Intenta por Instagram." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
