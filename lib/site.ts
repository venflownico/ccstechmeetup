export const site = {
  name: "Caracas Tech Meetup",
  shortName: "CCS Tech Meetup",
  domain: "ccstechmeetup.com",
  url: "https://ccstechmeetup.com",
  tagline: "Por el ecosistema, para el ecosistema.",
  description:
    "Encuentro mensual del ecosistema tech y startups de Venezuela. Conecta, aprende y construye junto a founders, builders e inversionistas.",
  instagram: "https://www.instagram.com/caracastech_meetup/",
  instagramHandle: "@caracastech_meetup",
  instagramFollowersK: 4.6,
  lumaCalendarUrl: "https://luma.com/ccstech_",
  lumaEmbedUrl:
    process.env.NEXT_PUBLIC_LUMA_EMBED_URL ??
    "https://luma.com/embed/calendar/cal-u2swYaAgKESq0h1/events?lt=dark",
  sponsorshipCalendlyUrl:
    "https://calendly.com/venflow/ccs-tech-meetup-sponsorships",
} as const;

export function sponsorshipCallUrl(prefill?: { name?: string; email?: string }) {
  const url = new URL(site.sponsorshipCalendlyUrl);
  if (prefill?.name) url.searchParams.set("name", prefill.name);
  if (prefill?.email) url.searchParams.set("email", prefill.email);
  return url.toString();
}

