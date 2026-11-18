"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { CalendarDays, Check, MapPin, Plus, Repeat2, UsersRound, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

import { LogotipoFormato } from "@/components/logotipo-formato";
import type { Formato2027 } from "@/lib/site";

import { Estallido, crearEstallido } from "./efectos";
import type { Pieza } from "./efectos";
import s from "./estilos.module.css";
import { Foto } from "./foto";
import { ICONOS_FORMATO } from "./iconos";
import { useQuieto } from "./quieto";
import { Letras, contarLetras } from "./texto-tipeado";
import type { Estilo } from "./tipos";

const SIZES_TARJETA = "(min-width: 1040px) 360px, (min-width: 720px) 50vw, 100vw";

export function Tarjeta({
  f,
  marcada,
  sugerida,
  onMarcar,
  onVoltear,
}: {
  f: Formato2027;
  marcada: boolean;
  sugerida: boolean;
  onMarcar: (id: string, si: boolean) => void;
  onVoltear: (id: string) => void;
}) {
  const quieto = useQuieto();
  const [abierta, setAbierta] = useState(false);
  const [piezas, setPiezas] = useState<Pieza[]>([]);
  const li = useRef<HTMLLIElement>(null);
  const voltear = useRef<HTMLButtonElement>(null);
  const interesa = useRef<HTMLButtonElement>(null);
  const primera = useRef(true);
  const conRaton = useRef(false);
  const Icono = ICONOS_FORMATO[f.icono];

  // El foco sigue a la tarjeta: al dorso al abrir, al frente al cerrar.
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (abierta) interesa.current?.focus({ preventScroll: true });
    else voltear.current?.focus({ preventScroll: true });
  }, [abierta]);

  // Entrada ligada al scroll (reversible) y parallax de la foto durante todo el paso.
  const { scrollYProgress: entra } = useScroll({ target: li, offset: ["start end", "start 60%"] });
  const { scrollYProgress: pasa } = useScroll({ target: li, offset: ["start end", "end start"] });
  const entradaY = useTransform(entra, [0, 1], [80, 0]);
  const entradaRx = useTransform(entra, [0, 1], [14, 0]);
  const entradaScale = useTransform(entra, [0, 1], [0.92, 1]);
  const entradaOpacidad = useTransform(entra, [0, 1], [0.35, 1]);
  const fotoY = useTransform(pasa, [0, 1], ["-5%", "5%"]);

  // Volteo con resorte y un leve levantamiento a mitad del giro.
  const giro = useMotionValue(0);
  const levanta = useTransform(giro, [0, 90, 180], [0, -14, 0]);
  const crece = useTransform(giro, [0, 90, 180], [1, 1.035, 1]);
  useEffect(() => {
    if (quieto) return;
    const c = animate(giro, abierta ? 180 : 0, { type: "spring", stiffness: 120, damping: 15, mass: 1 });
    return () => c.stop();
  }, [abierta, quieto, giro]);

  // Descripción tipeada al abrir el dorso.
  const total = contarLetras(f.que);
  const letras = useMotionValue(0);
  useEffect(() => {
    if (quieto) return;
    if (!abierta) {
      letras.set(0);
      return;
    }
    letras.set(0);
    const c = animate(letras, total, { duration: total * 0.018, delay: 0.4, ease: "linear" });
    return () => c.stop();
  }, [abierta, quieto, total, letras]);

  // Inclinación 3D con el puntero, solo donde hay hover real.
  const rx = useSpring(0, { stiffness: 180, damping: 18 });
  const ry = useSpring(0, { stiffness: 180, damping: 18 });
  useEffect(() => {
    conRaton.current = matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);
  useEffect(() => {
    if (abierta) {
      rx.set(0);
      ry.set(0);
    }
  }, [abierta, rx, ry]);
  function mover(e: PointerEvent<HTMLDivElement>) {
    if (quieto || abierta || !conRaton.current || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  }
  function soltar() {
    rx.set(0);
    ry.set(0);
  }

  function girar(abrir: boolean) {
    setAbierta(abrir);
    if (abrir) onVoltear(f.id);
  }

  function alternar() {
    const sig = !marcada;
    onMarcar(f.id, sig);
    if (sig) {
      navigator.vibrate?.(10);
      if (!quieto) setPiezas(crearEstallido([f.c, f.cl, "#f1f7f1"], 12));
    }
  }

  const estilo: Estilo = { "--c": f.c, "--cl": f.cl };
  const clases = [s.fc, abierta ? s.vuelta : "", marcada ? s.marcado : "", quieto ? s.quieto : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.li
      ref={li}
      id={`f-${f.id}`}
      className={clases}
      style={{
        ...estilo,
        y: entradaY,
        rotateX: entradaRx,
        scale: entradaScale,
        opacity: entradaOpacidad,
        transformPerspective: 900,
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && abierta) girar(false);
      }}
    >
      <motion.div
        className={s.inclina}
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={mover}
        onPointerLeave={soltar}
      >
        <motion.div
          className={s.gira}
          style={{ rotateY: giro, y: levanta, scale: crece }}
        >
          <div className={`${s.cara} ${s.frente}`} inert={abierta}>
            <Foto
              src={f.foto}
              alt={f.alt}
              foco={f.foco}
              sizes={SIZES_TARJETA}
              y={fotoY}
            />
            <div className={s.velo} aria-hidden="true" />
            <AnimatePresence>
              {sugerida ? (
                <motion.span
                  className={s.aqui}
                  aria-hidden="true"
                  initial={{ scale: 0.4, opacity: 0, y: -8 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 380, damping: 15 }}
                >
                  <MapPin strokeWidth={1.9} />
                  Aquí puede estar
                </motion.span>
              ) : null}
            </AnimatePresence>
            {sugerida ? <span className={s.sr}>Aquí puede estar lo que buscas</span> : null}
            <AnimatePresence>
              {marcada ? (
                <motion.span
                  className={s.sello}
                  aria-hidden="true"
                  initial={{ scale: 0.3, opacity: 0, rotate: -14 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.7, opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 420, damping: 16 }}
                >
                  <Check strokeWidth={2.4} />
                  Te interesa
                </motion.span>
              ) : null}
            </AnimatePresence>
            <button
              ref={voltear}
              className={s.voltear}
              type="button"
              aria-expanded={abierta}
              aria-controls={`d-${f.id}`}
              onClick={() => girar(true)}
            >
              <span className={s.arriba}>
                <span className={s.cuando}>
                  <CalendarDays strokeWidth={1.75} aria-hidden="true" />
                  {f.cuando}
                </span>
                <span className={s.insignia} aria-hidden="true">
                  <Icono strokeWidth={1.75} />
                </span>
              </span>
              <span className={s.abajo}>
                <span className={s.lk}>
                  <LogotipoFormato palabra={f.palabra} color={f.cl} viewBox={f.viewBox} />
                </span>
                <span className={s.pista}>
                  <Repeat2 strokeWidth={1.75} aria-hidden="true" />
                  Toca para ver
                </span>
              </span>
              <span className={s.sr}>Ver de qué va {f.palabra}</span>
            </button>
          </div>
          <div
            className={`${s.cara} ${s.dorso}`}
            id={`d-${f.id}`}
            inert={!abierta}
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest("button")) girar(false);
            }}
          >
            <h3 className={s.fila} style={{ "--k": 0 } as Estilo}>
              {f.palabra}
            </h3>
            <p className={s.fila} style={{ "--k": 1 } as Estilo}>
              <Letras texto={f.que} n={letras} />
            </p>
            <dl className={s.pares}>
              <div className={`${s.par} ${s.fila}`} style={{ "--k": 2 } as Estilo}>
                <UsersRound strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <dt>Para quién</dt>
                  <dd>{f.quien}</dd>
                </div>
              </div>
              <div className={`${s.par} ${s.fila}`} style={{ "--k": 3 } as Estilo}>
                <CalendarDays strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <dt>Cuándo</dt>
                  <dd>{f.cuandoLargo}</dd>
                </div>
              </div>
            </dl>
            {f.referencia ? (
              <p className={`${s.referencia} ${s.fila}`} style={{ "--k": 4 } as Estilo}>
                Foto de referencia
              </p>
            ) : null}
            <div className={`${s.acciones} ${s.fila}`} style={{ "--k": 5 } as Estilo}>
              <div className={s.interesaCaja}>
                <button
                  ref={interesa}
                  className={s.interesa}
                  type="button"
                  aria-pressed={marcada}
                  onClick={alternar}
                >
                  <motion.span
                    className={s.relleno}
                    aria-hidden="true"
                    initial={false}
                    animate={{ clipPath: marcada ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)" }}
                    transition={{ duration: marcada ? 0.5 : 0.25, ease: [0.3, 0.7, 0.2, 1] }}
                  />
                  <span className={s.iconoMas} aria-hidden="true">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {marcada ? (
                        <motion.span
                          key="si"
                          initial={{ rotate: -120, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          exit={{ rotate: 60, scale: 0, transition: { duration: 0.12 } }}
                          transition={{ type: "spring", stiffness: 420, damping: 18 }}
                        >
                          <Check strokeWidth={2.4} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="no"
                          initial={{ rotate: -90, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          exit={{ rotate: 135, scale: 0, transition: { duration: 0.12 } }}
                          transition={{ type: "spring", stiffness: 420, damping: 20 }}
                        >
                          <Plus strokeWidth={2.2} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className={s.txtInteresa}>Me interesa</span>
                </button>
                {piezas.length ? <Estallido piezas={piezas} alTerminar={() => setPiezas([])} /> : null}
              </div>
              <button
                className={s.volver}
                type="button"
                aria-label="Volver a la portada de la tarjeta"
                onClick={() => girar(false)}
              >
                <Undo2 strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.li>
  );
}
