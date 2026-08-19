"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { site } from "@/lib/site";

export function StayInTheKnow() {
  return (
    <section id="instagram" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-teal-300/20 bg-[linear-gradient(160deg,rgba(70,197,54,0.14),rgba(7,11,20,0.4)_45%,rgba(15,23,42,0.8))] px-6 py-14 text-center sm:px-12">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          Entérate del próximo
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
          Quédate en el loop
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/65">
          Cuando publicamos la siguiente edición, Instagram es el primer lugar. Síguenos
          y no te pierdas el anuncio, las fotos ni a quién se suma la comunidad.
        </p>
        <p className="mt-10 font-heading text-6xl font-semibold text-teal-300 sm:text-7xl">
          <NumberTicker
            value={site.instagramFollowersK}
            decimalPlaces={1}
            className="text-teal-300"
          />
          k+
        </p>
        <p className="mt-2 text-sm text-white/55">
          seguidores en {site.instagramHandle}
        </p>
        <div className="mt-8 flex justify-center">
          <ShimmerButton
            background="rgba(70, 197, 54, 0.95)"
            shimmerColor="#f0fdf4"
            className="inline-flex items-center gap-2 px-7 py-3 text-slate-950 shadow-lg"
            onClick={() => window.open(site.instagram, "_blank", "noopener,noreferrer")}
          >
            <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.88a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25Z" />
            </svg>
            Seguir en Instagram
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
