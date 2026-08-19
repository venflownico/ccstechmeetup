import { providerEmailFor } from "@/lib/resource-providers";
import { getFounderResource, isFounderResourceId } from "@/lib/resources";

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

  const resourceId = body.resourceId;
  const name = String(body.name ?? "").trim();
  const fromEmail = String(body.email ?? "").trim();
  const startup = String(body.startup ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!isFounderResourceId(resourceId)) {
    return Response.json({ error: "Selecciona un recurso válido." }, { status: 400 });
  }

  if (!name || !fromEmail || !startup || !message) {
    return Response.json({ error: "Completa nombre, email, startup y mensaje." }, { status: 400 });
  }

  if (!isEmail(fromEmail)) {
    return Response.json({ error: "Email inválido." }, { status: 400 });
  }

  if (message.length > 4000) {
    return Response.json({ error: "El mensaje es demasiado largo." }, { status: 400 });
  }

  const resource = getFounderResource(resourceId);
  if (!resource) {
    return Response.json({ error: "Selecciona un recurso válido." }, { status: 400 });
  }

  const provider = providerEmailFor(resourceId);
  const fallback = process.env.CONTACT_EMAIL ?? "";
  const to = [provider, fallback].filter(Boolean);
  const uniqueTo = [...new Set(to)];

  const apiKey = process.env.RESEND_API_KEY;
  const webhook = process.env.SLACK_WEBHOOK_URL;
  const mention = process.env.SLACK_MENTION_USER_ID || "U097WQWPUTV";
  const from =
    process.env.CONTACT_FROM ?? "Caracas Tech Meetup <beth.t@example.com>";

  const text = [
    `Solicitud de recurso — ${resource.name} (${resource.offer})`,
    `*Founder:* ${name}`,
    `*Email:* ${fromEmail}`,
    `*Startup:* ${startup}`,
    `*Mensaje:* ${message}`,
  ].join("\n");

  let emailed = false;
  let slacked = false;

  if (apiKey && uniqueTo.length > 0) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: uniqueTo,
        reply_to: fromEmail,
        subject: `Recurso CCS Tech Meetup — ${resource.name} · ${startup}`,
        text: [
          `Recurso: ${resource.name} — ${resource.offer}`,
          `Founder: ${name}`,
          `Email: ${fromEmail}`,
          `Startup: ${startup}`,
          "",
          message,
        ].join("\n"),
      }),
    });
    emailed = response.ok;
    if (!response.ok) {
      console.error("Resend failed", response.status, await response.text());
    }
  }

  if (webhook) {
    const slackResponse = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [`<@${mention}> ${text}`].join("\n"),
      }),
    });
    slacked = slackResponse.ok;
    if (!slackResponse.ok) {
      console.error("Slack webhook failed", slackResponse.status, await slackResponse.text());
    }
  }

  if (!emailed && !slacked) {
    return Response.json(
      { error: "No se pudo enviar la solicitud. Intenta más tarde." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true });
}
