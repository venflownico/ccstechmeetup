export const resourceFilters = [
  { id: "all", label: "Todos" },
  { id: "infra", label: "Infraestructura" },
  { id: "pagos", label: "Pagos" },
  { id: "talento", label: "Talento" },
  { id: "mentoria", label: "Mentoría" },
] as const;

export type ResourceFilterId = (typeof resourceFilters)[number]["id"];
export type ResourceCategoryId = Exclude<ResourceFilterId, "all">;

export const founderResources = [
  {
    id: "venflow",
    name: "Venflow",
    src: "/sponsors/venflow.png",
    category: "pagos",
    offer: "Procesamiento de pagos",
    detail:
      "Grant acotado para que tu startup pueda cobrar. Aplica y el equipo de Venflow te responde.",
  },
  {
    id: "money",
    name: "Money",
    src: "/sponsors/money.png",
    category: "pagos",
    offer: "Herramientas de pagos",
    detail: "Aplica para un cupo de herramientas de pagos y operación financiera.",
  },
  {
    id: "fina",
    name: "Fina",
    src: "/sponsors/fina.png",
    category: "pagos",
    offer: "Infra financiera",
    detail: "Aplica para acceso acotado a infraestructura financiera para startups.",
  },
  {
    id: "rial",
    name: "Rial",
    src: "/sponsors/rial.png",
    category: "pagos",
    offer: "Pagos y liquidación",
    detail: "Aplica para un grant acotado de pagos y liquidación.",
  },
  {
    id: "wave",
    name: "Wave",
    src: "/sponsors/wave.png",
    category: "infra",
    offer: "Hub e infraestructura",
    detail: "Aplica para créditos o acceso a infraestructura y comunidad de builders.",
  },
  {
    id: "kurios",
    name: "Kurios",
    src: "/sponsors/kurios.png",
    category: "talento",
    offer: "Formación",
    detail: "Aplica para cupos de formación para el equipo que estás construyendo.",
  },
  {
    id: "impulsa",
    name: "Impulsa VC",
    src: "/sponsors/impulsa-vc.png",
    category: "mentoria",
    offer: "Office hours",
    detail: "Aplica para office hours con el fondo. Se agendan después — no hay mesa en el meetup.",
  },
  {
    id: "innoven",
    name: "Innoven",
    src: "/sponsors/innoven.png",
    category: "mentoria",
    offer: "Mentoría de operators",
    detail: "Aplica para un cupo de mentoría con operators que ya recorrieron el camino.",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  name: string;
  src: string;
  category: ResourceCategoryId;
  offer: string;
  detail: string;
}>;

export type FounderResource = (typeof founderResources)[number];
export type FounderResourceId = FounderResource["id"];

export function isFounderResourceId(value: unknown): value is FounderResourceId {
  return founderResources.some((resource) => resource.id === value);
}

export function getFounderResource(id: string) {
  return founderResources.find((resource) => resource.id === id);
}
