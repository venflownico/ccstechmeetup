import Image from "next/image";
import Link from "next/link";

import { Marquee } from "@/components/ui/marquee";
import {
  lockupPlanOrder,
  packages,
  paidSponsorsByPlan,
  paidSponsorSlots,
  presentingSponsors,
  sponsorshipIntakeOpen,
  sponsorshipWindow,
  supporters,
  type PackageId,
} from "@/lib/site";

const lockupSize: Record<
  PackageId,
  { slot: string; logo: string; logoWidth: number; logoHeight: number }
> = {
  recurso: {
    slot: "h-[6.5rem] w-[14rem] sm:h-28 sm:w-60",
    logo: "h-12 w-auto max-w-[180px] object-contain sm:h-14 sm:max-w-[200px]",
    logoWidth: 200,
    logoHeight: 56,
  },
  comunidad: {
    slot: "h-[4.75rem] w-[10.5rem] sm:h-[5.25rem] sm:w-44",
    logo: "h-8 w-auto max-w-[130px] object-contain sm:h-9 sm:max-w-[140px]",
    logoWidth: 140,
    logoHeight: 36,
  },
};

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

function OpenSponsorSlot({
  href,
  sizeClass,
  index,
  total,
}: {
  href: string;
  sizeClass: string;
  index: number;
  total: number;
}) {
  const className = `flex ${sizeClass} flex-col items-center justify-center rounded-xl border border-dashed border-white/20 px-3 text-center transition hover:border-teal-300/50 hover:bg-white/[0.03]`;
  const content = (
    <>
      <span className="text-[11px] text-white/40">{paidSponsorSlots.emptyHint}</span>
      <span className="sr-only">
        Cupo disponible {index + 1} de {total}
      </span>
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function Sponsors({ compact = false }: { compact?: boolean }) {
  const first = supporters.slice(0, Math.ceil(supporters.length / 2));
  const second = supporters.slice(Math.ceil(supporters.length / 2));
  const slotHref = compact ? "#paquetes" : "/patrocinar#paquetes";
  const lockupPlans = lockupPlanOrder.map((id) => {
    const pkg = packages.find((item) => item.id === id);
    if (!pkg || !pkg.available) {
      throw new Error(`Missing lockup package: ${id}`);
    }
    return pkg;
  });

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
            Banco Activo e Impulsa VC presentan. Cuatro cupos de patrocinio por año. Ventana
            abierta hasta el {sponsorshipWindow.deadlineLabelLong}. Empresas, universidades y
            aliados del ecosistema acompañan cada edición.
          </p>
          {sponsorshipIntakeOpen ? (
            <Link
              href="/patrocinar"
              className="mt-5 inline-block text-sm font-medium text-teal-300 hover:text-teal-200"
            >
              Conoce cómo patrocinar →
            </Link>
          ) : null}
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
          {paidSponsorSlots.label}
        </p>
        <p className="mt-3 text-sm text-white/50">
          {sponsorshipIntakeOpen ? paidSponsorSlots.lead : paidSponsorSlots.closedLead}
        </p>
        <div className="mt-8 flex flex-col items-center gap-8">
          {lockupPlans.map((pkg) => {
            const filled = paidSponsorsByPlan[pkg.id];
            const size = lockupSize[pkg.id];
            const openCount = sponsorshipIntakeOpen
              ? Math.max(0, pkg.slotCount - filled.length)
              : 0;
            return (
              <div
                key={pkg.id}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                {filled.map((sponsor) => (
                  <div
                    key={sponsor.name}
                    className={`flex ${size.slot} items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-4`}
                  >
                    <Image
                      src={sponsor.src}
                      alt={sponsor.name}
                      width={size.logoWidth}
                      height={size.logoHeight}
                      className={size.logo}
                    />
                  </div>
                ))}
                {Array.from({ length: openCount }, (_, index) => (
                  <OpenSponsorSlot
                    key={`${pkg.id}-open-${index}`}
                    href={slotHref}
                    sizeClass={size.slot}
                    index={index}
                    total={pkg.slotCount}
                  />
                ))}
              </div>
            );
          })}
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
