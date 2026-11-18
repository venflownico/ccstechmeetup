import Link from "next/link";

import { Foto } from "@/components/2027/foto";
import { FORMATOS } from "@/components/2027/tipos";
import type { Estilo } from "@/components/2027/tipos";
import { LogotipoFormato } from "@/components/logotipo-formato";

import s from "./estilos.module.css";
import { Revela, Titulo } from "./movimiento";

export function Formatos() {
  return (
    <section className={s.seccion} aria-labelledby="t-formatos">
      <div className={s.envoltura}>
        <Titulo id="t-formatos" className={s.h2} texto="Del meetup a Caracas Tech" />
        <p className={s.sub}>
          Un formato hoy y cinco en camino para 2027. Cada formato nuevo llega con su propia propuesta.
        </p>
        <ul className={s.minis}>
          {FORMATOS.map((f, i) => (
            <Revela as="li" key={f.id} paso={i % 3} className={s.mini}>
              <div className={s.miniCaja} style={{ "--c": f.c, "--cl": f.cl } as Estilo}>
                <Foto src={f.foto} alt="" foco={f.foco} sizes="(min-width: 1120px) 352px, (min-width: 720px) 33vw, 50vw" clase={s.fotoMini} />
                <div className={s.veloMini} aria-hidden="true" />
                <span className={s.miniCuando}>{f.cuando}</span>
                <div className={s.miniLogo}>
                  <LogotipoFormato palabra={f.palabra} color="var(--cl)" viewBox={f.viewBox} />
                </div>
              </div>
            </Revela>
          ))}
        </ul>
        <p className={s.nota}>Las fotos de los cinco formatos nuevos son de referencia.</p>
        <Link className={s.secundario} href="/2027?o=patrocinar">
          Ver los seis formatos
        </Link>
      </div>
    </section>
  );
}
