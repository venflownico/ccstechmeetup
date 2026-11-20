"use client";

import { motion } from "motion/react";

export type Pieza = {
  x: number;
  y: number;
  r: number;
  t: number;
  color: string;
  retraso: number;
};

const azar = (a: number, b: number) => a + Math.random() * (b - a);

/** Partículas que salen del botón en todas direcciones. */
export function crearEstallido(colores: string[], cantidad = 12): Pieza[] {
  return Array.from({ length: cantidad }, (_, k) => {
    const ang = (k / cantidad) * Math.PI * 2 + azar(-0.25, 0.25);
    const dist = azar(46, 92);
    return {
      x: Math.cos(ang) * dist,
      y: Math.sin(ang) * dist * 0.8,
      r: 0,
      t: azar(5, 9),
      color: colores[k % colores.length],
      retraso: 0,
    };
  });
}

/** Piezas de confeti: suben, se abren y caen. */
export function crearConfeti(colores: string[], cantidad = 44): Pieza[] {
  return Array.from({ length: cantidad }, (_, k) => ({
    x: azar(-300, 300),
    y: azar(150, 330),
    r: azar(-540, 540),
    t: azar(6, 11),
    color: colores[k % colores.length],
    retraso: azar(0, 0.12),
  }));
}

export function Estallido({ piezas, alTerminar }: { piezas: Pieza[]; alTerminar: () => void }) {
  return (
    <span className="estallido" aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {piezas.map((p, k) => (
        <motion.i
          key={k}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: p.t,
            height: p.t,
            marginLeft: -p.t / 2,
            marginTop: -p.t / 2,
            borderRadius: "50%",
            background: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 0.8, 0.3, 1] }}
          onAnimationComplete={k === 0 ? alTerminar : undefined}
        />
      ))}
    </span>
  );
}

export function Confeti({
  piezas,
  y,
  alTerminar,
}: {
  piezas: Pieza[];
  /** Altura de origen dentro de la pantalla (CSS). */
  y: string;
  alTerminar: () => void;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {piezas.map((p, k) => (
        <motion.i
          key={k}
          style={{
            position: "absolute",
            left: "50%",
            top: y,
            width: p.t,
            height: p.t * 1.6,
            borderRadius: 2,
            background: p.color,
          }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: [0, p.x * 0.7, p.x],
            y: [0, -p.y, p.y * 1.6],
            opacity: [1, 1, 0],
            rotate: p.r,
          }}
          transition={{ duration: 1.5, delay: p.retraso, times: [0, 0.38, 1], ease: "easeOut" }}
          onAnimationComplete={k === 0 ? alTerminar : undefined}
        />
      ))}
    </div>
  );
}
