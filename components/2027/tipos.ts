import type { CSSProperties } from "react";

import { formatos2027 } from "@/lib/site";

export const FORMATOS = formatos2027.filter((f) => f.visible);

const NUMEROS = ["cero", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];

/** Cuántos formatos hay a la vista, en palabras («cinco»). */
export const CUENTA_PALABRA = NUMEROS[FORMATOS.length] ?? String(FORMATOS.length);

export type Estilo = CSSProperties & Record<`--${string}`, string | number>;

/** viewBox del logotipo más ancho, para que nada salte al cambiar de palabra. */
export const VIEWBOX_ANCHO = FORMATOS.reduce((mejor, f) => {
  const w = (v: string) => Number(v.split(" ")[2]);
  return w(f.viewBox) > w(mejor) ? f.viewBox : mejor;
}, FORMATOS[0]?.viewBox ?? "0 0 4699 1524");

export const LUMA_URL = "https://luma.com/ccstech_";
export const INSTAGRAM_URL = "https://www.instagram.com/caracastech_meetup/";
