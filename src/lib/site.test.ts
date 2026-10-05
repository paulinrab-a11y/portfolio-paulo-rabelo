import { describe, expect, it } from 'vitest';
import { normalizarUrl } from './site';

describe('normalizarUrl', () => {
  it('acrescenta https quando falta', () => {
    expect(normalizarUrl('paulo.vercel.app')).toBe('https://paulo.vercel.app');
  });

  it('mantém o protocolo e tira a barra final', () => {
    expect(normalizarUrl('http://localhost:3000/')).toBe('http://localhost:3000');
    expect(normalizarUrl('https://exemplo.com//')).toBe('https://exemplo.com');
  });
});
