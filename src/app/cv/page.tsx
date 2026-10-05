import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { contato, experiencias, formacao, perfil } from '@/data/perfil';
import { breadcrumbLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { BotaoImprimir } from './BotaoImprimir';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Currículo de Paulo Vitor Pereira Rabelo: editor de vídeo, motion designer e diretor de arte.',
  alternates: { canonical: '/cv' },
};

/** CV em cartela creme, pronto para imprimir ou salvar em PDF */
export default function CV() {
  return (
    <div className="cartela pt-[var(--cabecalho)] print:pt-0">
      <JsonLd
        dados={breadcrumbLd(SITE_URL, [
          { nome: 'Início', caminho: '/' },
          { nome: 'CV', caminho: '/cv' },
        ])}
      />
      <article className="margem mx-auto max-w-5xl py-14 print:max-w-none print:px-0 print:py-0">
        <header className="flex flex-col gap-6 border-b border-preto/20 pb-8 print:pb-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="rotulo secundario mb-2">Currículo</p>
            <h1 className="titulo-display text-[clamp(44px,7vw,88px)] print:text-[40px]">{perfil.nomeCompleto}</h1>
            <p className="mt-3 text-lg">Editor de vídeo, motion designer e diretor de arte · {perfil.cidade}</p>
          </div>
          <div className="sem-impressao flex flex-wrap gap-3">
            <a href="/paulo-rabelo-cv.pdf" download className="botao botao-rec">
              Baixar PDF
            </a>
            <BotaoImprimir />
          </div>
        </header>

        <dl className="grid gap-4 border-b border-preto/20 py-6 print:py-3 sm:grid-cols-2 lg:grid-cols-4">
          {[contato.whatsapp, contato.email, contato.linkedin, contato.instagram].map((c) => (
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
            Resumo
          </h2>
          <div className="max-w-[70ch] space-y-2">
            {perfil.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>{perfil.disponibilidade}</p>
          </div>
        </section>

        <section aria-labelledby="cv-exp" className="border-t border-preto/20 py-8 print:py-3">
          <h2 id="cv-exp" className="rotulo text-rec-escuro mb-4">
            Experiência
          </h2>
          <ol className="space-y-5 print:space-y-2">
            {experiencias.map((e) => (
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
              Formação
            </h2>
            <p>
              {formacao.graduacao.curso}, {formacao.graduacao.instituicao}, {formacao.graduacao.ano}.
            </p>
            <p className="secundario mt-2">
              {formacao.cursos.instituicao}: {formacao.cursos.lista.join(', ')}.
            </p>
          </div>
          <div>
            <h2 className="rotulo text-rec-escuro mb-3">Ferramentas</h2>
            <p>{perfil.ferramentas.join(', ')}.</p>
            <h2 className="rotulo text-rec-escuro mt-6 mb-3">Áreas</h2>
            <p>{perfil.servicos.join(', ')}.</p>
          </div>
        </section>
      </article>
    </div>
  );
}
