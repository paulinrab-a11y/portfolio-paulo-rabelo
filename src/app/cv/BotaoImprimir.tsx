'use client';

export function BotaoImprimir() {
  return (
    <button type="button" onClick={() => window.print()} className="botao sem-impressao text-preto hover:!bg-preto hover:!text-creme">
      Imprimir ou salvar PDF
    </button>
  );
}