export const navItems = [
  { href: "/#eventos", label: "Eventos" },
  { href: "/#como-asistir", label: "Cómo asistir" },
  { href: "/#por-que", label: "Por qué" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/2027", label: "2027" },
] as const;

export const stats = [
  {
    value: 3000,
    suffix: "+",
    decimalPlaces: 0,
    label: "miembros de la comunidad que han asistido",
  },
  {
    value: 4.6,
    suffix: "k+",
    decimalPlaces: 1,
    label: "seguidores en Instagram",
  },
  {
    value: 47,
    suffix: "%",
    decimalPlaces: 0,
    label: "de asistentes son founders",
  },
  { value: 12, suffix: "", decimalPlaces: 0, label: "encuentros al año" },
] as const;

export const presentingSponsors = [
  { name: "Banco Activo", src: "/sponsors/banco-activo.png" },
  { name: "Impulsa VC", src: "/sponsors/impulsa-vc.png" },
] as const;

/**
 * Annual sponsorship intake window.
 *
 * The form is ALWAYS available by default: `deadlineISO` is `null`.
 *
 * To close intake on a date again, set `deadlineISO` ("YYYY-MM-DD", inclusive,
 * America/Caracas) and, if you want it shown, a label. Do NOT compare the date in
 * a Server Component or at module level: /patrocinar is prerendered, so `new Date()`
 * would be frozen at build time (that is exactly what hid the form in production).
 * There is no client hook for the date yet: if a deadline is ever set, add one that
 * renders "open" on the server and during hydration and re-checks the clock in an
 * effect (so there is no hydration mismatch), and use `sponsorshipDeadlineEnd()`.
 * Flip `cohortFilled` to true to close intake for everyone, no date needed.
 */
export const sponsorshipWindow: {
  deadlineISO: string | null;
  /** Set true to close intake before (or without) a deadline. */
  cohortFilled: boolean;
} = {
  deadlineISO: null,
  cohortFilled: false,
};

/** End of the deadline day in Caracas (UTC-4), or null when there is no deadline. */
export function sponsorshipDeadlineEnd(): number | null {
  const iso = sponsorshipWindow.deadlineISO;
  if (!iso) return null;
  return new Date(`${iso}T23:59:59.999-04:00`).getTime();
}

/**
 * Static part of the check, safe in Server Components: no clock involved.
 * Links to /patrocinar stay visible unless the cohort was closed by hand.
 */
export const sponsorshipIntakeOpen = !sponsorshipWindow.cohortFilled;

/** Paid sponsor lockup under Presentan. Fill `paidSponsorsByPlan` as deals close. */
export const paidSponsorSlots = {
  label: "Patrocinan",
} as const;

export const supporters = [
  { name: "Venecápital", src: "/sponsors/venecapital.png" },
  { name: "Innoven", src: "/sponsors/innoven.png" },
  { name: "Venflow", src: "/sponsors/venflow.png" },
  { name: "Rial", src: "/sponsors/rial.png" },
  { name: "Amalia", src: "/sponsors/amalia.png" },
  { name: "Wave", src: "/sponsors/wave.png" },
  { name: "En La Parada", src: "/sponsors/en-la-parada.png" },
  { name: "Fina", src: "/sponsors/fina.png" },
  { name: "Money", src: "/sponsors/money.png" },
  { name: "UCAB", src: "/sponsors/ucab.png" },
  { name: "Universidad Metropolitana", src: "/sponsors/unimet.png" },
  { name: "UCV", src: "/sponsors/ucv.png" },
  { name: "ASAP", src: "/sponsors/asap.png" },
  { name: "Chapeau House", src: "/sponsors/chapeau-house.png" },
] as const;

export const sponsorWhy = {
  title: "Lo que construimos desde agosto de 2025",
  source:
    "Registros de Luma, de agosto de 2025 a octubre de 2026. Los asistentes le ponen 4,8 de 5.",
  stats: [
    { value: 1770, label: "personas distintas en 13 ediciones" },
    { value: 743, label: "founders y CEOs" },
    { value: 135, label: "personas de fondos, ángeles y aceleradoras" },
    { value: 669, label: "pidieron entrar y no hubo cupo" },
  ],
} as const;

export const sponsorFit = {
  title: "Para que nazcan más de 1.000 startups en Caracas y Venezuela.",
  lead: "Caracas Tech existe para que la comunidad tenga acceso a la red, los recursos, el capital y las personas que necesita para crecer. Lo organizan founders de la propia comunidad, por el ecosistema y para el ecosistema.",
  pillarsLabel: "Lo que más le falta a un founder",
  pillars: [
    {
      title: "Capital",
      body: "Acceso a inversión para construir.",
    },
    {
      title: "Talento",
      body: "Las personas que una startup necesita para nacer y crecer.",
    },
    {
      title: "Recursos",
      body: "Créditos, herramientas e infraestructura.",
    },
    {
      title: "Mentoría",
      body: "La red y la experiencia de quienes ya pasaron por esto.",
    },
  ],
} as const;

export const resourceHub = {
  path: "/recursos",
  eyebrow: "Para founders",
  title: "Recursos gratis para tu startup",
  lead: "Elige un aliado, aplica, y el proveedor te responde. Grants acotados para bajar el costo de construir — disponibles aquí, no solo en el meetup.",
} as const;

export const resourceExamples = [
  "VCs, angels e inversionistas",
  "Aceleradoras",
  "HR y talento",
  "Coworking",
  "Capacidad de servidores",
  "Créditos de infraestructura",
  "Procesamiento de pagos",
  "Horas de oficio — legal, diseño, growth",
  "Office hours después del meetup",
  "Mentoría",
] as const;

export const packagePitch = {
  eyebrow: "Patrocinio anual",
  title: "Apoyo para founders con impacto real.",
  lead: "Compromisos de 12 meses, con cuota domiciliada cada mes.",
  includedLabel: "Qué incluye",
  fitLabel: "A quién buscamos",
  fitLead:
    "No solo tech. Fondos, angels, HR, aceleradoras, coworking — si ayudas a que una startup nazca o escale, este es tu lugar.",
  priceNote: "Todos los precios en USD a tasa BCV.",
  commitmentNote: "Acuerdo a 1 año, cuota domiciliada cada mes.",
  closedNote:
    "Por ahora no recibimos nuevos patrocinios. Escríbenos desde Contacto y te avisamos cuando volvamos a abrir.",
} as const;

export const packagePromise = [
  {
    title: "Presencia",
    body: "Logo en flyers, sitio y evento, cada mes.",
  },
  {
    title: "La red",
    body: "Puedes seguir la conversación con quienes se registraron.",
  },
  {
    title: "Recursos",
    body: "Founders que se autoseleccionan, aplican y llegan a tu producto con el respaldo de la comunidad. Te ayudamos a diseñar un grant de alto valor percibido y bajo costo marginal para tu empresa.",
  },
] as const;

export const packages = [
  {
    id: "comunidad",
    name: "Comunidad",
    price: 500,
    period: "/ mes",
    description:
      "Tu marca en flyers, sitio y evento, con un recurso para los founders.",
    featured: false,
    available: true,
    slotCount: 2,
    slotsTaken: 0,
    benefits: [
      "Logo en flyers, sitio oficial y materiales del evento, cada edición",
      "Grant acotado que los founders aplican después",
      "Mención en Instagram @caracastech_meetup",
      "Recap anual del ecosistema: la data del año con tu marca presente, lista para compartir internamente.",
    ],
  },
  {
    id: "recurso",
    name: "Recurso",
    price: 1000,
    period: "/ mes",
    description:
      "Tu categoría, tu lugar destacado, con un recurso para los founders.",
    featured: true,
    available: true,
    slotCount: 2,
    slotsTaken: 0,
    benefits: [
      "Todo lo de Comunidad",
      "Lugar destacado en los flyers",
      "Exclusividad de categoría (talento, recursos o mentoría)",
      "Recap de asistencia post-evento — para seguir la conversación",
      "Recap anual del ecosistema: la data del año con tu marca presente, lista para compartir internamente.",
    ],
  },
  {
    id: "presentan",
    name: "Presentan",
    priceOnRequest: true,
    description: "Quien presenta el meetup.",
    featured: false,
    available: false,
    slotCount: 1,
    slotsTaken: 1,
    benefits: [
      "Todo lo de Recurso",
      "Lockup Presentan en flyers, sitio y evento",
      "La marca que abre cada edición",
      "Cuando lo necesites, presentas lo que quieras a la comunidad: en los pitches o en el escenario",
    ],
  },
] as const;

export type PackageId = Extract<(typeof packages)[number], { available: true }>["id"];

/** Logos under Patrocinan, by plan. Empty entries keep an open slot. */
export const paidSponsorsByPlan: Record<PackageId, { name: string; src: string }[]> = {
  recurso: [],
  comunidad: [],
};

export const lockupPlanOrder: PackageId[] = ["recurso", "comunidad"];

/** `web` es el sitio del proyecto de cada miembro; la tarjeta lo muestra solo si existe. */
export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  web?: string;
  /** Nombre del proyecto, para el texto alternativo del logo. */
  proyecto?: string;
  /** Logo del proyecto en versión para fondo oscuro (el sitio es solo oscuro). */
  logo?: string;
  /** Logo de proporción cuadrada (isotipo): se muestra más alto para pesar igual que los apaisados. */
  logoCuadrado?: boolean;
};

