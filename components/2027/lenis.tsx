"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { useQuieto } from "./quieto";

type IrA = (id: string) => void;

const Contexto = createContext<IrA>(() => {});

/** Desplaza a un ancla de la página compensando el header fijo. */
export function useIrA() {
  return useContext(Contexto);
}

/**
 * Desplazamiento suave con Lenis, solo mientras esta página está montada.
 * Con movimiento reducido no se inicia y los enlaces usan el desplazamiento nativo.
 */
export function Lenis2027({ children }: { children: ReactNode }) {
  const quieto = useQuieto();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (quieto) return;
    const l = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.current = l;
    let raf = requestAnimationFrame(function tick(t) {
      l.raf(t);
      raf = requestAnimationFrame(tick);
    });
    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      lenis.current = null;
    };
  }, [quieto]);

  const irA = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis.current) lenis.current.scrollTo(el, { offset: -72, duration: 1.3 });
      else el.scrollIntoView({ behavior: quieto ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    },
    [quieto],
  );

  return <Contexto.Provider value={irA}>{children}</Contexto.Provider>;
}
