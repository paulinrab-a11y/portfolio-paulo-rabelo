/**
 * Idiomas do site. Português é a fonte de verdade: o conteúdo é escrito em
 * português e traduzido (src/data/traducoes.ts), nunca o contrário.
 */
export const idiomas = ['pt', 'en', 'es', 'zh'] as const;

export type Idioma = (typeof idiomas)[number];

export const idiomaPadrao: Idioma = 'pt';

/** Atributo lang do <html> e hreflang */
export const codigoHtml: Record<Idioma, string> = { pt: 'pt-BR', en: 'en', es: 'es', zh: 'zh-CN' };

/** Open Graph */
export const localeOg: Record<Idioma, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES', zh: 'zh_CN' };

/** Nome do idioma escrito nele mesmo (seletor) e país da bandeira */
export const nomeIdioma: Record<Idioma, { nome: string; pais: string }> = {
  pt: { nome: 'Português', pais: 'Brasil' },
  en: { nome: 'English', pais: 'United States' },
  es: { nome: 'Español', pais: 'España' },
  zh: { nome: '简体中文', pais: '中国' },
};

export type Pagina = 'home' | 'trabalhos' | 'servicos' | 'sobre' | 'cv';

/**
 * Caminhos em cada idioma. Português fica na raiz (os links antigos não
 * mudam); inglês e espanhol têm prefixo e nomes no próprio idioma. O chinês
 * usa os nomes em inglês: caracteres chineses na URL viram %E4%BD%9C… ao
 * serem copiados.
 */
export const caminhos: Record<Idioma, { base: string } & Record<Exclude<Pagina, 'home'>, string>> = {
  pt: { base: '', trabalhos: 'trabalhos', servicos: 'servicos', sobre: 'sobre', cv: 'cv' },
  en: { base: '/en', trabalhos: 'work', servicos: 'services', sobre: 'about', cv: 'resume' },
  es: { base: '/es', trabalhos: 'trabajos', servicos: 'servicios', sobre: 'sobre-mi', cv: 'cv' },
  zh: { base: '/zh', trabalhos: 'work', servicos: 'services', sobre: 'about', cv: 'resume' },
};

/**
 * Abas de trabalhos: cada uma fala com um tipo de vaga. Um trabalho pode
 * estar em mais de uma (ex.: UGC com IA é vídeo e marketing).
 */
export const abas = ['video', 'sites', 'marketing'] as const;

export type Aba = (typeof abas)[number];

/** Slug da aba na URL, por idioma: /trabalhos/video, /en/work/websites… */
export const slugAba: Record<Aba, Record<Idioma, string>> = {
  video: { pt: 'video', en: 'video', es: 'video', zh: 'video' },
  sites: { pt: 'sites', en: 'websites', es: 'sitios-web', zh: 'websites' },
  marketing: { pt: 'marketing', en: 'marketing', es: 'marketing', zh: 'marketing' },
};

/**
 * Slug de cada serviço na URL, por idioma (a chave é o slug em português).
 * Fica aqui, e não em traducoes.ts, para o seletor de idioma (que roda no
 * navegador) não carregar o conteúdo traduzido inteiro.
 */
export const slugServicos: Record<string, Record<Exclude<Idioma, 'pt'>, string>> = {
  'editor-de-video': { en: 'video-editor', es: 'editor-de-video', zh: 'video-editor' },
  'motion-design-e-vfx': { en: 'motion-design-and-vfx', es: 'motion-design-y-vfx', zh: 'motion-design-and-vfx' },
  'color-grading': { en: 'color-grading', es: 'color-grading', zh: 'color-grading' },
  'video-com-ia': { en: 'ai-video', es: 'video-con-ia', zh: 'ai-video' },
  'criacao-de-sites': { en: 'websites', es: 'sitios-web', zh: 'websites' },
  'social-media-e-direcao-de-arte': { en: 'social-media-and-art-direction', es: 'redes-sociales-y-direccion-de-arte', zh: 'social-media-and-art-direction' },
  fotografia: { en: 'photography', es: 'fotografia', zh: 'photography' },
  'edicao-de-podcast': { en: 'podcast-editing', es: 'edicion-de-podcast', zh: 'podcast-editing' },
};
