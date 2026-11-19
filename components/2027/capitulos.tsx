"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { BUSQUEDAS } from "@/lib/busquedas-2027";
import type { BusquedaId } from "@/lib/busquedas-2027";

import { ALTO_FIJO, Capitulo } from "./capitulos/capitulo";
import s from "./estilos.module.css";
import { useIrA } from "./lenis";
import { useQuieto } from "./quieto";
import { TextoTipeado } from "./texto-tipeado";
import { CUENTA_PALABRA } from "./tipos";
import type { Estilo } from "./tipos";

/** Cuánto más abajo del inicio del capítulo se aterriza, para que el título ya esté a la vista. */
const COLCHON = 48;

const BASE: RGB = [5, 11, 18]; // #050b12
type RGB = [number, number, number];

function aRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mezcla(abajo: RGB, arriba: RGB, a: number): RGB {
  return [0, 1, 2].map((i) => abajo[i] + (arriba[i] - abajo[i]) * a) as RGB;
}
function aHex(c: RGB) {
  return `#${c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}
/** Color visible de cada capítulo: el mismo que pinta `.fondo i` (16 % del color sobre #050b12). */
const COLOR_CAP: RGB[] = BUSQUEDAS.map((b) => mezcla(BASE, aRgb(b.c), 0.16));

/** Una capa de color de fondo que se funde sobre la anterior mientras entra su capítulo. */
function Capa({ k, el }: { k: number; el: HTMLElement }) {
  const target = useMemo(() => ({ current: el }), [el]);
  const { scrollYProgress } = useScroll({ target, offset: ["start end", `start ${ALTO_FIJO}px`] });
  const opacity = useTransform(scrollYProgress, [0, 1], [k === 0 ? 1 : 0, 1]);
  return <motion.i style={{ opacity, ...({ "--c": BUSQUEDAS[k].c } as CSSProperties) }} />;
}

export function Capitulos({
  busca,
  onBusca,
  barra = false,
}: {
  barra?: boolean;
  busca: readonly BusquedaId[];
  onBusca: (id: BusquedaId) => void;
}) {
  const irA = useIrA();
  const [els, setEls] = useState<(HTMLElement | null)[]>(() => BUSQUEDAS.map(() => null));
  const poner = useCallback(
    (k: number, el: HTMLElement | null) =>
      setEls((prev) => (prev[k] === el ? prev : prev.map((x, i) => (i === k ? el : x)))),
    [],
  );

  // «Saltar» solo se ve mientras la línea media de la pantalla cruza los capítulos.
  const caps = useRef<HTMLDivElement>(null);
  const [dentro, setDentro] = useState(false);
  useEffect(() => {
    const el = caps.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setDentro(e.isIntersecting), { rootMargin: "-50% 0px -50% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // El fondo de color existe solo mientras se recorren los capítulos: entra al acercarse el primero y se desvanece del todo al salir el último.
  const { scrollYProgress: entra } = useScroll({ target: caps, offset: ["start end", "start 45%"] });
  const { scrollYProgress: sale } = useScroll({ target: caps, offset: ["end 90%", "end 25%"] });
  const velo = useTransform([entra, sale], ([e, o]: number[]) => Math.min(e, 1 - o));
  // Fuera de los capítulos la capa no existe ni para Safari (sin opacidad residual pegada al borde).
  const oculto = useTransform(velo, (v) => (v > 0.002 ? "visible" : "hidden"));

  // Safari tiñe sus barras con el fondo de html/body y la meta theme-color: se sigue el color visible del fondo.
  const quieto = useQuieto();
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const antes = [html.style.backgroundColor, body.style.backgroundColor];
    let metas = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]'));
    const propia = metas.length === 0;
    if (propia) {
      const m = document.createElement("meta");
      m.name = "theme-color";
      document.head.appendChild(m);
      metas = [m];
    }
    const originales = metas.map((m) => m.content);
    let raf = 0;
    const pintar = () => {
      raf = 0;
      let color = BASE;
      if (!quieto) {
        let capa: RGB | null = null;
        els.forEach((el, k) => {
          if (!el) return;
          const a = k === 0 ? 1 : Math.min(1, Math.max(0, (innerHeight - el.getBoundingClientRect().top) / (innerHeight - ALTO_FIJO)));
          capa = capa ? mezcla(capa, COLOR_CAP[k], a) : COLOR_CAP[k];
        });
        if (capa) color = mezcla(BASE, capa, velo.get());
      }
      const hex = aHex(color);
      html.style.backgroundColor = hex;
      body.style.backgroundColor = hex;
      for (const m of metas) m.content = hex;
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(pintar);
    };
    pintar();
    addEventListener("scroll", pedir, { passive: true });
    addEventListener("resize", pedir);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      removeEventListener("scroll", pedir);
      removeEventListener("resize", pedir);
      html.style.backgroundColor = antes[0];
      body.style.backgroundColor = antes[1];
      if (propia) metas[0].remove();
      else metas.forEach((m, i) => (m.content = originales[i]));
    };
  }, [els, quieto, velo]);

  const saltar = (id: string) => irA(`c-${id}`, ALTO_FIJO - COLCHON);

  return (
    <>
      <section className={`${s.apertura} ${s.envoltura}`} aria-labelledby="t-apertura">
        <TextoTipeado as="h2" id="t-apertura" texto="¿A quién quieres conocer?" />
        <p className={s.aperturaBajada}>
          En Caracas hay más gente construyendo de la que cabe en una noche. En 2027 hay {CUENTA_PALABRA} maneras de coincidir.
        </p>
        <ul className={s.perChips}>
          {BUSQUEDAS.map((b) => (
            <li key={b.id}>
              <button
                type="button"
                className={s.perChip}
                style={{ "--c": b.c, "--cl": b.cl } as Estilo}
                data-on={busca.includes(b.id) ? "" : undefined}
                onClick={() => saltar(b.id)}
              >
                <b.Icono strokeWidth={1.75} aria-hidden="true" />
                {b.etiqueta}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className={s.pers}>
        <motion.div className={s.fondo} style={{ opacity: velo, visibility: oculto }} aria-hidden="true">
          {BUSQUEDAS.map((b, k) => {
            const el = els[k];
            return el ? <Capa key={b.id} k={k} el={el} /> : null;
          })}
        </motion.div>
        <div ref={caps}>
          {BUSQUEDAS.map((b, k) => (
            <Capitulo key={b.id} k={k} marcado={busca.includes(b.id)} onBusca={onBusca} onEl={poner} />
          ))}
        </div>
        <a
          className={s.saltar}
          href="#avisame"
          data-ver={dentro ? "" : undefined}
          data-barra={barra ? "" : undefined}
          tabIndex={dentro ? undefined : -1}
          aria-hidden={dentro ? undefined : true}
          onClick={(e) => {
            e.preventDefault();
            irA("avisame");
          }}
        >
          Saltar
        </a>
        <p className={s.capCierre} aria-live="polite">
          {busca.length ? "Anotado. Lo tendremos en cuenta cuando te avisemos." : ""}
        </p>
      </div>
    </>
  );
}
