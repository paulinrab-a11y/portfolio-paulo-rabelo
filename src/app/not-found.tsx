import Link from 'next/link';

export default function NaoEncontrado() {
  return (
    <section className="margem flex min-h-svh flex-col justify-center pt-[var(--cabecalho)]">
      <p className="rotulo mb-4 flex items-center gap-3 text-cinza">
        <span className="rec-ponto" /> Mídia offline
      </p>
      <h1 className="titulo-display text-[clamp(72px,16vw,240px)]">
        Sem <span className="text-rec">sinal</span>
      </h1>
      <p className="mt-6 max-w-[40ch] text-lg text-cinza">Esta página não existe ou mudou de lugar.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="botao botao-rec">
          Voltar ao início
        </Link>
        <Link href="/trabalhos" className="botao text-creme">
          Ver trabalhos
        </Link>
      </div>
    </section>
  );
}
