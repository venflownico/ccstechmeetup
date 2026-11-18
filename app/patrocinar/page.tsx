import type { Metadata } from "next";

import { Lenis2027 } from "@/components/2027/lenis";
import { Faq } from "@/components/faq";
import { Packages } from "@/components/packages";
import { Apoyan } from "@/components/patrocinar/apoyan";
import { Destino } from "@/components/patrocinar/destino";
import { Entrada } from "@/components/patrocinar/entrada";
import s from "@/components/patrocinar/estilos.module.css";
import { Formatos } from "@/components/patrocinar/formatos";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SponsorFit } from "@/components/sponsor-fit";
import { SponsorWhy } from "@/components/sponsor-why";
import { site, sponsorFaqs } from "@/lib/site";

const descripcion =
  "Patrocina el Caracas Tech Meetup en 2027: dos planes por un año frente a founders, inversionistas y quienes construyen startups en Caracas.";

export const metadata: Metadata = {
  title: "Patrocinar",
  description: descripcion,
  openGraph: {
    title: "Patrocina el Caracas Tech Meetup",
    description: descripcion,
    url: "/patrocinar",
    siteName: site.name,
    locale: "es_VE",
    type: "website",
  },
};

// Sin JavaScript no hay entrada ligada al scroll ni letras tipeadas: todo el texto se lee completo.
const sinJs = `
.${s.revela}{opacity:1!important;transform:none!important}
`;

export default function PatrocinarPage() {
  return (
    <>
      <SiteHeader />
      <div className={s.pagina} data-pagina>
        <Lenis2027>
          <main className={s.principal}>
            <Entrada />
            <SponsorWhy />
            <Apoyan />
            <SponsorFit />
            <Formatos />
            <Destino />
            <Packages />
            <section className={`${s.seccion} ${s.faq}`}>
              <div className={s.envoltura}>
                <Faq items={sponsorFaqs} title="Preguntas frecuentes" compact />
              </div>
            </section>
          </main>
        </Lenis2027>
      </div>
      <noscript>
        <style>{sinJs}</style>
      </noscript>
      <SiteFooter />
    </>
  );
}
