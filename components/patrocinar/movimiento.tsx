"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { ReactNode, RefObject } from "react";
import { useRef } from "react";

import { TextoTipeado } from "@/components/2027/texto-tipeado";
import { useQuieto } from "@/components/2027/quieto";

import s from "./estilos.module.css";

/**
 * Progreso de entrada (0 a 1) ligado al desplazamiento: el bloque aparece al subir a la vista
 * y se esconde al volver a bajar. Al llegar al final de la página todo queda visible.
 * `paso` retrasa el comienzo para escalonar tarjetas que comparten fila.
 */
function useRevela(ref: RefObject<HTMLElement | null>, paso: number) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${97 - paso * 4}%`, `start ${80 - paso * 4}%`] as unknown as ["start end", "start end"],
  });
  const { scrollYProgress: pagina } = useScroll();
  const p = useTransform([scrollYProgress, pagina], ([a, b]: number[]) => (b > 0.97 ? 1 : a));
  const opacity = useTransform(p, [0, 1], [0, 1]);
  const y = useTransform(p, [0, 1], [32, 0]);
  return { opacity, y };
}

type Etiqueta = "div" | "li" | "article";

/** Entrada ligada al scroll, reversible. Con movimiento reducido queda quieto y visible. */
export function Revela({
  as = "div",
  paso = 0,
  className,
  children,
}: {
  as?: Etiqueta;
  paso?: number;
  className?: string;
  children: ReactNode;
}) {
  const quieto = useQuieto();
  const ref = useRef<HTMLElement>(null);
  const { opacity, y } = useRevela(ref, paso);
  const M = motion[as] as typeof motion.div;
  return (
    <M
      ref={ref as RefObject<HTMLDivElement>}
      className={`${s.revela}${className ? ` ${className}` : ""}`}
      style={quieto ? undefined : { opacity, y }}
    >
      {children}
    </M>
  );
}

/** Título que se escribe con el scroll; con movimiento reducido es un h2 normal. */
export function Titulo({ texto, id, className }: { texto: string; id?: string; className?: string }) {
  const quieto = useQuieto();
  if (quieto) {
    return (
      <h2 id={id} className={className}>
        {texto}
      </h2>
    );
  }
  return <TextoTipeado as="h2" id={id} className={className} texto={texto} />;
}
