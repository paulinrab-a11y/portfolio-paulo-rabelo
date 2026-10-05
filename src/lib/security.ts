/**
 * CABEÇALHOS DE SEGURANÇA
 * -----------------------------------------------------------------------------
 * Aplicados a todas as respostas pelo next.config.ts. O site não carrega nada de
 * terceiros, então a política parte de "só a própria origem".
 * Ao integrar um serviço externo (analytics, mapa, vídeo),
 * libere aqui apenas o host dele e acrescente o caso no teste.
 */

export interface SecurityOptions {
  /** `next dev`: o React usa eval para reconstruir pilhas de erro */
  isDev?: boolean;
  /** Servido por HTTPS (Vercel). Em http://localhost a diretiva de upgrade quebraria os recursos */
  https?: boolean;
  /** Prévia da Vercel: libera a barra de comentários (vercel.live) */
  vercelPreview?: boolean;
  /** Hosts extras para connect-src (ex.: a origem do DSN do Sentry) */
  connect?: string[];
}

type Directives = Record<string, string[]>;

export function buildCspDirectives({ isDev = false, https = false, vercelPreview = false, connect = [] }: SecurityOptions = {}): Directives {
  const d: Directives = {
    'default-src': ["'self'"],
    // 'unsafe-inline': as páginas são estáticas (servidas do cache da CDN) e o Next
    // injeta scripts inline sem nonce. Nonce exigiria renderizar toda página a cada
    // visita.
    'script-src': ["'self'", "'unsafe-inline'", ...(isDev ? ["'unsafe-eval'"] : [])],
    // Estilos inline: variáveis de tema no <html> e animações do GSAP
    'style-src': ["'self'", "'unsafe-inline'"],
    // data: placeholders
    'img-src': ["'self'", 'data:', 'blob:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", 'blob:', 'data:', ...connect, ...(isDev ? ['ws:'] : [])],
    'worker-src': ["'self'", 'blob:'],
    'media-src': ["'self'"],
    'manifest-src': ["'self'"],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  };

  if (vercelPreview) {
    d['script-src'].push('https://vercel.live');
    d['style-src'].push('https://vercel.live');
    d['img-src'].push('https://vercel.live', 'https://vercel.com');
    d['font-src'].push('https://vercel.live', 'https://assets.vercel.com');
    d['connect-src'].push('https://vercel.live', 'wss://ws-us3.pusher.com');
    d['frame-src'] = ['https://vercel.live'];
  }

  if (https) d['upgrade-insecure-requests'] = [];
  return d;
}

export function serializeCsp(directives: Directives): string {
  return Object.entries(directives)
    .map(([name, values]) => [name, ...values].join(' '))
    .join('; ');
}

/** Lista no formato aceito por `headers()` do next.config */
export function buildSecurityHeaders(options: SecurityOptions = {}): Array<{ key: string; value: string }> {
  return [
    { key: 'Content-Security-Policy', value: serializeCsp(buildCspDirectives(options)) },
    // 2 anos, com subdomínios: o navegador nunca mais tenta HTTP
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // Redundante com frame-ancestors, para navegadores antigos
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), browsing-topics=()' },
    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  ];
}
