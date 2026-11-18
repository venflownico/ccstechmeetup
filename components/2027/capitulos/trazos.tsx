"use client";

import { motion, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useId } from "react";
import type { ElementType, ReactNode } from "react";

import s from "../estilos.module.css";

export type Escena = { d: MotionValue<number>; a: MotionValue<number> };

type Forma = "path" | "line" | "circle" | "rect" | "ellipse";

/** Trazo que se dibuja con pathLength entre `de` y `a` del valor `v` (0 a 1). */
export function T({
  v,
  de = 0,
  a = 1,
  tag = "path",
  className,
  ...resto
}: {
  v: MotionValue<number>;
  de?: number;
  a?: number;
  tag?: Forma;
  className?: string;
  [atributo: string]: unknown;
}) {
  const pathLength = useTransform(v, [de, a], [0, 1]);
  // Con pathLength 0 los extremos redondos dejan un punto: se oculta hasta que empieza a dibujarse.
  const opacity = useTransform(pathLength, [0, 0.015], [0, 1]);
  const Forma = motion[tag] as ElementType;
  return <Forma className={`${s.capT} ${className ?? ""}`} style={{ pathLength, opacity }} {...resto} />;
}

/**
 * Grupo que cambia con `v` entre las paradas `t`. Cada salida es un arreglo del mismo largo que `t`.
 * `final`: cómo queda sin movimiento ("ve" se ve, "oculto" desaparece).
 */
export function M({
  v,
  t,
  o,
  x,
  y,
  r,
  s: esc,
  sx,
  final = "ve",
  className,
  children,
}: {
  v: MotionValue<number>;
  t: number[];
  o?: number[];
  x?: number[];
  y?: number[];
  r?: number[];
  s?: number[];
  sx?: number[];
  final?: "ve" | "oculto";
  className?: string;
  children: ReactNode;
}) {
  const uno = t.map(() => 1);
  const cero = t.map(() => 0);
  const opacity = useTransform(v, t, o ?? uno);
  const tx = useTransform(v, t, x ?? cero);
  const ty = useTransform(v, t, y ?? cero);
  const rotate = useTransform(v, t, r ?? cero);
  const scale = useTransform(v, t, esc ?? uno);
  const scaleX = useTransform(v, t, sx ?? uno);
  return (
    <motion.g
      className={`${final === "ve" ? s.capA : s.capSale} ${className ?? ""}`}
      style={{
        opacity,
        x: tx,
        y: ty,
        rotate,
        scale: esc ? scale : undefined,
        scaleX: sx ? scaleX : undefined,
        transformBox: "fill-box",
        transformOrigin: "50% 50%",
      }}
    >
      {children}
    </motion.g>
  );
}

/** Línea punteada que se revela con una máscara que se dibuja. */
export function Punteada({
  v,
  de = 0,
  a = 1,
  d,
  className,
}: {
  v: MotionValue<number>;
  de?: number;
  a?: number;
  d: string;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x={0} y={0} width={400} height={300}>
        <T v={v} de={de} a={a} d={d} stroke="#fff" strokeWidth={10} />
      </mask>
      <path d={d} className={`${s.punt} ${className ?? ""}`} mask={`url(#${id})`} />
    </>
  );
}

/** Cabeza redonda y hombros: un solo trazo. */
export function busto(x: number, cy: number, r: number, w: number, h: number) {
  const base = cy + h;
  const cresta = cy + r + 4;
  return (
    `M${x - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0 ` +
    `M${x - w} ${base} C${x - w} ${cy + h * 0.55} ${x - w * 0.5} ${cresta} ${x} ${cresta} ` +
    `C${x + w * 0.5} ${cresta} ${x + w} ${cy + h * 0.55} ${x + w} ${base}`
  );
}
