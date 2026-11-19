import { Compass, Landmark, Layers, UsersRound } from "lucide-react";

import { sponsorFit } from "@/lib/site";

import s from "./estilos.module.css";
import { Revela, Titulo } from "./movimiento";

export const ICONOS_PILARES = [Landmark, UsersRound, Layers, Compass] as const;

export function Porque() {
  return (
    <section className={s.seccion} aria-labelledby="t-porque">
      <div className={s.envoltura}>
        <Titulo id="t-porque" className={`${s.h2} ${s.h2Ancho}`} texto={sponsorFit.title} />
        <p className={s.sub}>{sponsorFit.lead}</p>
        <p className={s.etiquetaLista}>
          <strong>{sponsorFit.impactLabel}</strong> {sponsorFit.impact}
        </p>
        <p className={s.etiquetaLista}>{sponsorFit.pillarsLabel}</p>
        <ul className={s.pilares}>
          {sponsorFit.pillars.map((nombre, i) => {
            const Icono = ICONOS_PILARES[i];
            return (
              <Revela as="li" key={nombre} paso={i} className={s.pilar}>
                <span className={s.filaIcono} aria-hidden="true">
                  <Icono strokeWidth={1.75} />
                </span>
                <h3 className={s.pilarNombre}>{nombre}</h3>
              </Revela>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
