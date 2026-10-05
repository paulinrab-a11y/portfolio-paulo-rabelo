import { timecode } from './timecode';

/** Duração simbólica do "programa" que a página inteira representa */
const DURACAO_PAGINA_S = 180;

/** A partir daqui o cabeçalho mostra FIM */
const LIMIAR_FIM = 0.985;

/** Progresso da rolagem (0 a 1) para o timecode do cabeçalho. No fim, "FIM". */
export function progressoParaTimecode(p: number, duracao = DURACAO_PAGINA_S): string {
  const limitado = Math.min(1, Math.max(0, p));
  if (limitado >= LIMIAR_FIM) return 'FIM';
  return timecode(limitado * duracao * 1000);
}

/** Interpolação limitada: mapeia `v` de [a, b] para [0, 1] */
export function faixa(v: number, a: number, b: number): number {
  if (b === a) return v >= b ? 1 : 0;
  return Math.min(1, Math.max(0, (v - a) / (b - a)));
}
