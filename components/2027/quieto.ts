"use client";

import { useSyncExternalStore } from "react";

const CONSULTA = "(prefers-reduced-motion: reduce)";

function suscribir(cb: () => void) {
  const m = matchMedia(CONSULTA);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

/**
 * true cuando la persona pidió menos movimiento. En el servidor y en la
 * hidratación vale false (mismo HTML) y se corrige enseguida en el cliente.
 */
export function useQuieto() {
  return useSyncExternalStore(
    suscribir,
    () => matchMedia(CONSULTA).matches,
    () => false,
  );
}
