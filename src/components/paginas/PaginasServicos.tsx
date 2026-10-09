import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CardTrabalho } from '@/components/CardTrabalho';
import { JsonLd } from '@/components/JsonLd';
import { SeloIA } from '@/components/SeloIA';
import { VideoLoop } from '@/components/VideoLoop';
import type { Idioma } from '@/data/idiomas';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { perfilNo, servicoEm, t as textosDe, trabalhoEm } from '@/lib/i18n';
import { metadadosPagina } from '@/lib/metadados';
import { midia } from '@/lib/midia';
import { caminho } from '@/lib/rotas';
import { breadcrumbLd, servicoLd } from '@/lib/seo';
import { buscarServico, servicosComTrabalho, trabalhoDaVitrine, trabalhosDoServico } from '@/lib/servicos';
import { SITE_URL } from '@/lib/site';

/** Slugs do serviço no idioma, para generateStaticParams */
export function slugsServicos(lang: Idioma): string[] {
  return servicosComTrabalho(servicos, trabalhos).map((s) => servicoEm(s, lang).slug);
}

/** Serviço (em português) a partir do slug no idioma */
function servicoDoSlug(lang: Idioma, slug: string) {
  return servicos.find((s) => servicoEm(s, lang).slug === slug);
}

export function metadadosServicos(lang: Idioma): Metadata {
  const tx = textosDe(lang);
  return metadadosPagina(lang, { pagina: 'servicos' }, { titulo: tx.meta.servicosTitulo, descricao: tx.meta.servicosDescricao });
}

export function metadadosServico(lang: Idioma, slug: string): Metadata {
  const pt = servicoDoSlug(lang, slug);
  if (!pt) return {};
  const s = servicoEm(pt, lang);
  const primeiro = trabalhosDoServico(pt, trabalhos)[0];
  return metadadosPagina(
    lang,
    { pagina: 'servicos', servico: pt.slug },
    { titulo: s.tituloSeo, descricao: s.descricao, imagem: primeiro ? { url: midia(primeiro.midia).poster.jpg } : undefined },
  );
}

