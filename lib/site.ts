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
  { href: "/recursos", label: "Recursos" },
  { href: "/#como-asistir", label: "Cómo asistir" },
  { href: "/#por-que", label: "Por qué" },
  { href: "/#equipo", label: "Equipo" },
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
 * Closes on the deadline (inclusive, America/Caracas), or earlier if
 * `cohortFilled` is flipped when all paid slots are taken.
 */
export const sponsorshipWindow = {
  deadlineISO: "2026-10-31",
  deadlineLabel: "31 de octubre",
  deadlineLabelLong: "31 de octubre de 2026",
  /** Set true when the year cohort is full before the deadline. */
  cohortFilled: false,
} as const;

function isBeforeSponsorshipDeadline(now = new Date()) {
  const deadlineEnd = new Date(
    `${sponsorshipWindow.deadlineISO}T23:59:59.999-04:00`,
  );
  return now.getTime() <= deadlineEnd.getTime();
}

/** Hide recruitment CTAs when the cohort is full or the deadline has passed. */
export const sponsorshipIntakeOpen =
  !sponsorshipWindow.cohortFilled && isBeforeSponsorshipDeadline();

/** Paid sponsor lockup under Presentan. Fill `paidSponsorsByPlan` as deals close. */
export const paidSponsorSlots = {
  label: "Patrocinan",
  lead: `Cuatro cupos anuales. Ventana abierta hasta el ${sponsorshipWindow.deadlineLabelLong}.`,
  emptyHint: "Tu marca aquí",
  closedLead: "Cupos del año tomados. Estas son las marcas del ciclo.",
} as const;

export const supporters = [
  { name: "Venecápital", src: "/sponsors/venecapital.png" },
  { name: "Innoven", src: "/sponsors/innoven.png" },
  { name: "Venflow", src: "/sponsors/venflow.png" },
  { name: "Venezuela Mobility Ventures", src: "/sponsors/venezuela-mobility-ventures.png" },
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
  title: "Por qué las marcas patrocinan el Caracas Tech Meetup",
  footnote: "Datos de 9 ediciones · Agosto 2025 – Agosto 2026 · 1.320 asistentes únicos",
  cta: "Quiero patrocinar",
  ctaHref: "#paquetes",
  stats: [
    {
      value: "528",
      label: "Founders y CEOs",
      body: "El 40% de la comunidad dirige su propia empresa, junto a 74 inversionistas entre fondos, hubs y ángeles.",
    },
    {
      value: "723",
      label: "Personas en lista de espera",
      body: "La demanda superó el aforo en cada edición del año. Tu patrocinio es la palanca directa para ampliar el cupo.",
    },
    {
      value: "402",
      label: "Asistentes recurrentes",
      body: "3 de cada 10 vuelven a dos o más ediciones, y cada evento suma ~150 caras nuevas. Presencia repetida, no una sola noche.",
    },
  ],
} as const;

