import { Compass, HandCoins, Handshake, Target, UserSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * A quién quiere conocer la persona y en qué formatos de 2027 es más fácil coincidir.
 * El orden de `formatos` es el orden de la recomendación. Los ids de formato son los de `formatos2027`.
 */
export const BUSQUEDAS = [
  {
    id: "inversionista",
    etiqueta: "Un inversionista",
    Icono: HandCoins,
    formatos: ["demo-day", "dinner", "meetup"],
  },
  {
    id: "cofounder",
    etiqueta: "Un cofounder",
    Icono: Handshake,
    formatos: ["hackathon", "meetup", "week"],
  },
  {
    id: "cliente",
    etiqueta: "Tu próximo cliente",
    Icono: Target,
    formatos: ["meetup", "week", "dinner"],
  },
  {
    id: "talento",
    etiqueta: "Talento para tu equipo",
    Icono: UserSearch,
    formatos: ["hackathon", "week", "meetup"],
  },
  {
    id: "mentor",
    etiqueta: "Alguien que ya pasó por esto",
    Icono: Compass,
    formatos: ["dinner", "wellness", "meetup"],
  },
] as const satisfies readonly {
  id: string;
  etiqueta: string;
  Icono: LucideIcon;
  formatos: readonly string[];
}[];

export type BusquedaId = (typeof BUSQUEDAS)[number]["id"];

export const IDS_BUSQUEDA: readonly BusquedaId[] = BUSQUEDAS.map((b) => b.id);

export function esBusqueda(valor: unknown): valor is BusquedaId {
  return typeof valor === "string" && (IDS_BUSQUEDA as readonly string[]).includes(valor);
}

/** Ids de formato recomendados para una búsqueda (vacío si no hay búsqueda). */
export function formatosDe(id: BusquedaId | null): readonly string[] {
  if (!id) return [];
  return BUSQUEDAS.find((b) => b.id === id)?.formatos ?? [];
}
