"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { CalendarDays, FileDown, MapPin, Users } from "lucide-react";
import { useRef } from "react";

import { Foto } from "@/components/2027/foto";
import type { Estilo } from "@/components/2027/tipos";

import { Ancla } from "./ancla";
import s from "./estilos.module.css";

export const PDF_PROPUESTA = "/patrocinar/caracas-tech-patrocinios-2027.pdf";

const DATOS = [
  { Icono: CalendarDays, titulo: "Cuándo", valor: "Tercer jueves, 5:30 p. m." },
  { Icono: MapPin, titulo: "Dónde", valor: "Chapeau House" },
  { Icono: Users, titulo: "Por noche", valor: "120 a 175" },
] as const;

export function Entrada() {
  const ref = useRef<HTMLElement>(null);

  // Al bajar: la foto escala y se desplaza, el texto sube y se desvanece. Al subir, vuelve.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fotoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const fotoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textoY = useTransform(scrollYProgress, [0, 0.7], [0, -90]);
  const textoOpacidad = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const estilo: Estilo = { "--c": "#46c536", "--cl": "#7fe36f" };

  return (
    <section ref={ref} className={s.entrada} aria-labelledby="t-patrocinar" style={estilo}>
      <Foto
        src="/2027/fotos/meetup.jpg"
        alt=""
        foco="35% 62%"
        sizes="100vw"
        preload
        clase={s.fotoEntrada}
        y={fotoY}
        scale={fotoScale}
      />
      <div className={s.veloEntrada} aria-hidden="true" />
      <motion.div className={`${s.envoltura} ${s.titular}`} style={{ y: textoY, opacity: textoOpacidad }}>
        <h1 id="t-patrocinar" className={s.h1}>
          Patrocina el Caracas Tech Meetup
        </h1>
        <p className={s.bajada}>Cada mes, frente a quienes construyen las startups de Caracas.</p>
        <ul className={s.datos}>
          {DATOS.map(({ Icono, titulo, valor }) => (
            <li key={titulo} className={s.dato}>
              <span className={s.datoIcono} aria-hidden="true">
                <Icono strokeWidth={1.75} />
              </span>
              <span className={s.datoTexto}>
                <span className={s.datoTitulo}>{titulo}</span>
                <span className={s.datoValor}>{valor}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className={s.botones}>
          <Ancla id="formulario" className={s.primario}>
            Conversemos
          </Ancla>
          <a className={s.secundario} href={PDF_PROPUESTA} download>
            <FileDown strokeWidth={1.75} aria-hidden="true" />
            Descargar la propuesta
          </a>
        </div>
      </motion.div>
    </section>
  );
}
