'use client';

/**
 * Registro único do GSAP: plugins, padrões e efeitos reutilizáveis.
 * Componentes importam daqui, nunca direto de 'gsap'.
 */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

declare global {
  namespace gsap.core {
    interface Timeline {
      /** Efeito registrado em src/lib/motion.ts */
      entrar(alvos: gsap.TweenTarget, config?: { y?: number; stagger?: number; duration?: number }, posicao?: gsap.Position): this;
      /** Efeito registrado em src/lib/motion.ts */
      cartela(alvos: gsap.TweenTarget, config?: { stagger?: number; duration?: number }, posicao?: gsap.Position): this;
    }
  }
}

/** Consultas usadas em todo `gsap.matchMedia()` */
export const MIDIA = {
  movimento: '(prefers-reduced-motion: no-preference)',
  reduzido: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px) and (pointer: fine)',
  celular: '(max-width: 1023px), (pointer: coarse)',
} as const;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip, useGSAP);
  gsap.defaults({ ease: 'power3.out', duration: 0.7 });

  /**
   * Entrada padrão: opacidade + deslocamento curto + desfoque leve só em tela
   * larga. Limpa os estilos no fim (transform residual quebra position: fixed).
   */
  gsap.registerEffect({
    name: 'entrar',
    extendTimeline: true,
    defaults: { y: 18, stagger: 0.06, duration: 0.7 },
    effect: (alvos: gsap.TweenTarget, config: { y: number; stagger: number; duration: number }) => {
      const largo = window.matchMedia('(min-width: 768px)').matches;
      return gsap.from(alvos, {
        opacity: 0,
        y: config.y,
        filter: largo ? 'blur(6px)' : 'blur(0px)',
        stagger: config.stagger,
        duration: config.duration,
        clearProps: 'transform,filter,opacity',
      });
    },
  });

  /** Linhas sobem de dentro de uma máscara, como cartela. Reverte o SplitText no fim. */
  gsap.registerEffect({
    name: 'cartela',
    extendTimeline: true,
    defaults: { stagger: 0.12, duration: 0.9 },
    effect: (alvos: gsap.TweenTarget, config: { stagger: number; duration: number }) => {
      const split = SplitText.create(alvos as gsap.DOMTarget, { type: 'lines', mask: 'lines', aria: 'none' });
      return gsap.from(split.lines, {
        yPercent: 110,
        stagger: config.stagger,
        duration: config.duration,
        ease: 'expo.out',
        onComplete: () => split.revert(),
      });
    },
  });
}

export { Flip, gsap, ScrollTrigger, useGSAP };
