import Image from 'next/image';
import { clientes } from '@/data/perfil';

/**
 * Clientes e artistas passando devagar, como créditos. Pausa com o mouse ou o
 * foco; em movimento reduzido fica parado e quebra em linhas.
 */
export function Creditos() {
  const itens = (duplicata: boolean) =>
    clientes.map((c) => (
      <li
        key={`${c.nome}${duplicata ? '-2' : ''}`}
        className={`flex shrink-0 items-center gap-4 px-6 md:px-10 ${duplicata ? 'creditos-duplicata' : ''}`}
        aria-hidden={duplicata || undefined}
      >
        {c.logo && (
          <Image src={c.logo.src} alt="" width={c.logo.largura} height={c.logo.altura} unoptimized className={`h-7 w-auto md:h-9 ${c.logo.inverterNoEscuro ? 'invert' : ''}`} />
        )}
        <span className="font-mono text-[clamp(18px,2.4vw,30px)] tracking-tight text-creme uppercase">{c.nome}</span>
        <span aria-hidden="true" className="ml-6 text-rec md:ml-10">
          ●
        </span>
      </li>
    ));

  return (
    <section aria-labelledby="creditos-titulo" className="border-y border-linha py-14 md:py-20">
      <h2 id="creditos-titulo" className="rotulo margem mb-8 text-cinza">
        03 · Clientes e artistas
      </h2>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a faixa em movimento recebe foco para pausar, como no hover */}
      <section className="creditos overflow-hidden" tabIndex={0} aria-label="Lista de clientes e artistas">
        <ul className="creditos-faixa">
          {itens(false)}
          {itens(true)}
        </ul>
      </section>
    </section>
  );
}
