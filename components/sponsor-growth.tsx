import { BlurFade } from "@/components/ui/blur-fade";
import { sponsorGrowth } from "@/lib/site";

export function SponsorGrowth() {
  return (
    <section id="fondos" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <BlurFade inView>
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          {sponsorGrowth.eyebrow}
        </p>
        <h2 className="font-heading mt-3 max-w-4xl text-3xl font-semibold text-white sm:text-5xl">
          {sponsorGrowth.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/65">{sponsorGrowth.lead}</p>
      </BlurFade>
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {sponsorGrowth.groups.map((group, index) => (
          <BlurFade key={group.title} delay={0.08 * index} inView>
            <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-teal-300/80 uppercase">
                {group.kicker}
              </p>
              <h3 className="font-heading mt-2 text-xl font-semibold text-white sm:text-2xl">
                {group.title}
              </h3>
              <p className="mt-3 text-sm text-white/65 sm:text-base">{group.body}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
