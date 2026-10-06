/**
 * Gera a imagem de compartilhamento (WhatsApp, LinkedIn, Instagram) em
 * public/og/home.jpg (e home-en.jpg, home-es.jpg), com as fontes e o CSS do próprio site.
 *
 *   npm run build && npm run start -- -p 3400
 *   node scripts/og.mjs
 *
 * Abre uma página do site, troca o conteúdo pela cartela e tira o print em
 * 1200×630. Só usa o retrato real do Paulo e texto confirmado.
 */
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const BASE = process.env.BASE_URL ?? 'http://localhost:3400';
mkdirSync('public/og', { recursive: true });

const versoes = [
  { arquivo: 'home.jpg', funcao: 'edição · motion · direção de arte' },
  { arquivo: 'home-en.jpg', funcao: 'editing · motion · art direction' },
  { arquivo: 'home-es.jpg', funcao: 'edición · motion · dirección de arte' },
];

const cartelaDe = (funcao) => `
<div style="position:fixed;inset:0;background:#0b0b0c;display:grid;grid-template-columns:1fr 420px;overflow:hidden">
  <div style="padding:56px 0 52px 64px;display:flex;flex-direction:column;justify-content:space-between">
    <p class="rotulo" style="display:flex;align-items:center;gap:12px;color:#f3efe4;font-size:20px">
      <span class="rec-ponto" style="width:16px;height:16px"></span> REC
      <span class="tc" style="color:#9b988f;margin-left:12px">00:00:00:00</span>
    </p>
    <div>
      <h1 class="titulo-display" style="font-size:176px;color:#f3efe4;line-height:0.8">Paulo<br>Rabelo</h1>
      <p style="margin-top:30px;font-family:var(--font-mono);font-size:30px;color:#f3efe4">
        <span class="marca-texto">${funcao}</span>
      </p>
    </div>
    <p class="rotulo" style="color:#9b988f;font-size:18px">São Paulo · BR</p>
  </div>
  <div style="position:relative">
    <img src="/media/retrato/paulo-rabelo.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:55% 62%">
    <span style="position:absolute;top:28px;left:28px;width:34px;height:34px;border-top:3px solid #f3efe4;border-left:3px solid #f3efe4"></span>
    <span style="position:absolute;top:28px;right:28px;width:34px;height:34px;border-top:3px solid #f3efe4;border-right:3px solid #f3efe4"></span>
    <span style="position:absolute;bottom:28px;left:28px;width:34px;height:34px;border-bottom:3px solid #f3efe4;border-left:3px solid #f3efe4"></span>
    <span style="position:absolute;bottom:28px;right:28px;width:34px;height:34px;border-bottom:3px solid #f3efe4;border-right:3px solid #f3efe4"></span>
  </div>
</div>`;

const navegador = await chromium.launch({ channel: 'chrome' });
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
await pagina.emulateMedia({ reducedMotion: 'reduce' });
for (const v of versoes) {
  await pagina.goto(`${BASE}/cv`);
  await pagina.evaluate((html) => {
    document.body.innerHTML = html;
  }, cartelaDe(v.funcao));
  await pagina.evaluate(async () => {
    // As famílias vêm do next/font (nome gerado): carrega as que a cartela usa
    const familia = (sel) => getComputedStyle(document.querySelector(sel)).fontFamily;
    await document.fonts.load(`900 100px ${familia('.titulo-display')}`);
    await document.fonts.load(`400 20px ${familia('.rotulo')}`);
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => i.addEventListener('load', r)))));
  });
  await pagina.screenshot({ path: `public/og/${v.arquivo}`, type: 'jpeg', quality: 86 });
  console.log(`public/og/${v.arquivo}`);
}
await navegador.close();
