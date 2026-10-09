'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SeloIA } from '@/components/SeloIA';
import { VideoLoop } from '@/components/VideoLoop';
import { abas, type Idioma } from '@/data/idiomas';
import { textos } from '@/data/textos';
import type { Trabalho } from '@/data/trabalhos';
import { ehVideo, midia } from '@/lib/midia';
import { gsap, MIDIA, type ScrollTrigger, useGSAP } from '@/lib/motion';
import { caminho } from '@/lib/rotas';

interface Props {
  /** Já no idioma */
  itens: Trabalho[];
  lang: Idioma;
}

/** Mesma condição do CSS de .pelicula (globals.css): mouse, tela larga e movimento liberado */
const CONSULTA_PELICULA = `${MIDIA.desktop} and ${MIDIA.movimento}`;

/**
 * Destaques como película: no desktop a seção fica presa e, rolando para
 * baixo, os trabalhos correm na horizontal como clipes numa ilha de edição.
 * Cada um mantém a própria proporção. A agulha vermelha marca o que está no
 * ar: ele toca a prévia e acende. No celular, no tablet e com movimento
 * reduzido, os cards ficam um embaixo do outro (no toque, toca o que está no
 * meio da tela). Sem JS, a lista aparece inteira.
 */
export function Selecionados({ itens, lang }: Props) {
  const tx = textos[lang];
  const s = tx.selecionados;
  const raiz = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const gatilho = useRef<ScrollTrigger | null>(null);
  /** Centro de cada quadro (e do fim do rolo) em px, na coordenada do trilho */
  const centros = useRef<number[]>([]);
  const [ativo, setAtivo] = useState<number | null>(null);
  const atual = useRef<number | null>(null);

  const acender = useCallback((i: number | null) => {
    if (i === atual.current) return;
    atual.current = i;
    setAtivo(i);
  }, []);

  useGSAP(
    () => {
      gsap.matchMedia().add(CONSULTA_PELICULA, () => {
        const el = trilho.current;
        const secao = raiz.current;
        if (!el || !secao) return;
        const medir = () => {
          centros.current = [...el.querySelectorAll<HTMLElement>('[data-quadro], [data-fim-rolo]')].map((q) => q.offsetLeft + q.offsetWidth / 2);
        };
        medir();
        // Da agulha sobre o primeiro quadro até a agulha sobre o fim do rolo
        const distancia = () => {
          const c = centros.current;
          return c.length > 1 ? c[c.length - 1] - c[0] : 0;
        };
        const quadroNoAr = (x: number) => {
          const c = centros.current;
          const agulha = c[0] - x;
          let melhor = 0;
          for (let i = 1; i < c.length; i++) if (Math.abs(c[i] - agulha) < Math.abs(c[melhor] - agulha)) melhor = i;
          // O último centro é o fim do rolo: nada toca ali
          return melhor < c.length - 1 ? melhor : null;
        };
        const tween = gsap.to(el, {
          x: () => -distancia(),
          ease: 'none',
          scrollTrigger: {
            trigger: secao,
            start: 'top top',
            end: () => `+=${distancia()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onRefresh: medir,
            // Cada parada deixa um quadro inteiro sob a agulha
            snap: {
              snapTo: (p: number) => {
                const c = centros.current;
                const d = distancia();
                if (!d) return p;
                const alvos = c.map((x) => (x - c[0]) / d);
                return alvos.reduce((a, b) => (Math.abs(b - p) < Math.abs(a - p) ? b : a), alvos[0]);
              },
              duration: { min: 0.2, max: 0.5 },
              ease: 'power2.out',
            },
            onUpdate: () => acender(quadroNoAr(Number(gsap.getProperty(el, 'x')))),
          },
        });
        gatilho.current = tween.scrollTrigger ?? null;
        acender(0);
        return () => {
          gatilho.current = null;
          acender(null);
        };
      });
    },
    { scope: raiz },
  );

  // Toque e telas estreitas: o quadro que cruza o meio da tela toca a prévia
  useEffect(() => {
    if (window.matchMedia(CONSULTA_PELICULA).matches) return;
    const quadros = raiz.current?.querySelectorAll<HTMLElement>('[data-quadro]');
    if (!quadros) return;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const i = Number((e.target as HTMLElement).dataset.quadro);
          if (e.isIntersecting) acender(i);
          else if (atual.current === i) acender(null);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const q of quadros) io.observe(q);
    return () => io.disconnect();
  }, [acender]);

  /** Teclado na película: leva a rolagem até o quadro focado ficar sob a agulha */
  const focar = (i: number) => {
    const st = gatilho.current;
    const c = centros.current;
    if (!st || c.length < 2) return;
    const p = (c[i] - c[0]) / (c[c.length - 1] - c[0]);
    window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: 'instant' });
  };

  return (
    <section ref={raiz} id="trabalhos" aria-labelledby="selecionados-titulo" className="pelicula margem py-[clamp(72px,12vh,140px)]">
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

      <div className="pelicula-janela relative">
        <div ref={trilho} className="pelicula-trilho" style={{ '--razao-primeiro': razao(itens[0]) } as React.CSSProperties}>
          <ol className="pelicula-quadros">
            {itens.map((t, i) => {
              const m = midia(t.midia);
              return (
                <li key={t.slug} data-quadro={i} data-ativo={ativo === i ? '' : undefined} className="pelicula-quadro" style={{ '--razao': razao(t) } as React.CSSProperties}>
                  <Link href={caminho(lang, { pagina: 'trabalhos', trabalho: t.slug })} className="group block" onFocus={() => focar(i)}>
                    <span className="pelicula-midia relative block overflow-hidden bg-carvao">
                      <VideoLoop midia={m} alt="" tocar={ativo === i} preencher sizes="(min-width: 1024px) 60vw, 100vw" />
                      {t.feitoComIA && <SeloIA lang={lang} className="absolute top-3 left-3" />}
                      {ehVideo(m) && <span className="rotulo absolute right-3 bottom-3 bg-preto/80 px-2 py-1 text-creme">{tx.assistir}</span>}
                    </span>
                    <span className="mt-4 flex items-baseline gap-3">
                      <span className="rotulo text-cinza tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="titulo-display text-[clamp(30px,3vw,48px)] transition-colors group-hover:text-rec group-focus-visible:text-rec">{t.titulo}</span>
                    </span>
                    <span className="mt-1 block text-cinza">{[t.cliente, t.funcao].filter(Boolean).join(' · ')}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          {/* Fim do rolo: a última parada leva a todos os trabalhos */}
          <div data-fim-rolo className="pelicula-fim">
            <Link href={caminho(lang, { pagina: 'trabalhos' })} className="botao botao-rec">
              {s.todos}
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="pelicula-agulha" />
      </div>

      <nav aria-label={tx.indice.abasAria} className="mt-10 lg:hidden">
        <ul className="flex flex-wrap gap-2">
          {abas.map((a) => (
            <li key={a}>
              <Link href={caminho(lang, { pagina: 'trabalhos', aba: a })} className="botao text-creme">
                {tx.abas[a].nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

/** Largura sobre altura da peça (o quadro mantém a proporção na película) */
function razao(t: Trabalho | undefined): number {
  if (!t) return 16 / 9;
  const m = midia(t.midia);
  return Math.round((m.width / m.height) * 1000) / 1000;
}
