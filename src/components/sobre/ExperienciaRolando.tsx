'use client';

import { useEffect, useRef, useState } from 'react';
import type { Experiencia } from '@/data/perfil';

/**
 * Experiência que rola: a entrada que cruza o meio da tela fica ativa e o
 * período dela aparece grande ao lado, como o timecode de uma ilha. O destaque
 * é por cor (contraste mantido), não por opacidade. Sem JS, todas aparecem
 * iguais e o período fica em cada linha.
 */
export function ExperienciaRolando({ lista, titulo }: { lista: Experiencia[]; titulo: string }) {
  const raiz = useRef<HTMLOListElement>(null);
  const [ativa, setAtiva] = useState(0);

  useEffect(() => {
    const itens = raiz.current?.querySelectorAll<HTMLElement>('[data-indice]');
    if (!itens) return;
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtiva(Number((e.target as HTMLElement).dataset.indice));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const i of itens) io.observe(i);
    return () => io.disconnect();
  }, []);

  const atual = lista[ativa];

  return (
    <div className="grade gap-y-8">
      <div className="col-span-12 lg:col-span-4">
        <div className="lg:sticky lg:top-[calc(var(--cabecalho)+48px)]">
          <h2 id="experiencia" className="rotulo secundario mb-6">
            {titulo}
          </h2>
          <div aria-hidden="true" className="hidden lg:block">
            <p className="rotulo mb-2 flex items-center gap-2 text-rec-escuro">
              <span className="rec-ponto" /> {String(ativa + 1).padStart(2, '0')} / {String(lista.length).padStart(2, '0')}
            </p>
            <p className="titulo-display text-[clamp(40px,4.4vw,72px)]">{atual.periodo}</p>
            <p className="secundario mt-2 text-lg">{atual.empresa}</p>
          </div>
        </div>
      </div>
      <ol ref={raiz} className="col-span-12 lg:col-span-8">
        {lista.map((e, i) => (
          <li
            key={`${e.empresa}${e.cargo}`}
            data-indice={i}
            data-ativa={i === ativa}
            className="group grid grid-cols-12 gap-x-4 gap-y-1 border-t border-preto/15 py-8 transition-colors duration-300 lg:py-12"
          >
            <span className="rotulo secundario col-span-12 tabular-nums md:col-span-3 md:pt-3">{e.periodo}</span>
            <div className="col-span-12 md:col-span-9">
              <h3 className="titulo-display text-[clamp(32px,4vw,60px)] text-grafite transition-colors duration-300 group-data-[ativa=true]:text-preto">
                <span
                  aria-hidden="true"
                  className="mr-3 inline-block h-[0.32em] w-[0.32em] -translate-y-[0.18em] bg-rec-escuro opacity-0 transition-opacity group-data-[ativa=true]:opacity-100"
                />
                {e.empresa}
              </h3>
              <p className="mt-2 text-lg">{e.cargo}</p>
              {e.detalhe && <p className="secundario mt-2">{e.detalhe}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
