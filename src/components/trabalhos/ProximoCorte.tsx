'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SeloIA } from '@/components/SeloIA';
import type { Idioma } from '@/data/idiomas';
import type { Midia } from '@/lib/midia';
import { timecode } from '@/lib/timecode';

interface Props {
  href: string;
  titulo: string;
  /** "Próximo trabalho →" no idioma */
  rotulo: string;
  /** Rótulo acessível do link (sem a seta) */
  rotuloAria: string;
  midia: Midia;
  /** Selo "Feito com IA" no quadro, quando o próximo trabalho foi feito com IA */
  feitoComIA?: boolean;
  lang: Idioma;
}

/** Mouse, tela larga e movimento liberado: o jog só existe aí */
const CONSULTA_JOG = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/**
 * Próximo trabalho como o próximo corte. No desktop, o vídeo dele avança e
 * volta quadro a quadro com a rolagem, como o jog de uma mesa de edição
 * (ideia do projeto Retro-Miami, sem biblioteca): a posição da seção na tela
 * vira o tempo do vídeo. Não prende a rolagem e não troca de página sozinho.
 * Cada busca espera a anterior terminar (seeked), para não empilhar. No
 * celular e com movimento reduzido, fica o quadro parado.
 */
export function ProximoCorte({ href, titulo, rotulo, rotuloAria, midia, feitoComIA, lang }: Props) {
  const raiz = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const barra = useRef<HTMLSpanElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const trecho = midia.preview;

  useEffect(() => {
    const el = raiz.current;
    const v = video.current;
    if (!el || !v || !trecho || !window.matchMedia(CONSULTA_JOG).matches) return;
    let pedido = 0;
    let buscando = false;
    let alvo = 0;
    let carregado = false;

    const buscar = () => {
      if (buscando || v.readyState < 1) return;
      if (Math.abs(v.currentTime - alvo) < 1 / 30) return;
      buscando = true;
      v.currentTime = alvo;
    };
    const aoBuscar = () => {
      buscando = false;
      buscar();
    };
    const medir = () => {
      pedido = 0;
      const vh = window.innerHeight;
      const topo = el.getBoundingClientRect().top + window.scrollY;
      // 0 quando a seção aparece embaixo; 1 quando o topo dela chega ao topo da
      // tela ou quando a página acaba (ela fica perto do fim e pode não subir tudo)
      const inicio = topo - vh;
      const fim = Math.min(topo, document.documentElement.scrollHeight - vh);
      const p = fim > inicio ? Math.min(1, Math.max(0, (window.scrollY - inicio) / (fim - inicio))) : 1;
      alvo = p * Math.max(0, trecho.duration - 0.05);
      if (barra.current) barra.current.style.transform = `scaleX(${p})`;
      if (tc.current) tc.current.textContent = timecode(alvo * 1000);
      buscar();
    };
    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(medir);
    };
    // Só baixa o vídeo quando a seção está chegando
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || carregado) return;
        carregado = true;
        v.preload = 'auto';
        v.load();
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    const pronto = () => v.setAttribute('data-pronto', '');
    v.addEventListener('loadeddata', pronto, { once: true });
    v.addEventListener('seeked', aoBuscar);
    v.addEventListener('loadedmetadata', agendar);
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);
    agendar();
    return () => {
      cancelAnimationFrame(pedido);
      io.disconnect();
      v.removeEventListener('loadeddata', pronto);
      v.removeEventListener('seeked', aoBuscar);
      v.removeEventListener('loadedmetadata', agendar);
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', agendar);
    };
  }, [trecho]);

  return (
    <Link ref={raiz} href={href} aria-label={rotuloAria} className="proximo-corte margem group grid gap-8 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
      <span className="lg:col-span-5">
        <span className="rotulo block text-cinza">{rotulo}</span>
        <span className="titulo-display mt-3 block text-[clamp(48px,7vw,128px)] transition-colors group-hover:text-rec group-focus-visible:text-rec">{titulo}</span>
      </span>
      <span className="lg:col-span-7">
        <span
          className="monitor relative ml-auto block overflow-hidden bg-carvao"
          // Vertical ou quadrado: o quadro estreita até 60% da altura da tela, sem cortar o vídeo
          style={{ aspectRatio: `${midia.width} / ${midia.height}`, width: `min(100%, calc(60svh * ${(midia.width / midia.height).toFixed(3)}))` }}
        >
          <Image src={midia.poster.avif} alt="" fill unoptimized sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
          {trecho && (
            <video
              ref={video}
              className="jog-video absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              disablePictureInPicture
            >
              {trecho.webm && <source src={trecho.webm} type="video/webm" />}
              <source src={trecho.mp4} type="video/mp4" />
            </video>
          )}
          {feitoComIA && <SeloIA lang={lang} className="absolute top-3 left-3" />}
        </span>
        {trecho && (
          <span className="jog-regua rotulo mt-4 flex items-center gap-4 text-cinza" aria-hidden="true">
            <span>JOG</span>
            <span className="relative h-px flex-1 bg-linha">
              <span ref={barra} className="absolute inset-0 origin-left scale-x-0 bg-rec" />
            </span>
            <span ref={tc} className="tc tc-vivo text-creme">
              00:00:00:00
            </span>
          </span>
        )}
      </span>
    </Link>
  );
}
