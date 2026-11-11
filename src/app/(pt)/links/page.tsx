// Rota fina: o conteúdo está em src/components/paginas. Só em português (bio das redes da live).
import { metadadosLinks, PaginaLinks } from '@/components/paginas/PaginaLinks';

export const metadata = metadadosLinks;

export default function Page() {
  return <PaginaLinks />;
}
