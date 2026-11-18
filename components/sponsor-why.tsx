"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

import { useQuieto } from "@/components/2027/quieto";
import s from "@/components/patrocinar/estilos.module.css";
import { formatoMiles } from "@/components/patrocinar/formato";
import { Revela, Titulo } from "@/components/patrocinar/movimiento";
import { sponsorWhy } from "@/lib/site";

/**
 * El número final va siempre en el HTML del servidor. El conteo es solo visual:
 * empieza en 0 al entrar en pantalla, se repite al volver y no corre con movimiento reducido.
 */
function Cifra({ valor }: { valor: number }) {
  const quieto = useQuieto();
  const ref = useRef<HTMLSpanElement>(null);
  const visto = useInView(ref, { amount: 0.6 });
  const mv = useMotionValue(valor);
  const texto = useTransform(mv, (v) => formatoMiles(v));

  useEffect(() => {
    if (quieto) {
      mv.set(valor);
      return;
    }
    if (!visto) {
      mv.set(0);
      return;
    }
    const control = animate(mv, valor, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => control.stop();
  }, [visto, quieto, valor, mv]);

  return (
    <span ref={ref} className={s.numero}>
      <span className={s.sr}>{formatoMiles(valor)}</span>
      <motion.span aria-hidden="true">{texto}</motion.span>
    </span>
  );
}

export function SponsorWhy() {
  return (
    <section className={s.seccion} aria-labelledby="t-cifras">
      <div className={s.envoltura}>
        <Titulo id="t-cifras" className={s.h2} texto={sponsorWhy.title} />
        <ul className={s.cifras}>
          {sponsorWhy.stats.map((stat, i) => (
            <Revela as="li" key={stat.label} paso={i} className={s.cifra}>
              <Cifra valor={stat.value} />
              <span className={s.etiqueta}>{stat.label}</span>
            </Revela>
          ))}
        </ul>
        <p className={s.fuente}>{sponsorWhy.source}</p>
      </div>
    </section>
  );
}
