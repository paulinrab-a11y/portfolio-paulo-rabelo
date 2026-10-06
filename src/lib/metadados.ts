import type { Metadata, Viewport } from 'next';
import { codigoHtml, type Idioma, idiomas, localeOg } from '@/data/idiomas';
import { t } from './i18n';
import { alternativas, caminho, type Ref } from './rotas';
import { SITE_URL } from './site';

/** Imagem de compartilhamento por idioma (gerada por scripts/og.mjs) */
export function imagemOg(lang: Idioma): string {
  return lang === 'pt' ? '/og/home.jpg' : `/og/home-${lang}.jpg`;
}

/** Links da mesma página nos outros idiomas (hreflang) e o canônico */
export function linksIdiomas(lang: Idioma, ref: Ref): NonNullable<Metadata['alternates']> {
  const alt = alternativas(ref);
  const languages: Record<string, string> = Object.fromEntries(idiomas.map((l) => [codigoHtml[l], alt[l]]));
  languages['x-default'] = alt.pt;
  return { canonical: caminho(lang, ref), languages };
}

/**
 * Descrição que cabe no resultado do Google (até 160 caracteres): corta no
 * fim da última frase que cabe; sem frase inteira, na última palavra, com
 * reticências. Em chinês não há espaço entre palavras: corta no caractere.
 */
export function resumir(texto: string, max = 160): string {
  if (texto.length <= max) return texto;
  const trecho = texto.slice(0, max);
  const fimFrase = Math.max(...['. ', '。', '! ', '? '].map((p) => trecho.lastIndexOf(p)));
  if (fimFrase > max / 3) return trecho.slice(0, fimFrase + 1).trim();
  const espaco = trecho.lastIndexOf(' ', max - 1);
  const corte = espaco > max / 2 ? espaco : max - 1;
  return `${trecho.slice(0, corte).replace(/[s,;:、，]+$/, '')}…`;
}

/** Metadados de cada layout raiz */
export function metadadosBase(lang: Idioma): Metadata {
  const tx = t(lang).meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: tx.tituloPadrao, template: '%s · Paulo Rabelo' },
    description: tx.descricao,
    openGraph: {
      type: 'website',
      locale: localeOg[lang],
      alternateLocale: idiomas.filter((l) => l !== lang).map((l) => localeOg[l]),
      siteName: 'Paulo Rabelo',
      url: caminho(lang, { pagina: 'home' }),
      title: tx.tituloOg,
      description: tx.descricao,
      images: [{ url: imagemOg(lang), width: 1200, height: 630, alt: tx.altOg }],
    },
    twitter: { card: 'summary_large_image' },
    alternates: linksIdiomas(lang, { pagina: 'home' }),
  };
}

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

/**
 * Metadados de uma página interna. O Next não mescla o openGraph do layout
 * com o da página: tudo que o layout define precisa ser repetido aqui.
 */
export function metadadosPagina(lang: Idioma, ref: Ref, dados: { titulo: string; descricao: string; imagem?: { url: string; width?: number; height?: number } }): Metadata {
  const descricao = resumir(dados.descricao);
  return {
    title: dados.titulo,
    description: descricao,
    alternates: linksIdiomas(lang, ref),
    openGraph: {
      type: 'website',
      siteName: 'Paulo Rabelo',
      url: caminho(lang, ref),
      title: dados.titulo,
      description: descricao,
      locale: localeOg[lang],
      alternateLocale: idiomas.filter((l) => l !== lang).map((l) => localeOg[l]),
      images: [dados.imagem ?? { url: imagemOg(lang), width: 1200, height: 630 }],
    },
  };
}
