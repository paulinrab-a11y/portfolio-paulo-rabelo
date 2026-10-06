/**
 * Traduções do conteúdo para inglês, espanhol e chinês simplificado. O português (perfil.ts,
 * trabalhos.ts, servicos.ts, media.json) é a fonte de verdade: aqui só entra
 * a tradução fiel do que já existe lá. Nomes próprios, marcas e títulos de
 * obras ficam como estão. O teste de conteúdo reprova trabalho ou serviço sem
 * tradução completa.
 */
import type { Idioma } from './idiomas';

type Traduzido = Exclude<Idioma, 'pt'>;

export interface TraducaoTrabalho {
  titulo: string;
  cliente?: string;
  funcao: string;
  texto: { contexto: string; oQueFiz: string; resultado?: string };
  creditos: Array<{ rotulo: string; valor: string }>;
}

export interface TraducaoServico {
  nome: string;
  titulo: string;
  tituloSeo: string;
  descricao: string;
  texto: string[];
}

export interface TraducaoPerfil {
  disponibilidade: string;
  funcaoCurta: string;
  cidade: string;
  servicos: string[];
  ferramentas: string[];
  bio: string[];
  manifesto: readonly [string, string];
  mensagemWhatsapp: string;
  rotulos: { whatsapp: string; email: string; linkedin: string; instagram: string };
  /** Por empresa, na mesma ordem de perfil.ts */
  experiencias: Record<string, { cargo: string; periodo: string; detalhe?: string }>;
  formacao: { curso: string; cursos: string[] };
}

export const perfilEm: Record<Traduzido, TraducaoPerfil> = {
  en: {
    disponibilidade: 'Available for remote work and projects.',
    funcaoCurta: 'editing · motion · art direction',
    cidade: 'São Paulo, Brazil',
    servicos: ['Video editing', 'Motion design and VFX', 'Color grading', 'Art direction', 'Generative AI video', 'Websites', 'Social media', 'Photography'],
    ferramentas: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Canva', 'Generative AI (Higgsfield)'],
    bio: [
      'I am a video editor, motion designer and art director based in São Paulo, Brazil.',
      'I founded WhyNot Visuals, an audiovisual and marketing studio for businesses, and I am the art director of WhyNot Records, a label and production company for trap music videos.',
      'For 4 years I have edited long-form YouTube and talking head content, with creative direction alongside scriptwriters.',
    ],
    manifesto: ['I edit like I am cutting a film.', 'Even when it is a 15 second story.'],
    mensagemWhatsapp: 'Hi Paulo! I saw your portfolio and would like to talk about a project.',
    rotulos: { whatsapp: 'WhatsApp', email: 'Email', linkedin: 'LinkedIn', instagram: 'WhyNot on Instagram' },
    experiencias: {
      'OHC Motors': { cargo: 'Art and Marketing Director', periodo: 'Jul 2026 to present' },
      'Uwuant (DDPAI Brasil)': {
        cargo: 'Senior Digital Influencer',
        periodo: 'Apr 2025 to present',
        detalhe: 'Scripting, shooting, hosting and editing. About 130 hours of livestreams a month.',
      },
      'WhyNot Records': { cargo: 'Art Director', periodo: 'Jul 2024 to present' },
      Hiroshima: { cargo: 'Marketplace Assistant', periodo: 'Sep 2024 to Mar 2025' },
      'Resumo Produtora': { cargo: 'Design Director', periodo: 'Jun to Nov 2023' },
      'E-Construmarket': { cargo: 'E-commerce Analyst', periodo: 'Mar 2022 to Jul 2023', detalhe: 'Over 30,000 products onboarded.' },
      'Rabelo Design': { cargo: 'Administrative Assistant', periodo: '2015 to 2020' },
    },
    formacao: {
      curso: 'Undergraduate degree in Marketing (Tecnólogo)',
      cursos: ['Color Grading', 'Editing Rhythm', 'Efficiency and Practicality', 'After Effects', 'Motion Design', 'Growth Marketing Career'],
    },
  },
  es: {
    disponibilidade: 'Disponible para trabajo remoto y proyectos.',
    funcaoCurta: 'edición · motion · dirección de arte',
    cidade: 'São Paulo, Brasil',
    servicos: ['Edición de video', 'Motion design y VFX', 'Color grading', 'Dirección de arte', 'Video con IA generativa', 'Sitios web', 'Redes sociales', 'Fotografía'],
    ferramentas: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Canva', 'IA generativa (Higgsfield)'],
    bio: [
      'Soy editor de video, motion designer y director de arte en São Paulo, Brasil.',
      'Fundé WhyNot Visuals, de audiovisual y marketing para negocios, y soy director de arte de WhyNot Records, sello y productora de videoclips de trap.',
      'Hace 4 años edito contenido long-form para YouTube y talking head, con dirección creativa junto a guionistas.',
    ],
    manifesto: ['Edito como quien monta una película.', 'Incluso cuando es una story de 15 segundos.'],
    mensagemWhatsapp: '¡Hola, Paulo! Vi tu portafolio y quiero hablar sobre un proyecto.',
    rotulos: { whatsapp: 'WhatsApp', email: 'Correo', linkedin: 'LinkedIn', instagram: 'Instagram de WhyNot' },
    experiencias: {
      'OHC Motors': { cargo: 'Director de Arte y Marketing', periodo: 'jul. 2026 a la actualidad' },
      'Uwuant (DDPAI Brasil)': {
        cargo: 'Influencer Digital Sénior',
        periodo: 'abr. 2025 a la actualidad',
        detalhe: 'Guion, grabación, presentación y edición. Cerca de 130 horas de transmisión en vivo al mes.',
      },
      'WhyNot Records': { cargo: 'Director de Arte', periodo: 'jul. 2024 a la actualidad' },
      Hiroshima: { cargo: 'Asistente de Marketplace', periodo: 'sept. 2024 a mar. 2025' },
      'Resumo Produtora': { cargo: 'Director de Diseño', periodo: 'jun. a nov. 2023' },
      'E-Construmarket': { cargo: 'Analista de E-commerce', periodo: 'mar. 2022 a jul. 2023', detalhe: 'Más de 30 mil productos homologados.' },
      'Rabelo Design': { cargo: 'Secretario Administrativo', periodo: '2015 a 2020' },
    },
    formacao: {
      curso: 'Tecnólogo en Marketing',
      cursos: ['Color Grading', 'Ritmo de Edición', 'Eficiencia y Practicidad', 'After Effects', 'Motion Design', 'Carrera Growth Marketing'],
    },
  },
  zh: {
    disponibilidade: '可接受远程工作和项目合作。',
    funcaoCurta: '剪辑 · 动态设计 · 艺术指导',
    cidade: '巴西圣保罗',
    servicos: ['视频剪辑', '动态设计与视觉特效', '调色', '艺术指导', '生成式 AI 视频', '网站', '社交媒体', '摄影'],
    ferramentas: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop', 'Canva', '生成式 AI（Higgsfield）'],
    bio: ['我是巴西圣保罗的视频剪辑师、动态设计师和艺术总监。', '我创办了 WhyNot Visuals，为企业提供视听制作和营销服务；同时担任 WhyNot Records 的艺术总监，这是一家专注于说唱（trap）音乐录影带的厂牌和制作公司。', '四年来，我为 YouTube 剪辑长视频和口播内容，并与编剧一起负责创意方向。'],
    manifesto: ['我像剪电影一样剪辑。', '哪怕只是一条 15 秒的快拍。'],
    mensagemWhatsapp: '你好，Paulo！我看了你的作品集，想和你聊一个项目。',
    rotulos: { whatsapp: 'WhatsApp', email: '电子邮件', linkedin: 'LinkedIn', instagram: 'WhyNot 的 Instagram' },
    experiencias: {
      'OHC Motors': { cargo: '艺术与营销总监', periodo: '2026.7 至今' },
      'Uwuant (DDPAI Brasil)': {
        cargo: '高级数字网红',
        periodo: '2025.4 至今',
        detalhe: '负责脚本、拍摄、出镜主持和剪辑。每月直播约 130 小时。',
      },
      'WhyNot Records': { cargo: '艺术总监', periodo: '2024.7 至今' },
      Hiroshima: { cargo: '电商平台助理', periodo: '2024.9 至 2025.3' },
      'Resumo Produtora': { cargo: '设计总监', periodo: '2023.6 至 2023.11' },
      'E-Construmarket': { cargo: '电商分析师', periodo: '2022.3 至 2023.7', detalhe: '上架审核超过 3 万件商品。' },
      'Rabelo Design': { cargo: '行政秘书', periodo: '2015 至 2020' },
    },
    formacao: {
      curso: '市场营销专业本科（巴西 Tecnólogo 学位）',
      cursos: ['Color Grading（调色）', 'Ritmo de Edição（剪辑节奏）', 'Eficiência e Praticidade（效率与实用）', 'After Effects', 'Motion Design（动态设计）', 'Carreira Growth Marketing（增长营销职业）'],
    },
  },
};

