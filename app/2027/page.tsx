import type { Metadata } from "next";
import { Kalam } from "next/font/google";

import { Formatos2027 } from "@/components/2027/formatos-2027";
import styles from "@/components/2027/estilos.module.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

const kalam = Kalam({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
});

const descripcion =
  "Seis formatos del Caracas Tech Meetup para 2027. Voltea cada tarjeta y dinos cuáles te interesan.";

export const metadata: Metadata = {
  title: "2027",
  description: descripcion,
  openGraph: {
    title: "En 2027 nos vemos de seis maneras",
    description: descripcion,
    url: "/2027",
    siteName: site.name,
    locale: "es_VE",
    type: "website",
  },
};

// Sin JavaScript no hay giro, barra ni animaciones: frente y dorso quedan uno debajo del otro
// y todo el texto se lee completo.
const sinJs = `
.${styles.fc}{aspect-ratio:auto!important;transform:none!important;opacity:1!important}
.${styles.inclina},.${styles.gira}{position:relative!important;transform:none!important}
.${styles.cara}{position:relative!important;backface-visibility:visible!important;-webkit-backface-visibility:visible!important;transform:none!important}
.${styles.frente}{height:300px}
.${styles.dorso}{min-height:340px}
.${styles.fila},.${styles.dato},.${styles.l}{opacity:1!important;transform:none!important;translate:none!important}
.${styles.acciones},.${styles.pista},.${styles.barra},.${styles.progreso},.${styles.luz},.${styles.desplaza}{display:none!important}
`;

export default function Pagina2027() {
  return (
    <>
      <SiteHeader />
      <div className={`${kalam.variable} ${styles.pagina}`} data-pagina>
        <Formatos2027 />
      </div>
      <noscript>
        <style>{sinJs}</style>
      </noscript>
      <SiteFooter />
    </>
  );
}