export const team = [
  {
    name: "Nicolás Passaro",
    role: "Co-organizador",
    bio: "Co-founder & CEO de Venflow. Conecta producto, pagos y comunidad en Caracas.",
    image: "/team/nicolas-passaro.jpg",
    linkedin: "https://www.linkedin.com/in/nicolaspassaro-product-manager",
    web: "https://www.venflow.app/",
    proyecto: "Venflow",
    logo: "/team/proyectos/venflow-hd.svg",
  },
  {
    name: "Amintore Confalonieri",
    role: "Co-organizador",
    bio: "Founder & CEO de Amalia. Impulsa healthtech.",
    image: "/team/amintore-confalonieri-cuadro.jpg",
    linkedin: "https://www.linkedin.com/in/amintoreconfalonieri/",
    web: "https://amaliasalud.app/",
    proyecto: "Amalia",
    logo: "/team/proyectos/amalia-hd.png",
  },
  {
    name: "Anselmo Velazco",
    role: "Co-organizador",
    bio: "Co-founder de Rial y embajador del Ecosistema Startup Venezuela.",
    image: "/team/anselmo-velazco.jpg",
    linkedin: "https://www.linkedin.com/in/anselmo-velazco",
    web: "https://www.somosrial.com/",
    proyecto: "Rial",
    logo: "/team/proyectos/rial-hd.png",
  },
  {
    name: "Enderson Leal",
    role: "Co-organizador",
    bio: "Founder de Ecosistema Startup Venezuela. Conecta founders, VCs y operadores.",
    image: "/team/enderson-leal-perfil.jpg",
    linkedin: "https://www.linkedin.com/in/lealabreu",
    web: "https://www.startupvenezuela.tech/",
    proyecto: "Ecosistema Startup Venezuela",
    logo: "/team/proyectos/ecosistema-startup-venezuela.png",
    logoCuadrado: true,
  },
  {
    name: "Sebastián Lobo",
    role: "Co-organizador",
    bio: "Founder de Hango.",
    image: "/team/sebastian-lobo.jpg",
    linkedin: "https://www.linkedin.com/in/sebastianlobot/",
    web: "https://hango.live/",
    proyecto: "Hango",
    logo: "/team/proyectos/hango.svg",
  },
] as const satisfies readonly TeamMember[];

