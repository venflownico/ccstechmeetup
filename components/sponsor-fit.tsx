import { BlurFade } from "@/components/ui/blur-fade";
import { sponsorFit } from "@/lib/site";

export function SponsorFit() {
  return (
    <section id="que-buscamos" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <BlurFade inView>
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          {sponsorFit.eyebrow}
        </p>
        <h2 className="font-heading mt-3 max-w-4xl text-3xl font-semibold text-white sm:text-5xl">
          {sponsorFit.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/65">{sponsorFit.lead}</p>
        <p className="mt-4 max-w-2xl text-white/55">{sponsorFit.body}</p>
      </BlurFade>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sponsorFit.pillars.map((pillar, index) => (
          <BlurFade key={pillar.title} delay={0.08 * index} inView>
            <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold tracking-[0.18em] text-teal-300/80 uppercase">
                Acceso a
              </p>
              <h3 className="font-heading mt-2 text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-white/65">{pillar.body}</p>
            </article>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
