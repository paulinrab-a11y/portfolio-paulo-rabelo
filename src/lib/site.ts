/** Endereço público do site. Na Vercel, defina NEXT_PUBLIC_SITE_URL no projeto. */
export const SITE_URL = normalizarUrl(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'http://localhost:3000');

export function normalizarUrl(valor: string): string {
  const comProtocolo = /^https?:\/\//.test(valor) ? valor : `https://${valor}`;
  return comProtocolo.replace(/\/+$/, '');
}

/**
 * Painel de visitas (Vercel Web Analytics): sem cookie e sem dado que
 * identifique o visitante. O script e o envio ficam na própria origem
 * (/_vercel/insights), que só existe nos deploys da Vercel; no build local e
 * nos testes ele fica de fora.
 */
export function analyticsAtivo(env: Record<string, string | undefined> = process.env): boolean {
  return env.VERCEL === '1';
}
