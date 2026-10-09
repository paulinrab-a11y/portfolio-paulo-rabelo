import manifesto from '@/data/media.json';

interface Trecho {
  mp4: string;
  webm?: string;
  duration: number;
  width?: number;
  height?: number;
  /** Timecode de entrada e saída na origem */
  in?: string;
  out?: string;
}

interface ImagemMidia {
  src: string;
  fallback?: string;
  width: number;
  height: number;
  label?: string;
}

export interface Midia {
  orientation: 'horizontal' | 'vertical' | 'imagem';
  width: number;
  height: number;
  poster: { avif: string; jpg: string };
  preview: Trecho | null;
  full: Trecho | null;
  images?: ImagemMidia[];
  /** Outros vídeos do mesmo trabalho (ex.: o segundo UGC) */
  extra?: Array<Omit<Midia, 'extra'> & { label?: string }>;
  source?: string;
}

const tabela = manifesto as unknown as Record<string, Midia>;

/** Mídia de uma pasta de public/media. Lança erro se não existir (o teste de conteúdo pega antes). */
export function midia(slug: string, fonte: Record<string, Midia> = tabela): Midia {
  const m = fonte[slug];
  if (!m) throw new Error(`Mídia "${slug}" não está em src/data/media.json`);
  return m;
}

export function temMidia(slug: string, fonte: Record<string, Midia> = tabela): boolean {
  return slug in fonte;
}

/**
 * Fonte para o otimizador do Next (next/image sem `unoptimized`). Ele não
 * reduz AVIF: devolve o original inteiro em qualquer largura. Então, quando
 * existe a versão JPG/PNG, ela é a fonte, e o otimizador entrega AVIF ou WebP
 * no tamanho certo (o retrato de 750 px cai de 174 KB para 49 KB).
 */
export function fonteParaOtimizar(img: { src: string; fallback?: string }): string {
  return img.src.endsWith('.avif') && img.fallback ? img.fallback : img.src;
}

/** Vídeo tem prévia em movimento? Imagens não ganham o rótulo "Assistir". */
export function ehVideo(m: Midia): boolean {
  return m.preview !== null || m.full !== null;
}

/** Proporção para reservar espaço antes do carregamento (evita CLS) */
export function proporcao(m: Pick<Midia, 'width' | 'height'>): string {
  return `${m.width} / ${m.height}`;
}

export function todasAsMidias(fonte: Record<string, Midia> = tabela): Array<[string, Midia]> {
  return Object.entries(fonte);
}
