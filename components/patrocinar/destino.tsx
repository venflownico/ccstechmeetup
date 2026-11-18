import { Building2, MapPin, UsersRound } from "lucide-react";

import s from "./estilos.module.css";
import { Revela, Titulo } from "./movimiento";

const FILAS = [
  {
    Icono: MapPin,
    titulo: "La noche del meetup",
    detalle: "Lugar y producción, valet parking, fotógrafo y baños",
  },
  {
    Icono: UsersRound,
    titulo: "Una persona a tiempo completo",
    detalle: "Sueldo, coworking y estacionamiento",
  },
  {
    Icono: Building2,
    titulo: "Estructura",
    detalle: "Registro de la empresa y la marca, dominio, correo y redes",
  },
] as const;

export function Destino() {
  return (
    <section className={s.seccion} aria-labelledby="t-destino">
      <div className={s.envoltura}>
        <Titulo id="t-destino" className={s.h2} texto="A dónde va tu aporte" />
        <p className={s.sub}>Primero, a sostener el meetup cada mes.</p>
        <ul className={s.filas}>
          {FILAS.map(({ Icono, titulo, detalle }, i) => (
            <Revela as="li" key={titulo} paso={i} className={s.fila}>
              <span className={s.filaIcono} aria-hidden="true">
                <Icono strokeWidth={1.75} />
              </span>
              <div>
                <h3 className={s.filaTitulo}>{titulo}</h3>
                <p className={s.filaDetalle}>{detalle}</p>
              </div>
            </Revela>
          ))}
        </ul>
      </div>
    </section>
  );
}
