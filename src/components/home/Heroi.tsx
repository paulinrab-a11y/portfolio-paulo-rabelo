'use client';

import { useCallback, useRef } from 'react';
import { VideoLoop } from '@/components/VideoLoop';
import { perfil } from '@/data/perfil';
import { midia } from '@/lib/midia';
import { gsap, MIDIA, useGSAP } from '@/lib/motion';
import { timecode } from '@/lib/timecode';

const heroi = midia('hero');

/**
 * Herói monitor. O loop ocupa a tela com o poster como LCP. Ao rolar, a
 * imagem encolhe para dentro de um monitor (scrub, só transform e opacity).
 */
export function Heroi() {
  const raiz = useRef<HTMLElement>(null);
  const tc = useRef<HTMLSpanElement>(null);

  // Timecode do HUD acompanha o loop, escrito direto no DOM a 15 fps. Para
  // quando o vídeo pausa (fora da tela) e quando o HUD já sumiu na rolagem.
  const ligarTimecode = useCallback((v: HTMLVideoElement | null) => {
    if (!v) return;
    let pedido = 0;
    let ultimo = 0;
    const quadro = (agora: number) => {
      pedido = requestAnimationFrame(quadro);
      if (agora - ultimo < 66 || !tc.current || window.scrollY > window.innerHeight * 0.6) return;
      ultimo = agora;
      tc.current.textContent = timecode(v.currentTime * 1000);
    };
    const iniciar = () => {
      cancelAnimationFrame(pedido);
      pedido = requestAnimationFrame(quadro);
    };
    const parar = () => cancelAnimationFrame(pedido);
    v.addEventListener('playing', iniciar);
    v.addEventListener('pause', parar);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: '(min-width: 768px)', movimento: MIDIA.movimento }, (ctx) => {
        if (!ctx.conditions?.movimento) return;
        const escala = ctx.conditions.desktop ? 0.62 : 0.8;
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: raiz.current, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
        });
        tl.to('[data-tela]', { scale: escala }, 0)
          .to('[data-moldura]', { opacity: 1 }, 0.15)
          .to('[data-texto]', { yPercent: -18, opacity: 0 }, 0)
          .to('[data-hud]', { opacity: 0 }, 0);
      });
    },
    { scope: raiz },
  );

  return (
    <section ref={raiz} aria-labelledby="heroi-nome" className="relative h-[175svh] motion-reduce:h-svh">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Tela: vídeo + moldura do monitor, escalados juntos */}
        <div data-tela className="absolute inset-0 origin-[50%_45%] will-change-transform">
          <VideoLoop midia={heroi} alt="Trechos de clipes, visualizer, podcast e vídeo para YouTube editados por Paulo Rabelo" prioridade preencher aoMontar={ligarTimecode} />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_11_12/0.92),rgb(11_11_12/0.15)_45%,rgb(11_11_12/0.45))]" />
          <div data-moldura aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 shadow-[0_0_0_18px_#151517,0_0_0_19px_#2a2a2e]">
            <span className="rotulo absolute -top-12 left-0 text-cinza">Programa · V1</span>
            <span className="rotulo absolute -top-12 right-0 text-rec">● Ao vivo</span>
            <span className="absolute -bottom-24 left-1/2 h-16 w-[16%] -translate-x-1/2 bg-carvao" />
          </div>
        </div>

        {/* HUD de visor nos cantos */}
        <div data-hud aria-hidden="true" className="margem pointer-events-none absolute inset-x-0 top-[calc(var(--cabecalho)+16px)] bottom-6 text-creme">
          <span className="absolute top-0 left-[var(--margem)] h-6 w-6 border-t-2 border-l-2 border-creme/70" />
          <span className="absolute top-0 right-[var(--margem)] h-6 w-6 border-t-2 border-r-2 border-creme/70" />
          <span className="absolute bottom-0 left-[var(--margem)] h-6 w-6 border-b-2 border-l-2 border-creme/70" />
          <span className="absolute right-[var(--margem)] bottom-0 h-6 w-6 border-r-2 border-b-2 border-creme/70" />
          <p className="rotulo absolute top-3 left-[calc(var(--margem)+36px)] flex items-center gap-2">
            <span className="rec-ponto rec-pisca" /> REC
          </p>
          <p className="rotulo absolute top-3 right-[calc(var(--margem)+36px)]">
            <span ref={tc} className="tc tc-vivo">
              00:00:00:00
            </span>
          </p>
          <p className="rotulo absolute bottom-3 left-[calc(var(--margem)+36px)] hidden sm:block">{perfil.hud}</p>
          <p className="rotulo absolute right-[calc(var(--margem)+36px)] bottom-3">Desça ↓</p>
        </div>

        {/* Nome, função e chamadas */}
        <div data-texto className="margem absolute inset-x-0 bottom-[max(12svh,72px)]">
          <h1 id="heroi-nome" className="titulo-display text-[18vw] text-creme md:text-[13.5vw]">
            <span className="block md:inline">Paulo</span> <span className="block md:inline">Rabelo</span>
          </h1>
          <p className="mt-4 font-mono text-[15px] text-creme md:mt-6 md:text-lg">
            <span className="sr-only">{perfil.funcaoCurta}</span>
            <span aria-hidden="true" className="digitar relative inline-block" style={{ '--letras': perfil.funcaoCurta.length } as React.CSSProperties}>
              <span className="digitar-texto marca-texto">{perfil.funcaoCurta}</span>
              <span className="cursor-digitacao digitar-cursor" />
            </span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#trabalhos" className="botao botao-rec">
              Ver trabalhos
            </a>
            <a href="#contato" className="botao text-creme">
              Falar comigo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
