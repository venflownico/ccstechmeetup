type LogotipoFormatoProps = {
  palabra: string;
  color: string;
  viewBox: string;
  className?: string;
};

/**
 * Logotipo de formato: símbolo «Caracas Tech» (public/2027/ctw.svg) y la
 * palabra en Kalam, girada como en el logo. El viewBox llega ya medido.
 */
export function LogotipoFormato({ palabra, color, viewBox, className }: LogotipoFormatoProps) {
  return (
    <svg
      className={className}
      role="img"
      aria-label={`Caracas Tech ${palabra}`}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <use href="/2027/ctw.svg#ctw" x={0} y={0} width={3872} height={1524} fill="#f1f7f1" />
      <text
        x={2310}
        y={1275}
        fontSize={530}
        transform="rotate(-9 2310 1275) skewX(-10)"
        fill={color}
        style={{ fontFamily: "var(--font-kalam), cursive" }}
      >
        {palabra}
      </text>
    </svg>
  );
}
