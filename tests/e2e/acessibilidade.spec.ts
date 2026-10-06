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
