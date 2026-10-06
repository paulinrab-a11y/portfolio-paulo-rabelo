import { describe, expect, it } from 'vitest';
import { breadcrumbLd, pessoaLd, serializarLd, servicoLd, trabalhoLd } from './seo';

const URL_SITE = 'https://exemplo.com';

describe('pessoaLd', () => {
  const base = {
    nome: 'Paulo Rabelo',
    nomeCompleto: 'Paulo Vitor Pereira Rabelo',
    url: URL_SITE,
    email: 'a@b.com',
    cargo: 'Editor',
    cidade: 'São Paulo',
    sameAs: ['https://linkedin.com/in/x'],
    areas: ['Edição'],
  };

  it('usa o nome completo e o @id que os outros blocos referenciam', () => {
    const ld = pessoaLd(base);
    expect(ld.name).toBe('Paulo Vitor Pereira Rabelo');
    expect(ld['@id']).toBe('https://exemplo.com/#pessoa');
    expect(ld.email).toBe('mailto:a@b.com');
  });

  it('endereço só com cidade, estado e país', () => {
    expect(pessoaLd(base).address).toEqual({ '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' });
  });

  it('imagem é opcional e vira URL absoluta', () => {
    expect(pessoaLd(base)).not.toHaveProperty('image');
    expect(pessoaLd({ ...base, imagem: '/f.jpg' }).image).toBe('https://exemplo.com/f.jpg');
  });
});

describe('breadcrumbLd', () => {
  it('numera a partir de 1 com URLs absolutas', () => {
    const ld = breadcrumbLd(URL_SITE, [
      { nome: 'Início', caminho: '/' },
      { nome: 'Serviços', caminho: '/servicos' },
    ]);
    expect(ld.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://exemplo.com/' },
      { '@type': 'ListItem', position: 2, name: 'Serviços', item: 'https://exemplo.com/servicos' },
    ]);
  });
});

describe('servicoLd', () => {
  it('aponta para a pessoa como prestador', () => {
    const ld = servicoLd(URL_SITE, { nome: 'Edição', descricao: 'd', caminho: '/servicos/edicao' });
    expect(ld.provider).toEqual({ '@id': 'https://exemplo.com/#pessoa' });
    expect(ld.url).toBe('https://exemplo.com/servicos/edicao');
  });
});

describe('trabalhoLd', () => {
  const t = { titulo: 'Clipe', descricao: 'd', caminho: '/trabalhos/clipe', imagem: '/p.jpg' };

  it('sem cliente e sem IA, não inventa campos', () => {
    const ld = trabalhoLd(URL_SITE, t);
    expect(ld).not.toHaveProperty('sourceOrganization');
    expect(ld).not.toHaveProperty('keywords');
    expect(ld).not.toHaveProperty('datePublished');
  });

  it('com cliente e IA', () => {
    const ld = trabalhoLd(URL_SITE, { ...t, cliente: 'OHC Motors', seloIA: 'Made with AI' });
    expect(ld.sourceOrganization).toEqual({ '@type': 'Organization', name: 'OHC Motors' });
    expect(ld.keywords).toBe('Made with AI');
  });
});

describe('serializarLd', () => {
  it('escapa < para não fechar o <script>', () => {
    expect(serializarLd({ a: '</script>' })).not.toContain('</script>');
  });
});
