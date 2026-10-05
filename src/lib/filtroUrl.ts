import type { Categoria } from '@/data/trabalhos';

export type Modo = 'lista' | 'grade';

export interface EstadoIndice {
  categoria: Categoria | null;
  modo: Modo;
}

/** Lê `?categoria=ia&modo=grade`. Valor desconhecido vira o padrão. */
export function lerEstado(busca: string, validas: readonly Categoria[]): EstadoIndice {
  const p = new URLSearchParams(busca);
  const c = p.get('categoria');
  return {
    categoria: c && (validas as readonly string[]).includes(c) ? (c as Categoria) : null,
    modo: p.get('modo') === 'grade' ? 'grade' : 'lista',
  };
}

/** Monta a busca da URL. Padrões (todos, lista) ficam fora: URL limpa. */
export function montarBusca(estado: EstadoIndice): string {
  const p = new URLSearchParams();
  if (estado.categoria) p.set('categoria', estado.categoria);
  if (estado.modo === 'grade') p.set('modo', 'grade');
  const s = p.toString();
  return s ? `?${s}` : '';
}
