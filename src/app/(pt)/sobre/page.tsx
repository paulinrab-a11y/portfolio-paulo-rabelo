// Rota fina: o conteúdo está em src/components/paginas (o mesmo nos três idiomas).
import { metadadosSobre, PaginaSobre } from '@/components/paginas/PaginaSobre';
import type { Idioma } from '@/data/idiomas';

const LANG = 'pt' satisfies Idioma;

export const metadata = metadadosSobre(LANG);

export default function Page() {
  return <PaginaSobre lang={LANG} />;
}
