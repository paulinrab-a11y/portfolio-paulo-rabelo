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

/**
 * Trabalho que vai para o monitor da página do serviço: o primeiro cuja
 * categoria principal (a primeira) é do serviço. Assim fotografia mostra uma
 * foto, e não uma arte de social media que também tem foto. Sem nenhum, o
 * primeiro da lista.
 */
export function trabalhoDaVitrine<T extends Pick<Trabalho, 'categorias'>>(servico: Pick<Servico, 'categorias'>, lista: T[]): T | undefined {
  return lista.find((t) => servico.categorias.includes(t.categorias[0])) ?? lista[0];
}
