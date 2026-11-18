import Link from "next/link";

import s from "./boton-2027.module.css";

/** Botón llamativo de la portada que lleva al adelanto de 2027. */
export function Boton2027() {
  return (
    <Link href="/2027?o=portada-boton" className={s.boton} aria-label="Ver lo que viene en 2027">
      <span className={s.anio}>2027</span>
      <span className={s.ojos} aria-hidden="true">
        👀
      </span>
    </Link>
  );
}
