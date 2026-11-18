import { animate } from "motion/react";
import type { MotionValue } from "motion/react";

import { formatosDe } from "@/lib/busquedas-2027";
import type { BusquedaId } from "@/lib/busquedas-2027";

import { FORMATOS } from "./tipos";

/*
 * Motor de la escena «Más de una noche». Dibuja en un canvas ~220 puntos (cada uno es una persona)
 * que cambian de lugar según el progreso del scroll. No toca React: lee el progreso, escribe en el
 * canvas y en unos pocos nodos del DOM, y solo avisa cuando cambia el paso.
 *
 * Etapas (s = 0 a 4): 0 círculo con ~50 puntos, 1 se encienden los de afuera, 2 la vista se abre,
 * 3 seis círculos, 4 «tú» y la pregunta. Todas las posiciones salen de semillas fijas.
 */

const NF = FORMATOS.length;
const IDS = FORMATOS.map((f) => f.id);
const TAU = Math.PI * 2;

// Dónde empieza cada paso del recorrido (0 a 1) y cuánto dura el cambio de dibujo al entrar a él.
const INICIO = [0, 0.16, 0.33, 0.5, 0.66] as const;
const VENTANA = 0.1;
const SALIDA_DESDE = 0.92;

const VERDE = "#46c536";
const PALETA = ["#7fe36f", "#f1f7f1", ...FORMATOS.map((f) => f.cl), "#ffffff"];
const C_BLANCO = 1;
const C_FORMATO = 2;
const C_TU = PALETA.length - 1;

const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const suave = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function pasoDe(p: number) {
  let k = 0;
  for (let i = 1; i < INICIO.length; i++) if (p >= INICIO[i]) k = i;
  return k;
}
/** Etapa continua del dibujo: cambia solo durante la ventana inicial de cada paso. */
export function etapaDe(p: number) {
  const k = pasoDe(p);
  if (k === 0) return 0;
  return k - 1 + clamp((p - INICIO[k]) / VENTANA);
}
export const salidaDe = (p: number) => clamp((p - SALIDA_DESDE) / (1 - SALIDA_DESDE));

function mulberry32(a: number) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Semilla = {
  n: number;
  nIn: number;
  nA: number;
  K: number;
  cand: Float32Array;
  fase: Float32Array;
  ret: Float32Array;
  tam: Float32Array;
};

const semillas = new Map<boolean, Semilla>();
function semillaDe(movil: boolean): Semilla {
  const hecha = semillas.get(movil);
  if (hecha) return hecha;
  const rnd = mulberry32(movil ? 7771 : 2027);
  const nIn = movil ? 40 : 50;
  const nOut = movil ? 80 : 170;
  const n = nIn + nOut;
  const K = 8;
  const cand = new Float32Array(n * K * 2);
  for (let i = 0; i < cand.length; i++) cand[i] = rnd();
  const fase = new Float32Array(n);
  const ret = new Float32Array(n);
  const tam = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    fase[i] = rnd();
    ret[i] = rnd();
    tam[i] = 0.8 + rnd() * 0.45;
  }
  const sem = { n, nIn, nA: Math.round(nOut * 0.42), K, cand, fase, ret, tam };
  semillas.set(movil, sem);
  return sem;
}

type Capa = {
  x: Float32Array;
  y: Float32Array;
  a: Float32Array;
  r: Float32Array;
  c: Uint8Array;
  uno: number[]; // x, y, radio, opacidad del círculo verde
  sx: Float32Array;
  sy: Float32Array;
  sr: Float32Array;
  sa: Float32Array; // los seis círculos
  ex: Float32Array;
  ey: Float32Array;
  ea: Float32Array; // rótulos: seis formatos y «tú»
  tu: number[]; // x, y, radio, opacidad
};

export type Geo = {
  W: number;
  H: number;
  movil: boolean;
  sem: Semilla;
  capas: Capa[];
  dueno: Uint8Array;
  fx: number;
  fy: number;
};

function nuevaCapa(n: number): Capa {
  return {
    x: new Float32Array(n),
    y: new Float32Array(n),
    a: new Float32Array(n),
    r: new Float32Array(n),
    c: new Uint8Array(n),
    uno: [0, 0, 0, 0],
    sx: new Float32Array(NF),
    sy: new Float32Array(NF),
    sr: new Float32Array(NF),
    sa: new Float32Array(NF),
    ex: new Float32Array(NF + 1),
    ey: new Float32Array(NF + 1),
    ea: new Float32Array(NF + 1),
    tu: [0, 0, 0, 0],
  };
}

