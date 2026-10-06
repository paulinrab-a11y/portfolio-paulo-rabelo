'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Bandeira } from '@/components/Bandeira';
import { abas, codigoHtml, type Idioma, idiomas, nomeIdioma } from '@/data/idiomas';
import { textos } from '@/data/textos';
import { progressoParaTimecode } from '@/lib/rolagem';
import { caminho, caminhoContato, traduzirCaminho } from '@/lib/rotas';

/**
 * Barra de software de edição: nome, timecode que anda com a rolagem (e
 * termina no fim do idioma: FIM, END, FIN, 剧终), navegação (as três abas de trabalho, sobre e contato) e
 * idioma por bandeira. No celular a navegação vira um <details>, que abre e
 * fecha mesmo sem JS; as bandeiras ficam sempre à vista.
 */
export function Cabecalho({ lang }: { lang: Idioma }) {
  const tc = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname() ?? caminho(lang, { pagina: 'home' });
  const tx = textos[lang];

  const links = [
    ...abas.map((a) => ({ href: caminho(lang, { pagina: 'trabalhos', aba: a }), rotulo: tx.abas[a].nome })),
    { href: caminho(lang, { pagina: 'sobre' }), rotulo: tx.nav.sobre },
    { href: caminhoContato(lang), rotulo: tx.nav.contato },
  ];

  const fim = tx.fimHud;
  useEffect(() => {
    const el = tc.current;
    if (!el) return;
    let pedido = 0;
    const atualizar = () => {
      pedido = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.textContent = progressoParaTimecode(max > 0 ? window.scrollY / max : 0, fim);
    };
    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    return () => {
      cancelAnimationFrame(pedido);
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', agendar);
    };
  }, [fim]);

  // Fecha o menu do celular ao trocar de página
  useEffect(() => {
    if (menu.current && pathname) menu.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const fechar = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    };
    window.addEventListener('keydown', fechar);
    return () => window.removeEventListener('keydown', fechar);
  }, []);

  return (
    <header className="sem-impressao margem fixed inset-x-0 top-0 z-50 flex h-[var(--cabecalho)] items-center justify-between gap-4 border-b border-linha/70 bg-preto/92">
      <Link href={caminho(lang, { pagina: 'home' })} className="rotulo shrink-0 text-creme hover:text-rec" aria-label={tx.nav.inicio}>
        Paulo Rabelo
      </Link>

      <p className="rotulo hidden items-center gap-2 text-cinza sm:flex" aria-hidden="true">
        <span className="rec-ponto rec-pisca" />
        <span ref={tc} className="tc tc-vivo text-creme" data-testid="timecode-cabecalho">
          00:00:00:00
        </span>
      </p>

      <div className="flex items-center gap-5 lg:gap-8">
        <nav aria-label={tx.nav.principal} className="hidden lg:block">
          <ul className="flex gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rotulo text-cinza transition-colors hover:text-creme" aria-current={pathname === l.href ? 'page' : undefined}>
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SeletorIdioma lang={lang} pathname={pathname} rotulo={tx.nav.idioma} />

        <details ref={menu} className="group lg:hidden">
          <summary className="rotulo flex min-h-11 cursor-pointer list-none items-center text-creme [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">{tx.nav.menu}</span>
            <span className="hidden group-open:inline">{tx.nav.fechar}</span>
          </summary>
          <nav aria-label={tx.nav.principal} className="margem fixed inset-x-0 top-[var(--cabecalho)] bottom-0 overflow-y-auto bg-preto pt-8 pb-10">
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <li key={l.href} className="border-b border-linha py-3">
                  <Link href={l.href} className="flex items-baseline gap-4">
                    <span className="rotulo text-rec">0{i + 1}</span>
                    <span className="titulo-display text-[clamp(44px,12vw,88px)]">{l.rotulo}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}

/**
 * Bandeiras levam à mesma página no outro idioma. Link comum (<a>): cada
 * idioma tem o próprio layout raiz, então a troca recarrega a página.
 */
function SeletorIdioma({ lang, pathname, rotulo }: { lang: Idioma; pathname: string; rotulo: string }) {
  return (
    <nav aria-label={rotulo}>
      <ul className="flex items-center gap-1">
        {idiomas.map((l) => {
          const atual = l === lang;
          return (
            <li key={l}>
              <a
                href={traduzirCaminho(pathname, l)}
                hrefLang={codigoHtml[l]}
                lang={codigoHtml[l]}
                aria-current={atual ? 'true' : undefined}
                aria-label={`${nomeIdioma[l].nome} (${nomeIdioma[l].pais})`}
                data-idioma={l}
                className={`rotulo flex min-h-11 items-center gap-1.5 px-1.5 transition-colors ${atual ? 'text-creme' : 'text-cinza hover:text-creme'}`}
              >
                <Bandeira lang={l} className={atual ? 'outline outline-1 outline-offset-2 outline-creme/80' : ''} />
                <span className="hidden sm:inline">{l.toUpperCase()}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
