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

/** Metadados de uma página interna */
export function metadadosPagina(lang: Idioma, ref: Ref, dados: { titulo: string; descricao: string; imagem?: { url: string; width?: number; height?: number } }): Metadata {
  return {
    title: dados.titulo,
    description: dados.descricao,
    alternates: linksIdiomas(lang, ref),
    openGraph: {
      title: dados.titulo,
      description: dados.descricao,
      locale: localeOg[lang],
      images: [dados.imagem ?? { url: imagemOg(lang), width: 1200, height: 630 }],
    },
  };
}
