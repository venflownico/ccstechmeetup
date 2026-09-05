"use client";

import { useState } from "react";

import { Faq } from "@/components/faq";
import { SponsorForm } from "@/components/sponsor-form";
import {
  packagePitch,
  packagePromise,
  packages,
  resourceExamples,
  sponsorFaqs,
  type PackageId,
} from "@/lib/site";

export function Packages() {
  const [selected, setSelected] = useState<PackageId>("recurso");

  return (
    <section id="paquetes" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          {packagePitch.eyebrow}
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
          {packagePitch.title}
        </h2>
        <p className="mt-5 text-lg text-white/65">{packagePitch.lead}</p>
      </div>
      <p className="mx-auto mt-10 text-center text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">
        {packagePitch.includedLabel}
      </p>
      <div className="mx-auto mt-4 grid max-w-4xl gap-4 sm:grid-cols-3">
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
      <h3 className="mt-16 text-center font-heading text-2xl font-semibold text-white sm:text-3xl">
        Nuestros Planes
      </h3>
      <p className="mt-3 text-center text-sm text-white/55">{packagePitch.commitmentNote}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg) => {
          const isTaken = !pkg.available;
          const isSelected = pkg.available && selected === pkg.id;
          const cardClass = `relative h-full rounded-2xl border p-6 text-left ${
            isTaken
              ? "cursor-not-allowed border-white/10 bg-white/[0.02] opacity-55"
              : pkg.featured
                ? "border-teal-300/40 bg-teal-400/5"
                : "border-white/10 bg-white/[0.03]"
          } ${isSelected ? "ring-2 ring-teal-300/70" : ""}`;

          const body = (
            <>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-teal-300">{pkg.name}</p>
                {isTaken && "takenLabel" in pkg ? (
                  <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">
                    {pkg.takenLabel}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-xs text-white/40">Acuerdo a 1 año · cuota domiciliada</p>
              <p className="mt-3 text-sm text-white/60">{pkg.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/75">
                {pkg.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-300" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </>
          );

          if (isTaken) {
            return (
              <article key={pkg.id} className={cardClass} aria-disabled="true">
                {body}
              </article>
            );
          }

          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelected(pkg.id)}
              className={cardClass}
            >
              {body}
            </button>
          );
        })}
      </div>
      <div className="mx-auto mt-16 max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-white/40 uppercase">
          {packagePitch.fitLabel}
        </p>
        <p className="mt-3 text-sm text-white/55">{packagePitch.fitLead}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {resourceExamples.map((example) => (
            <li
              key={example}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/65"
            >
              {example}
            </li>
          ))}
        </ul>
      </div>
      <Faq items={sponsorFaqs} title="Preguntas de patrocinio" compact />
      <div className="mt-14">
        <SponsorForm selectedPackage={selected} onPackageChange={setSelected} />
      </div>
    </section>
  );
}
