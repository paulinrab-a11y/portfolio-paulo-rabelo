# Referências técnicas

Estudo feito em 05/10/2026 para o portfólio do Paulo Rabelo. Fontes: o código de `portfolio/sites/` (só leitura, sem abrir `.env*`), a documentação do Next que vem em `node_modules/next/dist/docs/` e sites externos. Caminhos de `sites/` são relativos a `portfolio/sites/`.

## 1. Versões e toolchain a herdar

Versões instaladas (lidas em `node_modules/*/package.json`):

| Pacote | SITE IPHONE | passem-a-respeitar | ohc |
|---|---|---|---|
| next | 16.3.6 | 16.3.6 | (Vite 6.4.3) |
| react / react-dom | 19.3.0 | 19.3.0 | 18.3.1 |
| gsap | 3.15.0 | 3.15.0 | 3.15.0 |
| @gsap/react | 2.1.2 | não usa | não usa |
| tailwindcss | 4.3.3 (+ @tailwindcss/postcss 4.3.3) | não usa (CSS puro) | 3.4.19 |
| @biomejs/biome | 2.5.14 | 2.5.14 | 2.5.14 |
| vitest | 5.0.1 | 5.0.x | não usa (node --test) |
| @playwright/test | 1.63.0 | 1.63.0 | 1.63.0 |
| typescript | 5.9.3 | 5.7.3 | 5.6+ |
| knip / dependency-cruiser | 6.38.0 / 18.4.0 | 6.38 / não usa | 6.37.0 / não usa |
| husky / commitlint | 9.1.7 / 21.2.3 | 9.1.7 / 21.2.3 | não usa |
| Node (`.nvmrc`) | 24 | | >=22.12 |

O `site/package.json` já está alinhado com o SITE IPHONE. Falta SplitText e Flip: já vêm dentro do pacote `gsap` 3.15 (conferido em `node_modules/gsap/SplitText.js` e `Flip.js`).

Copiar quase igual do `sites/SITE IPHONE`:
- `.npmrc`: `min-release-age=7`, `ignore-scripts=true`, `save-exact=true`, `audit-level=high`.
- `biome.json`: domínios `next`, `react`, `test`, `playwright` em `recommended`; `css.parser.tailwindDirectives: true`; override que libera `!important` só no `globals.css` (necessário para reduced motion vencer `style` inline).
- `commitlint.config.mjs` e `.husky/commit-msg` + `.husky/pre-commit` (`biome check --staged`).
- `.dependency-cruiser.cjs`: camadas `data → config → lib → components → app`, `sem-ciclos`, `sem-dependencia-fantasma`, `site-sem-dependencia-de-dev`. Trocar a regra `three-so-no-3d` por uma regra de "plugins pesados só em `src/components/motion`" se fizer sentido.
- `knip.json`, `vitest.config.mts` (cobertura v8 só em `src/lib`, limites 95/95/95/85, exclui `gsap.ts` e detecção de dispositivo).
- `playwright.config.ts`: projetos `desktop-chromium`, `mobile-chromium` (Pixel 7) e `iphone-webkit` (iPhone 15) contra `next start`; `reducedMotion` por `test.use`.
- `tests/e2e/fixtures.ts`: fixa `navigator.hardwareConcurrency` e bloqueia mídia pesada por `page.route`. Aqui: bloquear `*.mp4` fora dos testes marcados `@video`.
- `.github/workflows/ci.yml`: jobs `qualidade`, `testes`, `e2e`, `seguranca` (gitleaks + `npm audit --omit=dev` + `npm audit signatures`), `commits`, `build`. Ações fixadas por hash. Cortar a matriz de clientes (aqui é um site só).
- `.github/dependabot.yml` com `cooldown` de 7 dias, `SECURITY.md` (checklist de 20 itens), `.gitleaks.toml`, `vercel.json` com regras de borda contra `/.env`, `/.git`, `*.php`.
- `src/config/security.ts`: CSP estática com `'unsafe-inline'`, sem nonce. A decisão está escrita no `SECURITY.md` dele: nonce obriga renderização dinâmica e mata o cache da CDN.
- `src/lib/gsap.ts`, `FadeImage`, `NavigationProgress`, `template.tsx`, `Reveal` (seção 3).

