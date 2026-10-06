import { expect, test } from './fixtures';

test.describe('abas de trabalhos', () => {
  test('cada aba tem link próprio e mostra só os trabalhos dela', async ({ page }) => {
    await page.goto('/trabalhos/sites');
    await expect(page.getByRole('heading', { level: 1, name: 'Sites' })).toBeVisible();
    await expect(page.locator('[data-aba="sites"]')).toHaveAttribute('aria-current', 'page');
    const itens = page.locator('[data-item]');
    await expect(itens).toHaveCount(3);
    await expect(page.getByRole('link', { name: /Site OHC Motors/ })).toBeVisible();

    await page.locator('[data-aba="video"]').click();
    await expect(page).toHaveURL(/\/trabalhos\/video$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Vídeo' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Clipe Santxx e Azam MC/ })).toBeVisible();
    await expect(page.getByRole('link', { name: /Site OHC Motors/ })).toHaveCount(0);

    await page.locator('[data-aba="marketing"]').click();
    await expect(page).toHaveURL(/\/trabalhos\/marketing$/);
    await expect(page.getByRole('link', { name: /Rebranding Hora Bolas/ })).toBeVisible();
  });

  test('trabalho que é vídeo e marketing aparece nas duas abas', async ({ page }) => {
    for (const aba of ['video', 'marketing']) {
      await page.goto(`/trabalhos/${aba}`);
      await expect(page.getByRole('link', { name: /UGC com IA/ })).toBeVisible();
    }
  });

  test('as abas estão no menu principal', async ({ page, isMobile }) => {
    test.skip(isMobile, 'No celular o menu tem teste próprio');
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Principal' }).first();
    for (const nome of ['Vídeo', 'Sites', 'Marketing']) await expect(nav.getByRole('link', { name: nome })).toBeVisible();
  });
});

test.describe('idiomas', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('abertura-vista', '1'));
  });

  test('inglês e espanhol com html lang, textos e links no idioma', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('link', { name: 'See my work' })).toBeVisible();
    await expect(page.locator('#contato').getByRole('heading', { name: /Work with me/i })).toBeAttached();

    await page.goto('/es/trabajos/sitios-web');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1, name: 'Sitios web' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Sitio web de OHC Motors/ })).toBeVisible();
  });

  test('a bandeira leva à mesma página no outro idioma', async ({ page }) => {
    await page.goto('/trabalhos/clipe-santxx-azam-mc');
    await page.locator('header a[data-idioma="en"]').click();
    await expect(page).toHaveURL(/\/en\/work\/clipe-santxx-azam-mc$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Santxx and Azam MC music video' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'What I did' })).toBeVisible();

    await page.locator('header a[data-idioma="es"]').click();
    await expect(page).toHaveURL(/\/es\/trabajos\/clipe-santxx-azam-mc$/);
    await expect(page.getByRole('heading', { name: 'Lo que hice' })).toBeVisible();

    await page.locator('header a[data-idioma="pt"]').click();
    await expect(page).toHaveURL(/\/trabalhos\/clipe-santxx-azam-mc$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  });

  test('o idioma atual fica marcado no seletor', async ({ page }) => {
    await page.goto('/es');
    await expect(page.locator('header a[data-idioma="es"]')).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('header a[data-idioma="pt"]')).not.toHaveAttribute('aria-current', 'true');
  });

  test('hreflang liga as três versões de cada página', async ({ page }) => {
    await page.goto('/en/services/video-editor');
    const links = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((els) => Object.fromEntries(els.map((e) => [e.getAttribute('hreflang'), new URL(e.getAttribute('href') ?? '', location.href).pathname])));
    expect(links).toMatchObject({
      'pt-BR': '/servicos/editor-de-video',
      en: '/en/services/video-editor',
      es: '/es/servicios/editor-de-video',
      'x-default': '/servicos/editor-de-video',
    });
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/services\/video-editor$/);
  });

  test('selo de IA, WhatsApp e CV no idioma', async ({ page, request }) => {
    await page.goto('/en/work/ugc-com-ia');
    await expect(page.getByText('Made with AI').first()).toBeVisible();

    await page.goto('/es/sobre-mi');
    const zap = await page.getByRole('link', { name: 'Escríbeme por WhatsApp' }).getAttribute('href');
    expect(decodeURIComponent(zap ?? '')).toContain('¡Hola, Paulo! Vi tu portafolio');

    await page.goto('/en/resume');
    const pdf = await page.getByRole('link', { name: 'Download PDF' }).getAttribute('href');
    expect(pdf).toBe('/paulo-rabelo-cv-en.pdf');
    expect((await request.get(pdf ?? '')).status()).toBe(200);
  });

  test('endereço inexistente em qualquer idioma responde 404', async ({ page }) => {
    expect((await page.goto('/en/work/nao-existe'))?.status()).toBe(404);
    expect((await page.goto('/qualquer-coisa'))?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: /Sem sinal/i })).toBeVisible();
  });
});
