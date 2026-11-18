"use client";

import type { ReactNode } from "react";

import { useIrA } from "@/components/2027/lenis";

/** Enlace a un ancla de la página con el desplazamiento suave de Lenis (y el nativo si no hay). */
export function Ancla({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  const irA = useIrA();
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        irA(id);
      }}
    >
      {children}
    </a>
  );
}
