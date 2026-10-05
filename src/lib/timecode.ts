/** Quadros por segundo do timecode exibido no site (mesmo do vídeo mestre) */
const FPS = 30;

const pad = (n: number) => String(n).padStart(2, '0');

/** Milissegundos para `HH:MM:SS:FF`. Calculado pelo tempo, não por quadros de tela. */
export function timecode(ms: number, fps = FPS): string {
  const total = Math.max(0, Math.floor((ms / 1000) * fps));
  const quadros = total % fps;
  const segundos = Math.floor(total / fps);
  return [Math.floor(segundos / 3600), Math.floor(segundos / 60) % 60, segundos % 60, quadros].map(pad).join(':');
}

/** `HH:MM:SS:FF` para segundos. Devolve NaN se o formato não bater. */
export function segundosDoTimecode(tc: string, fps = FPS): number {
  const m = /^(\d{2}):(\d{2}):(\d{2})[:;](\d{2})$/.exec(tc.trim());
  if (!m) return Number.NaN;
  const [h, min, s, f] = m.slice(1).map(Number);
  return h * 3600 + min * 60 + s + f / fps;
}

/** Duração curta para rótulos: `0:42`, `12:05` */
export function duracaoCurta(segundos: number): string {
  const s = Math.max(0, Math.round(segundos));
  return `${Math.floor(s / 60)}:${pad(s % 60)}`;
}
