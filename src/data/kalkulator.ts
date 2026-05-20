export function formatTsd(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2).replace('.', ',')} Mio.`;
  if (n < 10_000) return Math.round(n).toLocaleString('de-DE');
  return `${Math.round(n / 1000).toLocaleString('de-DE')} Tsd.`;
}
