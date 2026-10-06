// Rota fina: o conteúdo está em src/components/paginas (o mesmo em todos os idiomas).
import { metadadosSobre, PaginaSobre } from '@/components/paginas/PaginaSobre';
import type { Idioma } from '@/data/idiomas';

const LANG = 'es' satisfies Idioma;

export const metadata = metadadosSobre(LANG);

export default function Page() {
  return <PaginaSobre lang={LANG} />;
}
