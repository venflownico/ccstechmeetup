import Image from "next/image";

export function HeroStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden">
      <Image
        src="/brand/hero-bg.jpg"
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes="100vw"
        className="-z-10 object-cover object-top"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#070b14] sm:h-36"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
