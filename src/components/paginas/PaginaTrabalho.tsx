import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import { JsonLd } from '@/components/JsonLd';
import { SeloIA } from '@/components/SeloIA';
import { Player } from '@/components/trabalhos/Player';
import { abas, type Idioma, slugAba } from '@/data/idiomas';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { legendaEm, servicoEm, t as textosDe, trabalhoEm } from '@/lib/i18n';
import { metadadosPagina } from '@/lib/metadados';
import { ehVideo, midia } from '@/lib/midia';
import { caminho } from '@/lib/rotas';
import { breadcrumbLd, trabalhoLd } from '@/lib/seo';
import { servicoDaCategoria } from '@/lib/servicos';
import { SITE_URL } from '@/lib/site';
import { buscar, proximo } from '@/lib/trabalhos';

/** Slugs estáticos de /trabalhos/<slug> no idioma: as três abas e cada trabalho */
export function slugsTrabalhos(lang: Idioma): string[] {
  return [...abas.map((a) => slugAba[a][lang]), ...trabalhos.map((t) => t.slug)];
}

export function metadadosTrabalho(lang: Idioma, slug: string): Metadata {
  const base = buscar(trabalhos, slug);
  if (!base) return {};
  const t = trabalhoEm(base, lang);
  const m = midia(t.midia);
  return metadadosPagina(
    lang,
    { pagina: 'trabalhos', trabalho: slug },
    { titulo: t.titulo, descricao: `${t.texto.contexto} ${t.texto.oQueFiz}`, imagem: { url: m.poster.jpg, width: m.width, height: m.height } },
  );
}

