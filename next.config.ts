import type { NextConfig } from 'next';
import { buildSecurityHeaders } from './src/lib/security';

const securityHeaders = buildSecurityHeaders({
  isDev: process.env.NODE_ENV === 'development',
  https: Boolean(process.env.VERCEL),
  vercelPreview: process.env.VERCEL_ENV === 'preview',
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Mídia não muda de conteúdo sem mudar de nome: cache longo no navegador e na CDN
      { source: '/media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};

export default nextConfig;
