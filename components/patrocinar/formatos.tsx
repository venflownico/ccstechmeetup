import { CircleCheck, Hourglass } from "lucide-react";

import { Foto } from "@/components/2027/foto";
import { ICONOS_FORMATO } from "@/components/2027/iconos";
import { CUENTA_PALABRA, FORMATOS } from "@/components/2027/tipos";
import type { Estilo } from "@/components/2027/tipos";
import { LogotipoFormato } from "@/components/logotipo-formato";

import s from "./estilos.module.css";
import { Revela, Titulo } from "./movimiento";

/** Textos de la historia de patrocinio 2027, por formato. */
const TEXTO: Record<string, { nombre: string; que: string }> = {
  meetup: { nombre: "Meetup", que: "Tercer jueves de cada mes, 5:30 p. m., en Chapeau House. +250 personas por edición." },
  dinner: { nombre: "Dinner", que: "Cenas pequeñas entre founders e inversionistas." },
  hackathon: { nombre: "Hackathon", que: "Un fin de semana construyendo." },
  "demo-day": { nombre: "Demo Day", que: "Startups presentan frente a inversionistas." },
  wellness: { nombre: "Wellness", que: "Carreras y deporte entre founders." },
};

const ESTADO = {
  confirmado: { texto: "Confirmado", Icono: CircleCheck },
  "en-camino": { texto: "En camino", Icono: Hourglass },
} as const;

// Confirmados primero; dentro de cada grupo se respeta el orden de `formatos2027`.
const LISTA = [
  ...FORMATOS.filter((f) => f.estado === "confirmado"),
  ...FORMATOS.filter((f) => f.estado !== "confirmado"),
];

export function Formatos() {
  return (
    <section className={s.seccion} aria-labelledby="t-formatos">
      <div className={s.envoltura}>
        <Titulo id="t-formatos" className={`${s.h2} ${s.h2Ancho}`} texto={`En 2027, Caracas Tech tiene ${CUENTA_PALABRA} formatos.`} />
        <p className={s.sub}>
          El meetup fue el primero. En 2027 se suman más formatos para que nazcan más startups, y cada uno
          tendrá su propia propuesta de patrocinio.
        </p>
        <ul className={s.minis}>
          {LISTA.map((f, i) => {
            const Icono = ICONOS_FORMATO[f.icono];
            const estado = ESTADO[f.estado];
            const EstadoIcono = estado.Icono;
            const texto = TEXTO[f.id] ?? { nombre: f.palabra, que: f.que };
            return (
              <Revela as="li" key={f.id} paso={i % 3} className={s.mini}>
                <div className={s.miniCaja} style={{ "--c": f.c, "--cl": f.cl } as Estilo}>
                  <Foto src={f.foto} alt="" foco={f.foco} sizes="(min-width: 1120px) 352px, (min-width: 720px) 33vw, 50vw" clase={s.fotoMini} />
                  <div className={s.veloMini} aria-hidden="true" />
                  <span className={s.miniEstado}>
                    <EstadoIcono strokeWidth={2} aria-hidden="true" />
                    {estado.texto}
                  </span>
                  <span className={s.miniIcono} aria-hidden="true">
                    <Icono strokeWidth={1.75} />
                  </span>
                  <div className={s.miniLogo} aria-hidden="true">
                    <LogotipoFormato palabra={f.palabra} color="var(--cl)" viewBox={f.viewBox} />
                  </div>
                </div>
                <h3 className={s.miniNombre}>{texto.nombre}</h3>
                <p className={s.miniQue}>{texto.que}</p>
              </Revela>
            );
          })}
        </ul>
        <p className={s.nota}>
          «Confirmado» va seguro en 2027. «En camino» se está organizando. Las fechas de los demás formatos se anuncian durante el año. Las imágenes de Dinner, Hackathon, Demo Day
          y Wellness son ilustrativas, generadas con IA.
        </p>
      </div>
    </section>
  );
}
