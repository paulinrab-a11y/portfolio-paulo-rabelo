import { expect, test } from './fixtures';

test.describe('abertura', () => {
  test('aparece na primeira visita, some em até 1,8 s e não volta na mesma sessão', async ({ page }) => {
    await page.goto('/');
    const abertura = page.getByTestId('abertura');
    await expect(abertura).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pular' })).toBeVisible();
    await expect(abertura).toBeHidden({ timeout: 2_500 });
    await page.reload();
    await expect(abertura).toBeHidden();
  });

  test('clique em Pular encerra na hora', async ({ page }) => {
    // Clica assim que o HTML chega: esperar o load inteiro deixaria a abertura terminar sozinha
    await page.goto('/', { waitUntil: 'commit' });
    await page.getByRole('button', { name: 'Pular' }).click();
    await expect(page.getByTestId('abertura')).toBeHidden({ timeout: 300 });
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