export const howToAttend = {
  eyebrow: "Cómo asistir",
  badge: "Gratis · con aprobación",
  title: "De Instagram al QR: así funciona",
  lead: "El meetup es gratis. El cupo no es automático: te enteras primero, te pre-registras, el equipo revisa cada solicitud y, si te aprueban, llega tu ticket.",
  steps: [
    {
      title: "Síguenos en Instagram",
      body: "Cuando publicamos la próxima edición, Instagram es el primer lugar. Síguenos para enterarte apenas abra el registro.",
      href: site.instagram,
      hrefLabel: `Seguir ${site.instagramHandle}`,
      external: true,
    },
    {
      title: "Pre-regístrate en Luma",
      body: "Completa el formulario de pre-registro en Luma. Ahí están las 5 preguntas con las que entendemos cómo contribuyes al ecosistema.",
      href: site.lumaCalendarUrl,
      hrefLabel: "Abrir calendario en Luma",
      external: true,
    },
    {
      title: "Revisamos cada registro",
      body: "El equipo de Caracas Tech Meetup revisa cada solicitud con cuidado para asegurar el mejor networking posible. El cupo es limitado.",
      href: "#criterio",
      hrefLabel: "Ver el criterio de aceptación",
      external: false,
    },
    {
      title: "Recibes tu ticket con QR",
      body: "Si te aprueban, Luma te envía por email tu ticket con código QR. Ese código es tu entrada al meetup.",
    },
  ],
} as const;

export const faqs = [
  {
    question: "¿Cómo me registro a un meetup?",
    answer:
      "El meetup es gratis, pero el cupo se aprueba. Síguenos en Instagram para enterarte primero, pre-regístrate en Luma cuando abre la edición, el equipo revisa cada solicitud y, si te aprueban, recibes tu ticket con código QR por email. Los cupos son limitados.",
  },
  {
    id: "criterio",
    question: "¿Cuál es el criterio de aceptación?",
    answer: [
      "Además de la capacidad, revisamos cuidadosamente las respuestas del formulario —las 5 preguntas donde pedimos entender cómo cada persona contribuye al ecosistema de startups.",
      "Nuestro objetivo es mantener una comunidad enfocada en crear valor para los emprendedores y el ecosistema, ya sea conectando talento, apoyando a otros founders, compartiendo aprendizajes, impulsando acceso a clientes o inversión o, en general, ayudando a que más startups nazcan y crezcan en Venezuela.",
      "En ocasiones, cuando no nos queda claro el aporte o cuando parece que la intención principal podría ser ofrecer servicios, priorizamos a quienes están más directamente involucrados en la construcción del ecosistema en este momento.",
      "Esto no significa que no puedas asistir en el futuro. Para nada. Cada edición se evalúa desde cero, así que te animamos a aplicar nuevamente en el próximo evento. La comunidad está creciendo y queremos que más personas se sumen, solo que debemos hacerlo de manera ordenada para preservar la calidad y el propósito del espacio.",
    ],
  },
  {
    question: "¿Quién puede asistir?",
    answer:
      "Founders, operadores, developers, diseñadores UI/UX, inversionistas, estudiantes y cualquiera que esté construyendo en tecnología. Trae curiosidad y ganas de conectar.",
  },
  {
    question: "¿El evento tiene costo?",
    answer:
      "No: asistir es gratis. Lo que sí hay es un proceso de aprobación, porque el cupo es limitado. Pizza, vino, cerveza y bolas criollas están disponibles; el consumo va por cuenta de cada asistente.",
  },
  {
    question: "¿Dónde se hace?",
    answer:
      "En Caracas — generalmente en Chapeau House. La dirección exacta se comparte a quienes tienen ticket confirmado.",
  },
  {
    question: "¿Cómo me entero del próximo evento?",
    answer:
      "Síguenos en Instagram @caracastech_meetup. Ahí anunciamos cada edición, compartimos fotos y te avisamos cuando abren los registros en Luma.",
  },
] as const;

