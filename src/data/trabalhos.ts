/**
 * Cases do portfólio. Só fatos confirmados (docs/BRIEF-ORIGINAL.md e o que
 * aparece na própria mídia). Campo sem dado fica de fora e não aparece no site.
 * A mídia de cada case está em public/media/<midia>/ e descrita em media.json.
 */

export const categorias = {
  edicao: 'Edição',
  motion: 'Motion e VFX',
  cor: 'Cor',
  ia: 'IA',
  sites: 'Sites',
  social: 'Social',
  fotografia: 'Fotografia',
  podcast: 'Podcast',
} as const;

export type Categoria = keyof typeof categorias;

export const trilhas = {
  V1: 'Edição e cor',
  V2: 'Motion e VFX',
  V3: 'IA generativa',
  V4: 'Direção de arte',
} as const;

export type Trilha = keyof typeof trilhas;

interface Credito {
  rotulo: string;
  valor: string;
}

export interface Trabalho {
  slug: string;
  titulo: string;
  /** Cliente ou artista */
  cliente?: string;
  /** Minha função, curta, para a lista */
  funcao: string;
  categorias: Categoria[];
  trilha: Trilha;
  /** Mostra o selo "Feito com IA" */
  feitoComIA?: boolean;
  /** Posição entre os 6 destaques da home */
  destaque?: number;
  /** Pasta em public/media com preview, poster e full */
  midia: string;
  /** Vídeos extras do mesmo case (outras pastas de public/media) */
  midiasExtras?: string[];
  creditos: Credito[];
  texto: { contexto: string; oQueFiz: string; resultado?: string };
  link?: { rotulo: string; href: string };
}

