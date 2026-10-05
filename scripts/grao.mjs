/**
 * Gera o tile de grão (ruído monocromático) usado em .grao no globals.css.
 * Rode com `node scripts/grao.mjs`. O resultado é determinístico.
 */
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const LADO = 256;
const pixels = Buffer.alloc(LADO * LADO);
let semente = 20261005;
for (let i = 0; i < pixels.length; i += 1) {
  // Gerador congruencial simples: o mesmo tile a cada execução
  semente = (semente * 1664525 + 1013904223) >>> 0;
  pixels[i] = semente >>> 24;
}

mkdirSync('public/textura', { recursive: true });
await sharp(pixels, { raw: { width: LADO, height: LADO, channels: 1 } })
  .webp({ quality: 60 })
  .toFile('public/textura/grao.webp');
console.log('public/textura/grao.webp');
