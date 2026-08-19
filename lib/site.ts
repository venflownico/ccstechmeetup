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
  title: "Que el founder te recuerde cuando triunfe",
  lead: "El meetup existe para que la gente se conozca. Drinks, personas y espacio para construir relaciones: la noche no tiene agenda, para que esas conversaciones no se compriman a media hora al final.",
  body: "La presencia de marca — flyers, sitio, evento — es cómo esta comunidad te recuerda como alguien que los apoya. El recurso es un grant acotado, siempre disponible en un QR en el venue, y se canjea después. El escenario no se llena: uno o dos anuncios de cinco minutos por edición, rotados.",
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
      body: "El after office mensual se queda como está: drinks, gente, pitches. Los formatos más precisos viven aparte, para no comerse la noche de networking.",
      items: [
        "Speed dating 1:1 entre founders con una idea y CTOs que quieren construir",
        "Matchmaking entre quienes buscan un rol en una startup y quienes están contratando",
        "Ferias de empleo para que las startups del ecosistema contraten en persona",
      ],
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
  "Capacidad de servidores",
  "Créditos de infraestructura",
  "Procesamiento de pagos",
  "Horas de oficio como grant — legal, diseño, growth",
  "Office hours que se agendan después del meetup",
] as const;

export const packagePromise = [
  {
    title: "Presencia",
    body: "Logo en flyers, sitio y evento, cada edición. Así te recuerdan: como alguien que apoya a esta comunidad.",
  },
  {
    title: "El QR",
    body: "Un código en el venue hacia recursos gratis para tu startup. Siempre encendido. No come networking.",
  },
  {
    title: "El escenario",
    body: "Uno o dos anuncios de 5 minutos por edición, rotados. Un recordatorio al trimestre — no el mismo pitch todos los meses.",
  },
] as const;

export const packages = [
  {
    id: "comunidad",
    name: "Comunidad",
    price: 500,
    period: "/ mes",
    description:
      "Tu marca en flyers, sitio y evento, y tu grant en el QR. La presencia es mensual; el escenario no.",
    featured: false,
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
      "Cinco minutos, rotados: “esto es gratis, apliquen aquí o escaneen el QR”. Destacado en flyers y en el hub.",
    featured: true,
    benefits: [
      "Todo lo de Comunidad",
      "5 minutos en vivo, en rotación: 1 o 2 marcas por edición",
      "Un recordatorio en escenario cada trimestre o semestre — no el mismo anuncio todos los meses",
      "Lugar destacado en el QR y en los flyers",
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
      "La marca que esta comunidad asocia a un problema de founders mientras crece — en flyers, en el QR y en la rotación del escenario.",
    featured: false,
    benefits: [
      "Todo lo de Recurso",
      "Exclusividad de categoría (talento, recursos o mentoría)",
      "Lockup “Aliado de [Pilar]” en flyers y materiales",
      "Prioridad en la rotación de los 5 minutos y lugar fijo en el QR",
      "Prioridad para un formato aparte del after office mensual",
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
      "El lockup de Presentan está reservado a Banco Activo e Impulsa VC. Si tu marca pone un recurso acotado, los paquetes abiertos son Comunidad, Recurso y Pilar.",
  },
  {
    question: "¿Puedo tener un stand, una mesa u office hours en el meetup?",
    answer:
      "El after office no se organiza: drinks, gente, pitches. Una mesa o office hours en el piso come el tiempo para conocerse. El recurso vive en un QR en el venue y, si toca, en cinco minutos rotados.",
  },
  {
    question: "¿Voy a anunciar el mismo recurso todos los meses en escenario?",
    answer:
      "No. La presencia en flyers, sitio y evento es mensual. El escenario es escaso: uno o dos anuncios de cinco minutos por edición, rotados entre aliados. Un recordatorio cada trimestre o semestre alcanza — cerca del 30% vuelve cada mes; el resto conoce el recurso por el QR y los flyers.",
  },
  {
    question: "¿Qué es el QR del evento?",
    answer:
      "Un código en el venue que abre recursos gratis para tu startup: capacidad de servidores, créditos, procesamiento de pagos, y lo que un aliado ponga para bajar el costo de escalar. Está siempre encendido. No sustituye el networking.",
  },
  {
    question: "¿El recurso es una cuenta abierta por cada startup que aplique?",
    answer:
      "No. El fee mensual compra la presencia — flyers, evento, memoria. El recurso es un grant acotado: un pool o un número fijo de cupos. Así sigue siendo un regalo, y un filtro: solo marcas que de verdad pueden apoyar founders se sientan en esta mesa.",
  },
  {
    question: "¿Qué cuenta como recurso?",
    answer:
      "Algo que un founder puede usar después: créditos de infraestructura, capacidad de servidores, pagos, horas de oficio como grant, office hours que se agendan luego. Un catálogo o un préstamo para quien aún no tiene flujo no cuentan.",
  },
  {
    question: "¿Qué es el paquete Pilar?",
    answer:
      "Ser la marca que la comunidad asocia a un problema de founders mientras crece: exclusividad de categoría, lockup en flyers, lugar fijo en el QR y prioridad en la rotación de los 5 minutos. Capital y Presentan ya tienen aliados.",
  },
  {
    question: "¿Cómo patrocino?",
    answer:
      "Elige un paquete, completa el formulario y Nicolas te contacta para cerrar el acuerdo. Conversamos el recurso: qué es, cuál es el tope de la edición, y dónde aplican los founders.",
  },
  {
    question: "¿Puedo patrocinar una sola edición?",
    answer:
      "Comunidad y Recurso pueden ser de una edición si el recurso acotado está listo. Pilar tiene más sentido a 3–6 meses: la exclusividad es cómo la comunidad te recuerda.",
  },
] as const;
