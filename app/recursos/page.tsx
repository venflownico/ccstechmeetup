import type { Metadata } from "next";

import { ResourceCatalog } from "@/components/resource-catalog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { resourceHub, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recursos",
  description: `Recursos gratis para startups en ${site.name}. Aplica y el proveedor te responde.`,
};

export default function RecursosPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <section className="mx-auto max-w-6xl px-4 pt-16 pb-8 sm:px-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            {resourceHub.eyebrow}
          </p>
          <h1 className="font-heading mt-3 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
            {resourceHub.title}
          </h1>
          <p className="mt-4 max-w-2xl text-white/60">{resourceHub.lead}</p>
        </section>
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <ResourceCatalog />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
