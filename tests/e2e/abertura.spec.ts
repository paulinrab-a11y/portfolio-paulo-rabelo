import { expect, type Page, test } from './fixtures';

/**
 * Sem o JS do React, só o script inline do layout cuida da abertura (como
 * num celular lento antes da hidratação). Deixa os testes de toque e de
 * "Pular" independentes da velocidade da máquina.
 */
// Só os .js: o CSS do Next 16 também fica em /_next/static/chunks
const semReact = (page: Page) => page.route(/\/_next\/static\/chunks\/.*\.js(\?|$)/, (rota) => rota.abort());

test.describe('abertura', () => {
  test('aparece na primeira visita, some em até 1,8 s e não volta na mesma sessão', async ({ page }) => {
    await page.goto('/', { waitUntil: 'commit' });
    const abertura = page.getByTestId('abertura');
    await expect(abertura).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pular' })).toBeVisible();
    await expect(abertura).toBeHidden({ timeout: 3_000 });
    await page.reload();
    await expect(abertura).toBeHidden();
  });

  test('clique em Pular encerra na hora, mesmo antes do React', async ({ page }) => {
    await semReact(page);
    await page.goto('/', { waitUntil: 'commit' });
    await page.getByRole('button', { name: 'Pular' }).click();
    await expect(page.getByTestId('abertura')).toBeHidden({ timeout: 300 });
  });

  test('tocar na abertura não aciona o link que está por baixo', async ({ page, isMobile }) => {
    await semReact(page);
    await page.goto('/', { waitUntil: 'commit' });
    const abertura = page.getByTestId('abertura');
    await expect(abertura).toBeVisible();
    // A bandeira do inglês fica sob a abertura: o toque deve só pular
    const caixa = await page.locator('header a[data-idioma="en"]').boundingBox();
    if (!caixa) throw new Error('bandeira sem posição');
    const [x, y] = [caixa.x + caixa.width / 2, caixa.y + caixa.height / 2];
    if (isMobile) await page.touchscreen.tap(x, y);
    else await page.mouse.click(x, y);
    await expect(abertura).toBeHidden({ timeout: 300 });
    // A bandeira é navegação completa: dá tempo de a página nova chegar
    await page.waitForTimeout(1500);
    expect(new URL(page.url()).pathname).toBe('/');
  });

  test('depois da abertura, a página volta ao normal (voltar à home não espera de novo)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('abertura')).toBeHidden({ timeout: 3_000 });
    await expect(page.locator('html')).not.toHaveAttribute('data-abertura', /.*/, { timeout: 7_000 });
  });

  test('não aparece fora da home', async ({ page }) => {
    await page.goto('/trabalhos');
    await expect(page.getByTestId('abertura')).toHaveCount(0);
  });

  test('o herói já está renderizado por baixo e o poster tem prioridade', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: /Paulo\s+Rabelo/i })).toBeAttached();
    const poster = page.locator('section[aria-labelledby="heroi-nome"] img').first();
    await expect(poster).toHaveAttribute('fetchpriority', 'high');
  });
});
