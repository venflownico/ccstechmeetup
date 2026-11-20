import { TarjetaEquipo } from "@/components/tarjeta-equipo";
import { team, type TeamMember } from "@/lib/site";

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
        {miembros.map((person) => (
          <TarjetaEquipo key={person.name} person={person} />
        ))}
      </div>
    </section>
  );
}
