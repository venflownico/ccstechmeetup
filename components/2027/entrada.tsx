"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ChevronsDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LogotipoFormato } from "@/components/logotipo-formato";

import s from "./estilos.module.css";
import { Foto } from "./foto";
import { useIrA } from "./lenis";
import { useQuieto } from "./quieto";
import { FORMATOS, VIEWBOX_ANCHO } from "./tipos";
import type { Estilo } from "./tipos";

const ETIQUETA = `Caracas Tech: ${FORMATOS.map((f) => f.palabra).join(", ")}`;
const PALABRAS = FORMATOS.map((f) => f.palabra);

type Pos = { i: number; n: number; fase: "escribe" | "espera" | "borra" };

/** La palabra se escribe a 75 ms por letra, espera 1,6 s, se borra a 35 ms y sigue con la próxima. */
function LogoTipeado({ activo, onPalabra }: { activo: boolean; onPalabra: (i: number) => void }) {
  const pos = useRef<Pos>({ i: 0, n: PALABRAS[0]?.length ?? 0, fase: "espera" });
  const [visto, setVisto] = useState({ i: 0, n: PALABRAS[0]?.length ?? 0 });

  useEffect(() => {
    if (!activo || PALABRAS.length < 2) return;
    let t: ReturnType<typeof setTimeout>;
    const empujar = () => setVisto({ i: pos.current.i, n: pos.current.n });
    const paso = () => {
      const p = pos.current;
      const w = PALABRAS[p.i];
      if (p.fase === "escribe") {
        if (p.n < w.length) {
          p.n += 1;
          empujar();
          t = setTimeout(paso, 75);
        } else {
          p.fase = "espera";
          t = setTimeout(paso, 1600);
        }
      } else if (p.fase === "espera") {
        p.fase = "borra";
        t = setTimeout(paso, 35);
      } else if (p.n > 0) {
        p.n -= 1;
        empujar();
        t = setTimeout(paso, 35);
      } else {
        p.i = (p.i + 1) % PALABRAS.length;
        p.fase = "escribe";
        onPalabra(p.i);
        t = setTimeout(paso, 75);
      }
    };
    t = setTimeout(paso, pos.current.fase === "espera" ? 1500 : 75);
    return () => clearTimeout(t);
  }, [activo, onPalabra]);

  const w = PALABRAS[visto.i] ?? "";
  const f = FORMATOS[visto.i] ?? FORMATOS[0];
  return (
    <div className={s.logoHero}>
      <LogotipoFormato
        palabra={f.palabra}
        texto={w.slice(0, visto.n)}
        color="var(--cl)"
        viewBox={VIEWBOX_ANCHO}
        etiqueta={ETIQUETA}
        claseCursor={s.cursor}
      />
    </div>
  );
}

export function Entrada() {
  const quieto = useQuieto();
  const irA = useIrA();
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const [idx, setIdx] = useState(0);
  const actual = FORMATOS[idx] ?? FORMATOS[0];
  const primero = FORMATOS[0];

  // Al bajar: la foto escala y se desplaza, el texto sube y se desvanece. Al subir, vuelve.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fotoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const fotoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textoY = useTransform(scrollYProgress, [0, 0.7], [0, -90]);
  const textoOpacidad = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const estilo: Estilo = quieto
    ? { "--c": primero.c, "--cl": primero.cl }
    : { "--c": actual.c, "--cl": actual.cl };

  return (
    <section ref={ref} className={s.entrada} aria-labelledby="t-2027" style={estilo}>
      <Foto
        src="/2027/fotos/entrada.jpg"
        alt=""
        foco="50% 40%"
        sizes="100vw"
        preload
        clase={s.fotoEntrada}
        y={fotoY}
        scale={fotoScale}
      />
      <div className={s.veloEntrada} aria-hidden="true" />
      <motion.div
        className={`${s.envoltura} ${s.titular}`}
        style={{ y: textoY, opacity: textoOpacidad }}
      >
        {quieto ? (
          <div className={s.logoHero}>
            <LogotipoFormato
              palabra={primero.palabra}
              color="var(--cl)"
              viewBox={VIEWBOX_ANCHO}
              etiqueta={ETIQUETA}
            />
          </div>
        ) : (
          <LogoTipeado activo={visible} onPalabra={setIdx} />
        )}
        <h1 id="t-2027">En 2027 nos vemos de seis maneras</h1>
        <p className={s.bajada}>
          El meetup sigue cada mes y llegan <b>cinco formatos nuevos</b>. Voltea cada tarjeta y marca los que te
          interesan.
        </p>
        <a
          className={s.ir}
          href="#formatos"
          onClick={(e) => {
            e.preventDefault();
            irA("formatos");
          }}
        >
          Ver los formatos
        </a>
      </motion.div>
      <span className={s.desplaza} aria-hidden="true">
        <ChevronsDown strokeWidth={1.75} />
      </span>
    </section>
  );
}
