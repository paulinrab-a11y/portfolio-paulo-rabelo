'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SeloIA } from '@/components/SeloIA';
import { VideoLoop } from '@/components/VideoLoop';
import { abas, type Idioma } from '@/data/idiomas';
import { textos } from '@/data/textos';
import type { Trabalho } from '@/data/trabalhos';
import { ehVideo, midia } from '@/lib/midia';
import { entrar, gsap, MIDIA, useGSAP } from '@/lib/motion';
import { caminho } from '@/lib/rotas';

interface Props {
  /** Já no idioma */
  itens: Trabalho[];
  lang: Idioma;
}

/**
 * Lista estilo casa de edição. No desktop, hover ou foco mostram a prévia,
 * que segue o cursor com atraso. No celular, o item no centro da tela toca a
 * própria prévia, um por vez.
 */
export function Selecionados({ itens, lang }: Props) {
  const tx = textos[lang];
  const s = tx.selecionados;
  const raiz = useRef<HTMLElement>(null);
  const previa = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState<number | null>(null);
  const [noCentro, setNoCentro] = useState<number | null>(null);
  const mover = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MIDIA.desktop, () => {
        const el = previa.current;
        if (!el) return;
        const reduzido = window.matchMedia(MIDIA.reduzido).matches;
        const dur = reduzido ? 0 : 0.55;
        mover.current = {
          x: gsap.quickTo(el, 'x', { duration: dur, ease: 'power3.out' }),
          y: gsap.quickTo(el, 'y', { duration: dur, ease: 'power3.out' }),
        };
        return () => {
          mover.current = null;
        };
      });
      mm.add(MIDIA.movimento, () => {
        // Efeito registrado em src/lib/motion.ts
        entrar('[data-linha-trabalho]', { y: 24, duration: 0.6, scrollTrigger: { trigger: raiz.current ?? undefined, start: 'top 75%', once: true } });
      });
    },
    { scope: raiz },
  );

  // Celular: o item que cruza o meio da tela toca a prévia
  useEffect(() => {
    if (window.matchMedia(MIDIA.desktop).matches) return;
    const linhas = raiz.current?.querySelectorAll<HTMLElement>('[data-linha-trabalho]');
    if (!linhas) return;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const i = Number((e.target as HTMLElement).dataset.indice);
          if (e.isIntersecting) setNoCentro(i);
          else setNoCentro((atual) => (atual === i ? null : atual));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const l of linhas) io.observe(l);
    return () => io.disconnect();
  }, []);

  const posicionar = (x: number, y: number) => {
    const el = previa.current;
    if (!el || !mover.current) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    mover.current.x(Math.min(window.innerWidth - w - 16, x + 24));
    mover.current.y(Math.min(window.innerHeight - h - 16, Math.max(16, y - h / 2)));
  };

  const focar = (i: number, alvo: HTMLElement) => {
    setAtivo(i);
    const r = alvo.getBoundingClientRect();
    posicionar(r.right - (previa.current?.offsetWidth ?? 0) - 120, r.top + r.height / 2);
  };

  const atual = ativo === null ? null : itens[ativo];

  return (
    <section ref={raiz} id="trabalhos" aria-labelledby="selecionados-titulo" className="margem py-[clamp(72px,12vh,140px)]">
      <div className="mb-10 flex items-end justify-between gap-6 border-b border-linha pb-6">
        <div>
          <p className="rotulo mb-3 text-rec">{s.rotulo}</p>
          <h2 id="selecionados-titulo" className="titulo-display text-[clamp(48px,8vw,128px)]">
            {s.titulo}
          </h2>
        </div>
        <nav aria-label={tx.indice.abasAria} className="hidden shrink-0 md:block">
          <ul className="rotulo flex gap-5 text-cinza">
            {abas.map((a) => (
              <li key={a}>
                <Link href={caminho(lang, { pagina: 'trabalhos', aba: a })} className="hover:text-creme">
                  {tx.abas[a].nome}
                </Link>
              </li>
            ))}
            <li>
              <Link href={caminho(lang, { pagina: 'trabalhos' })} className="text-creme hover:text-rec">
                {s.todos}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="rotulo mb-2 hidden grid-cols-12 gap-4 text-cinza lg:grid" aria-hidden="true">
        <span className="col-span-1">{s.numero}</span>
        <span className="col-span-4">{s.projeto}</span>
        <span className="col-span-3">{s.cliente}</span>
        <span className="col-span-2">{s.funcao}</span>
        <span className="col-span-2 text-right">{s.categoria}</span>
      </div>

      <ol onPointerLeave={() => setAtivo(null)}>
        {itens.map((t, i) => {
          const m = midia(t.midia);
          return (
            <li key={t.slug} data-linha-trabalho data-indice={i} className="border-b border-linha">
              <Link
                href={caminho(lang, { pagina: 'trabalhos', trabalho: t.slug })}
                className="group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 py-6 transition-colors hover:text-rec focus-visible:text-rec lg:py-7"
                onPointerEnter={(e) => {
                  setAtivo(i);
                  posicionar(e.clientX, e.clientY);
                }}
                onPointerMove={(e) => posicionar(e.clientX, e.clientY)}
                onFocus={(e) => focar(i, e.currentTarget)}
                onBlur={() => setAtivo(null)}
              >
                <span className="rotulo col-span-2 text-cinza tabular-nums lg:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="titulo-display col-span-10 text-[clamp(32px,4.4vw,64px)] lg:col-span-4">{t.titulo}</span>
                <span className="col-span-10 col-start-3 text-cinza lg:col-span-3 lg:col-start-auto">{t.cliente}</span>
                <span className="col-span-10 col-start-3 text-sm text-cinza lg:col-span-2 lg:col-start-auto">{t.funcao}</span>
                <span className="rotulo col-span-10 col-start-3 text-cinza lg:col-span-2 lg:col-start-auto lg:text-right">
                  {t.categorias.map((c) => tx.categorias[c]).join(' · ')}
                </span>
                {/* Prévia própria no celular e no tablet (toque); a flutuante é só com mouse */}
                <span className="relative col-span-12 mt-3 block lg:pointer-fine:hidden">
                  <VideoLoop midia={m} alt="" tocar={noCentro === i} sizes="100vw" />
                  {t.feitoComIA && <SeloIA lang={lang} className="absolute top-3 left-3" />}
                  {ehVideo(m) && <span className="rotulo absolute right-3 bottom-3 bg-preto/80 px-2 py-1 text-creme">{tx.assistir}</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <nav aria-label={tx.indice.abasAria} className="mt-10 lg:hidden">
        <ul className="flex flex-wrap gap-2">
          {abas.map((a) => (
            <li key={a}>
              <Link href={caminho(lang, { pagina: 'trabalhos', aba: a })} className="botao text-creme">
                {tx.abas[a].nome}
              </Link>
            </li>
          ))}
          <li>
            <Link href={caminho(lang, { pagina: 'trabalhos' })} className="botao botao-rec">
              {s.todos}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Prévia flutuante do desktop (decorativa: o link já descreve o trabalho) */}
      <div ref={previa} className="previa-flutuante hidden w-[min(34vw,520px)] lg:pointer-fine:block" data-visivel={atual !== null} aria-hidden="true">
        <div className="relative bg-carvao shadow-[0_0_0_1px_#2a2a2e]">
          {itens.map((t, i) => {
            const m = midia(t.midia);
            return (
              <div key={t.slug} className={i === ativo ? 'relative' : 'absolute inset-0 opacity-0'}>
                <VideoLoop midia={m} alt="" tocar={i === ativo} sizes="34vw" className={m.orientation === 'vertical' ? 'mx-auto max-h-[60vh] !aspect-[9/16]' : ''} />
              </div>
            );
          })}
          {atual && (
            <>
              {atual.feitoComIA && <SeloIA lang={lang} className="absolute top-3 left-3" />}
              {ehVideo(midia(atual.midia)) && <span className="rotulo absolute right-3 bottom-3 bg-rec px-2 py-1 text-preto">{tx.assistir}</span>}
            </>
          )}
        </div>
        {atual && midia(atual.midia).preview?.in && (
          <p className="rotulo tc mt-2 flex justify-between text-cinza">
            <span>IN {midia(atual.midia).preview?.in}</span>
            <span>OUT {midia(atual.midia).preview?.out}</span>
          </p>
        )}
      </div>
    </section>
  );
}
