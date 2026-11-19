import { Sponsors } from "@/components/sponsors";

import s from "./estilos.module.css";
import { Titulo } from "./movimiento";

export function Apoyan() {
  return (
    <section className={s.seccion} aria-labelledby="t-apoyan">
      <div className={s.envoltura}>
        <Titulo id="t-apoyan" className={s.h2} texto="Quiénes han apoyado el meetup" />
        <p className={s.sub}>Startups, universidades y organizaciones que ya creyeron en esto.</p>
      </div>
      <div className={s.logos}>
        <Sponsors compact />
      </div>
    </section>
  );
}
