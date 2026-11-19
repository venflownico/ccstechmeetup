"use client";

import { AnimatePresence, animate, motion, useMotionValue } from "motion/react";
import { BellRing, MousePointerClick } from "lucide-react";
import { useEffect } from "react";

import { LogotipoFormato } from "@/components/logotipo-formato";
import { BUSQUEDAS } from "@/lib/busquedas-2027";
import type { BusquedaId } from "@/lib/busquedas-2027";

import { ILUSTRACIONES } from "./capitulos/capitulo";
import s from "./estilos.module.css";
import { ICONOS_FORMATO } from "./iconos";
import { useIrA } from "./lenis";
import { useQuieto } from "./quieto";
import { TextoTipeado } from "./texto-tipeado";
import { FORMATOS } from "./tipos";
import type { Estilo } from "./tipos";

/** Una sola pantalla: eliges a quién quieres conocer y ves su ilustración y dónde coincidir. */
export function PerfilesUna({
  elegido,
  onElegir,
  onAvisame,
}: {
  elegido: BusquedaId | null;
  onElegir: (id: BusquedaId | null) => void;
  onAvisame: (formatos: string[]) => void;
}) {
  const quieto = useQuieto();
  const irA = useIrA();
  const d = useMotionValue(0);
  const a = useMotionValue(0);
  const k = BUSQUEDAS.findIndex((b) => b.id === elegido);
  const b = k >= 0 ? BUSQUEDAS[k] : null;
  const Ilustracion = k >= 0 ? ILUSTRACIONES[k] : null;
  const formatos = b ? b.formatos.flatMap((id) => FORMATOS.filter((f) => f.id === id)) : [];

  // Al cambiar de perfil la ilustración se dibuja de nuevo: primero el trazo, luego el segundo tiempo.
  useEffect(() => {
    if (k < 0) return;
    if (quieto) {
      d.set(1);
      a.set(1);
      return;
    }
    d.set(0);
    a.set(0);
    const c1 = animate(d, 1, { duration: 1.5, ease: "easeInOut", delay: 0.15 });
    const c2 = animate(a, 1, { duration: 1.3, ease: "easeInOut", delay: 1.4 });
    return () => {
      c1.stop();
      c2.stop();
    };
  }, [k, quieto, d, a]);

  const estilo: Estilo = b ? { "--c": b.c, "--cl": b.cl } : { "--c": "#46c536", "--cl": "#7fe36f" };

  return (
    <section className={`${s.perUna} ${s.envoltura}`} id="perfiles" aria-labelledby="t-perfiles" style={estilo}>
      <div className={s.perCab}>
        <TextoTipeado as="h2" id="t-perfiles" texto="¿A quién quieres conocer?" />
        <ul className={s.perChips}>
          {BUSQUEDAS.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={s.perChip}
                style={{ "--c": p.c, "--cl": p.cl } as Estilo}
                aria-pressed={elegido === p.id}
                data-on={elegido === p.id ? "" : undefined}
                onClick={() => onElegir(elegido === p.id ? null : p.id)}
              >
                <p.Icono strokeWidth={1.75} aria-hidden="true" />
                {p.etiqueta}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={s.perIlus} aria-hidden={b ? undefined : true}>
        <AnimatePresence mode="wait" initial={false}>
          {Ilustracion ? (
            <motion.div
              key={elegido}
              className={s.perIlusCaja}
              initial={quieto ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={quieto ? undefined : { opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
              transition={{ duration: 0.4 }}
            >
              <Ilustracion d={d} a={a} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className={s.perDetalleCaja}>
        <div className={s.perDetalle} aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {b ? (
              <motion.div
                key={b.id}
                initial={quieto ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={quieto ? undefined : { opacity: 0, y: -8, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, delay: quieto ? 0 : 0.1 }}
              >
                <p className={s.perFrase}>{b.frase}</p>
                <p className={s.perPuedes}>Te pueden interesar:</p>
                <ul className={s.perFm}>
                  {formatos.map((f) => {
                    const Icono = ICONOS_FORMATO[f.icono];
                    return (
                      <li key={f.id} style={{ "--cfl": f.cl } as Estilo}>
                        <Icono strokeWidth={1.75} aria-hidden="true" />
                        <LogotipoFormato palabra={f.palabra} color={f.cl} viewBox={f.viewBox} className={s.perLogo} />
                      </li>
                    );
                  })}
                </ul>
                <button type="button" className={s.perAvisame} onClick={() => {
                    onAvisame(formatos.map((f) => f.id));
                    irA("avisame");
                  }}>
                  <BellRing strokeWidth={1.75} aria-hidden="true" />
                  Avísame de estos
                </button>
              </motion.div>
            ) : (
              <motion.p
                key="vacio"
                className={s.perVacio}
                initial={quieto ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={quieto ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
              >
                <MousePointerClick strokeWidth={1.75} aria-hidden="true" />
                Elige uno y te mostramos dónde coincidir.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
