# Caracas Tech Meetup

Sitio oficial de [ccstechmeetup.com](https://ccstechmeetup.com): landing para la comunidad (eventos en Luma, Instagram) y página `/patrocinar` para marcas.

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

La agenda se carga desde el calendario público de Luma (`cal-u2swYaAgKESq0h1`) y muestra próximos y pasados. Si la API no responde, el sitio cae al iframe. Si Luma rota el ID, actualiza `lib/luma.ts` y `NEXT_PUBLIC_LUMA_EMBED_URL`.

## Publicar (GitHub + Railway)

El commit inicial ya está en `main`. Desde esta carpeta:

```bash
# Repo en la cuenta venflownico
gh repo create venflownico/ccstechmeetup --public --source=. --remote=origin --push

# Proyecto en Railway (sesión ya autenticada como venflow)
railway init --name ccstechmeetup
railway up
railway variable set SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
railway variable set SLACK_MENTION_USER_ID=U097WQWPUTV
railway domain
```

Luego en Railway: **Settings → Networking → Custom Domain** → `ccstechmeetup.com` y `www`.

1. Railway detecta el `Dockerfile`
2. Custom domain: `ccstechmeetup.com` y `www.ccstechmeetup.com`

## DNS en GoDaddy

Cuando Railway te dé el dominio de servicio (algo como `xxx.up.railway.app`):

1. **www** → `CNAME` a `xxx.up.railway.app`
2. **@ (apex)** → registros que Railway muestre para el dominio raíz (ALIAS/ANAME o A). Railway documenta los valores exactos en **Settings → Networking → Custom Domain**

Propaga y espera el certificado TLS.

## Contenido editable

Copy, precios, logos, métricas y equipo viven en `lib/site.ts`. Logos en `public/sponsors/`, fotos en `public/team/`. El formulario de patrocinio está en `/patrocinar`.
