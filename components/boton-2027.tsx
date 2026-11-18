"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import s from "./boton-2027.module.css";

const DESTINO = "/2027?o=portada-boton";
const COLORES = ["#7fe36f", "#8fa2ff", "#ffb066", "#c4b1ff", "#6fdde9", "#ff8fbd"];
const DURACION = 1250;

type Punto = { x: number; y: number };

function centroDe(el: HTMLElement | null): Punto {
  if (!el) return { x: 0, y: 0 };
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function movimientoReducido() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Botón llamativo de la portada que lleva al adelanto de 2027.
 * Al pasar el cursor, la página se oscurece salvo un halo alrededor del botón.
 * Al hacer clic, un despegue (estrellas que aceleran y un destello) antes de abrir /2027.
 */
export function Boton2027() {
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement>(null);
  const [encendido, setEncendido] = useState(false);
  const [foco, setFoco] = useState(false);
  const [centro, setCentro] = useState<Punto>({ x: 0, y: 0 });
  const [lanzando, setLanzando] = useState(false);

  function acercar() {
    setCentro(centroDe(ref.current));
    setEncendido(true);
    setFoco(true);
    router.prefetch(DESTINO);
  }

  function alejar() {
    if (!lanzando) setFoco(false);
  }

  function despegar(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (movimientoReducido()) return;
    e.preventDefault();
    setCentro(centroDe(ref.current));
    setEncendido(true);
    setFoco(true);
    setLanzando(true);
  }

  return (
    <>
      <Link
        ref={ref}
        href={DESTINO}
        className={`${s.boton} ${foco ? s.activo : ""}`}
        aria-label="Ver lo que viene en 2027"
        onMouseEnter={acercar}
        onMouseLeave={alejar}
        onFocus={acercar}
        onBlur={alejar}
        onClick={despegar}
      >
        <span className={s.anio}>2027</span>
        <span className={s.ojos} aria-hidden="true">
          👀
        </span>
      </Link>
      {encendido
        ? createPortal(
            <>
              <div
                className={`${s.velo} ${foco ? s.veloOn : ""}`}
                style={{
                  background: `radial-gradient(circle at ${centro.x}px ${centro.y}px, rgba(5,11,18,0) 0px, rgba(5,11,18,0) 70px, rgba(5,11,18,0.8) 240px)`,
                }}
                aria-hidden="true"
              />
              {lanzando ? <Despegue origen={centro} alTerminar={() => router.push(DESTINO)} /> : null}
            </>,
            document.body,
          )
        : null}
    </>
  );
}

type Estrella = { x: number; y: number; z: number; color: string };

/** Lienzo a pantalla completa: estrellas que salen del botón y aceleran, temblor y destello. */
function Despegue({ origen, alTerminar }: { origen: Punto; alTerminar: () => void }) {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const capa = useRef<HTMLDivElement>(null);
  const destello = useRef<HTMLDivElement>(null);
  const fin = useRef(alTerminar);

  useEffect(() => {
    fin.current = alTerminar;
  }, [alTerminar]);

  useEffect(() => {
    const canvas = lienzo.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    canvas.width = ancho * dpr;
    canvas.height = alto * dpr;
    ctx.scale(dpr, dpr);

    const cantidad = ancho < 640 ? 160 : 280;
    const estrellas: Estrella[] = Array.from({ length: cantidad }, (_, i) => ({
      x: (Math.random() * 2 - 1) * ancho,
      y: (Math.random() * 2 - 1) * alto,
      z: Math.random() * 0.9 + 0.1,
      color: COLORES[i % COLORES.length],
    }));

    let inicio = 0;
    let previo = 0;
    let marco = 0;
    let terminado = false;

    function dibujar(ahora: number) {
      if (!inicio) {
        inicio = ahora;
        previo = ahora;
      }
      const t = Math.min((ahora - inicio) / DURACION, 1);
      const dt = Math.min(ahora - previo, 40) / 16.7;
      previo = ahora;

      // El punto de fuga viaja del botón al centro de la pantalla mientras se acelera.
      const cx = origen.x + (ancho / 2 - origen.x) * t * t;
      const cy = origen.y + (alto / 2 - origen.y) * t * t;
      const velocidad = 0.004 + 0.06 * t * t * t;

      ctx!.fillStyle = `rgba(5, 11, 18, ${0.55 - 0.35 * t})`;
      ctx!.fillRect(0, 0, ancho, alto);

      for (const e of estrellas) {
        const zAntes = e.z;
        e.z -= velocidad * dt;
        if (e.z <= 0.02) {
          e.x = (Math.random() * 2 - 1) * ancho;
          e.y = (Math.random() * 2 - 1) * alto;
          e.z = 1;
          continue;
        }
        const x1 = cx + (e.x / zAntes) * 0.12;
        const y1 = cy + (e.y / zAntes) * 0.12;
        const x2 = cx + (e.x / e.z) * 0.12;
        const y2 = cy + (e.y / e.z) * 0.12;
        ctx!.strokeStyle = e.color;
        ctx!.globalAlpha = Math.min(1, 0.35 + t);
        ctx!.lineWidth = Math.max(0.8, (1 - e.z) * 3);
        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;

      // Temblor que crece con la velocidad.
      if (capa.current) {
        const a = t * t * 6;
        capa.current.style.transform = `translate(${(Math.random() - 0.5) * a}px, ${(Math.random() - 0.5) * a}px)`;
      }
      // Destello al final.
      if (destello.current) {
        destello.current.style.opacity = String(Math.max(0, (t - 0.8) / 0.2));
      }

      if (t >= 1 && !terminado) {
        terminado = true;
        fin.current();
      }
      marco = requestAnimationFrame(dibujar);
    }

    marco = requestAnimationFrame(dibujar);
    return () => cancelAnimationFrame(marco);
  }, [origen]);

  return (
    <div ref={capa} className={s.despegue} aria-hidden="true">
      <canvas ref={lienzo} className={s.lienzo} />
      <div ref={destello} className={s.destello} />
    </div>
  );
}
