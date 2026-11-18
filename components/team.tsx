import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BlurFade } from "@/components/ui/blur-fade";
import { team, type TeamMember } from "@/lib/site";

function dominio(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function Team() {
  const miembros: readonly TeamMember[] = team;
  return (
    <section id="equipo" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">Equipo</p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
          Quienes arman la mesa cada mes
        </h2>
        <p className="mt-4 text-white/60">
          Quienes organizan el meetup. Existe porque lo empujan, edición tras edición.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {miembros.map((person, index) => (
          <BlurFade key={person.name} delay={0.08 * index} inView>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-square">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-semibold text-white">{person.name}</h3>
                <p className="text-sm text-teal-300">{person.role}</p>
                <p className="mt-2 text-sm text-white/60">{person.bio}</p>
                {person.logo && person.web ? (
                  <Link
                    href={person.web}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Sitio de ${person.proyecto ?? person.name}`}
                    className="mt-5 inline-flex h-11 items-center self-start opacity-90 transition-opacity hover:opacity-100"
                  >
                    {/* Los logos vienen en versión para fondo oscuro; screen borra los fondos negros. */}
                    <Image
                      src={person.logo}
                      alt={person.proyecto ?? ""}
                      width={160}
                      height={40}
                      unoptimized
                      className="h-7 w-auto max-w-[140px] object-contain object-left mix-blend-screen"
                    />
                  </Link>
                ) : null}
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-3 text-sm">
                  {person.web ? (
                    <Link
                      href={person.web}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 text-white/80 hover:text-teal-300"
                    >
                      <Globe className="size-4" strokeWidth={1.75} aria-hidden="true" />
                      {dominio(person.web)}
                    </Link>
                  ) : null}
                  <Link
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center text-white/70 hover:text-teal-300"
                  >
                    LinkedIn
                  </Link>
                </div>
              </div>
            </article>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
