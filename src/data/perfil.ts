/**
 * Fatos confirmados pelo Paulo (docs/BRIEF-ORIGINAL.md, seção 2).
 * Não acrescente nada sem confirmação: texto sem dado não entra no site.
 */

export const perfil = {
  nome: 'Paulo Rabelo',
  /** Só no JSON-LD e no CV */
  nomeCompleto: 'Paulo Vitor Pereira Rabelo',
  cidade: 'São Paulo, SP',
  hud: 'SÃO PAULO · BR',
  disponibilidade: 'Disponível para trabalho remoto e projetos.',
  funcaoCurta: 'edição · motion · direção de arte',
  servicos: ['Edição de vídeo', 'Motion design e VFX', 'Color grading', 'Direção de arte', 'Vídeo com IA generativa', 'Sites', 'Social media', 'Fotografia'],
  ferramentas: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Canva', 'IA generativa (Higgsfield)'],
  bio: [
    'Sou editor de vídeo, motion designer e diretor de arte em São Paulo.',
    'Fundei a WhyNot Visuals, de audiovisual e marketing para negócios, e sou diretor de arte da WhyNot Records, selo e produtora de clipes de trap.',
    'Há 4 anos edito conteúdo long-form para YouTube e talking head, com direção criativa junto de roteiristas.',
  ],
} as const;

export const contato = {
  whatsapp: {
    rotulo: 'WhatsApp',
    valor: '+55 11 97523-1957',
    href: `https://wa.me/5511975231957?text=${encodeURIComponent('Oi, Paulo! Vi seu portfólio e quero falar sobre um projeto.')}`,
  },
  email: { rotulo: 'E-mail', valor: 'paulinrab@gmail.com', href: 'mailto:paulinrab@gmail.com' },
  linkedin: { rotulo: 'LinkedIn', valor: 'linkedin.com/in/paulinrab', href: 'https://www.linkedin.com/in/paulinrab' },
  instagram: { rotulo: 'Instagram da WhyNot', valor: '@whynotvisuals_', href: 'https://www.instagram.com/whynotvisuals_/' },
} as const;

export interface Experiencia {
  empresa: string;
  cargo: string;
  periodo: string;
  detalhe?: string;
  /** Aparece só no CV */
  soNoCV?: boolean;
}

export const experiencias: Experiencia[] = [
  { empresa: 'OHC Motors', cargo: 'Diretor de Arte e Marketing', periodo: 'jul/2026 até hoje' },
  {
    empresa: 'Uwuant (DDPAI Brasil)',
    cargo: 'Influencer Digital Sênior',
    periodo: 'abr/2025 até hoje',
    detalhe: 'Roteiro, gravação, apresentação e edição. Cerca de 130 horas de live por mês.',
  },
  { empresa: 'WhyNot Records', cargo: 'Diretor de Arte', periodo: 'jul/2024 até hoje' },
  { empresa: 'Hiroshima', cargo: 'Assistente de Marketplace', periodo: 'set/2024 a mar/2025' },
  { empresa: 'Resumo Produtora', cargo: 'Diretor de Design', periodo: 'jun a nov/2023' },
  { empresa: 'E-Construmarket', cargo: 'Analista de E-commerce', periodo: 'mar/2022 a jul/2023', detalhe: 'Mais de 30 mil produtos homologados.' },
  { empresa: 'Rabelo Design', cargo: 'Secretário Administrativo', periodo: '2015 a 2020', soNoCV: true },
];

export const formacao = {
  graduacao: { curso: 'Tecnólogo em Marketing', instituicao: 'Universidade São Judas Tadeu', ano: '2023' },
  cursos: { instituicao: 'Alura', lista: ['Color Grading', 'Ritmo de Edição', 'Eficiência e Praticidade', 'After Effects', 'Motion Design', 'Carreira Growth Marketing'] },
} as const;

/** Créditos da home. Logo só de quem tem arquivo na pasta (WhyNot e MH Phones). */
export const clientes: Array<{ nome: string; logo?: { src: string; largura: number; altura: number; inverterNoEscuro?: boolean } }> = [
  { nome: 'OHC Motors' },
  { nome: 'DDPAI' },
  { nome: 'WhyNot Records' },
  { nome: 'WhyNot Visuals', logo: { src: '/media/logos/whynot.webp', largura: 331, altura: 402, inverterNoEscuro: true } },
  { nome: 'Hora Bolas Club' },
  { nome: 'MH Phones', logo: { src: '/media/logos/mh-phones-512.webp', largura: 512, altura: 614 } },
  { nome: 'Santxx' },
  { nome: 'Ch3fe' },
  { nome: 'Azam MC' },
  { nome: 'Anjo005' },
  { nome: 'Podcast Opinião Segura' },
];

/** Manifesto da home, escolhido pelo Paulo em 05/10/2026 */
export const manifesto = ['Edito como quem monta um filme.', 'Mesmo quando é um story de 15 segundos.'] as const;
