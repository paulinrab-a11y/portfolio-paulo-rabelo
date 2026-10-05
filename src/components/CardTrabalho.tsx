import Image from 'next/image';
import Link from 'next/link';
import { SeloIA } from '@/components/SeloIA';
import type { Trabalho } from '@/data/trabalhos';
import { ehVideo, midia } from '@/lib/midia';

/** Card simples de trabalho (páginas de serviço): poster, título e função */
export function CardTrabalho({ trabalho }: { trabalho: Trabalho }) {
  const m = midia(trabalho.midia);
  return (
    <Link href={`/trabalhos/${trabalho.slug}`} className="group flex flex-col gap-3">
      <span className="relative block aspect-[4/3] overflow-hidden bg-carvao">
        <Image
          src={m.poster.avif}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {trabalho.feitoComIA && <SeloIA className="absolute top-2 left-2" />}
        {ehVideo(m) && <span className="rotulo absolute right-2 bottom-2 bg-preto/80 px-2 py-1">▶ Assistir</span>}
      </span>
      <span className="titulo-display text-[clamp(26px,2.6vw,40px)] group-hover:text-rec">{trabalho.titulo}</span>
      <span className="text-cinza">{[trabalho.cliente, trabalho.funcao].filter(Boolean).join(' · ')}</span>
    </Link>
  );
}
