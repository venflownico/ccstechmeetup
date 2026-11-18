"use client";

import { animate, useMotionValue, useScroll } from "motion/react";
import type { MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { BUSQUEDAS } from "@/lib/busquedas-2027";
import type { BusquedaId } from "@/lib/busquedas-2027";

import { montar } from "./calentamiento-motor";
import type { Montaje } from "./calentamiento-motor";
import s from "./estilos.module.css";
import { useIrA } from "./lenis";
import { useQuieto } from "./quieto";
import { Letras, contarLetras } from "./texto-tipeado";
import { FORMATOS } from "./tipos";
import type { Estilo } from "./tipos";

const FRASES = [
  "Un jueves al mes, Caracas Tech llena un patio.",
  "Y cada mes queda gente afuera.",
  "En Caracas hay más gente construyendo de la que cabe en una noche.",
  "En 2027 hay seis maneras de coincidir.",
  "¿A quién quieres conocer?",
];

/** Una frase por paso: la activa se escribe letra a letra, la anterior se funde. */
function Frase({ texto, activa, vista, quieto }: { texto: string; activa: boolean; vista: boolean; quieto: boolean }) {
  const total = contarLetras(texto);
  const n = useMotionValue(total);
  useEffect(() => {
    if (quieto || !activa || !vista) return;
    n.set(0);
    const c = animate(n, total, { duration: Math.max(0.5, total * 0.022), ease: "linear" });
    return () => c.stop();
  }, [activa, vista, quieto, total, n]);
  return (
    <li className={s.calFrase} data-on={activa ? "" : undefined}>
      <Letras texto={texto} n={n as MotionValue<number>} />
    </li>
  );
}

/** Dibujo fijo del estado final: sin JS o con movimiento reducido. */
function Estatico() {
  const cols = 3;
  const celdaW = 600 / cols;
  const R = 62;
  return (
    <svg
      className={s.calEstatico}
      viewBox="0 0 600 390"
      role="img"
      aria-label={`Seis círculos, uno por formato: ${FORMATOS.map((f) => f.palabra).join(", ")}`}
    >
      {FORMATOS.map((f, k) => {
        const col = k % cols;
        const fila = Math.floor(k / cols);
        const x = celdaW * (col + 0.5);
        const y = 80 + fila * 180;
        return (
          <g key={f.id}>
            <circle cx={x} cy={y} r={R} fill={f.c} fillOpacity={0.12} stroke={f.c} strokeWidth={1.6} />
            {Array.from({ length: 11 }, (_, q) => {
              const rho = 0.78 * R * Math.sqrt((q + 0.5) / 11);
              const th = q * 2.39996 + k;
              return <circle key={q} cx={x + rho * Math.cos(th)} cy={y + rho * Math.sin(th)} r={3} fill={f.cl} />;
            })}
            <text
              x={x}
              y={y + R + 26}
              textAnchor="middle"
              fill={f.cl}
              fontSize={26}
              style={{ fontFamily: "var(--font-kalam), cursive" }}
            >
              {f.palabra}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Calentamiento({
  busca,
  onBusca,
}: {
  busca: BusquedaId | null;
  onBusca: (id: BusquedaId | null) => void;
}) {
  const quieto = useQuieto();
  const irA = useIrA();
  const [paso, setPaso] = useState(0);
  const [vista, setVista] = useState(false);
  const sec = useRef<HTMLElement>(null);
  const pegado = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const texto = useRef<HTMLDivElement>(null);
  const frases = useRef<HTMLOListElement>(null);
  const preguntaIn = useRef<HTMLDivElement>(null);
  const etis = useRef<(HTMLSpanElement | null)[]>([]);
  const motor = useRef<Montaje | null>(null);
  const buscaRef = useRef(busca);

  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end end"] });

  useEffect(() => {
    if (quieto) return;
    const c = lienzo.current;
    const p = pegado.current;
    const r = sec.current;
    const t = texto.current;
    const f = frases.current;
    const q = preguntaIn.current;
    if (!c || !p || !r || !t || !f || !q) return;
    const m = montar({
      canvas: c,
      pegado: p,
      sec: r,
      texto: t,
      frases: f,
      preguntaIn: q,
      etis: etis.current,
      progreso: scrollYProgress,
      onPaso: setPaso,
      onVista: setVista,
    });
    motor.current = m;
    m.buscar(buscaRef.current);
    return () => {
      m.destruir();
      motor.current = null;
    };
  }, [quieto, scrollYProgress]);

  useEffect(() => {
    buscaRef.current = busca;
    motor.current?.buscar(busca);
  }, [busca]);

  const enPregunta = quieto || paso === 4;

  return (
    <section ref={sec} className={s.cal} aria-label="Más de una noche">
      <div ref={pegado} className={s.calPegado}>
        <div className={s.calBarra}>
          <span>Paso {paso + 1} de 5</span>
          <a
            className={s.calSaltar}
            href="#formatos"
            onClick={(e) => {
              e.preventDefault();
              irA("formatos");
            }}
          >
            Saltar
          </a>
        </div>
        <Estatico />
        <canvas ref={lienzo} className={s.calLienzo} aria-hidden="true" />
        <div className={s.calEtis} aria-hidden="true">
          {FORMATOS.map((f, k) => (
            <span
              key={f.id}
              ref={(el) => {
                etis.current[k] = el;
              }}
              className={s.calEti}
              style={{ color: f.cl } as Estilo}
            >
              {f.palabra}
            </span>
          ))}
          <span
            ref={(el) => {
              etis.current[FORMATOS.length] = el;
            }}
            className={`${s.calEti} ${s.calEtiTu}`}
          >
            tú
          </span>
        </div>
        <div className={s.calVelo} aria-hidden="true" />
        <div ref={texto} className={s.calTexto}>
          <ol ref={frases} className={s.calFrases}>
            {FRASES.map((t, i) => (
              <Frase key={t} texto={t} activa={paso === i} vista={vista} quieto={quieto} />
            ))}
          </ol>
          <div className={s.calPregunta} data-on={enPregunta ? "" : undefined} inert={!quieto && paso !== 4}>
            <div ref={preguntaIn} className={s.calPreguntaIn}>
              <ul className={s.calChips}>
                {BUSQUEDAS.map((b) => (
                  <li key={b.id}>
                    <button
                      type="button"
                      className={s.calChip}
                      aria-pressed={busca === b.id}
                      onClick={() => onBusca(busca === b.id ? null : b.id)}
                    >
                      <b.Icono strokeWidth={1.75} aria-hidden="true" />
                      {b.etiqueta}
                    </button>
                  </li>
                ))}
              </ul>
              <p className={s.calResultado} aria-live="polite">
                {busca ? "Te marcamos dónde es más fácil coincidir." : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
