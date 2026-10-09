/**
 * Dados estruturados (schema.org) para o Google entender quem é o Paulo, o
 * que ele oferece e o que é cada trabalho. Só fatos do site: sem datas,
 * preços ou avaliações que não existem.
 */

type JsonLd = Record<string, unknown>;

export interface PessoaLd {
  nome: string;
  nomeCompleto: string;
  url: string;
  imagem?: string;
  email: string;
  cargo: string;
  cidade: string;
  sameAs: string[];
  areas: readonly string[];
  /** Empresas onde o cargo segue atual (perfil.ts, "até hoje") */
  empresasAtuais?: readonly string[];
}

export function pessoaLd(p: PessoaLd): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${p.url}/#pessoa`,
    name: p.nomeCompleto,
    alternateName: p.nome,
    url: p.url,
    ...(p.imagem ? { image: `${p.url}${p.imagem}` } : {}),
    email: `mailto:${p.email}`,
    jobTitle: p.cargo,
    address: { '@type': 'PostalAddress', addressLocality: p.cidade, addressRegion: 'SP', addressCountry: 'BR' },
    sameAs: p.sameAs,
    knowsAbout: [...p.areas],
    ...(p.empresasAtuais?.length ? { worksFor: p.empresasAtuais.map((name) => ({ '@type': 'Organization', name })) } : {}),
  };
}

/** O site em si: o Google usa o nome para mostrar "Paulo Rabelo" no resultado */
export function siteLd(url: string, idioma: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#site`,
    name: 'Paulo Rabelo',
    alternateName: 'paulinrab',
    url,
    inLanguage: idioma,
    publisher: { '@id': `${url}/#pessoa` },
  };
}

/** Página de perfil (Sobre): o tipo que o Google recomenda para páginas sobre uma pessoa */
export function paginaPerfilLd(url: string, caminho: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${url}${caminho}`,
    mainEntity: { '@id': `${url}/#pessoa` },
  };
}

/** Trilha de navegação. `itens` vai da raiz até a página atual. */
export function breadcrumbLd(url: string, itens: Array<{ nome: string; caminho: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.nome, item: `${url}${it.caminho}` })),
  };
}

export function servicoLd(url: string, s: { nome: string; descricao: string; caminho: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.nome,
    description: s.descricao,
    url: `${url}${s.caminho}`,
    provider: { '@id': `${url}/#pessoa` },
    areaServed: { '@type': 'Country', name: 'Brazil' },
  };
}

/** Trabalho do portfólio. Sem data de publicação: o Paulo não informou. `seloIA` é o texto do selo no idioma da página. */
export function trabalhoLd(url: string, t: { titulo: string; descricao: string; caminho: string; imagem: string; cliente?: string; seloIA?: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: t.titulo,
    description: t.descricao,
    url: `${url}${t.caminho}`,
    image: `${url}${t.imagem}`,
    creator: { '@id': `${url}/#pessoa` },
    ...(t.cliente ? { sourceOrganization: { '@type': 'Organization', name: t.cliente } } : {}),
    ...(t.seloIA ? { keywords: t.seloIA } : {}),
  };
}

/** Serializa para <script type="application/ld+json">, sem permitir fechar a tag */
export function serializarLd(dados: JsonLd | JsonLd[]): string {
  return JSON.stringify(dados).replace(/</g, '\\u003c');
}
