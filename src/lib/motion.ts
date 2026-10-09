'use client';

/**
 * Registro único do GSAP: plugins e padrões.
 * Componentes importam daqui, nunca direto de 'gsap'.
 */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
}

export { gsap, ScrollTrigger, useGSAP };
