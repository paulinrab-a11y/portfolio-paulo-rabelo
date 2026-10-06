// Rota fina: o conteúdo está em src/components/paginas (o mesmo em todos os idiomas).
import { metadadosIndice, PaginaIndice } from '@/components/paginas/PaginaIndice';
import type { Idioma } from '@/data/idiomas';

const LANG = 'en' satisfies Idioma;

export const metadata = metadadosIndice(LANG);

export default function Page() {
  return <PaginaIndice lang={LANG} />;
}
