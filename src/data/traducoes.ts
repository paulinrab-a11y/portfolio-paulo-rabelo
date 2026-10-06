/**
 * Traduções do conteúdo para inglês e espanhol. O português (perfil.ts,
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
};
