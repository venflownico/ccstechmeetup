import { About } from "@/components/about";
import { Events } from "@/components/events";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HeroStage } from "@/components/hero-stage";
import { HowToAttend } from "@/components/how-to-attend";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Sponsors } from "@/components/sponsors";
import { Stats } from "@/components/stats";
import { StayInTheKnow } from "@/components/stay-in-the-know";
import { Team } from "@/components/team";
import { Why } from "@/components/why";
import { getLumaEvents } from "@/lib/luma";

export default async function Home() {
  const { upcoming, past, hasMorePast } = await getLumaEvents();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroStage>
          <Hero />
          <Stats />
        </HeroStage>
        <Events upcoming={upcoming} past={past} hasMorePast={hasMorePast} />
        <HowToAttend />
        <Why />
        <About />
        <StayInTheKnow />
        <Sponsors />
        <Team />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
