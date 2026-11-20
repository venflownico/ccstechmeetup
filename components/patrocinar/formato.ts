/** Miles con punto, como se escribe en español de Venezuela (1.770). `toLocaleString` no agrupa los de 4 cifras. */
export function formatoMiles(n: number) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
