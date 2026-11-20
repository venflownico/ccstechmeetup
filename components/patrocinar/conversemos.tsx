import { CalendarCheck, FileDown } from "lucide-react";

import { SponsorForm } from "@/components/sponsor-form";
import { site, sponsorshipIntakeOpen } from "@/lib/site";

import { PDF_PROPUESTA } from "./entrada";
import s from "./estilos.module.css";
import { Titulo } from "./movimiento";

export function Conversemos() {
  if (!sponsorshipIntakeOpen) return null;
  return (
    <section id="formulario" className={s.seccion} aria-labelledby="t-formulario">
      <div className={s.envoltura}>
        <Titulo id="t-formulario" className={s.h2} texto="Conversemos" />
        <p className={s.sub}>Agenda una llamada de 30 minutos o déjanos tus datos y te escribimos.</p>
        <div className={s.botones}>
          <a className={s.primario} href={site.sponsorshipCalendlyUrl} target="_blank" rel="noopener noreferrer">
            <CalendarCheck strokeWidth={1.75} aria-hidden="true" />
            Agendar llamada
          </a>
          <a className={s.secundario} href={PDF_PROPUESTA} download>
            <FileDown strokeWidth={1.75} aria-hidden="true" />
            Descargar propuesta
          </a>
        </div>
        <div className={s.formulario}>
          <SponsorForm />
        </div>
      </div>
    </section>
  );
}
