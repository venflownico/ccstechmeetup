import s from "./estilos.module.css";
import { Titulo } from "./movimiento";

export function Quien() {
  return (
    <section className={s.seccion} aria-labelledby="t-quien">
      <div className={s.envoltura}>
        <Titulo id="t-quien" className={s.h2} texto="No solo tech." />
        <p className={s.sub}>
          Bancos, fondos, ángeles, aceleradoras, HR, coworking, legal, pagos, infraestructura. Si ayudas a que una startup
          nazca o crezca, este es tu lugar.
        </p>
      </div>
    </section>
  );
}
