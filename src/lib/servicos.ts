import type { Servico } from '@/data/servicos';
import type { Trabalho } from '@/data/trabalhos';

/** Trabalhos de um serviço, na ordem da lista, sem repetir */
export function trabalhosDoServico(servico: Servico, lista: Trabalho[]): Trabalho[] {
  return lista.filter((t) => t.categorias.some((c) => servico.categorias.includes(c)));
}

export function buscarServico(lista: Servico[], slug: string): Servico | undefined {
  return lista.find((s) => s.slug === slug);
}

/** Serviços que têm pelo menos um trabalho para mostrar */
export function servicosComTrabalho(lista: Servico[], trabalhos: Trabalho[]): Servico[] {
  return lista.filter((s) => trabalhosDoServico(s, trabalhos).length > 0);
}

/** Serviço que corresponde a uma categoria (link do case para a página do serviço) */
export function servicoDaCategoria(lista: Servico[], categoria: Trabalho['categorias'][number]): Servico | undefined {
  return lista.find((s) => s.categorias.includes(categoria));
}
