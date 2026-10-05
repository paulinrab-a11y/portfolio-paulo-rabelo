'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { progressoParaTimecode } from '@/lib/rolagem';

const links = [
  { href: '/trabalhos', rotulo: 'Trabalhos' },
  { href: '/sobre', rotulo: 'Sobre' },
  { href: '/#contato', rotulo: 'Contato' },
];

/**
 * Barra de software de edição: nome, timecode que anda com a rolagem (e
 * termina em FIM) e navegação. No celular a navegação vira um <details>,
 * que abre e fecha mesmo sem JS.
 */
export function Cabecalho() {
  const tc = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = tc.current;
    if (!el) return;
    let pedido = 0;
    const atualizar = () => {
      pedido = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.textContent = progressoParaTimecode(max > 0 ? window.scrollY / max : 0);
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
  }, []);

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
    <header className="margem fixed inset-x-0 top-0 z-50 flex h-[var(--cabecalho)] items-center justify-between gap-4 border-b border-linha/70 bg-preto/92">
      <Link href="/" className="rotulo text-creme hover:text-rec" aria-label="Paulo Rabelo, página inicial">
        Paulo Rabelo
      </Link>

      <p className="rotulo flex items-center gap-2 text-cinza" aria-hidden="true">
        <span className="rec-ponto rec-pisca" />
        <span ref={tc} className="tc min-w-[11ch] text-creme" data-testid="timecode-cabecalho">
          00:00:00:00
        </span>
      </p>

      <nav aria-label="Principal" className="hidden md:block">
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

      <details ref={menu} className="group md:hidden">
        <summary className="rotulo flex min-h-11 cursor-pointer list-none items-center text-creme [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Menu</span>
          <span className="hidden group-open:inline">Fechar</span>
        </summary>
        <nav aria-label="Principal" className="margem fixed inset-x-0 top-[var(--cabecalho)] bottom-0 bg-preto pt-10">
          <ul className="flex flex-col gap-2">
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-linha py-4">
                <Link href={l.href} className="flex items-baseline gap-4">
                  <span className="rotulo text-rec">0{i + 1}</span>
                  <span className="titulo-display text-[clamp(48px,14vw,96px)]">{l.rotulo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </header>
  );
}
