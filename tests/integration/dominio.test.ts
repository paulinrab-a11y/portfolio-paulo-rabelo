import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const vercel = JSON.parse(readFileSync(join(__dirname, '..', '..', 'vercel.json'), 'utf8')) as {
  routes: Array<{ src: string; has?: Array<{ type: string; value: string }>; status?: number; headers?: Record<string, string> }>;
};

describe('domínio próprio', () => {
  it('o endereço antigo da Vercel redireciona (308) para paulinrab.com.br, mantendo o caminho', () => {
    const r = vercel.routes.find((x) => x.has?.some((h) => h.type === 'host' && h.value === 'portfolio-paulo-rabelo.vercel.app'));
    expect(r?.status).toBe(308);
    expect(r?.src).toBe('^/(.*)$');
    expect(r?.headers?.Location).toBe('https://paulinrab.com.br/$1');
  });

  it('o redirecionamento vem antes dos bloqueios (é a primeira rota)', () => {
    expect(vercel.routes[0]?.has?.[0]?.value).toBe('portfolio-paulo-rabelo.vercel.app');
  });
});
