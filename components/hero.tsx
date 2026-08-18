"use client";

import Link from "next/link";

import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Particles } from "@/components/ui/particles";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-16"
    >
      <Particles
        className="absolute inset-0"
        quantity={90}
        color="#5eead4"
        ease={80}
        size={0.6}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(45,212,191,0.16),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <p className="mb-6 text-xs font-semibold tracking-[0.28em] text-white/55 uppercase">
          Ecosistema Startup Venezuela presenta
        </p>
        <h1 className="font-heading text-5xl leading-none font-semibold tracking-tight text-white sm:text-7xl md:text-8xl">
          CARACAS TECH
          <span className="mt-2 block font-[family-name:var(--font-caveat)] text-6xl font-normal text-teal-300 italic sm:text-8xl">
            meetup
          </span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-white/70 sm:text-xl">
          <AnimatedGradientText colorFrom="#5eead4" colorTo="#99f6e4">
            {site.tagline}
          </AnimatedGradientText>
        </p>
        <p className="mt-4 max-w-xl text-base text-white/60">
          El after office mensual de founders, builders e inversionistas en Caracas. Informal,
          con cupos limitados, y hecho por gente que emprende en el país.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <ShimmerButton
            background="rgba(45, 212, 191, 0.95)"
            shimmerColor="#ecfeff"
            className="px-7 py-3 text-slate-950 shadow-lg"
            onClick={() =>
              document.getElementById("eventos")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver próximos eventos
          </ShimmerButton>
          <Link
            href="#patrocinar"
            className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-sm font-medium text-white/85 transition hover:border-teal-300/50 hover:text-white"
          >
            Quiero patrocinar
          </Link>
        </div>
      </div>
    </section>
  );
}