export const trabalhosEm: Record<Traduzido, Record<string, TraducaoTrabalho>> = {
  en: {
    'clipe-santxx-azam-mc': {
      titulo: 'Santxx and Azam MC music video',
      cliente: 'Santxx and Azam MC',
      funcao: 'Editing, VFX, motion and color',
      texto: { contexto: 'Music video by Santxx and Azam MC.', oQueFiz: 'I did the editing, the visual effects, the motion and the color.' },
      creditos: [
        { rotulo: 'Artists', valor: 'Santxx and Azam MC' },
        { rotulo: 'Track', valor: 'Forza' },
        { rotulo: 'Director', valor: 'AD ASTRA' },
        { rotulo: 'My role', valor: 'Editing, visual effects, motion and color grading' },
      ],
    },
    'visualizer-anjo005': {
      titulo: 'Anjo005 visualizer',
      cliente: 'Anjo005',
      funcao: 'VFX, motion and cover art',
      texto: { contexto: 'Visualizer and cover art for Anjo005.', oQueFiz: 'I did the visual effects, the motion of the visualizer and the cover art.' },
      creditos: [
        { rotulo: 'Artist', valor: 'Anjo005' },
        { rotulo: 'My role', valor: 'Visual effects, motion and cover art' },
        { rotulo: 'Deliverables', valor: 'Visualizer and cover art' },
      ],
    },
    'podcast-opiniao-segura-laad': {
      titulo: 'Opinião Segura at LAAD',
      cliente: 'Podcast Opinião Segura',
      funcao: 'Editing and lower thirds',
      texto: {
        contexto: 'Special episode of the Opinião Segura podcast recorded at LAAD Security & Milipol Brazil 2026.',
        oQueFiz: 'I edited the episode and created the lower thirds for each guest.',
      },
      creditos: [
        { rotulo: 'Client', valor: 'Podcast Opinião Segura' },
        { rotulo: 'My role', valor: 'Episode editing and lower thirds' },
      ],
    },
    'youtube-constance-silksong': {
      titulo: 'Constance superou Silksong?',
      funcao: 'Editing, motion and hosting',
      texto: { contexto: 'YouTube video titled "Constance superou Silksong?" (Did Constance beat Silksong?).', oQueFiz: 'I edited it, did the motion and I host the video.' },
      creditos: [{ rotulo: 'My role', valor: 'Editing, motion and hosting' }],
    },
    'ugc-com-ia': {
      titulo: 'AI UGC',
      funcao: 'Generative AI production and editing',
      texto: { contexto: 'UGC style videos: characters present natural ingredients.', oQueFiz: 'I created the videos with generative AI and edited them.' },
      creditos: [{ rotulo: 'Format', valor: 'Vertical UGC videos' }],
    },
    'site-ohc-motors': {
      titulo: 'OHC Motors website',
      cliente: 'OHC Motors',
      funcao: 'Design and build',
      texto: { contexto: 'Scroll driven website for OHC Motors.', oQueFiz: 'I designed and built the website, from mobile to desktop.' },
      creditos: [
        { rotulo: 'Client', valor: 'OHC Motors' },
        { rotulo: 'My role', valor: 'Website design and build' },
      ],
    },
    'reel-site-sob-medida': {
      titulo: 'Custom website reel',
      cliente: 'WhyNot Visuals',
      funcao: 'Editing and motion',
      texto: {
        contexto: 'WhyNot Visuals reel showing the websites we make: OHC Motors, Passem a Respeitar and MH Phones.',
        oQueFiz: 'I did the editing and the motion of the reel.',
      },
      creditos: [
        { rotulo: 'Brand', valor: 'WhyNot Visuals' },
        { rotulo: 'Format', valor: 'Vertical reel' },
      ],
    },
    'site-passem-a-respeitar': {
      titulo: 'Passem a Respeitar website',
      cliente: 'Passem a Respeitar',
      funcao: 'Design and build',
      texto: { contexto: 'Website for Passem a Respeitar, with a VHS opening, REC and timecode.', oQueFiz: 'I designed and built the website.' },
      creditos: [{ rotulo: 'My role', valor: 'Website design and build' }],
    },
    'site-mh-phones': {
      titulo: 'MH Phones website',
      cliente: 'MH Phones',
      funcao: 'Design and build',
      texto: { contexto: 'Website for MH Phones, an iPhone store in São Paulo.', oQueFiz: 'I designed and built the website.' },
      creditos: [
        { rotulo: 'Client', valor: 'MH Phones' },
        { rotulo: 'My role', valor: 'Website design and build' },
      ],
    },
    'anuncio-ohc-ia': {
      titulo: 'OHC Motors AI ad',
      cliente: 'OHC Motors',
      funcao: 'Generative AI video',
      texto: { contexto: 'Vertical ad for OHC Motors.', oQueFiz: 'I produced the video with generative AI.' },
      creditos: [{ rotulo: 'Client', valor: 'OHC Motors' }],
    },
    'historia-ilustrada-ia': {
      titulo: 'Illustrated story with AI',
      funcao: 'Generative AI video',
      texto: { contexto: 'A story told with animated illustrations.', oQueFiz: 'I produced the video with generative AI.' },
      creditos: [{ rotulo: 'Format', valor: 'Vertical video' }],
    },
    'vsl-e-anuncios': {
      titulo: 'VSL and ads',
      funcao: 'Editing',
      texto: { contexto: 'Talking head VSL and a vertical product ad.', oQueFiz: 'I edited both videos.' },
      creditos: [{ rotulo: 'Formats', valor: 'Talking head VSL and vertical ad' }],
    },
    'videos-para-redes': {
      titulo: 'Social media videos',
      cliente: 'OHC Motors and Hora Bolas Club',
      funcao: 'Editing',
      texto: {
        contexto: 'Vertical videos for social media: an Audi at the OHC Motors event and a drink being made at Hora Bolas Club.',
        oQueFiz: 'I edited the videos.',
      },
      creditos: [
        { rotulo: 'Clients', valor: 'OHC Motors (Audi at the event) and Hora Bolas Club (drink)' },
        { rotulo: 'Format', valor: 'Vertical videos' },
      ],
    },
    'hora-bolas-club': {
      titulo: 'Hora Bolas Club',
      cliente: 'Hora Bolas Club',
      funcao: 'Social media artwork and photos',
      texto: {
        contexto: 'Hora Bolas Club is in Lavras, Minas Gerais. It has soccer with open Chopp, karaoke and pool.',
        oQueFiz: 'I made the event artwork and the photos of the drinks and the snacks.',
      },
      creditos: [
        { rotulo: 'Client', valor: 'Hora Bolas Club, Lavras (MG)' },
        { rotulo: 'Deliverables', valor: 'Social media artwork and product photos' },
      ],
    },
    'hora-bolas-rebranding': {
      titulo: 'Hora Bolas rebrand',
      cliente: 'Hora Bolas Club',
      funcao: 'Rebrand and social media',
      texto: {
        contexto: 'Rebrand of Hora Bolas Club, in Lavras, Minas Gerais.',
        oQueFiz: 'I made the new logo and the menu, and ran the social media.',
        resultado: '300,000 monthly reach on social media.',
      },
      creditos: [
        { rotulo: 'Client', valor: 'Hora Bolas Club, Lavras (MG)' },
        { rotulo: 'Deliverables', valor: 'Logo, menu and social media' },
      ],
    },
    'ohc-vai-pra-pista': {
      titulo: 'A OHC Motors vai pra pista',
      cliente: 'OHC Motors',
      funcao: 'Art direction',
      texto: { contexto: 'OHC Motors carousel ("OHC Motors hits the track").', oQueFiz: 'I did the art direction of the carousel.' },
      creditos: [
        { rotulo: 'Client', valor: 'OHC Motors' },
        { rotulo: 'Deliverable', valor: 'Instagram carousel' },
      ],
    },
    'pecas-de-direcao-de-arte': {
      titulo: 'Art direction pieces',
      funcao: 'Art direction',
      texto: {
        contexto: 'Two pieces: the "Personalize o seu carro agora!" (Customize your car now!) artwork for OHC Motors, with an Audi steering wheel, and an editorial photo with cameras and microphones.',
        oQueFiz: 'I did the art direction of both pieces.',
      },
      creditos: [{ rotulo: 'Pieces', valor: 'OHC Motors artwork with an Audi steering wheel and an editorial photo' }],
    },
    eventos: {
      titulo: 'Events',
      funcao: 'Booth, filming, interviews and photography',
      texto: {
        contexto: 'Booth production for OHC Motors and event coverage: Eletrocar Show, Cena 2K25 and LAAD Defence & Security 2026.',
        oQueFiz: 'I produced the OHC booth. At Eletrocar Show I did filming and interviews. At Cena 2K25 and LAAD 2026, I did filming and photography.',
      },
      creditos: [
        { rotulo: 'Booth production', valor: 'OHC Motors' },
        { rotulo: 'Eletrocar Show (June)', valor: 'Filming and interviews' },
        { rotulo: 'Cena 2K25 (November)', valor: 'Filming and photography' },
        { rotulo: 'LAAD Defence & Security 2026 (April)', valor: 'Filming and photography' },
      ],
    },
    'fotografia-e-cor': {
      titulo: 'Photography and color',
      funcao: 'Photography and color',
      texto: { contexto: 'Photos from a track event, a trade fair, food, a wedding and a studio.', oQueFiz: 'I took the photos and did the color.' },
      creditos: [{ rotulo: 'My role', valor: 'Photography and color' }],
    },
  },
  es: {
    'clipe-santxx-azam-mc': {
      titulo: 'Videoclip de Santxx y Azam MC',
      cliente: 'Santxx y Azam MC',
      funcao: 'Edición, VFX, motion y color',
      texto: { contexto: 'Videoclip de Santxx y Azam MC.', oQueFiz: 'Hice los cortes, los efectos visuales, el motion y el color.' },
      creditos: [
        { rotulo: 'Artistas', valor: 'Santxx y Azam MC' },
        { rotulo: 'Canción', valor: 'Forza' },
        { rotulo: 'Dirección', valor: 'AD ASTRA' },
        { rotulo: 'Mi rol', valor: 'Cortes, efectos visuales, motion y color grading' },
      ],
    },
    'visualizer-anjo005': {
      titulo: 'Visualizer de Anjo005',
      cliente: 'Anjo005',
      funcao: 'VFX, motion y portada',
      texto: { contexto: 'Visualizer y portada para Anjo005.', oQueFiz: 'Hice los efectos visuales, el motion del visualizer y la portada.' },
      creditos: [
        { rotulo: 'Artista', valor: 'Anjo005' },
        { rotulo: 'Mi rol', valor: 'Efectos visuales, motion y portada' },
        { rotulo: 'Entregas', valor: 'Visualizer y portada' },
      ],
    },
    'podcast-opiniao-segura-laad': {
      titulo: 'Opinião Segura en LAAD',
      cliente: 'Podcast Opinião Segura',
      funcao: 'Montaje y lower thirds',
      texto: {
        contexto: 'Edición especial del podcast Opinião Segura grabada en LAAD Security & Milipol Brazil 2026.',
        oQueFiz: 'Monté el episodio y creé los lower thirds de cada invitado.',
      },
      creditos: [
        { rotulo: 'Cliente', valor: 'Podcast Opinião Segura' },
        { rotulo: 'Mi rol', valor: 'Montaje del episodio y creación de los lower thirds' },
      ],
    },
    'youtube-constance-silksong': {
      titulo: 'Constance superou Silksong?',
      funcao: 'Edición, motion y presentación',
      texto: { contexto: 'Video para YouTube con el título "Constance superou Silksong?" (¿Constance superó a Silksong?).', oQueFiz: 'Lo edité, hice el motion y presento el video.' },
      creditos: [{ rotulo: 'Mi rol', valor: 'Edición, motion y presentación' }],
    },
    'ugc-com-ia': {
      titulo: 'UGC con IA',
      funcao: 'Creación con IA generativa y edición',
      texto: { contexto: 'Videos en formato UGC: personajes presentan ingredientes naturales.', oQueFiz: 'Creé los videos con IA generativa y los edité.' },
      creditos: [{ rotulo: 'Formato', valor: 'Videos verticales UGC' }],
    },
    'site-ohc-motors': {
      titulo: 'Sitio web de OHC Motors',
      cliente: 'OHC Motors',
      funcao: 'Diseño e implementación',
      texto: { contexto: 'Sitio web de OHC Motors, guiado por el scroll.', oQueFiz: 'Diseñé e implementé el sitio, del celular al escritorio.' },
      creditos: [
        { rotulo: 'Cliente', valor: 'OHC Motors' },
        { rotulo: 'Mi rol', valor: 'Diseño e implementación del sitio' },
      ],
    },
    'reel-site-sob-medida': {
      titulo: 'Reel Sitio a medida',
      cliente: 'WhyNot Visuals',
      funcao: 'Edición y motion',
      texto: {
        contexto: 'Reel de WhyNot Visuals que presenta los sitios que hacemos: OHC Motors, Passem a Respeitar y MH Phones.',
        oQueFiz: 'Hice la edición y el motion del reel.',
      },
      creditos: [
        { rotulo: 'Marca', valor: 'WhyNot Visuals' },
        { rotulo: 'Formato', valor: 'Reel vertical' },
      ],
    },
    'site-passem-a-respeitar': {
      titulo: 'Sitio web de Passem a Respeitar',
      cliente: 'Passem a Respeitar',
      funcao: 'Diseño e implementación',
      texto: { contexto: 'Sitio web de Passem a Respeitar, con apertura en VHS, REC y timecode.', oQueFiz: 'Diseñé e implementé el sitio.' },
      creditos: [{ rotulo: 'Mi rol', valor: 'Diseño e implementación del sitio' }],
    },
    'site-mh-phones': {
      titulo: 'Sitio web de MH Phones',
      cliente: 'MH Phones',
      funcao: 'Diseño e implementación',
      texto: { contexto: 'Sitio web de MH Phones, tienda de iPhones en São Paulo.', oQueFiz: 'Diseñé e implementé el sitio.' },
      creditos: [
        { rotulo: 'Cliente', valor: 'MH Phones' },
        { rotulo: 'Mi rol', valor: 'Diseño e implementación del sitio' },
      ],
    },
    'anuncio-ohc-ia': {
      titulo: 'Anuncio de OHC Motors con IA',
      cliente: 'OHC Motors',
      funcao: 'Video con IA generativa',
      texto: { contexto: 'Anuncio vertical de OHC Motors.', oQueFiz: 'Produje el video con IA generativa.' },
      creditos: [{ rotulo: 'Cliente', valor: 'OHC Motors' }],
    },
    'historia-ilustrada-ia': {
      titulo: 'Historia ilustrada con IA',
      funcao: 'Video con IA generativa',
      texto: { contexto: 'Una historia contada con ilustraciones animadas.', oQueFiz: 'Produje el video con IA generativa.' },
      creditos: [{ rotulo: 'Formato', valor: 'Video vertical' }],
    },
    'vsl-e-anuncios': {
      titulo: 'VSL y anuncios',
      funcao: 'Edición',
      texto: { contexto: 'VSL en formato talking head y anuncio vertical de producto.', oQueFiz: 'Edité los dos videos.' },
      creditos: [{ rotulo: 'Formatos', valor: 'VSL talking head y anuncio vertical' }],
    },
    'videos-para-redes': {
      titulo: 'Videos para redes sociales',
      cliente: 'OHC Motors y Hora Bolas Club',
      funcao: 'Edición',
      texto: {
        contexto: 'Videos verticales para redes sociales: un Audi en el evento de OHC Motors y un trago preparado en Hora Bolas Club.',
        oQueFiz: 'Edité los videos.',
      },
      creditos: [
        { rotulo: 'Clientes', valor: 'OHC Motors (Audi en el evento) y Hora Bolas Club (trago)' },
        { rotulo: 'Formato', valor: 'Videos verticales' },
      ],
    },
    'hora-bolas-club': {
      titulo: 'Hora Bolas Club',
      cliente: 'Hora Bolas Club',
      funcao: 'Artes para redes y fotos',
      texto: {
        contexto: 'Hora Bolas Club está en Lavras, Minas Gerais. Tiene fútbol con open Chopp, karaoke y billar.',
        oQueFiz: 'Hice las artes de los eventos y las fotos de los tragos y de las porciones.',
      },
      creditos: [
        { rotulo: 'Cliente', valor: 'Hora Bolas Club, Lavras (MG)' },
        { rotulo: 'Entregas', valor: 'Artes para redes sociales y fotos de producto' },
      ],
    },
    'hora-bolas-rebranding': {
      titulo: 'Rebranding de Hora Bolas',
      cliente: 'Hora Bolas Club',
      funcao: 'Rebranding y redes sociales',
      texto: {
        contexto: 'Rebranding de Hora Bolas Club, en Lavras, Minas Gerais.',
        oQueFiz: 'Hice el nuevo logo y el menú, y me encargué de las redes sociales.',
        resultado: '300 mil de alcance mensual en redes.',
      },
      creditos: [
        { rotulo: 'Cliente', valor: 'Hora Bolas Club, Lavras (MG)' },
        { rotulo: 'Entregas', valor: 'Logo, menú y redes sociales' },
      ],
    },
    'ohc-vai-pra-pista': {
      titulo: 'A OHC Motors vai pra pista',
      cliente: 'OHC Motors',
      funcao: 'Dirección de arte',
      texto: { contexto: 'Carrusel de OHC Motors ("OHC Motors sale a la pista").', oQueFiz: 'Hice la dirección de arte del carrusel.' },
      creditos: [
        { rotulo: 'Cliente', valor: 'OHC Motors' },
        { rotulo: 'Entrega', valor: 'Carrusel para Instagram' },
      ],
    },
    'pecas-de-direcao-de-arte': {
      titulo: 'Piezas de dirección de arte',
      funcao: 'Dirección de arte',
      texto: {
        contexto: 'Dos piezas: el arte "Personalize o seu carro agora!" (¡Personaliza tu auto ahora!) de OHC Motors, con un volante Audi, y una foto editorial con cámaras y micrófonos.',
        oQueFiz: 'Hice la dirección de arte de las dos piezas.',
      },
      creditos: [{ rotulo: 'Piezas', valor: 'Arte de OHC Motors con volante Audi y foto editorial' }],
    },
    eventos: {
      titulo: 'Eventos',
      funcao: 'Stand, filmación, entrevistas y fotografía',
      texto: {
        contexto: 'Producción del stand de OHC Motors y cobertura de eventos: Eletrocar Show, Cena 2K25 y LAAD Defence & Security 2026.',
        oQueFiz: 'Produje el stand de OHC. En Eletrocar Show hice filmación y entrevistas. En Cena 2K25 y en LAAD 2026, hice filmación y fotografía.',
      },
      creditos: [
        { rotulo: 'Producción de stand', valor: 'OHC Motors' },
        { rotulo: 'Eletrocar Show (junio)', valor: 'Filmación y entrevistas' },
        { rotulo: 'Cena 2K25 (noviembre)', valor: 'Filmación y fotografía' },
        { rotulo: 'LAAD Defence & Security 2026 (abril)', valor: 'Filmación y fotografía' },
      ],
    },
    'fotografia-e-cor': {
      titulo: 'Fotografía y color',
      funcao: 'Fotografía y color',
      texto: { contexto: 'Fotos de un evento de pista, una feria, gastronomía, una boda y un estudio.', oQueFiz: 'Tomé las fotos e hice el color.' },
      creditos: [{ rotulo: 'Mi rol', valor: 'Fotografía y color' }],
    },
  },
  zh: {
    'clipe-santxx-azam-mc': {
      titulo: 'Santxx 与 Azam MC 音乐录影带',
      cliente: 'Santxx 与 Azam MC',
      funcao: '剪辑、视觉特效、动态设计和调色',
      texto: { contexto: 'Santxx 与 Azam MC 的音乐录影带。', oQueFiz: '我负责剪辑、视觉特效、动态设计和调色。' },
      creditos: [
        { rotulo: '艺人', valor: 'Santxx 与 Azam MC' },
        { rotulo: '歌曲', valor: 'Forza' },
        { rotulo: '导演', valor: 'AD ASTRA' },
        { rotulo: '我的职责', valor: '剪辑、视觉特效、动态设计和调色' },
      ],
    },
    'visualizer-anjo005': {
      titulo: 'Anjo005 视觉化影片',
      cliente: 'Anjo005',
      funcao: '视觉特效、动态设计和封面',
      texto: { contexto: '为 Anjo005 制作的视觉化影片（visualizer）和封面。', oQueFiz: '我负责视觉特效、视觉化影片的动态设计和封面。' },
      creditos: [
        { rotulo: '艺人', valor: 'Anjo005' },
        { rotulo: '我的职责', valor: '视觉特效、动态设计和封面' },
        { rotulo: '交付内容', valor: '视觉化影片和封面' },
      ],
    },
    'podcast-opiniao-segura-laad': {
      titulo: 'Opinião Segura 播客 LAAD 特辑',
      cliente: 'Podcast Opinião Segura',
      funcao: '剪辑和人名条',
      texto: {
        contexto: 'Opinião Segura 播客在 LAAD Security & Milipol Brazil 2026 录制的特别节目。',
        oQueFiz: '我剪辑了这一期节目，并为每位嘉宾制作了人名条（lower thirds）。',
      },
      creditos: [
        { rotulo: '客户', valor: 'Podcast Opinião Segura' },
        { rotulo: '我的职责', valor: '节目剪辑和人名条制作' },
      ],
    },
    'youtube-constance-silksong': {
      titulo: 'Constance superou Silksong?',
      funcao: '剪辑、动态设计和出镜主持',
      texto: { contexto: '一支 YouTube 视频，标题为 "Constance superou Silksong?"（Constance 超越 Silksong 了吗？）。', oQueFiz: '我负责剪辑和动态设计，并出镜主持这支视频。' },
      creditos: [{ rotulo: '我的职责', valor: '剪辑、动态设计和出镜主持' }],
    },
    'ugc-com-ia': {
      titulo: 'AI UGC 视频',
      funcao: '生成式 AI 制作和剪辑',
      texto: { contexto: 'UGC 风格的视频：由角色介绍天然食材。', oQueFiz: '我用生成式 AI 制作了这些视频并完成剪辑。' },
      creditos: [{ rotulo: '形式', valor: '竖版 UGC 视频' }],
    },
    'site-ohc-motors': {
      titulo: 'OHC Motors 网站',
      cliente: 'OHC Motors',
      funcao: '设计与开发',
      texto: { contexto: 'OHC Motors 的网站，由滚动驱动的体验。', oQueFiz: '我设计并开发了这个网站，从手机到桌面端。' },
      creditos: [
        { rotulo: '客户', valor: 'OHC Motors' },
        { rotulo: '我的职责', valor: '网站设计与开发' },
      ],
    },
    'reel-site-sob-medida': {
      titulo: '定制网站宣传短片',
      cliente: 'WhyNot Visuals',
      funcao: '剪辑和动态设计',
      texto: {
        contexto: 'WhyNot Visuals 的宣传短片，展示我们制作的网站：OHC Motors、Passem a Respeitar 和 MH Phones。',
        oQueFiz: '我负责这支短片的剪辑和动态设计。',
      },
      creditos: [
        { rotulo: '品牌', valor: 'WhyNot Visuals' },
        { rotulo: '形式', valor: '竖版短片' },
      ],
    },
    'site-passem-a-respeitar': {
      titulo: 'Passem a Respeitar 网站',
      cliente: 'Passem a Respeitar',
      funcao: '设计与开发',
      texto: { contexto: 'Passem a Respeitar 的网站，开场是 VHS 风格，带 REC 标志和时间码。', oQueFiz: '我设计并开发了这个网站。' },
      creditos: [{ rotulo: '我的职责', valor: '网站设计与开发' }],
    },
    'site-mh-phones': {
      titulo: 'MH Phones 网站',
      cliente: 'MH Phones',
      funcao: '设计与开发',
      texto: { contexto: 'MH Phones 的网站，这是圣保罗的一家 iPhone 门店。', oQueFiz: '我设计并开发了这个网站。' },
      creditos: [
        { rotulo: '客户', valor: 'MH Phones' },
        { rotulo: '我的职责', valor: '网站设计与开发' },
      ],
    },
    'anuncio-ohc-ia': {
      titulo: 'OHC Motors AI 广告',
      cliente: 'OHC Motors',
      funcao: '生成式 AI 视频',
      texto: { contexto: 'OHC Motors 的竖版广告。', oQueFiz: '我用生成式 AI 制作了这支视频。' },
      creditos: [{ rotulo: '客户', valor: 'OHC Motors' }],
    },
    'historia-ilustrada-ia': {
      titulo: 'AI 插画故事',
      funcao: '生成式 AI 视频',
      texto: { contexto: '用动态插画讲述的一个故事。', oQueFiz: '我用生成式 AI 制作了这支视频。' },
      creditos: [{ rotulo: '形式', valor: '竖版视频' }],
    },
    'vsl-e-anuncios': {
      titulo: 'VSL 和广告',
      funcao: '剪辑',
      texto: { contexto: '口播形式的 VSL（视频销售信）和一支竖版产品广告。', oQueFiz: '我剪辑了这两支视频。' },
      creditos: [{ rotulo: '形式', valor: '口播 VSL 和竖版广告' }],
    },
    'videos-para-redes': {
      titulo: '社交媒体视频',
      cliente: 'OHC Motors 与 Hora Bolas Club',
      funcao: '剪辑',
      texto: {
        contexto: '社交媒体竖版视频：OHC Motors 活动上的一辆奥迪，以及在 Hora Bolas Club 调制的一杯饮品。',
        oQueFiz: '我剪辑了这些视频。',
      },
      creditos: [
        { rotulo: '客户', valor: 'OHC Motors（活动上的奥迪）与 Hora Bolas Club（饮品）' },
        { rotulo: '形式', valor: '竖版视频' },
      ],
    },
    'hora-bolas-club': {
      titulo: 'Hora Bolas Club',
      cliente: 'Hora Bolas Club',
      funcao: '社交媒体设计和摄影',
      texto: {
        contexto: 'Hora Bolas Club 位于米纳斯吉拉斯州的拉夫拉斯（Lavras）。这里有足球之夜（open Chopp 生啤畅饮）、卡拉 OK 和台球。',
        oQueFiz: '我设计了活动海报，并拍摄了饮品和小吃的照片。',
      },
      creditos: [
        { rotulo: '客户', valor: 'Hora Bolas Club，Lavras（MG）' },
        { rotulo: '交付内容', valor: '社交媒体设计和产品照片' },
      ],
    },
    'hora-bolas-rebranding': {
      titulo: 'Hora Bolas 品牌重塑',
      cliente: 'Hora Bolas Club',
      funcao: '品牌重塑和社交媒体',
      texto: {
        contexto: 'Hora Bolas Club 的品牌重塑，位于米纳斯吉拉斯州的拉夫拉斯（Lavras）。',
        oQueFiz: '我设计了新标志和菜单，并负责社交媒体运营。',
        resultado: '社交媒体每月触达 30 万人次。',
      },
      creditos: [
        { rotulo: '客户', valor: 'Hora Bolas Club，Lavras（MG）' },
        { rotulo: '交付内容', valor: '标志、菜单和社交媒体' },
      ],
    },
    'ohc-vai-pra-pista': {
      titulo: 'A OHC Motors vai pra pista',
      cliente: 'OHC Motors',
      funcao: '艺术指导',
      texto: { contexto: 'OHC Motors 的轮播图帖子（"OHC Motors 上赛道"）。', oQueFiz: '我负责这组轮播图的艺术指导。' },
      creditos: [
        { rotulo: '客户', valor: 'OHC Motors' },
        { rotulo: '交付内容', valor: 'Instagram 轮播图' },
      ],
    },
    'pecas-de-direcao-de-arte': {
      titulo: '艺术指导作品',
      funcao: '艺术指导',
      texto: {
        contexto: '两件作品：OHC Motors 的海报 "Personalize o seu carro agora!"（立即定制你的爱车！），画面是一个奥迪方向盘；以及一张被相机和麦克风围绕的编辑类照片。',
        oQueFiz: '我负责这两件作品的艺术指导。',
      },
      creditos: [{ rotulo: '作品', valor: 'OHC Motors 奥迪方向盘海报和一张编辑类照片' }],
    },
    eventos: {
      titulo: '活动',
      funcao: '展台、拍摄、采访和摄影',
      texto: {
        contexto: 'OHC Motors 的展台制作，以及活动报道：Eletrocar Show、Cena 2K25 和 LAAD Defence & Security 2026。',
        oQueFiz: '我制作了 OHC 的展台。在 Eletrocar Show 负责拍摄和采访；在 Cena 2K25 和 LAAD 2026 负责拍摄和摄影。',
      },
      creditos: [
        { rotulo: '展台制作', valor: 'OHC Motors' },
        { rotulo: 'Eletrocar Show（6 月）', valor: '拍摄和采访' },
        { rotulo: 'Cena 2K25（11 月）', valor: '拍摄和摄影' },
        { rotulo: 'LAAD Defence & Security 2026（4 月）', valor: '拍摄和摄影' },
      ],
    },
    'fotografia-e-cor': {
      titulo: '摄影与调色',
      funcao: '摄影与调色',
      texto: { contexto: '赛道活动、展会、美食、婚礼和影棚的照片。', oQueFiz: '我负责拍摄和调色。' },
      creditos: [{ rotulo: '我的职责', valor: '摄影与调色' }],
    },
  },
};

