/**
 * Gera public/paulo-rabelo-cv.pdf a partir da própria página /cv (versão de
 * impressão), para o PDF nunca ficar diferente do site.
 *
 *   npm run build && npm run start -- -p 3400
 *   node scripts/cv-pdf.mjs
 */
import { chromium } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:3400';
const navegador = await chromium.launch({ channel: 'chrome' });
const pagina = await navegador.newPage();
await pagina.goto(`${BASE}/cv`, { waitUntil: 'networkidle' });
await pagina.evaluate(() => document.fonts.ready);
await pagina.pdf({ path: 'public/paulo-rabelo-cv.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await navegador.close();
console.log('public/paulo-rabelo-cv.pdf');
