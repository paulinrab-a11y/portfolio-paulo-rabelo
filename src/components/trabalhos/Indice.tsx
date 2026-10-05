'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, ViewTransition } from 'react';
import { SeloIA } from '@/components/SeloIA';
import { type Categoria, categorias, type Trabalho } from '@/data/trabalhos';
import { ehVideo, midia } from '@/lib/midia';
import { Flip } from '@/lib/flip';
import { lerEstado, type Modo, montarBusca } from '@/lib/filtroUrl';
import { gsap } from '@/lib/motion';
import { categoriasUsadas, filtrar } from '@/lib/trabalhos';

/**
 * Índice de todos os trabalhos: filtro por categoria e alternância entre
 * lista e grade. A troca reordena com GSAP Flip (rápido: é ação repetida).
 * Sem JS, mostra todos em lista. Filtro e modo ficam na URL
 * (?categoria=ia&modo=grade): o link compartilhado e o voltar mantêm a escolha.
 */
export function Indice({ lista }: { lista: Trabalho[] }) {
  const [filtro, setFiltro] = useState<Categoria | null>(null);
  const [modo, setModo] = useState<Modo>('lista');
  const raiz = useRef<HTMLDivElement>(null);
  const estado = useRef<Flip.FlipState | null>(null);

  const usadas = useMemo(() => categoriasUsadas(lista, Object.keys(categorias) as Categoria[]), [lista]);
  const lida = useRef(false);

  // Estado inicial vem da URL (depois da hidratação, sem animar)
  useEffect(() => {
    const e = lerEstado(window.location.search, usadas);
    setFiltro(e.categoria);
    setModo(e.modo);
    lida.current = true;
  }, [usadas]);

  // Cada mudança vai para a URL, sem criar entrada nova no histórico
  useEffect(() => {
    if (!lida.current) return;
    const busca = montarBusca({ categoria: filtro, modo });
    if (busca !== window.location.search) window.history.replaceState(window.history.state, '', `${window.location.pathname}${busca}`);
  }, [filtro, modo]);
  const visiveis = new Set(filtrar(lista, filtro).map((t) => t.slug));

  const mudar = (acao: () => void) => {
    const itens = raiz.current?.querySelectorAll('[data-item]');
    if (itens && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) estado.current = Flip.getState(itens);
    acao();
  };

  useLayoutEffect(() => {
    const anterior = estado.current;
    if (!anterior) return;
    estado.current = null;
    Flip.from(anterior, {
      targets: raiz.current?.querySelectorAll('[data-item]'),
      duration: 0.38,
      ease: 'power3.inOut',
      absolute: true,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.3 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.96, duration: 0.18 }),
    });
  });

  return (
    <div ref={raiz}>
      <div className="mb-8 flex flex-col gap-4 border-b border-linha pb-6 lg:flex-row lg:items-center lg:justify-between">
        <fieldset>
          <legend className="sr-only">Filtrar por categoria</legend>
          <div className="flex flex-wrap gap-2">
            <BotaoFiltro ativo={filtro === null} onClick={() => mudar(() => setFiltro(null))}>
              Todos <span className={filtro === null ? 'text-grafite' : 'text-cinza'}>{lista.length}</span>
            </BotaoFiltro>
            {usadas.map((c) => (
              <BotaoFiltro key={c} ativo={filtro === c} onClick={() => mudar(() => setFiltro(c))}>
                {categorias[c]} <span className={filtro === c ? 'text-grafite' : 'text-cinza'}>{filtrar(lista, c).length}</span>
              </BotaoFiltro>
            ))}
          </div>
        </fieldset>
        <fieldset className="flex gap-2">
          <legend className="sr-only">Modo de exibição</legend>
          {(['lista', 'grade'] as const).map((m) => (
            <BotaoFiltro key={m} ativo={modo === m} onClick={() => mudar(() => setModo(m))}>
              {m === 'lista' ? 'Lista' : 'Grade'}
            </BotaoFiltro>
          ))}
        </fieldset>
      </div>

      <p className="sr-only" aria-live="polite">
        {visiveis.size} trabalhos{filtro ? ` em ${categorias[filtro]}` : ''}
      </p>

      <ul className={modo === 'grade' ? 'grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'} data-modo={modo}>
        {lista.map((t, i) => {
          const m = midia(t.midia);
          const mostrar = visiveis.has(t.slug);
          return (
            <li key={t.slug} data-item data-flip-id={t.slug} hidden={!mostrar} className={modo === 'lista' ? 'border-b border-linha' : ''}>
              <Link href={`/trabalhos/${t.slug}`} className={`group ${modo === 'lista' ? 'grid grid-cols-12 items-center gap-4 py-4' : 'flex flex-col gap-3'}`}>
                <span className={`relative block overflow-hidden bg-carvao ${modo === 'lista' ? 'col-span-4 aspect-video sm:col-span-2' : 'aspect-[4/3]'}`}>
                  <ViewTransition name={`trabalho-${t.slug}`} share="trabalho" default="none">
                    <Image
                      src={m.poster.avif}
                      alt=""
                      fill
                      sizes={modo === 'lista' ? '200px' : '(min-width: 1024px) 33vw, 100vw'}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </ViewTransition>
                  {t.feitoComIA && <SeloIA className="absolute top-2 left-2 scale-90 origin-top-left" />}
                  {ehVideo(m) && modo === 'grade' && <span className="rotulo absolute right-2 bottom-2 bg-preto/80 px-2 py-1">▶ Assistir</span>}
                </span>
                <span className={modo === 'lista' ? 'col-span-8 sm:col-span-10 sm:grid sm:grid-cols-10 sm:items-baseline sm:gap-4' : 'flex flex-col gap-1'}>
                  <span className={`rotulo text-cinza ${modo === 'lista' ? 'sm:col-span-1' : ''}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`titulo-display block text-[clamp(26px,3vw,44px)] group-hover:text-rec ${modo === 'lista' ? 'sm:col-span-4' : ''}`}>{t.titulo}</span>
                  <span className={`block text-cinza ${modo === 'lista' ? 'text-sm sm:col-span-3' : ''}`}>{[t.cliente, t.funcao].filter(Boolean).join(' · ')}</span>
                  <span className={`rotulo block text-cinza ${modo === 'lista' ? 'sm:col-span-2 sm:text-right' : ''}`}>{t.categorias.map((c) => categorias[c]).join(' · ')}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BotaoFiltro({ ativo, onClick, children }: { ativo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      onClick={onClick}
      className={`rotulo min-h-11 border px-3 transition-colors ${ativo ? 'border-creme bg-creme text-preto' : 'border-linha text-creme hover:border-creme'}`}
    >
      {children}
    </button>
  );
}
