import { describe, expect, it } from 'vitest';
import { analyticsAtivo, normalizarUrl } from './site';

describe('normalizarUrl', () => {
  it('acrescenta https quando falta', () => {
    expect(normalizarUrl('paulo.vercel.app')).toBe('https://paulo.vercel.app');
  });

  it('mantém o protocolo e tira a barra final', () => {
    expect(normalizarUrl('http://localhost:3000/')).toBe('http://localhost:3000');
    expect(normalizarUrl('https://exemplo.com//')).toBe('https://exemplo.com');
  });
});

describe('analyticsAtivo', () => {
  it('só nos deploys da Vercel', () => {
    expect(analyticsAtivo({ VERCEL: '1' })).toBe(true);
    expect(analyticsAtivo({})).toBe(false);
    expect(analyticsAtivo({ VERCEL: '0' })).toBe(false);
  });
});
