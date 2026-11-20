import { formatos2027 } from "@/lib/site";

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

const INTERESES = {
  principal: "Patrocinador principal",
  formato: "Patrocinador de un formato",
  especie: "Aporte en especie",
} as const;

type Interes = keyof typeof INTERESES;

function isInteres(value: unknown): value is Interes {
  return typeof value === "string" && Object.hasOwn(INTERESES, value);
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
  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  const interes = body.interes;
  const formatoId = body.formato;

  if (!name || !company || !email || !phone) {
    return Response.json({ error: "Completa nombre, empresa, email y teléfono." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Email inválido." }, { status: 400 });
  }

  if (!isInteres(interes)) {
    return Response.json({ error: "Selecciona un interés válido." }, { status: 400 });
  }

  let formato: (typeof formatos2027)[number] | undefined;
  if (interes === "formato") {
    formato = formatos2027.find((f) => f.visible && f.id === formatoId);
    if (!formato) {
      return Response.json({ error: "Selecciona un formato válido." }, { status: 400 });
    }
  }

  const webhook = process.env.SLACK_WEBHOOK_URL;
  const mention = process.env.SLACK_MENTION_USER_ID || "U097WQWPUTV";

  if (!webhook) {
    console.error("Missing SLACK_WEBHOOK_URL");
    return Response.json(
      { error: "El canal de patrocinio no está configurado todavía." },
      { status: 500 },
    );
  }

  const text = [
    `<@${mention}> Nuevo interés de patrocinio — Caracas Tech Meetup`,
    `*Empresa:* ${company}`,
    `*Contacto:* ${name}`,
    `*Email:* ${email}`,
    `*Teléfono:* ${phone}`,
    `*Interés:* ${INTERESES[interes]}${formato ? ` (${formato.palabra})` : ""}`,
    message ? `*Mensaje:* ${message}` : "*Mensaje:* (sin notas)",
  ].join("\n");

  const slackResponse = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!slackResponse.ok) {
    const detail = await slackResponse.text();
    console.error("Slack webhook failed", slackResponse.status, detail);
    return Response.json({ error: "No se pudo notificar a Slack." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
