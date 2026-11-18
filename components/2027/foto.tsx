"use client";

import { motion } from "motion/react";
import type { MotionValue } from "motion/react";
import Image from "next/image";

import s from "./estilos.module.css";

/**
 * Foto en duotono: fondo del color claro del formato, la foto en blanco y negro
 * multiplicada encima y una capa oscura teñida que levanta las sombras (lighten).
 * Los colores salen de --c y --cl del contenedor.
 */
export function Foto({
  src,
  alt,
  foco,
  sizes,
  preload,
  y,
  scale,
  clase,
}: {
  src: string;
  alt: string;
  foco: string;
  sizes: string;
  preload?: boolean;
  y?: MotionValue<string>;
  scale?: MotionValue<number>;
  clase?: string;
}) {
  return (
    <motion.div className={`${s.foto}${clase ? ` ${clase}` : ""}`} style={{ y, scale }}>
      <Image
        className={s.fotoImg}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        style={{ objectPosition: foco }}
      />
      <span className={s.tinte} aria-hidden="true" />
    </motion.div>
  );
}
