import { expect, test } from './fixtures';

/** Nenhum erro ou aviso no console nas páginas principais (nem erro de hidratação). */
const rotas = [
  '/',
  '/trabalhos',
  '/trabalhos/podcast-opiniao-segura-laad',
  '/trabalhos/hora-bolas-club',
  '/servicos/editor-de-video',
  '/sobre',
  '/cv',
  '/trabalhos/video',
  '/en',
  '/en/work/websites',
  '/es/servicios/sitios-web',
];

test.describe('console limpo', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('abertura-vista', '1'));
  });

  for (const rota of rotas) {
    test(`sem erro nem aviso em ${rota}`, async ({ page }) => {
      const achados: string[] = [];
      page.on('pageerror', (e) => achados.push(`pageerror: ${e.message}`));
      page.on('console', (m) => {
        if (!['error', 'warning'].includes(m.type())) return;
        // Os vídeos são bloqueados de propósito pelo fixture (fora dos testes @video)
        if (/Failed to load resource|ERR_FAILED|ERR_ABORTED/.test(m.text())) return;
        achados.push(`${m.type()}: ${m.text()}`);
      });
      await page.goto(rota);
      await page.waitForTimeout(500);
      expect(achados).toEqual([]);
    });
  }
});
