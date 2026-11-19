"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { CircleCheck, Hourglass } from "lucide-react";
import { useRef } from "react";

import { LogotipoFormato } from "@/components/logotipo-formato";
import type { Formato2027 } from "@/lib/site";

import s from "./estilos.module.css";
import { ICONOS_FORMATO } from "./iconos";
import { useIrA } from "./lenis";
import { useQuieto } from "./quieto";
import { TextoTipeado } from "./texto-tipeado";
import { FORMATOS, REPARTO_ESTADO } from "./tipos";
import type { Estilo } from "./tipos";

function Item({ f, k }: { f: Formato2027; k: number }) {
  const irA = useIrA();
  const quieto = useQuieto();
  const ref = useRef<HTMLLIElement>(null);
  const Icono = ICONOS_FORMATO[f.icono];
  const vars: Estilo = { "--c": f.c, "--cl": f.cl };
  const confirmado = f.estado === "confirmado";

  // Entra al subir por la pantalla y sale al volver a bajar el scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 80%"] });
  const y = useTransform(scrollYProgress, [0, 1], [quieto ? 0 : 28, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [quieto ? 1 : 0.15, 1]);

  return (
    <motion.li
      ref={ref}
      className={s.rsItem}
      style={{ ...vars, y, opacity }}
      data-k={k}
    >
      <a
        href={`#f-${f.id}`}
        className={s.rsEnlace}
        onClick={(e) => {
          e.preventDefault();
          irA(`f-${f.id}`, 195);
        }}
      >
        <span className={s.rsIcono} aria-hidden="true">
          <Icono strokeWidth={1.75} />
        </span>
        <span className={s.rsCuerpo}>
          <span className={s.rsCabeza}>
            <LogotipoFormato palabra={f.palabra} color={f.cl} viewBox={f.viewBox} className={s.rsLogo} />
            <span className={s.rsEstado} data-estado={f.estado}>
              {confirmado ? (
                <CircleCheck strokeWidth={2} aria-hidden="true" />
              ) : (
                <Hourglass strokeWidth={2} aria-hidden="true" />
              )}
              {confirmado ? "Confirmado" : "En camino"}
            </span>
          </span>
        </span>
      </a>
    </motion.li>
  );
}

/** Índice de los formatos de 2027: logotipo, ícono y estado. La descripción vive en la tarjeta a la que lleva cada uno. */
export function Resumen() {
  return (
    <section className={`${s.resumen} ${s.envoltura}`} id="resumen" aria-labelledby="t-resumen">
      <TextoTipeado as="h2" id="t-resumen" texto={REPARTO_ESTADO} />
      <ul className={s.rsLista}>
        {FORMATOS.map((f, k) => (
          <Item key={f.id} f={f} k={k} />
        ))}
      </ul>
    </section>
  );
}
