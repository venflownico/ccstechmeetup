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
} as const;

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

/** Paid sponsor lockup under Presentan. Fill `paidSponsorsByPlan` as deals close. */
export const paidSponsorSlots = {
  label: "Patrocinan",
  lead: "Dos cupos Recurso a $1,000 y dos Comunidad a $500.",
  emptyHint: "Tu marca aquí",
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

export const sponsorFit = {
  eyebrow: "Qué buscamos",
  title: "Impactar la creación y el crecimiento de startups es la meta",
  lead: "El meetup existe para que la gente se conozca. Drinks, personas y espacio para construir relaciones: la noche no tiene agenda, para que esas conversaciones no se compriman, y se creen relaciones reales.",
  body: "La presencia de marca — flyers, sitio, evento — es cómo esta comunidad te recuerda como alguien que los apoya. El recurso es un grant acotado, siempre disponible en un QR en el venue, y se canjea después. La noche no tiene escenario: nadie presenta.",
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
  eyebrow: "Patrocinio",
  title: "Apoyo para founders con impacto real.",
  lead: "Tu aporte nos ayuda a mantener y crecer el meetup: más cupos, mejor sonido, más espacios para que founders y el ecosistema startup crezcan juntos.",
  includedLabel: "Qué incluye",
  fitLabel: "A quién buscamos",
  fitLead:
    "No solo tech. Fondos, angels, HR, aceleradoras, coworking — si ayudas a que una startup nazca o escale, este es tu lugar.",
  priceNote: "Todos los precios en USD a tasa BCV.",
  commitmentNote: "Acuerdos a 1 año. La cuota se domicilia cada mes.",
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
    body: "La oportunidad de ofrecerle a startups grants de tus servicios. Apoyo real para que puedan crecer contigo.",
  },
] as const;

export const packages = [
  {
    id: "comunidad",
    name: "Comunidad",
    price: 500,
    period: "/ mes",
    description:
      "Tu marca en flyers, sitio y evento, y tu grant en el QR. Sin pitch: la noche es para conocerse.",
    featured: false,
    available: true,
    slotCount: 2,
    slotsTaken: 0,
    benefits: [
      "Logo en flyers, sitio oficial y materiales del evento, cada edición",
      "Tu recurso listado en el QR del venue — recursos gratis para startups",
      "Grant acotado (pool o N cupos) que los founders aplican después",
      "Mención en Instagram @caracastech_meetup",
      "2 invitaciones para operadores que puedan ayudar",
    ],
  },
  {
    id: "recurso",
    name: "Recurso",
    price: 1000,
    period: "/ mes",
    description:
      "Tu categoría, tu lugar en el hub. El grant vive en el QR — no en un micrófono.",
    featured: true,
    available: true,
    slotCount: 2,
    slotsTaken: 0,
    benefits: [
      "Todo lo de Comunidad",
      "Lugar destacado en el QR y en los flyers",
      "Exclusividad de categoría (talento, recursos o mentoría)",
      "6 invitaciones confirmadas por edición",
      "Recap de asistencia post-evento — para seguir la conversación",
    ],
  },
  {
    id: "presentan",
    name: "Presentan",
    price: 2000,
    period: "/ mes",
    description: "Quien presenta el meetup. Este cupo ya está tomado.",
    featured: false,
    available: false,
    takenLabel: "Tomado",
    slotCount: 2,
    slotsTaken: 2,
    benefits: [
      "Todo lo de Recurso",
      "Lockup Presentan en flyers, sitio y evento",
      "La marca que abre cada edición",
      "Prioridad para un formato aparte del after office mensual",
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
      "El lockup de Presentan está reservado. Si tu marca pone un recurso acotado, los paquetes abiertos son Comunidad y Recurso.",
  },
  {
    question: "¿Puedo tener un stand, una mesa u office hours en el meetup?",
    answer:
      "El after office no se organiza: drinks, gente, conversaciones. Una mesa o office hours en el piso come el tiempo para conocerse. El recurso vive en un QR en el venue — nadie presenta en el evento.",
  },
  {
    question: "¿Puedo presentar mi marca o mi recurso en el meetup?",
    answer:
      "No. La noche no tiene agenda ni escenario: nadie presenta. Tu marca está en flyers, sitio y evento; el recurso, en un QR. Las conversaciones son el punto.",
  },
  {
    question: "¿Qué es el QR del evento?",
    answer:
      "Un código en el venue que abre recursos gratis para tu startup: capacidad de servidores, créditos, procesamiento de pagos, y lo que un aliado ponga para bajar el costo de escalar. Está siempre encendido. No sustituye el networking.",
  },
  {
    question: "¿El recurso es una cuenta abierta por cada startup que aplique?",
    answer:
      "No. El acuerdo es anual. La cuota mensual compra la presencia — flyers, evento, memoria — durante esos 12 meses. El recurso es un grant acotado: un pool o un número fijo de cupos. Así sigue siendo un regalo, y un filtro: solo marcas que de verdad pueden apoyar founders se sientan en esta mesa.",
  },
  {
    question: "¿Qué cuenta como recurso?",
    answer:
      "Algo que un founder puede usar después: créditos de infraestructura, capacidad de servidores, pagos, horas de oficio como grant, office hours que se agendan luego. Un catálogo o un préstamo para quien aún no tiene flujo no cuentan.",
  },
  {
    question: "¿Cómo patrocino?",
    answer:
      "Elige un paquete, completa el formulario y Nicolas te contacta para cerrar el acuerdo a 1 año. Conversamos el recurso: qué es, cuál es el tope, y dónde aplican los founders.",
  },
  {
    question: "¿Puedo patrocinar un solo mes o una sola edición?",
    answer:
      "No. Los cupos se cierran a 1 año, con la cuota domiciliada. Así tu marca está en cada edición sin que tengamos que reabrir la conversación cada mes.",
  },
  {
    question: "¿Mi marca aparece desde el primer mes?",
    answer:
      "Sí. Logo en flyers, sitio y evento de esa edición. Nadie toma el micrófono: el recurso se conoce por el QR y los materiales.",
  },
  {
    question: "¿Qué pasa si el grant todavía no está definido?",
    answer:
      "Podemos cerrar el cupo y publicar la marca, y dejar el QR listo cuando el tope y la vía de aplicación estén claros. El recurso no se anuncia en vacío.",
  },
] as const;