export const trabalhos: Trabalho[] = [
  {
    slug: 'clipe-santxx-azam-mc',
    titulo: 'Clipe Santxx e Azam MC',
    cliente: 'Santxx e Azam MC',
    funcao: 'Edição, VFX, motion e cor',
    categorias: ['edicao', 'motion', 'cor'],
    trilha: 'V1',
    destaque: 1,
    midia: 'clipe-santxx-azam-mc',
    creditos: [
      { rotulo: 'Artistas', valor: 'Azam e Santxx' },
      { rotulo: 'Faixa', valor: 'Forza' },
      { rotulo: 'Direção', valor: 'AD ASTRA' },
      { rotulo: 'Minha função', valor: 'Cortes, efeitos visuais, motion e color grading' },
    ],
    texto: {
      contexto: 'Clipe musical de Santxx e Azam MC.',
      oQueFiz: 'Fiz os cortes, os efeitos visuais, o motion e a cor.',
    },
  },
  {
    slug: 'visualizer-anjo005',
    titulo: 'Visualizer Anjo005',
    cliente: 'Anjo005',
    funcao: 'VFX, motion e capa',
    categorias: ['motion', 'social'],
    trilha: 'V2',
    destaque: 2,
    midia: 'visualizer-anjo005',
    creditos: [
      { rotulo: 'Artista', valor: 'Anjo005' },
      { rotulo: 'Minha função', valor: 'Efeitos visuais, motion e capa' },
      { rotulo: 'Entregas', valor: 'Visualizer e capa' },
    ],
    texto: {
      contexto: 'Visualizer e capa para Anjo005.',
      oQueFiz: 'Fiz os efeitos visuais, o motion do visualizer e a capa.',
    },
  },
  {
    slug: 'podcast-opiniao-segura-laad',
    titulo: 'Opinião Segura na LAAD',
    cliente: 'Podcast Opinião Segura',
    funcao: 'Montagem e lower thirds',
    categorias: ['podcast', 'edicao', 'motion'],
    trilha: 'V1',
    destaque: 3,
    midia: 'podcast-opiniao-segura',
    creditos: [
      { rotulo: 'Cliente', valor: 'Podcast Opinião Segura' },
      { rotulo: 'Minha função', valor: 'Montagem do episódio e lower thirds dos convidados' },
    ],
    texto: {
      contexto: 'Edição especial do Podcast Opinião Segura gravada na LAAD Security & Milipol Brazil 2026.',
      oQueFiz: 'Montei o episódio e coloquei os lower thirds de cada convidado.',
    },
  },
  {
    slug: 'youtube-constance-silksong',
    titulo: 'Constance superou Silksong?',
    funcao: 'Edição, motion e apresentação',
    categorias: ['edicao', 'motion'],
    trilha: 'V2',
    destaque: 4,
    midia: 'youtube-constance-silksong',
    creditos: [{ rotulo: 'Minha função', valor: 'Edição, motion e apresentação' }],
    texto: {
      contexto: 'Vídeo para YouTube com o título "Constance superou Silksong?".',
      oQueFiz: 'Editei, fiz o motion e apresento o vídeo.',
    },
  },
  {
    slug: 'ugc-com-ia',
    titulo: 'UGC com IA',
    funcao: 'Criação com IA generativa e edição',
    categorias: ['ia', 'social'],
    trilha: 'V3',
    feitoComIA: true,
    destaque: 5,
    midia: 'ia-ugc',
    creditos: [{ rotulo: 'Formato', valor: 'Vídeos verticais UGC' }],
    texto: {
      contexto: 'Vídeos no formato UGC: personagens apresentam ingredientes naturais.',
      oQueFiz: 'Criei os vídeos com IA generativa e fiz a edição.',
    },
  },
  {
    slug: 'site-ohc-motors',
    titulo: 'Site OHC Motors',
    cliente: 'OHC Motors',
    funcao: 'Criação e implementação',
    categorias: ['sites'],
    trilha: 'V4',
    destaque: 6,
    midia: 'site-ohc-desktop',
    midiasExtras: ['site-ohc-celular'],
    creditos: [
      { rotulo: 'Cliente', valor: 'OHC Motors' },
      { rotulo: 'Minha função', valor: 'Criação e implementação do site' },
    ],
    texto: {
      contexto: 'Site da OHC Motors, guiado pelo scroll.',
      oQueFiz: 'Criei e implementei o site, do celular ao desktop.',
    },
    link: { rotulo: 'Ver o site no ar', href: 'https://ohc-seven.vercel.app' },
  },
  {
    slug: 'reel-site-sob-medida',
    titulo: 'Reel Site sob medida',
    cliente: 'WhyNot Visuals',
    funcao: 'Edição e motion',
    categorias: ['social', 'edicao', 'motion'],
    trilha: 'V2',
    midia: 'reel-whynot',
    creditos: [
      { rotulo: 'Marca', valor: 'WhyNot Visuals' },
      { rotulo: 'Formato', valor: 'Reel vertical' },
    ],
    texto: {
      contexto: 'Reel da WhyNot Visuals que apresenta os sites que fazemos: OHC Motors, Passem a Respeitar e MH Phones.',
      oQueFiz: 'Fiz a edição e o motion do reel.',
    },
  },
  {
    slug: 'site-passem-a-respeitar',
    titulo: 'Site Passem a Respeitar',
    cliente: 'Passem a Respeitar',
    funcao: 'Criação e implementação',
    categorias: ['sites'],
    trilha: 'V4',
    midia: 'site-passem-a-respeitar-desktop',
    midiasExtras: ['site-passem-a-respeitar-celular'],
    creditos: [{ rotulo: 'Minha função', valor: 'Criação e implementação do site' }],
    texto: {
      contexto: 'Site do Passem a Respeitar, com abertura em VHS, REC e timecode.',
      oQueFiz: 'Criei e implementei o site.',
    },
    link: { rotulo: 'Ver o site no ar', href: 'https://passem-a-respeitar.vercel.app' },
  },
  {
    slug: 'site-mh-phones',
    titulo: 'Site MH Phones',
    cliente: 'MH Phones',
    funcao: 'Criação e implementação',
    categorias: ['sites'],
    trilha: 'V4',
    midia: 'site-mh-phones-desktop',
    midiasExtras: ['site-mh-phones-celular'],
    creditos: [
      { rotulo: 'Cliente', valor: 'MH Phones' },
      { rotulo: 'Minha função', valor: 'Criação e implementação do site' },
    ],
    texto: {
      contexto: 'Site da MH Phones, loja de iPhones em São Paulo.',
      oQueFiz: 'Criei e implementei o site.',
    },
    link: { rotulo: 'Ver o site no ar', href: 'https://mh-phones.vercel.app' },
  },
  {
    slug: 'anuncio-ohc-ia',
    titulo: 'Anúncio OHC Motors com IA',
    cliente: 'OHC Motors',
    funcao: 'Vídeo com IA generativa',
    categorias: ['ia', 'social'],
    trilha: 'V3',
    feitoComIA: true,
    midia: 'ia-anuncio-ohc',
    creditos: [{ rotulo: 'Cliente', valor: 'OHC Motors' }],
    texto: {
      contexto: 'Anúncio vertical da OHC Motors.',
      oQueFiz: 'Produzi o vídeo com IA generativa.',
    },
  },
  {
    slug: 'historia-ilustrada-ia',
    titulo: 'História ilustrada com IA',
    funcao: 'Vídeo com IA generativa',
    categorias: ['ia'],
    trilha: 'V3',
    feitoComIA: true,
    midia: 'ia-historia-ilustrada',
    creditos: [{ rotulo: 'Formato', valor: 'Vídeo vertical' }],
    texto: {
      contexto: 'História contada com ilustrações animadas.',
      oQueFiz: 'Produzi o vídeo com IA generativa.',
    },
  },
  {
    slug: 'vsl-e-anuncios',
    titulo: 'VSL e anúncios',
    funcao: 'Edição',
    categorias: ['edicao', 'social'],
    trilha: 'V1',
    midia: 'vsl',
    midiasExtras: ['anuncio-volante'],
    creditos: [{ rotulo: 'Formatos', valor: 'VSL talking head e anúncio vertical' }],
    texto: {
      contexto: 'VSL em formato talking head e anúncio vertical de produto.',
      oQueFiz: 'Editei os dois vídeos.',
    },
  },
  {
    slug: 'videos-para-redes',
    titulo: 'Vídeos para redes sociais',
    funcao: 'Edição',
    categorias: ['social', 'edicao'],
    trilha: 'V1',
    midia: 'social-verticais',
    creditos: [{ rotulo: 'Formato', valor: 'Vídeos verticais' }],
    texto: {
      contexto: 'Vídeos verticais para redes sociais: um carro em evento e um drink sendo preparado.',
      oQueFiz: 'Editei os vídeos.',
    },
  },
  {
    slug: 'hora-bolas-club',
    titulo: 'Hora Bolas Club',
    cliente: 'Hora Bolas Club',
    funcao: 'Artes para redes sociais e fotos',
    categorias: ['social', 'fotografia'],
    trilha: 'V4',
    midia: 'hora-bolas',
    creditos: [
      { rotulo: 'Cliente', valor: 'Hora Bolas Club, Lavras (MG)' },
      { rotulo: 'Entregas', valor: 'Artes para redes sociais e fotos de produto' },
    ],
    texto: {
      contexto: 'O Hora Bolas Club fica em Lavras (MG). Tem futebol com open Chopp, karaokê e sinuca.',
      oQueFiz: 'Fiz as artes dos eventos e as fotos dos drinks e das porções.',
    },
  },
  {
    slug: 'hora-bolas-rebranding',
    titulo: 'Rebranding Hora Bolas',
    cliente: 'Hora Bolas Club',
    funcao: 'Rebranding e social media',
    categorias: ['social'],
    trilha: 'V4',
    midia: 'hora-bolas-rebranding',
    creditos: [
      { rotulo: 'Cliente', valor: 'Hora Bolas Club, Lavras (MG)' },
      { rotulo: 'Entregas', valor: 'Logo, cardápio e social media' },
    ],
    texto: {
      contexto: 'Rebranding do Hora Bolas Club, em Lavras (MG).',
      oQueFiz: 'Fiz o novo logo, o cardápio e as redes sociais.',
      resultado: '300 mil de alcance mensal nas redes.',
    },
  },
  {
    slug: 'ohc-vai-pra-pista',
    titulo: 'A OHC Motors vai pra pista',
    cliente: 'OHC Motors',
    funcao: 'Direção de arte',
    categorias: ['social'],
    trilha: 'V4',
    midia: 'ohc-carrossel',
    creditos: [
      { rotulo: 'Cliente', valor: 'OHC Motors' },
      { rotulo: 'Entrega', valor: 'Carrossel para Instagram' },
    ],
    texto: {
      contexto: 'Carrossel da OHC Motors.',
      oQueFiz: 'Fiz a direção de arte do carrossel.',
    },
  },
  {
    slug: 'pecas-de-direcao-de-arte',
    titulo: 'Peças de direção de arte',
    funcao: 'Direção de arte',
    categorias: ['social'],
    trilha: 'V4',
    midia: 'ohc-artes',
    creditos: [{ rotulo: 'Peças', valor: 'Arte da OHC Motors com volante Audi e foto editorial' }],
    texto: {
      contexto: 'Duas peças: a arte "Personalize o seu carro agora!" da OHC Motors, com um volante Audi, e uma foto editorial com câmeras e microfones.',
      oQueFiz: 'Fiz a direção de arte das duas peças.',
    },
  },
  {
    slug: 'eventos',
    titulo: 'Eventos',
    funcao: 'Stand, filmagem, entrevistas e fotografia',
    categorias: ['fotografia', 'edicao'],
    trilha: 'V4',
    midia: 'eventos',
    creditos: [
      { rotulo: 'Produção de stand', valor: 'OHC Motors' },
      { rotulo: 'Eletrocar Show (junho)', valor: 'Filmagem e entrevistas' },
      { rotulo: 'Cena 2K25 (novembro)', valor: 'Filmagem e fotografia' },
      { rotulo: 'LAAD Defence & Security 2026 (abril)', valor: 'Filmagem e fotografia' },
    ],
    texto: {
      contexto: 'Produção do stand da OHC Motors e cobertura de eventos: Eletrocar Show, Cena 2K25 e LAAD Defence & Security 2026.',
      oQueFiz: 'Produzi o stand da OHC. No Eletrocar Show fiz filmagem e entrevistas. Na Cena 2K25 e na LAAD 2026, filmagem e fotografia.',
    },
  },
  {
    slug: 'fotografia-e-cor',
    titulo: 'Fotografia e cor',
    funcao: 'Fotografia e coloração',
    categorias: ['fotografia', 'cor'],
    trilha: 'V4',
    midia: 'fotografia',
    creditos: [{ rotulo: 'Minha função', valor: 'Fotografia e coloração' }],
    texto: {
      contexto: 'Fotos de evento de pista, feira, gastronomia, casamento e estúdio.',
      oQueFiz: 'Fotografei e fiz a coloração.',
    },
  },
];
