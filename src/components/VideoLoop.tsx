'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { type Midia, proporcao } from '@/lib/midia';

interface Props {
  midia: Midia;
  /** Texto alternativo do poster (o vídeo é mudo e decorativo em relação a ele) */
  alt: string;
  /**
   * `auto`: toca quando aparece na tela. `true`/`false`: o pai pede ou não
   * (lista de destaques, timeline), e mesmo pedido só toca se estiver na tela.
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
/**
 * Os vídeos só começam depois do load e de um momento ocioso: no celular
 * fraco, decodificar vídeo junto com a hidratação trava a página. O poster
 * já está na tela, então ninguém espera por isso.
 */
let liberados: Promise<void> | null = null;
function paginaOciosa(): Promise<void> {
  liberados ??= new Promise((resolve) => {
    const ocioso = () => ('requestIdleCallback' in window ? window.requestIdleCallback(() => resolve(), { timeout: 1500 }) : setTimeout(resolve, 300));
    if (document.readyState === 'complete') ocioso();
    else window.addEventListener('load', ocioso, { once: true });
  });
  return liberados;
}

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
  const sincronizar = useRef(() => {});

  useEffect(() => {
    aoMontar?.(video.current);
    return () => aoMontar?.(null);
  }, [aoMontar]);

  useEffect(() => {
    const v = video.current;
    if (!v || !midia.preview) return;
    let liberado = false;
    let ativo = true;

    const sincronizarAgora = () => {
      if (!liberado) return;
      const querTocar = visivel.current && desejado.current !== false;
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
        sincronizarAgora();
      },
      { rootMargin: '200px 0px', threshold: 0.15 },
    );
    io.observe(v);
    sincronizar.current = sincronizarAgora;
    document.addEventListener('visibilitychange', sincronizarAgora);
    v.addEventListener('playing', () => v.setAttribute('data-tocando', ''));
    paginaOciosa().then(() => {
      liberado = true;
      if (ativo) sincronizarAgora();
    });
    return () => {
      ativo = false;
      io.disconnect();
      document.removeEventListener('visibilitychange', sincronizarAgora);
      sincronizar.current = () => {};
    };
  }, [midia.preview]);

  // O pai mudou o pedido (destaque no centro da tela, clipe da timeline)
  useEffect(() => {
    if (tocar !== 'auto') sincronizar.current();
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
