"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import type { RefObject } from "react";

import s from "./estilos.module.css";
import { FORMATOS } from "./tipos";
import type { Estilo } from "./tipos";

/** Resplandor fijo cuyo color pasa al de la tarjeta más cercana al centro de la pantalla. */
export function Luz({ lista }: { lista: RefObject<HTMLUListElement | null> }) {
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    let raf = 0;
    const medir = () => {
      raf = 0;
      const tarjetas = lista.current?.children;
      if (!tarjetas) return;
      const centro = innerHeight / 2;
      let mejor = 0;
      let dist = Infinity;
      for (let i = 0; i < tarjetas.length; i++) {
        const r = tarjetas[i].getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - centro) + Math.abs(r.left + r.width / 2 - innerWidth / 2) * 0.15;
        if (d < dist) {
          dist = d;
          mejor = i;
        }
      }
      setActivo(mejor);
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    pedir();
    addEventListener("scroll", pedir, { passive: true });
    addEventListener("resize", pedir);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      removeEventListener("scroll", pedir);
      removeEventListener("resize", pedir);
    };
  }, [lista]);

  return (
    <div className={s.luz} aria-hidden="true">
      {FORMATOS.map((f, i) => (
        <i key={f.id} className={i === activo ? s.luzOn : undefined} style={{ "--c": f.c } as Estilo} />
      ))}
    </div>
  );
}

function Segmento({ p, k, total, color }: { p: MotionValue<number>; k: number; total: number; color: string }) {
  const scaleX = useTransform(p, [k / total, (k + 1) / total], [0, 1]);
  return <motion.i style={{ scaleX, background: color }} />;
}

/** Seis segmentos de color bajo el header que se llenan con la lectura. */
export function Progreso() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.0005 });
  return (
    <div className={s.progreso} aria-hidden="true">
      {FORMATOS.map((f, k) => (
        <span key={f.id}>
          <Segmento p={p} k={k} total={FORMATOS.length} color={f.c} />
        </span>
      ))}
    </div>
  );
}
