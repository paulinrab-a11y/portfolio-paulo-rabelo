'use client';

import Link from 'next/link';
import { useCallback, useMemo, useRef, useState } from 'react';
import { SeloIA } from '@/components/SeloIA';
import { VideoLoop } from '@/components/VideoLoop';
import { type Trabalho, type Trilha, trilhas } from '@/data/trabalhos';
import { midia } from '@/lib/midia';
import { gsap, MIDIA, ScrollTrigger, useGSAP } from '@/lib/motion';
import { timecode } from '@/lib/timecode';
import { buscar, clipeNoPonto, montarTimeline } from '@/lib/trabalhos';

const ORDEM = Object.keys(trilhas) as Trilha[];

/**
 * Timeline de edição. No desktop a seção fica presa enquanto o playhead anda
 * com a rolagem; o clipe sob o playhead vai para o monitor. No celular, cada
 * trilha é uma faixa com scroll-snap e o monitor fica grudado no topo.
 * Em movimento reduzido vira lista por categoria.
 */
export function Timeline({ lista }: { lista: Trabalho[] }) {
  const raiz = useRef<HTMLElement>(null);
  const playhead = useRef<HTMLDivElement>(null);
  const barra = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const clipes = useMemo(() => montarTimeline(lista, ORDEM), [lista]);
  const [ativo, setAtivo] = useState(0);
  const atual = useRef(0);

  const duracaoTotal = useMemo(() => clipes.reduce((s, c) => s + (midia(buscar(lista, c.slug)?.midia ?? '').preview?.duration ?? 8), 0), [clipes, lista]);

  const aplicar = useCallback(
    (p: number) => {
      if (playhead.current) playhead.current.style.transform = `translateX(${p * 100}cqw)`;
      if (barra.current) barra.current.style.transform = `scaleX(${p})`;
      if (tc.current) tc.current.textContent = timecode(p * duracaoTotal * 1000);
      const i = clipeNoPonto(clipes, p);
      if (i !== atual.current) {
        atual.current = i;
        setAtivo(i);
      }
    },
    [clipes, duracaoTotal],
  );

  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 1024px) and ${MIDIA.movimento}`, () => {
        ScrollTrigger.create({
          trigger: raiz.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (st) => aplicar(st.progress),
        });
      });
    },
    { scope: raiz, dependencies: [aplicar] },
  );

  /** Teclado e clique no desktop: leva a rolagem até o meio do clipe, sem animar */
  const irPara = (i: number) => {
    setAtivo(i);
    atual.current = i;
    if (tc.current) tc.current.textContent = timecode(clipes[i].inicio * duracaoTotal * 1000);
    const sec = raiz.current;
    if (!sec || !window.matchMedia('(min-width: 1024px)').matches) return;
    const c = clipes[i];
    const meio = (c.inicio + c.fim) / 2;
    const topo = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: topo + meio * (sec.offsetHeight - window.innerHeight), behavior: 'instant' });
  };

  const teclas = (e: React.KeyboardEvent) => {
    const passo = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!passo) return;
    e.preventDefault();
    const i = Math.min(clipes.length - 1, Math.max(0, ativo + passo));
    irPara(i);
    raiz.current?.querySelector<HTMLButtonElement>(`[data-clipe="${i}"]:not([hidden])`)?.focus();
  };

  const trabalhoAtivo = buscar(lista, clipes[ativo]?.slug ?? '');
  const midiaAtiva = trabalhoAtivo ? midia(trabalhoAtivo.midia) : null;

  return (
    <>
      <section ref={raiz} aria-labelledby="timeline-titulo" className="so-movimento relative lg:h-[340vh]" onKeyDown={teclas}>
        <div className="margem flex flex-col gap-4 pt-16 pb-10 lg:sticky lg:top-[var(--cabecalho)] lg:h-[calc(100svh-var(--cabecalho))] lg:pt-6 lg:pb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="rotulo mb-2 text-rec">02 · Timeline</p>
              <h2 id="timeline-titulo" className="titulo-display text-[clamp(40px,5.6vw,88px)]">
                Na ilha
              </h2>
            </div>
            <p className="rotulo text-right text-cinza">
              <span className="hidden lg:inline">Role para editar · ← → navegam</span>
              <span className="block text-lg text-creme lg:mt-1">
                <span ref={tc} className="tc tc-vivo">
                  00:00:00:00
                </span>
              </span>
            </p>
          </div>

          {/* Monitor de programa */}
          <div className="sticky top-[var(--cabecalho)] z-10 -mx-[var(--margem)] bg-preto px-[var(--margem)] py-2 lg:static lg:m-0 lg:min-h-0 lg:flex-1 lg:p-0">
            <div className="relative mx-auto aspect-video max-h-full bg-black shadow-[0_0_0_1px_#2a2a2e] lg:h-full lg:w-auto">
              {midiaAtiva && trabalhoAtivo && (
                <VideoLoop key={trabalhoAtivo.slug} midia={midiaAtiva} alt="" tocar ajuste="contain" preencher sizes="(min-width: 1024px) 60vw, 100vw" />
              )}
              {trabalhoAtivo && (
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-[linear-gradient(to_top,rgb(0_0_0/0.85),transparent)] p-3 md:p-4">
                  <div aria-live="polite">
                    <p className="rotulo text-rec">{trabalhoAtivo.trilha}</p>
                    <p className="titulo-display text-[clamp(22px,2.6vw,40px)]">{trabalhoAtivo.titulo}</p>
                  </div>
                  <Link href={`/trabalhos/${trabalhoAtivo.slug}`} className="rotulo shrink-0 border border-creme/70 bg-preto/70 px-3 py-2 hover:bg-creme hover:text-preto">
                    Abrir <span className="sr-only">{trabalhoAtivo.titulo}</span>
                  </Link>
                </div>
              )}
              {trabalhoAtivo?.feitoComIA && <SeloIA className="absolute top-3 left-3" />}
            </div>
          </div>

          {/* Trilhas: desktop, régua com playhead */}
          <div className="relative hidden lg:block">
            <div className="h-0.5 bg-linha">
              <div ref={barra} className="h-full origin-left scale-x-0 bg-rec" />
            </div>
            <div className="relative mt-3 flex flex-col gap-1.5 [container-type:inline-size]">
              {ORDEM.map((tr) => (
                <div key={tr} className="relative flex h-9 items-stretch">
                  <span className="rotulo absolute top-0 -left-[calc(var(--margem)-8px)] flex h-full w-12 items-center text-cinza">{tr}</span>
                  <div className="relative flex-1 bg-carvao">
                    {clipes.map((c, i) =>
                      c.trilha !== tr ? null : (
                        <button
                          key={c.slug}
                          type="button"
                          data-clipe={i}
                          onClick={() => irPara(i)}
                          onFocus={() => irPara(i)}
                          aria-pressed={ativo === i}
                          className={`absolute inset-y-0 overflow-hidden text-ellipsis border-x border-preto px-2 text-left text-[11px] leading-9 whitespace-nowrap transition-colors ${ativo === i ? 'bg-rec text-preto' : 'bg-linha text-creme hover:bg-cinza hover:text-preto'}`}
                          style={{ left: `${c.inicio * 100}%`, width: `${(c.fim - c.inicio) * 100}%` }}
                        >
                          <span className="sr-only">Mostrar no monitor: </span>
                          {buscar(lista, c.slug)?.titulo}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ))}
              <div ref={playhead} aria-hidden="true" className="pointer-events-none absolute -top-3 bottom-0 left-0 w-px bg-rec will-change-transform">
                <span className="absolute -top-1 -left-[5px] h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-rec" />
              </div>
            </div>
            <p className="rotulo mt-2 flex justify-between text-cinza" aria-hidden="true">
              {ORDEM.map((tr) => (
                <span key={tr}>
                  {tr} {trilhas[tr]}
                </span>
              ))}
            </p>
          </div>

          {/* Trilhas: celular, faixas com scroll-snap */}
          <div className="flex flex-col gap-5 lg:hidden">
            {ORDEM.map((tr) => (
              <div key={tr}>
                <p className="rotulo mb-2 text-cinza">
                  <span className="text-rec">{tr}</span> {trilhas[tr]}
                </p>
                <ul className="-mx-[var(--margem)] flex snap-x snap-mandatory gap-2 overflow-x-auto px-[var(--margem)] pb-2 [scrollbar-width:none]">
                  {clipes.map((c, i) =>
                    c.trilha !== tr ? null : (
                      <li key={c.slug} className="shrink-0 snap-start">
                        <button
                          type="button"
                          data-clipe={i}
                          onClick={() => irPara(i)}
                          aria-pressed={ativo === i}
                          className={`relative flex min-h-12 w-[62vw] max-w-72 items-center border px-3 text-left text-sm ${ativo === i ? 'border-rec bg-rec text-preto' : 'border-linha bg-carvao text-creme'}`}
                        >
                          <span className="sr-only">Mostrar no monitor: </span>
                          {buscar(lista, c.slug)?.titulo}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movimento reduzido: lista por categoria */}
      <section aria-labelledby="timeline-lista-titulo" className="so-reduzido margem py-20">
        <p className="rotulo mb-2 text-rec">02 · Por trilha</p>
        <h2 id="timeline-lista-titulo" className="titulo-display mb-10 text-[clamp(40px,5.6vw,88px)]">
          Na ilha
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          {ORDEM.map((tr) => (
            <div key={tr}>
              <h3 className="rotulo mb-3 border-b border-linha pb-2 text-cinza">
                <span className="text-rec">{tr}</span> {trilhas[tr]}
              </h3>
              <ul className="space-y-2">
                {lista
                  .filter((t) => t.trilha === tr)
                  .map((t) => (
                    <li key={t.slug}>
                      <Link href={`/trabalhos/${t.slug}`} className="text-lg hover:text-rec">
                        {t.titulo}
                      </Link>
                      {t.feitoComIA && <SeloIA className="ml-3 align-middle" />}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
