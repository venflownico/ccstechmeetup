import { limpiarBusquedas } from "@/lib/busquedas-2027";
import { formatos2027 } from "@/lib/site";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_VISITS = 30;
const MAX_NOTICES = 5;
const visitHits = new Map<string, number[]>();
const noticeHits = new Map<string, number[]>();

const FORMATS = formatos2027.filter((f) => f.visible).map((f) => f.id);
const ROLES = ["founder", "inversionista", "startup", "marca", "estudiante", "otro"];

function rateLimit(store: Map<string, number[]>, ip: string, max: number) {
  const now = Date.now();
  const recent = (store.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= max) {
    store.set(ip, recent);
    return false;
  }
  recent.push(now);
  store.set(ip, recent);
  return true;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanOrigin(value: unknown) {
  const text = String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 24);
  return text || "directo";
}

function cleanFormats(value: unknown) {
  if (!Array.isArray(value)) return [];
  return FORMATS.filter((id) => value.includes(id));
}

// Accepts an array (current) or a single string (old clients), keeps only known ids.
function cleanSearch(value: unknown) {
  return limpiarBusquedas(value);
}

async function forwardToWebhook(payload: Record<string, unknown>) {
  const url = process.env.INTEREST_WEBHOOK_URL;
  if (!url) {
    return false;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secreto: process.env.INTEREST_WEBHOOK_SECRET ?? "",
        fecha: new Date().toISOString(),
        ...payload,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      console.error("Interest webhook failed", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Interest webhook error", error);
    return false;
  }
}

async function notifySlack(options: {
  role: string;
  formats: string[];
  all: boolean;
  origin: string;
  search: string[];
  email: string;
}) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    return false;
  }

  const mention = process.env.SLACK_MENTION_USER_ID || "U097WQWPUTV";
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          `<@${mention}> Nuevo aviso 2027 — Caracas Tech Meetup`,
          `*Rol:* ${options.role}`,
          `*Formatos:* ${options.all ? "todos" : options.formats.join(", ")}`,
          `*Origen:* ${options.origin}`,
          `*Busca:* ${options.search.length ? options.search.join(", ") : "no eligió"}`,
          `*Email:* ${options.email}`,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("Slack webhook failed", response.status, detail);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Slack webhook error", error);
    return false;
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // sendBeacon can arrive as text/plain, so read the raw text and parse it ourselves.
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(await request.text());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "JSON inválido." }, { status: 400 });
  }

  const origin = cleanOrigin(body.origen);
  const search = cleanSearch(body.busca);

  if (body.tipo === "visita") {
    if (!rateLimit(visitHits, ip, MAX_VISITS)) {
      return Response.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });
    }
    const seconds = Math.min(3600, Math.max(0, Math.trunc(Number(body.segundos) || 0)));
    await forwardToWebhook({
      tipo: "visita",
      origen: origin,
      volteadas: cleanFormats(body.volteadas),
      marcadas: cleanFormats(body.marcadas),
      segundos: seconds,
      busca: search,
    });
    return new Response(null, { status: 204 });
  }

  if (body.tipo === "aviso") {
    if (typeof body.website === "string" && body.website.trim()) {
      return Response.json({ ok: true });
    }

    const email = String(body.email ?? "").trim();
    const role = String(body.rol ?? "").trim();
    const all = body.todos === true;
    const formats = all ? FORMATS : cleanFormats(body.formatos);

    if (!email || !isEmail(email) || email.length > 200) {
      return Response.json({ error: "Revisa tu correo." }, { status: 400 });
    }
    if (!ROLES.includes(role)) {
      return Response.json({ error: "Elige qué haces." }, { status: 400 });
    }
    if (formats.length === 0) {
      return Response.json({ error: "Marca al menos un formato." }, { status: 400 });
    }

    if (!rateLimit(noticeHits, ip, MAX_NOTICES)) {
      return Response.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });
    }

    const [saved, slacked] = await Promise.all([
      forwardToWebhook({ tipo: "aviso", origen: origin, email, rol: role, formatos: formats, todos: all, busca: search }),
      notifySlack({ role, formats, all, origin, search, email }),
    ]);

    if (!saved && !slacked) {
      console.error("Interest notice delivery failed: no webhook or Slack channel worked");
      return Response.json(
        { error: "No pudimos guardar tu aviso. Intenta de nuevo en un rato." },
        { status: 503 },
      );
    }

    return Response.json({ ok: true });
  }

  return Response.json({ error: "Solicitud inválida." }, { status: 400 });
}
