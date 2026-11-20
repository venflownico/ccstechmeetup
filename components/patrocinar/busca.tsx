import s from "./estilos.module.css";
import { Revela, Titulo } from "./movimiento";

const PASOS = [
  {
    cuando: "Fase 1 · De aquí a enero de 2027",
    titulo: "Patrocinadores principales.",
    texto:
      "Cerramos entre 4 y 6 marcas. Están en todos los formatos y su aporte sostiene la operación de Caracas Tech.",
  },
  {
    cuando: "Primer mes con patrocinadores",
    titulo: null,
    texto:
      "Con los primeros aportes registramos la empresa y la marca, para poder firmar contigo, y sumamos a una persona dedicada a organizar.",
  },
  {
    cuando: "Fase 2 · Durante 2027",
    titulo: "Patrocinadores por formato.",
    texto:
      "Para cada formato sumamos 2 o 3 marcas que encajen con ese evento. Cubren los gastos de esa edición. Los patrocinadores principales siempre van por encima.",
  },
] as const;

export function Busca() {
  return (
    <section className={s.seccion} aria-labelledby="t-busca">
      <div className={s.envoltura}>
        <Titulo
          id="t-busca"
          className={`${s.h2} ${s.h2Ancho}`}
          texto="Estamos levantando desde $5.000 al mes en total, entre 4 y 6 patrocinadores principales."
        />
        <p className={s.sub}>Lo planteamos como una ronda: pocas marcas que entran juntas y sostienen la operación.</p>
        <h3 className={s.etiquetaLista}>Cómo y cuándo</h3>
        <ol className={s.linea}>
          {PASOS.map(({ cuando, titulo, texto }, i) => (
            <Revela as="li" key={cuando} paso={i} className={s.paso}>
              <span className={s.pasoPunto} aria-hidden="true" />
              <h4 className={s.pasoCuando}>{cuando}</h4>
              {titulo ? <p className={s.pasoTitulo}>{titulo}</p> : null}
              <p className={s.pasoTexto}>{texto}</p>
            </Revela>
          ))}
        </ol>
      </div>
    </section>
  );
}
