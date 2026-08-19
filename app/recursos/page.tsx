import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { resourceHub, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recursos",
  description: `Recursos gratis para startups en ${site.name}: créditos, capacidad, pagos y lo que los aliados ponen para que escales.`,
};

export default function RecursosPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-16">
        <section className="mx-auto max-w-3xl px-4 pt-20 pb-10 text-center sm:px-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            {resourceHub.eyebrow}
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold text-white sm:text-6xl">
            {resourceHub.title}
          </h1>
          <p className="mt-5 text-lg text-white/65">{resourceHub.lead}</p>
        </section>
        <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {resourceHub.categories.map((category) => (
              <article
                key={category.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h2 className="font-heading text-xl font-semibold text-white">{category.title}</h2>
                <p className="mt-2 text-sm text-white/65">{category.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-white/50">
            Los grants activos de cada aliado se publican aquí a medida que cierran. Si tu marca
            puede poner un recurso acotado,{" "}
            <Link href="/patrocinar" className="text-teal-300 underline-offset-4 hover:underline">
              conversamos en Patrocinar
            </Link>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
