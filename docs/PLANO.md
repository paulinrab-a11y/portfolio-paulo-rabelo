# Plano do portfólio (checkpoint 1)

Escrito em 05/10/2026. O brief chegou cortado em `/sobre`. O Paulo autorizou seguir ("pode fazer tudo"), então as lacunas foram preenchidas com as decisões abaixo, todas reversíveis.

## Decisões

| Tema | Decisão | Por quê |
|---|---|---|
| Stack | Next 16.3.6 (App Router, estático), React 19.3, Tailwind 4.3, GSAP 3.15 com SplitText, Flip e ScrollTrigger (todos gratuitos) | Mesmas versões do SITE IPHONE e do Passem a Respeitar. Toolchain copiada do SITE IPHONE |
| Fontes | Opção A: Big Shoulders 800/900 (títulos), JetBrains Mono 400/500 (HUD), Instrument Sans 400/500/600 (texto). `next/font`, auto-hospedadas | Opção padrão do brief |
| Cores | `--color-preto`, `--color-carvao`, `--color-linha`, `--color-creme`, `--color-cinza`, `--color-grafite`, `--color-rec`, `--color-rec-escuro` no `@theme` | O Tailwind 4 só gera utilitário com o prefixo `--color-` |
| Manifesto | 3 opções em `src/data/perfil.ts` (`manifestos`). No ar: a 1 | O brief pede 3 opções |
| Abertura | Script inline antes da pintura marca `html[data-abertura]` só na primeira visita da sessão e sem reduced motion. Sem JS, não aparece. Duração 1,6 s | Sem piscar e sem quebrar a hidratação (doc `preventing-flash-before-hydration`) |
| Timecode | Calculado pelo tempo (`src/lib/timecode.ts`), escrito direto no DOM | O do Passem a Respeitar conta quadros e corre 2× a 4× rápido |
| Grão | Tile WebP estático num pseudo-elemento movido com `transform` em `steps(12)`, opacidade 0,06 | Sem canvas em tela cheia, sem blend |
| Luz de cinema | Vem do próprio vídeo e de uma vinheta fixa | Os halos animados da OHC são a "aurora" que o brief proíbe |
| Transição de página | `ViewTransition` do React em `template.tsx`, letterbox fechando e abrindo (`clip-path`). Nome compartilhado `trabalho-<slug>` liga a lista ao player | Linguagem de cinema, só `clip-path`, `opacity` e `transform` |
| Mídia | Prévias de 6 a 8 s mudas (MP4 H.264 + WebM VP9) e trechos de até 60 s com áudio, em `public/media/<slug>/`. Manifesto em `src/data/media.json` | Recortes provisórios até os originais chegarem |
| `/cv` | Página de leitura em cartela creme, pronta para imprimir, com nome completo e Rabelo Design | A seção 2 do brief cita `/sobre` e `/cv` |
| Retrato no `/sobre` | Não há foto na pasta. Fica sem retrato até o Paulo mandar uma | Regra 2: só mídia real, nada gerado |
| Repositório | GitHub privado `paulinrab-a11y/portfolio-paulo-rabelo`. `main` só com a base; o site entra por PR | Mesmo fluxo dos outros repositórios |
| Deploy | Projeto novo na Vercel ligado ao GitHub. PR gera prévia. Produção só com o OK do Paulo | Regra 10 |

## Fases

1. Base: repositório, toolchain, dados, mídia (inventário e recortes por subagente).
2. Home: abertura, herói monitor, manifesto, trabalhos selecionados, timeline, créditos, sobre, fim.
3. Páginas: `/trabalhos` (filtro, Flip, lista e grade), `/trabalhos/[slug]` (player, créditos), `/sobre`, `/cv`, 404.
4. Movimento reduzido, versão sem JS, SEO (metadata, JSON-LD, sitemap).
5. Verificação: lint, tipos, knip, arquitetura, Vitest, Playwright (desktop, Pixel 7, WebKit), Lighthouse móvel com CPU 4× lenta.
6. GitHub e prévia na Vercel.

## Pendências com o Paulo

Ver `docs/PENDENCIAS.md`.
