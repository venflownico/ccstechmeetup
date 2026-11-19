"use client";

import { useSyncExternalStore } from "react";

/** Cómo se muestra «¿A quién quieres conocer?» (se elige con `?perfiles=`). */
export type Variante = "una" | "sin" | "completas";

const VARIANTES: readonly Variante[] = ["una", "sin", "completas"];

function leer(): Variante {
  const v = new URLSearchParams(location.search).get("perfiles");
  return VARIANTES.find((x) => x === v) ?? "una";
}

function suscribir(cb: () => void) {
  addEventListener("popstate", cb);
  return () => removeEventListener("popstate", cb);
}

/**
 * Variante de perfiles según `?perfiles=una|sin|completas` (por defecto `una`).
 * Se lee en el cliente para que la página siga siendo estática: el HTML sale con `una`
 * y, si la URL pide otra, se cambia en la hidratación (la sección queda al final de la página).
 */
export function useVariante(): Variante {
  return useSyncExternalStore(suscribir, leer, () => "una");
}
