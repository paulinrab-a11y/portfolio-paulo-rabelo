'use client';

export function BotaoImprimir() {
  return (
    <button type="button" onClick={() => window.print()} className="botao text-preto hover:!bg-preto hover:!text-creme">
      Imprimir
    </button>
  );
}
