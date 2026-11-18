"use client";

import { Handshake } from "lucide-react";

import s from "../estilos.module.css";
import { M, Punteada, T, busto } from "./trazos";
import type { Escena } from "./trazos";

/* 1. Inversionista: pantalla con gráfica, quien presenta, público; una cabeza se enciende y se une con quien presenta. */
export function Inversionista({ d, a }: Escena) {
  const publico = [84, 200, 316];
  return (
    <svg className={s.ilus} viewBox="0 0 400 300" role="img" aria-label="Una persona presenta su startup ante el público y un inversionista se interesa">
      <T v={d} de={0} a={0.22} d="M16 196 H384" />
      <T v={d} de={0.04} a={0.34} tag="rect" x={44} y={34} width={186} height={118} rx={6} />
      <T v={d} de={0.12} a={0.3} d="M137 152 V184 M112 196 L137 184 L162 196" />
      <T v={d} de={0.2} a={0.34} d="M62 134 H212" />
      <T v={d} de={0.26} a={0.4} tag="rect" x={70} y={112} width={18} height={22} />
      <T v={d} de={0.3} a={0.44} tag="rect" x={98} y={96} width={18} height={38} />
      <T v={d} de={0.34} a={0.48} tag="rect" x={126} y={80} width={18} height={54} />
      <T v={d} de={0.38} a={0.52} tag="rect" x={154} y={64} width={18} height={70} />
      <T v={d} de={0.5} a={0.8} className={s.ac} d="M66 108 L96 92 L124 76 L154 58 L190 50 M181 48 L191 50 L187 59" />
      <T v={d} de={0.3} a={0.5} tag="circle" cx={268} cy={88} r={11} />
      <T v={d} de={0.4} a={0.8} d="M268 99 V148 M268 112 L240 100 M268 112 L286 134 M268 148 L256 196 M268 148 L282 196" />
      {publico.map((x, i) => (
        <T key={x} v={d} de={0.55 + i * 0.1} a={0.85 + i * 0.05} d={busto(x, 246, 13, 32, 54)} />
      ))}
      {/* Tiempo 2: una cabeza del público se enciende y se une con quien presenta. */}
      <M v={a} t={[0, 0.25]} o={[0, 1]}>
        <path d={busto(200, 246, 13, 32, 54)} className={`${s.ac} ${s.relS}`} />
      </M>
      <M v={a} t={[0.05, 0.4, 0.7]} o={[0, 0.9, 0]} s={[0.5, 1.1, 1.7]} final="oculto">
        <circle cx={200} cy={246} r={20} className={s.ac} />
      </M>
      <Punteada v={a} de={0.2} a={0.8} className={s.ac} d="M200 229 C204 205 300 214 318 172" />
      <M v={a} t={[0.75, 1]} o={[0, 1]} s={[0.4, 1]}>
        <Handshake x={305} y={140} width={26} height={26} strokeWidth={1.75} className={s.ac} aria-hidden="true" />
      </M>
    </svg>
  );
}

