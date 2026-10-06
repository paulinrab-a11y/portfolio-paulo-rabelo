'use client';

import { useEffect, useRef } from 'react';
import type { Idioma } from '@/data/idiomas';
import { perfil } from '@/data/perfil';
import { textos } from '@/data/textos';
import { montarDeDigitos } from '@/lib/embaralhar';
import { gsap } from '@/lib/motion';
import { timecode } from '@/lib/timecode';

/** Duração total da abertura (o brief pede no máximo 1,8 s) */
const DURACAO = 1.6;

/**
 * Abertura da primeira visita: REC pisca duas vezes, o timecode corre, o nome
 * se monta a partir de dígitos e as barras de letterbox abrem sobre o herói,
 * que já está renderizado por baixo. Clique, tecla, roda ou toque pulam.
 * Só existe quando o script inline do layout marcou `html[data-abertura]`
 * (com o instante em que começou: se a hidratação atrasar, a animação
 * adianta em vez de recomeçar).
 */
export function Abertura({ lang }: { lang: Idioma }) {
  const raiz = useRef<HTMLDivElement>(null);
  const nome = useRef<HTMLSpanElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const ponto = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute('data-abertura') || html.hasAttribute('data-abertura-fim')) return;
    const el = raiz.current;
    if (!el) return;

    let pedido = 0;
    let encerrada = false;
    let soltar = 0;
    let tl: gsap.core.Timeline | undefined;
    const inicio = Number(html.getAttribute('data-abertura')) || performance.now();

    // click e não pointerdown: o toque termina sobre a abertura, sem acionar o que está por baixo.
    // No iPhone o toque fora de um elemento clicável não gera click: o touchend pula e, cancelado,
    // impede o clique sintético no link de baixo
    const eventosPular = ['click', 'touchend', 'keydown', 'wheel', 'touchmove'] as const;
    const parar = () => {
      cancelAnimationFrame(pedido);
      tl?.kill();
      for (const ev of eventosPular) window.removeEventListener(ev, pular, true);
    };
    const encerrar = () => {
      if (encerrada) return;
      encerrada = true;
      parar();
      html.setAttribute('data-abertura-fim', '');
      try {
        sessionStorage.setItem('abertura-vista', '1');
      } catch {}
      // Depois que a digitação do herói termina, a página volta ao normal: voltar
      // à home pela navegação do site não espera a abertura de novo
      soltar = window.setTimeout(() => html.removeAttribute('data-abertura'), 5000);
    };
    const pular = (e: Event) => {
      if (e.type === 'touchend' && e.cancelable) e.preventDefault();
      encerrar();
    };
    for (const ev of eventosPular) window.addEventListener(ev, pular, { capture: true, passive: ev !== 'touchend' });

    // Timecode e nome escritos direto no DOM, a cada quadro
    const quadro = (agora: number) => {
      const t = (agora - inicio) / 1000;
      if (tc.current) tc.current.textContent = timecode(t * 1000);
      if (nome.current) nome.current.textContent = montarDeDigitos(perfil.nome.toUpperCase(), (t - 0.15) / 0.85, Math.floor(t * 30));
      if (t < DURACAO) pedido = requestAnimationFrame(quadro);
    };
    pedido = requestAnimationFrame(quadro);

    tl = gsap.timeline({ onComplete: encerrar });
    tl.set(ponto.current, { opacity: 1 })
      .to(ponto.current, { opacity: 0, duration: 0.12, ease: 'steps(1)' }, 0.12)
      .to(ponto.current, { opacity: 1, duration: 0.12, ease: 'steps(1)' }, 0.24)
      .to(ponto.current, { opacity: 0, duration: 0.12, ease: 'steps(1)' }, 0.36)
      .to(ponto.current, { opacity: 1, duration: 0.12, ease: 'steps(1)' }, 0.48)
      .to('[data-abertura-conteudo]', { opacity: 0, duration: 0.25, ease: 'power2.in' }, 1.1)
      .to('[data-barra="topo"]', { scaleY: 0, duration: 0.5, ease: 'expo.inOut' }, 1.1)
      .to('[data-barra="base"]', { scaleY: 0, duration: 0.5, ease: 'expo.inOut' }, 1.1);

    // Hidratação atrasada: adianta até onde a abertura já estaria (ou encerra)
    const atraso = (performance.now() - inicio) / 1000;
    if (atraso >= DURACAO) encerrar();
    else if (atraso > 0) tl.time(atraso);

    // Desmontar só para a animação: marcar como vista é papel de encerrar (no
    // Strict Mode do dev, o efeito monta duas vezes e a abertura recomeça)
    return () => {
      parar();
      if (!encerrada) return;
      window.clearTimeout(soltar);
      html.removeAttribute('data-abertura');
    };
  }, []);

  return (
    <div ref={raiz} className="abertura fixed inset-0 z-[70] items-center justify-center" data-testid="abertura">
      <span data-barra="topo" className="letterbox-barra top-0 origin-top" />
      <span data-barra="base" className="letterbox-barra bottom-0 origin-bottom" />
      <div data-abertura-conteudo aria-hidden="true" className="relative flex flex-col items-center gap-5 text-creme">
        <p className="rotulo flex items-center gap-3">
          <span ref={ponto} className="rec-ponto opacity-0" /> REC{' '}
          <span ref={tc} className="tc tc-vivo text-cinza">
            00:00:00:00
          </span>
        </p>
        <span ref={nome} className="titulo-display tc text-[13vw] md:text-[8vw]">
          {perfil.nome.toUpperCase()}
        </span>
      </div>
      <button type="button" className="rotulo absolute right-[var(--margem)] bottom-8 min-h-11 px-2 text-cinza hover:text-creme">
        {textos[lang].abertura.pular}
      </button>
    </div>
  );
}
