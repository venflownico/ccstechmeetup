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

export const supporters = [
  { name: "Venecápital", src: "/sponsors/venecapital.png" },
  { name: "Innoven", src: "/sponsors/innoven.png" },
  { name: "Ridery", src: "/sponsors/ridery.png" },
  { name: "Venflow", src: "/sponsors/venflow.png" },
  { name: "Venezuela Mobility Ventures", src: "/sponsors/venezuela-mobility-ventures.png" },
  { name: "Rial", src: "/sponsors/rial.png" },
  { name: "Amalia", src: "/sponsors/amalia.png" },
  { name: "Wave", src: "/sponsors/wave.png" },
  { name: "En La Parada", src: "/sponsors/en-la-parada.png" },
  { name: "Fina", src: "/sponsors/fina.png" },
  { name: "Money", src: "/sponsors/money.png" },
  { name: "UCAB", src: "/sponsors/ucab.png" },
  { name: "Kurios", src: "/sponsors/kurios.png" },
  { name: "Ávila Holding Group", src: "/sponsors/avila-holding-group.png" },
  { name: "Universidad Metropolitana", src: "/sponsors/unimet.png" },
  { name: "UCV", src: "/sponsors/ucv.png" },
  { name: "ASAP", src: "/sponsors/asap.png" },
  { name: "Chapeau House", src: "/sponsors/chapeau-house.png" },
] as const;

