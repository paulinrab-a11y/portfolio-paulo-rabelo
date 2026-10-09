import { describe, expect, it } from 'vitest';
import { mesesDoPeriodo, trilhaDaCarreira } from './carreira';

const hoje = new Date(2026, 9, 9); // outubro de 2026
const m = (ano: number, mes: number) => ano * 12 + (mes - 1);

describe('mesesDoPeriodo', () => {
  it('lê os formatos do perfil', () => {
    expect(mesesDoPeriodo('set/2024 a mar/2025', hoje)).toEqual({ inicio: m(2024, 9), fim: m(2025, 3) });
    expect(mesesDoPeriodo('jun a nov/2023', hoje)).toEqual({ inicio: m(2023, 6), fim: m(2023, 11) });
    expect(mesesDoPeriodo('jul/2026 até hoje', hoje)).toEqual({ inicio: m(2026, 7), fim: m(2026, 10) });
    expect(mesesDoPeriodo('2015 a 2020', hoje)).toEqual({ inicio: m(2015, 1), fim: m(2020, 12) });
  });

  it('formato desconhecido ou mês inválido devolve null', () => {
    expect(mesesDoPeriodo('desde sempre', hoje)).toBeNull();
    expect(mesesDoPeriodo('xyz/2024 a mar/2025', hoje)).toBeNull();
  });
});

describe('trilhaDaCarreira', () => {
  it('períodos simultâneos vão para faixas diferentes; seguidos reaproveitam a faixa', () => {
    const t = trilhaDaCarreira([
      { inicio: m(2024, 1), fim: m(2024, 12) }, // A
      { inicio: m(2024, 6), fim: m(2025, 6) }, // B, junto com A
      { inicio: m(2025, 1), fim: m(2025, 12) }, // C, depois de A
    ]);
    expect(t.clipes.map((c) => c.faixa)).toEqual([0, 1, 0]);
    expect(t.faixas).toBe(2);
    expect(t.clipes[0].x).toBe(0);
    // Do começo ao fim cabe tudo entre 0 e 1
    for (const c of t.clipes) expect(c.x + c.largura).toBeLessThanOrEqual(1);
    expect(t.anos.map((a) => a.ano)).toEqual([2024, 2025]);
  });

  it('sem períodos, trilha vazia', () => {
    expect(trilhaDaCarreira([])).toEqual({ clipes: [], faixas: 0, anos: [] });
  });
});
