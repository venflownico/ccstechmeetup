import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/ui/marquee";
import {
  lockupPlanOrder,
  paidSponsorsByPlan,
  paidSponsorSlots,
  presentingSponsors,
  sponsorshipIntakeOpen,
  supporters,
} from "@/lib/site";

type Marca = { name: string; src: string; href?: string };

/** Si la marca tiene sitio (o Instagram), el logo lleva a él en otra pestaña. */
function Enlace({ name, href, className, children }: Omit<Marca, "src"> & { className: string; children: React.ReactNode }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} (abre su sitio en otra pestaña)`}
      className={`${className} rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300`}
    >
      {children}
    </a>
  );
}

function Logo({ name, src, href, tall }: Marca & { tall?: boolean }) {
  return (
    <Enlace name={name} href={href} className="flex h-16 items-center justify-center px-6">
      <Image
        src={src}
        alt={name}
        width={tall ? 72 : 140}
        height={40}
        className="h-10 w-auto max-w-[160px] object-contain opacity-80 transition hover:opacity-100"
      />
    </Enlace>
  );
}

export function Sponsors({ compact = false }: { compact?: boolean }) {
  const first = supporters.slice(0, Math.ceil(supporters.length / 2));
  const second = supporters.slice(Math.ceil(supporters.length / 2));
  const paidLogos = lockupPlanOrder.flatMap((id) => paidSponsorsByPlan[id]);

  const wall = (fade: string) => (
    <div className={`relative ${compact ? "mt-2" : "mt-6"}`}>
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
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r ${fade}`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l ${fade}`} />
    </div>
  );

  // En /patrocinar solo va el muro de quienes han apoyado, sin destacar a ningún patrocinador pagado.
  if (compact) {
    return <section>{wall("from-[#050b12]")}</section>;
  }

  return (
    <section id="sponsors" className="py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          Comunidad
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
          Quienes lo hacen posible
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/60">
          Banco Activo e Impulsa VC presentan. Empresas, universidades y aliados del
          ecosistema acompañan cada edición.
        </p>
        {sponsorshipIntakeOpen ? (
          <Link
            href="/patrocinar"
            className="mt-5 inline-block text-sm font-medium text-teal-300 hover:text-teal-200"
          >
            Conoce cómo patrocinar
          </Link>
        ) : null}
      </div>
      <div className="mx-auto mt-12 max-w-6xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold tracking-[0.22em] text-white/40 uppercase">
          Presentan
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-10 sm:gap-14">
          {presentingSponsors.map((sponsor: Marca) => (
            <Enlace key={sponsor.name} name={sponsor.name} href={sponsor.href} className="inline-flex">
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={240}
                height={80}
                className="h-16 w-auto object-contain sm:h-[4.5rem]"
              />
            </Enlace>
          ))}
        </div>
        {paidLogos.length > 0 ? (
          <>
            <p className="mt-14 text-xs font-semibold tracking-[0.22em] text-white/40 uppercase">
              {paidSponsorSlots.label}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {paidLogos.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="flex h-24 w-48 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4"
                >
                  <Image
                    src={sponsor.src}
                    alt={sponsor.name}
                    width={160}
                    height={48}
                    className="h-10 w-auto max-w-[150px] object-contain"
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
        <p className="mt-14 text-xs font-semibold tracking-[0.22em] text-white/40 uppercase">
          Acompañan
        </p>
      </div>
      {wall("from-[#070b14]")}
    </section>
  );
}
