import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CardTrabalho } from '@/components/CardTrabalho';
import { JsonLd } from '@/components/JsonLd';
import { contato } from '@/data/perfil';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { midia } from '@/lib/midia';
import { breadcrumbLd, servicoLd } from '@/lib/seo';
import { buscarServico, servicosComTrabalho, trabalhosDoServico } from '@/lib/servicos';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return servicosComTrabalho(servicos, trabalhos).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/servicos/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const s = buscarServico(servicos, slug);
  if (!s) return {};
  const primeiro = trabalhosDoServico(s, trabalhos)[0];
  const imagem = primeiro ? midia(primeiro.midia).poster.jpg : '/media/retrato/og.jpg';
  return {
    title: s.tituloSeo,
    description: s.descricao,
    alternates: { canonical: `/servicos/${s.slug}` },
    openGraph: { title: `${s.tituloSeo} · Paulo Rabelo`, description: s.descricao, images: [{ url: imagem }] },
  };
}

export default async function PaginaServico({ params }: PageProps<'/servicos/[slug]'>) {
  const { slug } = await params;
  const s = buscarServico(servicos, slug);
  if (!s) notFound();
  const lista = trabalhosDoServico(s, trabalhos);
  const outros = servicosComTrabalho(servicos, trabalhos).filter((o) => o.slug !== s.slug);
  const caminho = `/servicos/${s.slug}`;

  return (
    <>
      <JsonLd
        dados={[
          servicoLd(SITE_URL, { nome: s.nome, descricao: s.descricao, caminho }),
          breadcrumbLd(SITE_URL, [
            { nome: 'Início', caminho: '/' },
            { nome: 'Serviços', caminho: '/servicos' },
            { nome: s.nome, caminho },
          ]),
        ]}
      />
      <section aria-labelledby="servico-titulo" className="margem grade gap-y-8 pt-[calc(var(--cabecalho)+clamp(48px,10vh,120px))] pb-16">
        <nav aria-label="Você está em" className="rotulo col-span-12 text-cinza">
          <Link href="/servicos" className="hover:text-creme">
            Serviços
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
        </div>
        <div className="col-span-12 flex flex-wrap items-start gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
          <a href={contato.whatsapp.href} target="_blank" rel="noopener noreferrer" className="botao botao-rec">
            Falar no WhatsApp
          </a>
          <a href={contato.email.href} className="botao text-creme">
            E-mail
          </a>
        </div>
      </section>

      <section aria-labelledby="servico-trabalhos" className="margem border-t border-linha py-16">
        <h2 id="servico-trabalhos" className="rotulo mb-8 text-cinza">
          {lista.length} {lista.length === 1 ? 'trabalho' : 'trabalhos'} de {s.nome.toLowerCase()}
        </h2>
        <ul className="grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((t) => (
            <li key={t.slug}>
              <CardTrabalho trabalho={t} />
            </li>
          ))}
        </ul>
      </section>

      <nav aria-labelledby="outros-servicos" className="margem border-t border-linha py-16">
        <h2 id="outros-servicos" className="rotulo mb-6 text-cinza">
          Outros serviços
        </h2>
        <ul className="flex flex-wrap gap-2">
          {outros.map((o) => (
            <li key={o.slug}>
              <Link href={`/servicos/${o.slug}`} className="rotulo inline-flex min-h-11 items-center border border-linha px-3 hover:border-creme">
                {o.nome}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
