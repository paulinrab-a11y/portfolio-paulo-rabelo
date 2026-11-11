import type { Metadata } from 'next';
import Link from 'next/link';
import { contato, live } from '@/data/perfil';
import { caminho } from '@/lib/rotas';

const DESCRICAO = 'Live de games no Kick, no YouTube, na Twitch e no TikTok ao mesmo tempo. Discord, Pix e o resto do site.';

export const metadadosLinks: Metadata = {
  title: 'Links',
  description: DESCRICAO,
  // Página só em português: sem hreflang para os outros idiomas
  alternates: { canonical: '/links' },
  openGraph: { url: '/links', title: 'Paulinrab ao vivo', description: DESCRICAO },
};

const externo = { target: '_blank', rel: 'noopener noreferrer' } as const;

/**
 * Bio das redes. Os quatro canais são faixas de uma timeline, e a agulha
 * vermelha corta as quatro juntas: é o mesmo sinal em todas.
 */
export function PaginaLinks() {
  const site = [
    { href: caminho('pt', { pagina: 'trabalhos' }), rotulo: 'Trabalhos' },
    { href: caminho('pt', { pagina: 'servicos' }), rotulo: 'Serviços' },
    { href: caminho('pt', { pagina: 'sobre' }), rotulo: 'Sobre mim' },
  ];

  return (
    <div className="margem mx-auto w-full max-w-[640px] pt-[calc(var(--cabecalho)+40px)] pb-20">
      <p className="rotulo flex items-center gap-3 text-cinza">
        <span className="rec-ponto rec-pisca" /> Live de games
      </p>
      <h1 className="titulo-display mt-3 text-[clamp(72px,22vw,148px)]">Paulinrab</h1>
      <p className="mt-5 max-w-[36ch] text-cinza">A live passa nos quatro canais ao mesmo tempo. Escolha onde assistir.</p>

      <section aria-labelledby="canais" className="mt-10">
        <h2 id="canais" className="sr-only">
          Canais da live
        </h2>
        <ul className="relative border-t border-linha">
          {live.canais.map((c) => (
            <li key={c.nome} className="border-b border-linha">
              <a
                href={c.href}
                {...externo}
                className="group grid min-h-[76px] grid-cols-[2.5rem_1fr_auto] items-center gap-x-3 py-3 transition-colors duration-150 hover:bg-carvao focus-visible:bg-carvao"
              >
                <span className="tc text-[12px] text-grafite" aria-hidden="true">
                  {c.faixa}
                </span>
                <span className="flex flex-col">
                  <span className="titulo-display text-[clamp(36px,10vw,52px)] group-hover:text-rec">{c.nome}</span>
                  <span className="tc mt-1 text-[13px] text-cinza">{c.valor}</span>
                </span>
                <span className="rotulo pr-1 text-cinza group-hover:text-creme">Assistir</span>
              </a>
            </li>
          ))}
          {/* Agulha da timeline: a mesma live nas quatro faixas */}
          <span className="pointer-events-none absolute -top-2 bottom-0 left-[2.5rem] w-px bg-rec" aria-hidden="true">
            <span className="absolute -top-0 -left-[5px] block h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-rec" />
          </span>
        </ul>
      </section>

      <section aria-labelledby="comunidade" className="mt-12">
        <h2 id="comunidade" className="rotulo text-cinza">
          Comunidade e apoio
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a href={live.discord.href} {...externo} className="botao botao-rec justify-between">
            Entrar no Discord <span className="tc normal-case tracking-normal opacity-70">{live.discord.valor.replace('discord.gg/', '')}</span>
          </a>
          <a href={live.pix.href} {...externo} className="botao justify-between text-creme">
            Mandar um Pix <span className="tc normal-case tracking-normal text-cinza">LivePix</span>
          </a>
        </div>
      </section>

      <section aria-labelledby="site" className="mt-12">
        <h2 id="site" className="rotulo text-cinza">
          Fora da live, edito vídeo e faço motion
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {site.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-creme underline decoration-linha underline-offset-4 hover:decoration-rec">
                {l.rotulo}
              </Link>
            </li>
          ))}
          <li>
            <a href={contato.whatsapp.href} {...externo} className="text-creme underline decoration-linha underline-offset-4 hover:decoration-rec">
              Falar comigo
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