export const sponsorFit = {
  eyebrow: "Qué buscamos",
  title: "Impactar la creación y el crecimiento de startups es la meta",
  lead: "El meetup existe para que la gente se conozca. Drinks, personas y espacio para construir relaciones: la noche no tiene agenda, para que esas conversaciones no se compriman, y se creen relaciones reales.",
  body: "La presencia de marca — flyers, sitio, evento — es cómo esta comunidad te recuerda como alguien que los apoya. El recurso es un grant acotado, siempre disponible en un QR en el venue, y se canjea después ([ver cómo funciona](/recursos)). Comunidad y Recurso no toman el micrófono: el recurso se conoce por el QR.",
  pillars: [
    {
      title: "Capital",
      body: "Acceso a inversión y capital para construir. No a productos financieros para quien aún no tiene flujo.",
    },
    {
      title: "Talento",
      body: "Acceso a las personas que las startups necesitan para nacer, operar y crecer.",
    },
    {
      title: "Recursos",
      body: "Créditos, herramientas e infraestructura que desbloquean el stack — no un catálogo de servicios.",
    },
    {
      title: "Red y mentoría",
      body: "Acceso a la comunidad y a mentoría de quienes ya recorrieron el camino.",
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
  lead: `Abrimos una ventana al año para compromisos de 12 meses. Cierra el ${sponsorshipWindow.deadlineLabelLong}: cuando llenamos los cupos o llega la fecha, esas son las marcas del meetup.`,
  includedLabel: "Qué incluye",
  fitLabel: "A quién buscamos",
  fitLead:
    "No solo tech. Fondos, angels, HR, aceleradoras, coworking — si ayudas a que una startup nazca o escale, este es tu lugar.",
  priceNote: "Todos los precios en USD a tasa BCV.",
  commitmentNote: `Acuerdo a 1 año, cuota domiciliada cada mes. Cupos limitados · cierra ${sponsorshipWindow.deadlineLabel}.`,
  closedNote:
    "Los cupos de este ciclo ya no están disponibles. Volvemos a abrir el próximo año.",
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
      "Tu marca en flyers, sitio y evento. En el venue hay un código QR con recursos gratis para startups — el tuyo incluido.",
    featured: false,
    available: true,
    slotCount: 2,
    slotsTaken: 0,
    benefits: [
      "Logo en flyers, sitio oficial y materiales del evento, cada edición",
      "Tu recurso en el QR del venue: founders lo escanean y ven grants gratis",
      "Grant acotado (pool o N cupos) que los founders aplican después",
      "Mención en Instagram @caracastech_meetup",
      "2 cupos reservados cada mes: gente de tu equipo u otros que invites, sin pasar por aprobación",
    ],
  },
  {
    id: "recurso",
    name: "Recurso",
    price: 1000,
    period: "/ mes",
    description:
      "Tu categoría, tu lugar destacado. Tu grant aparece en el QR del venue — el mismo código donde founders encuentran recursos gratis.",
    featured: true,
    available: true,
    slotCount: 2,
    slotsTaken: 0,
    benefits: [
      "Todo lo de Comunidad",
      "Lugar destacado en el QR del venue y en los flyers",
      "Exclusividad de categoría (talento, recursos o mentoría)",
      "6 cupos reservados cada mes: tu equipo o quien invites, sin pasar por aprobación",
      "Recap de asistencia post-evento — para seguir la conversación",
    ],
  },
  {
    id: "presentan",
    name: "Presentan",
    priceOnRequest: true,
    description: "Quien presenta el meetup. Este cupo ya está tomado.",
    featured: false,
    available: false,
    takenLabel: "Tomado",
    slotCount: 1,
    slotsTaken: 1,
    benefits: [
      "Todo lo de Recurso",
      "Lockup Presentan en flyers, sitio y evento",
      "La marca que abre cada edición",
      "Cupos ilimitados cada mes: tu equipo o quien invites, sin pasar por aprobación",
      "Estacionamiento prioritario",
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

export const team = [
  {
    name: "Nicolás Passaro",
    role: "Co-organizador",
    bio: "Co-founder & CEO de Venflow. Conecta producto, pagos y comunidad en Caracas.",
    image: "/team/nicolas-passaro.jpg",
    linkedin: "https://www.linkedin.com/in/nicolaspassaro-product-manager",
  },
  {
    name: "Amintore Confalonieri",
    role: "Co-organizador",
    bio: "Founder & CEO de Amalia. Impulsa healthtech y el after-office del ecosistema.",
    image: "/team/amintore-confalonieri.jpg",
    linkedin: "https://www.linkedin.com/in/amintoreconfalonieri/",
  },
  {
    name: "Anselmo Velazco",
    role: "Co-organizador",
    bio: "Co-founder de Rial y embajador del Ecosistema Startup Venezuela.",
    image: "/team/anselmo-velazco.jpg",
    linkedin: "https://www.linkedin.com/in/anselmo-velazco",
  },
  {
    name: "Enderson Leal",
    role: "Co-organizador",
    bio: "Founder de Ecosistema Startup Venezuela. Conecta founders, VCs y operadores.",
    image: "/team/enderson-leal.jpg",
    linkedin: "https://www.linkedin.com/in/lealabreu",
  },
] as const;

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
    question: "¿Cómo funciona el patrocinio anual?",
    answer:
      `Abrimos una ventana al año para compromisos de 12 meses. Hay cuatro cupos pagos: dos Recurso y dos Comunidad (Presentan ya está tomado). La ventana cierra el ${sponsorshipWindow.deadlineLabelLong}, o antes si se llenan los cupos. Esas son las marcas del ciclo, y los materiales — flyers, sitio, evento — quedan fijos sin sumar logos a mitad de año.`,
  },
  {
    question: "¿Hasta cuándo puedo patrocinar?",
    answer:
      `Hasta el ${sponsorshipWindow.deadlineLabelLong}, o hasta que se llenen los cuatro cupos pagos — lo que ocurra primero. Después de esa fecha no abrimos más marcas hasta el próximo ciclo.`,
  },
  {
    question: "¿Emiten factura fiscal?",
    answer:
      "Sí. Emitimos factura fiscal cada mes, durante el año del acuerdo. Los precios están en USD a tasa BCV.",
  },
  {
    question: "¿Cómo se paga?",
    answer:
      "La cuota del plan se domicilia cada mes, en USD a tasa BCV de esa fecha. Firmamos a 1 año: no es un cobro suelto por edición.",
  },
  {
    question: "¿A qué se destina el patrocinio?",
    answer:
      "A crecer el evento: más capacidad en el venue (baños portátiles, sonido, iluminación) y, aparte del after office mensual, formatos nuevos — speed dating entre founders y CTOs, matchmaking de talento y ferias de empleo startup.",
  },
  {
    question: "¿Qué tipo de patrocinador buscan?",
    answer:
      "Marcas que pueden ayudar a que un founder tenga éxito — con talento, recursos, mentoría o, en el formato correcto, capital — y que quieran que esa comunidad las recuerde cuando crezca.",
  },
  {
    question: "¿Puedo ser presentador del meetup?",
    answer:
      "El lockup Presentan es un solo cupo, y ya está tomado. Quien presenta abre cada edición y puede hablarle a la comunidad — en los pitches o en el escenario — cuando lo necesite. Si tu marca pone un recurso acotado, los paquetes abiertos son Comunidad y Recurso.",
  },
  {
    question: "¿Puedo tener un stand, una mesa u office hours en el meetup?",
    answer:
      "El after office no se organiza alrededor de un stand: drinks, gente, conversaciones. Un stand, una mesa u office hours en el piso interrumpe el networking: la atracción pasa a ser el stand, no la gente — y ese networking es lo que hace que vuelvan. El recurso vive en un QR en el venue.",
  },
  {
    question: "¿Puedo presentar mi marca o mi recurso en el meetup?",
    answer:
      "En Comunidad y Recurso, no. Tu marca está en flyers, sitio y evento; el recurso, en un QR. Presentar en los pitches o en el escenario es de Presentan, y ese cupo ya está tomado.",
  },
  {
    question: "¿Qué es el QR del evento?",
    answer:
      "Un código QR solo accesible durante el evento que abre una página donde startups y fundadores pueden acceder a recursos gratis ofrecidos por los sponsors. La idea es que sean cosas que necesitan para escalar y que normalmente requieren capital: capacidad de servidores, créditos, procesamiento de pagos. [Ver cómo funciona](/recursos).",
  },
  {
    question: "¿El recurso es una cuenta abierta por cada startup que aplique vía el QR?",
    answer:
      "Tú decides cuánto de los recursos le das a aquellos que aplican vía el QR para acceder a los recursos que tú ofreces.",
  },
  {
    question: "¿Qué cuenta como recurso?",
    answer:
      "Algo que un founder puede usar después: créditos de infraestructura, capacidad de servidores, pagos, horas de oficio como grant, office hours que se agendan luego. Un catálogo o un préstamo para quien aún no tiene flujo no cuentan.",
  },
  {
    question: "¿Cómo patrocino?",
    answer:
      `Mientras la ventana esté abierta (hasta el ${sponsorshipWindow.deadlineLabelLong}): elige un paquete, completa el formulario y agenda una llamada de 30 minutos con Nicolas para cerrar el acuerdo a 1 año. Conversamos el recurso: qué es, cuál es el tope, y dónde aplican los founders.`,
  },
  {
    question: "¿Puedo patrocinar un solo mes o una sola edición?",
    answer:
      "No. Solo compromisos anuales, con cuota domiciliada. Así tu marca está en cada edición y no reabrimos materiales cada vez que entra una marca nueva.",
  },
  {
    question: "¿Mi marca aparece desde el primer mes?",
    answer:
      "Sí. Logo en flyers, sitio y evento de esa edición. En Comunidad y Recurso el recurso se conoce por el QR y los materiales: no toman el micrófono.",
  },
  {
    question: "¿Qué pasa si el grant todavía no está definido?",
    answer:
      "Podemos cerrar el cupo y publicar la marca, y dejar el QR listo cuando el tope y la vía de aplicación estén claros. El recurso no se anuncia en vacío.",
  },
] as const;
