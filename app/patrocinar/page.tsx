import type { Metadata } from "next";

import { Faq } from "@/components/faq";
import { Packages } from "@/components/packages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SponsorFit } from "@/components/sponsor-fit";
import { SponsorGrowth } from "@/components/sponsor-growth";
import { Sponsors } from "@/components/sponsors";
import { site, sponsorFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patrocinar",
  description: `Patrocinio para ${site.name}. Buscamos aliados que desbloqueen capital, talento, recursos y mentoría para founders.`,
};

export default function PatrocinarPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <section className="mx-auto max-w-3xl px-4 pt-20 pb-14 text-center sm:px-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            Para marcas
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold text-white sm:text-6xl">
            Patrocina el meetup
          </h1>
          <p className="mt-5 text-lg text-white/65">
            Cada mes reunimos a founders, builders e inversionistas en Caracas. Buscamos
            aliados que desbloqueen capital, talento, recursos y mentoría.
          </p>
        </section>
        <Sponsors compact />
        <SponsorFit />
        <SponsorGrowth />
        <Packages />
        <Faq items={sponsorFaqs} title="Preguntas de patrocinio" />
      </main>
      <SiteFooter />
    </>
  );
}
