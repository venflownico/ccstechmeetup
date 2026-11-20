"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import Link from "next/link";
import { useMemo, useRef } from "react";
import type { ElementType } from "react";

import s from "./estilos.module.css";
import type { Estilo } from "./tipos";

type Enlace = { texto: string; href: string };

/**
 * Cuántas letras dura la transición de cada una (debe coincidir con el CSS de `.l`).
 * Con más de una, varias letras se funden a la vez y el tipeo se ve como una ola, no a saltos.
 */
export const RAMPA = 3;

/**
 * Resorte con el que el texto sigue al scroll. Se recalcula en cada cuadro de la pantalla,
 * así que aunque el dedo salte mucho de golpe, las letras aparecen y se borran en cascada.
 */
export const RESORTE_TEXTO = { stiffness: 170, damping: 30, mass: 0.6, restDelta: 0.01 };
type Car = { ch: string; i: number; enlace: boolean };

/** Parte el texto en letras numeradas (los espacios no cuentan) agrupadas por palabra. */
function trocear(texto: string, enlace?: Enlace, final?: string) {
  const letras: Car[] = [];
  let i = 0;
  const sumar = (t: string, esEnlace: boolean) => {
    for (const ch of Array.from(t)) {
      if (ch === " ") letras.push({ ch, i: -1, enlace: esEnlace });
      else letras.push({ ch, i: i++, enlace: esEnlace });
    }
  };
  sumar(texto, false);
  if (enlace) sumar(enlace.texto, true);
  if (final) sumar(final, false);
  const palabras: Car[][] = [[]];
  for (const l of letras) {
    if (l.ch === " ") palabras.push([]);
    else palabras[palabras.length - 1].push(l);
  }
  return { palabras: palabras.filter((p) => p.length), total: i };
}

export function contarLetras(texto: string, enlace?: Enlace, final?: string) {
  return trocear(texto, enlace, final).total;
}

/**
 * El texto completo va una vez para lectores de pantalla y otra, letra por letra
 * y aria-hidden, para la vista. `n` es cuántas letras se ven (puede ser fraccionario).
 */
export function Letras({
  texto,
  enlace,
  final,
  n,
}: {
  texto: string;
  enlace?: Enlace;
  final?: string;
  n: MotionValue<number> | number;
}) {
  const { palabras } = useMemo(() => trocear(texto, enlace, final), [texto, enlace, final]);

  return (
    <motion.span className={s.tt} style={{ "--n": n } as Estilo}>
      <span className={s.sr}>{texto}</span>
      {palabras.map((palabra, k) => {
        const grupos: { enlace: boolean; letras: Car[] }[] = [];
        for (const l of palabra) {
          const ult = grupos[grupos.length - 1];
          if (ult && ult.enlace === l.enlace) ult.letras.push(l);
          else grupos.push({ enlace: l.enlace, letras: [l] });
        }
        return (
          <span key={k}>
            {k > 0 ? " " : null}
            <span className={s.pal}>
              {grupos.map((g, j) => {
                const hijos = g.letras.map((l) => (
                  <span key={l.i} className={s.l} style={{ "--i": l.i } as Estilo}>
                    {l.ch}
                  </span>
                ));
                return g.enlace && enlace ? (
                  <Link key={j} href={enlace.href} className={s.enlaceT}>
                    {hijos}
                  </Link>
                ) : (
                  <span key={j} aria-hidden="true">
                    {hijos}
                  </span>
                );
              })}
            </span>
          </span>
        );
      })}
      {final ? <span className={s.sr}>{final}</span> : null}
    </motion.span>
  );
}

/** Título que se escribe según el desplazamiento y se borra al volver a subir. */
export function TextoTipeado({
  as = "p",
  id,
  className,
  texto,
  enlace,
  final,
}: {
  as?: "p" | "h2" | "span";
  id?: string;
  className?: string;
  texto: string;
  enlace?: Enlace;
  final?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const total = contarLetras(texto, enlace, final);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 55%"] });
  // Al llegar al final de la página todo queda escrito, aunque el bloque no alcance la altura de lectura.
  const { scrollYProgress: pagina } = useScroll();
  const crudo = useTransform([scrollYProgress, pagina], ([a, b]: number[]) =>
    Math.max(a * (total + RAMPA), b > 0.97 ? total + RAMPA : 0),
  );
  const n = useSpring(crudo, RESORTE_TEXTO);
  const Elemento = as as ElementType;

  return (
    <Elemento ref={ref} id={id} className={className}>
      <Letras texto={texto} enlace={enlace} final={final} n={n} />
    </Elemento>
  );
}