type Area = { l: number; r: number; t: number; b: number };

function celdas(a: Area, movil: boolean) {
  const cols = movil ? 2 : 3;
  const filas = Math.ceil(NF / cols);
  const cw = (a.r - a.l) / cols;
  const ch = (a.b - a.t) / filas;
  const lab = 26;
  const r = Math.max(14, Math.min(cw * 0.37, (ch - lab - 6) / 2, 140));
  return Array.from({ length: NF }, (_, k) => {
    const col = k % cols;
    const fila = Math.floor(k / cols);
    const arriba = !movil && fila < filas / 2;
    const y = a.t + ch * (fila + 0.5) + (arriba ? lab / 2 : -lab / 2);
    return { x: a.l + cw * (col + 0.5), y, r, ly: arriba ? y - r - 15 : y + r + 15 };
  });
}

export function construir(W: number, H: number, reservaPregunta: number): Geo {
  const movil = W < 720;
  const lateral = W >= 900;
  const sem = semillaDe(movil);
  const { n, nIn, nA, K, cand } = sem;

  const reserva = movil ? 150 : 170;
  const area = (res: number): Area =>
    lateral
      ? { l: W * 0.4, r: W - 32, t: 64, b: H - 32 }
      : { l: movil ? 16 : 40, r: W - (movil ? 16 : 40), t: 56, b: Math.max(56 + 170, H - res) };
  const A0 = area(reserva);
  const A4 = area(lateral ? reserva : reservaPregunta);

  const cx = (A0.l + A0.r) / 2;
  const cy = (A0.t + A0.b) / 2;
  const R0 = clamp(Math.min(A0.r - A0.l, A0.b - A0.t) * 0.25, 60, 118);
  const k2 = 0.4;
  const R2 = R0 * k2;
  const sIn = movil ? 2.1 : 2.6;
  const sOut = movil ? 1.6 : 1.9;
  const sGrupo = movil ? 1.9 : 2.4;

  const capas = Array.from({ length: 5 }, () => nuevaCapa(n));
  const [c0, c1, c2, c3, c4] = capas;

  for (let i = 0; i < n; i++) {
    const tam = sem.tam[i];
    const j = i * K * 2;
    if (i < nIn) {
      // Adentro, apretados: espiral de girasol con un pequeño temblor fijo.
      const rho = R0 * 0.86 * Math.sqrt((i + 0.5) / nIn);
      const th = i * 2.39996 + (cand[j] - 0.5) * 0.5;
      const px = cx + rho * Math.cos(th);
      const py = cy + rho * Math.sin(th);
      for (const c of [c0, c1]) {
        c.x[i] = px;
        c.y[i] = py;
      }
      c2.x[i] = cx + (px - cx) * k2;
      c2.y[i] = cy + (py - cy) * k2;
      for (const c of [c0, c1, c2]) {
        c.a[i] = 1;
        c.c[i] = 0;
        c.r[i] = sIn * tam * (c === c2 ? 0.85 : 1);
      }
    } else if (i < nIn + nA) {
      // Alrededor del círculo, en el mismo cuadro.
      let px = cx + R0 * 1.6;
      let py = cy;
      let ok = false;
      let u = 0;
      let v = 0;
      for (let k = 0; k < K && !ok; k++) {
        u = cand[j + k * 2];
        v = cand[j + k * 2 + 1];
        const x = A0.l + 12 + u * (A0.r - A0.l - 24);
        const y = A0.t + 8 + v * (A0.b - A0.t - 16);
        if (Math.hypot(x - cx, y - cy) > R0 * 1.3 + 8) {
          px = x;
          py = y;
          ok = true;
        }
      }
      if (!ok) {
        const ang = u * TAU;
        px = cx + Math.cos(ang) * R0 * 1.6;
        py = cy + Math.sin(ang) * R0 * 1.6;
      }
      c0.x[i] = cx + (px - cx) * 0.55;
      c0.y[i] = cy + (py - cy) * 0.55;
      c1.x[i] = px;
      c1.y[i] = py;
      c2.x[i] = cx + (px - cx) * k2;
      c2.y[i] = cy + (py - cy) * k2;
      c0.a[i] = 0;
      c1.a[i] = 0.55;
      c2.a[i] = 0.55;
      for (const c of [c0, c1, c2]) {
        c.c[i] = C_BLANCO;
        c.r[i] = sOut * tam;
      }
    } else {
      // Fuera de cuadro hasta que la vista se abre; ocupan toda la pantalla.
      let px = cx + R2 * 3;
      let py = cy;
      let ok = false;
      let u = 0;
      for (let k = 0; k < K && !ok; k++) {
        u = cand[j + k * 2];
        const v = cand[j + k * 2 + 1];
        const x = 10 + u * (W - 20);
        const y = 56 + v * (H - 66);
        if (Math.hypot(x - cx, y - cy) > R2 * 2 + 10) {
          px = x;
          py = y;
          ok = true;
        }
      }
      if (!ok) {
        px = cx + Math.cos(u * TAU) * R2 * 3;
        py = cy + Math.sin(u * TAU) * R2 * 3;
      }
      for (const c of [c0, c1]) {
        c.x[i] = cx + (px - cx) * 2.6;
        c.y[i] = cy + (py - cy) * 2.6;
        c.a[i] = 0;
      }
      c2.x[i] = px;
      c2.y[i] = py;
      c2.a[i] = 0.42;
      for (const c of [c0, c1, c2]) {
        c.c[i] = C_BLANCO;
        c.r[i] = sOut * tam;
      }
    }
  }

  // Cada punto se va al círculo más cercano que aún tenga lugar.
  const s3 = celdas(A0, movil);
  const s4 = celdas(A4, movil);
  const cupo = Array.from({ length: NF }, (_, k) => Math.floor(n / NF) + (k < n % NF ? 1 : 0));
  const dist = (i: number, k: number) => Math.hypot(c2.x[i] - s3[k].x, c2.y[i] - s3[k].y);
  const cerca = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let m = Infinity;
    for (let k = 0; k < NF; k++) m = Math.min(m, dist(i, k));
    cerca[i] = m;
  }
  const orden = Array.from({ length: n }, (_, i) => i).sort((a, b) => cerca[a] - cerca[b] || a - b);
  const dueno = new Uint8Array(n);
  const cuenta = new Array<number>(NF).fill(0);
  for (const i of orden) {
    const ks = Array.from({ length: NF }, (_, k) => k).sort((a, b) => dist(i, a) - dist(i, b) || a - b);
    const k = ks.find((q) => cuenta[q] < cupo[q]) ?? 0;
    dueno[i] = k;
    cuenta[k]++;
  }
  const lugar = new Array<number>(NF).fill(0);
  for (let i = 0; i < n; i++) {
    const k = dueno[i];
    const q = lugar[k]++;
    const rho = 0.8 * Math.sqrt((q + 0.5) / cupo[k]);
    const th = q * 2.39996 + k * 0.7;
    const ox = rho * Math.cos(th);
    const oy = rho * Math.sin(th);
    const tam = sem.tam[i];
    c3.x[i] = s3[k].x + ox * s3[k].r;
    c3.y[i] = s3[k].y + oy * s3[k].r;
    c4.x[i] = s4[k].x + ox * s4[k].r;
    c4.y[i] = s4[k].y + oy * s4[k].r;
    for (const c of [c3, c4]) {
      c.a[i] = 0.92;
      c.c[i] = C_FORMATO + k;
      c.r[i] = sGrupo * tam;
    }
  }

  const tx = (A4.l + A4.r) / 2;
  const ty = (A4.t + A4.b) / 2;
  const rTu = movil ? 5.5 : 7;
  capas.forEach((c, e) => {
    c.uno = [cx, cy, e === 2 ? R2 : e < 2 ? R0 : R2, e < 3 ? 1 : 0];
    for (let k = 0; k < NF; k++) {
      const g = e === 3 ? s3[k] : e === 4 ? s4[k] : null;
      c.sx[k] = g ? g.x : cx;
      c.sy[k] = g ? g.y : cy;
      c.sr[k] = g ? g.r : R2 * 0.9;
      c.sa[k] = g ? 1 : 0;
      c.ex[k] = g ? g.x : cx;
      c.ey[k] = g ? g.ly : cy;
      c.ea[k] = g ? 1 : 0;
    }
    c.ex[NF] = tx;
    c.ey[NF] = ty + (movil ? 20 : 27);
    c.ea[NF] = e === 4 ? 1 : 0;
    c.tu = [tx, ty, e === 4 ? rTu : 0, e === 4 ? 1 : 0];
  });

  return { W, H, movil, sem, capas, dueno, fx: tx, fy: ty };
}

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}