export function PaginaTrabalho({ lang, slug }: { lang: Idioma; slug: string }) {
  const base = buscar(trabalhos, slug);
  if (!base) notFound();
  const tx = textosDe(lang);
  const t = trabalhoEm(base, lang);

  const m = midia(t.midia);
  const extras = [...(m.extra ?? []), ...(t.midiasExtras ?? []).map((s) => midia(s))];
  const seguinte = trabalhoEm(proximo(trabalhos, t.slug), lang);
  const vertical = m.orientation === 'vertical';
  const video = ehVideo(m);
  // A imagem principal já está no palco: não repete na galeria
  const galeria = (m.images ?? []).filter((i) => (i.label !== 'thumb' || !video) && i.src !== m.poster.avif);

  const palco = video ? (
    <Player midia={m} titulo={t.titulo} lang={lang} className={vertical ? 'mx-auto max-h-[78svh] lg:mx-0' : 'w-full'} />
  ) : (
    <div className="relative bg-carvao" style={{ aspectRatio: `${m.width} / ${m.height}` }}>
      <Image src={m.poster.avif} alt={t.titulo} fill unoptimized sizes="(min-width: 1024px) 60vw, 100vw" className="object-contain" loading="eager" fetchPriority="high" />
    </div>
  );

  const relacionados = [...new Set(t.categorias.map((c) => servicoDaCategoria(servicos, c)).filter((x) => x !== undefined))];
  const aqui = caminho(lang, { pagina: 'trabalhos', trabalho: t.slug });

  return (
    <article className="pt-[var(--cabecalho)]">
      <JsonLd
        dados={[
          trabalhoLd(SITE_URL, {
            titulo: t.titulo,
            descricao: `${t.texto.contexto} ${t.texto.oQueFiz}`,
            caminho: aqui,
            imagem: m.poster.jpg,
            cliente: t.cliente,
            feitoComIA: t.feitoComIA,
          }),
          breadcrumbLd(SITE_URL, [
            { nome: tx.nav.inicioTrilha, caminho: caminho(lang, { pagina: 'home' }) },
            { nome: tx.indice.titulo, caminho: caminho(lang, { pagina: 'trabalhos' }) },
            { nome: t.titulo, caminho: aqui },
          ]),
        ]}
      />
      <div className={vertical || !video ? 'margem grade gap-y-10 pt-8 pb-16 lg:pt-12' : 'pb-12'}>
        {/* Player no topo: o trabalho é o conteúdo principal */}
        <div className={vertical || !video ? 'relative col-span-12 lg:col-span-5' : 'relative mx-auto max-w-[1600px] lg:px-[var(--margem)] lg:pt-8'}>
          <ViewTransition name={`trabalho-${t.slug}`} share="trabalho" default="none">
            <div>{palco}</div>
          </ViewTransition>
          {t.feitoComIA && <SeloIA lang={lang} className="absolute top-3 left-3 lg:left-[calc(var(--margem)+12px)]" />}
        </div>

        <div className={vertical || !video ? 'col-span-12 lg:col-span-6 lg:col-start-7' : 'margem grade mt-10 gap-y-10'}>
          <header className={vertical || !video ? '' : 'col-span-12 lg:col-span-7'}>
            <p className="rotulo mb-3 text-rec">{t.categorias.map((c) => tx.categorias[c]).join(' · ')}</p>
            <h1 className="titulo-display text-[clamp(52px,8vw,128px)]">{t.titulo}</h1>
            {t.feitoComIA && <SeloIA lang={lang} className="mt-5" />}
          </header>

          <div className={vertical || !video ? 'mt-10 space-y-10' : 'col-span-12 space-y-10 lg:col-span-7'}>
            <Bloco rotulo={tx.trabalho.contexto} texto={t.texto.contexto} />
            <Bloco rotulo={tx.trabalho.oQueFiz} texto={t.texto.oQueFiz} />
            {t.texto.resultado && <Bloco rotulo={tx.trabalho.resultado} texto={t.texto.resultado} />}
            {relacionados.length > 0 && (
              <p className="rotulo flex flex-wrap gap-x-4 gap-y-2 text-cinza">
                <span>{tx.trabalho.servicos}</span>
                {relacionados.map((r) => (
                  <Link
                    key={r.slug}
                    href={caminho(lang, { pagina: 'servicos', servico: r.slug })}
                    className="text-creme underline decoration-linha underline-offset-4 hover:text-rec"
                  >
                    {servicoEm(r, lang).nome}
                  </Link>
                ))}
              </p>
            )}
            {t.link && (
              <a href={t.link.href} target="_blank" rel="noopener noreferrer" className="botao text-creme">
                {tx.trabalho.verSite} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          <aside
            aria-labelledby="creditos"
            className={`cartela p-6 md:p-8 ${vertical || !video ? 'mt-12' : 'col-span-12 self-start lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-2'}`}
          >
            <h2 id="creditos" className="rotulo mb-5 text-rec-escuro">
              {tx.trabalho.creditos}
            </h2>
            <dl className="space-y-4">
              {t.creditos.map((c) => (
                <div key={c.rotulo} className="border-t border-preto/15 pt-3">
                  <dt className="rotulo secundario">{c.rotulo}</dt>
                  <dd className="mt-1 text-lg">{c.valor}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>

      {(extras.length > 0 || galeria.length > 0) && (
        <section aria-labelledby="quadros" className="margem border-t border-linha py-16">
          <h2 id="quadros" className="rotulo mb-8 text-cinza">
            {video ? tx.trabalho.mais : tx.trabalho.pecas}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((e) => (
              <Player key={e.poster.jpg} midia={e} titulo={t.titulo} lang={lang} className="w-full" />
            ))}
            {galeria.map((g) => {
              const legenda = legendaEm(g.label, lang);
              return (
                <figure key={g.src}>
                  {/* Miniatura no tamanho certo (otimizador do Next); o clique abre a peça inteira */}
                  <a href={g.fallback ?? g.src} target="_blank" rel="noopener" className="group relative block bg-carvao" style={{ aspectRatio: `${g.width} / ${g.height}` }}>
                    <Image
                      src={g.src}
                      alt={legenda ? `${t.titulo}${tx.doisPontos}${legenda}` : t.titulo}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                    <span
                      className="rotulo absolute right-2 bottom-2 bg-preto/80 px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    >
                      {tx.trabalho.ampliar}
                    </span>
                  </a>
                </figure>
              );
            })}
          </div>
        </section>
      )}

      <nav aria-label={tx.trabalho.proximoAria} className="border-t border-linha">
        <Link href={caminho(lang, { pagina: 'trabalhos', trabalho: seguinte.slug })} className="margem group flex flex-col gap-2 py-16 hover:bg-carvao md:py-24">
          <span className="rotulo text-cinza">{tx.trabalho.proximo}</span>
          <span className="titulo-display text-[clamp(48px,9vw,160px)] group-hover:text-rec">{seguinte.titulo}</span>
        </Link>
      </nav>
    </article>
  );
}

function Bloco({ rotulo, texto }: { rotulo: string; texto: string }) {
  return (
    <section>
      <h2 className="rotulo mb-2 text-cinza">{rotulo}</h2>
      <p className="max-w-[56ch] text-xl leading-relaxed">{texto}</p>
    </section>
  );
}