/* 2. Cofounder: dos laptops enfrentadas con código; las líneas se unen en una caja de producto. */
const izq = (u: number, v: number): [number, number] => {
  const top = 92 + 16 * u;
  const bot = 184 - 16 * u;
  return [24 + 88 * u, top + v * (bot - top)];
};
const der = (u: number, v: number): [number, number] => {
  const [x, y] = izq(u, v);
  return [400 - x, y];
};
const linea = (f: typeof izq, u0: number, u1: number, v: number) => {
  const [x0, y0] = f(u0, v);
  const [x1, y1] = f(u1, v);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

export function Cofounder({ d, a }: Escena) {
  const codigoI = [linea(izq, 0.14, 0.8, 0.62), linea(izq, 0.14, 0.46, 0.76), linea(izq, 0.14, 0.66, 0.9)];
  const codigoD = [linea(der, 0.14, 0.8, 0.62), linea(der, 0.14, 0.46, 0.76), linea(der, 0.14, 0.66, 0.9)];
  return (
    <svg className={s.ilus} viewBox="0 0 400 300" role="img" aria-label="Dos personas escriben código en laptops enfrentadas y juntas arman un producto en un fin de semana">
      {/* Calendario con sábado y domingo */}
      <T v={d} de={0} a={0.3} tag="rect" x={150} y={12} width={100} height={50} rx={5} />
      <T v={d} de={0.1} a={0.3} d="M150 26 H250 M172 7 V17 M228 7 V17" />
      <T v={d} de={0.2} a={0.4} tag="rect" x={157} y={33} width={40} height={22} rx={3} />
      <T v={d} de={0.25} a={0.45} tag="rect" x={203} y={33} width={40} height={22} rx={3} />
      <M v={d} t={[0.4, 0.55]} o={[0, 1]}>
        <text x={177} y={48.5} textAnchor="middle" className={s.cTxt}>Sáb</text>
        <text x={223} y={48.5} textAnchor="middle" className={s.cTxt}>Dom</text>
      </M>
      <M v={a} t={[0, 0.2]} o={[0, 1]}>
        <rect x={157} y={33} width={40} height={22} rx={3} className={`${s.ac} ${s.relS}`} />
        <rect x={203} y={33} width={40} height={22} rx={3} className={`${s.ac} ${s.relS}`} />
        <text x={177} y={48.5} textAnchor="middle" className={`${s.cTxt} ${s.cTxtAc}`}>Sáb</text>
        <text x={223} y={48.5} textAnchor="middle" className={`${s.cTxt} ${s.cTxtAc}`}>Dom</text>
      </M>
      <g transform="translate(0 26)">
        <T v={d} de={0.05} a={0.4} d="M24 92 L112 108 L112 168 L24 184 Z" />
        <T v={d} de={0.1} a={0.45} d="M24 184 L112 168 L134 190 L46 206 Z" />
        <T v={d} de={0.05} a={0.4} d="M376 92 L288 108 L288 168 L376 184 Z" />
        <T v={d} de={0.1} a={0.45} d="M376 184 L288 168 L266 190 L354 206 Z" />
        <T v={d} de={0.4} a={0.6} className={s.ac} d="M46 121 L38 128 L46 135 M56 137 L62 119 M72 121 L80 128 L72 135" />
        <T v={d} de={0.4} a={0.6} className={s.ac} d="M334 121 L326 128 L334 135 M342 137 L348 119 M356 121 L364 128 L356 135" />
        {codigoI.map((p, i) => (
          <T key={`i${i}`} v={d} de={0.5 + i * 0.1} a={0.75 + i * 0.1} d={p} />
        ))}
        {codigoD.map((p, i) => (
          <T key={`d${i}`} v={d} de={0.55 + i * 0.1} a={0.8 + i * 0.1} d={p} />
        ))}
        <T v={d} de={0.2} a={0.5} d="M12 216 H388" />
        {/* Tiempo 2: las líneas salen de ambas pantallas y se unen en la caja. */}
        {[130, 142, 154].map((y, i) => (
          <M key={`li${y}`} v={a} t={[0.05 + i * 0.05, 0.2 + i * 0.05, 0.6, 0.78]} o={[0, 1, 1, 0]} x={[0, 20, 62, 72]} final="oculto">
            <path d={`M86 ${y} L102 ${y - 3}`} className={s.ac} />
          </M>
        ))}
        {[130, 142, 154].map((y, i) => (
          <M key={`ld${y}`} v={a} t={[0.05 + i * 0.05, 0.2 + i * 0.05, 0.6, 0.78]} o={[0, 1, 1, 0]} x={[0, -20, -62, -72]} final="oculto">
            <path d={`M314 ${y} L298 ${y - 3}`} className={s.ac} />
          </M>
        ))}
        <T v={a} de={0.5} a={0.85} className={s.ac} d="M200 112 L236 130 L236 172 L200 190 L164 172 L164 130 Z M164 130 L200 148 L236 130 M200 148 V190" />
        <M v={a} t={[0.78, 0.9, 1]} o={[0, 1, 0.9]} s={[0.4, 1.15, 1]}>
          <path d="M248 112 V126 M241 119 H255 M254 138 V144 M251 141 H257" className={s.ac} />
        </M>
      </g>
    </svg>
  );
}

/* 3. Cliente: una sala con nueve personas; un barrido enciende a una y aparece un check. */
export function Cliente({ d, a }: Escena) {
  const cols = [100, 200, 300];
  const filas = [
    { cy: 104, r: 11, w: 28, h: 42 },
    { cy: 170, r: 12, w: 31, h: 44 },
    { cy: 236, r: 13, w: 34, h: 46 },
  ];
  let k = 0;
  return (
    <svg className={s.ilus} viewBox="0 0 400 300" role="img" aria-label="Una sala llena de gente; un barrido encuentra a la persona que busca lo que vendes">
      <T v={d} de={0} a={0.3} tag="rect" x={14} y={14} width={372} height={272} rx={10} />
      {filas.map((f) =>
        cols.map((x) => {
          const i = k++;
          return <T key={`${f.cy}-${x}`} v={d} de={0.1 + i * 0.07} a={0.4 + i * 0.07} d={busto(x, f.cy, f.r, f.w, f.h)} />;
        }),
      )}
      {/* Tiempo 2: el barrido recorre la sala y enciende a una persona. */}
      <M v={a} t={[0, 0.06, 0.66, 0.82]} o={[0, 1, 1, 0]} x={[0, 0, 264, 270]} final="oculto">
        <path d="M36 26 V274" className={s.ac} />
        <path d="M29 26 V274" className={s.ac} opacity={0.5} />
        <path d="M22 26 V274" className={s.ac} opacity={0.25} />
        <path d="M15 26 V274" className={s.ac} opacity={0.12} />
      </M>
      <M v={a} t={[0.58, 0.72]} o={[0, 1]}>
        <path d={busto(300, 104, 11, 28, 42)} className={`${s.ac} ${s.relS}`} />
      </M>
      <M v={a} t={[0.58, 0.78, 0.95]} o={[0, 0.9, 0]} s={[0.6, 1.2, 1.6]} final="oculto">
        <circle cx={300} cy={104} r={20} className={s.ac} />
      </M>
      <M v={a} t={[0.7, 0.88]} o={[0, 1]} s={[0.5, 1]} y={[8, 0]}>
        <path d="M266 28 H334 Q342 28 342 36 V58 Q342 66 334 66 H316 L300 80 L284 66 H266 Q258 66 258 58 V36 Q258 28 266 28 Z" className={s.ac} />
      </M>
      <T v={a} de={0.82} a={1} className={s.ac} d="M284 47 L295 58 L317 36" />
    </svg>
  );
}
