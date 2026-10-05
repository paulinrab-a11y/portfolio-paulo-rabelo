import { contato, perfil } from '@/data/perfil';

/** Cartela final: TRABALHE COMIGO, com todos os contatos à vista */
export function Fim() {
  const canais = [contato.whatsapp, contato.email, contato.linkedin, contato.instagram];
  return (
    <section id="contato" aria-labelledby="fim-titulo" className="margem relative flex min-h-svh scroll-mt-[var(--cabecalho)] flex-col justify-center bg-black py-24">
      <p className="rotulo mb-6 flex items-center gap-3 text-cinza">
        <span className="rec-ponto" /> 05 · Fim
      </p>
      <h2 id="fim-titulo" className="titulo-display text-[clamp(64px,15vw,240px)] text-creme">
        Trabalhe <span className="text-rec">comigo</span>
      </h2>
      <p className="mt-6 max-w-[42ch] text-lg text-cinza">
        {perfil.disponibilidade} {perfil.cidade}.
      </p>
      <ul className="mt-12 grid gap-px border border-linha bg-linha sm:grid-cols-2">
        {canais.map((c) => (
          <li key={c.href} className="bg-black">
            <a
              href={c.href}
              className="group flex min-h-24 flex-col justify-center gap-1 px-6 py-5 transition-colors hover:bg-carvao"
              {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="rotulo text-cinza group-hover:text-rec">{c.rotulo}</span>
              <span className="text-xl break-all text-creme md:text-2xl">{c.valor}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
