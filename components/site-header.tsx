import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navItems, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="#inicio" className="flex items-center gap-2">
          <Image
            src="/brand/wordmark.svg"
            alt={site.name}
            width={180}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden text-white/80 sm:inline-flex" asChild>
            <Link href={site.lumaCalendarUrl} target="_blank" rel="noreferrer">
              Luma
            </Link>
          </Button>
          <Button className="bg-teal-400 text-slate-950 hover:bg-teal-300" asChild>
            <Link href="#patrocinar">Patrocinar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