export const sponsorFaqs = [
  {
    question: "¿Emiten factura fiscal?",
    answer:
      "Sí, cada mes durante el año del acuerdo. Los montos van en dólares y se pagan a tasa BCV.",
  },
  {
    question: "¿Cuánto dura el acuerdo?",
    answer: "Un año, con cuota mensual domiciliada.",
  },
  {
    question: "¿Puedo tener un stand o promotoras?",
    answer:
      "No. La noche es para que la gente conecte. Tu marca está en flyers, sitio y evento, y tu aporte llega a los founders como recurso, infraestructura o mentoría.",
  },
  {
    question: "¿Puedo patrocinar solo un formato?",
    answer: "Sí, en la fase 2. Los patrocinadores principales tienen prioridad.",
  },
  {
    question: "¿Puedo aportar en especie?",
    answer: "Sí, si resuelve una de las necesidades de la lista.",
  },
] as const;

export type IconoFormato2027 =
  | "Users"
  | "Presentation"
  | "UtensilsCrossed"
  | "Mountain"
  | "CodeXml"
  | "CalendarRange";

export type IconoRol2027 =
  | "Rocket"
  | "HandCoins"
  | "BriefcaseBusiness"
  | "Building2"
  | "GraduationCap"
  | "UserRound";

export type Formato2027 = {
  id: string;
  palabra: string;
  /** Color base del formato. */
  c: string;
  /** Color claro del formato (texto y acentos). */
  cl: string;
  /** Foto en public/2027/fotos (se puede reemplazar por otra con el mismo nombre). */
  foto: string;
  /** Encuadre de la foto (object-position), por dato para no depender del contenido. */
  foco: string;
  /** Si es true, el dorso avisa «Foto de referencia». */
  referencia: boolean;
  /** Descripción breve de la foto. */
  alt: string;
  /** Nombre del ícono de lucide-react (ver components/2027/iconos.ts). */
  icono: IconoFormato2027;
  cuando: string;
  cuandoLargo: string;
  que: string;
  quien: string;
  /** viewBox del logotipo con la palabra ya medida. */
  viewBox: string;
  /** Si es false, el formato desaparece de tarjetas, chips, barra y rotación. */
  visible: boolean;
  /** «confirmado» va seguro en 2027; «en-camino» se está trabajando (no sobreprometer). */
  estado: "confirmado" | "en-camino";
};

