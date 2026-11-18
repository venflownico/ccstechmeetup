"use client";

import { Globe } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type PointerEvent } from "react";

import { useQuieto } from "@/components/2027/quieto";
import type { TeamMember } from "@/lib/site";

function dominio(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/**
 * Tarjeta de un miembro del equipo. Se comporta como las tarjetas de formato de /2027:
 * entra ligada al scroll (y se revierte al subir), la foto se desplaza dentro de la tarjeta,
 * se inclina en 3D con el cursor y la foto se acerca al pasar por encima.
 */
export function TarjetaEquipo({ person }: { person: TeamMember }) {
  const quieto = useQuieto();
  const caja = useRef<HTMLDivElement>(null);
  const conRaton = useRef(false);

  const { scrollYProgress: entra } = useScroll({ target: caja, offset: ["start end", "start 60%"] });
  const { scrollYProgress: pasa } = useScroll({ target: caja, offset: ["start end", "end start"] });
  const y = useTransform(entra, [0, 1], [80, 0]);
  const rotateX = useTransform(entra, [0, 1], [14, 0]);
  const scale = useTransform(entra, [0, 1], [0.92, 1]);
  const opacity = useTransform(entra, [0, 1], [0.35, 1]);
  const fotoY = useTransform(pasa, [0, 1], ["-5%", "5%"]);

  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });
  useEffect(() => {
    conRaton.current = matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);
  function mover(e: PointerEvent<HTMLDivElement>) {
    if (quieto || !conRaton.current || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  }
  function soltar() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={caja}
      className="h-full [perspective:1100px]"
      style={quieto ? undefined : { y, rotateX, scale, opacity }}
    >
      <motion.article
        className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-[#46c536]/50"
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={mover}
        onPointerLeave={soltar}
      >
        <div className="relative aspect-square overflow-hidden">
          <motion.div className="absolute inset-x-0 -inset-y-[6%]" style={quieto ? undefined : { y: fotoY }}>
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover transition-transform duration-[1200ms] ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-105"
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </motion.div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-lg font-semibold text-white">{person.name}</h3>
          <p className="text-sm text-[#46c536]">{person.role}</p>
          <p className="mt-2 text-sm text-white/60">{person.bio}</p>

          {/* Pie de alto fijo: así los logos y enlaces quedan a la misma altura en todas las tarjetas. */}
          <div className="mt-auto pt-5">
            <div className="flex h-11 items-center">
              {person.logo && person.web ? (
                <Link
                  href={person.web}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Sitio de ${person.proyecto ?? person.name}`}
                  className="inline-flex h-11 items-center opacity-90 transition-opacity hover:opacity-100"
                >
                  {/* Los logos vienen en versión para fondo oscuro; screen borra los fondos negros. */}
                  <Image
                    src={person.logo}
                    alt={person.proyecto ?? ""}
                    width={160}
                    height={40}
                    unoptimized
                    className={`${person.logoCuadrado ? "h-11" : "h-8"} w-auto max-w-[150px] object-contain object-left mix-blend-screen`}
                  />
                </Link>
              ) : null}
            </div>
            <div className="mt-2 flex flex-col text-sm">
              {person.web ? (
                <Link
                  href={person.web}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 text-white/80 hover:text-[#46c536]"
                >
                  <Globe className="size-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span className="truncate">{dominio(person.web)}</span>
                </Link>
              ) : (
                <span className="min-h-10" aria-hidden="true" />
              )}
              <Link
                href={person.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center text-white/70 hover:text-[#46c536]"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
