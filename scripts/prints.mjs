/**
 * Prints de conferência visual contra o servidor local (`npm run start -- -p 3400`).
 * Saída em reports/prints/ (fora do Git). Rode com `node scripts/prints.mjs`.
 */
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:3400';
const SAIDA = 'reports/prints';
mkdirSync(SAIDA, { recursive: true });

const formatos = {
  desktop: { viewport: { width: 1440, height: 900 } },
  celular: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const navegador = await chromium.launch({ channel: 'chrome' });
for (const [nome, cfg] of Object.entries(formatos)) {
  const ctx = await navegador.newContext({ ...cfg, locale: 'pt-BR' });
  const pagina = await ctx.newPage();

  // Abertura (primeira visita): print no meio dela
  await pagina.goto(`${BASE}/`);
  await pagina.waitForTimeout(700);
  await pagina.screenshot({ path: `${SAIDA}/${nome}-00-abertura.jpg`, quality: 80 });
  await pagina.waitForTimeout(2000);

  const home = [
    ['01-heroi', 0],
    ['02-monitor', 0.5],
    ['03-manifesto', 1.1],
  ];
  for (const [arquivo, telas] of home) {
    await pagina.evaluate((t) => window.scrollTo(0, t * window.innerHeight), telas);
    await pagina.waitForTimeout(1600);
    await pagina.screenshot({ path: `${SAIDA}/${nome}-${arquivo}.jpg`, quality: 80 });
  }
  for (const [arquivo, seletor, deslocamento] of [
    ['04-selecionados', '#trabalhos', 0],
    ['05-timeline', '#timeline-titulo', -40],
    ['06-timeline-meio', '#timeline-titulo', 1400],
    ['07-creditos', '#creditos-titulo', -200],
    ['08-sobre', '#sobre-titulo', -120],
    ['09-fim', '#contato', 0],
  ]) {
    await pagina.evaluate(
      ([s, d]) => {
        const el = document.querySelector(s);
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + d);
      },
      [seletor, deslocamento],
    );
    await pagina.waitForTimeout(1500);
    if (arquivo === '04-selecionados' && nome === 'desktop') {
      const linha = pagina.locator('#trabalhos ol > li a').nth(1);
      const caixa = await linha.boundingBox();
      if (caixa) await pagina.mouse.move(caixa.x + caixa.width * 0.45, caixa.y + caixa.height / 2);
      await pagina.waitForTimeout(1200);
    }
    await pagina.screenshot({ path: `${SAIDA}/${nome}-${arquivo}.jpg`, quality: 80 });
  }

  for (const [arquivo, rota] of [
    ['10-trabalhos', '/trabalhos'],
    ['11-case-horizontal', '/trabalhos/podcast-opiniao-segura-laad'],
    ['12-case-vertical', '/trabalhos/ugc-com-ia'],
    ['13-case-imagens', '/trabalhos/hora-bolas-club'],
    ['14-sobre', '/sobre'],
    ['15-cv', '/cv'],
    ['16-404', '/nao-existe'],
  ]) {
    await pagina.goto(`${BASE}${rota}`);
    await pagina.waitForTimeout(1500);
    await pagina.screenshot({ path: `${SAIDA}/${nome}-${arquivo}.jpg`, quality: 80 });
  }
  await ctx.close();
}
await navegador.close();
console.log(`prints em ${SAIDA}`);
