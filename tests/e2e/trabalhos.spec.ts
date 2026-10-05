import { expect, test } from './fixtures';

test.describe('/trabalhos', () => {
  test('filtro por categoria mostra só os daquela categoria', async ({ page }) => {
    await page.goto('/trabalhos');
    const visiveis = page.locator('[data-item]:visible');
    const total = await visiveis.count();
    expect(total).toBeGreaterThan(6);
    await page.getByRole('button', { name: /^IA/ }).click();
    await expect(page.getByRole('button', { name: /^IA/ })).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => visiveis.count()).toBeLessThan(total);
    // Todo trabalho de IA leva o selo
    const n = await visiveis.count();
    for (let i = 0; i < n; i += 1) await expect(visiveis.nth(i).getByText('Feito com IA')).toBeVisible();
    await page.getByRole('button', { name: /^Todos/ }).click();
    await expect.poll(() => visiveis.count()).toBe(total);
  });

  test('filtro e modo ficam na URL: link compartilhado e voltar mantêm a escolha', async ({ page }) => {
    await page.goto('/trabalhos');
    await page.getByRole('button', { name: /^IA/ }).click();
    await page.getByRole('button', { name: 'Grade' }).click();
    await expect(page).toHaveURL(/\/trabalhos\?categoria=ia&modo=grade$/);
    await page.locator('[data-item]:visible a').first().click();
    await expect(page).toHaveURL(/\/trabalhos\/[a-z0-9-]+$/);
    await page.goBack();
    await expect(page.getByRole('button', { name: /^IA/ })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('ul[data-modo="grade"]')).toBeVisible();
    await page.goto('/trabalhos?categoria=sites');
    await expect(page.getByRole('button', { name: /^Sites/ })).toHaveAttribute('aria-pressed', 'true');
  });

  test('alterna entre lista e grade', async ({ page }) => {
    await page.goto('/trabalhos');
    await page.getByRole('button', { name: 'Grade' }).click();
    await expect(page.locator('ul[data-modo="grade"]')).toBeVisible();
    await page.getByRole('button', { name: 'Lista' }).click();
    await expect(page.locator('ul[data-modo="lista"]')).toBeVisible();
  });

  test('página do trabalho: player, créditos, texto e próximo', async ({ page }) => {
    await page.goto('/trabalhos/clipe-santxx-azam-mc');
    await expect(page.getByRole('heading', { level: 1, name: 'Clipe Santxx e Azam MC' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Assistir/ })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Créditos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'O que eu fiz' })).toBeVisible();
    await page.getByRole('navigation', { name: 'Próximo trabalho' }).getByRole('link').click();
    await expect(page).toHaveURL(/\/trabalhos\/(?!clipe-santxx-azam-mc)[a-z0-9-]+$/);
  });

  test('trabalho com IA mostra o selo', async ({ page }) => {
    await page.goto('/trabalhos/ugc-com-ia');
    await expect(page.getByText('Feito com IA').first()).toBeVisible();
  });

  test('slug inexistente responde 404', async ({ page }) => {
    const resposta = await page.goto('/trabalhos/nao-existe');
    expect(resposta?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: /Sem sinal/i })).toBeVisible();
  });

  test('o player toca o vídeo', { tag: '@video' }, async ({ page }) => {
    await page.goto('/trabalhos/clipe-santxx-azam-mc');
    await page.getByRole('button', { name: /Assistir/ }).click();
    await expect(page.getByRole('button', { name: 'Pausar' })).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator('article video')
          .first()
          .evaluate((v: HTMLVideoElement) => v.currentTime),
      )
      .toBeGreaterThan(0.2);
  });
});

test.describe('outras páginas', () => {
  test('/sobre tem experiência e formação, sem Rabelo Design', async ({ page }) => {
    await page.goto('/sobre');
    await expect(page.getByRole('heading', { name: 'OHC Motors' })).toBeVisible();
    await expect(page.getByText(/Universidade São Judas Tadeu/)).toBeVisible();
    await expect(page.getByText('Rabelo Design')).toHaveCount(0);
  });

  test('/sobre tem o retrato e a experiência que rola', async ({ page }) => {
    await page.goto('/sobre');
    await expect(page.getByRole('img', { name: /Paulo Rabelo sentado/ })).toBeVisible();
    await expect(page.locator('[data-indice]').first()).toHaveAttribute('data-ativa', 'true');
  });

  test('/servicos lista os serviços e cada página tem trabalhos e dados estruturados', async ({ page }) => {
    await page.goto('/servicos');
    await expect(page.getByRole('heading', { level: 1, name: 'Serviços' })).toBeVisible();
    await page.getByRole('link', { name: /Editor de vídeo em São Paulo/ }).click();
    await expect(page).toHaveURL(/\/servicos\/editor-de-video$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Editor de vídeo em São Paulo' })).toBeVisible();
    await expect(page.locator('main ul a[href^="/trabalhos/"]').first()).toBeVisible();
    const blocos = await page.locator('script[type="application/ld+json"]').allTextContents();
    const tipos = blocos.flatMap((b) => [JSON.parse(b)].flat().map((x: { '@type': string }) => x['@type']));
    expect(tipos).toEqual(expect.arrayContaining(['Person', 'Service', 'BreadcrumbList']));
  });

  test('página de trabalho liga aos serviços relacionados', async ({ page }) => {
    await page.goto('/trabalhos/podcast-opiniao-segura-laad');
    await expect(page.getByRole('link', { name: 'Edição de podcast' }).first()).toHaveAttribute('href', '/servicos/edicao-de-podcast');
  });

  test('/cv tem o nome completo e Rabelo Design', async ({ page }) => {
    await page.goto('/cv');
    await expect(page.getByRole('heading', { level: 1, name: 'Paulo Vitor Pereira Rabelo' })).toBeVisible();
    await expect(page.getByText(/Rabelo Design/)).toBeVisible();
  });
});
