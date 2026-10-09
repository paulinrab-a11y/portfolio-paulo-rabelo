import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CardTrabalho } from '@/components/CardTrabalho';
import { JsonLd } from '@/components/JsonLd';
import type { Idioma } from '@/data/idiomas';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { perfilNo, servicoEm, t as textosDe, trabalhoEm } from '@/lib/i18n';
import { metadadosPagina } from '@/lib/metadados';
import { midia } from '@/lib/midia';
import { caminho } from '@/lib/rotas';
import { breadcrumbLd, servicoLd } from '@/lib/seo';
import { buscarServico, servicosComTrabalho, trabalhosDoServico } from '@/lib/servicos';
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
          const n = trabalhosDoServico(pt, trabalhos).length;
          return (
            <li key={pt.slug} className="border-b border-linha">
              <Link href={caminho(lang, { pagina: 'servicos', servico: pt.slug })} className="group grid grid-cols-12 items-baseline gap-4 py-6">
                <span className="rotulo col-span-2 text-cinza lg:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="titulo-display col-span-10 text-[clamp(32px,4.4vw,64px)] group-hover:text-rec lg:col-span-6">{s.titulo}</span>
                <span className="col-span-10 col-start-3 text-cinza lg:col-span-4 lg:col-start-auto">{s.texto[0]}</span>
                <span className="rotulo col-span-10 col-start-3 text-cinza lg:col-span-1 lg:col-start-auto lg:text-right">{tx.servicos.contagem(n)}</span>
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
        <div className="col-span-12 space-y-4 text-xl leading-relaxed lg:col-span-7">
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
        <div className="col-span-12 flex flex-wrap items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
          <a href={contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className="botao botao-rec">
            {tx.servicos.whatsapp}
          </a>
          <a href={contato.email.href} className="botao text-creme">
            {tx.servicos.email}
          </a>
        </div>
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