Atenção à memória do projeto: cotas de Vercel e Actions estouraram em out/2026 e a máquina tem pouca RAM. Manter o CI enxuto: WebKit só no job de e2e, um worker no CI.

## 2. Mudanças do Next 16 que importam

Docs em `sites/SITE IPHONE/node_modules/next/dist/docs/01-app/`.

- Turbopack é o padrão em `next dev` e `next build`. Config de webpack própria quebra o build (`02-guides/upgrading/version-16.md`, "Turbopack by default").
- Node 20.9+, TypeScript 5.1+, navegadores Chrome 111+ e Safari 16.4+ (mesmo arquivo).
- `params` e `searchParams` só assíncronos. O acesso síncrono foi removido. `npx next typegen` gera `PageProps` e `LayoutProps` ("Async Request APIs").
- `opengraph-image`, `twitter-image`, `icon`: `params` virou Promise. `sitemap` recebe `id` como Promise (`03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`, tabela de versões).
- `middleware.ts` virou `proxy.ts`, só runtime Node. O portfólio não precisa de proxy.
- `next/image`: `priority` está depreciado. Use `preload` ou, na maioria dos casos, `loading="eager"` + `fetchPriority="high"` (`03-api-reference/02-components/image.md`, "preload" e "priority"). O `FadeImage` do SITE IPHONE ainda usa `priority`: trocar ao copiar.
- `next/image`: `qualities` padrão virou `[75]` (declarar `[75, 90]` se precisar), `minimumCacheTTL` virou 4 h, `imageSizes` perdeu o 16, imagem local com query string exige `images.localPatterns.search`, `images.domains` depreciado.
- React 19.2 (canary embutido): `ViewTransition`, `useEffectEvent`, `Activity`. View Transitions funcionam no App Router sem flag nenhuma (`02-guides/view-transitions.md`). Não usar `experimental.viewTransition`.
- `<Link transitionTypes={['nav-forward']}>` desde a 16.2 (`03-api-reference/02-components/link.md`). Também em `router.push`.
- PPR experimental saiu. Agora é `cacheComponents: true`. Com ele ligado, `dynamic`, `revalidate` e `fetchCache` deixam de existir no segmento (`03-file-conventions/02-route-segment-config/index.md`). Para um site estático: não ligar; usar `generateStaticParams` + `export const dynamicParams = false` (mesmo padrão do SITE IPHONE).
- `scroll-behavior: smooth` no `<html>` não é mais desligado pelo Next na troca de rota. Para o comportamento antigo: `data-scroll-behavior="smooth"` no `<html>` ("Scroll Behavior Override").
- `next lint` foi removido. Biome cobre.
- `reactCompiler` estável, mas desligado por padrão.
- CSP com nonce força renderização dinâmica e é incompatível com PPR (`02-guides/content-security-policy.md`, "Static vs Dynamic Rendering with CSP").
- `useLinkStatus()` dá o estado pendente de um `<Link>` (`04-functions/use-link-status.md`). Alternativa mais limpa ao clique em captura do `NavigationProgress`.
- Script inline síncrono antes da pintura, com `suppressHydrationWarning` (`02-guides/preventing-flash-before-hydration.md`). É o jeito certo de decidir a abertura "só na primeira visita" sem piscar.
- `template.js` recebe chave nova a cada navegação: estado de Client Component reinicia (`03-file-conventions/template.md`).
- `02-guides/videos.md`: `<video>` próprio com `playsInline muted autoPlay loop`, legendas por `<track>`, Vercel Blob para hospedar. Vale para os loops do herói e das prévias.

## 3. Mecânicas dos sites do Paulo

### passem-a-respeitar (Next 16.3, GSAP 3.15, CSS puro)

O comportamento da home é um script legado (`app/_home/legacy-site.js`, 937 linhas) ligado por `app/_home/HomeRuntime.tsx`. Ele importa `three`, `gsap` e `ScrollTrigger` por `import()` dinâmico, joga tudo no `window` e chama `gsap.registerPlugin(ScrollTrigger)`. Não usa `useGSAP` nem `gsap.matchMedia`. Não copiar essa estrutura; copiar só o efeito.

