// Rota fina: o conteúdo está em src/components/paginas (o mesmo em todos os idiomas).
import { metadadosIndice, PaginaIndice } from '@/components/paginas/PaginaIndice';
import { metadadosTrabalho, PaginaTrabalho, slugsTrabalhos } from '@/components/paginas/PaginaTrabalho';
import type { Idioma } from '@/data/idiomas';
import { abaDoSlug } from '@/lib/rotas';

const LANG = 'en' satisfies Idioma;

export const dynamicParams = false;

/** As três abas (vídeo, sites, marketing) e cada trabalho dividem o mesmo segmento */
export function generateStaticParams() {
  return slugsTrabalhos(LANG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/en/work/[slug]'>) {
  const { slug } = await params;
  const aba = abaDoSlug(LANG, slug);
  return aba ? metadadosIndice(LANG, aba) : metadadosTrabalho(LANG, slug);
}

export default async function Page({ params }: PageProps<'/en/work/[slug]'>) {
  const { slug } = await params;
  const aba = abaDoSlug(LANG, slug);
  return aba ? <PaginaIndice lang={LANG} aba={aba} /> : <PaginaTrabalho lang={LANG} slug={slug} />;
}
