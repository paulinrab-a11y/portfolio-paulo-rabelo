import { segundosDoTimecode } from './timecode';

/** Um corte do reel do herói, já na linha do tempo do loop (em segundos) */
export interface Corte {
  slug: string;
  inicio: number;
  fim: number;
}

/**
 * De onde veio cada trecho do reel (campo `from` em media.json > hero.shots)
 * para o trabalho no site. Os trechos foram cortados do vídeo-portfólio.
 */
export const trabalhoDoTrecho: Record<string, string> = {
  vis: 'visualizer-anjo005',
  pod: 'podcast-opiniao-segura-laad',
  clip: 'clipe-santxx-azam-mc',
  yt: 'youtube-constance-silksong',
};

/** Trechos em sequência viram cortes com início e fim no loop. Trecho sem trabalho conhecido fica de fora. */
export function cortesDoReel(trechos: ReadonlyArray<{ from: string; in: string; out: string }>, origem: Record<string, string> = trabalhoDoTrecho): Corte[] {
  let t = 0;
  const cortes: Corte[] = [];
  for (const s of trechos) {
    const d = segundosDoTimecode(s.out) - segundosDoTimecode(s.in);
    if (!(d > 0)) continue;
    const slug = origem[s.from];
    if (slug) cortes.push({ slug, inicio: t, fim: t + d });
    t += d;
  }
  return cortes;
}

/** Índice do corte que está no monitor no tempo `t` (o loop recomeça no fim) */
export function corteNoTempo(cortes: readonly Corte[], t: number): number {
  if (cortes.length === 0) return -1;
  const total = cortes[cortes.length - 1].fim;
  const local = total > 0 ? ((t % total) + total) % total : 0;
  const i = cortes.findIndex((c) => local >= c.inicio && local < c.fim);
  return i === -1 ? cortes.length - 1 : i;
}