Timecode (`legacy-site.js`, função `intro`):
```js
(function tcLoop(){ if(!tcOn) return; requestAnimationFrame(tcLoop);
  fr++; const f=fr%30, s=Math.floor(fr/30)%60, m=Math.floor(fr/1800)%60;
  tc.textContent = `00:${pad(m)}:${pad(s)}:${pad(f)}`; })();
```
Conta quadros do `requestAnimationFrame`. Em tela de 60 Hz o relógio anda 2× mais rápido; em 120 Hz, 4×. No portfólio, calcular pelo tempo e escrever direto no `textContent` (nunca `setState` por quadro). Fonte mono com `font-variant-numeric: tabular-nums` (o CSS de `#tc` já faz isso):
```ts
// src/lib/timecode.ts (com teste ao lado)
export function timecode(ms: number, fps = 30): string {
  const t = Math.floor((ms / 1000) * fps);
  const parts = [Math.floor(t / (fps * 3600)), Math.floor(t / (fps * 60)) % 60, Math.floor(t / fps) % 60, t % fps];
  return parts.map((n) => String(n).padStart(2, '0')).join(':');
}
```

Abertura: overlay `#intro` fixo, preto, `z-index:50`, com REC (`#rec i` pisca com `animation: blink 1s steps(1) infinite`), timecode e um canvas `#vhs` de 192×108 com ruído e uma linha clara rolando. Trava a rolagem (`html.locked{overflow:hidden}`), roda o manifesto numa timeline GSAP e tem trava de segurança de 19 s. O botão `pular` faz `tl.progress(1).kill()`. Pontos que não servem para o brief:
- roda em toda visita (não usa `sessionStorage`);
- dura muito mais que 1,8 s e trava a rolagem;
- é um `role="dialog"` sem gestão de foco.
O que serve: o logo do herói já vem no HTML do servidor com `<Image priority>` por baixo do overlay (#47 no código), então o LCP não espera o JS.

Grão (`legacy-site.js`, função `grao`): canvas 160×90 esticado na tela, `ImageData` com `Math.random()` a cada 2 quadros, pausa em `visibilitychange`, CSS `opacity:.28; mix-blend-mode:screen; image-rendering:pixelated`. Scanlines por `repeating-linear-gradient` e vinheta por `radial-gradient`, ambos `position:fixed`. Em reduced motion: `#grain,#scan,#vig{display:none}`. Custo: a CPU é pouca (14 mil pixels), mas o canvas em tela cheia com blend repinta a camada inteira a cada troca. O brief pede no máximo 0,08 a 12 fps: usar um tile de ruído estático (WebP 256 px) num pseudo-elemento e mover com `transform` em `steps()`, sem JS:
```css
.grao::after{content:"";position:fixed;inset:-50%;background:url(/textura/grao.webp);opacity:.08;pointer-events:none;animation:grao 1s steps(12) infinite}
@keyframes grao{0%{transform:translate(0,0)}25%{transform:translate(-8%,4%)}50%{transform:translate(6%,-6%)}75%{transform:translate(-4%,8%)}100%{transform:translate(0,0)}}
@media (prefers-reduced-motion:reduce){.grao::after{animation:none}}
```

View Transitions: só CSS de documento inteiro, porque o site navega com recarga (`app/globals.css`, linhas 25 a 29):
```css
@view-transition{navigation:auto}
::view-transition-old(root){animation:rota-sai .14s cubic-bezier(.4,0,1,1) both}
::view-transition-new(root){animation:rota-entra .22s cubic-bezier(.22,1,.36,1) both}
```
Isso não dispara em navegação por `<Link>`. No portfólio, usar o `ViewTransition` do React (SITE IPHONE).

CSP com nonce em `proxy.ts` obriga `export const dynamic = 'force-dynamic'` na home. Para o portfólio, ficar estático (seção 1).

Testes que leem o CSS e valem copiar: `app/loops.test.ts` (nenhum `@keyframes` anima `width/height/top/left/margin`; todo loop infinito parado em reduced motion) e `app/movimento-reduzido.test.ts` (stagger inline só é desfeito com `!important`). Também `app/contraste.test.ts`.

### ohc (Vite, React 18, Tailwind 3, Lenis, R3F)

Scroll que conduz (`src/components/SteeringExperience/`):
- `useScrollProgress.ts`: `ScrollTrigger.create({ pin, scrub: true, start:'top top', end:'bottom bottom', onUpdate: s => progress.current = s.progress })`. O valor vai para uma ref lida no loop de render, nunca para `setState`.
- `timeline.ts`: keyframes como dados (`{ p, cam, look, rotY, light }`) separados para desktop e celular, com uma função `sample(keys, p)`. Para mudar o filme, edita-se só esse arquivo. Bom modelo para a Timeline V1 a V4.
- WebGL só monta a 600 px da seção (`IntersectionObserver`), cai para imagem sem WebGL ou após 20 s, e reduced motion fixa `progress = 1`.
- `src/App.tsx`: Lenis por import dinâmico (`lerp: 0.09`, `anchors: true`) com `lenis.on('scroll', ScrollTrigger.update)`.

Luz de cinema: `src/components/AmbientLighting.tsx` + `src/styles.css`. São dois halos `radial-gradient` de 70vmax com `filter: blur(40px)` e dois feixes de 34vw com `blur(60px)` e `mix-blend-mode: screen`, animados em loop de 16 a 22 s. Na cena 3D (`SteeringLights.tsx`) é iluminação de estúdio: key neutra, fill, dois recortes coloridos. Isso é exatamente a "aurora" que o brief proíbe, e custa caro no celular. No portfólio, a luz deve vir do vídeo e de uma vinheta fixa.

Abertura OHC (`Loader.tsx`): `sessionStorage` lido no `useState` (em Next isso quebra a hidratação), `DecryptedText` com `characters="0123456789OHC#%"` revelando letra a letra (é a mecânica de "PAULO RABELO montado a partir de dígitos"), botão Pular. Defeito: o botão está dentro de um container `aria-hidden`.

Créditos de terceiros: comentário no topo de cada arquivo portado, por exemplo `DecryptedText.tsx`: "Ported from React Bits ... https://reactbits.dev/... MIT + Commons Clause © David Haz. Adapted: ...". A regra está no `AGENTS.md` da OHC. A licença React Bits é MIT + Commons Clause: pode usar no site, não pode revender o componente.

### SITE IPHONE (Next 16.3, GSAP 3.15, Tailwind 4)

`src/lib/gsap.ts`, registro único:
```ts
'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: 'power3.out', duration: 0.8 });
}
export function enterBlur(px = 6): string {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches ? `blur(${px}px)` : 'blur(0px)';
}
export { gsap, ScrollTrigger, useGSAP };
```
No portfólio: somar `SplitText` e `Flip` e os `gsap.registerEffect` aqui mesmo.

`useGSAP` + `gsap.matchMedia` (`src/components/sections/HeroShowcase.tsx`): `mm.add({ desktop, mobile, reduce }, (ctx) => { ... })` dentro de `useGSAP(..., { scope })`. A limpeza é automática: o contexto reverte tweens, ScrollTriggers e o próprio matchMedia no desmonte. Lições escritas no código: `clearProps: 'transform'` e `clearProps: 'filter'` no fim (transform ou filter residual cria bloco de contenção e quebra `position: fixed`, e deixa camada sobrando no iOS); progresso de scroll escrito direto no `style.transform` de cada alvo, nunca numa variável CSS no pai (recalcula o estilo de todos os filhos).

`Reveal.tsx`: não anima o que já está na tela na hidratação (`getBoundingClientRect().top < innerHeight`), porque o texto já foi lido; usa `scrollTrigger: { once: true }`.

`template.tsx`:
```tsx
import { ViewTransition } from 'react';
export default function Template({ children }: { children: React.ReactNode }) {
  return (<ViewTransition enter="page-enter" exit="page-exit" default="none"><div className="page-transition">{children}</div></ViewTransition>);
}
```
CSS em `globals.css`: `::view-transition-old(.page-exit)` 160 ms, `::view-transition-new(.page-enter)` 260 ms com atraso, `::view-transition{pointer-events:none}`, fallback `@supports not (view-transition-name: none)` e em reduced motion `::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important }`. O nome compartilhado `aparelho-<id>` liga o card à página: usar `trabalho-<slug>` do item da lista para o player.

`FadeImage.tsx`: o HTML do servidor já vem com a imagem visível; só a que ainda baixa fica atrás do skeleton (`data-img-state`). Imagem de LCP nunca espera animação. Desfoque só em tela larga.

`NavigationProgress.tsx`: barra de 2 px que só aparece se a navegação passar de 150 ms, anda até 85% com `scaleX` em 8 s e completa quando o `pathname` muda; some sozinha em 10 s. Escuta clique na fase de captura porque o `<Link>` cancela o evento.

`src/lib/device.ts`: nível do dispositivo por WebGL, `saveData`, `deviceMemory <= 2` e `hardwareConcurrency <= 2`. Serve para decidir prévias em vídeo ou poster parado.

Testes e2e para copiar: `tests/e2e/movimento-reduzido.spec.ts` ("nenhum conteúdo fica escondido esperando uma animação": rola a página e reprova texto com opacidade abaixo de 0,99; e canvas igual em dois instantes).

## 4. Referências externas

Pesquisa de 05/10/2026: artigos do Codrops lidos por inteiro; os sites, pelo HTML e pelos bundles. Não foram abertos num navegador.

| Referência | Mecânica | Como fazer aqui | Onde entra |
|---|---|---|---|
| Arnaud Rocca (Codrops, mar/2026) | Efeitos GSAP registrados num lugar (`registerEffect`, `extendTimeline`, opção `autoClear` com `clearProps`). SplitText revertido no `onComplete`. `gsap.matchMedia` com reduce. `mouseenter`/`focus` na mesma função. CSS em `<noscript>` mostra tudo sem JS | `src/lib/motion.ts` com a lista explícita de efeitos, registrada uma vez num componente client | Todo o site |
| theycallmegiulio.com (Codrops, abr/2026) | Aberração cromática só perto do centro da transição (shader). Grão dentro da cena, sem overlay separando "dois mundos" | Sem WebGL: separar R e B com `filter`/`translate` em duas cópias só durante o wipe; grão por cima de tudo, fraco | Transição de página |
| goodgrowth.com (Codrops, ago/2026) | Boot curto. Wipe de 5 barras com stagger a partir do centro (`delay + abs(i - (n-1)/2) * 0.07`). Engole a roda do mouse enquanto a página monta, com teto | Barras com `scaleY`/`clip-path`, nunca `width` (o original anima `width`, contra a nossa regra) | Abertura e troca para `/trabalhos/[slug]` |
| igloo.inc | Uma ideia conduz tudo. Interface inteira em WebGL; sem JS, página vazia | Contraexemplo de acessibilidade: o nosso conteúdo vem no HTML | Conceito "ilha de edição" |
| landonorris.com | GSAP (ScrollTrigger, Flip, SplitText), Lenis, `setPixelRatio(1)`, pausa por `visibilitychange` e IntersectionObserver | Pausar vídeos e grão fora da tela e com a aba escondida | Herói, timeline |
| matvoyce.tv | Layout por tipo de trabalho. Player próprio. Créditos como dados: `[{ label, info: [{ name, link }] }]` | `creditos` em `src/data/trabalhos.ts` com rótulo e valor; só os informados | `/trabalhos/[slug]` |
| ligthelm.work | Índice em lista com filtro por categoria e still + prévia por item, carregada ao entrar na tela. Contraexemplos: filtro em `<h2>` (sem teclado), `alt=""` nos stills, GIF pesado | Filtro com `<button aria-pressed>`, prévia em MP4/WebM curto | `/trabalhos` |
| finalcut-edit.com | Card com `<video autoplay muted loop playsinline poster>` e crédito "Editor / Director" no card | Lista de destaques com função e cliente; 1 vídeo tocando por vez no celular | Trabalhos selecionados |

Outros pontos conferidos:
- GSAP é 100% gratuito, plugins incluídos. O README do `gsap` 3.15 diz isso, e `SplitText.js`, `Flip.js`, `ScrambleTextPlugin.js`, `DrawSVGPlugin.js`, `MorphSVGPlugin.js`, `CustomEase.js` e `Observer.js` vêm no pacote público do npm. Importar com `import { SplitText } from 'gsap/SplitText'` e `import { Flip } from 'gsap/Flip'`, sem registro privado. Licença: "Standard no charge".
- SplitText 3.15 tem `mask`, `aria: 'auto' | 'hidden' | 'none'`, `autoSplit`, `onSplit` e `revert()` (`node_modules/gsap/types/split-text.d.ts`).
- `gsap.registerEffect` existe na 3.15 (`types/gsap-core.d.ts`). Lugar dos efeitos: `src/lib/gsap.ts`.
- `useGSAP` 2.1.2 aceita `{ scope, dependencies, revertOnUpdate }` e devolve `contextSafe` para handlers de evento.
- SplitText com `autoSplit: true` e `onSplit` que retorna a animação refaz a divisão quando as fontes carregam. Senão, esperar `document.fonts.ready`.

## 5. Armadilhas de performance mobile e acessibilidade

Performance (achadas no código):
- Laço de `requestAnimationFrame` contando quadros anda mais rápido em telas de 120 Hz (timecode e grão do PaR). Sempre medir pelo tempo e limitar a taxa (12 fps no grão, 30 no timecode).
- Canvas ou camada em tela cheia com `mix-blend-mode` repinta tudo a cada quadro. Grão com tile estático e `transform`.
- `filter: blur()` em muitos elementos ao mesmo tempo travou o WebKit do CI no SITE IPHONE. Desfoque de entrada só a partir de 768 px (`enterBlur`).
- Halos de 70vmax com `blur(60px)` animados em loop (OHC) pesam na GPU do celular e são proibidos pelo brief.
- `transform` ou `filter` que sobram depois da animação criam bloco de contenção e quebram `position: fixed`. Usar `clearProps`.
- Variável CSS atualizada por quadro num elemento pai recalcula o estilo de todos os filhos. Escrever o `transform` no próprio alvo.
- `setState` por quadro em React. Usar ref e escrita direta no DOM.
- No celular a altura muda quando a barra do navegador some. Recalcular só quando a largura mudar; preferir `svh`/`lvh`.
- `ScrollTrigger.refresh()` depois de soltar a trava da abertura, depois das fontes e em `orientationchange` (PaR e OHC fazem).
- WebKit informa número fixo de núcleos: não confiar só em `hardwareConcurrency`.
- Laço sem pausa em aba escondida. Todo laço escuta `visibilitychange`.
- Vídeo: só o herói com `autoPlay`; prévias com `preload="none"`, uma tocando por vez (`IntersectionObserver`), poster AVIF sempre, e poster parado com `saveData` ou aparelho fraco.
- Nonce na CSP obriga renderização dinâmica (PaR). Portfólio estático com CSP sem nonce.
- Teste com CPU 4× mais lenta e rede lenta (pedido do brief): Playwright com `page.context().newCDPSession` e `Emulation.setCPUThrottlingRate`.

Acessibilidade:
- Botão focável dentro de container `aria-hidden` (Loader da OHC). O "Pular" fica fora da parte escondida.
- Abertura com `role="dialog"` sem prender nem devolver foco (PaR). A abertura é decorativa: `aria-hidden` no visual, "Pular" como botão real, e qualquer tecla, clique ou rolagem encerra.
- Sem JS, nada pode ficar escondido. A abertura precisa de um fim por CSS puro (animação com `forwards` que some em 1,8 s) e só aparece se o script inline marcou o `<html>`.
- Stagger inline em `style` só é desfeito em reduced motion com `!important` (teste do PaR).
- Toda prévia de hover também abre no foco do teclado; prévia que segue o cursor só com `(hover: hover) and (pointer: fine)`.
- Créditos rolando: cópia duplicada da lista com `aria-hidden`, pausa no hover e no `:focus-within`, parada em reduced motion.
- SplitText com `aria: 'auto'` e `revert()` no fim, para o leitor de tela ler a palavra inteira.
- Contraste testado em código (`app/contraste.test.ts` do PaR). Os pares do brief (6,8:1; 5,9:1; 4,7:1; 4,6:1) entram nesse teste.
- Teste e2e "nenhum conteúdo escondido esperando animação" com `reducedMotion: 'reduce'` (SITE IPHONE).
