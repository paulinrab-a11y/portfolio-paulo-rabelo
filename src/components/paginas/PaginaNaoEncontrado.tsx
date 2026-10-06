import Link from 'next/link';
import type { Idioma } from '@/data/idiomas';
import { textos } from '@/data/textos';
import { caminho } from '@/lib/rotas';

export function PaginaNaoEncontrado({ lang }: { lang: Idioma }) {
  const tx = textos[lang].naoEncontrado;
  return (
    <section className="margem flex min-h-svh flex-col justify-center pt-[var(--cabecalho)]">
      <p className="rotulo mb-4 flex items-center gap-3 text-cinza">
        <span className="rec-ponto" /> {tx.rotulo}
      </p>
      <h1 className="titulo-display text-[clamp(72px,16vw,240px)]">
        {tx.titulo1}
        {textos[lang].entrePalavras}
        <span className="text-rec">{tx.titulo2}</span>
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg text-cinza">{tx.texto}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={caminho(lang, { pagina: 'home' })} className="botao botao-rec">
          {tx.voltar}
        </Link>
        <Link href={caminho(lang, { pagina: 'trabalhos' })} className="botao text-creme">
          {tx.trabalhos}
        </Link>
      </div>
    </section>
  );
}
