import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** Prévias da Vercel não são indexadas; só a produção. */
export default function robots(): MetadataRoute.Robots {
  const producao = process.env.VERCEL_ENV === 'production' || !process.env.VERCEL;
  return {
    rules: producao ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