/** Punto de luz con halo, dibujado una sola vez por color y reutilizado. */
function crearSprite(color: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d");
  if (x) {
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, rgba(color, 1));
    g.addColorStop(0.26, rgba(color, 1));
    g.addColorStop(0.33, rgba(color, 0.5));
    g.addColorStop(0.6, rgba(color, 0.12));
    g.addColorStop(1, rgba(color, 0));
    x.fillStyle = g;
    x.fillRect(0, 0, 64, 64);
  }
  return c;
}
const GLOW = 3.8;

export type Montaje = { buscar: (id: BusquedaId | null) => void; destruir: () => void };

export function montar(o: {
  canvas: HTMLCanvasElement;
  pegado: HTMLElement;
  sec: HTMLElement;
  texto: HTMLElement;
  frases: HTMLElement;
  preguntaIn: HTMLElement;
  etis: (HTMLElement | null)[];
  progreso: MotionValue<number>;
  onPaso: (k: number) => void;
  onVista: (v: boolean) => void;
}): Montaje {
  const ctx = o.canvas.getContext("2d");
  if (!ctx) return { buscar: () => {}, destruir: () => {} };
  const pincel = ctx;

  const sprites = PALETA.map(crearSprite);
  const est = { s: 0, x: 0 };
  const dim = new Float32Array(NF).fill(1);
  const foco = new Float32Array(NF);
  const lineas = new Float32Array(NF);
  const cx6 = new Float32Array(NF);
  const cy6 = new Float32Array(NF);
  const cr6 = new Float32Array(NF);
  let anims: { stop: () => void }[] = [];
  let geo: Geo | null = null;
  let dpr = 1;
  let sucio = true;
  let visible = false;
  let raf = 0;
  let ultimo = 0;
  let paso = 0;
  let ultimaOpacidad = "";
  const memoria = o.etis.map(() => "");

  function medir() {
    const r = o.pegado.getBoundingClientRect();
    const W = Math.round(r.width);
    const H = Math.round(r.height);
    if (!W || !H) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    o.canvas.width = Math.round(W * dpr);
    o.canvas.height = Math.round(H * dpr);
    pincel.setTransform(dpr, 0, 0, dpr, 0, 0);
    const reserva = o.frases.offsetHeight + o.preguntaIn.offsetHeight + 44;
    geo = construir(W, H, reserva);
    for (let i = 0; i < memoria.length; i++) memoria[i] = "";
    sucio = true;
  }

  function poner(sp: HTMLCanvasElement, x: number, y: number, r: number, alfa: number) {
    if (alfa < 0.015 || r <= 0) return;
    const R = r * GLOW;
    pincel.globalAlpha = alfa > 1 ? 1 : alfa;
    pincel.drawImage(sp, x - R, y - R, R * 2, R * 2);
  }

  function dibujar(ahora: number) {
    const g = geo;
    if (!g) return;
    const { W, H, capas, dueno, sem } = g;
    const tt = ahora / 1000;
    pincel.clearRect(0, 0, W, H);

    const s = clamp(est.s, 0, 4);
    const a0 = Math.min(3, Math.floor(s));
    const t = s - a0;
    const te = suave(t);
    const A = capas[a0];
    const B = capas[a0 + 1];
    const ex = suave(est.x);
    const ga = 1 - ex;
    const sc = 1 + 1.7 * ex;
    const w3 = clamp(s - 3);

    // Rótulos (HTML): se mueven con la misma escala de salida.
    for (let k = 0; k <= NF; k++) {
      const el = o.etis[k];
      if (!el) continue;
      const x = g.fx + (lerp(A.ex[k], B.ex[k], te) - g.fx) * sc;
      const y = g.fy + (lerp(A.ey[k], B.ey[k], te) - g.fy) * sc;
      const m = k < NF ? 0.25 + 0.75 * (1 - (1 - dim[k]) * w3) : 1;
      const op = Math.round(lerp(A.ea[k], B.ea[k], te) * m * ga * 100) / 100;
      const clave = `${Math.round(x)},${Math.round(y)},${op}`;
      if (memoria[k] === clave) continue;
      memoria[k] = clave;
      el.style.transform = `translate3d(${Math.round(x)}px,${Math.round(y)}px,0) translate(-50%,-50%)`;
      el.style.opacity = String(op);
    }
    const opTexto = String(Math.round(ga * 100) / 100);
    if (opTexto !== ultimaOpacidad) {
      ultimaOpacidad = opTexto;
      o.texto.style.opacity = opTexto;
    }
    if (ga <= 0.003) return;

    pincel.save();
    if (ex > 0) {
      pincel.translate(g.fx, g.fy);
      pincel.scale(sc, sc);
      pincel.translate(-g.fx, -g.fy);
    }

    // Círculo verde (pasos 1 a 3).
    const ua = lerp(A.uno[3], B.uno[3], te);
    if (ua > 0.01) {
      pincel.beginPath();
      pincel.arc(lerp(A.uno[0], B.uno[0], te), lerp(A.uno[1], B.uno[1], te), lerp(A.uno[2], B.uno[2], te), 0, TAU);
      pincel.globalAlpha = ua * ga * 0.07;
      pincel.fillStyle = VERDE;
      pincel.fill();
      pincel.globalAlpha = ua * ga;
      pincel.lineWidth = 1.25;
      pincel.strokeStyle = VERDE;
      pincel.stroke();
    }

    // Los seis círculos.
    for (let k = 0; k < NF; k++) {
      const x = lerp(A.sx[k], B.sx[k], te);
      const y = lerp(A.sy[k], B.sy[k], te);
      const r = lerp(A.sr[k], B.sr[k], te);
      cx6[k] = x;
      cy6[k] = y;
      cr6[k] = r;
      const a = lerp(A.sa[k], B.sa[k], te);
      if (a < 0.01) continue;
      const m = 1 - (1 - dim[k]) * w3;
      const f = foco[k] * w3;
      pincel.beginPath();
      pincel.arc(x, y, r, 0, TAU);
      pincel.globalAlpha = a * m * ga * (0.1 + 0.08 * f);
      pincel.fillStyle = FORMATOS[k].c;
      pincel.fill();
      if (f > 0.01) {
        pincel.globalAlpha = a * ga * f * 0.22;
        pincel.lineWidth = 7;
        pincel.strokeStyle = FORMATOS[k].cl;
        pincel.stroke();
      }
      pincel.globalAlpha = a * m * ga;
      pincel.lineWidth = 1.4 + 1.2 * f;
      pincel.strokeStyle = FORMATOS[k].c;
      pincel.stroke();
    }

    // Las personas.
    const idle = 0.84;
    for (let i = 0; i < sem.n; i++) {
      const tl = suave(clamp((t - sem.ret[i] * 0.4) / 0.6));
      const a = lerp(A.a[i], B.a[i], tl);
      if (a < 0.015) continue;
      let alfa = a * ga * (idle + 0.16 * Math.sin(tt * 1.5 + sem.fase[i] * TAU));
      if (w3 > 0) alfa *= 1 - (1 - dim[dueno[i]]) * w3;
      const x = lerp(A.x[i], B.x[i], tl);
      const y = lerp(A.y[i], B.y[i], tl);
      const r = lerp(A.r[i], B.r[i], tl);
      const ca = A.c[i];
      const cb = B.c[i];
      if (ca === cb) poner(sprites[ca], x, y, r, alfa);
      else {
        poner(sprites[ca], x, y, r, alfa * (1 - tl));
        poner(sprites[cb], x, y, r, alfa * tl);
      }
    }

    // Líneas desde «tú» hacia los círculos de la búsqueda elegida.
    const tx = lerp(A.tu[0], B.tu[0], te);
    const ty = lerp(A.tu[1], B.tu[1], te);
    const tr = lerp(A.tu[2], B.tu[2], te);
    if (w3 > 0) {
      for (let k = 0; k < NF; k++) {
        const L = lineas[k];
        if (L < 0.002) continue;
        const dx = cx6[k] - tx;
        const dy = cy6[k] - ty;
        const d = Math.hypot(dx, dy) || 1;
        const ux = dx / d;
        const uy = dy / d;
        const x0 = tx + ux * (tr + 4);
        const y0 = ty + uy * (tr + 4);
        const x1 = cx6[k] - ux * (cr6[k] + 3);
        const y1 = cy6[k] - uy * (cr6[k] + 3);
        const xe = x0 + (x1 - x0) * L;
        const ye = y0 + (y1 - y0) * L;
        pincel.lineCap = "round";
        pincel.beginPath();
        pincel.moveTo(x0, y0);
        pincel.lineTo(xe, ye);
        pincel.strokeStyle = FORMATOS[k].cl;
        pincel.globalAlpha = 0.16 * ga * w3;
        pincel.lineWidth = 6;
        pincel.stroke();
        pincel.globalAlpha = 0.9 * ga * w3;
        pincel.lineWidth = 1.6;
        pincel.stroke();
        if (L > 0.99) {
          const f = (tt * 0.55 + k * 0.17) % 1;
          poner(sprites[C_FORMATO + k], x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, 2.2, ga * w3);
        }
      }
    }

    // «Tú»: un punto blanco más grande, con un anillo que respira.
    const ta = lerp(A.tu[3], B.tu[3], te);
    if (ta > 0.01 && tr > 0.05) {
      poner(sprites[C_TU], tx, ty, tr, ta * ga);
      pincel.beginPath();
      pincel.arc(tx, ty, tr * (2 + 0.3 * Math.sin(tt * 2)), 0, TAU);
      pincel.globalAlpha = ta * ga * 0.28;
      pincel.lineWidth = 1;
      pincel.strokeStyle = "#ffffff";
      pincel.stroke();
    }

    pincel.restore();
    pincel.globalAlpha = 1;
  }

  function tick(ahora: number) {
    raf = requestAnimationFrame(tick);
    if (document.hidden || !geo) return;
    if (!sucio && ahora - ultimo < (geo.movil ? 83 : 50)) return;
    ultimo = ahora;
    sucio = false;
    dibujar(ahora);
  }
  function arrancar() {
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function parar() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  function alCambiar(p: number) {
    est.s = etapaDe(p);
    est.x = salidaDe(p);
    const k = pasoDe(p);
    if (k !== paso) {
      paso = k;
      o.onPaso(k);
    }
    sucio = true;
  }

  const ro = new ResizeObserver(medir);
  ro.observe(o.pegado);
  ro.observe(o.preguntaIn);
  ro.observe(o.frases);
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      o.onVista(visible);
      if (visible) {
        sucio = true;
        arrancar();
      } else parar();
    },
    { rootMargin: "120px 0px" },
  );
  io.observe(o.sec);
  const alVisibilidad = () => {
    sucio = true;
  };
  document.addEventListener("visibilitychange", alVisibilidad);
  const desuscribir = o.progreso.on("change", alCambiar);
  medir();
  alCambiar(o.progreso.get());

  return {
    buscar(id) {
      anims.forEach((a) => a.stop());
      anims = [];
      const marcados = formatosDe(id).map((f) => IDS.indexOf(f));
      for (let k = 0; k < NF; k++) {
        const rango = marcados.indexOf(k);
        const on = rango >= 0;
        const alAnimar = (arr: Float32Array, a: number, b: number, opc: { duration: number; delay?: number }) =>
          animate(a, b, {
            ...opc,
            ease: [0.3, 0.7, 0.2, 1],
            onUpdate: (v: number) => {
              arr[k] = v;
              sucio = true;
            },
          });
        anims.push(alAnimar(dim, dim[k], id ? (on ? 1 : 0.28) : 1, { duration: 0.45 }));
        anims.push(alAnimar(foco, foco[k], on ? 1 : 0, { duration: 0.45 }));
        anims.push(
          alAnimar(lineas, lineas[k], on ? 1 : 0, on ? { duration: 0.7, delay: 0.1 + rango * 0.12 } : { duration: 0.25 }),
        );
      }
      sucio = true;
    },
    destruir() {
      parar();
      anims.forEach((a) => a.stop());
      ro.disconnect();
      io.disconnect();
      desuscribir();
      document.removeEventListener("visibilitychange", alVisibilidad);
    },
  };
}
