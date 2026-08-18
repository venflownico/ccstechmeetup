import { About } from "@/components/about";
import { Events } from "@/components/events";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Packages } from "@/components/packages";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Sponsors } from "@/components/sponsors";
import { Stats } from "@/components/stats";
import { Team } from "@/components/team";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Events />
        <Sponsors />
        <Packages />
        <Team />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
