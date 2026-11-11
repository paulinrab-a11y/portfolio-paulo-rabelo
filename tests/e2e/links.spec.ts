import { expect, test } from './fixtures';

test('links: os quatro canais da live, Discord, Pix e o site', async ({ page }) => {
  await page.goto('/links');
  await expect(page.getByRole('heading', { level: 1, name: 'Paulinrab' })).toBeVisible();
  const canais = page.locator('section[aria-labelledby="canais"] li a');
  await expect(canais).toHaveCount(4);
  const hosts = ['kick.com', 'youtube.com', 'twitch.tv', 'tiktok.com'];
  for (const [i, host] of hosts.entries()) await expect(canais.nth(i)).toHaveAttribute('href', new RegExp(`^https://(www\\.)?${host.replaceAll('.', '\\.')}/`));
  await expect(page.getByRole('link', { name: /Entrar no Discord/ })).toHaveAttribute('href', /^https:\/\/discord\.gg\//);
  await expect(page.getByRole('link', { name: /Mandar um Pix/ })).toHaveAttribute('href', 'https://livepix.gg/paulinrab');
  await expect(page.getByRole('link', { name: 'Trabalhos' }).last()).toHaveAttribute('href', '/trabalhos');
});
