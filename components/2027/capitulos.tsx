"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { BUSQUEDAS } from "@/lib/busquedas-2027";
import type { BusquedaId } from "@/lib/busquedas-2027";

import { ALTO_FIJO, Capitulo } from "./capitulos/capitulo";
import s from "./estilos.module.css";
import { useIrA } from "./lenis";
import { TextoTipeado } from "./texto-tipeado";
import type { Estilo } from "./tipos";

/** Cuánto más abajo del inicio del capítulo se aterriza, para que el título ya esté a la vista. */
const COLCHON = 48;

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
}: {
  busca: readonly BusquedaId[];
  onBusca: (id: BusquedaId) => void;
}) {
  const irA = useIrA();
  const [activo, setActivo] = useState(-1);
  const [els, setEls] = useState<(HTMLElement | null)[]>(() => BUSQUEDAS.map(() => null));
  const poner = useCallback(
    (k: number, el: HTMLElement | null) =>
      setEls((prev) => (prev[k] === el ? prev : prev.map((x, i) => (i === k ? el : x)))),
    [],
  );

  // Capítulo activo: el que cruza la línea justo bajo el índice.
  useEffect(() => {
    let obs: IntersectionObserver | null = null;
    const montar = () => {
      obs?.disconnect();
      const bajo = Math.max(1, innerHeight - ALTO_FIJO - 2);
      obs = new IntersectionObserver(
        (entradas) => {
          for (const e of entradas) {
            const k = els.findIndex((r) => r === e.target);
            if (k < 0) continue;
            if (e.isIntersecting) setActivo(k);
            else setActivo((prev) => (prev === k ? -1 : prev));
          }
        },
        { rootMargin: `-${ALTO_FIJO + 1}px 0px -${bajo}px 0px` },
      );
      for (const r of els) if (r) obs.observe(r);
    };
    montar();
    addEventListener("resize", montar);
    return () => {
      removeEventListener("resize", montar);
      obs?.disconnect();
    };
  }, [els]);

  const saltar = (id: string) => irA(`c-${id}`, ALTO_FIJO - COLCHON);

  return (
    <>
      <section className={`${s.apertura} ${s.envoltura}`} aria-labelledby="t-apertura">
        <TextoTipeado as="h2" id="t-apertura" texto="¿A quién quieres conocer?" />
        <p className={s.aperturaBajada}>
          En Caracas hay más gente construyendo de la que cabe en una noche. En 2027 hay seis maneras de coincidir.
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
        <div className={s.fondo} aria-hidden="true">
          {BUSQUEDAS.map((b, k) => {
            const el = els[k];
            return el ? <Capa key={b.id} k={k} el={el} /> : null;
          })}
        </div>
        <div className={s.capBorde} aria-hidden="true" />
        <nav className={s.ind} aria-label="Personas que puedes conocer">
          <ul className={s.indLista}>
            {BUSQUEDAS.map((b, k) => (
              <li key={b.id}>
                <button
                  type="button"
                  className={s.indBtn}
                  style={{ "--c": b.c, "--cl": b.cl } as Estilo}
                  aria-current={activo === k}
                  aria-label={b.etiqueta}
                  onClick={() => saltar(b.id)}
                >
                  <b.Icono strokeWidth={1.75} aria-hidden="true" />
                  {busca.includes(b.id) ? <i aria-hidden="true" /> : null}
                </button>
              </li>
            ))}
          </ul>
          <a
            className={s.indSaltar}
            href="#formatos"
            onClick={(e) => {
              e.preventDefault();
              irA("formatos");
            }}
          >
            Saltar
          </a>
        </nav>
        {BUSQUEDAS.map((b, k) => (
          <Capitulo key={b.id} k={k} marcado={busca.includes(b.id)} onBusca={onBusca} onEl={poner} />
        ))}
        <p className={s.capCierre} aria-live="polite">
          {busca.length ? "Te marcamos las tarjetas donde es más fácil coincidir." : ""}
        </p>
      </div>
    </>
  );
}
