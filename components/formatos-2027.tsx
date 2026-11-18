"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent, MouseEvent } from "react";

import { LogotipoFormato } from "@/components/logotipo-formato";
import { formatos2027, roles2027 } from "@/lib/site";
import type { Formato2027 } from "@/lib/site";

import styles from "./formatos-2027.module.css";

const FORMATOS = formatos2027.filter((f) => f.visible);

type Estilo = CSSProperties & Record<`--${string}`, string>;

function Icono({ tipo }: { tipo: "vuelta" | "check" | "mas" | "atras" | "abajo" }) {
  const comun = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (tipo) {
    case "vuelta":
      return (
        <svg {...comun} strokeWidth={2}>
          <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case "check":
      return (
        <svg {...comun} strokeWidth={2.4}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "mas":
      return (
        <svg {...comun} strokeWidth={2.2}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "atras":
      return (
        <svg {...comun} strokeWidth={2}>
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h11a5 5 0 0 1 0 10h-1" />
        </svg>
      );
    case "abajo":
      return (
        <svg {...comun} strokeWidth={2}>
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      );
  }
}

function sinMovimiento() {
  return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Ancla con desplazamiento suave (salvo reduce-motion); sin JS funciona el href. */
function irAncla(e: MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: sinMovimiento() ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

function Tarjeta({
  f,
  marcada,
  onMarcar,
  onVoltear,
}: {
  f: Formato2027;
  marcada: boolean;
  onMarcar: (id: string, si: boolean) => void;
  onVoltear: (id: string) => void;
}) {
  const [abierta, setAbierta] = useState(false);
  const li = useRef<HTMLLIElement>(null);
  const voltear = useRef<HTMLButtonElement>(null);
  const interesa = useRef<HTMLButtonElement>(null);
  const primera = useRef(true);

  // El foco sigue a la tarjeta: al dorso al abrir, al frente al cerrar.
  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    if (abierta) interesa.current?.focus({ preventScroll: true });
    else voltear.current?.focus({ preventScroll: true });
  }, [abierta]);

  // Inclinación suave al pasar el ratón.
  useEffect(() => {
    const el = li.current;
    if (!el || sinMovimiento() || !matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    };
    const salir = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerleave", salir);
    return () => {
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerleave", salir);
    };
  }, []);

  function girar(abrir: boolean) {
    setAbierta(abrir);
    if (abrir) onVoltear(f.id);
  }

  function alternar() {
    onMarcar(f.id, !marcada);
    const b = interesa.current;
    if (b) {
      b.classList.remove(styles.late);
      void b.offsetWidth;
      b.classList.add(styles.late);
    }
  }

  const estilo: Estilo = { "--c": f.c, "--cl": f.cl, "--pos": f.pos };
  const clases = [styles.fc, abierta ? styles.vuelta : "", marcada ? styles.marcado : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <li
      ref={li}
      id={`f-${f.id}`}
      className={clases}
      style={estilo}
      onKeyDown={(e) => {
        if (e.key === "Escape" && abierta) girar(false);
      }}
    >
      <div className={styles.inclina}>
        <div className={styles.gira}>
          <div className={`${styles.cara} ${styles.frente}`} inert={abierta}>
            <div className={styles.avila} aria-hidden="true" />
            <div className={styles.bano} aria-hidden="true" />
            <span className={styles.sello} aria-hidden="true">
              <Icono tipo="check" />
              Te interesa
            </span>
            <button
              ref={voltear}
              className={styles.voltear}
              type="button"
              aria-expanded={abierta}
              aria-controls={`d-${f.id}`}
              onClick={() => girar(true)}
            >
              <span className={styles.cuando}>{f.cuando}</span>
              <span className={styles.abajo}>
                <span className={styles.lk}>
                  <LogotipoFormato palabra={f.palabra} color={f.cl} viewBox={f.viewBox} />
                </span>
                <span className={styles.pista}>
                  <Icono tipo="vuelta" />
                  Toca para ver
                </span>
              </span>
              <span className={styles.sr}>Ver de qué va {f.palabra}</span>
            </button>
          </div>
          <div
            className={`${styles.cara} ${styles.dorso}`}
            id={`d-${f.id}`}
            inert={!abierta}
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest("button")) girar(false);
            }}
          >
            <h3>{f.palabra}</h3>
            <p>{f.que}</p>
            <dl className={styles.pares}>
              <dt>Para quién</dt>
              <dd>{f.quien}</dd>
              <dt>Cuándo</dt>
              <dd>{f.cuandoLargo}</dd>
            </dl>
            <div className={styles.acciones}>
              <button
                ref={interesa}
                className={styles.interesa}
                type="button"
                aria-pressed={marcada}
                onClick={alternar}
              >
                <span className={styles.no}>
                  <Icono tipo="mas" />
                </span>
                <span className={styles.si}>
                  <Icono tipo="check" />
                </span>
                Me interesa
              </button>
              <button
                className={styles.volver}
                type="button"
                aria-label="Volver a la portada de la tarjeta"
                onClick={() => girar(false)}
              >
                <Icono tipo="atras" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Formatos2027() {
  const [idx, setIdx] = useState(0);
  const [marcadas, setMarcadas] = useState<ReadonlySet<string>>(new Set());
  const [rol, setRol] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const volteadas = useRef(new Set<string>());
  const marcadasRef = useRef<ReadonlySet<string>>(marcadas);
  const origenRef = useRef("directo");
  const inicio = useRef(0);
  const mandada = useRef(false);
  const aviso = useRef<HTMLElement>(null);
  const listo = useRef<HTMLDivElement>(null);
  const correo = useRef<HTMLInputElement>(null);
  const sitio = useRef<HTMLInputElement>(null);

  const total = FORMATOS.length;

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

  // Entrada: el baño y el logotipo pasan por los formatos.
  useEffect(() => {
    if (sinMovimiento() || total < 2) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      setIdx((i) => (i + 1) % total);
    }, 2600);
    return () => clearInterval(t);
  }, [total]);

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

  useEffect(() => {
    if (enviado) listo.current?.focus();
  }, [enviado]);

  function marcar(id: string, si: boolean) {
    setMarcadas((prev) => {
      const sig = new Set(prev);
      if (si) sig.add(id);
      else sig.delete(id);
      return sig;
    });
  }

  function marcarTodos(si: boolean) {
    setMarcadas(si ? new Set(FORMATOS.map((f) => f.id)) : new Set());
  }

  function enviarAviso(e: FormEvent<HTMLFormElement>) {
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
      origen: origenRef.current,
      formatos: Array.from(marcadas),
      todos: marcadas.size === total,
      rol,
      email,
      website: sitio.current?.value ?? "",
    };
    setEnviando(true);
    fetch("/api/interes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then(async (r) => {
        const j = (await r.json().catch(() => ({}))) as { error?: string };
        if (!r.ok) throw new Error(j.error || "No pudimos guardar tu aviso. Intenta de nuevo en un rato.");
        setEnviado(true);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error && err.message
            ? err.message
            : "No pudimos guardar tu aviso. Intenta de nuevo en un rato.",
        );
        setEnviando(false);
      });
  }

  const n = marcadas.size;
  const verBarra = n > 0 && !enviado && !formVisible;
  const actual = FORMATOS[idx] ?? FORMATOS[0];

  return (
    <>
      <main>
      <section className={styles.entrada} aria-labelledby="t-2027">
        <div className={styles.avila} aria-hidden="true" />
        <div
          className={styles.bano}
          aria-hidden="true"
          style={{ backgroundColor: actual?.c }}
        />
        <div className={`${styles.envoltura} ${styles.titular}`}>
          <div className={styles.rota} aria-hidden="true">
            {FORMATOS.map((f, i) => (
              <div key={f.id} className={`${styles.lk}${i === idx ? ` ${styles.on}` : ""}`}>
                <LogotipoFormato palabra={f.palabra} color={f.cl} viewBox={f.viewBox} />
              </div>
            ))}
          </div>
          <h1 id="t-2027">En 2027 nos vemos de seis maneras</h1>
          <p className={styles.bajada}>
            El meetup sigue cada mes y llegan <b>cinco formatos nuevos</b>. Voltea cada tarjeta y marca los que te
            interesan.
          </p>
          <a className={styles.ir} href="#formatos" onClick={(e) => irAncla(e, "formatos")}>
            Ver los formatos <Icono tipo="abajo" />
          </a>
        </div>
      </section>

        <section className={`${styles.formatos} ${styles.envoltura}`} id="formatos" aria-label="Formatos de 2027">
          <ul className={styles.rejilla}>
            {FORMATOS.map((f) => (
              <Tarjeta
                key={f.id}
                f={f}
                marcada={marcadas.has(f.id)}
                onMarcar={marcar}
                onVoltear={(id) => volteadas.current.add(id)}
              />
            ))}
          </ul>
        </section>

        <section
          ref={aviso}
          className={`${styles.aviso} ${styles.envoltura}`}
          id="avisame"
          aria-labelledby="t-aviso"
        >
          <h2 id="t-aviso">Te avisamos cuando abra cada uno</h2>
          <p className={styles.intro}>
            Deja tu correo y te escribimos cuando haya fecha, solo de los formatos que marques.
          </p>
          {!enviado ? (
            <form className={styles.form} noValidate onSubmit={enviarAviso}>
              <fieldset className={styles.grupo}>
                <legend className={styles.leyenda}>Formatos</legend>
                <div className={styles.chips}>
                  <label className={`${styles.chip} ${styles.todos}`}>
                    <input
                      type="checkbox"
                      name="todos"
                      value="todos"
                      checked={n === total}
                      onChange={(e) => marcarTodos(e.target.checked)}
                    />
                    <span>Todos</span>
                  </label>
                  {FORMATOS.map((f) => (
                    <label key={f.id} className={styles.chip} style={{ "--c": f.c } as Estilo}>
                      <input
                        type="checkbox"
                        name="formatos"
                        value={f.id}
                        checked={marcadas.has(f.id)}
                        onChange={(e) => marcar(f.id, e.target.checked)}
                      />
                      <span>
                        <i />
                        {f.palabra.charAt(0).toUpperCase() + f.palabra.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={styles.grupo}>
                <legend className={styles.leyenda}>¿Qué haces?</legend>
                <div className={styles.chips}>
                  {roles2027.map((r) => (
                    <label key={r.id} className={styles.chip}>
                      <input
                        type="radio"
                        name="rol"
                        value={r.id}
                        checked={rol === r.id}
                        onChange={() => setRol(r.id)}
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className={styles.campo} htmlFor="email">
                Tu correo
              </label>
              <input
                ref={correo}
                className={styles.correo}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="nombre@correo.com"
                required
              />
              <div className={styles.trampa} aria-hidden="true">
                <label>
                  Sitio web <input ref={sitio} type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <p className={styles.error} role="alert">
                {error}
              </p>
              <button className={styles.enviar} type="submit" disabled={enviando}>
                Avísame
              </button>
              <p className={styles.nota}>Usamos tu correo solo para avisarte de estos eventos.</p>
            </form>
          ) : (
            <div className={styles.listo} ref={listo} tabIndex={-1}>
              <h3>Listo, quedaste anotado</h3>
              <p>
                Te escribimos cuando abra cada formato que marcaste. Mientras tanto, los próximos eventos salen
                primero en Luma.
              </p>
              <div className={styles.botones}>
                <a href="https://luma.com/ccstech_" target="_blank" rel="noreferrer">
                  Ver el calendario en Luma
                </a>
                <a href="https://www.instagram.com/caracastech_meetup/" target="_blank" rel="noreferrer">
                  Seguir en Instagram
                </a>
              </div>
            </div>
          )}
        </section>

        <p className={`${styles.marcas} ${styles.envoltura}`}>
          ¿Tu marca quiere estar en alguno de estos formatos? Escríbenos desde <Link href="/patrocinar">Patrocinar</Link>.
        </p>
      </main>

      <div className={`${styles.barra}${verBarra ? ` ${styles.ver}` : ""}`} aria-live="polite">
        <div className={styles.envoltura}>
          <div>
            <div className={styles.puntos} aria-hidden="true">
              {FORMATOS.map((f) => (
                <i
                  key={f.id}
                  className={marcadas.has(f.id) ? styles.on : undefined}
                  style={{ "--c": f.c } as Estilo}
                />
              ))}
            </div>
            <p className={styles.cuenta}>
              {n === total && n > 0
  ? total === 6
                  ? "Marcaste los seis formatos"
                  : "Marcaste todos los formatos"
                : `${n} ${n === 1 ? "formato marcado" : "formatos marcados"}`}
            </p>
          </div>
          <a href="#avisame" onClick={(e) => irAncla(e, "avisame")}>
            Avísame
          </a>
        </div>
      </div>
    </>
  );
}