/** Por slug do serviço em português */
export const servicosEm: Record<Traduzido, Record<string, TraducaoServico>> = {
  en: {
    'editor-de-video': {
      nome: 'Video editing',
      titulo: 'Video editor in São Paulo, Brazil',
      tituloSeo: 'Video editor in São Paulo, Brazil (remote)',
      descricao: 'Video editing for YouTube, talking head, music videos, VSLs, podcasts and social media. Paulo Rabelo, editor in São Paulo, also remote.',
      texto: ['For 4 years I have edited long-form YouTube and talking head content, with creative direction alongside scriptwriters.', 'I also edit music videos, VSLs, ads, podcasts and vertical videos for social media.', 'I work in São Paulo and remotely.'],
    },
    'motion-design-e-vfx': {
      nome: 'Motion design and VFX',
      titulo: 'Motion design and VFX',
      tituloSeo: 'Motion design and VFX for music videos, YouTube and brands',
      descricao: 'Motion design and visual effects for music videos, visualizers, YouTube videos and lower thirds. Portfolio of Paulo Rabelo, São Paulo.',
      texto: ['I do motion design and visual effects for music videos, visualizers and YouTube videos.', 'For podcasts and interviews, I create the lower thirds that introduce each guest.'],
    },
    'color-grading': {
      nome: 'Color grading',
      titulo: 'Color grading',
      tituloSeo: 'Color grading for music videos and photos',
      descricao: 'Color grading for music videos and photo color correction. Work by Paulo Rabelo, editor and colorist in São Paulo.',
      texto: ['I grade music videos and color the photos I take.', 'I studied color grading at Alura.'],
    },
    'video-com-ia': {
      nome: 'AI video',
      titulo: 'Generative AI video',
      tituloSeo: 'Generative AI video: UGC, ads and stories',
      descricao: 'Videos made with generative AI: UGC, ads and illustrated stories. Every piece made with AI is labeled as such.',
      texto: ['I create videos with generative AI: UGC, ads and illustrated stories, edited at the end.', 'I use tools like Higgsfield. Every piece made with AI is shown here with the "Made with AI" label.'],
    },
    'criacao-de-sites': {
      nome: 'Websites',
      titulo: 'Custom websites',
      tituloSeo: 'Custom website design and build',
      descricao: 'Custom website design and build: OHC Motors, Passem a Respeitar and MH Phones. Paulo Rabelo, WhyNot Visuals.',
      texto: ['I design and build custom websites through WhyNot Visuals, the audiovisual and marketing company I founded.', 'Some of them live: OHC Motors, Passem a Respeitar and MH Phones.'],
    },
    'social-media-e-direcao-de-arte': {
      nome: 'Social media and art direction',
      titulo: 'Social media and art direction',
      tituloSeo: 'Social media and art direction for brands',
      descricao: 'Art direction and social media: rebrands, event artwork, carousels and vertical videos. Hora Bolas Club at 300,000 monthly reach.',
      texto: ['I do art direction and social media: rebrands, event artwork, carousels and vertical videos.', 'At Hora Bolas Club, in Lavras, Minas Gerais, the rebrand with social media reached 300,000 people a month.', 'I am the art director of OHC Motors and WhyNot Records.'],
    },
    fotografia: {
      nome: 'Photography',
      titulo: 'Photography',
      tituloSeo: 'Event, food and studio photography',
      descricao: 'Photography of events, trade fairs, food, weddings and studio sessions, color graded by me. Paulo Rabelo, São Paulo.',
      texto: ['I photograph events, trade fairs, food, weddings and studio sessions, and I color the photos myself.'],
    },
    'edicao-de-podcast': {
      nome: 'Podcast editing',
      titulo: 'Podcast editing',
      tituloSeo: 'Video podcast editing with lower thirds',
      descricao: 'Video podcast editing with lower thirds for each guest. Example: Podcast Opinião Segura at LAAD Security & Milipol Brazil 2026.',
      texto: ['I edit video podcasts and create the lower thirds that introduce each guest.', 'Example: the special episode of the Opinião Segura podcast at LAAD Security & Milipol Brazil 2026.'],
    },
  },
  es: {
    'editor-de-video': {
      nome: 'Edición de video',
      titulo: 'Editor de video en São Paulo, Brasil',
      tituloSeo: 'Editor de video en São Paulo, Brasil (remoto)',
      descricao: 'Edición de video para YouTube, talking head, videoclips, VSL, podcasts y redes sociales. Paulo Rabelo, editor en São Paulo, también en remoto.',
      texto: ['Hace 4 años edito contenido long-form para YouTube y talking head, con dirección creativa junto a guionistas.', 'También edito videoclips, VSL, anuncios, podcasts y videos verticales para redes sociales.', 'Trabajo en São Paulo y en remoto.'],
    },
    'motion-design-e-vfx': {
      nome: 'Motion design y VFX',
      titulo: 'Motion design y VFX',
      tituloSeo: 'Motion design y VFX para videoclips, YouTube y marcas',
      descricao: 'Motion design y efectos visuales para videoclips, visualizers, videos de YouTube y lower thirds. Portafolio de Paulo Rabelo, São Paulo.',
      texto: ['Hago motion design y efectos visuales para videoclips, visualizers y videos de YouTube.', 'En podcasts y entrevistas, creo los lower thirds que presentan a cada invitado.'],
    },
    'color-grading': {
      nome: 'Color grading',
      titulo: 'Color grading',
      tituloSeo: 'Color grading de videoclips y fotos',
      descricao: 'Color grading de videoclips y corrección de color de fotos. Trabajos de Paulo Rabelo, editor y colorista en São Paulo.',
      texto: ['Hago el color de videoclips y de las fotos que tomo.', 'Estudié color grading en Alura.'],
    },
    'video-com-ia': {
      nome: 'Video con IA',
      titulo: 'Video con IA generativa',
      tituloSeo: 'Video con IA generativa: UGC, anuncios e historias',
      descricao: 'Videos creados con IA generativa: UGC, anuncios e historias ilustradas. Todo trabajo hecho con IA aparece identificado.',
      texto: ['Creo videos con IA generativa: UGC, anuncios e historias ilustradas, con edición al final.', 'Uso herramientas como Higgsfield. Todo trabajo hecho con IA aparece aquí con la etiqueta "Hecho con IA".'],
    },
    'criacao-de-sites': {
      nome: 'Sitios web',
      titulo: 'Sitios web a medida',
      tituloSeo: 'Diseño e implementación de sitios web a medida',
      descricao: 'Diseño e implementación de sitios web a medida: OHC Motors, Passem a Respeitar y MH Phones. Paulo Rabelo, WhyNot Visuals.',
      texto: ['Diseño e implemento sitios web a medida con WhyNot Visuals, empresa de audiovisual y marketing que fundé.', 'Algunos en línea: OHC Motors, Passem a Respeitar y MH Phones.'],
    },
    'social-media-e-direcao-de-arte': {
      nome: 'Redes sociales y dirección de arte',
      titulo: 'Redes sociales y dirección de arte',
      tituloSeo: 'Redes sociales y dirección de arte para marcas',
      descricao: 'Dirección de arte y redes sociales: rebranding, artes de eventos, carruseles y videos verticales. Hora Bolas Club con 300 mil de alcance mensual.',
      texto: ['Hago dirección de arte y redes sociales: rebranding, artes de eventos, carruseles y videos verticales.', 'En Hora Bolas Club, en Lavras, Minas Gerais, el rebranding con redes sociales llegó a 300 mil de alcance mensual.', 'Soy director de arte de OHC Motors y de WhyNot Records.'],
    },
    fotografia: {
      nome: 'Fotografía',
      titulo: 'Fotografía',
      tituloSeo: 'Fotografía de eventos, gastronomía y estudio',
      descricao: 'Fotografía de eventos, ferias, gastronomía, bodas y estudio, con color propio. Paulo Rabelo, São Paulo.',
      texto: ['Fotografío eventos, ferias, gastronomía, bodas y estudio, y hago el color de las fotos.'],
    },
    'edicao-de-podcast': {
      nome: 'Edición de podcast',
      titulo: 'Edición de podcast',
      tituloSeo: 'Edición de podcast en video con lower thirds',
      descricao: 'Montaje de podcast en video con lower thirds de los invitados. Ejemplo: Podcast Opinião Segura en LAAD Security & Milipol Brazil 2026.',
      texto: ['Monto podcasts en video y creo los lower thirds que presentan a cada invitado.', 'Ejemplo: la edición especial del podcast Opinião Segura en LAAD Security & Milipol Brazil 2026.'],
    },
  },
  zh: {
    'editor-de-video': {
      nome: '视频剪辑',
      titulo: '巴西圣保罗视频剪辑师',
      tituloSeo: '巴西圣保罗视频剪辑师（可远程）',
      descricao: '为 YouTube、口播、音乐录影带、VSL、播客和社交媒体剪辑视频。Paulo Rabelo，圣保罗的剪辑师，也可远程合作。',
      texto: ['四年来，我为 YouTube 剪辑长视频和口播内容，并与编剧一起负责创意方向。', '我也剪辑音乐录影带、VSL、广告、播客和社交媒体竖版视频。', '我在圣保罗工作，也接受远程合作。'],
    },
    'motion-design-e-vfx': {
      nome: '动态设计与视觉特效',
      titulo: '动态设计与视觉特效',
      tituloSeo: '为音乐录影带、YouTube 和品牌制作动态设计与视觉特效',
      descricao: '为音乐录影带、视觉化影片、YouTube 视频制作动态设计和视觉特效，以及人名条。Paulo Rabelo 作品集，圣保罗。',
      texto: ['我为音乐录影带、视觉化影片和 YouTube 视频制作动态设计和视觉特效。', '在播客和访谈中，我制作介绍每位嘉宾的人名条。'],
    },
    'color-grading': {
      nome: '调色',
      titulo: '调色',
      tituloSeo: '音乐录影带和照片调色',
      descricao: '音乐录影带调色和照片调色。Paulo Rabelo 的作品，圣保罗的剪辑师和调色师。',
      texto: ['我为音乐录影带调色，也为自己拍摄的照片调色。', '我在 Alura 学习过调色。'],
    },
    'video-com-ia': {
      nome: 'AI 视频',
      titulo: '生成式 AI 视频',
      tituloSeo: '生成式 AI 视频：UGC、广告和故事',
      descricao: '用生成式 AI 制作的视频：UGC、广告和插画故事。所有 AI 制作的作品都会明确标注。',
      texto: ['我用生成式 AI 制作视频：UGC、广告和插画故事，最后再进行剪辑。', '我使用 Higgsfield 等工具。所有 AI 制作的作品在这里都带有 "AI 制作" 标签。'],
    },
    'criacao-de-sites': {
      nome: '网站',
      titulo: '定制网站',
      tituloSeo: '定制网站设计与开发',
      descricao: '定制网站的设计与开发：OHC Motors、Passem a Respeitar 和 MH Phones。Paulo Rabelo，WhyNot Visuals。',
      texto: ['我通过自己创办的视听与营销公司 WhyNot Visuals 设计并开发定制网站。', '部分已上线的网站：OHC Motors、Passem a Respeitar 和 MH Phones。'],
    },
    'social-media-e-direcao-de-arte': {
      nome: '社交媒体与艺术指导',
      titulo: '社交媒体与艺术指导',
      tituloSeo: '品牌的社交媒体与艺术指导',
      descricao: '艺术指导和社交媒体：品牌重塑、活动海报、轮播图和竖版视频。Hora Bolas Club 每月触达 30 万人次。',
      texto: ['我做艺术指导和社交媒体：品牌重塑、活动海报、轮播图和竖版视频。', '在米纳斯吉拉斯州拉夫拉斯的 Hora Bolas Club，品牌重塑加上社交媒体运营，每月触达 30 万人次。', '我是 OHC Motors 和 WhyNot Records 的艺术总监。'],
    },
    fotografia: {
      nome: '摄影',
      titulo: '摄影',
      tituloSeo: '活动、美食和影棚摄影',
      descricao: '活动、展会、美食、婚礼和影棚摄影，并由我自己调色。Paulo Rabelo，圣保罗。',
      texto: ['我拍摄活动、展会、美食、婚礼和影棚照片，并亲自为照片调色。'],
    },
    'edicao-de-podcast': {
      nome: '播客剪辑',
      titulo: '播客剪辑',
      tituloSeo: '带人名条的视频播客剪辑',
      descricao: '视频播客剪辑，为每位嘉宾制作人名条。示例：Opinião Segura 播客在 LAAD Security & Milipol Brazil 2026 的特辑。',
      texto: ['我剪辑视频播客，并制作介绍每位嘉宾的人名条。', '示例：Opinião Segura 播客在 LAAD Security & Milipol Brazil 2026 的特别节目。'],
    },
  },
};

