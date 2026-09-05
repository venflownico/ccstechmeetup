import type { Metadata } from "next";

import { Packages } from "@/components/packages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SponsorFit } from "@/components/sponsor-fit";
import { SponsorWhy } from "@/components/sponsor-why";
import { Sponsors } from "@/components/sponsors";
import { site, sponsorshipWindow } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patrocinar",
  description: `Patrocinio anual para ${site.name}. Compromisos de 12 meses: dos cupos Recurso y dos Comunidad. Ventana abierta hasta el ${sponsorshipWindow.deadlineLabelLong}.`,
};

export default function PatrocinarPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <section className="mx-auto max-w-3xl px-4 pt-20 pb-14 text-center sm:px-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            Espacios de patrocinio para marcas
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold text-white sm:text-6xl">
            Patrocina el meetup
          </h1>
          <p className="mt-5 text-lg text-white/65">
            Compromisos de un año. Cierra tu cupo anual antes del 31 de Octubre, 2026.
          </p>
        </section>
        <Sponsors compact />
        <SponsorFit />
        <SponsorWhy />
        <Packages />
      </main>
      <SiteFooter />
    </>
  );
}
