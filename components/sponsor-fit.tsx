import { BookOpenCheck, Gift, MessagesSquare, Server } from "lucide-react";

import s from "@/components/patrocinar/estilos.module.css";
import { Revela, Titulo } from "@/components/patrocinar/movimiento";

const MANERAS = [
  { Icono: Gift, texto: "Recursos no reembolsables, como créditos o un premio." },
  { Icono: Server, texto: "Infraestructura: APIs, servidores, pagos." },
  { Icono: MessagesSquare, texto: "Mentoría u office hours." },
  { Icono: BookOpenCheck, texto: "Horas de asesoría legal, de mercadeo o de diseño." },
] as const;

export function SponsorFit() {
  return (
    <section className={s.seccion} aria-labelledby="t-ganas">
      <div className={s.envoltura}>
        <Titulo
          id="t-ganas"
          className={`${s.h2} ${s.h2Ancho}`}
          texto="Que la comunidad te vea como quien pone los rieles."
        />
        <div className={s.parrafos}>
          <p>Tu marca acompaña cada edición y cada formato, en flyers, sitio y evento.</p>
          <p>Lo que construyes es reconocimiento frente a founders, inversionistas y potenciales clientes.</p>
          <p>
            Los founders vienen a conectar con otros founders. Por eso no hay stands ni promotoras: venderles en la
            sala rompe la razón por la que vienen.
          </p>
        </div>
        <p className={s.etiquetaLista}>
          <strong>La condición:</strong> todo patrocinador le da algo a los founders, atado a uno de los cuatro
          pilares:
        </p>
        <ul className={s.maneras}>
          {MANERAS.map(({ Icono, texto }, i) => (
            <Revela as="li" key={texto} paso={i} className={s.manera}>
              <span className={s.filaIcono} aria-hidden="true">
                <Icono strokeWidth={1.75} />
              </span>
              <span>{texto}</span>
            </Revela>
          ))}
        </ul>
      </div>
    </section>
  );
}
