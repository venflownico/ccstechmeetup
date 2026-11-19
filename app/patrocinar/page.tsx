import type { Metadata } from "next";

import { Lenis2027 } from "@/components/2027/lenis";
import { Faq } from "@/components/faq";
import { Apoyan } from "@/components/patrocinar/apoyan";
import { Busca } from "@/components/patrocinar/busca";
import { Conversemos } from "@/components/patrocinar/conversemos";
import { Destino } from "@/components/patrocinar/destino";
import { Porque } from "@/components/patrocinar/porque";
import { Quien } from "@/components/patrocinar/quien";
import { Entrada } from "@/components/patrocinar/entrada";
import s from "@/components/patrocinar/estilos.module.css";
import { Formatos } from "@/components/patrocinar/formatos";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SponsorFit } from "@/components/sponsor-fit";
import { SponsorWhy } from "@/components/sponsor-why";
import { site, sponsorFaqs } from "@/lib/site";

const descripcion =
  "Patrocina Caracas Tech en 2027: cada mes, frente a quienes construyen las startups de Venezuela.";

export const metadata: Metadata = {
  title: { absolute: "Patrocina Caracas Tech" },
  description: descripcion,
  openGraph: {
    title: "Patrocina Caracas Tech",
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
            <Porque />
            <SponsorWhy>
              <Apoyan />
            </SponsorWhy>
            <Formatos />
            <SponsorFit />
            <Busca />
            <Destino />
            <Quien />
            <section className={`${s.seccion} ${s.faq}`}>
              <div className={s.envoltura}>
                <Faq items={sponsorFaqs} title="Preguntas frecuentes" compact />
              </div>
            </section>
            <Conversemos />
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
