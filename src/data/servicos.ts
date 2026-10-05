import type { Categoria } from './trabalhos';

/**
 * Páginas de serviço (/servicos/<slug>), pensadas para busca: cada uma
 * responde a um termo que alguém digita ("editor de vídeo em São Paulo") e
 * mostra os trabalhos reais da categoria. Texto só com fatos confirmados.
 */
export interface Servico {
  slug: string;
  /** Rótulo curto para listas e links */
  nome: string;
  /** H1 da página: o termo de busca, em linguagem natural */
  titulo: string;
  /** <title> e descrição para o Google (até ~155 caracteres) */
  tituloSeo: string;
  descricao: string;
  /** Parágrafos curtos, primeira pessoa */
  texto: string[];
  /** Trabalhos que entram na página */
  categorias: Categoria[];
}

export const servicos: Servico[] = [
  {
    slug: 'editor-de-video',
    nome: 'Edição de vídeo',
    titulo: 'Editor de vídeo em São Paulo',
    tituloSeo: 'Editor de vídeo em São Paulo',
    descricao: 'Edição de vídeo para YouTube, talking head, clipes, VSL, podcasts e redes sociais. Paulo Rabelo, editor em São Paulo, também remoto.',
    texto: ['Há 4 anos edito conteúdo long-form para YouTube e talking head, com direção criativa junto de roteiristas.', 'Também edito clipes musicais, VSL, anúncios, podcasts e vídeos verticais para redes sociais.', 'Trabalho em São Paulo e de forma remota.'],
    categorias: ['edicao'],
  },
  {
    slug: 'motion-design-e-vfx',
    nome: 'Motion design e VFX',
    titulo: 'Motion design e VFX',
    tituloSeo: 'Motion design e VFX para clipes, YouTube e marcas',
    descricao: 'Motion design e efeitos visuais para clipes, visualizers, vídeos de YouTube e lower thirds. Portfólio de Paulo Rabelo, São Paulo.',
    texto: ['Faço motion design e efeitos visuais para clipes, visualizers e vídeos de YouTube.', 'Em podcasts e entrevistas, crio os lower thirds que apresentam cada convidado.'],
    categorias: ['motion'],
  },
  {
    slug: 'color-grading',
    nome: 'Color grading',
    titulo: 'Color grading',
    tituloSeo: 'Color grading de clipes e fotos',
    descricao: 'Color grading de clipes musicais e coloração de fotos. Trabalhos de Paulo Rabelo, editor e colorista em São Paulo.',
    texto: ['Faço a cor de clipes musicais e a coloração das fotos que fotografo.', 'Estudei color grading na Alura.'],
    categorias: ['cor'],
  },
  {
    slug: 'video-com-ia',
    nome: 'Vídeo com IA',
    titulo: 'Vídeo com IA generativa',
    tituloSeo: 'Vídeo com IA generativa: UGC, anúncios e histórias',
    descricao: 'Vídeos criados com IA generativa: UGC, anúncios e histórias ilustradas. Todo trabalho feito com IA aparece identificado.',
    texto: ['Crio vídeos com IA generativa: UGC, anúncios e histórias ilustradas, com edição no fim.', 'Uso ferramentas como o Higgsfield. Todo trabalho feito com IA aparece aqui com o selo "Feito com IA".'],
    categorias: ['ia'],
  },
  {
    slug: 'criacao-de-sites',
    nome: 'Criação de sites',
    titulo: 'Criação de sites sob medida',
    tituloSeo: 'Criação de sites sob medida',
    descricao: 'Criação e implementação de sites sob medida: OHC Motors, Passem a Respeitar e MH Phones. Paulo Rabelo, WhyNot Visuals.',
    texto: ['Crio e implemento sites sob medida pela WhyNot Visuals, empresa de audiovisual e marketing que fundei.', 'Alguns no ar: OHC Motors, Passem a Respeitar e MH Phones.'],
    categorias: ['sites'],
  },
  {
    slug: 'social-media-e-direcao-de-arte',
    nome: 'Social media e direção de arte',
    titulo: 'Social media e direção de arte',
    tituloSeo: 'Social media e direção de arte para marcas',
    descricao: 'Direção de arte e social media: rebranding, artes de eventos, carrosséis e vídeos verticais. Hora Bolas Club com 300 mil de alcance mensal.',
    texto: ['Faço direção de arte e social media: rebranding, artes de eventos, carrosséis e vídeos verticais.', 'No Hora Bolas Club, em Lavras (MG), o rebranding com social media chegou a 300 mil de alcance mensal.', 'Sou diretor de arte da OHC Motors e da WhyNot Records.'],
    categorias: ['social'],
  },
  {
    slug: 'fotografia',
    nome: 'Fotografia',
    titulo: 'Fotografia',
    tituloSeo: 'Fotografia de eventos, gastronomia e estúdio',
    descricao: 'Fotografia de eventos, feiras, gastronomia, casamento e estúdio, com coloração própria. Paulo Rabelo, São Paulo.',
    texto: ['Fotografo eventos, feiras, gastronomia, casamento e estúdio, e faço a coloração das fotos.'],
    categorias: ['fotografia'],
  },
  {
    slug: 'edicao-de-podcast',
    nome: 'Edição de podcast',
    titulo: 'Edição de podcast',
    tituloSeo: 'Edição de podcast com lower thirds',
    descricao: 'Montagem de podcast em vídeo com lower thirds dos convidados. Exemplo: Podcast Opinião Segura na LAAD Security & Milipol Brazil 2026.',
    texto: ['Monto podcasts em vídeo e crio os lower thirds que apresentam cada convidado.', 'Exemplo: a edição especial do Podcast Opinião Segura na LAAD Security & Milipol Brazil 2026.'],
    categorias: ['podcast'],
  },
];
