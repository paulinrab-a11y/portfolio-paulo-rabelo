import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Cabecalho } from '@/components/Cabecalho';
import { JsonLd } from '@/components/JsonLd';
import { Rodape } from '@/components/Rodape';
import { contato, perfil } from '@/data/perfil';
import { pessoaLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import './globals.css';

/**
 * Fontes no próprio repositório (subconjunto latino do Google Fonts, licença
 * OFL). O build não depende da rede, e o next/font/local calcula a fonte
 * reserva com as métricas de cada arquivo, para o texto não pular quando a
 * fonte chega.
 */
const titulo = localFont({ src: './fontes/big-shoulders-latin.woff2', weight: '800 900', variable: '--fonte-titulo', display: 'swap' });
const mono = localFont({ src: './fontes/jetbrains-mono-latin.woff2', weight: '400 500', variable: '--fonte-mono', display: 'swap' });
const texto = localFont({ src: './fontes/instrument-sans-latin.woff2', weight: '400 600', variable: '--fonte-texto', display: 'swap' });

const descricao = 'Editor de vídeo, motion designer e diretor de arte em São Paulo. Edição, motion e VFX, cor, vídeo com IA, sites, social media e fotografia.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Paulo Rabelo · Editor de vídeo, motion designer e diretor de arte em São Paulo', template: '%s · Paulo Rabelo' },
  description: descricao,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Paulo Rabelo',
    title: 'Paulo Rabelo · edição, motion e direção de arte',
    description: descricao,
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'Paulo Rabelo: edição, motion e direção de arte' }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

/**
 * Antes da primeira pintura: marca a abertura só na primeira visita da
 * sessão, na home e sem movimento reduzido. Sem JS, a abertura não existe.
 */
const scriptAbertura = `try{if(location.pathname==='/'&&!sessionStorage.getItem('abertura-vista')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var h=document.documentElement;h.setAttribute('data-abertura','');var e=['pointerdown','keydown','wheel','touchmove'],p=function(){h.setAttribute('data-abertura-fim','');sessionStorage.setItem('abertura-vista','1');e.forEach(function(n){removeEventListener(n,p,true)})};e.forEach(function(n){addEventListener(n,p,{capture:true,passive:true})})}}catch(e){}`;

const pessoa = pessoaLd({
  nome: perfil.nome,
  nomeCompleto: perfil.nomeCompleto,
  url: SITE_URL,
  imagem: '/media/retrato/paulo-rabelo.jpg',
  email: contato.email.valor,
  cargo: 'Editor de vídeo, motion designer e diretor de arte',
  cidade: 'São Paulo',
  // O Instagram do contato é da agência (WhyNot), não do Paulo: fica fora do sameAs
  sameAs: [contato.linkedin.href],
  areas: perfil.servicos,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${titulo.variable} ${mono.variable} ${texto.variable}`} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script fixo do próprio site, roda antes da pintura (doc preventing-flash-before-hydration) */}
        <script dangerouslySetInnerHTML={{ __html: scriptAbertura }} />
        <JsonLd dados={pessoa} />
      </head>
      <body>
        <a href="#conteudo" className="rotulo sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-creme focus:px-4 focus:py-3 focus:text-preto">
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
        <div className="vinheta" aria-hidden="true" />
        <div className="grao" aria-hidden="true" />
      </body>
    </html>
  );
}
