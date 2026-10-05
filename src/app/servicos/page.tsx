import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { breadcrumbLd } from '@/lib/seo';
import { servicosComTrabalho, trabalhosDoServico } from '@/lib/servicos';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Serviços',
  description: 'Edição de vídeo, motion design e VFX, color grading, vídeo com IA, criação de sites, social media, fotografia e edição de podcast em São Paulo.',
  alternates: { canonical: '/servicos' },
};

export default function PaginaServicos() {
  const lista = servicosComTrabalho(servicos, trabalhos);
  return (
    <section aria-labelledby="servicos-titulo" className="margem pt-[calc(var(--cabecalho)+clamp(48px,10vh,120px))] pb-24">
      <JsonLd
        dados={breadcrumbLd(SITE_URL, [
          { nome: 'Início', caminho: '/' },
          { nome: 'Serviços', caminho: '/servicos' },
        ])}
      />
      <p className="rotulo mb-3 text-rec">O que eu faço</p>
      <h1 id="servicos-titulo" className="titulo-display mb-12 text-[clamp(64px,13vw,200px)]">
        Serviços
      </h1>
      <ol className="border-t border-linha">
        {lista.map((s, i) => (
          <li key={s.slug} className="border-b border-linha">
            <Link href={`/servicos/${s.slug}`} className="group grid grid-cols-12 items-baseline gap-4 py-6">
              <span className="rotulo col-span-2 text-cinza lg:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="titulo-display col-span-10 text-[clamp(32px,4.4vw,64px)] group-hover:text-rec lg:col-span-6">{s.titulo}</span>
              <span className="col-span-10 col-start-3 text-cinza lg:col-span-4 lg:col-start-auto">{s.texto[0]}</span>
              <span className="rotulo col-span-10 col-start-3 text-cinza lg:col-span-1 lg:col-start-auto lg:text-right">{trabalhosDoServico(s, trabalhos).length}</span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
