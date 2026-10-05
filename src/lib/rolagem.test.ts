import { describe, expect, it } from 'vitest';
import { faixa, progressoParaTimecode } from './rolagem';

describe('progressoParaTimecode', () => {
  it('começa em zero', () => {
    expect(progressoParaTimecode(0)).toBe('00:00:00:00');
  });

  it('anda proporcional à rolagem', () => {
    expect(progressoParaTimecode(0.5, 180)).toBe('00:01:30:00');
  });

  it('termina em FIM', () => {
    expect(progressoParaTimecode(0.99)).toBe('FIM');
    expect(progressoParaTimecode(2)).toBe('FIM');
  });

  it('progresso negativo vale zero', () => {
    expect(progressoParaTimecode(-1)).toBe('00:00:00:00');
  });
});

describe('faixa', () => {
  it('mapeia e limita', () => {
    expect(faixa(5, 0, 10)).toBe(0.5);
    expect(faixa(-5, 0, 10)).toBe(0);
    expect(faixa(15, 0, 10)).toBe(1);
  });

  it('intervalo vazio vira degrau', () => {
    expect(faixa(1, 1, 1)).toBe(1);
    expect(faixa(0, 1, 1)).toBe(0);
  });
});
