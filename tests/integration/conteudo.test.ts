import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { clientes, contato, experiencias, perfil } from '@/data/perfil';
import { servicos } from '@/data/servicos';
import { abas, idiomas, slugAba, slugServicos } from '@/data/idiomas';
import { textos } from '@/data/textos';
import { trabalhos } from '@/data/trabalhos';
import { legendasEm, perfilEm, servicosEm, trabalhosEm } from '@/data/traducoes';
import { midia, temMidia, todasAsMidias } from '@/lib/midia';
import { trabalhosDoServico } from '@/lib/servicos';

const raiz = join(__dirname, '..', '..');
const publico = (url: string) => join(raiz, 'public', ...url.split('/').filter(Boolean));

/** Todo texto que vai para a tela: dados, componentes e rotas */
function arquivosDeTexto(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return arquivosDeTexto(caminho);
    return /\.(ts|tsx|css)$/.test(nome) && !nome.endsWith('.test.ts') ? [caminho] : [];
  });
}
const fontes = arquivosDeTexto(join(raiz, 'src')).map((f) => ({ f, texto: readFileSync(f, 'utf8') }));

describe('mídia de cada trabalho', () => {
  it('todo trabalho aponta para uma mídia cadastrada', () => {
    for (const t of trabalhos) {
      expect(temMidia(t.midia), t.slug).toBe(true);
      for (const extra of t.midiasExtras ?? []) expect(temMidia(extra), `${t.slug} → ${extra}`).toBe(true);
    }
  });

  it('todo arquivo citado no media.json existe em public/', () => {
    for (const [slug, m] of todasAsMidias()) {
      const urls = [m.poster.avif, m.poster.jpg, m.preview?.mp4, m.preview?.webm, m.full?.mp4, m.full?.webm, ...(m.images ?? []).flatMap((i) => [i.src, i.fallback])];
      for (const u of urls.filter((x): x is string => Boolean(x))) expect(existsSync(publico(u)), `${slug}: ${u}`).toBe(true);
    }
  });

  it('nenhum arquivo de mídia passa de 20 MB', () => {
    for (const [slug, m] of todasAsMidias()) {
      for (const u of [m.preview?.mp4, m.preview?.webm, m.full?.mp4].filter((x): x is string => Boolean(x))) {
        expect(statSync(publico(u)).size, `${slug}: ${u}`).toBeLessThan(20 * 1024 * 1024);
      }
    }
  });

  it('o herói existe e é horizontal (poster é o LCP)', () => {
    expect(midia('hero').orientation).toBe('horizontal');
    expect(midia('hero').preview).not.toBeNull();
  });

  it('logos só dos arquivos da pasta', () => {
    for (const c of clientes) if (c.logo) expect(existsSync(publico(c.logo.src)), c.nome).toBe(true);
    for (const c of clientes.filter((c) => c.logo)) expect(['WhyNot Visuals', 'WhyNot Records', 'MH Phones']).toContain(c.nome);
  });
});

