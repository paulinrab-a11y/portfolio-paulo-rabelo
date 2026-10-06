import { expect, test } from './fixtures';

test.describe('home', () => {
  test.beforeEach(async ({ page }) => {
    // Pula a abertura: ela tem teste próprio
    await page.addInitScript(() => sessionStorage.setItem('abertura-vista', '1'));
  });

  test('em segundos: quem é, trabalho em movimento e como chamar', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /Paulo\s+Rabelo/i })).toBeVisible();
    await expect(page.getByText('edição · motion · direção de arte').first()).toBeAttached();
    await expect(page.getByRole('link', { name: 'Ver trabalhos' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Falar comigo' })).toBeVisible();
    await expect(page.getByTestId('abertura')).toBeHidden();
  });

  test('6 trabalhos selecionados com link para a página de cada um', async ({ page }) => {
    await page.goto('/');
    const itens = page.locator('#trabalhos ol > li');
    await expect(itens).toHaveCount(6);
    await expect(itens.first().getByRole('link')).toHaveAttribute('href', /^\/trabalhos\/[a-z0-9-]+$/);
  });

  test('contato: WhatsApp com a mensagem, e-mail, LinkedIn e Instagram', async ({ page }) => {
    await page.goto('/');
    const fim = page.locator('#contato');
    await expect(fim.getByRole('heading', { name: /Trabalhe comigo/i })).toBeAttached();
    const zap = await fim.getByRole('link', { name: /WhatsApp/ }).getAttribute('href');
    expect(decodeURIComponent(zap ?? '')).toBe('https://wa.me/5511975231957?text=Oi, Paulo! Vi seu portfólio e quero falar sobre um projeto.');
    await expect(fim.getByRole('link', { name: /paulinrab@gmail.com/ })).toHaveAttribute('href', 'mailto:paulinrab@gmail.com');
    await expect(fim.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', /linkedin\.com\/in\/paulinrab/);
    await expect(fim.getByRole('link', { name: /whynotvisuals/ })).toBeAttached();
  });

  test('o timecode do cabeçalho anda com a rolagem e termina em FIM', async ({ page }) => {
    await page.goto('/');
    const tc = page.getByTestId('timecode-cabecalho');
    await expect(tc).toHaveText('00:00:00:00');
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(tc).toHaveText('FIM');
  });

  test('clientes e artistas em créditos', async ({ page }) => {
    await page.goto('/');
    const creditos = page.getByRole('region', { name: 'Lista de clientes e artistas' });
    for (const nome of ['OHC Motors', 'DDPAI', 'Hora Bolas Club', 'Podcast Opinião Segura', 'Anjo005']) {
      await expect(creditos.getByText(nome, { exact: true }).first()).toBeAttached();
    }
  });

  test('sem largura extra: a página não abre com zoom de afastamento no celular', async ({ page }) => {
    for (const rota of ['/', '/trabalhos', '/trabalhos/ugc-com-ia', '/sobre', '/cv']) {
      await page.goto(rota);
      const [largura, visivel] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      expect(largura, rota).toBeLessThanOrEqual(visivel);
    }
  });

  test('menu do celular abre, fecha com Esc e fecha ao navegar', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'O menu em <details> só aparece no celular');
    await page.goto('/');
    const menu = page.locator('header details');
    await menu.locator('summary').click();
    await expect(menu).toHaveAttribute('open', '');
    await expect(menu.getByRole('link', { name: /Marketing/ })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveAttribute('open', '');
    await menu.locator('summary').click();
    await menu.getByRole('link', { name: /Sites/ }).click();
    await expect(page).toHaveURL(/\/trabalhos\/sites$/);
    await expect(menu).not.toHaveAttribute('open', '');
  });

  test('timeline: setas do teclado trocam o clipe no monitor', async ({ page, isMobile }) => {
    test.skip(isMobile, 'No celular a timeline vira faixas com toque');
    await page.goto('/');
    const primeiro = page.locator('section.so-movimento .lg\\:block [data-clipe="0"]');
    await primeiro.focus();
    await expect(primeiro).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('section.so-movimento .lg\\:block [data-clipe="1"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('section.so-movimento .lg\\:block [data-clipe="1"]')).toBeFocused();
  });

  test('JSON-LD de pessoa com o nome completo', async ({ page }) => {
    await page.goto('/');
    const ld = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}');
    expect(ld['@type']).toBe('Person');
    expect(ld.name).toBe('Paulo Vitor Pereira Rabelo');
  });
});
