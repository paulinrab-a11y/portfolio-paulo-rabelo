import Image from 'next/image';
import Link from 'next/link';
import { perfil } from '@/data/perfil';

export function SobreResumo() {
  return (
    <section aria-labelledby="sobre-titulo" className="cartela margem grade py-[clamp(80px,14vh,160px)]">
      <div className="col-span-12 mb-8 md:col-span-3 md:mb-0">
        <p className="rotulo secundario mb-6">04 · Sobre</p>
        <div className="relative aspect-[3/4] w-40 overflow-hidden bg-preto md:w-full">
          <Image src="/media/retrato/paulo-rabelo.avif" alt="Retrato de Paulo Rabelo" fill sizes="(min-width: 768px) 22vw, 160px" className="object-cover object-[55%_60%]" />
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 md:col-start-5">
        <h2 id="sobre-titulo" className="titulo-display text-[clamp(44px,7vw,112px)]">
          Edição, motion e direção de arte.
        </h2>
        <div className="mt-8 max-w-[60ch] space-y-4 text-lg">
          {perfil.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Link href="/sobre" className="botao mt-10 text-preto hover:!bg-preto hover:!text-creme">
          Mais sobre mim <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
