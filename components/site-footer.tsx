import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Image
            src="/brand/wordmark.svg"
            alt={site.name}
            width={160}
            height={36}
            className="h-7 w-auto"
          />
          <p className="mt-3 max-w-sm text-sm text-white/50">{site.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
          <Link href={site.lumaCalendarUrl} target="_blank" rel="noreferrer">
            Luma
          </Link>
          <Link href={site.instagram} target="_blank" rel="noreferrer">
            {site.instagramHandle}
          </Link>
          <Link href={`mailto:${site.email}`}>{site.email}</Link>
          <Link href="#patrocinar">Patrocinar</Link>
        </div>
      </div>
    </footer>
  );
}
