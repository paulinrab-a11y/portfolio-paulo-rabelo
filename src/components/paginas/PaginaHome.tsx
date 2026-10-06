import { Abertura } from '@/components/home/Abertura';
import { Creditos } from '@/components/home/Creditos';
import { Fim } from '@/components/home/Fim';
import { Heroi } from '@/components/home/Heroi';
import { Manifesto } from '@/components/home/Manifesto';
import { Selecionados } from '@/components/home/Selecionados';
import { SobreResumo } from '@/components/home/SobreResumo';
import { Timeline } from '@/components/home/Timeline';
import type { Idioma } from '@/data/idiomas';
import { trabalhos } from '@/data/trabalhos';
import { perfilNo, trabalhoEm } from '@/lib/i18n';
import { destaques } from '@/lib/trabalhos';

/** Home. O conteúdo chega já traduzido aos componentes de navegador. */
export function PaginaHome({ lang }: { lang: Idioma }) {
  const perfil = perfilNo(lang);
  const lista = trabalhos.map((t) => trabalhoEm(t, lang));
  return (
    <>
      <Abertura lang={lang} />
      <Heroi lang={lang} funcaoCurta={perfil.funcaoCurta} />
      <Manifesto lang={lang} linhas={perfil.manifesto} />
      <Selecionados lang={lang} itens={destaques(lista)} />
      <Timeline lang={lang} lista={lista} />
      <Creditos lang={lang} />
      <SobreResumo lang={lang} />
      <Fim lang={lang} />
    </>
  );
}
