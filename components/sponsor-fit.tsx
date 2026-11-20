import { Compass, Landmark, Layers, UsersRound } from "lucide-react";

import s from "@/components/patrocinar/estilos.module.css";
import { Revela, Titulo } from "@/components/patrocinar/movimiento";
import { sponsorGana } from "@/lib/site";

const ICONOS = [Landmark, UsersRound, Layers, Compass] as const;

const { donde, bloques, condicion } = sponsorGana;

export function SponsorFit() {
  return (
    <section className={s.seccion} aria-labelledby="t-ganas">
      <div className={s.envoltura}>
        <Titulo id="t-ganas" className={`${s.h2} ${s.h2Ancho}`} texto={sponsorGana.title} />
        <div className={s.ganancias}>
          <Revela className={`${s.ganaBloque} ${s.ganaAncho}`}>
            <h3 className={s.ganaRotulo}>{donde.label}</h3>
            <p className={s.ganaTexto}>{donde.text}</p>
            <p className={s.cuposLeyenda}>{donde.cuposLeyenda}</p>
            <ul className={s.cupos}>
              {Array.from({ length: donde.cupos }, (_, i) => (
                <li key={i} className={s.cupo}>
                  {donde.cupoTexto}
                </li>
              ))}
            </ul>
          </Revela>
          {bloques.map((b, i) => (
            <Revela key={b.label} paso={i % 2} className={s.ganaBloque}>
              <h3 className={s.ganaRotulo}>{b.label}</h3>
              <p className={s.ganaTexto}>{b.text}</p>
            </Revela>
          ))}
          <Revela className={`${s.ganaBloque} ${s.ganaAncho}`}>
            <h3 className={s.ganaRotulo}>{condicion.label}</h3>
            <p className={s.ganaTexto}>{condicion.text}</p>
            <ul className={s.maneras}>
              {condicion.pilares.map((p, i) => {
                const Icono = ICONOS[i];
                return (
                  <li key={p.title} className={s.manera}>
                    <span className={s.filaIcono} aria-hidden="true">
                      <Icono strokeWidth={1.75} />
                    </span>
                    <span>
                      <strong>{p.title}</strong> {p.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Revela>
        </div>
      </div>
    </section>
  );
}
