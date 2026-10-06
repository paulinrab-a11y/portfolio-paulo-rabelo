/**
 * Gera o PDF do CV em cada idioma a partir da própria página (versão de
 * impressão), para o PDF nunca ficar diferente do site:
 * public/paulo-rabelo-cv.pdf (/cv), -en.pdf (/en/resume), -es.pdf (/es/cv) e -zh.pdf (/zh/resume).
 *
 *   npm run build && npm run start -- -p 3400
 *   node scripts/cv-pdf.mjs
 */
import { chromium } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:3400';
const versoes = [
  { rota: '/cv', arquivo: 'paulo-rabelo-cv.pdf' },
  { rota: '/en/resume', arquivo: 'paulo-rabelo-cv-en.pdf' },
  { rota: '/es/cv', arquivo: 'paulo-rabelo-cv-es.pdf' },
  { rota: '/zh/resume', arquivo: 'paulo-rabelo-cv-zh.pdf' },
];

const navegador = await chromium.launch({ channel: 'chrome' });
const pagina = await navegador.newPage();
for (const v of versoes) {
  await pagina.goto(`${BASE}${v.rota}`, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.pdf({ path: `public/${v.arquivo}`, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log(`public/${v.arquivo}`);
}
await navegador.close();
