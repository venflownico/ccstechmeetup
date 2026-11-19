import s from "./estilos.module.css";
import { Revela, Titulo } from "./movimiento";

const TIPOS = [
  "Bancos",
  "Fondos",
  "Ángeles",
  "Aceleradoras",
  "HR",
  "Coworking",
  "Legal",
  "Pagos",
  "Infraestructura",
] as const;

export function Quien() {
  return (
    <section className={s.seccion} aria-labelledby="t-quien">
      <div className={s.envoltura}>
        <Titulo id="t-quien" className={s.h2} texto="No solo tech." />
        <p className={s.sub}>
          Bancos, fondos, ángeles, aceleradoras, HR, coworking, legal, pagos, infraestructura. Si ayudas a que una startup
          nazca o crezca, este es tu lugar.
        </p>
        <ul className={s.chips} aria-hidden="true">
          {TIPOS.map((t, i) => (
            <Revela as="li" key={t} paso={i % 4} className={s.chip}>
              {t}
            </Revela>
          ))}
        </ul>
      </div>
    </section>
  );
}
