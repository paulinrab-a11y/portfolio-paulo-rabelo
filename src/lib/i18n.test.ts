import { describe, expect, it } from 'vitest';
import { contato } from '@/data/perfil';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { legendaEm, perfilNo, servicoEm, t, trabalhoEm } from './i18n';

const clipe = trabalhos.find((x) => x.slug === 'clipe-santxx-azam-mc');
if (!clipe) throw new Error('trabalho de teste sumiu');

describe('t', () => {
  it('textos da interface por idioma', () => {
    expect(t('pt').selo.ia).toBe('Feito com IA');
    expect(t('en').selo.ia).toBe('Made with AI');
    expect(t('es').selo.ia).toBe('Hecho con IA');
  });
});

describe('trabalhoEm', () => {
  it('português devolve o próprio objeto', () => {
    expect(trabalhoEm(clipe, 'pt')).toBe(clipe);
  });

  it('traduz texto e créditos, mantém slug, mídia e abas', () => {
    const en = trabalhoEm(clipe, 'en');
    expect(en.titulo).toBe('Santxx and Azam MC music video');
    expect(en.creditos[0].rotulo).toBe('Artists');
    expect(en.slug).toBe(clipe.slug);
    expect(en.midia).toBe(clipe.midia);
    expect(en.abas).toEqual(clipe.abas);
  });

  it('sem tradução, cai no português', () => {
    const inventado = { ...clipe, slug: 'nao-existe' };
    expect(trabalhoEm(inventado, 'es')).toBe(inventado);
  });
});

describe('servicoEm', () => {
  const editor = servicos.find((s) => s.slug === 'editor-de-video');
  if (!editor) throw new Error('serviço de teste sumiu');

  it('traduz e troca o slug, mantém as categorias', () => {
    const en = servicoEm(editor, 'en');
    expect(en.slug).toBe('video-editor');
    expect(en.categorias).toEqual(editor.categorias);
    expect(servicoEm(editor, 'pt')).toBe(editor);
  });

  it('sem tradução, cai no português', () => {
    const inventado = { ...editor, slug: 'nao-existe' };
    expect(servicoEm(inventado, 'es')).toBe(inventado);
  });
});

describe('legendaEm', () => {
  it('traduz legenda conhecida e mantém a desconhecida', () => {
    expect(legendaEm('capa', 'en')).toBe('cover art');
    expect(legendaEm('capa', 'pt')).toBe('capa');
    expect(legendaEm('legenda nova', 'es')).toBe('legenda nova');
    expect(legendaEm(undefined, 'en')).toBeUndefined();
  });
});

describe('perfilNo', () => {
  it('português igual aos dados', () => {
    const p = perfilNo('pt');
    expect(p.contato.whatsapp.href).toBe(contato.whatsapp.href);
    expect(p.contato.email.rotulo).toBe('E-mail');
  });

  it('inglês traduz bio, mensagem do WhatsApp e experiência, sem mexer em nomes e números', () => {
    const p = perfilNo('en');
    expect(decodeURIComponent(p.contato.whatsapp.href)).toContain('Hi Paulo!');
    expect(p.contato.whatsapp.valor).toBe('+55 11 97523-1957');
    expect(p.experiencias[0]).toMatchObject({ empresa: 'OHC Motors', cargo: 'Art and Marketing Director' });
    expect(p.experiencias).toHaveLength(7);
    expect(p.formacao.graduacao.instituicao).toBe('Universidade São Judas Tadeu');
    expect(p.nomeCompleto).toBe('Paulo Vitor Pereira Rabelo');
  });
});
