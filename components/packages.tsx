"use client";

import { motion } from "motion/react";
import { BadgeCheck, Check, FileDown } from "lucide-react";
import { useState } from "react";

import { useQuieto } from "@/components/2027/quieto";
import { PDF_PROPUESTA } from "@/components/patrocinar/entrada";
import s from "@/components/patrocinar/estilos.module.css";
import { formatoMiles } from "@/components/patrocinar/formato";
import { Revela, Titulo } from "@/components/patrocinar/movimiento";
import { SponsorForm } from "@/components/sponsor-form";
import { packages, sponsorshipIntakeOpen, type PackageId } from "@/lib/site";

/** Lo que incluye cada plan, tal como lo dice la propuesta. El precio sale de `packages`. */
const PLANES: readonly {
  id: PackageId;
  destacado: boolean;
  beneficios: readonly string[];
}[] = [
  {
    id: "comunidad",
    destacado: false,
    beneficios: ["Tu logo y tu oferta en cada edición", "2 entradas al mes"],
  },
  {
    id: "recurso",
    destacado: true,
    beneficios: [
      "Todo lo de Comunidad",
      "Única marca de tu rubro",
      "6 entradas al mes",
      "Resumen de quién vino tras cada edición",
    ],
  },
];

const RESORTE = { type: "spring", stiffness: 420, damping: 15 } as const;
const RELLENO = { type: "spring", duration: 0.7, bounce: 0 } as const;
const SIN_MOVIMIENTO = { duration: 0 } as const;

function Plan({
  id,
  destacado,
  beneficios,
  elegido,
  alElegir,
}: {
  id: PackageId;
  destacado: boolean;
  beneficios: readonly string[];
  elegido: boolean;
  alElegir: (id: PackageId) => void;
}) {
  const quieto = useQuieto();
  const pkg = packages.find((p) => p.id === id);
  if (!pkg || !("price" in pkg)) return null;
  const precio = `desde $${formatoMiles(pkg.price)}`;

  return (
    <Revela as="li" className={s.planCaja}>
      <motion.div
        className={`${s.plan}${destacado ? ` ${s.planDestacado}` : ""}${elegido ? ` ${s.planOn}` : ""}`}
        animate={{ scale: elegido && !quieto ? 1.025 : 1 }}
        transition={quieto ? SIN_MOVIMIENTO : RESORTE}
      >
        <motion.span
          className={s.planRelleno}
          aria-hidden="true"
          initial={false}
          animate={{ clipPath: elegido ? "circle(150% at 50% 0%)" : "circle(0% at 50% 0%)" }}
          transition={quieto ? SIN_MOVIMIENTO : RELLENO}
        />
        <input
          type="radio"
          name="plan"
          className={s.planRadio}
          checked={elegido}
          onChange={() => alElegir(id)}
          aria-label={`${pkg.name}, ${precio} al mes`}
        />
        <span className={s.planMarca} aria-hidden="true">
          <motion.span
            initial={false}
            animate={{ scale: elegido ? 1 : 0 }}
            transition={quieto ? SIN_MOVIMIENTO : RESORTE}
          >
            <Check strokeWidth={3} />
          </motion.span>
        </span>
        <h3 className={s.planNombre}>{pkg.name}</h3>
        <p className={s.planPrecio}>
          <span className={s.sr}>{`${precio} al mes`}</span>
          <span aria-hidden="true">
            <span className={s.planDesde}>desde</span>
            <span className={s.planMonto}>{`$${formatoMiles(pkg.price)}`}</span>
            <span className={s.planPeriodo}>al mes</span>
          </span>
        </p>
        <p className={s.planCondiciones}>USD a tasa BCV</p>
        <p className={s.planCondiciones}>1 año, cuota domiciliada</p>
        <ul className={s.planLista}>
          {beneficios.map((b) => (
            <li key={b}>
              <BadgeCheck strokeWidth={1.75} aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>
    </Revela>
  );
}

export function Packages() {
  const [selected, setSelected] = useState<PackageId>("recurso");

  return (
    <>
      <section id="paquetes" className={s.seccion} aria-labelledby="t-planes">
        <div className={s.envoltura}>
          <Titulo id="t-planes" className={s.h2} texto="Dos planes por un año" />
          <ul className={s.planes} role="radiogroup" aria-labelledby="t-planes">
            {PLANES.map((p) => (
              <Plan key={p.id} {...p} elegido={selected === p.id} alElegir={setSelected} />
            ))}
          </ul>
        </div>
      </section>
      {sponsorshipIntakeOpen ? (
        <section id="formulario" className={s.seccion} aria-labelledby="t-formulario">
          <div className={s.envoltura}>
            <Titulo id="t-formulario" className={s.h2} texto="Conversemos 30 minutos" />
            <p className={s.sub}>
              Vemos qué plan le sirve a tu empresa y qué oferta llevarles a los founders.
            </p>
            <div className={s.formulario}>
              <SponsorForm selectedPackage={selected} onPackageChange={setSelected} />
            </div>
            <a className={s.pdf} href={PDF_PROPUESTA} download>
              <FileDown strokeWidth={1.75} aria-hidden="true" />
              Descargar la propuesta en PDF
            </a>
          </div>
        </section>
      ) : null}
    </>
  );
}
