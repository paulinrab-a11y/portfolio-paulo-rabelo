import { Cabecalho } from '@/components/Cabecalho';
import { JsonLd } from '@/components/JsonLd';
import { Rodape } from '@/components/Rodape';
import { caminhos, codigoHtml, type Idioma, idiomas } from '@/data/idiomas';
import { classesFontes } from '@/estilos/fontes';
import { perfilNo, t } from '@/lib/i18n';
import { pessoaLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import '@/estilos/globals.css';

/**
 * Antes da primeira pintura: marca a abertura só na primeira visita da
 * sessão, na home (de qualquer idioma) e sem movimento reduzido. Clique,
 * tecla, roda ou toque já pulam, mesmo antes do JS do React. Sem JS, a
 * abertura não existe.
 */
const homes = JSON.stringify(idiomas.map((l) => caminhos[l].base));
const scriptAbertura = `try{var c=location.pathname.replace(/\\/$/,'');if(${homes}.indexOf(c)>-1&&!sessionStorage.getItem('abertura-vista')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var h=document.documentElement;h.setAttribute('data-abertura','');var e=['pointerdown','keydown','wheel','touchmove'],p=function(){h.setAttribute('data-abertura-fim','');sessionStorage.setItem('abertura-vista','1');e.forEach(function(n){removeEventListener(n,p,true)})};e.forEach(function(n){addEventListener(n,p,{capture:true,passive:true})})}}catch(e){}`;

/** Estrutura de toda página, usada pelos layouts raiz de cada idioma */
export function Documento({ lang, children }: { lang: Idioma; children: React.ReactNode }) {
  const p = perfilNo(lang);
  const pessoa = pessoaLd({
    nome: p.nome,
    nomeCompleto: p.nomeCompleto,
    url: SITE_URL,
    imagem: '/media/retrato/paulo-rabelo.jpg',
    email: p.contato.email.valor,
    cargo: t(lang).meta.cargo,
    cidade: 'São Paulo',
    // O Instagram do contato é da agência (WhyNot), não do Paulo: fica fora do sameAs
    sameAs: [p.contato.linkedin.href],
    areas: p.servicos,
  });

  return (
    <html lang={codigoHtml[lang]} className={classesFontes} suppressHydrationWarning>
      {/* biome-ignore lint/style/noHeadElement: este componente é o <html> dos layouts raiz de cada idioma, não uma página */}
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script fixo do próprio site, roda antes da pintura (doc preventing-flash-before-hydration) */}
        <script dangerouslySetInnerHTML={{ __html: scriptAbertura }} />
        <JsonLd dados={pessoa} />
      </head>
      <body>
        <a href="#conteudo" className="rotulo sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-creme focus:px-4 focus:py-3 focus:text-preto">
          {t(lang).nav.pularConteudo}
        </a>
        <Cabecalho lang={lang} />
        <main id="conteudo">{children}</main>
        <Rodape lang={lang} />
        <div className="vinheta" aria-hidden="true" />
        <div className="grao" aria-hidden="true" />
      </body>
    </html>
  );
}
