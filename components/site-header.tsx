import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { navItems, sponsorshipIntakeOpen } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <BrandMark size="sm" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-white/80 sm:hidden" asChild>
            <Link href="/recursos">Recursos</Link>
          </Button>
          {sponsorshipIntakeOpen ? (
            <Button variant="ghost" className="hidden text-white/80 sm:inline-flex" asChild>
              <Link href="/patrocinar">Patrocinar</Link>
            </Button>
          ) : null}
          <Button className="bg-teal-400 text-slate-950 hover:bg-teal-200" asChild>
            <Link href="/#eventos">Ver eventos</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
