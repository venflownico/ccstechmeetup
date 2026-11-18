"use client";

import { AnimatePresence, motion } from "motion/react";
import { BellRing, CalendarCheck, Camera, Check, LoaderCircle, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, RefObject } from "react";

import { LogotipoFormato } from "@/components/logotipo-formato";
import { roles2027 } from "@/lib/site";

import s from "./estilos.module.css";
import { ICONOS_FORMATO, ICONOS_ROL } from "./iconos";
import { useQuieto } from "./quieto";
import { TextoTipeado } from "./texto-tipeado";
import { FORMATOS, INSTAGRAM_URL, LUMA_URL } from "./tipos";
import type { Estilo } from "./tipos";

type Fase = "reposo" | "enviando" | "ok";

const MENSAJE_FALLO = "No pudimos guardar tu aviso. Intenta de nuevo en un rato.";

export function Aviso({
  marcadas,
  onMarcar,
  onMarcarTodos,
  enviado,
  onEnviado,
  origen,
  busca,
  secRef,
}: {
  marcadas: ReadonlySet<string>;
  onMarcar: (id: string, si: boolean) => void;
  onMarcarTodos: (si: boolean) => void;
  enviado: boolean;
  onEnviado: () => void;
  origen: () => string;
  busca: () => readonly string[];
  secRef: RefObject<HTMLElement | null>;
}) {
  const quieto = useQuieto();
  const [rol, setRol] = useState("");
  const [error, setError] = useState("");
  const [fase, setFase] = useState<Fase>("reposo");
  const listo = useRef<HTMLDivElement>(null);
  const correo = useRef<HTMLInputElement>(null);
  const sitio = useRef<HTMLInputElement>(null);
  const total = FORMATOS.length;
  const n = marcadas.size;

  useEffect(() => {
    if (enviado) listo.current?.focus();
  }, [enviado]);

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const email = (correo.current?.value ?? "").trim();
    if (!marcadas.size) return setError("Marca al menos un formato.");
    if (!rol) return setError("Elige qué haces.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Revisa tu correo.");
      correo.current?.focus();
      return;
    }
    const datos = {
      tipo: "aviso",
      origen: origen(),
      busca: Array.from(busca()),
      formatos: Array.from(marcadas),
      todos: marcadas.size === total,
      rol,
      email,
      website: sitio.current?.value ?? "",
    };
    setFase("enviando");
    fetch("/api/interes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then(async (r) => {
        const j = (await r.json().catch(() => ({}))) as { error?: string };
        if (!r.ok) throw new Error(j.error || MENSAJE_FALLO);
        setFase("ok");
        // El check se ve un momento en el botón antes de pasar al panel.
        setTimeout(onEnviado, quieto ? 0 : 850);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error && err.message ? err.message : MENSAJE_FALLO);
        setFase("reposo");
      });
  }

  return (
    <section ref={secRef} className={`${s.aviso} ${s.envoltura}`} id="avisame" aria-labelledby="t-aviso">
      <TextoTipeado as="h2" id="t-aviso" texto="Te avisamos cuando abra cada uno" />
      <TextoTipeado
        className={s.intro}
        texto="Deja tu correo y te escribimos cuando haya fecha, solo de los formatos que marques."
      />
      {!enviado ? (
        <form className={s.form} noValidate onSubmit={enviar}>
          <fieldset className={s.grupo}>
            <legend className={s.leyenda}>Formatos</legend>
            <div className={s.chips}>
              <motion.label className={`${s.chip} ${s.todos}`} whileTap={quieto ? undefined : { scale: 0.93 }}>
                <input
                  type="checkbox"
                  name="todos"
                  value="todos"
                  checked={n === total}
                  onChange={(e) => onMarcarTodos(e.target.checked)}
                />
                <span>Todos</span>
              </motion.label>
              {FORMATOS.map((f) => {
                const Icono = ICONOS_FORMATO[f.icono];
                const on = marcadas.has(f.id);
                return (
                  <motion.label
                    key={f.id}
                    className={s.chip}
                    style={{ "--c": f.c, "--cl": f.cl } as Estilo}
                    whileTap={quieto ? undefined : { scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 500, damping: 16 }}
                  >
                    <input
                      type="checkbox"
                      name="formatos"
                      value={f.id}
                      checked={on}
                      onChange={(e) => onMarcar(f.id, e.target.checked)}
                    />
                    <span>
                      <motion.em
                        className={s.chipIcono}
                        initial={false}
                        animate={quieto ? undefined : { scale: on ? [1, 1.35, 1] : 1, rotate: on ? [0, -12, 0] : 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icono strokeWidth={1.75} aria-hidden="true" />
                      </motion.em>
                      <LogotipoFormato palabra={f.palabra} color={f.cl} viewBox={f.viewBox} className={s.chipLogo} />
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </fieldset>
          <fieldset className={s.grupo}>
            <legend className={s.leyenda}>¿Qué haces?</legend>
            <div className={s.chips}>
              {roles2027.map((r) => {
                const Icono = ICONOS_ROL[r.icono];
                return (
                  <motion.label
                    key={r.id}
                    className={s.chip}
                    whileTap={quieto ? undefined : { scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 500, damping: 16 }}
                  >
                    <input
                      type="radio"
                      name="rol"
                      value={r.id}
                      checked={rol === r.id}
                      onChange={() => setRol(r.id)}
                    />
                    <span>
                      <motion.em
                        className={s.chipIcono}
                        initial={false}
                        animate={quieto ? undefined : { scale: rol === r.id ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 0.35 }}
                      >
                        <Icono strokeWidth={1.75} aria-hidden="true" />
                      </motion.em>
                      {r.label}
                    </span>
                  </motion.label>
                );
              })}
            </div>
          </fieldset>
          <label className={s.campo} htmlFor="email">
            Tu correo
          </label>
          <div className={s.correoCaja}>
            <Mail strokeWidth={1.75} aria-hidden="true" />
            <input
              ref={correo}
              className={s.correo}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="nombre@correo.com"
              required
            />
          </div>
          <div className={s.trampa} aria-hidden="true">
            <label>
              Sitio web <input ref={sitio} type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <p className={s.error} role="alert">
            {error}
          </p>
          <motion.button
            layout
            className={`${s.enviar} ${fase !== "reposo" ? s.enviarRedondo : ""}`}
            type="submit"
            disabled={fase !== "reposo"}
            aria-label={fase === "enviando" ? "Enviando" : fase === "ok" ? "Listo" : undefined}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{ borderRadius: 999 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {fase === "reposo" ? (
                <motion.span
                  key="reposo"
                  className={s.enviarTexto}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <BellRing strokeWidth={1.75} aria-hidden="true" />
                  Avísame
                </motion.span>
              ) : fase === "enviando" ? (
                <motion.span
                  key="enviando"
                  className={s.enviarTexto}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <motion.span
                    className={s.giraSolo}
                    animate={quieto ? undefined : { rotate: 360 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 0.9 }}
                  >
                    <LoaderCircle strokeWidth={2} aria-hidden="true" />
                  </motion.span>
                </motion.span>
              ) : (
                <motion.span
                  key="ok"
                  className={s.enviarTexto}
                  initial={{ opacity: 0, scale: 0.3, rotate: -40 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 480, damping: 15 }}
                >
                  <Check strokeWidth={2.6} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <p className={s.nota}>Usamos tu correo solo para avisarte de estos eventos.</p>
        </form>
      ) : (
        <motion.div
          className={s.listo}
          ref={listo}
          tabIndex={-1}
          initial={quieto ? false : { opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <svg className={s.checkGrande} viewBox="0 0 52 52" fill="none" aria-hidden="true">
            <motion.circle
              cx="26"
              cy="26"
              r="23"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={quieto ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M15 27.5l8 8 14-16"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={quieto ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
            />
          </svg>
          <h3>Listo, quedaste anotado</h3>
          <p>
            Te escribimos cuando abra cada formato que marcaste. Mientras tanto, los próximos eventos salen primero
            en Luma.
          </p>
          <div className={s.botones}>
            <a href={LUMA_URL} target="_blank" rel="noreferrer">
              <CalendarCheck strokeWidth={1.75} aria-hidden="true" />
              Ver el calendario en Luma
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Camera strokeWidth={1.75} aria-hidden="true" />
              Seguir en Instagram
            </a>
          </div>
        </motion.div>
      )}
    </section>
  );
}
