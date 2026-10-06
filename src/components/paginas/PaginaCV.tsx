import type { Metadata } from 'next';
import { BotaoImprimir } from '@/components/cv/BotaoImprimir';
import { JsonLd } from '@/components/JsonLd';
import { pdfCv } from '@/components/paginas/PaginaSobre';
import type { Idioma } from '@/data/idiomas';
import { perfilNo, t as textosDe } from '@/lib/i18n';
import { metadadosPagina } from '@/lib/metadados';
import { caminho } from '@/lib/rotas';
import { breadcrumbLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export function metadadosCV(lang: Idioma): Metadata {
  const tx = textosDe(lang);
  return metadadosPagina(lang, { pagina: 'cv' }, { titulo: tx.cv.titulo, descricao: tx.meta.cvDescricao });
}

/** CV em cartela creme, pronto para imprimir ou salvar em PDF */
export function PaginaCV({ lang }: { lang: Idioma }) {
  const tx = textosDe(lang);
  const p = perfilNo(lang);
  return (
    <div className="cartela pt-[var(--cabecalho)] print:pt-0">
      <JsonLd
        dados={breadcrumbLd(SITE_URL, [
          { nome: tx.nav.inicioTrilha, caminho: caminho(lang, { pagina: 'home' }) },
          { nome: tx.cv.titulo, caminho: caminho(lang, { pagina: 'cv' }) },
        ])}
      />
      <article className="margem mx-auto max-w-5xl py-14 print:max-w-none print:px-0 print:py-0">
        <header className="flex flex-col gap-6 border-b border-preto/20 pb-8 print:pb-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="rotulo secundario mb-2">{tx.cv.rotulo}</p>
            <h1 className="titulo-display text-[clamp(44px,7vw,88px)] print:text-[40px]">{p.nomeCompleto}</h1>
            <p className="mt-3 text-lg">
              {tx.meta.cargo} · {p.cidade}
            </p>
          </div>
          <div className="sem-impressao flex flex-wrap gap-3">
            <a href={pdfCv(lang)} download className="botao botao-rec">
              {tx.cv.baixar}
            </a>
            <BotaoImprimir rotulo={tx.cv.imprimir} />
          </div>
        </header>

        <dl className="grid gap-4 border-b border-preto/20 py-6 print:py-3 sm:grid-cols-2 lg:grid-cols-4">
          {[p.contato.whatsapp, p.contato.email, p.contato.linkedin, p.contato.instagram].map((c) => (
            <div key={c.href}>
              <dt className="rotulo secundario">{c.rotulo}</dt>
              <dd className="mt-1 break-all">
                <a href={c.href} className="underline decoration-preto/30 underline-offset-4 hover:decoration-rec-escuro">
                  {c.valor}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="cv-resumo" className="py-8 print:py-3">
          <h2 id="cv-resumo" className="rotulo text-rec-escuro mb-3">
            {tx.cv.resumo}
          </h2>
          <div className="max-w-[70ch] space-y-2">
            {p.bio.map((b) => (
              <p key={b}>{b}</p>
            ))}
            <p>{p.disponibilidade}</p>
          </div>
        </section>

        <section aria-labelledby="cv-exp" className="border-t border-preto/20 py-8 print:py-3">
          <h2 id="cv-exp" className="rotulo text-rec-escuro mb-4">
            {tx.cv.experiencia}
          </h2>
          <ol className="space-y-5 print:space-y-2">
            {p.experiencias.map((e) => (
              <li key={`${e.empresa}${e.cargo}`} className="grid gap-1 md:grid-cols-[180px_1fr] md:gap-6">
                <span className="rotulo secundario tabular-nums md:pt-1">{e.periodo}</span>
                <div>
                  <h3 className="text-lg font-semibold">
                    {e.cargo} · {e.empresa}
                  </h3>
                  {e.detalhe && <p className="secundario">{e.detalhe}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="cv-formacao" className="grid gap-8 border-t border-preto/20 py-8 print:py-3 md:grid-cols-2">
          <div>
            <h2 id="cv-formacao" className="rotulo text-rec-escuro mb-3">
              {tx.cv.formacao}
            </h2>
            <p>
              {[p.formacao.graduacao.curso, p.formacao.graduacao.instituicao, p.formacao.graduacao.ano].join(tx.separadorLista)}
              {tx.pontoFinal}
            </p>
            <p className="secundario mt-2">
              {p.formacao.cursos.instituicao}
              {tx.doisPontos}
              {p.formacao.cursos.lista.join(tx.separadorLista)}
              {tx.pontoFinal}
            </p>
          </div>
          <div>
            <h2 className="rotulo text-rec-escuro mb-3">{tx.cv.ferramentas}</h2>
            <p>
              {p.ferramentas.join(tx.separadorLista)}
              {tx.pontoFinal}
            </p>
            <h2 className="rotulo text-rec-escuro mt-6 mb-3">{tx.cv.areas}</h2>
            <p>
              {p.servicos.join(tx.separadorLista)}
              {tx.pontoFinal}
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
