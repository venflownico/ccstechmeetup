import { Button } from "@/components/ui/button";
import { sponsorWhy } from "@/lib/site";

export function SponsorWhy() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="font-heading mx-auto max-w-4xl text-center text-3xl font-semibold text-white sm:text-5xl">
        {sponsorWhy.title}
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {sponsorWhy.stats.map((stat) => (
          <div key={stat.value} className="text-center">
            <p className="font-heading">
              <span className="sr-only">
                {stat.value} {stat.label}
              </span>
              <span
                aria-hidden="true"
                className="block text-6xl font-semibold text-teal-300 tabular-nums sm:text-7xl"
              >
                {stat.value}
              </span>
              <span
                aria-hidden="true"
                className="mt-3 block text-lg font-semibold text-white"
              >
                {stat.label}
              </span>
            </p>
            <p className="mt-3 text-white/65">{stat.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-xs text-white/40">{sponsorWhy.footnote}</p>
      <div className="mt-10 flex justify-center">
        <Button className="h-10 bg-teal-400 text-slate-950 hover:bg-teal-200" asChild>
          <a href={sponsorWhy.ctaHref}>{sponsorWhy.cta}</a>
        </Button>
      </div>
    </section>
  );
}
