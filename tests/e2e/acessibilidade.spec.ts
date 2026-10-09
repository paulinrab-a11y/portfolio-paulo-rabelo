import AxeBuilder from '@axe-core/playwright';
import { expect, test } from './fixtures';

/**
 * Auditoria automática (axe, regras WCAG 2.2 A e AA) nas páginas principais.
 * Não substitui teste com leitor de tela, mas pega contraste, nomes de botão,
 * hierarquia de títulos e ARIA inválido antes do merge.
 */
const rotas = [
  '/',
  '/trabalhos',
  '/trabalhos/clipe-santxx-azam-mc',
  '/trabalhos/ugc-com-ia',
  '/trabalhos/hora-bolas-club',
  '/servicos',
  '/servicos/editor-de-video',
  '/sobre',
  '/cv',
  '/trabalhos/marketing',
  '/en',
  '/en/work/clipe-santxx-azam-mc',
  '/es/trabajos/sitios-web',
  '/es/sobre-mi',
  '/zh',
  '/zh/resume',
];

test.describe('acessibilidade', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('abertura-vista', '1'));
  });

  for (const rota of rotas) {
    test(`sem violações WCAG A/AA em ${rota}`, async ({ page }) => {
      await page.goto(rota);
      await page.waitForLoadState('load');
      const resultado = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        // Grão e vinheta são camadas decorativas por cima de tudo (aria-hidden, pointer-events none)
        .exclude('.grao')
        .exclude('.vinheta')
        .analyze();
      const violacoes = resultado.violations.map(
        (v) =>
          `${v.id} (${v.impact}): ${v.nodes
            .map((n) => n.target.join(' '))
            .slice(0, 3)
            .join(' | ')}`,
      );
      expect(violacoes).toEqual([]);
    });
  }
});

test.describe('foco do teclado e cabeçalho fixo (WCAG 2.4.11 e 2.4.12)', () => {
  for (const rota of ['/trabalhos', '/servicos/editor-de-video']) {
    test(`voltando com Shift+Tab, o foco não fica sob o cabeçalho em ${rota}`, async ({ page, isMobile }) => {
      test.skip(isMobile, 'Navegação por teclado: desktop');
      await page.addInitScript(() => sessionStorage.setItem('abertura-vista', '1'));
      await page.goto(rota);
      for (let i = 0; i < 40; i++) await page.keyboard.press('Tab');
      const cobertos: string[] = [];
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press('Shift+Tab');
        const coberto = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement | null;
          // O cabeçalho e o link "Pular para o conteúdo" (fixo, acima de tudo) ficam de fora
          if (!el || el === document.body || el.closest('header') || getComputedStyle(el).position === 'fixed') return null;
          const fundo = (document.querySelector('header') as HTMLElement).getBoundingClientRect().bottom;
          const r = el.getBoundingClientRect();
          return r.top < fundo - 1 ? `${(el.textContent ?? '').trim().slice(0, 30)} (topo ${Math.round(r.top)})` : null;
        });
        if (coberto) cobertos.push(coberto);
      }
      expect(cobertos).toEqual([]);
    });
  }
});
