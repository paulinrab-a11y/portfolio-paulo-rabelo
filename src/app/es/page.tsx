// Rota fina: o conteúdo está em src/components/paginas (o mesmo em todos os idiomas).
import { PaginaHome } from '@/components/paginas/PaginaHome';
import type { Idioma } from '@/data/idiomas';

const LANG = 'es' satisfies Idioma;

export default function Page() {
  return <PaginaHome lang={LANG} />;
}
