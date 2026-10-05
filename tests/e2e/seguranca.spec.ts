import { expect, test } from './fixtures';

test.describe('segurança', () => {
  test('cabeçalhos de segurança em todas as páginas', async ({ request }) => {
    for (const rota of ['/', '/trabalhos', '/servicos', '/sobre']) {
      const r = await request.get(rota);
      const h = r.headers();
      expect(h['content-security-policy'], rota).toContain("default-src 'self'");
      expect(h['content-security-policy'], rota).toContain("frame-ancestors 'none'");
      expect(h['x-content-type-options'], rota).toBe('nosniff');
      expect(h['x-frame-options'], rota).toBe('DENY');
      expect(h['strict-transport-security'], rota).toContain('max-age=63072000');
      expect(h['x-powered-by'], rota).toBeUndefined();
    }
  });

  test('nada de segredo, código-fonte ou mapa servido', async ({ request }) => {
    for (const caminho of ['/.env', '/.env.local', '/.git/config', '/package.json', '/src/data/perfil.ts', '/next.config.ts']) {
      expect((await request.get(caminho)).status(), caminho).toBe(404);
    }
    const html = await (await request.get('/')).text();
    const scripts = [...html.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]);
    expect(scripts.length).toBeGreaterThan(0);
    for (const s of scripts.slice(0, 3)) {
      expect(await (await request.get(s)).text(), s).not.toContain('sourceMappingURL=');
    }
  });

  test('mídia com cache longo', async ({ request }) => {
    const r = await request.get('/media/hero/poster.jpg');
    expect(r.headers()['cache-control']).toContain('immutable');
  });
});
