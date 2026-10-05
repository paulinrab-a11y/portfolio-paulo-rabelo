import type { MetadataRoute } from 'next';
import { servicos } from '@/data/servicos';
import { trabalhos } from '@/data/trabalhos';
import { servicosComTrabalho } from '@/lib/servicos';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const fixas = ['', '/trabalhos', '/servicos', '/sobre', '/cv'].map((p) => ({ url: `${SITE_URL}${p}` }));
  const paginasServico = servicosComTrabalho(servicos, trabalhos).map((s) => ({ url: `${SITE_URL}/servicos/${s.slug}` }));
  return [...fixas, ...paginasServico, ...trabalhos.map((t) => ({ url: `${SITE_URL}/trabalhos/${t.slug}` }))];
}
