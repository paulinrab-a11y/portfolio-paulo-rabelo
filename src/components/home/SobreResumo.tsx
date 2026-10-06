import Image from 'next/image';
import Link from 'next/link';
import type { Idioma } from '@/data/idiomas';
import { perfilNo, t } from '@/lib/i18n';
import { caminho } from '@/lib/rotas';

export function SobreResumo({ lang }: { lang: Idioma }) {
  const tx = t(lang).sobreResumo;
  const perfil = perfilNo(lang);
  return (
    <section aria-labelledby="sobre-titulo" className="cartela margem grade py-[clamp(80px,14vh,160px)]">
      <div className="col-span-12 mb-8 md:col-span-3 md:mb-0">
        <p className="rotulo secundario mb-6">{tx.rotulo}</p>
        <div className="relative aspect-[3/4] w-40 overflow-hidden bg-preto md:w-full">
          <Image src="/media/retrato/paulo-rabelo.avif" alt={tx.altRetrato} fill sizes="(min-width: 768px) 22vw, 160px" className="object-cover object-[55%_60%]" />
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 md:col-start-5">
        <h2 id="sobre-titulo" className="titulo-display text-[clamp(44px,7vw,112px)]">
          {tx.titulo}
        </h2>
        <div className="mt-8 max-w-[60ch] space-y-4 text-lg">
          {perfil.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <Link href={caminho(lang, { pagina: 'sobre' })} className="botao mt-10 text-preto hover:!bg-preto hover:!text-creme">
          {tx.mais} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
