import { describe, expect, it } from 'vitest';
import { buildCspDirectives, buildSecurityHeaders, serializeCsp } from './security';

const header = (name: string, options = {}) => buildSecurityHeaders(options).find((h) => h.key === name)?.value;

describe('Content-Security-Policy de produção', () => {
  const csp = buildCspDirectives({ https: true });

  it('parte de "só a própria origem"', () => {
    expect(csp['default-src']).toEqual(["'self'"]);
  });

  it('não libera nenhum host externo, curinga ou esquema aberto', () => {
    for (const [name, values] of Object.entries(csp)) {
      for (const v of values) {
        expect(v, name).not.toMatch(/\*/);
        expect(v, name).not.toMatch(/^https?:/);
        expect(v, name).not.toMatch(/^wss?:/);
      }
    }
  });

  it('scripts: sem eval; só a origem e inline', () => {
    expect(csp['script-src']).toEqual(["'self'", "'unsafe-inline'"]);
    expect(csp['script-src']).not.toContain("'unsafe-eval'");
  });

  it('bloqueia plugins, iframes, <base> forjado, envio de formulário para fora e incorporação em outros sites', () => {
    expect(csp['object-src']).toEqual(["'none'"]);
    expect(csp['frame-src']).toEqual(["'none'"]);
    expect(csp['frame-ancestors']).toEqual(["'none'"]);
    expect(csp['base-uri']).toEqual(["'self'"]);
    expect(csp['form-action']).toEqual(["'self'"]);
  });

  it('vídeos e imagens só da própria origem (e data: nos placeholders)', () => {
    expect(csp['media-src']).toEqual(["'self'"]);
    expect(csp['img-src']).toEqual(expect.arrayContaining(['blob:', 'data:']));
    expect(csp['connect-src']).toContain('blob:');
    expect(csp['worker-src']).toContain('blob:');
  });

  it('força HTTPS nos recursos quando servido por HTTPS', () => {
    expect(csp).toHaveProperty('upgrade-insecure-requests');
    expect(buildCspDirectives({ https: false })).not.toHaveProperty('upgrade-insecure-requests');
  });
});

describe('variações por ambiente', () => {
  it('desenvolvimento libera eval e o websocket do HMR, e só lá', () => {
    const dev = buildCspDirectives({ isDev: true });
    expect(dev['script-src']).toContain("'unsafe-eval'");
    expect(dev['connect-src']).toContain('ws:');
  });

  it('prévia da Vercel libera só os hosts da barra de comentários', () => {
    const preview = buildCspDirectives({ https: true, vercelPreview: true });
    const external = Object.values(preview)
      .flat()
      .filter((v) => /^(https|wss):/.test(v));
    expect(new Set(external)).toEqual(new Set(['https://vercel.live', 'https://vercel.com', 'https://assets.vercel.com', 'wss://ws-us3.pusher.com']));
    expect(preview['frame-ancestors']).toEqual(["'none'"]);
  });

  it('hosts extras de connect-src entram só em connect-src', () => {
    const csp = buildCspDirectives({ connect: ['https://o1.ingest.sentry.io'] });
    expect(csp['connect-src']).toContain('https://o1.ingest.sentry.io');
    expect(csp['script-src'].join(' ')).not.toContain('sentry');
  });
});

describe('serializeCsp', () => {
  it('gera uma diretiva por trecho, separadas por ponto e vírgula', () => {
    expect(serializeCsp({ 'default-src': ["'self'"], 'img-src': ["'self'", 'data:'], 'upgrade-insecure-requests': [] })).toBe(
      "default-src 'self'; img-src 'self' data:; upgrade-insecure-requests",
    );
  });

  it('o valor final não tem quebra de linha (seria rejeitado como cabeçalho HTTP)', () => {
    expect(header('Content-Security-Policy')).not.toMatch(/[\r\n]/);
  });
});

describe('demais cabeçalhos', () => {
  it('HSTS de 2 anos com subdomínios e preload', () => {
    expect(header('Strict-Transport-Security')).toBe('max-age=63072000; includeSubDomains; preload');
  });

  it('impede detecção de tipo, incorporação em iframe e vazamento de referrer', () => {
    expect(header('X-Content-Type-Options')).toBe('nosniff');
    expect(header('X-Frame-Options')).toBe('DENY');
    expect(header('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(header('Cross-Origin-Opener-Policy')).toBe('same-origin');
  });

  it('desliga câmera, microfone, localização e pagamento', () => {
    const value = header('Permissions-Policy') ?? '';
    for (const feature of ['camera', 'microphone', 'geolocation', 'payment']) expect(value).toContain(`${feature}=()`);
  });

  it('não repete cabeçalhos', () => {
    const keys = buildSecurityHeaders().map((h) => h.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
