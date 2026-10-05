import { describe, expect, it } from 'vitest';
import { lerEstado, montarBusca } from './filtroUrl';

const validas = ['edicao', 'ia', 'sites'] as const;

describe('lerEstado', () => {
  it('sem busca: todos, em lista', () => {
    expect(lerEstado('', validas)).toEqual({ categoria: null, modo: 'lista' });
  });

  it('lê categoria e modo', () => {
    expect(lerEstado('?categoria=ia&modo=grade', validas)).toEqual({ categoria: 'ia', modo: 'grade' });
  });

  it('ignora categoria desconhecida e modo inválido', () => {
    expect(lerEstado('?categoria=xyz&modo=mosaico', validas)).toEqual({ categoria: null, modo: 'lista' });
  });
});

describe('montarBusca', () => {
  it('padrões deixam a URL limpa', () => {
    expect(montarBusca({ categoria: null, modo: 'lista' })).toBe('');
  });

  it('inclui só o que mudou', () => {
    expect(montarBusca({ categoria: 'sites', modo: 'lista' })).toBe('?categoria=sites');
    expect(montarBusca({ categoria: null, modo: 'grade' })).toBe('?modo=grade');
    expect(montarBusca({ categoria: 'ia', modo: 'grade' })).toBe('?categoria=ia&modo=grade');
  });

  it('ida e volta', () => {
    const e = { categoria: 'edicao' as const, modo: 'grade' as const };
    expect(lerEstado(montarBusca(e), validas)).toEqual(e);
  });
});
