import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Indice } from '@/components/trabalhos/Indice';
import { type Aba, abas, type Idioma } from '@/data/idiomas';
import { trabalhos } from '@/data/trabalhos';
import { t as textosDe, trabalhoEm } from '@/lib/i18n';
import { metadadosPagina } from '@/lib/metadados';
import { caminho } from '@/lib/rotas';
import { breadcrumbLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { daAba } from '@/lib/trabalhos';

export function metadadosIndice(lang: Idioma, aba?: Aba): Metadata {
  const tx = textosDe(lang);
  if (!aba) return metadadosPagina(lang, { pagina: 'trabalhos' }, { titulo: tx.indice.titulo, descricao: tx.meta.trabalhosDescricao });
  return metadadosPagina(
    lang,
    { pagina: 'trabalhos', aba },
    { titulo: `${tx.indice.titulo}${tx.doisPontos}${tx.abas[aba].nome}`, descricao: tx.descricaoAba(tx.abas[aba].descricao) },
  );
}

/**
 * Índice de trabalhos. Sem aba, todos; com aba (vídeo, sites ou marketing),
 * só os daquela área, com link próprio. As abas ficam no topo como uma barra
 * de abas de software, cada uma com a sua URL.
 */
export function PaginaIndice({ lang, aba }: { lang: Idioma; aba?: Aba }) {
  const tx = textosDe(lang);
  const todos = trabalhos.map((t) => trabalhoEm(t, lang));
  const lista = aba ? daAba(todos, aba) : todos;
  const trilha = [
    { nome: tx.nav.inicioTrilha, caminho: caminho(lang, { pagina: 'home' }) },
    { nome: tx.indice.titulo, caminho: caminho(lang, { pagina: 'trabalhos' }) },
    ...(aba ? [{ nome: tx.abas[aba].nome, caminho: caminho(lang, { pagina: 'trabalhos', aba }) }] : []),
  ];
  const itensAbas = [
    { chave: 'todos', href: caminho(lang, { pagina: 'trabalhos' }), nome: tx.indice.todosAba, n: todos.length, atual: !aba },
    ...abas.map((a) => ({ chave: a, href: caminho(lang, { pagina: 'trabalhos', aba: a }), nome: tx.abas[a].nome, n: daAba(todos, a).length, atual: a === aba })),
  ];

  return (
    <section aria-labelledby="trabalhos-titulo" className="margem pt-[calc(var(--cabecalho)+clamp(48px,10vh,120px))] pb-24">
      <JsonLd dados={breadcrumbLd(SITE_URL, trilha)} />
      <p className="rotulo mb-3 text-rec">{tx.indice.rotulo}</p>
      <h1 id="trabalhos-titulo" className="titulo-display text-[clamp(64px,13vw,200px)]">
        {aba ? tx.abas[aba].nome : tx.indice.titulo}
      </h1>
      <p className="mt-4 mb-10 max-w-[52ch] text-lg text-cinza">{aba ? tx.abas[aba].descricao : tx.meta.trabalhosDescricao}</p>

      <nav aria-label={tx.indice.abasAria} className="mb-10 border-b border-linha">
        <ul className="-mb-px flex flex-wrap gap-x-1">
          {itensAbas.map((i) => (
            <li key={i.chave}>
              <Link
                href={i.href}
                aria-current={i.atual ? 'page' : undefined}
                data-aba={i.chave}
                className={`flex min-h-12 items-baseline gap-2 border-b-2 px-3 pt-3 pb-2 transition-colors sm:px-5 ${i.atual ? 'border-rec text-creme' : 'border-transparent text-cinza hover:text-creme'}`}
              >
                <span className="titulo-display text-[clamp(24px,3vw,40px)]">{i.nome}</span>
                <span className="rotulo">{i.n}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Indice key={aba ?? 'todos'} lista={lista} lang={lang} />
    </section>
  );
}
