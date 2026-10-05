/**
 * Grava os sites no ar (celular e desktop) rolando a página, e gera prévia,
 * trecho e poster em public/media/site-<nome>/. Atualiza src/data/media.json.
 *
 *   FFMPEG=/caminho/ffmpeg node scripts/gravar-sites.mjs
 *
 * Usa o Chrome instalado. Um site por vez (máquina com pouca RAM).
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const FFMPEG = process.env.FFMPEG ?? 'ffmpeg';
const SITES = [
  { nome: 'ohc', url: 'https://ohc-seven.vercel.app' },
  { nome: 'passem-a-respeitar', url: 'https://passem-a-respeitar.vercel.app' },
  { nome: 'mh-phones', url: 'https://mh-phones.vercel.app' },
];
const FORMATOS = {
  celular: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  desktop: { viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 },
};
const ROLAGEM_S = 14;

const ff = (...args) => execFileSync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', '-threads', '4', ...args], { stdio: 'inherit' });

async function gravar(site, formato, pasta) {
  const tmp = join(pasta, `tmp-${formato}`);
  mkdirSync(tmp, { recursive: true });
  const cfg = FORMATOS[formato];
  const navegador = await chromium.launch({ channel: 'chrome' });
  const contexto = await navegador.newContext({ ...cfg, locale: 'pt-BR', recordVideo: { dir: tmp, size: cfg.viewport } });
  const pagina = await contexto.newPage();
  const t0 = Date.now();
  await pagina.goto(site.url, { waitUntil: 'networkidle', timeout: 60_000 }).catch(() => {});
  // Aberturas e loaders dos próprios sites: pula se houver botão, senão espera
  await pagina.waitForTimeout(1500);
  const pular = pagina.getByRole('button', { name: /^(pular|skip)/i });
  if (await pular.count())
    await pular
      .first()
      .click({ timeout: 2000 })
      .catch(() => {});
  await pagina.waitForTimeout(3000);
  const inicio = (Date.now() - t0) / 1000;
  const altura = await pagina.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
  const passos = ROLAGEM_S * 30;
  for (let i = 0; i <= passos; i += 1) {
    await pagina.evaluate((y) => window.scrollTo(0, y), Math.round((altura * i) / passos));
    await pagina.waitForTimeout(1000 / 30);
  }
  await pagina.waitForTimeout(800);
  await contexto.close();
  await navegador.close();
  const [arquivo] = readdirSync(tmp).filter((f) => f.endsWith('.webm'));
  const bruto = join(pasta, `bruto-${formato}.webm`);
  renameSync(join(tmp, arquivo), bruto);
  rmSync(tmp, { recursive: true, force: true });
  return { bruto, inicio, ...cfg.viewport };
}

const tc = (s) => {
  const f = Math.round(s * 30);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(Math.floor(f / 108000))}:${p(Math.floor(f / 1800) % 60)}:${p(Math.floor(f / 30) % 60)}:${p(f % 30)}`;
};

const manifestoPath = 'src/data/media.json';
const manifesto = JSON.parse(readFileSync(manifestoPath, 'utf8'));

for (const site of SITES) {
  for (const formato of Object.keys(FORMATOS)) {
    const slug = `site-${site.nome}-${formato}`;
    const pasta = join('public', 'media', slug);
    mkdirSync(pasta, { recursive: true });
    console.log(`gravando ${slug}`);
    const { bruto, inicio, width, height } = await gravar(site, formato, pasta);
    // A gravação começa com a página em branco: a prévia parte de quando a rolagem começa
    const inicioPrevia = Math.round((inicio + 0.3) * 10) / 10;
    const duracaoPrevia = 7;
    const duracaoFull = ROLAGEM_S;
    const pub = (f) => `/media/${slug}/${f}`;
    ff('-ss', String(inicioPrevia), '-t', String(duracaoPrevia), '-i', bruto, '-an', '-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(pasta, 'preview.mp4'));
    ff('-ss', String(inicioPrevia), '-t', String(duracaoPrevia), '-i', bruto, '-an', '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0', join(pasta, 'preview.webm'));
    ff('-ss', String(inicioPrevia), '-t', String(duracaoFull), '-i', bruto, '-an', '-c:v', 'libx264', '-crf', '24', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(pasta, 'full.mp4'));
    ff('-ss', String(inicioPrevia), '-i', bruto, '-frames:v', '1', join(pasta, 'poster.png'));
    await sharp(join(pasta, 'poster.png')).avif({ quality: 55 }).toFile(join(pasta, 'poster.avif'));
    await sharp(join(pasta, 'poster.png')).jpeg({ quality: 80, mozjpeg: true }).toFile(join(pasta, 'poster.jpg'));
    rmSync(join(pasta, 'poster.png'));
    rmSync(bruto);
    manifesto[slug] = {
      orientation: formato === 'celular' ? 'vertical' : 'horizontal',
      width,
      height,
      poster: { avif: pub('poster.avif'), jpg: pub('poster.jpg') },
      preview: { mp4: pub('preview.mp4'), webm: pub('preview.webm'), duration: duracaoPrevia, in: tc(inicioPrevia), out: tc(inicioPrevia + duracaoPrevia) },
      full: { mp4: pub('full.mp4'), duration: duracaoFull, width, height, in: tc(inicioPrevia), out: tc(inicioPrevia + duracaoFull) },
      source: `gravação ao vivo de ${site.url} em ${new Date().toISOString().slice(0, 10)}`,
    };
    writeFileSync(manifestoPath, `${JSON.stringify(manifesto, null, 2)}\n`);
  }
}
console.log('pronto');
