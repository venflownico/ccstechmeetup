"use client";

import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { site, sponsorshipIntakeOpen } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[92vh] items-center pt-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,11,20,0.55)_0%,rgba(7,11,20,0.2)_45%,transparent_70%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <p className="mb-6 max-w-3xl text-xs font-semibold tracking-[0.22em] text-white/90 uppercase [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]">
          Ecosistema Startup Venezuela, Impulsa VC, y Banco Activo presentan
        </p>
        <h1 className="flex w-full justify-center">
          <BrandMark size="hero" align="center" />
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-white sm:text-xl">
          <AnimatedGradientText colorFrom="#7dff6c" colorTo="#b6ff9a">
            {site.tagline}
          </AnimatedGradientText>
        </p>
        <p className="mt-4 max-w-xl text-base text-white/90 [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]">
          El after office mensual de founders, builders e inversionistas en Caracas. Informal,
          con cupos limitados, y hecho por gente que emprende en el país.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <ShimmerButton
            background="rgba(70, 197, 54, 0.95)"
            shimmerColor="#f0fdf4"
            className="px-7 py-3 text-slate-950 shadow-lg"
            onClick={() =>
              document.getElementById("eventos")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver próximos eventos
          </ShimmerButton>
          <Link
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center rounded-full border border-white/45 bg-black/25 px-6 text-sm font-medium text-white transition hover:border-teal-300/70 hover:bg-black/40 hover:text-white"
          >
            Seguir en Instagram
          </Link>
        </div>
        {sponsorshipIntakeOpen ? (
          <p className="mt-6 text-sm text-white/80 [text-shadow:0_2px_18px_rgba(0,0,0,0.7)]">
            ¿Eres una marca?{" "}
            <Link href="/patrocinar" className="text-white underline-offset-4 hover:text-teal-300 hover:underline">
              Patrocina el meetup
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
