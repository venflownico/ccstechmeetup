import { Compass, Footprints, HandCoins, Handshake, Target, UserSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { formatos2027 } from "@/lib/site";

/** Color principal y claro de un formato de 2027 (el primero de cada búsqueda manda). */
function colorDe(idFormato: string) {
  const f = formatos2027.find((x) => x.id === idFormato);
  return { c: f?.c ?? "#46c536", cl: f?.cl ?? "#7fe36f" };
}

/**
 * A quién quiere conocer la persona y en qué formatos de 2027 es más fácil coincidir.
 * El orden de `formatos` es el orden de la recomendación y el primero da el color del capítulo.
 * Los ids de formato son los de `formatos2027`.
 */
export const BUSQUEDAS = [
  {
    id: "inversionista",
    etiqueta: "Un inversionista",
    frase: "Te ve presentar tu startup y se queda con tu nombre.",
    Icono: HandCoins,
    formatos: ["demo-day", "dinner"],
    ...colorDe("demo-day"),
  },
  {
    id: "cofounder",
    etiqueta: "Un cofounder",
    frase: "Un fin de semana construyendo juntos dice más que diez cafés.",
    Icono: Handshake,
    formatos: ["hackathon", "meetup"],
    ...colorDe("hackathon"),
  },
  {
    id: "cliente",
    etiqueta: "Tu próximo cliente",
    frase: "Está en la misma sala, buscando lo que vendes.",
    Icono: Target,
    formatos: ["meetup", "week"],
    ...colorDe("meetup"),
  },
  {
    id: "talento",
    etiqueta: "Talento para tu equipo",
    frase: "La persona que te falta puede estar en la sala.",
    Icono: UserSearch,
    formatos: ["week", "hackathon"],
    ...colorDe("week"),
  },
  {
    id: "yapaso",
    etiqueta: "Alguien que ya pasó por esto",
    frase: "Te cuenta en el camino lo que no sale en ningún post.",
    Icono: Footprints,
    formatos: ["wellness", "dinner"],
    ...colorDe("wellness"),
  },
  {
    id: "mentor",
    etiqueta: "Un mentor",
    frase: "Una conversación a tiempo te ahorra meses de prueba y error.",
    Icono: Compass,
    formatos: ["dinner", "week"],
    ...colorDe("dinner"),
  },
] as const satisfies readonly {
  id: string;
  etiqueta: string;
  frase: string;
  Icono: LucideIcon;
  formatos: readonly string[];
  c: string;
  cl: string;
}[];

export type BusquedaId = (typeof BUSQUEDAS)[number]["id"];

export const IDS_BUSQUEDA: readonly BusquedaId[] = BUSQUEDAS.map((b) => b.id);

export function esBusqueda(valor: unknown): valor is BusquedaId {
  return typeof valor === "string" && (IDS_BUSQUEDA as readonly string[]).includes(valor);
}

/**
 * Deja solo ids válidos, sin repetidos y en el orden de los capítulos.
 * Acepta un arreglo o un texto suelto (visitas viejas mandaban un solo id).
 */
export function limpiarBusquedas(valor: unknown): BusquedaId[] {
  const lista = Array.isArray(valor) ? valor : typeof valor === "string" ? [valor] : [];
  return IDS_BUSQUEDA.filter((id) => lista.includes(id));
}

/** Ids de formato recomendados para las búsquedas marcadas, sin repetir (vacío si no hay ninguna). */
export function formatosDe(ids: readonly BusquedaId[]): string[] {
  const salida = new Set<string>();
  for (const b of BUSQUEDAS) {
    if (ids.includes(b.id)) for (const f of b.formatos) salida.add(f);
  }
  return Array.from(salida);
}
