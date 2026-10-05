'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { type Midia, proporcao } from '@/lib/midia';

interface Props {
  midia: Midia;
  /** Texto alternativo do poster (o vídeo é mudo e decorativo em relação a ele) */
  alt: string;
  /**
   * `auto`: toca quando aparece na tela. `true`/`false`: quem manda é o pai
   * (lista de destaques, timeline).
   */
  tocar?: boolean | 'auto';
  /** Poster é o elemento de LCP: carrega na frente, sem esperar nada */
  prioridade?: boolean;
  /** Preenche o pai (position absolute) em vez de reservar a proporção */
  preencher?: boolean;
  className?: string;
  sizes?: string;
  /** contain: mostra o quadro inteiro (vertical dentro de monitor horizontal) */
  ajuste?: 'cover' | 'contain';
  /** Recebe o elemento de vídeo (timecode do HUD) */
  aoMontar?: (v: HTMLVideoElement | null) => void;
}

const reduzido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const economia = () => Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

/**
 * Prévia muda em loop sobre o poster. O poster aparece primeiro e fica por
 * baixo; o vídeo só baixa perto da tela, só toca visível, para com a aba
 * escondida e não toca com movimento reduzido ou economia de dados.
 */
export function VideoLoop({ midia, alt, tocar = 'auto', prioridade = false, preencher = false, className = '', sizes = '100vw', ajuste = 'cover', aoMontar }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const visivel = useRef(false);
  const desejado = useRef(tocar);
  desejado.current = tocar;

  useEffect(() => {
    aoMontar?.(video.current);
    return () => aoMontar?.(null);
  }, [aoMontar]);

  useEffect(() => {
    const v = video.current;
    if (!v || !midia.preview) return;

    const sincronizar = () => {
      const querTocar = desejado.current === 'auto' ? visivel.current : desejado.current;
      if (querTocar && !document.hidden && !reduzido() && !economia()) {
        if (v.preload !== 'auto') v.preload = 'auto';
        v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visivel.current = e.isIntersecting;
        if (e.isIntersecting && v.preload === 'none') v.preload = 'metadata';
        sincronizar();
      },
      { rootMargin: '200px 0px', threshold: 0.15 },
    );
    io.observe(v);
    document.addEventListener('visibilitychange', sincronizar);
    v.addEventListener('playing', () => v.setAttribute('data-tocando', ''));
    sincronizar();
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sincronizar);
    };
  }, [midia.preview]);

  // O pai mudou o pedido (destaque no centro da tela, clipe da timeline)
  useEffect(() => {
    const v = video.current;
    if (!v || tocar === 'auto') return;
    if (tocar && !reduzido() && !economia()) {
      v.preload = 'auto';
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [tocar]);

  return (
    <div className={`overflow-hidden bg-carvao ${preencher ? 'absolute inset-0' : 'relative'} ${className}`} style={preencher ? undefined : { aspectRatio: proporcao(midia) }}>
      <Image
        src={midia.poster.avif}
        alt={alt}
        fill
        unoptimized
        sizes={sizes}
        className={ajuste === 'contain' ? 'object-contain' : 'object-cover'}
        loading={prioridade ? 'eager' : 'lazy'}
        fetchPriority={prioridade ? 'high' : 'auto'}
      />
      {midia.preview && (
        <video
          ref={video}
          className={`absolute inset-0 h-full w-full ${ajuste === 'contain' ? 'object-contain' : 'object-cover'} opacity-0 transition-opacity duration-300 data-[tocando]:opacity-100`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
        >
          {midia.preview.webm && <source src={midia.preview.webm} type="video/webm" />}
          <source src={midia.preview.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
