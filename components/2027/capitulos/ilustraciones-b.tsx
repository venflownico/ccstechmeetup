"use client";

import s from "../estilos.module.css";
import { M, Punteada, T, busto } from "./trazos";
import type { Escena } from "./trazos";

/* 4. Talento: organigrama con tres personas y un puesto vacío que alguien llena. */
export function Talento({ d, a }: Escena) {
  const tarjeta = (cx: number, y: number) => `M${cx - 38} ${y + 6} Q${cx - 38} ${y} ${cx - 32} ${y} H${cx + 32} Q${cx + 38} ${y} ${cx + 38} ${y + 6} V${y + 74} Q${cx + 38} ${y + 80} ${cx + 32} ${y + 80} H${cx - 32} Q${cx - 38} ${y + 80} ${cx - 38} ${y + 74} Z`;
  return (
    <svg className={s.ilus} viewBox="0 0 400 300" role="img" aria-label="Un organigrama con un puesto vacío que una persona nueva llena">
      <T v={d} de={0} a={0.3} d={tarjeta(200, 14)} />
      <T v={d} de={0.1} a={0.4} d={busto(200, 42, 10, 24, 46)} />
      <T v={d} de={0.25} a={0.55} d="M200 94 V114 M80 114 H320 M80 114 V132 M200 114 V132 M320 114 V132" />
      <T v={d} de={0.35} a={0.65} d={tarjeta(80, 132)} />
      <T v={d} de={0.45} a={0.75} d={busto(80, 160, 10, 24, 46)} />
      <T v={d} de={0.5} a={0.8} d={tarjeta(200, 132)} />
      <T v={d} de={0.6} a={0.9} d={busto(200, 160, 10, 24, 46)} />
      <M v={d} t={[0.6, 0.9]} o={[0, 1]} y={[6, 0]} final="oculto">
        <path d={tarjeta(320, 132)} className={s.vacio} />
        <M v={a} t={[0.05, 0.2]} o={[1, 0]} final="oculto">
          <path d="M320 162 V184 M309 173 H331" />
        </M>
      </M>
      {/* Tiempo 2: una persona sube desde abajo y llena el puesto. */}
      <M v={a} t={[0.05, 0.22, 0.7]} o={[0, 1, 1]} y={[118, 118, 0]}>
        <path d={busto(320, 160, 10, 24, 46)} className={s.ac} />
      </M>
      <M v={a} t={[0.62, 0.82]} o={[0, 1]}>
        <path d={tarjeta(320, 132)} className={`${s.ac} ${s.relS}`} />
      </M>
      <M v={a} t={[0.8, 0.95]} o={[0, 1]} s={[0.3, 1]}>
        <circle cx={358} cy={132} r={11} className={s.rel} />
        <path d="M352 132 L357 137 L365 127" className={s.chk} />
      </M>
    </svg>
  );
}

/* 5. Ya pasó por esto: el Ávila, un sendero y dos personas corriendo; una se voltea. */
function Corredor({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle cx={3} cy={-26} r={5} />
      <path d="M1 -20 L-2 -6 M1 -17 L10 -13 M1 -17 L-7 -14 M-2 -6 L6 2 L4 10 M-2 -6 L-9 1 L-14 -1" />
    </g>
  );
}

export function YaPaso({ d, a }: Escena) {
  const sendero = "M48 264 C120 262 168 246 150 220 C132 196 190 190 214 170 C238 150 214 124 246 108 C260 100 268 94 276 80";
  return (
    <svg className={s.ilus} viewBox="0 0 400 300" role="img" aria-label="Dos personas corren por el Ávila; la que va adelante se voltea a esperar a la otra">
      <T v={d} de={0} a={0.5} d="M8 240 C50 236 70 200 104 164 C124 142 142 116 164 122 C186 128 190 160 208 166 C232 174 244 120 262 92 C272 76 290 72 302 90 C326 128 352 214 392 240" />
      <T v={d} de={0.35} a={0.65} d="M16 276 H384" />
      <Punteada v={d} de={0.4} a={0.95} className={s.ac} d={sendero} />
      <T v={d} de={0.7} a={0.9} d="M280 82 V46" />
      <M v={d} t={[0.55, 0.8]} o={[0, 1]}>
        <M v={a} t={[0.1, 0.8]} x={[0, 20]} y={[0, -12]}>
          <Corredor x={150} y={222} />
        </M>
      </M>
      <M v={d} t={[0.6, 0.85]} o={[0, 1]}>
        <M v={a} t={[0.1, 0.5]} sx={[1, -1]}>
          <Corredor x={244} y={112} />
        </M>
      </M>
      <M v={a} t={[0.5, 0.7]} o={[0, 1]} x={[6, 0]} className={s.ac}>
        <path d="M222 86 Q216 92 222 98 M214 82 Q205 92 214 102" />
      </M>
      <M v={a} t={[0.7, 0.9]} o={[0, 1]} s={[0.2, 1]}>
        <path d="M280 46 L304 54 L280 62 Z" className={`${s.ac} ${s.rel}`} />
      </M>
    </svg>
  );
}

/* 6. Mentor: una brújula cuya aguja oscila y se asienta; dos sillas y una mesa chica. */
export function Mentor({ d, a }: Escena) {
  return (
    <svg className={s.ilus} viewBox="0 0 400 300" role="img" aria-label="Una brújula cuya aguja se asienta señalando el rumbo, entre dos sillas y una mesa">
      <T v={d} de={0} a={0.4} tag="circle" cx={200} cy={120} r={78} />
      <T v={d} de={0.15} a={0.5} tag="circle" cx={200} cy={120} r={64} opacity={0.5} />
      <T v={d} de={0.3} a={0.55} d="M200 42 V54 M200 186 V198 M122 120 H134 M266 120 H278" />
      <T v={d} de={0.4} a={0.6} d="M16 272 H384" />
      <T v={d} de={0.5} a={0.75} d="M168 238 H232 M176 238 V272 M224 238 V272" />
      <T v={d} de={0.55} a={0.85} d="M38 188 V272 M38 238 H86 M86 238 V272" />
      <T v={d} de={0.6} a={0.9} d="M362 188 V272 M362 238 H314 M314 238 V272" />
      <M v={a} t={[0, 0.18, 0.36, 0.54, 0.72, 0.88, 1]} r={[-80, 58, -42, 26, -12, 4, 0]}>
        <T v={d} de={0.6} a={1} className={`${s.ac} ${s.relS}`} d="M200 62 L212 120 L188 120 Z" />
        <T v={d} de={0.6} a={1} d="M188 120 L212 120 L200 178 Z" />
        <T v={d} de={0.8} a={1} tag="circle" cx={200} cy={120} r={4} />
      </M>
      <M v={a} t={[0.78, 1]} o={[0, 1]} s={[0.6, 1]}>
        <circle cx={200} cy={68} r={9} className={s.rel} />
        <path d="M200 30 V18 M178 38 L171 29 M222 38 L229 29" className={s.ac} />
      </M>
    </svg>
  );
}
