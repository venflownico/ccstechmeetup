"use client";

import { Handshake } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { esBusqueda, formatosDe } from "@/lib/busquedas-2027";
import type { BusquedaId } from "@/lib/busquedas-2027";

import { Aviso } from "./aviso";
import { Calentamiento } from "./calentamiento";
import { Luz, Progreso } from "./ambiente";
import { Barra } from "./barra";
import { DatosRapidos } from "./datos-rapidos";
import { Confeti, crearConfeti } from "./efectos";
import type { Pieza } from "./efectos";
import { Entrada } from "./entrada";
import s from "./estilos.module.css";
import { Lenis2027 } from "./lenis";
import { useQuieto } from "./quieto";
import { Tarjeta } from "./tarjeta";
import { TextoTipeado } from "./texto-tipeado";
import { FORMATOS } from "./tipos";

type Rafaga = { piezas: Pieza[]; y: string };

export function Formatos2027() {
  const quieto = useQuieto();
  const [marcadas, setMarcadas] = useState<ReadonlySet<string>>(new Set());
  const [enviado, setEnviado] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [confeti, setConfeti] = useState<Rafaga | null>(null);
  const [busca, setBusca] = useState<BusquedaId | null>(null);

  const volteadas = useRef(new Set<string>());
  const marcadasRef = useRef<ReadonlySet<string>>(marcadas);
  const buscaRef = useRef<BusquedaId | null>(null);
  const origenRef = useRef("directo");
  const inicio = useRef(0);
  const mandada = useRef(false);
  const aviso = useRef<HTMLElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const raiz = useRef<HTMLDivElement>(null);

  const total = FORMATOS.length;
  const colores = FORMATOS.map((f) => f.cl);

  // Origen (?o=) y marca de tiempo de la visita.
  useEffect(() => {
    inicio.current = Date.now();
    const o =
      (new URLSearchParams(location.search).get("o") || "directo")
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 24) || "directo";
    origenRef.current = o;
  }, []);

  useEffect(() => {
    marcadasRef.current = marcadas;
  }, [marcadas]);

  useEffect(() => {
    buscaRef.current = busca;
  }, [busca]);

  const sugeridas = formatosDe(busca);

  // La barra se esconde cuando el formulario está a la vista.
  useEffect(() => {
    const el = aviso.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), {
      rootMargin: "0px 0px -30% 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Si la página no tiene recorrido (pantalla muy alta), los textos tipeados se muestran completos.
  useEffect(() => {
    const el = raiz.current?.closest("[data-pagina]") ?? raiz.current;
    if (!el) return;
    const medir = () => {
      const sinRecorrido = document.documentElement.scrollHeight <= innerHeight + 2;
      el.toggleAttribute("data-sin-recorrido", sinRecorrido);
    };
    const obs = new ResizeObserver(medir);
    obs.observe(document.documentElement);
    medir();
    return () => obs.disconnect();
  }, []);

  // La visita se manda una sola vez, al ocultarse la página.
  useEffect(() => {
    function mandarVisita() {
      if (mandada.current) return;
      mandada.current = true;
      const cuerpo = {
        tipo: "visita",
        origen: origenRef.current,
        volteadas: Array.from(volteadas.current),
        marcadas: Array.from(marcadasRef.current),
        segundos: Math.round((Date.now() - inicio.current) / 1000),
        busca: esBusqueda(buscaRef.current) ? buscaRef.current : null,
      };
      const b = new Blob([JSON.stringify(cuerpo)], { type: "text/plain" });
      navigator.sendBeacon?.("/api/interes", b);
    }
    const alOcultar = () => {
      if (document.visibilityState === "hidden") mandarVisita();
    };
    addEventListener("pagehide", mandarVisita);
    document.addEventListener("visibilitychange", alOcultar);
    return () => {
      removeEventListener("pagehide", mandarVisita);
      document.removeEventListener("visibilitychange", alOcultar);
    };
  }, []);

  function lanzarConfeti(y: string) {
    if (quieto) return;
    setConfeti({ piezas: crearConfeti(colores), y });
  }

  function marcar(id: string, si: boolean) {
    if (si && !marcadas.has(id) && marcadas.size === total - 1) lanzarConfeti("88%");
    setMarcadas((prev) => {
      const sig = new Set(prev);
      if (si) sig.add(id);
      else sig.delete(id);
      return sig;
    });
  }

  function marcarTodos(si: boolean) {
    if (si && marcadas.size < total) lanzarConfeti("88%");
    setMarcadas(si ? new Set(FORMATOS.map((f) => f.id)) : new Set());
  }

  const verBarra = marcadas.size > 0 && !enviado && !formVisible;

  return (
    <Lenis2027>
      <div ref={raiz}>
        <Luz lista={lista} />
        <Progreso />
        <main className={s.principal}>
          <Entrada />
          <Calentamiento busca={busca} onBusca={setBusca} />
          <DatosRapidos />

          <section className={`${s.formatos} ${s.envoltura}`} id="formatos" aria-label="Formatos de 2027">
            <ul ref={lista} className={s.rejilla}>
              {FORMATOS.map((f) => (
                <Tarjeta
                  key={f.id}
                  f={f}
                  marcada={marcadas.has(f.id)}
                  sugerida={sugeridas.includes(f.id)}
                  onMarcar={marcar}
                  onVoltear={(id) => volteadas.current.add(id)}
                />
              ))}
            </ul>
          </section>

          <Aviso
            secRef={aviso}
            marcadas={marcadas}
            onMarcar={marcar}
            onMarcarTodos={marcarTodos}
            enviado={enviado}
            onEnviado={() => {
              lanzarConfeti("55%");
              setEnviado(true);
            }}
            origen={() => origenRef.current}
            busca={() => buscaRef.current}
          />

          <div className={`${s.marcas} ${s.envoltura}`}>
            <Handshake strokeWidth={1.75} aria-hidden="true" />
            <TextoTipeado
              texto="¿Tu marca quiere estar en alguno de estos formatos? Escríbenos desde "
              enlace={{ texto: "Patrocinar", href: "/patrocinar" }}
              final="."
            />
          </div>
        </main>

        <Barra marcadas={marcadas} ver={verBarra} />
        {confeti ? (
          <Confeti piezas={confeti.piezas} y={confeti.y} alTerminar={() => setConfeti(null)} />
        ) : null}
      </div>
    </Lenis2027>
  );
}
