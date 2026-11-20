"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { navItems, sponsorshipIntakeOpen } from "@/lib/site";

const filaMovil =
  "flex min-h-11 items-center rounded-md px-3 text-base text-white/85 transition hover:bg-white/5 hover:text-white";

export function SiteHeader({ soloMarca = false }: { soloMarca?: boolean }) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    function alTeclear(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    }
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050b12]/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 pr-[max(1rem,env(safe-area-inset-right))] pl-[max(1rem,env(safe-area-inset-left))] sm:gap-4 sm:pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-[max(1.5rem,env(safe-area-inset-left))]">
        <Link href="/" className="flex shrink-0 items-center" onClick={cerrar}>
          <BrandMark size="sm" soloMarca={soloMarca} />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          {sponsorshipIntakeOpen ? (
            <Button variant="ghost" className="hidden text-white/80 sm:inline-flex" asChild>
              <Link href="/patrocinar">Patrocinar</Link>
            </Button>
          ) : null}
          <Button className="bg-teal-400 px-3 text-slate-950 hover:bg-teal-200" asChild>
            <Link href="/#eventos" onClick={cerrar}>
              Ver eventos
            </Link>
          </Button>
          <button
            ref={boton}
            type="button"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setAbierto((v) => !v)}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-white/85 transition hover:bg-white/5 hover:text-white md:hidden"
          >
            {abierto ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {abierto ? (
        <nav
          id="menu-movil"
          aria-label="Menú principal"
          className="border-t border-white/10 bg-[#050b12] pr-[max(0.75rem,env(safe-area-inset-right))] pb-3 pl-[max(0.75rem,env(safe-area-inset-left))] md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col pt-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={filaMovil} onClick={cerrar}>
                  {item.label}
                </Link>
              </li>
            ))}
            {sponsorshipIntakeOpen ? (
              <li>
                <Link href="/patrocinar" className={filaMovil} onClick={cerrar}>
                  Patrocinar
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