export function PaginaServicos({ lang }: { lang: Idioma }) {
  const tx = textosDe(lang);
  const lista = servicosComTrabalho(servicos, trabalhos);
  return (
    <section aria-labelledby="servicos-titulo" className="margem pt-[calc(var(--cabecalho)+clamp(48px,10vh,120px))] pb-24">
      <JsonLd
        dados={breadcrumbLd(SITE_URL, [
          { nome: tx.nav.inicioTrilha, caminho: caminho(lang, { pagina: 'home' }) },
          { nome: tx.servicos.titulo, caminho: caminho(lang, { pagina: 'servicos' }) },
        ])}
      />
      <p className="rotulo mb-3 text-rec">{tx.servicos.rotulo}</p>
      <h1 id="servicos-titulo" className="titulo-display mb-12 text-[clamp(64px,13vw,200px)]">
        {tx.servicos.titulo}
      </h1>
      <ol className="border-t border-linha">
        {lista.map((pt, i) => {
          const s = servicoEm(pt, lang);
          const doServico = trabalhosDoServico(pt, trabalhos);
          return (
            <li key={pt.slug} className="border-b border-linha">
              <Link href={caminho(lang, { pagina: 'servicos', servico: pt.slug })} className="group grid grid-cols-12 items-center gap-x-4 gap-y-4 py-7">
                <span className="rotulo col-span-2 self-start pt-3 text-cinza lg:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="col-span-10 lg:col-span-6">
                  <span className="titulo-display block text-[clamp(32px,4.4vw,64px)] transition-colors group-hover:text-rec group-focus-visible:text-rec">{s.titulo}</span>
                  <span className="mt-2 block max-w-[56ch] text-cinza">{s.texto[0]}</span>
                </span>
                {/* Trilha com um quadro de cada trabalho do serviço (decorativa: a contagem diz quantos são) */}
                <span aria-hidden="true" className="trilha-servico col-span-10 col-start-3 flex h-12 gap-px bg-linha lg:col-span-4 lg:col-start-auto lg:h-16">
                  {doServico.slice(0, 6).map((t) => (
                    <span key={t.slug} className="corte-reel relative min-w-0 flex-1 overflow-hidden bg-carvao">
                      {/* biome-ignore lint/performance/noImgElement: miniatura decorativa, o mesmo poster das outras páginas */}
                      <img src={midia(t.midia).poster.avif} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </span>
                  ))}
                </span>
                <span className="rotulo col-span-10 col-start-3 text-cinza lg:col-span-1 lg:col-start-auto lg:text-right">{tx.servicos.contagem(doServico.length)}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function PaginaServico({ lang, slug }: { lang: Idioma; slug: string }) {
  const pt = servicoDoSlug(lang, slug);
  const base = pt && buscarServico(servicos, pt.slug);
  if (!base) notFound();
  const tx = textosDe(lang);
  const s = servicoEm(base, lang);
  const { contato, ferramentas } = perfilNo(lang);
  const lista = trabalhosDoServico(base, trabalhos).map((t) => trabalhoEm(t, lang));
  const outros = servicosComTrabalho(servicos, trabalhos).filter((o) => o.slug !== base.slug);
  const aqui = caminho(lang, { pagina: 'servicos', servico: base.slug });
  // No monitor: um trabalho cuja categoria principal é deste serviço
  const noMonitor = trabalhoDaVitrine(base, lista);
  const midiaMonitor = noMonitor ? midia(noMonitor.midia) : null;

  return (
    <>
      <JsonLd
        dados={[
          servicoLd(SITE_URL, { nome: s.nome, descricao: s.descricao, caminho: aqui }),
          breadcrumbLd(SITE_URL, [
            { nome: tx.nav.inicioTrilha, caminho: caminho(lang, { pagina: 'home' }) },
            { nome: tx.servicos.titulo, caminho: caminho(lang, { pagina: 'servicos' }) },
            { nome: s.nome, caminho: aqui },
          ]),
        ]}
      />
      <section aria-labelledby="servico-titulo" className="margem grade gap-y-8 pt-[calc(var(--cabecalho)+clamp(48px,10vh,120px))] pb-16">
        <nav aria-label={tx.nav.voceEstaEm} className="rotulo col-span-12 text-cinza">
          <Link href={caminho(lang, { pagina: 'servicos' })} className="hover:text-creme">
            {tx.servicos.titulo}
          </Link>{' '}
          / <span className="text-rec">{s.nome}</span>
        </nav>
        <h1 id="servico-titulo" className="titulo-display col-span-12 text-[clamp(56px,10vw,168px)] lg:col-span-10">
          {s.titulo}
        </h1>
        {/* Texto e botões juntos: não dependem da altura do monitor ao lado */}
        <div className="col-span-12 space-y-8 lg:col-span-6">
          <div className="space-y-4 text-xl leading-relaxed">
            {s.texto.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {/* Quem contrata busca pelo nome das ferramentas; a lista é a do perfil, não deste serviço */}
            <p className="pt-2 text-base text-cinza">
              <span className="rotulo mr-3 text-creme">{tx.servicos.ferramentas}</span>
              {ferramentas.join(tx.separadorLista)}
              {tx.pontoFinal}
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-3">
            <a href={contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className="botao botao-rec">
              {tx.servicos.whatsapp}
            </a>
            <a href={contato.email.href} className="botao text-creme">
              {tx.servicos.email}
            </a>
          </div>
        </div>
        {noMonitor && midiaMonitor && (
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-3">
            {/* Rótulo, monitor e legenda na largura do quadro (peça vertical estreita o bloco todo) */}
            <div className="ml-auto" style={{ width: `min(100%, calc(60svh * ${(midiaMonitor.width / midiaMonitor.height).toFixed(3)}))` }}>
              <p className="rotulo mb-3 flex items-center gap-2 text-creme">
                <span className="rec-ponto rec-pisca" /> {tx.heroi.programa}
              </p>
              <div className="monitor relative">
                <VideoLoop midia={midiaMonitor} alt={noMonitor.titulo} sizes="(min-width: 1024px) 40vw, 100vw" />
                {noMonitor.feitoComIA && <SeloIA lang={lang} className="absolute top-3 left-3" />}
              </div>
              <p className="mt-3 flex items-baseline gap-3 text-sm">
                <span className="rotulo text-cinza">{tx.heroi.noMonitor}</span>
                <Link href={caminho(lang, { pagina: 'trabalhos', trabalho: noMonitor.slug })} className="text-creme hover:text-rec">
                  {noMonitor.titulo} <span aria-hidden="true">↗</span>
                </Link>
              </p>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="servico-trabalhos" className="margem border-t border-linha py-16">
        <h2 id="servico-trabalhos" className="rotulo mb-8 text-cinza">
          {tx.servicos.trabalhosDe(lista.length, s.nome)}
        </h2>
        <ul className="grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((t) => (
            <li key={t.slug}>
              <CardTrabalho trabalho={t} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <nav aria-labelledby="outros-servicos" className="margem border-t border-linha py-16">
        <h2 id="outros-servicos" className="rotulo mb-6 text-cinza">
          {tx.servicos.outros}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {outros.map((o) => (
            <li key={o.slug}>
              <Link href={caminho(lang, { pagina: 'servicos', servico: o.slug })} className="rotulo inline-flex min-h-11 items-center border border-linha px-3 hover:border-creme">
                {servicoEm(o, lang).nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
