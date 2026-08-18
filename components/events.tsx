import Link from "next/link";

import { site } from "@/lib/site";

export function Events() {
  return (
    <section id="eventos" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            Agenda
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
            Próximos y pasados eventos
          </h2>
          <p className="mt-3 max-w-xl text-white/60">
            La fuente de verdad es Luma: registro, aprobación y tickets viven ahí. Cupos
            limitados.
          </p>
        </div>
        <Link
          href={site.lumaCalendarUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-teal-300 hover:text-teal-200"
        >
          Abrir calendario en Luma →
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">
        <iframe
          src={site.lumaEmbedUrl}
          title="Calendario Caracas Tech Meetup"
          className="h-[640px] w-full"
          allow="fullscreen"
        />
      </div>
    </section>
  );
}
