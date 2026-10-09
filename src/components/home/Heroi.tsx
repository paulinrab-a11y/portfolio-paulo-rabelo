'use client';

import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { VideoLoop } from '@/components/VideoLoop';
import type { Idioma } from '@/data/idiomas';
import { textos } from '@/data/textos';
import type { Midia } from '@/lib/midia';
import { type Corte, corteNoTempo } from '@/lib/reel';
import { timecode } from '@/lib/timecode';

/** Corte do reel já com o título no idioma e o link do trabalho */
export interface CorteDoHeroi extends Corte {
  titulo: string;
  href: string;
  /** Quadro do trabalho (poster) que preenche o clipe na trilha */
  quadro: string;
}

interface Props {
  lang: Idioma;
  funcaoCurta: string;
  /** Reel do herói (media.json > hero) */
  reel: Midia;
  cortes: CorteDoHeroi[];
}

const comMouse = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Herói: o monitor de programa da ilha de edição. O reel toca nítido, perto
 * do tamanho nativo (as peças têm até ~1150 px; tela cheia esticaria quase
 * 2×). Sob ele, a mini timeline mostra cada corte como um clipe com um
 * quadro do próprio trabalho, como na trilha de um programa de edição: a agulha
 * anda com o vídeo e o nome do trabalho em tela troca a cada corte. Com
 * mouse, passar sobre um clipe leva o vídeo àquele corte; clicar abre o
 * trabalho. O poster é o LCP.
 */