export const formatos2027: readonly Formato2027[] = [
  {
    id: "meetup",
    palabra: "meetup",
    c: "#46c536",
    cl: "#7fe36f",
    foto: "/2027/fotos/meetup.jpg",
    foco: "35% 62%",
    referencia: false,
    alt: "Gente conversando de noche bajo luces en un meetup de Caracas Tech",
    icono: "Users",
    cuando: "Cada mes",
    cuandoLargo: "Cada mes",
    que: "El after office mensual de founders, builders e inversionistas en Caracas. Sigue igual en 2027.",
    quien: "Founders, builders e inversionistas",
    viewBox: "0 0 4042 1524",
    visible: true,
    estado: "confirmado",
  },
  {
    id: "demo-day",
    palabra: "demo day",
    c: "#4a63f5",
    cl: "#8fa2ff",
    foto: "/2027/fotos/demo-day-unimet.jpg",
    foco: "50% 50%",
    referencia: false,
    alt: "Un founder presenta su startup en un escenario frente al público",
    icono: "Presentation",
    cuando: "Enero a marzo",
    cuandoLargo: "Enero a marzo de 2027",
    que: "Startups presentan ante inversionistas.",
    quien: "Startups que buscan inversión e inversionistas",
    viewBox: "0 0 4562 1524",
    visible: true,
    estado: "en-camino",
  },
  {
    id: "dinner",
    palabra: "dinner",
    c: "#f2902b",
    cl: "#ffb066",
    foto: "/2027/fotos/dinner.jpg",
    foco: "50% 55%",
    referencia: true,
    alt: "Mesa larga con invitados brindando en una cena",
    icono: "UtensilsCrossed",
    cuando: "2027",
    cuandoLargo: "2027, fecha por anunciar",
    que: "Mesas pequeñas con founders e inversionistas.",
    quien: "Founders e inversionistas",
    viewBox: "0 0 3872 1524",
    visible: true,
    estado: "confirmado",
  },
  {
    id: "wellness",
    palabra: "wellness",
    c: "#9a7cf2",
    cl: "#c4b1ff",
    foto: "/2027/fotos/wellness-carrera.jpg",
    foco: "48% 58%",
    referencia: true,
    alt: "Grupo de corredores con número en una carrera de calle",
    icono: "Mountain",
    cuando: "2027",
    cuandoLargo: "2027, fecha por anunciar",
    que: "Una carrera, un trail o una caminata entre founders.",
    quien: "Founders",
    viewBox: "0 0 4255 1524",
    visible: true,
    estado: "en-camino",
  },
  {
    id: "hackathon",
    palabra: "hackathon",
    c: "#22b3c4",
    cl: "#6fdde9",
    foto: "/2027/fotos/hackathon-neon.jpg",
    foco: "50% 55%",
    referencia: true,
    alt: "Equipo trabajando con laptops de noche bajo luces de neón",
    icono: "CodeXml",
    cuando: "2027",
    cuandoLargo: "2027, fecha por anunciar",
    que: "Equipos construyen un producto en un fin de semana.",
    quien: "Quien construye producto",
    viewBox: "0 0 4699 1524",
    visible: true,
    estado: "confirmado",
  },
  {
    id: "week",
    palabra: "week",
    c: "#e2508f",
    cl: "#ff8fbd",
    foto: "/2027/fotos/week-convencion.jpg",
    foco: "50% 58%",
    referencia: true,
    alt: "Multitud recorriendo una convención de tecnología",
    icono: "CalendarRange",
    cuando: "2027",
    cuandoLargo: "2027, fecha por anunciar",
    que: "Una semana de eventos de toda la comunidad.",
    quien: "Toda la comunidad",
    viewBox: "0 0 3872 1524",
    visible: false,
    estado: "en-camino",
  },
];

export type Rol2027 = { id: string; label: string; icono: IconoRol2027 };

export const roles2027: readonly Rol2027[] = [
  { id: "founder", label: "Founder", icono: "Rocket" },
  { id: "inversionista", label: "Inversionista", icono: "HandCoins" },
  { id: "startup", label: "Trabajo en una startup", icono: "BriefcaseBusiness" },
  { id: "marca", label: "Empresa o marca", icono: "Building2" },
  { id: "estudiante", label: "Estudiante", icono: "GraduationCap" },
  { id: "otro", label: "Otro", icono: "UserRound" },
];
