import { BlurFade } from "@/components/ui/blur-fade";

const points = [
  "Conectar con founders, operators, developers e inversionistas",
  "Compartir retos, aprendizajes y colaboraciones reales",
  "Conocer proyectos locales sin un pitch forzado",
  "Pizza, vino, cerveza y bolas criollas para romper el hielo",
];

export function About() {
  return (
    <section id="comunidad" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <BlurFade inView>
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-300 uppercase">
          Qué es
        </p>
        <h2 className="font-heading mt-3 max-w-3xl text-3xl font-semibold text-white sm:text-5xl">
          Un after office mensual para el ecosistema tech de Venezuela.
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-white/65">
          Reunimos a fundadores, operadores, inversionistas, desarrolladores, diseñadores,
          estudiantes y entusiastas en un espacio auténtico e informal, donde las buenas
          conversaciones fluyen sin guion. Organizado por Ecosistema Startup Venezuela: 100%
          comunidad, hecho con cariño por quienes emprenden en el país.
        </p>
      </BlurFade>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {points.map((point, index) => (
          <BlurFade key={point} delay={0.1 * index} inView>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-white/80">
              {point}
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
