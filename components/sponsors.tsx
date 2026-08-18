import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";
import { presentingSponsors, sponsors } from "@/lib/site";

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

export function Sponsors() {
  const first = sponsors.slice(0, Math.ceil(sponsors.length / 2));
  const second = sponsors.slice(Math.ceil(sponsors.length / 2));

  return (
    <section id="sponsors" className="py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          Patrocinadores
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
          Marcas que ya están en la mesa
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          Banco Activo e Impulsa VC presentan el meetup. Estas empresas y universidades han
          acompañado ediciones actuales y pasadas.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
          {presentingSponsors.map((sponsor) => (
            <Image
              key={sponsor.name}
              src={sponsor.src}
              alt={sponsor.name}
              width={220}
              height={72}
              className="h-14 w-auto object-contain"
            />
          ))}
        </div>
      </div>
      <div className="relative mt-12">
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
