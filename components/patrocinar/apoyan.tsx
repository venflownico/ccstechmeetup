import { Sponsors } from "@/components/sponsors";

import s from "./estilos.module.css";
import { Titulo } from "./movimiento";

export function Apoyan() {
  return (
    <section className={s.seccion} aria-labelledby="t-apoyan">
      <div className={s.envoltura}>
        <Titulo id="t-apoyan" className={s.h2} texto="Ya apoyan el meetup" />
      </div>
      <div className={s.logos}>
        <Sponsors compact />
      </div>
    </section>
  );
}
