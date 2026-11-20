import { BlurFade } from "@/components/ui/blur-fade";

const pillars = [
  {
    title: "Red",
    body: "Founders, operators, developers e inversionistas en la misma mesa, mes a mes.",
  },
  {
    title: "Recursos",
    body: "Aprendizajes reales, herramientas y colaboraciones para construir en Venezuela.",
  },
  {
    title: "Capital",
    body: "Acceso a gente que invierte, acelera y abre puertas — no a un pitch forzado.",
  },
  {
    title: "Personas",
    body: "La comunidad que necesitas al lado para que tu startup nazca y crezca.",
  },
];

export function Why() {
  return (
    <section id="por-que" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <BlurFade inView>
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          Por qué existimos
        </p>
        <h2 className="font-heading mt-3 max-w-4xl text-3xl font-semibold text-white sm:text-5xl">
          Para que el ecosistema startup venezolano crezca — y nazcan más de 1.000 startups
          en Caracas y Venezuela.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/65">
          Caracas Tech Meetup existe para que la comunidad tenga acceso a la red, los
          recursos, el capital y las personas que necesita para triunfar. Por el ecosistema,
          para el ecosistema.
        </p>
      </BlurFade>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, index) => (
          <BlurFade key={pillar.title} delay={0.08 * index} inView>
            <article className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="font-heading text-lg font-semibold text-teal-300">{pillar.title}</h3>
              <p className="mt-2 text-sm text-white/65">{pillar.body}</p>
            </article>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
