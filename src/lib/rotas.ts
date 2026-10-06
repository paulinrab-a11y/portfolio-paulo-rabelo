import { type Aba, abas, caminhos, type Idioma, idiomaPadrao, idiomas, type Pagina, slugAba, slugServicos } from '@/data/idiomas';

/**
 * Referência de uma página, independente do idioma. `slug` de trabalho é o
 * mesmo em todos os idiomas; `servico` é o slug em português; `aba` é o id.
 */
export interface Ref {
  pagina: Pagina;
  trabalho?: string;
  aba?: Aba;
  servico?: string;
}

/** Slug do serviço no idioma (o português é a chave) */
export function slugServico(slugPt: string, lang: Idioma): string {
  return lang === 'pt' ? slugPt : (slugServicos[slugPt]?.[lang] ?? slugPt);
}

/** Caminho de uma página no idioma: '/', '/en/work/video', '/es/servicios/sitios-web'… */
export function caminho(lang: Idioma, ref: Ref): string {
  const c = caminhos[lang];
  if (ref.pagina === 'home') return c.base || '/';
  const partes = [c.base, c[ref.pagina]];
  if (ref.pagina === 'trabalhos' && ref.aba) partes.push(slugAba[ref.aba][lang]);
  if (ref.pagina === 'trabalhos' && ref.trabalho) partes.push(ref.trabalho);
  if (ref.pagina === 'servicos' && ref.servico) partes.push(slugServico(ref.servico, lang));
  return partes.join('/');
}

/** Se o slug de /trabalhos/<slug> é uma aba no idioma, qual */
export function abaDoSlug(lang: Idioma, slug: string): Aba | undefined {
  return abas.find((a) => slugAba[a][lang] === slug);
}

/** Contato fica no fim da home */
export function caminhoContato(lang: Idioma): string {
  return `${caminhos[lang].base}/#contato`;
}

/** Lê um caminho do site e devolve o idioma e a página. Fora do mapa: null. */
export function analisarCaminho(pathname: string): { lang: Idioma; ref: Ref } | null {
  const partes = pathname.split(/[?#]/)[0].split('/').filter(Boolean);
  const lang = idiomas.find((l) => l !== idiomaPadrao && partes[0] === l) ?? idiomaPadrao;
  const resto = lang === idiomaPadrao ? partes : partes.slice(1);
  if (resto.length === 0) return { lang, ref: { pagina: 'home' } };
  const c = caminhos[lang];
  const pagina = (['trabalhos', 'servicos', 'sobre', 'cv'] as const).find((p) => c[p] === resto[0]);
  if (!pagina || resto.length > 2) return null;
  const sub = resto[1];
  if (!sub) return { lang, ref: { pagina } };
  if (pagina === 'trabalhos') {
    const aba = abas.find((a) => slugAba[a][lang] === sub);
    return { lang, ref: aba ? { pagina, aba } : { pagina, trabalho: sub } };
  }
  if (pagina === 'servicos') {
    const pt = Object.keys(slugServicos).find((s) => slugServico(s, lang) === sub);
    return pt ? { lang, ref: { pagina, servico: pt } } : null;
  }
  return null;
}

/** O mesmo lugar em outro idioma (seletor de bandeiras). Fora do mapa: a home do idioma. */
export function traduzirCaminho(pathname: string, destino: Idioma): string {
  const lido = analisarCaminho(pathname);
  return caminho(destino, lido?.ref ?? { pagina: 'home' });
}

/** Caminhos de uma página em todos os idiomas (hreflang, sitemap) */
export function alternativas(ref: Ref): Record<Idioma, string> {
  return Object.fromEntries(idiomas.map((l) => [l, caminho(l, ref)])) as Record<Idioma, string>;
}
