import Image from "next/image";
import Link from "next/link";

import { BlurFade } from "@/components/ui/blur-fade";
import { team } from "@/lib/site";

export function Team() {
  return (
    <section id="equipo" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          Equipo fundador
        </p>
        <h2 className="font-heading mt-3 text-3xl font-semibold text-white sm:text-5xl">
          Quienes arman la mesa cada mes
        </h2>
        <p className="mt-4 text-white/60">
          Cuatro organizers del Ecosistema Startup Venezuela. El meetup existe porque ellos
          lo empujan, edición tras edición.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((person, index) => (
          <BlurFade key={person.name} delay={0.08 * index} inView>
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-square">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-white">{person.name}</h3>
                <p className="text-sm text-teal-300">{person.role}</p>
                <p className="mt-2 text-sm text-white/60">{person.bio}</p>
                <Link
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-sm text-white/70 hover:text-teal-300"
                >
                  LinkedIn →
                </Link>
              </div>
            </article>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
