import { describe, expect, it } from 'vitest';
import type { Trabalho } from '@/data/trabalhos';
import { buscar, categoriasUsadas, clipeNoPonto, daAba, destaques, filtrar, montarTimeline, proximo } from './trabalhos';

const base = { funcao: 'x', midia: 'm', creditos: [] as Trabalho['creditos'], texto: { contexto: 'c', oQueFiz: 'f' }, abas: ['video'] as Trabalho['abas'] };
const lista: Trabalho[] = [
  { ...base, slug: 'a', titulo: 'A', categorias: ['edicao'], trilha: 'V1', destaque: 2 },
  { ...base, slug: 'b', titulo: 'B', categorias: ['ia'], trilha: 'V3', destaque: 1 },
  { ...base, slug: 'c', titulo: 'C', categorias: ['edicao', 'cor'], trilha: 'V1' },
  { ...base, slug: 'd', titulo: 'D', categorias: ['sites'], trilha: 'V4', abas: ['sites', 'marketing'] },
];

describe('destaques', () => {
  it('só os marcados, na ordem de destaque', () => {
    expect(destaques(lista).map((t) => t.slug)).toEqual(['b', 'a']);
  });
});

describe('filtrar', () => {
  it('null mostra todos', () => {
    expect(filtrar(lista, null)).toHaveLength(4);
  });
  it('filtra por categoria', () => {
    expect(filtrar(lista, 'edicao').map((t) => t.slug)).toEqual(['a', 'c']);
  });
});

describe('daAba', () => {
  it('filtra pela aba; um trabalho pode estar em mais de uma', () => {
    expect(daAba(lista, 'video').map((t) => t.slug)).toEqual(['a', 'b', 'c']);
    expect(daAba(lista, 'sites').map((t) => t.slug)).toEqual(['d']);
    expect(daAba(lista, 'marketing').map((t) => t.slug)).toEqual(['d']);
  });
});

describe('categoriasUsadas', () => {
  it('mantém a ordem e tira as vazias', () => {
    expect(categoriasUsadas(lista, ['podcast', 'cor', 'edicao', 'ia'])).toEqual(['cor', 'edicao', 'ia']);
  });
});

describe('buscar e proximo', () => {
  it('acha pelo slug', () => {
    expect(buscar(lista, 'c')?.titulo).toBe('C');
    expect(buscar(lista, 'z')).toBeUndefined();
  });
  it('o próximo volta ao primeiro no fim', () => {
    expect(proximo(lista, 'a').slug).toBe('b');
    expect(proximo(lista, 'd').slug).toBe('a');
  });
});

describe('montarTimeline', () => {
  const clipes = montarTimeline(lista, ['V1', 'V2', 'V3', 'V4']);

  it('todo trabalho vira um clipe na sua trilha', () => {
    expect(clipes).toHaveLength(4);
    expect(clipes.find((c) => c.slug === 'b')?.trilha).toBe('V3');
  });

  it('alterna as trilhas: primeiro de cada uma, depois o segundo', () => {
    expect(clipes.map((c) => c.slug)).toEqual(['a', 'b', 'd', 'c']);
  });

  it('V1 abre a edição e uma trilha com muitos clipes se espalha pela régua', () => {
    const base2 = lista[0];
    const muitos: Trabalho[] = [
      ...Array.from({ length: 6 }, (_, i) => ({ ...base2, slug: `v4-${i}`, trilha: 'V4' as const })),
      { ...base2, slug: 'v1-0', trilha: 'V1' as const },
      { ...base2, slug: 'v1-1', trilha: 'V1' as const },
    ];
    const ordem = montarTimeline(muitos, ['V1', 'V2', 'V3', 'V4']).map((c) => c.slug);
    // V1 abre a edição e o segundo clipe de V1 cai no meio, não colado no primeiro
    expect(ordem[0]).toBe('v1-0');
    const meio = ordem.indexOf('v1-1');
    expect(meio).toBeGreaterThan(2);
    expect(meio).toBeLessThan(ordem.length - 2);
  });

  it('os clipes cobrem a régua inteira sem sobrepor', () => {
    expect(clipes[0].inicio).toBe(0);
    expect(clipes.at(-1)?.fim).toBeCloseTo(1);
    for (let i = 1; i < clipes.length; i += 1) expect(clipes[i].inicio).toBeCloseTo(clipes[i - 1].fim);
  });
});

describe('clipeNoPonto', () => {
  const clipes = montarTimeline(lista, ['V1', 'V2', 'V3', 'V4']);

  it('acha o clipe sob o playhead', () => {
    expect(clipeNoPonto(clipes, 0)).toBe(0);
    expect(clipeNoPonto(clipes, 0.3)).toBe(1);
    expect(clipeNoPonto(clipes, 0.99)).toBe(3);
  });

  it('fora da régua fica no último ou no primeiro', () => {
    expect(clipeNoPonto(clipes, 1)).toBe(3);
    expect(clipeNoPonto(clipes, -0.1)).toBe(0);
  });

  it('sem clipes devolve -1', () => {
    expect(clipeNoPonto([], 0.5)).toBe(-1);
  });
});
