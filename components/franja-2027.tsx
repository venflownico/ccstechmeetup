import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatos2027 } from "@/lib/site";

export function Franja2027() {
  const colores = formatos2027.filter((f) => f.visible).map((f) => f.c);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-[6px] bg-[#0b141c]">
        <div
          className="grid h-2"
          style={{ gridTemplateColumns: `repeat(${colores.length}, 1fr)` }}
          aria-hidden="true"
        >
          {colores.map((color) => (
            <i key={color} style={{ background: color }} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 pt-5 pb-6 sm:px-7">
          <div>
            <h2 className="font-heading text-2xl font-medium text-white sm:text-3xl">
              En 2027 nos vemos de seis maneras
            </h2>
            <p className="mt-1 text-[#9aa59f]">Voltea las tarjetas y dinos cuáles te interesan.</p>
          </div>
          <Button
            asChild
            className="h-11 rounded-full bg-[#f1f7f1] px-5 text-base font-semibold text-[#050b12] hover:bg-white"
          >
            <Link href="/2027?o=portada">Ver lo que viene en 2027</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
