import type { Idioma } from '@/data/idiomas';
import { textos } from '@/data/textos';

/** Selo obrigatório em todo trabalho feito com IA generativa */
export function SeloIA({ lang, className = '' }: { lang: Idioma; className?: string }) {
  return (
    <span className={`rotulo inline-flex items-center gap-1.5 border border-creme/80 bg-preto/80 px-2 py-1 text-creme ${className}`} data-selo-ia>
      <span aria-hidden="true" className="h-1.5 w-1.5 bg-rec" />
      {textos[lang].selo.ia}
    </span>
  );
}
