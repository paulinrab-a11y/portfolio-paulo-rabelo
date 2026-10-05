import type { Categoria, Trabalho, Trilha } from '@/data/trabalhos';

/** Os destaques da home, na ordem definida em `destaque` */
export function destaques(lista: Trabalho[]): Trabalho[] {
  return lista.filter((t) => t.destaque !== undefined).sort((a, b) => (a.destaque ?? 0) - (b.destaque ?? 0));
}

/** Filtro do índice. `null` mostra todos. */
export function filtrar(lista: Trabalho[], categoria: Categoria | null): Trabalho[] {
  return categoria ? lista.filter((t) => t.categorias.includes(categoria)) : lista;
}

/** Categorias que têm pelo menos um trabalho, na ordem do dicionário */
export function categoriasUsadas(lista: Trabalho[], ordem: readonly Categoria[]): Categoria[] {
  return ordem.filter((c) => lista.some((t) => t.categorias.includes(c)));
}

export function buscar(lista: Trabalho[], slug: string): Trabalho | undefined {
  return lista.find((t) => t.slug === slug);
}

/** Próximo trabalho da lista, voltando ao primeiro no fim */
export function proximo(lista: Trabalho[], slug: string): Trabalho {
  const i = lista.findIndex((t) => t.slug === slug);
  return lista[(i + 1) % lista.length];
}

export interface Clipe {
  slug: string;
  trilha: Trilha;
  /** Posição na régua, de 0 a 1 */
  inicio: number;
  fim: number;
}

/**
 * Monta a timeline da home: cada trabalho vira um clipe na sua trilha, em
 * sequência, alternando as trilhas como numa edição em camadas. Só um clipe
 * fica sob o playhead por vez.
 */
export function montarTimeline(lista: Trabalho[], ordemTrilhas: readonly Trilha[]): Clipe[] {
  // Cada trilha espalha os seus clipes por igual na régua (posição ideal
  // (k + 0,5) / n). Assim uma trilha com mais trabalhos não se acumula no fim.
  const posicionados = ordemTrilhas.flatMap((tr, ordem) => {
    const fila = lista.filter((t) => t.trilha === tr);
    return fila.map((t, k) => ({ t, ideal: (k + 0.5) / fila.length, ordem }));
  });
  const sequencia = posicionados.sort((a, b) => a.ideal - b.ideal || a.ordem - b.ordem).map((p) => p.t);
  const passo = 1 / sequencia.length;
  return sequencia.map((t, i) => ({ slug: t.slug, trilha: t.trilha, inicio: i * passo, fim: (i + 1) * passo }));
}

/** Índice do clipe sob o playhead (0 a 1). Fora da régua, o primeiro ou o último. */
export function clipeNoPonto(clipes: Clipe[], p: number): number {
  if (clipes.length === 0) return -1;
  const i = clipes.findIndex((c) => p >= c.inicio && p < c.fim);
  if (i >= 0) return i;
  return p < clipes[0].inicio ? 0 : clipes.length - 1;
}
