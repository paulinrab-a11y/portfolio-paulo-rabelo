import { Documento } from '@/components/Documento';
import type { Idioma } from '@/data/idiomas';
import { metadadosBase, viewport as viewportBase } from '@/lib/metadados';

const LANG = 'en' satisfies Idioma;

export const metadata = metadadosBase(LANG);
export const viewport = viewportBase;

/** Layout raiz do idioma: <html lang> certo para leitores de tela e buscadores */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Documento lang={LANG}>{children}</Documento>;
}