export function Heroi({ lang, funcaoCurta, reel, cortes }: Props) {
  const tx = textos[lang].heroi;
  const tc = useRef<HTMLSpanElement>(null);
  const agulha = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [ativo, setAtivo] = useState(0);
  const indice = useRef(0);
  const total = cortes.length ? cortes[cortes.length - 1].fim : 1;

  // Agulha (30 fps) e timecode (15 fps) escritos direto no DOM enquanto o vídeo
  // toca; o React só renderiza quando o corte muda (a cada ~1,5 s).
  const desligar = useRef(() => {});
  const ligarVideo = useCallback(
    (v: HTMLVideoElement | null) => {
      desligar.current();
      desligar.current = () => {};
      video.current = v;
      if (!v) return;
      let pedido = 0;
      let ultimoTc = 0;
      let ultimo = 0;
      const quadro = (agora: number) => {
        pedido = requestAnimationFrame(quadro);
        // 30 quadros por segundo bastam para a agulha (o vídeo também é 30 fps)
        if (agora - ultimo < 32) return;
        ultimo = agora;
        const t = v.currentTime;
        if (agulha.current) agulha.current.style.transform = `translateX(${(Math.min(t, total) / total) * 100}cqw)`;
        if (tc.current && agora - ultimoTc > 66) {
          ultimoTc = agora;
          tc.current.textContent = timecode(t * 1000);
        }
        const i = corteNoTempo(cortes, t);
        if (i !== indice.current && i >= 0) {
          indice.current = i;
          setAtivo(i);
        }
      };
      const iniciar = () => {
        cancelAnimationFrame(pedido);
        pedido = requestAnimationFrame(quadro);
      };
      const parar = () => cancelAnimationFrame(pedido);
      v.addEventListener('playing', iniciar);
      v.addEventListener('pause', parar);
      desligar.current = () => {
        parar();
        v.removeEventListener('playing', iniciar);
        v.removeEventListener('pause', parar);
      };
    },
    [cortes, total],
  );

  /** Mouse sobre um clipe: o vídeo vai para o começo daquele corte */
  const irParaCorte = (c: CorteDoHeroi) => {
    const v = video.current;
    if (!v || v.paused || !comMouse()) return;
    v.currentTime = c.inicio + 0.04;
  };

  const atual = cortes[ativo];

  return (
    <section
      aria-labelledby="heroi-nome"
      className="margem grade relative min-h-[100svh] content-center gap-y-8 pt-[calc(var(--cabecalho)+clamp(24px,5vh,56px))] pb-[clamp(40px,7vh,80px)] lg:items-end"
    >
      {/* Monitor de programa */}
      <div className="col-span-12 lg:order-2 lg:col-span-7 lg:col-start-6">
        <div className="rotulo mb-3 flex items-center justify-between text-cinza">
          <span className="flex items-center gap-2 text-creme">
            <span className="rec-ponto rec-pisca" /> {tx.programa}
          </span>
          <span ref={tc} className="tc tc-vivo text-creme" aria-hidden="true">
            00:00:00:00
          </span>
        </div>
        <div className="monitor relative">
          <VideoLoop midia={reel} alt={tx.altVideo} prioridade sizes="(min-width: 1024px) 56vw, 100vw" aoMontar={ligarVideo} />
          {/* Cantos do visor */}
          <span aria-hidden="true" className="pointer-events-none absolute -top-2 -left-2 h-5 w-5 border-t-2 border-l-2 border-creme/70" />
          <span aria-hidden="true" className="pointer-events-none absolute -top-2 -right-2 h-5 w-5 border-t-2 border-r-2 border-creme/70" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-2 -left-2 h-5 w-5 border-b-2 border-l-2 border-creme/70" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-2 -bottom-2 h-5 w-5 border-r-2 border-b-2 border-creme/70" />
        </div>

        {/* Mini timeline: cada corte do reel é um clipe (decorativa; o link acessível é o "No monitor") */}
        <div className="trilha-reel relative mt-5 [container-type:inline-size]" aria-hidden="true">
          <div className="flex h-11 gap-px bg-linha">
            {cortes.map((c, i) => (
              <a
                key={`${c.slug}-${c.inicio}`}
                href={c.href}
                tabIndex={-1}
                data-corte={i}
                data-ativo={i === ativo ? '' : undefined}
                style={{ flexGrow: c.fim - c.inicio }}
                onPointerEnter={() => irParaCorte(c)}
                className="corte-reel relative min-w-0 basis-0 overflow-hidden bg-carvao"
              >
                {/* biome-ignore lint/performance/noImgElement: miniatura decorativa de 40 px, o mesmo poster já usado na página */}
                <img src={c.quadro} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </a>
            ))}
          </div>
          <div ref={agulha} className="pointer-events-none absolute -top-1.5 -bottom-1.5 left-0 w-0.5 bg-rec will-change-transform" />
        </div>

        {atual && (
          <p className="mt-3 flex items-baseline gap-3 text-sm">
            <span className="rotulo text-cinza">{tx.noMonitor}</span>
            <Link href={atual.href} className="link-monitor text-creme hover:text-rec">
              {atual.titulo} <span aria-hidden="true">↗</span>
            </Link>
          </p>
        )}
      </div>

      {/* Nome, função e chamadas */}
      <div className="col-span-12 lg:order-1 lg:col-span-5">
        <h1 id="heroi-nome" className="titulo-display text-[clamp(72px,19vw,120px)] text-creme lg:text-[clamp(96px,9.4vw,176px)]">
          <span className="block">Paulo</span> <span className="block">Rabelo</span>
        </h1>
        <p className="mt-5 font-mono text-[15px] text-creme md:text-lg">
          <span className="sr-only">{funcaoCurta}</span>
          <span aria-hidden="true" className="digitar relative inline-block" style={{ '--letras': funcaoCurta.length } as React.CSSProperties}>
            <span className="digitar-texto marca-texto">{funcaoCurta}</span>
            <span className="cursor-digitacao digitar-cursor" />
          </span>
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#trabalhos" className="botao botao-rec">
            {tx.verTrabalhos}
          </a>
          <a href="#contato" className="botao text-creme">
            {tx.falarComigo}
          </a>
        </div>
      </div>
    </section>
  );
}
