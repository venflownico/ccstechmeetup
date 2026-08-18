# Caracas Tech Meetup

Sitio oficial de [ccstechmeetup.com](https://ccstechmeetup.com): eventos en Luma, logos de sponsors y captación de patrocinio.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Magic UI + shadcn/ui
- Slack Incoming Webhook para leads de patrocinio
- Railway + Docker (`output: "standalone"`)

## Desarrollo

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `SLACK_WEBHOOK_URL` | Incoming Webhook de Slack (requerido para el formulario) |
| `SLACK_MENTION_USER_ID` | Usuario a mencionar. Default: `U097WQWPUTV` (Nicolas) |
| `NEXT_PUBLIC_LUMA_EMBED_URL` | Iframe del calendario. Default: calendario `ccstech_` |

### Slack

1. En el workspace de Venflow: **Apps → Incoming Webhooks → Add New Webhook**
2. Elige un canal (por ejemplo `#caracas-tech`)
3. Pega la URL en Railway como `SLACK_WEBHOOK_URL`

### Luma

El embed actual es `https://luma.com/embed/calendar/cal-u2swYaAgKESq0h1/events?lt=dark`. Si Luma rota el ID: Calendar → Settings → Embed.

## Deploy (Railway)

1. Crea un servicio desde este repo
2. Railway detecta el `Dockerfile`
3. Configura las env vars
4. Custom domain: `ccstechmeetup.com` y `www.ccstechmeetup.com`

## DNS en GoDaddy

Cuando Railway te dé el dominio de servicio (algo como `xxx.up.railway.app`):

1. **www** → `CNAME` a `xxx.up.railway.app`
2. **@ (apex)** → registros que Railway muestre para el dominio raíz (ALIAS/ANAME o A). Railway documenta los valores exactos en **Settings → Networking → Custom Domain**

Propaga y espera el certificado TLS.

## Contenido editable

Copy, precios, logos y equipo viven en `lib/site.ts`. Logos en `public/sponsors/`, fotos en `public/team/`.
