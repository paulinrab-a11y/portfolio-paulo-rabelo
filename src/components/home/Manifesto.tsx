'use client';

import { useRef } from 'react';
import { manifestos } from '@/data/perfil';
import { gsap, MIDIA, ScrollTrigger, useGSAP } from '@/lib/motion';

/** Duas linhas como cartela de cinema: sobem de dentro de uma máscara, uma vez. */
export function Manifesto() {
  const raiz = useRef<HTMLElement>(null);
  const [linha1, linha2] = manifestos[0];

  useGSAP(
    () => {
      gsap.matchMedia().add(MIDIA.movimento, () => {
        const tl = gsap.timeline({ paused: true });
        tl.cartela(raiz.current?.querySelectorAll('[data-linha]') ?? [], { stagger: 0.18 });
        tl.from('[data-manifesto-rotulo]', { opacity: 0, duration: 0.4 }, 0);
        ScrollTrigger.create({ trigger: raiz.current, start: 'top 70%', once: true, onEnter: () => tl.play(0) });
      });
    },
    { scope: raiz },
  );

  return (
    <section ref={raiz} aria-label="Manifesto" className="margem grade py-[clamp(96px,18vh,200px)]">
      <p data-manifesto-rotulo className="rotulo col-span-12 mb-8 text-rec md:col-span-2 md:mb-0 md:pt-4">
        00 · Manifesto
      </p>
      <p className="titulo-display col-span-12 text-[clamp(44px,8.4vw,148px)] md:col-span-10">
        <span data-linha className="block">
          {linha1}
        </span>
        <span data-linha className="block text-cinza">
          {linha2}
        </span>
      </p>
    </section>
  );
}
