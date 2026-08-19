"use client";

import { useState } from "react";
import Link from "next/link";

import { SponsorForm } from "@/components/sponsor-form";
import { MagicCard } from "@/components/ui/magic-card";
import { packagePromise, packages, resourceExamples, resourceHub, type PackageId } from "@/lib/site";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Packages() {
  const [selected, setSelected] = useState<PackageId>("recurso");

  return (
    <section id="paquetes" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          Patrocinio
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
          Presencia cada mes. El escenario, de vez en cuando.
        </h2>
        <p className="mt-4 text-white/60">
          Banco Activo e Impulsa VC presentan el meetup. Ese lockup no está a la venta.
          Flyers, evento y un QR de recursos gratis son el valor mensual. Uno o dos
          anuncios de cinco minutos por edición, rotados. Completa el formulario y
          Nicolas te escribe.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        {packagePromise.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left"
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-teal-300/80 uppercase">
              {item.title}
            </p>
            <p className="mt-2 text-sm text-white/65">{item.body}</p>
          </article>
        ))}
      </div>
      <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
        {resourceExamples.map((example) => (
          <li
            key={example}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/65"
          >
            {example}
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-white/45">
        El QR del evento abre{" "}
        <Link href={resourceHub.path} className="text-teal-300/80 underline-offset-4 hover:underline">
          ccstechmeetup.com{resourceHub.path}
        </Link>
        .
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg) => {
          const isSelected = selected === pkg.id;
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelected(pkg.id)}
              className="text-left"
            >
              <MagicCard
                className={`relative h-full rounded-2xl border p-6 ${
                  pkg.featured
                    ? "border-teal-300/40 bg-teal-400/5"
                    : "border-white/10 bg-white/[0.03]"
                } ${isSelected ? "ring-2 ring-teal-300/70" : ""}`}
                gradientFrom="#46C536"
                gradientTo="#74d468"
              >
                <p className="text-sm font-medium text-teal-300">{pkg.name}</p>
                <p className="mt-3 font-heading text-4xl font-semibold text-white">
                  {formatPrice(pkg.price)}
                  <span className="text-base font-normal text-white/50">{pkg.period}</span>
                </p>
                <p className="mt-3 text-sm text-white/60">{pkg.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-white/75">
                  {pkg.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </MagicCard>
            </button>
          );
        })}
      </div>
      <div className="mt-14">
        <SponsorForm selectedPackage={selected} onPackageChange={setSelected} />
      </div>
    </section>
  );
}
