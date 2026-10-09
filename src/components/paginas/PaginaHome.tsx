import { Abertura } from '@/components/home/Abertura';
import { JsonLd } from '@/components/JsonLd';
import { Creditos } from '@/components/home/Creditos';
import { Fim } from '@/components/home/Fim';
import { Heroi } from '@/components/home/Heroi';
import { Manifesto } from '@/components/home/Manifesto';
import { Selecionados } from '@/components/home/Selecionados';
import { SobreResumo } from '@/components/home/SobreResumo';
import { Timeline } from '@/components/home/Timeline';
import { codigoHtml, type Idioma } from '@/data/idiomas';
import { trabalhos } from '@/data/trabalhos';
import { perfilNo, trabalhoEm } from '@/lib/i18n';
import { siteLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { midia } from '@/lib/midia';
import { cortesDoReel } from '@/lib/reel';
import { caminho } from '@/lib/rotas';
import { buscar, destaques } from '@/lib/trabalhos';

/** Home. O conteúdo chega já traduzido aos componentes de navegador. */
export function PaginaHome({ lang }: { lang: Idioma }) {
  const perfil = perfilNo(lang);
  const lista = trabalhos.map((t) => trabalhoEm(t, lang));
  // Reel do herói: cada corte com o título do trabalho no idioma e o link
  const reel = midia('hero');
  const cortes = cortesDoReel(reel.shots ?? []).flatMap((c) => {
    const t = buscar(lista, c.slug);
    return t ? [{ ...c, titulo: t.titulo, href: caminho(lang, { pagina: 'trabalhos', trabalho: c.slug }), quadro: midia(t.midia).poster.avif }] : [];
  });
  return (
    <>
      <JsonLd dados={siteLd(SITE_URL, codigoHtml[lang])} />
      <Abertura lang={lang} />
      <Heroi lang={lang} funcaoCurta={perfil.funcaoCurta} reel={reel} cortes={cortes} />
      <Manifesto lang={lang} linhas={perfil.manifesto} />
      <Selecionados lang={lang} itens={destaques(lista)} />
      <Timeline lang={lang} lista={lista} />
      <Creditos lang={lang} />
      <SobreResumo lang={lang} />
      <Fim lang={lang} />
    </>
  );
}
