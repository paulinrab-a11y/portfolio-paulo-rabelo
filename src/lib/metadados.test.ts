import { describe, expect, it } from 'vitest';
import { imagemOg, linksIdiomas, metadadosBase, metadadosPagina } from './metadados';

describe('imagemOg', () => {
  it('uma por idioma', () => {
    expect(imagemOg('pt')).toBe('/og/home.jpg');
    expect(imagemOg('en')).toBe('/og/home-en.jpg');
  });
});

describe('linksIdiomas', () => {
  it('canônico no idioma, hreflang dos três e x-default em português', () => {
    const l = linksIdiomas('es', { pagina: 'trabalhos', aba: 'sites' });
    expect(l.canonical).toBe('/es/trabajos/sitios-web');
    expect(l.languages).toEqual({ 'pt-BR': '/trabalhos/sites', en: '/en/work/websites', es: '/es/trabajos/sitios-web', 'x-default': '/trabalhos/sites' });
  });
});

describe('metadadosBase', () => {
  it('título, locale e imagem no idioma', () => {
    const m = metadadosBase('en');
    expect(m.description).toContain('Video editor');
    expect(m.openGraph).toMatchObject({ locale: 'en_US', alternateLocale: ['pt_BR', 'es_ES'] });
  });
});

describe('metadadosPagina', () => {
  it('usa a imagem dada ou a do idioma', () => {
    const sem = metadadosPagina('pt', { pagina: 'sobre' }, { titulo: 'Sobre', descricao: 'd' });
    expect(sem.openGraph?.images).toEqual([{ url: '/og/home.jpg', width: 1200, height: 630 }]);
    const com = metadadosPagina('pt', { pagina: 'sobre' }, { titulo: 'Sobre', descricao: 'd', imagem: { url: '/x.jpg' } });
    expect(com.openGraph?.images).toEqual([{ url: '/x.jpg' }]);
    expect(com.alternates?.canonical).toBe('/sobre');
  });
});
