import { describe, expect, it } from 'vitest';
import { montarDeDigitos } from './embaralhar';

describe('montarDeDigitos', () => {
  it('no início só tem dígitos, com o espaço no lugar', () => {
    const s = montarDeDigitos('PAULO RABELO', 0);
    expect(s).toMatch(/^\d{5} \d{6}$/);
  });

  it('no fim é o texto final', () => {
    expect(montarDeDigitos('PAULO RABELO', 1)).toBe('PAULO RABELO');
    expect(montarDeDigitos('PAULO RABELO', 3)).toBe('PAULO RABELO');
  });

  it('revela da esquerda para a direita', () => {
    const s = montarDeDigitos('PAULO RABELO', 0.5);
    expect(s.startsWith('PAULO')).toBe(true);
    expect(s.slice(6)).toMatch(/^\d+$/);
  });

  it('o sorteio troca os dígitos sem mexer nas letras prontas', () => {
    const a = montarDeDigitos('PAULO', 0.4, 1);
    const b = montarDeDigitos('PAULO', 0.4, 2);
    expect(a.slice(0, 2)).toBe('PA');
    expect(b.slice(0, 2)).toBe('PA');
    expect(a).not.toBe(b);
  });

  it('progresso negativo vale zero', () => {
    expect(montarDeDigitos('AB', -1)).toMatch(/^\d\d$/);
  });
});
