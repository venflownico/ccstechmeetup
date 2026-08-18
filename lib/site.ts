export const site = {
  name: "Caracas Tech Meetup",
  shortName: "CCS Tech Meetup",
  domain: "ccstechmeetup.com",
  url: "https://ccstechmeetup.com",
  tagline: "Por el ecosistema, para el ecosistema.",
  description:
    "Encuentro mensual del ecosistema tech y startups de Venezuela. Conecta, aprende y construye junto a founders, builders e inversionistas.",
  email: "info@venflow.app",
  instagram: "https://www.instagram.com/caracastech_/",
  instagramHandle: "@caracastech_",
  lumaCalendarUrl: "https://luma.com/ccstech_",
  lumaEmbedUrl:
    process.env.NEXT_PUBLIC_LUMA_EMBED_URL ??
    "https://luma.com/embed/calendar/cal-u2swYaAgKESq0h1/events?lt=dark",
} as const;

export const navItems = [
  { href: "#eventos", label: "Eventos" },
  { href: "#patrocinar", label: "Patrocinar" },
  { href: "#equipo", label: "Equipo" },
] as const;

export const stats = [
  { value: 613, suffix: "+", label: "personas únicas en la comunidad" },
  { value: 143, suffix: "", label: "asistencia promedio por meetup" },
  { value: 47, suffix: "%", label: "de asistentes son founders" },
  { value: 12, suffix: "", label: "encuentros al año" },
] as const;

export const presentingSponsors = [
  { name: "Banco Activo", src: "/sponsors/banco-activo.png" },
  { name: "Impulsa VC", src: "/sponsors/impulsa-vc.png" },
] as const;

export const sponsors = [
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

export const packages = [
  {
    id: "comunidad",
    name: "Comunidad",
    price: 500,
    period: "/ mes",
    description: "Visibilidad en cada edición para marcas que quieren estar cerca del ecosistema.",
    featured: false,
    benefits: [
      "Logo en el sitio oficial y en los posters del meetup",
      "Mención en vivo durante el evento",
      "Agradecimiento en Instagram @caracastech_",
      "2 invitaciones confirmadas por edición",
    ],
  },
  {
    id: "destacado",
    name: "Destacado",
    price: 1000,
    period: "/ mes",
    description: "Presencia activa: tu marca se ve, se escucha y conversa con founders.",
    featured: false,
    benefits: [
      "Todo lo de Comunidad",
      "Espacio para un brief de 3 minutos o un stand ligero",
      "Logo en tamaño destacado en materiales",
      "4 invitaciones confirmadas por edición",
      "Acceso a un recap de asistencia post-evento",
    ],
  },
  {
    id: "presentador",
    name: "Presentador",
    price: 2000,
    period: "/ mes",
    description: "El nivel actual de Banco Activo: copresentas el meetup junto al ecosistema.",
    featured: true,
    benefits: [
      "Todo lo de Destacado",
      "Lockup de título: “presentan” en hero, posters y Luma",
      "Palabras de apertura o cierre en cada edición",
      "Activación de marca en venue (señalética / merch)",
      "8 invitaciones confirmadas por edición",
      "Coordinación directa con el equipo fundador",
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
    linkedin: "https://www.linkedin.com/in/amintoreoficial",
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

export const faqs = [
  {
    question: "¿Cómo me registro a un meetup?",
    answer:
      "Todos los eventos viven en Luma. Te registras, pasas por un proceso de aprobación y solo después recibes tu ticket. Los cupos son limitados.",
  },
  {
    question: "¿Quién puede asistir?",
    answer:
      "Founders, operadores, developers, diseñadores UI/UX, inversionistas, estudiantes y cualquiera que esté construyendo en tecnología. Trae curiosidad y ganas de conectar.",
  },
  {
    question: "¿El evento tiene costo?",
    answer:
      "El meetup es impulsado por la comunidad. Pizza, vino, cerveza y bolas criollas están disponibles; el consumo va por cuenta de cada asistente.",
  },
  {
    question: "¿Dónde se hace?",
    answer:
      "En Caracas — generalmente en Chapeau House. La dirección exacta se comparte a quienes tienen ticket confirmado.",
  },
  {
    question: "¿Cómo patrocino?",
    answer:
      "Elige un paquete, completa el formulario y Nicolas te contacta para cerrar el acuerdo. No hay checkout en el sitio: primero conversamos.",
  },
] as const;
