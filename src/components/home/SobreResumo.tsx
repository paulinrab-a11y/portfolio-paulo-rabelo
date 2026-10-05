import Link from 'next/link';
import { perfil } from '@/data/perfil';

export function SobreResumo() {
  return (
    <section aria-labelledby="sobre-titulo" className="cartela margem grade py-[clamp(80px,14vh,160px)]">
      <p className="rotulo secundario col-span-12 mb-6 md:col-span-3">04 · Sobre</p>
      <div className="col-span-12 md:col-span-8">
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
