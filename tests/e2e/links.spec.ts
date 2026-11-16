import { expect, test } from './fixtures';

test('links: os quatro canais da live, Discord, Pix e o site', async ({ page }) => {
  await page.goto('/links');
  await expect(page.getByRole('heading', { level: 1, name: 'Paulinrab' })).toBeVisible();
  const canais = page.locator('section[aria-labelledby="canais"] li a');
  await expect(canais).toHaveCount(4);
  const hosts = ['kick.com', 'youtube.com', 'twitch.tv', 'tiktok.com'];
  for (const [i, host] of hosts.entries()) await expect(canais.nth(i)).toHaveAttribute('href', new RegExp(`^https://(www\\.)?${host.replaceAll('.', '\\.')}/`));
  // Lives de GTA passam no canal @paulinrabstu
  await expect(canais.nth(1)).toHaveAttribute('href', 'https://www.youtube.com/@paulinrabstu/live');
  await expect(page.getByRole('link', { name: /Entrar no Discord/ })).toHaveAttribute('href', /^https:\/\/discord\.gg\//);
  await expect(page.getByRole('link', { name: /Mandar um Pix/ })).toHaveAttribute('href', 'https://livepix.gg/paulinrab');
  await expect(page.getByRole('link', { name: 'Trabalhos' }).last()).toHaveAttribute('href', '/trabalhos');
});

test('links: imagem de compartilhamento e entrada no sitemap', async ({ page, request }) => {
  await page.goto('/links');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\/home\.jpg$/);
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'Paulo Rabelo');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toMatch(/<loc>[^<]+\/links<\/loc>/);
});
