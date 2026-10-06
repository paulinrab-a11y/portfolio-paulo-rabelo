// Rota fina: o conteúdo está em src/components/paginas (o mesmo nos três idiomas).
import { metadadosServicos, PaginaServicos } from '@/components/paginas/PaginasServicos';
import type { Idioma } from '@/data/idiomas';

const LANG = 'en' satisfies Idioma;

export const metadata = metadadosServicos(LANG);

export default function Page() {
  return <PaginaServicos lang={LANG} />;
}
