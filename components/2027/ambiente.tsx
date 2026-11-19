"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useState } from "react";
import type { RefObject } from "react";

import s from "./estilos.module.css";
import { useQuieto } from "./quieto";
import { FORMATOS } from "./tipos";
import type { Estilo } from "./tipos";

/** Manchas de luz muy tenues con parallax lento: cada una viaja en un sentido distinto con el scroll. */
const MANCHAS = [
  { f: 1, cls: "manchaA", y: [180, -320], x: [0, 140] },
  { f: 4, cls: "manchaB", y: [-220, 340], x: [0, -120] },
  { f: 2, cls: "manchaC", y: [120, -200], x: [0, -160] },
] as const;

function Mancha({ f, cls, y, x }: (typeof MANCHAS)[number]) {
  const quieto = useQuieto();
  const { scrollYProgress } = useScroll();
  const ty = useTransform(scrollYProgress, [0, 1], quieto ? [0, 0] : [y[0], y[1]]);
  const tx = useTransform(scrollYProgress, [0, 1], quieto ? [0, 0] : [x[0], x[1]]);
  return (
    <motion.i
      className={`${s.mancha} ${s[cls]}`}
      style={{ x: tx, y: ty, ...({ "--c": (FORMATOS[f] ?? FORMATOS[0]).c } as Estilo) }}
    />
  );
}

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
      <div className={s.manchas}>
        {MANCHAS.map((m) => (
          <Mancha key={m.cls} {...m} />
        ))}
      </div>
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

/** Un segmento de color por formato bajo el header que se llenan con la lectura. */
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
