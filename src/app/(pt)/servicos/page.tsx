// Rota fina: o conteúdo está em src/components/paginas (o mesmo em todos os idiomas).
import { metadadosServicos, PaginaServicos } from '@/components/paginas/PaginasServicos';
import type { Idioma } from '@/data/idiomas';

const LANG = 'pt' satisfies Idioma;

export const metadata = metadadosServicos(LANG);

export default function Page() {
  return <PaginaServicos lang={LANG} />;
}
