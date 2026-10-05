'use client';

import { useEffect, useRef, useState } from 'react';
import type { Midia } from '@/lib/midia';
import { proporcao } from '@/lib/midia';
import { duracaoCurta, timecode } from '@/lib/timecode';

interface Props {
  midia: Midia;
  titulo: string;
  /** Altura máxima no desktop (vertical ao lado do texto) */
  className?: string;
}

/**
 * Player da página do trabalho. Sem JS, é o <video controls> nativo. Com JS,
 * troca pelos controles da ilha: timecode, barra, som e tela cheia, com
 * teclado (espaço/K, ← →, M, F) quando o player tem o foco.
 */
export function Player({ midia, titulo, className = '' }: Props) {
  const caixa = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const [pronto, setPronto] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [mudo, setMudo] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [iniciado, setIniciado] = useState(false);
  const trecho = midia.full ?? midia.preview;
  const duracao = trecho?.duration ?? 0;

  useEffect(() => {
    setPronto(true);
    const v = video.current;
    if (!v) return;
    let pedido = 0;
    const quadro = () => {
      if (tc.current) tc.current.textContent = timecode(v.currentTime * 1000);
      setProgresso(v.duration ? v.currentTime / v.duration : 0);
      if (!v.paused) pedido = requestAnimationFrame(quadro);
    };
    const tocou = () => {
      setTocando(true);
      setIniciado(true);
      pedido = requestAnimationFrame(quadro);
    };
    const parou = () => {
      setTocando(false);
      cancelAnimationFrame(pedido);
      quadro();
    };
    v.addEventListener('play', tocou);
    v.addEventListener('pause', parou);
    v.addEventListener('ended', parou);
    v.addEventListener('seeked', quadro);
    return () => {
      cancelAnimationFrame(pedido);
      v.removeEventListener('play', tocou);
      v.removeEventListener('pause', parou);
      v.removeEventListener('ended', parou);
      v.removeEventListener('seeked', quadro);
    };
  }, []);

  if (!trecho) return null;

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const buscar = (s: number) => {
    const v = video.current;
    if (v) v.currentTime = Math.min(v.duration || duracao, Math.max(0, s));
  };

  const telaCheia = () => {
    const el = caixa.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else (video.current as HTMLVideoElement & { webkitEnterFullscreen?: () => void })?.webkitEnterFullscreen?.();
  };

  const teclas = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    const v = video.current;
    if (!v) return;
    const acoes: Record<string, () => void> = {
      ' ': alternar,
      k: alternar,
      ArrowRight: () => buscar(v.currentTime + 5),
      ArrowLeft: () => buscar(v.currentTime - 5),
      m: () => {
        v.muted = !v.muted;
        setMudo(v.muted);
      },
      f: telaCheia,
    };
    const acao = acoes[e.key];
    if (acao) {
      e.preventDefault();
      acao();
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: atalhos de teclado do player valem quando o foco está dentro dele
    <div
      ref={caixa}
      className={`group relative bg-black ${className}`}
      style={{ aspectRatio: proporcao(trecho.width && trecho.height ? { width: trecho.width, height: trecho.height } : midia) }}
      onKeyDown={teclas}
    >
      {/* biome-ignore lint/a11y/useMediaCaption: ainda não há legendas dos trabalhos; o .vtt entra em <track> quando existir (docs/PENDENCIAS.md) */}
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-contain"
        poster={midia.poster.jpg}
        preload="metadata"
        playsInline
        controls={!pronto}
        onClick={alternar}
        aria-label={`Vídeo: ${titulo}`}
      >
        {trecho.webm && <source src={trecho.webm} type="video/webm" />}
        <source src={trecho.mp4} type="video/mp4" />
      </video>

      {pronto && !iniciado && (
        <button type="button" onClick={alternar} className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/10">
          <span className="rotulo flex items-center gap-3 bg-rec px-5 py-4 text-sm text-preto">
            ▶ Assistir <span className="tc opacity-80">{duracaoCurta(duracao)}</span>
          </span>
        </button>
      )}

      {pronto && iniciado && (
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-[linear-gradient(to_top,rgb(0_0_0/0.85),transparent)] px-3 pt-8 pb-3 opacity-100 transition-opacity group-hover:opacity-100 has-[:focus-visible]:opacity-100 md:px-4">
          <button
            type="button"
            onClick={alternar}
            className="rotulo min-h-11 min-w-16 border border-creme/60 px-2 text-creme hover:bg-creme hover:text-preto"
            aria-label={tocando ? 'Pausar' : 'Tocar'}
          >
            {tocando ? 'Pausa' : 'Play'}
          </button>
          <span className="rotulo tc hidden text-creme sm:inline">
            <span ref={tc}>00:00:00:00</span>
            <span className="text-cinza"> / {timecode(duracao * 1000)}</span>
          </span>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progresso * 1000)}
            onChange={(e) => buscar((Number(e.target.value) / 1000) * (video.current?.duration || duracao))}
            aria-label="Posição no vídeo"
            aria-valuetext={timecode(progresso * duracao * 1000)}
            className="h-11 flex-1 cursor-pointer accent-rec"
          />
          <button
            type="button"
            onClick={() => {
              const v = video.current;
              if (!v) return;
              v.muted = !v.muted;
              setMudo(v.muted);
            }}
            className="rotulo min-h-11 px-2 text-creme hover:text-rec"
            aria-pressed={mudo}
          >
            {mudo ? 'Som off' : 'Som on'}
          </button>
          <button type="button" onClick={telaCheia} className="rotulo min-h-11 px-2 text-creme hover:text-rec">
            Tela cheia
          </button>
        </div>
      )}
    </div>
  );
}
