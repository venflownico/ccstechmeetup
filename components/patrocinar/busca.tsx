import { Handshake, Layers } from "lucide-react";

import s from "./estilos.module.css";
import { Revela, Titulo } from "./movimiento";

const FASES = [
  {
    Icono: Handshake,
    fase: "Fase 1",
    titulo: "Patrocinadores principales",
    texto: "4 a 6 marcas presentes en todos los formatos del año. Su aporte sostiene la operación de Caracas Tech.",
  },
  {
    Icono: Layers,
    fase: "Fase 2",
    titulo: "Patrocinadores por formato",
    texto:
      "2 o 3 marcas por formato, que encajen con ese evento. Cubren los gastos de esa edición. Los patrocinadores principales siempre van primero.",
  },
] as const;

export function Busca() {
  return (
    <section className={s.seccion} aria-labelledby="t-busca">
      <div className={s.envoltura}>
        <Titulo
          id="t-busca"
          className={`${s.h2} ${s.h2Ancho}`}
          texto="Buscamos desde $5.000 al mes entre 4 y 6 patrocinadores principales."
        />
        <ol className={s.fases}>
          {FASES.map(({ Icono, fase, titulo, texto }, i) => (
            <Revela as="li" key={fase} paso={i} className={s.faseCaja}>
              <span className={s.filaIcono} aria-hidden="true">
                <Icono strokeWidth={1.75} />
              </span>
              <p className={s.faseEtiqueta}>{fase}</p>
              <h3 className={s.faseTitulo}>{titulo}</h3>
              <p className={s.faseTexto}>{texto}</p>
            </Revela>
          ))}
        </ol>
      </div>
    </section>
  );
}
