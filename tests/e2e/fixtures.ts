import { test as base } from '@playwright/test';

/**
 * `test` com os vídeos bloqueados: o site cai no poster, que é o que importa
 * para conteúdo e layout, e o CI não baixa megabytes de vídeo a cada teste.
 * Testes do player usam a tag @video.
 */
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    if (!testInfo.tags.includes('@video')) await page.route(/\.(mp4|webm)(\?.*)?$/, (route) => route.abort());
    await use(page);
  },
});

export { expect } from '@playwright/test';
