/** Endereço público do site. Na Vercel, defina NEXT_PUBLIC_SITE_URL no projeto. */
export const SITE_URL = normalizarUrl(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'http://localhost:3000');

export function normalizarUrl(valor: string): string {
  const comProtocolo = /^https?:\/\//.test(valor) ? valor : `https://${valor}`;
  return comProtocolo.replace(/\/+$/, '');
}
