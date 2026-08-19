import Link from "next/link";

import { BlurFade } from "@/components/ui/blur-fade";
import { howToAttend } from "@/lib/site";

export function HowToAttend() {
  return (
    <section id="como-asistir" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <BlurFade inView>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
            {howToAttend.eyebrow}
          </p>
          <p className="rounded-full border border-teal-300/30 bg-teal-300/10 px-3 py-1 text-sm font-medium text-teal-300">
            {howToAttend.badge}
          </p>
        </div>
        <h2 className="font-heading mt-3 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
          {howToAttend.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/65">{howToAttend.lead}</p>
      </BlurFade>
      <ol className="mt-12 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {howToAttend.steps.map((step, index) => (
          <li key={step.title} className="h-full">
            <BlurFade delay={0.08 * index} inView className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="font-heading text-sm font-semibold tracking-[0.2em] text-teal-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading mt-3 text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-white/65">{step.body}</p>
                {"href" in step && step.href ? (
                  <StepLink
                    href={step.href}
                    label={step.hrefLabel}
                    external={"external" in step && step.external}
                  />
                ) : null}
              </article>
            </BlurFade>
          </li>
        ))}
      </ol>
    </section>
  );
}

function StepLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external: boolean;
}) {
  const className = "mt-4 text-sm font-medium text-teal-300 hover:text-teal-200";

  if (external) {
    return (
      <Link href={href} target="_blank" rel="noreferrer" className={className}>
        {label} →
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {label} →
    </a>
  );
}
