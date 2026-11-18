import type { Metadata } from "next";

import { Packages } from "@/components/packages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SponsorFit } from "@/components/sponsor-fit";
import { SponsorWhy } from "@/components/sponsor-why";
import { Sponsors } from "@/components/sponsors";

export const metadata: Metadata = {
  title: "Patrocinar",
  description:
    "Patrocina el Caracas Tech Meetup en 2027: dos planes por un año frente a founders, inversionistas y quienes construyen startups en Caracas.",
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
            Compromisos de un año con cuota domiciliada.
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
