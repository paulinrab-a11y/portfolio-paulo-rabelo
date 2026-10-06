// Rota fina: o conteúdo está em src/components/paginas (o mesmo em todos os idiomas).
import { metadadosServico, PaginaServico, slugsServicos } from '@/components/paginas/PaginasServicos';
import type { Idioma } from '@/data/idiomas';

const LANG = 'zh' satisfies Idioma;

export const dynamicParams = false;

export function generateStaticParams() {
  return slugsServicos(LANG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/en/services/[slug]'>) {
  return metadadosServico(LANG, (await params).slug);
}

export default async function Page({ params }: PageProps<'/en/services/[slug]'>) {
  return <PaginaServico lang={LANG} slug={(await params).slug} />;
}
