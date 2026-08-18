"use client";

import { useState } from "react";

import { SponsorForm } from "@/components/sponsor-form";
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { packages, type PackageId } from "@/lib/site";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Packages() {
  const [selected, setSelected] = useState<PackageId>("destacado");

  return (
    <section id="patrocinar" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          Patrocinio
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
          Paquetes para estar en cada edición
        </h2>
        <p className="mt-4 text-white/60">
          Elige el nivel. Completa el formulario y Nicolas te escribe para cerrar el acuerdo.
          El Presentador es el paquete actual de Banco Activo ($2,000 / mes).
        </p>
      </div>
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
                gradientFrom="#5eead4"
                gradientTo="#2dd4bf"
              >
                {pkg.featured ? (
                  <ShineBorder shineColor={["#5eead4", "#99f6e4", "#2dd4bf"]} />
                ) : null}
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
