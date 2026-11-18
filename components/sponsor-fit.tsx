import { Award, Handshake, UserSearch } from "lucide-react";

import s from "@/components/patrocinar/estilos.module.css";
import { Revela, Titulo } from "@/components/patrocinar/movimiento";

const GANAS = [
  {
    Icono: Handshake,
    nombre: "Clientes",
    cifra: "743",
    dato: "founders y CEOs",
    texto: "Tu oferta para ellos va en el QR de cada noche.",
  },
  {
    Icono: UserSearch,
    nombre: "Talento",
    cifra: "1 de 6",
    dato: "trabaja en una startup",
    texto: "Tu equipo entra con entradas reservadas, aunque no haya cupo.",
  },
  {
    Icono: Award,
    nombre: "Marca",
    cifra: "135",
    dato: "fondos, ángeles y aceleradoras",
    texto: "Tu marca en cada edición, frente a quienes invierten.",
  },
] as const;

export function SponsorFit() {
  return (
    <section className={s.seccion} aria-labelledby="t-ganas">
      <div className={s.envoltura}>
        <Titulo id="t-ganas" className={s.h2} texto="Qué gana tu empresa" />
        <ul className={s.ganas}>
          {GANAS.map(({ Icono, nombre, cifra, dato, texto }, i) => (
            <Revela as="li" key={nombre} paso={i} className={s.gana}>
              <span className={s.ganaIcono} aria-hidden="true">
                <Icono strokeWidth={1.75} />
              </span>
              <h3 className={s.ganaNombre}>{nombre}</h3>
              <p className={s.ganaCifra}>{cifra}</p>
              <p className={s.ganaDato}>{dato}</p>
              <p className={s.ganaTexto}>{texto}</p>
            </Revela>
          ))}
        </ul>
      </div>
    </section>
  );
}
