# Relatório do portfólio

Atualizado em 05/10/2026. Tudo está no PR #2 (`feat/1-primeira-versao`). Produção (`main`) só muda com o OK do Paulo.

## O que existe

| Página | O que tem |
|---|---|
| `/` | Abertura (REC, timecode, nome a partir de dígitos, letterbox; só na 1ª visita), herói monitor, manifesto, 6 destaques com prévia, timeline V1 a V4, clientes e artistas, sobre com retrato, "Trabalhe comigo" |
| `/trabalhos` | 19 trabalhos, filtro por categoria, lista ou grade (GSAP Flip) |
| `/trabalhos/<slug>` | Player próprio, créditos, contexto, o que eu fiz, resultado, galeria, serviços relacionados, próximo trabalho |
| `/servicos` e `/servicos/<slug>` | 8 páginas de serviço para busca (editor de vídeo em São Paulo, motion e VFX, color grading, vídeo com IA, sites, social media e direção de arte, fotografia, podcast) |
| `/sobre` | Retrato, bio, experiência que rola, formação, ferramentas |
| `/cv` | Currículo que cabe numa página A4 impressa |

## Números (medidos em 05/10/2026)

Lighthouse móvel com throttling real (CPU 4× e 4G lento aplicados de fato, `--throttling-method=devtools`), num notebook comum:

| Rota | Desempenho | Acessib. | Boas práticas | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 82 a 87 | 100 | 100 | 100 | 1,9 s | 0,007 |
| `/trabalhos` | 97 | 100 | 100 | 100 | 1,7 s | 0 |
| página de trabalho (podcast) | 96 | 100 | 100 | 100 | 2,2 s | 0 |
| página de trabalho (Hora Bolas) | 96 | 100 | 100 | 100 | 2,4 s | 0 |
| `/servicos/editor-de-video` | 98 | 100 | 100 | 100 | 1,7 s | 0 |
| `/sobre` | 97 | 100 | 100 | 100 | 2,2 s | 0 |
| `/cv` | 98 | 100 | 100 | 100 | 1,8 s | 0 |

O modo simulado padrão do Lighthouse mostra LCP de ~3,8 s na home. É artefato do modelo: o LCP observado é igual à primeira pintura (444 ms).

## Testes

- `npm run check`: Biome, TypeScript, Knip, dependency-cruiser e 92 testes Vitest (100% das linhas de `src/lib`).
- `npm run test:e2e`: 76 testes Playwright em Chrome desktop e Pixel 7 (no CI, também iPhone/WebKit): fluxos, abertura, movimento reduzido, sem JavaScript, sem rolagem lateral, player, filtro, serviços, cabeçalhos de segurança, e axe (WCAG 2.2 A/AA) em 9 páginas.
- `tests/integration/conteudo.test.ts` reprova: mídia faltando, IA sem selo, "airbag", "chope", travessão, frase de anúncio, fonte proibida, endereço com rua, serviço sem trabalho.

## Regras do brief e como foram atendidas

- Nada inventado: todo texto vem do brief, do que aparece na mídia ou das respostas do Paulo (`docs/PENDENCIAS.md`).
- Só mídia real; o selo "Feito com IA" aparece no UGC, no anúncio da OHC e na história ilustrada.
- Passem a Respeitar: gravação cortada antes da seção do clipe inédito; sem datas nem faixas.
- OHC: sem "airbag" (o teste de conteúdo garante).
- Endereço: só "São Paulo, SP".
- Fontes Big Shoulders, JetBrains Mono e Instrument Sans; um acento vermelho; sem gradiente roxo, glass ou cursor próprio.
- Movimento: só transform, opacity, filter e clip-path; caminho de movimento reduzido testado.

## Evidências

- Prints: `reports/prints/` (fora do Git; gere de novo com `node scripts/prints.mjs` contra `npm run start -- -p 3400`).
- Lighthouse: `reports/lighthouse/` (JSON e HTML).
- Imagem de compartilhamento: `public/og/home.jpg` (`npm run og`).

## Ainda em aberto

Ver `docs/PENDENCIAS.md`: cliente da VSL, arte inteira do volante Audi, legendas, ano e ferramentas por trabalho, outros resultados, domínio próprio.
