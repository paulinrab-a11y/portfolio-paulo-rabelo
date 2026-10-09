/** Mês como número contínuo: ano * 12 + (mês - 1). Janeiro de 2024 = 24288. */
export type Mes = number;

const MESES: Record<string, number> = { jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12 };

const mes = (ano: number, m: number): Mes => ano * 12 + (m - 1);

/**
 * Período escrito em português no perfil ("set/2024 a mar/2025", "jun a
 * nov/2023", "jul/2026 até hoje", "2015 a 2020") para início e fim em meses.
 * "Até hoje" termina no mês de `hoje`. Formato desconhecido devolve null.
 */
export function mesesDoPeriodo(periodo: string, hoje: Date): { inicio: Mes; fim: Mes } | null {
  const p = periodo.trim().toLowerCase();
  const agora = mes(hoje.getFullYear(), hoje.getMonth() + 1);
  let m = /^([a-z]{3})\/(\d{4}) até hoje$/.exec(p);
  if (m && MESES[m[1]]) return { inicio: mes(Number(m[2]), MESES[m[1]]), fim: agora };
  m = /^([a-z]{3})\/(\d{4}) a ([a-z]{3})\/(\d{4})$/.exec(p);
  if (m && MESES[m[1]] && MESES[m[3]]) return { inicio: mes(Number(m[2]), MESES[m[1]]), fim: mes(Number(m[4]), MESES[m[3]]) };
  m = /^([a-z]{3}) a ([a-z]{3})\/(\d{4})$/.exec(p);
  if (m && MESES[m[1]] && MESES[m[2]]) return { inicio: mes(Number(m[3]), MESES[m[1]]), fim: mes(Number(m[3]), MESES[m[2]]) };
  m = /^(\d{4}) a (\d{4})$/.exec(p);
  if (m) return { inicio: mes(Number(m[1]), 1), fim: mes(Number(m[2]), 12) };
  return null;
}

/** Clipe da carreira na trilha: posição e largura em fração (0 a 1) e a faixa (linha) onde cabe */
export interface ClipeCarreira {
  x: number;
  largura: number;
  faixa: number;
}

/**
 * Põe os períodos numa linha do tempo de edição: cada um vira um clipe, e
 * períodos simultâneos vão para faixas diferentes (como clipes sobrepostos
 * em trilhas V1, V2...). Também devolve os anos da régua.
 */
export function trilhaDaCarreira(periodos: ReadonlyArray<{ inicio: Mes; fim: Mes }>): { clipes: ClipeCarreira[]; faixas: number; anos: Array<{ ano: number; x: number }> } {
  if (periodos.length === 0) return { clipes: [], faixas: 0, anos: [] };
  const comeco = Math.min(...periodos.map((p) => p.inicio));
  const final = Math.max(...periodos.map((p) => p.fim)) + 1;
  const total = Math.max(1, final - comeco);
  // Ocupação de cada faixa: o mês em que ela fica livre
  const livreEm: Mes[] = [];
  const ordem = periodos.map((p, i) => ({ ...p, i })).sort((a, b) => a.inicio - b.inicio);
  const clipes: ClipeCarreira[] = new Array(periodos.length);
  for (const p of ordem) {
    let faixa = livreEm.findIndex((livre) => livre <= p.inicio);
    if (faixa === -1) faixa = livreEm.push(0) - 1;
    livreEm[faixa] = p.fim + 1;
    clipes[p.i] = { x: (p.inicio - comeco) / total, largura: (p.fim + 1 - p.inicio) / total, faixa };
  }
  const anos: Array<{ ano: number; x: number }> = [];
  for (let ano = Math.ceil(comeco / 12); ano * 12 < final; ano++) anos.push({ ano, x: (ano * 12 - comeco) / total });
  return { clipes, faixas: livreEm.length, anos };
}
