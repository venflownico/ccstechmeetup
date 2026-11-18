"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Check, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

import { LogotipoFormato } from "@/components/logotipo-formato";
import { BUSQUEDAS } from "@/lib/busquedas-2027";
import type { BusquedaId } from "@/lib/busquedas-2027";

import s from "../estilos.module.css";
import { ICONOS_FORMATO } from "../iconos";
import { useQuieto } from "../quieto";
import { Letras, contarLetras } from "../texto-tipeado";
import { FORMATOS } from "../tipos";
import type { Estilo } from "../tipos";
import { Cliente, Cofounder, Inversionista } from "./ilustraciones-a";
import { Mentor, Talento, YaPaso } from "./ilustraciones-b";
import { PlanosCtx } from "./trazos";
import type { Escena, Planos } from "./trazos";

export const ILUSTRACIONES: ComponentType<Escena>[] = [Inversionista, Cofounder, Cliente, Talento, YaPaso, Mentor];

/** Alto fijo de arriba: header (64) + barra de progreso (3). */
export const ALTO_FIJO = 67;

export function Capitulo({
  k,
  marcado,
  onBusca,
  onEl,
}: {
  k: number;
  marcado: boolean;
  onBusca: (id: BusquedaId) => void;
  onEl: (k: number, el: HTMLElement | null) => void;
}) {
  const b = BUSQUEDAS[k];
  const Ilustracion = ILUSTRACIONES[k];
  const quieto = useQuieto();
  const formatos = b.formatos.flatMap((id) => FORMATOS.filter((f) => f.id === id));
  const [ver, setVer] = useState(false);
  const secRef = useRef<HTMLElement | null>(null);
  const ponerRef = useCallback(
    (el: HTMLElement | null) => {
      secRef.current = el;
      onEl(k, el);
    },
    [k, onEl],
  );

  // El capítulo avanza de 0 a 1 mientras su escenario está fijo.
  const { scrollYProgress } = useScroll({ target: secRef, offset: [`start ${ALTO_FIJO}px`, "end end"] });
  const p = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!quieto) p.set(v);
  });
  useEffect(() => {
    const v = quieto ? 1 : scrollYProgress.get();
    p.set(v);
  }, [quieto, p, scrollYProgress]);
  // Solo cambia el estado al cruzar el umbral, no en cada cuadro.
  useMotionValueEvent(p, "change", (v) => {
    const sigue = v >= 0.7;
    setVer((prev) => (prev === sigue ? prev : sigue));
  });

  const d = useTransform(p, [0.04, 0.34], [0, 1]);
  const a = useTransform(p, [0.38, 0.62], [0, 1]);
  const cabO = useTransform(p, [0, 0.07], [0, 1]);
  const cabY = useTransform(p, [0, 0.07], [14, 0]);
  const total = contarLetras(b.frase);
  const n = useTransform(p, [0.4, 0.52], [0, total + 1]);
  const fraseO = useTransform(p, [0.62, 0.7], [1, 0]);
  const dondeO = useTransform(p, [0.68, 0.78], [0, 1]);

  // Parallax: cada plano de la ilustración y el bloque de texto se mueven a distinta velocidad con el avance.
  // Con menos movimiento todo queda en su sitio (rango 0).
  const z = (v: number) => (quieto ? 0 : v);
  const planos: Planos = {
    fondo: { x: useTransform(p, [0, 1], [z(-3), z(3)]), y: useTransform(p, [0, 1], [z(7), z(-7)]) },
    medio: { x: useTransform(p, [0, 1], [z(4), z(-4)]), y: useTransform(p, [0, 1], [z(14), z(-14)]) },
    frente: { x: useTransform(p, [0, 1], [z(-9), z(9)]), y: useTransform(p, [0, 1], [z(24), z(-24)]) },
  };
  const textoY = useTransform(p, [0, 1], [z(-12), z(12)]);
  const dondeP = useTransform(p, [0.68, 0.78, 1], [16, 0, z(-10)]);

  const estilo: Estilo = { "--c": b.c, "--cl": b.cl };
  const Icono = b.Icono;

  return (
    <section
      ref={ponerRef}
      id={`c-${b.id}`} className={s.cap} style={estilo} aria-labelledby={`t-${b.id}`}>
      <div className={s.capEsc}>
        <div className={s.capIlus}>
          <PlanosCtx.Provider value={planos}>
            <Ilustracion d={d} a={a} />
          </PlanosCtx.Provider>
        </div>
        <motion.div className={s.capTexto} style={{ y: textoY }}>
          <motion.div className={`${s.capCab} ${s.capA}`} style={{ opacity: cabO, y: cabY }}>
            <span className={s.capIcono} aria-hidden="true">
              <Icono strokeWidth={1.75} />
            </span>
            <h2 id={`t-${b.id}`}>{b.etiqueta}</h2>
          </motion.div>
          <div className={s.capCuerpo}>
            <motion.p className={`${s.capFrase} ${s.capA}`} style={{ opacity: fraseO }}>
              <Letras texto={b.frase} n={n} />
            </motion.p>
            <motion.div className={`${s.capDonde} ${s.capA}`} style={{ opacity: dondeO, y: dondeP }} inert={!quieto && !ver}>
              <ul className={s.capFm} aria-label="Dónde coincidir">
                {formatos.map((f) => {
                  const IconoF = ICONOS_FORMATO[f.icono];
                  return (
                    <li key={f.id} style={{ "--cfl": f.cl } as Estilo}>
                      <span className={s.capFmIc} aria-hidden="true">
                        <IconoF strokeWidth={1.75} />
                      </span>
                      <div>
                        <LogotipoFormato palabra={f.palabra} color={f.cl} viewBox={f.viewBox} className={s.capLogo} />
                        <p>{f.que}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <motion.button
                type="button"
                className={s.capBusco}
                aria-pressed={marcado}
                whileTap={quieto ? undefined : { scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 16 }}
                onClick={() => {
                  if (!marcado) navigator.vibrate?.(10);
                  onBusca(b.id);
                }}
              >
                <span className={s.capBuscoIc} aria-hidden="true">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {marcado ? (
                      <motion.span
                        key="si"
                        initial={{ rotate: -120, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ scale: 0, transition: { duration: 0.1 } }}
                        transition={{ type: "spring", stiffness: 420, damping: 16 }}
                      >
                        <Check strokeWidth={2.4} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="no"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, transition: { duration: 0.1 } }}
                        transition={{ type: "spring", stiffness: 420, damping: 20 }}
                      >
                        <Plus strokeWidth={2.2} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                Busco esto
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
