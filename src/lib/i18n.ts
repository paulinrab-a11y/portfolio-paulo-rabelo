import { type Idioma, slugServicos } from '@/data/idiomas';
import { contato, type Experiencia, experiencias, formacao, manifesto, perfil } from '@/data/perfil';
import type { Servico } from '@/data/servicos';
import { textos } from '@/data/textos';
import type { Trabalho } from '@/data/trabalhos';
import { legendasEm, perfilEm, servicosEm, trabalhosEm } from '@/data/traducoes';

/** Textos da interface no idioma */
export function t(lang: Idioma) {
  return textos[lang];
}

/** Trabalho no idioma (português é a base; o resto vem de traducoes.ts) */
export function trabalhoEm(trabalho: Trabalho, lang: Idioma): Trabalho {
  if (lang === 'pt') return trabalho;
  const tr = trabalhosEm[lang][trabalho.slug];
  if (!tr) return trabalho;
  return { ...trabalho, titulo: tr.titulo, cliente: tr.cliente ?? trabalho.cliente, funcao: tr.funcao, texto: tr.texto, creditos: tr.creditos };
}

/** Serviço no idioma, com o slug do idioma */
export function servicoEm(servico: Servico, lang: Idioma): Servico {
  if (lang === 'pt') return servico;
  const tr = servicosEm[lang][servico.slug];
  return tr ? { ...servico, ...tr, slug: slugServicos[servico.slug]?.[lang] ?? servico.slug } : servico;
}

/** Legenda de imagem (texto alternativo) no idioma */
export function legendaEm(legenda: string | undefined, lang: Idioma): string | undefined {
  if (!legenda || lang === 'pt') return legenda;
  return legendasEm[lang][legenda] ?? legenda;
}

const MENSAGEM_PT = 'Oi, Paulo! Vi seu portfólio e quero falar sobre um projeto.';

/** Perfil, contato, experiência e formação no idioma */
export function perfilNo(lang: Idioma) {
  const tr = lang === 'pt' ? null : perfilEm[lang];
  const mensagem = tr?.mensagemWhatsapp ?? MENSAGEM_PT;
  const rotulos = tr?.rotulos ?? { whatsapp: contato.whatsapp.rotulo, email: contato.email.rotulo, linkedin: contato.linkedin.rotulo, instagram: contato.instagram.rotulo };
  return {
    nome: perfil.nome,
    nomeCompleto: perfil.nomeCompleto,
    hud: perfil.hud,
    cidade: tr?.cidade ?? perfil.cidade,
    disponibilidade: tr?.disponibilidade ?? perfil.disponibilidade,
    funcaoCurta: tr?.funcaoCurta ?? perfil.funcaoCurta,
    servicos: tr?.servicos ?? [...perfil.servicos],
    ferramentas: tr?.ferramentas ?? [...perfil.ferramentas],
    bio: tr?.bio ?? [...perfil.bio],
    manifesto: tr?.manifesto ?? manifesto,
    contato: {
      whatsapp: { ...contato.whatsapp, rotulo: rotulos.whatsapp, href: `https://wa.me/5511975231957?text=${encodeURIComponent(mensagem)}` },
      email: { ...contato.email, rotulo: rotulos.email },
      linkedin: { ...contato.linkedin, rotulo: rotulos.linkedin },
      instagram: { ...contato.instagram, rotulo: rotulos.instagram },
    },
    experiencias: experiencias.map((e): Experiencia => (tr?.experiencias[e.empresa] ? { ...e, ...tr.experiencias[e.empresa] } : e)),
    formacao: {
      graduacao: { ...formacao.graduacao, curso: tr?.formacao.curso ?? formacao.graduacao.curso },
      cursos: { instituicao: formacao.cursos.instituicao, lista: tr?.formacao.cursos ?? [...formacao.cursos.lista] },
    },
  };
}
