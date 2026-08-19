import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/ui/marquee";
import { presentingSponsors, supporters } from "@/lib/site";

function Logo({ name, src, tall }: { name: string; src: string; tall?: boolean }) {
  return (
    <div className="flex h-16 items-center justify-center px-6">
      <Image
        src={src}
        alt={name}
        width={tall ? 72 : 140}
        height={40}
        className="h-10 w-auto max-w-[160px] object-contain opacity-80 transition hover:opacity-100"
      />
    </div>
  );
}

export function Sponsors({ compact = false }: { compact?: boolean }) {
  const first = supporters.slice(0, Math.ceil(supporters.length / 2));
  const second = supporters.slice(Math.ceil(supporters.length / 2));

  return (
    <section id={compact ? undefined : "sponsors"} className={compact ? "pb-16" : "py-24"}>
      {!compact ? (
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            Comunidad
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
            Quienes lo hacen posible
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Banco Activo e Impulsa VC presentan el meetup. Empresas, universidades y aliados del
            ecosistema acompañan cada edición.
          </p>
          <Link
            href="/patrocinar"
            className="mt-5 inline-block text-sm font-medium text-teal-300 hover:text-teal-200"
          >
            Conoce cómo patrocinar →
          </Link>
        </div>
      ) : null}
      <div className={`mx-auto max-w-6xl px-4 text-center sm:px-6 ${compact ? "" : "mt-12"}`}>
        <p className="text-xs font-semibold tracking-[0.22em] text-white/40 uppercase">
          Presentan
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {presentingSponsors.map((sponsor) => (
            <Image
              key={sponsor.name}
              src={sponsor.src}
              alt={sponsor.name}
              width={240}
              height={80}
              className="h-16 w-auto object-contain sm:h-[4.5rem]"
            />
          ))}
        </div>
        <p className="mt-14 text-xs font-semibold tracking-[0.22em] text-white/40 uppercase">
          Acompañan
        </p>
      </div>
      <div className="relative mt-6">
        <Marquee pauseOnHover className="[--duration:40s]">
          {first.map((sponsor) => (
            <Logo key={sponsor.name} {...sponsor} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {second.map((sponsor) => (
            <Logo key={sponsor.name} {...sponsor} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#070b14]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#070b14]" />
      </div>
    </section>
  );
}
