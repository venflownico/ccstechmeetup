import { Sponsors } from "@/components/sponsors";
import { sponsorWhy } from "@/lib/site";

import s from "./estilos.module.css";

/** Parte del bloque de logros: el subtítulo y el carrusel de logos (no es una sección aparte). */
export function Apoyan() {
  return (
    <>
      <div className={s.envoltura}>
        <h3 className={s.subLogos}>{sponsorWhy.logosTitle}</h3>
      </div>
      <div className={s.logos}>
        <Sponsors compact />
      </div>
    </>
  );
}
