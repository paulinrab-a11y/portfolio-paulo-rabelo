import { PaginaNaoEncontrado } from '@/components/paginas/PaginaNaoEncontrado';
import type { Idioma } from '@/data/idiomas';

const LANG = 'pt' satisfies Idioma;

export default function NaoEncontrado() {
  return <PaginaNaoEncontrado lang={LANG} />;
}
