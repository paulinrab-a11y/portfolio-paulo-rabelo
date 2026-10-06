import { Documento } from '@/components/Documento';
import { PaginaNaoEncontrado } from '@/components/paginas/PaginaNaoEncontrado';
import { metadadosBase } from '@/lib/metadados';

/**
 * 404 de qualquer endereço que não existe em nenhum idioma. Com três layouts
 * raiz (pt, en, es), o Next pede este arquivo (experimental.globalNotFound).
 */
export const metadata = { ...metadadosBase('pt'), title: 'Sem sinal · Paulo Rabelo' };

export default function GlobalNotFound() {
  return (
    <Documento lang="pt">
      <PaginaNaoEncontrado lang="pt" />
    </Documento>
  );
}
