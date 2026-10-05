import { expect, test } from './fixtures';

test.describe('movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' });

  test('sem abertura, timeline vira lista e nada fica escondido esperando animação', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('abertura')).toBeHidden();
    await expect(page.locator('section.so-reduzido')).toBeVisible();
    await expect(page.locator('section.so-movimento')).toBeHidden();

    // Rola a página inteira e confere que todo texto visível está opaco
    const altura = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < altura; y += 700) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(60);
    }
    const escondidos = await page.evaluate(() =>
      [...document.querySelectorAll('main h1, main h2, main p, main a')]
        .filter((el) => el.closest('.so-movimento, .abertura, .creditos-duplicata, [hidden]') === null)
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .filter((el) => Number(getComputedStyle(el).opacity) < 0.99)
        .map((el) => el.textContent?.slice(0, 40)),
    );
    expect(escondidos).toEqual([]);
  });

  test('créditos e grão parados', async ({ page }) => {
    await page.goto('/');
    const faixa = await page.evaluate(() => getComputedStyle(document.querySelector('.creditos-faixa') as Element).animationName);
    expect(faixa).toBe('none');
    const grao = await page.evaluate(() => getComputedStyle(document.querySelector('.grao') as Element, '::after').animationName);
    expect(grao).toBe('none');
  });

  test('a função aparece inteira, sem digitação', async ({ page }) => {
    await page.goto('/');
    const clip = await page.locator('.digitar-texto').evaluate((el) => getComputedStyle(el).clipPath);
    expect(['none', 'inset(0px)']).toContain(clip);
  });
});

test.describe('sem JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('conteúdo e links funcionam', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /Paulo\s+Rabelo/i })).toBeVisible();
    await expect(page.getByTestId('abertura')).toBeHidden();
    await expect(page.locator('#trabalhos ol > li')).toHaveCount(6);
    await page.goto('/trabalhos');
    await expect(page.locator('[data-item]')).not.toHaveCount(0);
  });
});
