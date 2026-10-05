import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { Indice } from '@/components/trabalhos/Indice';
import { trabalhos } from '@/data/trabalhos';
import { breadcrumbLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Trabalhos',
  description: 'Edição, motion e VFX, cor, vídeo com IA, sites, social media, fotografia e podcast. Todos os trabalhos de Paulo Rabelo.',
  alternates: { canonical: '/trabalhos' },
};

export default function PaginaTrabalhos() {
  return (
    <section aria-labelledby="trabalhos-titulo" className="margem pt-[calc(var(--cabecalho)+clamp(48px,10vh,120px))] pb-24">
      <JsonLd
        dados={breadcrumbLd(SITE_URL, [
          { nome: 'Início', caminho: '/' },
          { nome: 'Trabalhos', caminho: '/trabalhos' },
        ])}
      />
      <p className="rotulo mb-3 text-rec">Índice</p>
      <h1 id="trabalhos-titulo" className="titulo-display mb-12 text-[clamp(64px,13vw,200px)]">
        Trabalhos
      </h1>
      <Indice lista={trabalhos} />
    </section>
  );
}
