import { Building2, Camera, ClipboardCheck, MapPin, PiggyBank, UserRound } from "lucide-react";

import s from "./estilos.module.css";
import { Revela, Titulo } from "./movimiento";

const FILAS = [
  { Icono: UserRound, texto: "Una persona dedicada a organizar todos los formatos." },
  { Icono: Building2, texto: "Registrar la empresa y la marca, para firmar contigo y proteger tu patrocinio." },
  { Icono: Camera, texto: "Fotografía y redes de cada edición." },
  { Icono: MapPin, texto: "Venue: baños, valet parking y producción." },
  { Icono: ClipboardCheck, texto: "Ponernos al día con lo pendiente de este año." },
  { Icono: PiggyBank, texto: "Una reserva para ediciones más grandes." },
] as const;

export function Destino() {
  return (
    <section className={s.seccion} aria-labelledby="t-destino">
      <div className={s.envoltura}>
        <Titulo id="t-destino" className={s.h2} texto="Lo que tu aporte resuelve" />
        <p className={s.sub}>Varias de estas cosas también se pueden resolver en especie.</p>
        <ul className={s.filas}>
          {FILAS.map(({ Icono, texto }, i) => (
            <Revela as="li" key={texto} paso={i} className={s.fila}>
              <span className={s.filaIcono} aria-hidden="true">
                <Icono strokeWidth={1.75} />
              </span>
              <p className={s.filaTitulo}>{texto}</p>
            </Revela>
          ))}
        </ul>
      </div>
    </section>
  );
}
