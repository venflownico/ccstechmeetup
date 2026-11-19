import Image from "next/image";

const fotos = [
  {
    src: "/meetup/patio-chapeau.jpg",
    alt: "Patio de Chapeau House al anochecer, con palmeras, luces y asistentes de pie",
    width: 1389,
    height: 868,
    className: "col-span-2 aspect-[16/10] md:col-span-1 md:aspect-auto",
    position: "object-[50%_70%]",
  },
  {
    src: "/meetup/escenario-noche.jpg",
    alt: "Público de noche frente a la tarima, bajo una guirnalda de luces",
    width: 1389,
    height: 868,
    className: "aspect-square md:aspect-auto",
    position: "object-[58%_75%]",
  },
  {
    src: "/meetup/tarima-banner.jpg",
    alt: "Tarima con el banner del Caracas Tech Meetup y público en primer plano",
    width: 940,
    height: 522,
    className: "aspect-square md:aspect-auto",
    position: "object-[35%_60%]",
  },
];

export function FotosMeetup() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:h-80 md:grid-cols-[1.5fr_1fr_1fr]">
        {fotos.map((foto) => (
          <div
            key={foto.src}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${foto.className}`}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              width={foto.width}
              height={foto.height}
              sizes="(min-width: 1152px) 470px, (min-width: 768px) 40vw, 100vw"
              className={`absolute inset-0 size-full object-cover ${foto.position}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
