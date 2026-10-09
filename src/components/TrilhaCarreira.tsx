import type { ClipeCarreira } from '@/lib/carreira';

/** Trilha da carreira já calculada no servidor (trilhaDaCarreira, src/lib/carreira.ts) */
export interface DadosTrilha {
  clipes: ClipeCarreira[];
  faixas: number;
  anos: Array<{ ano: number; x: number }>;
}

/**
 * Carreira como linha do tempo de edição: cada cargo é um clipe do tamanho do
 * período, cargos simultâneos em faixas empilhadas, régua de anos embaixo.
 * Decorativa (a lista ao lado ou abaixo traz as mesmas informações em texto).
 * `ativa` acende um clipe (Sobre); no CV fica parada e também vai para o PDF.
 */
export function TrilhaCarreira({ trilha, chaves, ativa, className = '' }: { trilha: DadosTrilha; chaves: string[]; ativa?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <div className="relative" style={{ height: `${trilha.faixas * 14 - 4}px` }}>
        {trilha.clipes.map((c, i) => (
          <span
            key={chaves[i]}
            data-ativa={ativa === undefined ? undefined : i === ativa}
            className="clipe-carreira absolute h-2.5 bg-preto/15 print:bg-preto/25"
            style={{ left: `${c.x * 100}%`, width: `max(3px, ${c.largura * 100}%)`, top: `${c.faixa * 14}px` }}
          />
        ))}
      </div>
      <div className="rotulo secundario relative mt-3 h-4 border-t border-preto/20">
        {trilha.anos.map((a) => (
          <span key={a.ano} className="absolute top-0 h-2 border-l border-preto/30 pt-2.5 pl-1 text-[10px] leading-none" style={{ left: `${a.x * 100}%` }}>
            {a.ano}
          </span>
        ))}
      </div>
    </div>
  );
}