export const sponsorFit = {
  eyebrow: "Qué buscamos",
  title: "Aliados que resuelven problemas reales de founders",
  lead: "Los founders de este meetup ya los venden diez veces al mes. No vienen a que les ofrezcan un producto. Vienen a conectar, a construir y a acceder a lo que les falta para crecer.",
  body: "Por eso no buscamos stands ni activaciones comerciales. Buscamos entidades que apoyen el emprendimiento: una empresa de infraestructura que pone créditos para que las startups crezcan su stack, o una agencia que ofrece su oficio como recurso — no como pitch.",
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

export const sponsorGrowth = {
  eyebrow: "A dónde va",
  title: "El patrocinio agranda el meetup — y abre lo que viene después",
  lead: "Hoy el cupo se queda corto. Con más fondos podemos recibir a más gente sin bajar la calidad, y crear formatos que el ecosistema pide más allá del after office mensual.",
  groups: [
    {
      kicker: "El venue",
      title: "Más capacidad, misma calidad",
      body: "El meetup crece más rápido que el espacio. Invertimos en lo que hace falta para que quepan más personas y la noche se sienta bien.",
      items: [
        "Baños portátiles para subir el aforo",
        "Mejor sonido para que se escuche en todo el venue",
        "Mejor iluminación para el escenario y el after",
      ],
    },
    {
      kicker: "Más allá del meetup",
      title: "Formatos que conectan talento y startups",
      body: "El after office mensual no es el único formato que el ecosistema necesita. Queremos abrir espacios más precisos para hacer match.",
      items: [
        "Speed dating 1:1 entre founders con una idea y CTOs que quieren construir",
        "Matchmaking entre quienes buscan un rol en una startup y quienes están contratando",
        "Ferias de empleo para que las startups del ecosistema contraten en persona",
      ],
    },
  ],
} as const;

export const resourceExamples = [
  "Créditos de infraestructura para el stack",
  "Horas de oficio como grant — legal, diseño, growth",
  "Office hours de operadores o inversionistas",
  "Hiring sprint o pipeline de talento",
  "Matching de mentoría",
] as const;

export const packages = [
  {
    id: "comunidad",
    name: "Comunidad",
    price: 500,
    period: "/ mes",
    description:
      "Acompañas cada edición con un recurso pequeño y concreto. La visibilidad es consecuencia, no el producto.",
    featured: false,
    benefits: [
      "Un recurso nombrado y canjeable para founders (créditos, horas u office hours)",
      "Logo en el sitio oficial y en los posters del meetup",
      "Mención en vivo y agradecimiento en Instagram @caracastech_meetup",
      "2 invitaciones para operadores que puedan ayudar — no un equipo de ventas",
    ],
  },
  {
    id: "recurso",
    name: "Recurso",
    price: 1000,
    period: "/ mes",
    description:
      "El paquete central: cada edición pones algo real en manos de founders. Cloud, agencias, fondos u operadores.",
    featured: true,
    benefits: [
      "Todo lo de Comunidad",
      "5 minutos en vivo para presentar el recurso — no la empresa",
      "El recurso se canjea esa edición: código, form u office hours",
      "Logo destacado en materiales",
      "4 invitaciones confirmadas por edición",
      "Recap de asistencia post-evento",
    ],
  },
  {
    id: "pilar",
    name: "Pilar",
    price: 1500,
    period: "/ mes",
    description:
      "Aliado exclusivo de un problema de founders: talento, recursos o mentoría. Un aliado por pilar.",
    featured: false,
    benefits: [
      "Todo lo de Recurso",
      "Exclusividad de categoría en tu pilar (talento, recursos o mentoría)",
      "Lockup “Aliado de [Pilar]” en materiales de la edición",
      "Mesa de office hours en el meetup — un recurso, no un stand",
      "Prioridad para anclar el formato de tu pilar: feria de talento, clínica o workshop",
      "Una sesión más profunda por trimestre",
      "6 invitaciones confirmadas por edición",
    ],
  },
] as const;

export type PackageId = (typeof packages)[number]["id"];

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
    question: "¿A qué se destina el patrocinio?",
    answer:
      "A crecer el evento: más capacidad en el venue (baños portátiles, sonido, iluminación) y formatos nuevos — speed dating entre founders y CTOs, matchmaking de talento y ferias de empleo startup. No se va a stands ni a pauta.",
  },
  {
    question: "¿Qué tipo de patrocinador buscan?",
    answer:
      "Entidades que apoyen el emprendimiento: que puedan abrir acceso a talento, recursos o mentoría — y, en el formato correcto, a capital. No buscamos activaciones comerciales. Los founders vienen a conectar y a construir, no a que les vendan.",
  },
  {
    question: "¿Puedo ser presentador del meetup?",
    answer:
      "El lockup de Presentan está reservado a Banco Activo e Impulsa VC. No vendemos un segundo presentador. Si tu marca pone un recurso concreto, los paquetes abiertos son Comunidad, Recurso y Pilar.",
  },
  {
    question: "¿Puedo tener un stand o hacer un pitch?",
    answer:
      "Este meetup no está pensado para vender. Si tu marca puede poner un recurso concreto a disposición de founders —créditos, talento, office hours, mentoría— conversamos. Un stand o un brief de ventas no es el formato.",
  },
  {
    question: "¿Qué cuenta como recurso?",
    answer:
      "Algo que un founder puede usar: créditos de infraestructura, horas de oficio como grant, office hours, un hiring sprint, matching de mentoría. Un catálogo, una cuenta bancaria o un préstamo para quien aún no tiene flujo no cuentan.",
  },
  {
    question: "¿Qué es el paquete Pilar?",
    answer:
      "Un aliado exclusivo por problema de founders: talento, recursos o mentoría. Capital y el título de Presentan ya tienen aliados. El Pilar incluye mesa de office hours y prioridad para anclar el formato de tu pilar — feria de talento, clínica o workshop.",
  },
  {
    question: "¿Cómo patrocino?",
    answer:
      "Elige un paquete, completa el formulario y Nicolas te contacta para cerrar el acuerdo. No hay checkout en el sitio: primero conversamos — sobre todo para confirmar que el recurso es real y canjeable.",
  },
  {
    question: "¿Puedo patrocinar una sola edición?",
    answer:
      "Comunidad y Recurso pueden ser de una edición si el recurso está listo. Pilar tiene más sentido a 3–6 meses, porque la exclusividad de categoría es el producto.",
  },
] as const;
