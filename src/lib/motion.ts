'use client';

/**
 * Registro único do GSAP: plugins, padrões e efeitos reutilizáveis.
 * Componentes importam daqui, nunca direto de 'gsap'.
 */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

declare global {
  namespace gsap.core {
    interface Timeline {
      /** Efeito registrado em src/lib/motion.ts */
      entrar(alvos: gsap.TweenTarget, config?: { y?: number; stagger?: number; duration?: number }, posicao?: gsap.Position): this;
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
  gsap.registerPlugin(ScrollTrigger, useGSAP);
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
}

export { gsap, ScrollTrigger, useGSAP };