/** Legendas das imagens (texto alternativo), pelo texto em português de media.json */
export const legendasEm: Record<Traduzido, Record<string, string>> = {
  en: {
    capa: 'cover art',
    'Porsche 911 preto em evento de pista': 'Black Porsche 911 at a track event',
    'Pistola em estande de feira, luz verde': 'Pistol at a trade fair booth, green light',
    'Hambúrguer empanado com batata': 'Breaded burger with fries',
    'Porção de salgados sobre toalha xadrez amarela': 'Plate of fried snacks on a yellow checkered tablecloth',
    'Noiva jogando o buquê em casamento ao ar livre': 'Bride throwing the bouquet at an outdoor wedding',
    'Rapaz de boné e fone de ouvido em estúdio': 'Young man with a cap and headphones in a studio',
    'Arte: Hoje tem futebol, open Chopp': 'Artwork: soccer tonight, open Chopp',
    'Arte: Solta a voz, karaokê': 'Artwork: sing it out, karaoke',
    'Arte: O melhor lugar pra jogar sinuca': 'Artwork: the best place to play pool',
    'Foto: porção de salgados': 'Photo: plate of fried snacks',
    'Foto: porção de salgados (vertical)': 'Photo: plate of fried snacks (vertical)',
    'Foto: drink vermelho com morango': 'Photo: red drink with strawberry',
    'Foto: drink amarelo com hortelã': 'Photo: yellow drink with mint',
    'Foto: drink com limão': 'Photo: drink with lime',
    'Logo em relógio do Hora Bolas Bilhar Club': 'Clock logo for Hora Bolas Bilhar Club',
    'Cardápio: capa com o logo e tacos de sinuca': 'Menu: cover with the logo and pool cues',
    'Cardápio: Para jogar junto e Rodada completa': 'Menu: "Para jogar junto" and "Rodada completa" sections',
    'Cardápio: Sabor de boteco e Sobremesas': 'Menu: "Sabor de boteco" and desserts sections',
    'Capa do carrossel A OHC Motors vai pra pista': 'Cover of the carousel A OHC Motors vai pra pista',
    'Arte OHC: Personalize o seu carro agora, volante Audi': 'OHC artwork: customize your car now, Audi steering wheel',
    'Foto editorial: rapaz de óculos laranja cercado de câmeras e microfones': 'Editorial photo: young man in orange glasses surrounded by cameras and microphones',
    'Stand da OHC Motors: tenda e expositor de volantes': 'OHC Motors booth: tent and steering wheel display',
    'Stand da OHC Motors: homem de camisa branca diante do expositor': 'OHC Motors booth: man in a white shirt in front of the display',
    'Grupo posando sob o letreiro Yala': 'Group posing under the Yala sign',
    'Dois rapazes num show com luzes de celular': 'Two young men at a concert with phone lights',
    'Entrevista em painel com marcas Protecta, UR, Flash, Milipol': 'Interview in front of a Protecta, UR, Flash and Milipol backdrop',
  },
  es: {
    capa: 'portada',
    'Porsche 911 preto em evento de pista': 'Porsche 911 negro en un evento de pista',
    'Pistola em estande de feira, luz verde': 'Pistola en un stand de feria, luz verde',
    'Hambúrguer empanado com batata': 'Hamburguesa empanizada con papas fritas',
    'Porção de salgados sobre toalha xadrez amarela': 'Porción de bocadillos fritos sobre un mantel a cuadros amarillo',
    'Noiva jogando o buquê em casamento ao ar livre': 'Novia lanzando el ramo en una boda al aire libre',
    'Rapaz de boné e fone de ouvido em estúdio': 'Joven con gorra y auriculares en un estudio',
    'Arte: Hoje tem futebol, open Chopp': 'Arte: hoy hay fútbol, open Chopp',
    'Arte: Solta a voz, karaokê': 'Arte: suelta la voz, karaoke',
    'Arte: O melhor lugar pra jogar sinuca': 'Arte: el mejor lugar para jugar billar',
    'Foto: porção de salgados': 'Foto: porción de bocadillos fritos',
    'Foto: porção de salgados (vertical)': 'Foto: porción de bocadillos fritos (vertical)',
    'Foto: drink vermelho com morango': 'Foto: trago rojo con fresa',
    'Foto: drink amarelo com hortelã': 'Foto: trago amarillo con menta',
    'Foto: drink com limão': 'Foto: trago con limón',
    'Logo em relógio do Hora Bolas Bilhar Club': 'Logo en forma de reloj de Hora Bolas Bilhar Club',
    'Cardápio: capa com o logo e tacos de sinuca': 'Menú: portada con el logo y tacos de billar',
    'Cardápio: Para jogar junto e Rodada completa': 'Menú: secciones "Para jogar junto" y "Rodada completa"',
    'Cardápio: Sabor de boteco e Sobremesas': 'Menú: secciones "Sabor de boteco" y postres',
    'Capa do carrossel A OHC Motors vai pra pista': 'Portada del carrusel A OHC Motors vai pra pista',
    'Arte OHC: Personalize o seu carro agora, volante Audi': 'Arte de OHC: personaliza tu auto ahora, volante Audi',
    'Foto editorial: rapaz de óculos laranja cercado de câmeras e microfones': 'Foto editorial: joven con lentes naranjas rodeado de cámaras y micrófonos',
    'Stand da OHC Motors: tenda e expositor de volantes': 'Stand de OHC Motors: carpa y exhibidor de volantes',
    'Stand da OHC Motors: homem de camisa branca diante do expositor': 'Stand de OHC Motors: hombre con camisa blanca frente al exhibidor',
    'Grupo posando sob o letreiro Yala': 'Grupo posando bajo el letrero de Yala',
    'Dois rapazes num show com luzes de celular': 'Dos jóvenes en un concierto con luces de celular',
    'Entrevista em painel com marcas Protecta, UR, Flash, Milipol': 'Entrevista frente a un panel con las marcas Protecta, UR, Flash y Milipol',
  },
  zh: {
    capa: '封面',
    'Porsche 911 preto em evento de pista': '赛道活动上的黑色保时捷 911',
    'Pistola em estande de feira, luz verde': '展会展台上的手枪，绿色灯光',
    'Hambúrguer empanado com batata': '炸鸡汉堡配薯条',
    'Porção de salgados sobre toalha xadrez amarela': '黄色格子桌布上的一盘炸小吃',
    'Noiva jogando o buquê em casamento ao ar livre': '户外婚礼上新娘抛捧花',
    'Rapaz de boné e fone de ouvido em estúdio': '影棚里戴帽子和耳机的年轻人',
    'Arte: Hoje tem futebol, open Chopp': '海报：今晚足球之夜，open Chopp 生啤畅饮',
    'Arte: Solta a voz, karaokê': '海报：放声歌唱，卡拉 OK',
    'Arte: O melhor lugar pra jogar sinuca': '海报：打台球的最佳去处',
    'Foto: porção de salgados': '照片：一盘炸小吃',
    'Foto: porção de salgados (vertical)': '照片：一盘炸小吃（竖版）',
    'Foto: drink vermelho com morango': '照片：草莓红色饮品',
    'Foto: drink amarelo com hortelã': '照片：薄荷黄色饮品',
    'Foto: drink com limão': '照片：青柠饮品',
    'Logo em relógio do Hora Bolas Bilhar Club': 'Hora Bolas Bilhar Club 的时钟造型标志',
    'Cardápio: capa com o logo e tacos de sinuca': '菜单：带标志和台球杆的封面',
    'Cardápio: Para jogar junto e Rodada completa': '菜单："Para jogar junto" 和 "Rodada completa" 两个栏目',
    'Cardápio: Sabor de boteco e Sobremesas': '菜单："Sabor de boteco" 和甜点栏目',
    'Capa do carrossel A OHC Motors vai pra pista': '轮播图 "A OHC Motors vai pra pista" 的封面',
    'Arte OHC: Personalize o seu carro agora, volante Audi': 'OHC 海报：立即定制你的爱车，奥迪方向盘',
    'Foto editorial: rapaz de óculos laranja cercado de câmeras e microfones': '编辑类照片：戴橙色眼镜的年轻人，被相机和麦克风围绕',
    'Stand da OHC Motors: tenda e expositor de volantes': 'OHC Motors 展台：帐篷和方向盘展架',
    'Stand da OHC Motors: homem de camisa branca diante do expositor': 'OHC Motors 展台：展架前穿白衬衫的男士',
    'Grupo posando sob o letreiro Yala': '在 Yala 招牌下合影的一群人',
    'Dois rapazes num show com luzes de celular': '演唱会上举着手机灯光的两个年轻人',
    'Entrevista em painel com marcas Protecta, UR, Flash, Milipol': '在印有 Protecta、UR、Flash 和 Milipol 标志的背景板前进行的采访',
  },
};
