import { describe, expect, it } from 'vitest';
import { imagemOg, linksIdiomas, metadadosBase, metadadosPagina, resumir } from './metadados';

describe('imagemOg', () => {
  it('uma por idioma', () => {
    expect(imagemOg('pt')).toBe('/og/home.jpg');
    expect(imagemOg('en')).toBe('/og/home-en.jpg');
    expect(imagemOg('zh')).toBe('/og/home-zh.jpg');
  });
});

describe('linksIdiomas', () => {
  it('canônico no idioma, hreflang de todos e x-default em português', () => {
    const l = linksIdiomas('es', { pagina: 'trabalhos', aba: 'sites' });
    expect(l.canonical).toBe('/es/trabajos/sitios-web');
    expect(l.languages).toEqual({
      'pt-BR': '/trabalhos/sites',
      en: '/en/work/websites',
      es: '/es/trabajos/sitios-web',
      'zh-CN': '/zh/work/websites',
      'x-default': '/trabalhos/sites',
    });
  });
});

describe('metadadosBase', () => {
  it('título, locale e imagem no idioma', () => {
    const m = metadadosBase('en');
    expect(m.description).toContain('Video editor');
    expect(m.openGraph).toMatchObject({ locale: 'en_US', alternateLocale: ['pt_BR', 'es_ES', 'zh_CN'] });
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

describe('resumir', () => {
  it('não mexe no que cabe', () => {
    expect(resumir('Curto.')).toBe('Curto.');
  });

  it('corta no fim da última frase que cabe', () => {
    const texto = `${'a'.repeat(100)}. ${'b'.repeat(100)}.`;
    expect(resumir(texto)).toBe(`${'a'.repeat(100)}.`);
  });

  it('sem frase inteira, corta na palavra e põe reticências', () => {
    const texto = 'palavra '.repeat(30);
    const r = resumir(texto);
    expect(r.length).toBeLessThanOrEqual(160);
    expect(r).toMatch(/palavra…$/);
  });

  it('chinês: frase com 。 e corte no caractere', () => {
    expect(resumir(`${'字'.repeat(80)}。${'字'.repeat(100)}。`)).toBe(`${'字'.repeat(80)}。`);
    const r = resumir('字'.repeat(200));
    expect(r).toHaveLength(160);
    expect(r.endsWith('…')).toBe(true);
  });
});

describe('metadadosPagina: openGraph completo', () => {
  it('repete tipo, nome do site, url e outros idiomas', () => {
    const m = metadadosPagina('zh', { pagina: 'sobre' }, { titulo: '关于', descricao: 'd' });
    expect(m.openGraph).toMatchObject({ type: 'website', siteName: 'Paulo Rabelo', url: '/zh/about', locale: 'zh_CN' });
    expect((m.openGraph as { alternateLocale: string[] }).alternateLocale).toEqual(['pt_BR', 'en_US', 'es_ES']);
  });
});
