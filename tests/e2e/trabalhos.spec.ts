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

  test('/cv oferece o PDF de uma página', async ({ page, request }) => {
    await page.goto('/cv');
    const href = await page.getByRole('link', { name: 'Baixar PDF' }).getAttribute('href');
    expect(href).toBe('/paulo-rabelo-cv.pdf');
    const r = await request.get(href ?? '');
    expect(r.status()).toBe(200);
    expect(r.headers()['content-type']).toContain('application/pdf');
  });

  test('/cv tem o nome completo e Rabelo Design', async ({ page }) => {
    await page.goto('/cv');
    await expect(page.getByRole('heading', { level: 1, name: 'Paulo Vitor Pereira Rabelo' })).toBeVisible();
    await expect(page.getByText(/Rabelo Design/)).toBeVisible();
  });
});

test('o poster do card da página de serviço voa até o topo da página do trabalho', async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || isMobile, 'View Transitions conferida no Chromium de desktop');
  await page.goto('/servicos/editor-de-video');
  // Anota os grupos animados de cada View Transition
  await page.evaluate(() => {
    const w = window as unknown as { grupos: string[] };
    w.grupos = [];
    const original = document.startViewTransition.bind(document);
    document.startViewTransition = ((arg: Parameters<typeof original>[0]) => {
      const t = original(arg);
      t.ready.then(() => {
        for (const a of document.getAnimations()) {
          const pseudo = (a.effect as KeyframeEffect | null)?.pseudoElement;
          if (pseudo?.startsWith('::view-transition-group(')) w.grupos.push(pseudo);
        }
      });
      return t;
    }) as typeof document.startViewTransition;
  });
  // Os cards da lista de trabalhos do serviço (o link do monitor não tem a transição)
  const card = page.locator('main ul a[href^="/trabalhos/"]').first();
  const slug = (await card.getAttribute('href'))?.split('/').pop();
  await card.click();
  await page.waitForURL(new RegExp(`/trabalhos/${slug}$`));
  await expect.poll(() => page.evaluate(() => (window as unknown as { grupos: string[] }).grupos)).toContain(`::view-transition-group(trabalho-${slug})`);
});

test.describe('página de trabalho: monitor de fonte e próximo corte', () => {
  test('o player tem a barra do monitor de fonte com a trilha e a duração', async ({ page }) => {
    await page.goto('/trabalhos/clipe-santxx-azam-mc');
    const barra = page.locator('article p.rotulo').filter({ hasText: 'Fonte' }).first();
    await expect(barra).toContainText('V1');
    await expect(barra).toContainText('00:01:00:00');
  });

  test('rolando até o fim, o vídeo do próximo trabalho avança com a rolagem (jog)', { tag: '@video' }, async ({ page, isMobile, browserName }) => {
    test.skip(isMobile || browserName === 'webkit', 'Jog só no desktop com mouse');
    await page.goto('/trabalhos/clipe-santxx-azam-mc');
    const proximo = page.locator('.proximo-corte');
    await expect(proximo).toHaveAttribute('href', '/trabalhos/visualizer-anjo005');
    const tempo = () => proximo.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime);
    // Chega perto da seção (o vídeo começa a carregar) e depois rola mais um pouco
    await page.evaluate(() => {
      const el = document.querySelector('.proximo-corte') as HTMLElement;
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.9);
    });
    await expect.poll(() => proximo.locator('video').evaluate((v: HTMLVideoElement) => v.readyState)).toBeGreaterThan(0);
    const antes = await tempo();
    await page.evaluate(() => window.scrollBy(0, 400));
    await expect.poll(tempo).toBeGreaterThan(antes + 0.5);
  });

  test('no celular, o próximo corte mostra o quadro parado, sem vídeo', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Comportamento do celular');
    await page.goto('/trabalhos/clipe-santxx-azam-mc');
    const proximo = page.locator('.proximo-corte');
    await proximo.scrollIntoViewIfNeeded();
    await expect(proximo.locator('img').first()).toBeVisible();
    await expect(proximo.locator('video')).toBeHidden();
  });
});

test.describe('serviços: trilha e monitor', () => {
  test('cada serviço da lista tem uma trilha com quadros dos próprios trabalhos', async ({ page }) => {
    await page.goto('/servicos');
    const trilhas = page.locator('.trilha-servico');
    await expect(trilhas).toHaveCount(await page.locator('main ol > li').count());
    for (const n of await trilhas.evaluateAll((ts) => ts.map((t) => t.querySelectorAll('img').length))) {
      expect(n).toBeGreaterThan(0);
      expect(n).toBeLessThanOrEqual(6);
    }
  });

  test('o monitor do serviço mostra um trabalho de categoria principal do serviço', async ({ page }) => {
    await page.goto('/servicos/fotografia');
    await expect(page.getByRole('link', { name: /Eventos/ }).first()).toHaveAttribute('href', '/trabalhos/eventos');
  });

  test('trabalho feito com IA leva o selo também no monitor do serviço e no próximo corte', async ({ page }) => {
    await page.goto('/servicos/video-com-ia');
    const monitor = page.locator('.monitor').first();
    await expect(monitor).toContainText('Feito com IA');
    // Depois do site da MH Phones vem o anúncio da OHC feito com IA
    await page.goto('/trabalhos/site-mh-phones');
    await expect(page.locator('.proximo-corte')).toContainText('Feito com IA');
  });
});
