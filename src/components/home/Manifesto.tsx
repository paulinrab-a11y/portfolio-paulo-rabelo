'use client';

import { useRef } from 'react';
import type { Idioma } from '@/data/idiomas';
import { textos } from '@/data/textos';
import { gsap, MIDIA, ScrollTrigger, useGSAP } from '@/lib/motion';

/** Duas linhas como cartela de cinema: sobem de dentro de uma máscara, uma vez. */
export function Manifesto({ lang, linhas }: { lang: Idioma; linhas: readonly [string, string] }) {
  const tx = textos[lang].manifesto;
  const raiz = useRef<HTMLElement>(null);
  const [linha1, linha2] = linhas;

  useGSAP(
    () => {
      gsap.matchMedia().add(MIDIA.movimento, () => {
        const tl = gsap.timeline({ paused: true });
        // Cada linha sobe de dentro da própria máscara (overflow-hidden), como cartela
        tl.from('[data-linha]', { yPercent: 110, stagger: 0.18, duration: 0.9, ease: 'expo.out', clearProps: 'transform' });
        tl.from('[data-manifesto-rotulo]', { opacity: 0, duration: 0.4 }, 0);
        ScrollTrigger.create({ trigger: raiz.current, start: 'top 70%', once: true, onEnter: () => tl.play(0) });
      });
    },
    { scope: raiz },
  );

  return (
    <section ref={raiz} aria-label={tx.aria} className="margem grade py-[clamp(96px,18vh,200px)]">
      <p data-manifesto-rotulo className="rotulo col-span-12 mb-8 text-rec md:col-span-2 md:mb-0 md:pt-4">
        {tx.rotulo}
      </p>
      {/* Cada linha sobe de dentro de uma máscara; o respiro em cima (compensado na margem) é para acento e til não serem cortados */}
      <p className="titulo-display col-span-12 text-[clamp(44px,8.4vw,148px)] md:col-span-10">
        <span className="-mt-[0.18em] block overflow-hidden pt-[0.18em] pb-[0.06em]">
          <span data-linha className="block">
            {linha1}
          </span>
        </span>
        <span className="-mt-[0.18em] block overflow-hidden pt-[0.18em] pb-[0.06em]">
          <span data-linha className="block text-cinza">
            {linha2}
          </span>
        </span>
      </p>
    </section>
  );
}
