type LogotipoFormatoProps = {
  palabra: string;
  color: string;
  viewBox: string;
  className?: string;
  /** Texto que se dibuja (para el tipeo). Por defecto, la palabra completa. */
  texto?: string;
  /** Clase del cursor; si se pasa, se dibuja una barra al final del texto. */
  claseCursor?: string;
  /** Nombre accesible; por defecto «Caracas Tech {palabra}». */
  etiqueta?: string;
};

/**
 * Logotipo de formato: símbolo «Caracas Tech» (public/2027/ctw.svg) y la
 * palabra en Kalam, girada como en el logo. El viewBox llega ya medido.
 */
export function LogotipoFormato({
  palabra,
  color,
  viewBox,
  className,
  texto,
  claseCursor,
  etiqueta,
}: LogotipoFormatoProps) {
  return (
    <svg
      className={className}
      role="img"
      aria-label={etiqueta ?? `Caracas Tech ${palabra}`}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href="/2027/ctw.svg#ctw" x={0} y={0} width={3872} height={1524} fill="#f1f7f1" />
      <text
        x={2310}
        y={1275}
        fontSize={530}
        transform="rotate(-9 2310 1275) skewX(-10)"
        style={{ fill: color, fontFamily: "var(--font-kalam), cursive", whiteSpace: "pre" }}
        aria-hidden="true"
      >
        {texto ?? palabra}
        {claseCursor ? (
          <tspan className={claseCursor} dx={24}>
            |
          </tspan>
        ) : null}
      </text>
    </svg>
  );
}
