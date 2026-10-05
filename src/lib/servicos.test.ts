import { describe, expect, it } from 'vitest';
import type { Servico } from '@/data/servicos';
import type { Trabalho } from '@/data/trabalhos';
import { buscarServico, servicoDaCategoria, servicosComTrabalho, trabalhosDoServico } from './servicos';

const base = { funcao: 'x', midia: 'm', creditos: [] as Trabalho['creditos'], texto: { contexto: 'c', oQueFiz: 'f' }, trilha: 'V1' as const };
const trabalhos: Trabalho[] = [
  { ...base, slug: 'a', titulo: 'A', categorias: ['edicao', 'cor'] },
  { ...base, slug: 'b', titulo: 'B', categorias: ['ia'] },
  { ...base, slug: 'c', titulo: 'C', categorias: ['cor'] },
];
const servico = (slug: string, categorias: Servico['categorias']): Servico => ({ slug, nome: slug, titulo: slug, tituloSeo: slug, descricao: '', texto: [], categorias });
const servicos = [servico('edicao', ['edicao']), servico('cor', ['cor']), servico('sites', ['sites'])];

describe('trabalhosDoServico', () => {
  it('pega os trabalhos de qualquer categoria do serviço, sem repetir', () => {
    expect(trabalhosDoServico(servico('x', ['edicao', 'cor']), trabalhos).map((t) => t.slug)).toEqual(['a', 'c']);
  });
});

describe('buscarServico', () => {
  it('acha pelo slug', () => {
    expect(buscarServico(servicos, 'cor')?.slug).toBe('cor');
    expect(buscarServico(servicos, 'nada')).toBeUndefined();
  });
});

describe('servicosComTrabalho', () => {
  it('tira serviço sem trabalho', () => {
    expect(servicosComTrabalho(servicos, trabalhos).map((s) => s.slug)).toEqual(['edicao', 'cor']);
  });
});

describe('servicoDaCategoria', () => {
  it('liga a categoria ao serviço', () => {
    expect(servicoDaCategoria(servicos, 'cor')?.slug).toBe('cor');
    expect(servicoDaCategoria(servicos, 'podcast')).toBeUndefined();
  });
});
