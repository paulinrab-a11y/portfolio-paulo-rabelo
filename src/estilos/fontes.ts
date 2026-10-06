import localFont from 'next/font/local';

/**
 * Fontes no próprio repositório (subconjunto latino do Google Fonts, licença
 * OFL, ver fontes/LICENCA.md). O build não depende da rede, e o
 * next/font/local calcula a fonte reserva pelas métricas de cada arquivo,
 * para o texto não pular quando a fonte chega. Usadas pelos layouts raiz de cada idioma.
 */
const titulo = localFont({ src: './fontes/big-shoulders-latin.woff2', weight: '800 900', variable: '--fonte-titulo', display: 'swap' });
const mono = localFont({ src: './fontes/jetbrains-mono-latin.woff2', weight: '400 500', variable: '--fonte-mono', display: 'swap' });
const texto = localFont({ src: './fontes/instrument-sans-latin.woff2', weight: '400 600', variable: '--fonte-texto', display: 'swap' });

export const classesFontes = `${titulo.variable} ${mono.variable} ${texto.variable}`;