describe('dados dos trabalhos', () => {
  it('slugs únicos e em formato de URL', () => {
    const slugs = trabalhos.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('6 destaques, numerados de 1 a 6', () => {
    const d = trabalhos.filter((t) => t.destaque !== undefined).map((t) => t.destaque);
    expect(d.sort()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('trabalho na categoria IA leva o selo "Feito com IA"', () => {
    for (const t of trabalhos.filter((t) => t.categorias.includes('ia') || t.trilha === 'V3')) expect(t.feitoComIA, t.slug).toBe(true);
  });

  it('todo trabalho tem contexto, o que eu fiz e pelo menos um crédito', () => {
    for (const t of trabalhos) {
      expect(t.texto.contexto.length, t.slug).toBeGreaterThan(10);
      expect(t.texto.oQueFiz.length, t.slug).toBeGreaterThan(10);
      expect(t.creditos.length, t.slug).toBeGreaterThan(0);
    }
  });

  it('Hora Bolas fica em Lavras (MG)', () => {
    const hb = trabalhos.find((t) => t.slug === 'hora-bolas-club');
    expect(JSON.stringify(hb)).toContain('Lavras (MG)');
  });

  it('Passem a Respeitar: sem data nem ano no texto', () => {
    const par = trabalhos.filter((t) => JSON.stringify(t).includes('Passem a Respeitar'));
    for (const t of par.filter((t) => t.slug.includes('passem'))) expect(JSON.stringify(t.texto)).not.toMatch(/\b(19|20)\d{2}\b|lança/i);
  });
});

describe('páginas de serviço', () => {
  it('todo serviço tem pelo menos um trabalho real', () => {
    for (const s of servicos) expect(trabalhosDoServico(s, trabalhos).length, s.slug).toBeGreaterThan(0);
  });

  it('descrição cabe no resultado do Google e título não se repete', () => {
    for (const s of servicos) expect(s.descricao.length, s.slug).toBeLessThanOrEqual(160);
    const titulos = servicos.map((s) => s.tituloSeo);
    expect(new Set(titulos).size).toBe(titulos.length);
  });

  it('toda categoria usada em trabalho tem página de serviço', () => {
    const cobertas = new Set(servicos.flatMap((s) => s.categorias));
    for (const t of trabalhos) for (const c of t.categorias) expect(cobertas.has(c), `${t.slug}: ${c}`).toBe(true);
  });
});

describe('regras de texto do brief', () => {
  const proibidas: Array<[RegExp, string]> = [
    [/airbag/i, 'OHC: nunca "airbag"'],
    [/\bchope\b/i, 'Hora Bolas: escreva "Chopp"'],
    [/—/, 'sem travessão'],
    [/soluções inovadoras|transformando ideias|levar sua marca|próximo nível/i, 'frase de anúncio'],
    [/lorem ipsum|em breve/i, 'texto de preenchimento'],
  ];

  for (const [regra, motivo] of proibidas) {
    it(motivo, () => {
      for (const { f, texto } of fontes) expect(texto, f).not.toMatch(regra);
    });
  }

  it('fontes proibidas não aparecem no código', () => {
    for (const { f, texto } of fontes) expect(texto, f).not.toMatch(/\b(Inter|Roboto|Arial|Poppins|Space Grotesk|Montserrat)\b/);
  });

  it('endereço: só cidade, nunca rua ou CEP', () => {
    for (const { f, texto } of fontes) expect(texto, f).not.toMatch(/\b(Rua|Avenida|Av\.|CEP)\s/);
    expect(perfil.cidade).toBe('São Paulo, SP');
  });

  it('nome completo só no JSON-LD e no CV', () => {
    const usos = fontes.filter(({ texto }) => texto.includes('nomeCompleto')).map(({ f }) => f.replace(/\\/g, '/'));
    for (const u of usos) expect(u).toMatch(/src\/(data\/perfil\.ts|lib\/(seo|i18n)\.ts|components\/(Documento|paginas\/PaginaCV)\.tsx)$/);
  });

  it('contatos confirmados', () => {
    expect(contato.whatsapp.href).toContain('wa.me/5511975231957');
    expect(decodeURIComponent(contato.whatsapp.href)).toContain('Oi, Paulo! Vi seu portfólio e quero falar sobre um projeto.');
    expect(contato.email.valor).toBe('paulinrab@gmail.com');
    // Com sublinhado no fim: sem ele, o link leva a outro perfil
    expect(contato.instagram.valor).toBe('@whynotvisuals_');
    expect(contato.instagram.href).toBe('https://www.instagram.com/whynotvisuals_/');
  });

  it('Rabelo Design aparece só no CV', () => {
    expect(experiencias.find((e) => e.empresa === 'Rabelo Design')?.soNoCV).toBe(true);
  });
});

describe('idiomas: inglês, espanhol e chinês completos', () => {
  const traduzidos = ['en', 'es', 'zh'] as const;

  it('todo trabalho tem tradução com título, função, contexto, o que eu fiz e os mesmos créditos', () => {
    for (const lang of traduzidos) {
      for (const t of trabalhos) {
        const tr = trabalhosEm[lang][t.slug];
        expect(tr, `${lang}: ${t.slug}`).toBeDefined();
        if (!tr) continue;
        // Em chinês, dois ideogramas já são um título (活动, eventos)
        expect(tr.titulo.trim().length, `${lang}: ${t.slug}`).toBeGreaterThan(1);
        expect(tr.texto.contexto.length).toBeGreaterThan(10);
        expect(tr.texto.oQueFiz.length).toBeGreaterThan(5);
        expect(Boolean(tr.texto.resultado), `${lang}: ${t.slug} resultado`).toBe(Boolean(t.texto.resultado));
        expect(tr.creditos.length, `${lang}: ${t.slug} créditos`).toBe(t.creditos.length);
        expect(Boolean(tr.cliente), `${lang}: ${t.slug} cliente`).toBe(Boolean(t.cliente));
      }
      expect(Object.keys(trabalhosEm[lang]).sort()).toEqual(trabalhos.map((t) => t.slug).sort());
    }
  });

  it('todo serviço tem tradução e slug próprio, sem slug repetido', () => {
    for (const lang of traduzidos) {
      for (const s of servicos) {
        const tr = servicosEm[lang][s.slug];
        expect(tr, `${lang}: ${s.slug}`).toBeDefined();
        expect(tr?.texto.length, `${lang}: ${s.slug}`).toBe(s.texto.length);
        expect(tr?.descricao.length ?? 0).toBeLessThanOrEqual(160);
        expect(slugServicos[s.slug]?.[lang], `${lang}: ${s.slug} slug`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      }
      const slugs = servicos.map((s) => slugServicos[s.slug]?.[lang]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('nenhum slug de aba coincide com slug de trabalho (dividem /trabalhos/<slug>)', () => {
    for (const lang of idiomas) for (const a of abas) expect(trabalhos.map((t) => t.slug)).not.toContain(slugAba[a][lang]);
  });

  it('todo trabalho está em pelo menos uma aba', () => {
    for (const t of trabalhos) expect(t.abas.length, t.slug).toBeGreaterThan(0);
  });

  it('perfil traduzido por inteiro: experiências, bio e cursos', () => {
    for (const lang of traduzidos) {
      const tr = perfilEm[lang];
      for (const e of experiencias) expect(tr.experiencias[e.empresa], `${lang}: ${e.empresa}`).toBeDefined();
      expect(tr.bio).toHaveLength(perfil.bio.length);
      expect(tr.servicos).toHaveLength(perfil.servicos.length);
      expect(tr.ferramentas).toHaveLength(perfil.ferramentas.length);
    }
  });

  it('toda legenda de imagem usada nas galerias tem tradução', () => {
    const legendas = todasAsMidias()
      .flatMap(([, m]) => (m.images ?? []).map((i) => i.label))
      .filter((l): l is string => Boolean(l) && !['whynot', 'mh-phones', 'mh-phones-512', 'thumb'].includes(l as string));
    for (const lang of traduzidos) for (const l of legendas) expect(legendasEm[lang][l], `${lang}: ${l}`).toBeDefined();
  });

  it('o selo de IA aparece com o nome certo em cada idioma', () => {
    expect(textos.pt.selo.ia).toBe('Feito com IA');
    expect(textos.en.selo.ia).toBe('Made with AI');
    expect(textos.es.selo.ia).toBe('Hecho con IA');
    expect(textos.zh.selo.ia).toBe('AI 制作');
  });

  it('chinês: URL sem ideograma (copiada, viraria %E4%BD%9C…)', () => {
    for (const s of servicos) expect(slugServicos[s.slug]?.zh).toMatch(/^[a-z0-9-]+$/);
    for (const a of abas) expect(slugAba[a].zh).toMatch(/^[a-z0-9-]+$/);
  });
});
