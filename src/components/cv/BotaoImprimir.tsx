'use client';

export function BotaoImprimir({ rotulo }: { rotulo: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="botao text-preto hover:!bg-preto hover:!text-creme">
      {rotulo}
    </button>
  );
}
