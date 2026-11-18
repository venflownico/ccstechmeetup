"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { BellRing, CalendarDays, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

import s from "./estilos.module.css";
import { TextoTipeado } from "./texto-tipeado";
import { FORMATOS } from "./tipos";
import type { Estilo } from "./tipos";

const DATOS: { Icono: LucideIcon; texto: string; color: string }[] = [
  { Icono: CalendarDays, texto: "El meetup sigue cada mes", color: FORMATOS[0]?.cl ?? "#7fe36f" },
  { Icono: Sparkles, texto: "Cinco formatos nuevos en 2027", color: FORMATOS[2]?.cl ?? "#ffb066" },
  {
    Icono: BellRing,
    texto: "Marca los que te interesan y te avisamos",
    color: FORMATOS[5]?.cl ?? "#ff8fbd",
  },
];

function Dato({ Icono, texto, color }: (typeof DATOS)[number]) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 70%"] });
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacidad = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const icono = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const base: Estilo = { "--c": color };

  return (
    <motion.li
      ref={ref}
      className={s.dato}
      style={{ ...base, y, opacity: opacidad }}
    >
      <motion.span className={s.datoIcono} aria-hidden="true" style={{ scale: icono }}>
        <Icono strokeWidth={1.75} />
      </motion.span>
      <TextoTipeado texto={texto} />
    </motion.li>
  );
}

export function DatosRapidos() {
  return (
    <section className={`${s.datos} ${s.envoltura}`} aria-label="Lo esencial">
      <ul className={s.datosLista}>
        {DATOS.map((d) => (
          <Dato key={d.texto} {...d} />
        ))}
      </ul>
    </section>
  );
}
