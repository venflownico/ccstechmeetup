"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.label} delay={0.08 * index} inView>
            <div className="text-center">
              <p className="font-heading text-4xl font-semibold text-teal-300 sm:text-5xl">
                <NumberTicker value={stat.value} className="text-teal-300" />
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm text-white/55">{stat.label}</p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
