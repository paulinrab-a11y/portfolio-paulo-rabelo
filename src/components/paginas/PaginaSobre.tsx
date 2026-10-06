import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ExperienciaRolando } from '@/components/sobre/ExperienciaRolando';
import type { Idioma } from '@/data/idiomas';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { perfilNo, servicoEm, t as textosDe } from '@/lib/i18n';
import { metadadosPagina } from '@/lib/metadados';
import { caminho } from '@/lib/rotas';
import { breadcrumbLd } from '@/lib/seo';
import { servicosComTrabalho } from '@/lib/servicos';
import { SITE_URL } from '@/lib/site';

/** PDF do CV por idioma (gerado por scripts/cv-pdf.mjs) */
export function pdfCv(lang: Idioma): string {
  return lang === 'pt' ? '/paulo-rabelo-cv.pdf' : `/paulo-rabelo-cv-${lang}.pdf`;
}

export function metadadosSobre(lang: Idioma): Metadata {
  const tx = textosDe(lang);
  return metadadosPagina(
    lang,
    { pagina: 'sobre' },
    { titulo: tx.sobre.rotulo, descricao: tx.meta.sobreDescricao, imagem: { url: '/media/retrato/og.jpg', width: 1200, height: 630 } },
  );
}

export function PaginaSobre({ lang }: { lang: Idioma }) {
  const tx = textosDe(lang);
  const p = perfilNo(lang);
  const lista = p.experiencias.filter((e) => !e.soNoCV);
  return (
    <>
      <JsonLd
        dados={breadcrumbLd(SITE_URL, [
          { nome: tx.nav.inicioTrilha, caminho: caminho(lang, { pagina: 'home' }) },
          { nome: tx.sobre.rotulo, caminho: caminho(lang, { pagina: 'sobre' }) },
        ])}
      />
      <section aria-labelledby="sobre-titulo" className="margem grade gap-y-10 pt-[calc(var(--cabecalho)+clamp(32px,6vh,72px))] pb-20">
        <figure className="relative col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-5 lg:col-start-1">
          <div className="relative aspect-[3/4] overflow-hidden bg-carvao">
            <Image
              src="/media/retrato/paulo-rabelo.avif"
              alt={tx.sobre.altRetrato}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 66vw, 100vw"
              className="object-cover object-[55%_60%]"
              loading="eager"
              fetchPriority="high"
            />
            {/* Cantos de visor, como no herói */}
            <span aria-hidden="true" className="absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-creme/80" />
            <span aria-hidden="true" className="absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-creme/80" />
            <span aria-hidden="true" className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-creme/80" />
            <span aria-hidden="true" className="absolute right-3 bottom-3 h-5 w-5 border-r-2 border-b-2 border-creme/80" />
          </div>
          <figcaption className="rotulo mt-3 flex justify-between text-cinza">
            <span>{p.hud}</span>
            <span className="flex items-center gap-2">
              <span className="rec-ponto" /> REC
            </span>
          </figcaption>
        </figure>

        <div className="col-span-12 flex flex-col justify-end lg:col-span-6 lg:col-start-7">
          <p className="rotulo mb-3 text-rec">{tx.sobre.rotulo}</p>
          <h1 id="sobre-titulo" className="titulo-display text-[clamp(64px,10vw,168px)]">
            Paulo Rabelo
          </h1>
          <p className="mt-5 font-mono text-cinza">
            {p.funcaoCurta} · {p.cidade}
          </p>
          <div className="mt-8 space-y-5 text-xl leading-relaxed">
            {p.bio.map((b) => (
              <p key={b}>{b}</p>
            ))}
            <p className="text-cinza">{p.disponibilidade}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={p.contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className="botao botao-rec">
              {tx.sobre.whatsapp}
            </a>
            <Link href={caminho(lang, { pagina: 'cv' })} className="botao text-creme">
              {tx.sobre.verCv}
            </Link>
            <a href={pdfCv(lang)} download className="botao text-creme">
              {tx.sobre.baixarCv}
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="experiencia" className="cartela margem py-20 lg:py-28">
        <ExperienciaRolando lista={lista} titulo={tx.sobre.experiencia} />
      </section>

      <section aria-label={tx.sobre.secaoFinal} className="margem grade gap-y-12 py-20">
        <div className="col-span-12 md:col-span-6">
          <h2 className="rotulo mb-5 text-cinza">{tx.sobre.formacao}</h2>
          <p className="text-xl">
            {p.formacao.graduacao.curso}, {p.formacao.graduacao.instituicao} ({p.formacao.graduacao.ano})
          </p>
          <p className="mt-4 text-cinza">
            {p.formacao.cursos.instituicao}: {p.formacao.cursos.lista.join(', ')}.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6">
          <h2 className="rotulo mb-5 text-cinza">{tx.sobre.ferramentas}</h2>
          <ul className="flex flex-wrap gap-2">
            {p.ferramentas.map((f) => (
              <li key={f} className="rotulo border border-linha px-3 py-2">
                {f}
              </li>
            ))}
          </ul>
          <h2 className="rotulo mt-10 mb-5 text-cinza">{tx.sobre.oQueFaco}</h2>
          <ul className="flex flex-wrap gap-2">
            {servicosComTrabalho(servicos, trabalhos).map((s) => (
              <li key={s.slug}>
                <Link
                  href={caminho(lang, { pagina: 'servicos', servico: s.slug })}
                  className="rotulo inline-flex min-h-11 items-center border border-linha px-3 hover:border-creme"
                >
                  {servicoEm(s, lang).nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
