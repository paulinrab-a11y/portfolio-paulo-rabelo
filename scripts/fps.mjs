/**
 * Mede quadros por segundo rolando a home inteira em 12 s, com a CPU 4x mais
 * lenta (critério de jurado do brief: 60 fps em celular intermediário).
 * Rode com o servidor em localhost:3400: node scripts/fps.mjs
 */
import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'chrome' });
for (const [nome, cfg, cpu] of [
  ['celular (CPU 4x)', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, 4],
  ['desktop (CPU 4x)', { viewport: { width: 1440, height: 900 } }, 4],
]) {
  const ctx = await b.newContext(cfg);
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem('abertura-vista', '1'));
  await p.goto('http://localhost:3400/');
  await p.waitForTimeout(2500);
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  const r = await p.evaluate(async () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    const dur = 12000;
    const tempos = [];
    const t0 = performance.now();
    await new Promise((fim) => {
      const passo = (t) => {
        tempos.push(t);
        const k = (t - t0) / dur;
        window.scrollTo(0, Math.min(1, k) * total);
        if (k < 1) requestAnimationFrame(passo);
        else fim();
      };
      requestAnimationFrame(passo);
    });
    const deltas = tempos.slice(1).map((t, i) => t - tempos[i]);
    const ord = [...deltas].sort((a, b) => a - b);
    return { fps: Math.round((deltas.length / ((tempos.at(-1) - tempos[0]) / 1000)) * 10) / 10, p95ms: Math.round(ord[Math.floor(ord.length * 0.95)]), acima50ms: deltas.filter((d) => d > 50).length, quadros: deltas.length };
  });
  console.log(nome, JSON.stringify(r));
  await ctx.close();
}
await b.close();
