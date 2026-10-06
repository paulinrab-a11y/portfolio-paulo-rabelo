import { describe, expect, it } from 'vitest';
import { abaDoSlug, alternativas, analisarCaminho, caminho, caminhoContato, slugServico, traduzirCaminho } from './rotas';

describe('caminho', () => {
  it('português na raiz, sem prefixo (links antigos não mudam)', () => {
    expect(caminho('pt', { pagina: 'home' })).toBe('/');
    expect(caminho('pt', { pagina: 'trabalhos' })).toBe('/trabalhos');
    expect(caminho('pt', { pagina: 'trabalhos', trabalho: 'clipe-santxx-azam-mc' })).toBe('/trabalhos/clipe-santxx-azam-mc');
    expect(caminho('pt', { pagina: 'servicos', servico: 'editor-de-video' })).toBe('/servicos/editor-de-video');
  });

  it('inglês e espanhol com prefixo e caminhos no idioma', () => {
    expect(caminho('en', { pagina: 'home' })).toBe('/en');
    expect(caminho('en', { pagina: 'trabalhos', aba: 'sites' })).toBe('/en/work/websites');
    expect(caminho('es', { pagina: 'trabalhos', aba: 'sites' })).toBe('/es/trabajos/sitios-web');
    expect(caminho('en', { pagina: 'sobre' })).toBe('/en/about');
    expect(caminho('es', { pagina: 'sobre' })).toBe('/es/sobre-mi');
    expect(caminho('en', { pagina: 'cv' })).toBe('/en/resume');
    expect(caminho('es', { pagina: 'servicos', servico: 'criacao-de-sites' })).toBe('/es/servicios/sitios-web');
  });

  it('contato no fim da home', () => {
    expect(caminhoContato('pt')).toBe('/#contato');
    expect(caminhoContato('es')).toBe('/es/#contato');
  });
});

describe('abaDoSlug', () => {
  it('reconhece a aba pelo slug do idioma', () => {
    expect(abaDoSlug('en', 'websites')).toBe('sites');
    expect(abaDoSlug('pt', 'sites')).toBe('sites');
    expect(abaDoSlug('es', 'websites')).toBeUndefined();
    expect(abaDoSlug('pt', 'clipe-santxx-azam-mc')).toBeUndefined();
  });
});

describe('slugServico', () => {
  it('traduz e cai no português se faltar', () => {
    expect(slugServico('editor-de-video', 'en')).toBe('video-editor');
    expect(slugServico('editor-de-video', 'pt')).toBe('editor-de-video');
    expect(slugServico('nao-existe', 'en')).toBe('nao-existe');
  });
});

describe('analisarCaminho', () => {
  it('lê idioma e página', () => {
    expect(analisarCaminho('/')).toEqual({ lang: 'pt', ref: { pagina: 'home' } });
    expect(analisarCaminho('/en')).toEqual({ lang: 'en', ref: { pagina: 'home' } });
    expect(analisarCaminho('/es/trabajos/video')).toEqual({ lang: 'es', ref: { pagina: 'trabalhos', aba: 'video' } });
    expect(analisarCaminho('/en/work/eventos')).toEqual({ lang: 'en', ref: { pagina: 'trabalhos', trabalho: 'eventos' } });
    expect(analisarCaminho('/en/services/ai-video')).toEqual({ lang: 'en', ref: { pagina: 'servicos', servico: 'video-com-ia' } });
    expect(analisarCaminho('/sobre?x=1#y')).toEqual({ lang: 'pt', ref: { pagina: 'sobre' } });
  });

  it('caminho fora do mapa devolve null', () => {
    expect(analisarCaminho('/en/trabalhos')).toBeNull();
    expect(analisarCaminho('/servicos/nao-existe')).toBeNull();
    expect(analisarCaminho('/sobre/extra')).toBeNull();
    expect(analisarCaminho('/trabalhos/a/b')).toBeNull();
  });
});

describe('traduzirCaminho', () => {
  it('leva para a mesma página no outro idioma', () => {
    expect(traduzirCaminho('/trabalhos/sites', 'en')).toBe('/en/work/websites');
    expect(traduzirCaminho('/en/work/websites', 'es')).toBe('/es/trabajos/sitios-web');
    expect(traduzirCaminho('/es/servicios/editor-de-video', 'pt')).toBe('/servicos/editor-de-video');
    expect(traduzirCaminho('/en/work/clipe-santxx-azam-mc', 'pt')).toBe('/trabalhos/clipe-santxx-azam-mc');
    expect(traduzirCaminho('/cv', 'en')).toBe('/en/resume');
  });

  it('fora do mapa vai para a home do idioma', () => {
    expect(traduzirCaminho('/qualquer-coisa', 'es')).toBe('/es');
  });
});

describe('alternativas', () => {
  it('a mesma página nos três idiomas', () => {
    expect(alternativas({ pagina: 'trabalhos', aba: 'marketing' })).toEqual({ pt: '/trabalhos/marketing', en: '/en/work/marketing', es: '/es/trabajos/marketing' });
  });
});
