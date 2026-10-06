// Rota fina: o conteúdo está em src/components/paginas (o mesmo nos três idiomas).
import { metadadosCV, PaginaCV } from '@/components/paginas/PaginaCV';
import type { Idioma } from '@/data/idiomas';

const LANG = 'es' satisfies Idioma;

export const metadata = metadadosCV(LANG);

export default function Page() {
  return <PaginaCV lang={LANG} />;
}
