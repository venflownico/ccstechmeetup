"use client";

import { AnimatePresence, motion } from "motion/react";
import { BellRing } from "lucide-react";

import s from "./estilos.module.css";
import { useIrA } from "./lenis";
import { FORMATOS } from "./tipos";
import type { Estilo } from "./tipos";

/** Barra inferior: aparece con la primera marca y se esconde cuando el formulario está a la vista. */
export function Barra({ marcadas, ver }: { marcadas: ReadonlySet<string>; ver: boolean }) {
  const irA = useIrA();
  const total = FORMATOS.length;
  const n = marcadas.size;
  const todas = n === total && n > 0;
  const texto = todas
    ? "Marcaste todos los formatos"
    : `${n} ${n === 1 ? "formato marcado" : "formatos marcados"}`;

  return (
    <>
      <p className={s.sr} role="status">
        {n > 0 ? texto : ""}
      </p>
      <motion.div
        className={s.barra}
        inert={!ver}
        initial={{ y: "110%" }}
        animate={{ y: ver ? 0 : "110%" }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <div className={s.envoltura}>
          <div className={s.barraTexto} aria-hidden="true">
            <div className={s.puntos}>
              {FORMATOS.map((f) => {
                const on = marcadas.has(f.id);
                return (
                  <motion.i
                    key={f.id}
                    style={{ "--c": f.c } as Estilo}
                    initial={false}
                    animate={{ scale: on ? 1 : 0.7, opacity: on ? 1 : 0.25 }}
                    transition={{ type: "spring", stiffness: 520, damping: 14 }}
                  />
                );
              })}
            </div>
            <p className={s.cuenta}>
              {todas ? (
                texto
              ) : (
                <>
                  <span className={s.rueda}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={n}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      >
                        {n}
                      </motion.span>
                    </AnimatePresence>
                  </span>{" "}
                  {n === 1 ? "formato marcado" : "formatos marcados"}
                </>
              )}
            </p>
          </div>
          <a
            href="#avisame"
            onClick={(e) => {
              e.preventDefault();
              irA("avisame");
            }}
          >
            <BellRing strokeWidth={1.75} aria-hidden="true" />
            Avísame
          </a>
        </div>
      </motion.div>
    </>
  );
}
