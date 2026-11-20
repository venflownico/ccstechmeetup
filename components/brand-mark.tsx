import Image from "next/image";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Size = "sm" | "hero";

const sizes: Record<Size, string> = {
  sm: "h-9 w-auto sm:h-10",
  hero: "h-auto w-full max-w-[20rem] sm:max-w-[28rem] md:max-w-[36rem]",
};

export function BrandMark({
  size = "sm",
  align = "left",
  soloMarca = false,
  className,
}: {
  size?: Size;
  /** Logo de la organización, sin la palabra «meetup»: para páginas que hablan de todos los formatos. */
  soloMarca?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex",
        align === "center" ? "justify-center" : "justify-start",
        className,
      )}
    >
      <Image
        src={soloMarca ? "/brand/caracas-tech.png" : "/brand/logo.png"}
        alt={soloMarca ? site.marca : site.name}
        width={968}
        height={381}
        priority={size === "hero"}
        className={cn("object-contain", sizes[size])}
      />
    </span>
  );
}
