import type { MetadataRoute } from 'next';
import { trabalhos } from '@/data/trabalhos';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const fixas = ['', '/trabalhos', '/sobre', '/cv'].map((p) => ({ url: `${SITE_URL}${p}` }));
  return [...fixas, ...trabalhos.map((t) => ({ url: `${SITE_URL}/trabalhos/${t.slug}` }))];
}
