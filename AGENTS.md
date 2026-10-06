# Portfólio Paulo Rabelo

Next.js 16 (App Router) + Tailwind 4 + GSAP. Antes de usar uma API do Next, leia o guia em `node_modules/next/dist/docs/`: esta versão muda APIs e convenções.

O brief está em `docs/BRIEF-ORIGINAL.md` e o plano com as decisões em `docs/PLANO.md`.

## Fluxo

- Toda tarefa passa por Issue, branch `<tipo>/<número>-<resumo>` a partir de `main` e Pull Request com `Closes #<número>`.
- Commits em Conventional Commits, em português. Nunca commit direto em `main`.
- Deploy só pela Vercel a partir do GitHub. PR gera prévia. Produção (merge em `main`) só com o OK do Paulo.
- Rode `npm run check` antes do PR.

## Conteúdo

- Não invente cliente, número, prêmio, depoimento, ano, função, ferramenta ou resultado. Sem dado confirmado, o campo fica vazio e não aparece.
- Fatos e textos ficam em `src/data/`: `perfil.ts`, `trabalhos.ts`, `servicos.ts` (páginas de serviço para busca) e `media.json`. Trabalho feito com IA leva `feitoComIA: true` (mostra o selo "Feito com IA").
- Pendências e respostas do Paulo ficam em `docs/PENDENCIAS.md`. Leia antes de mexer em conteúdo.

## Visitas

- O painel de visitas é o Vercel Web Analytics do projeto (aba Analytics na Vercel). O script entra em `Documento.tsx` só nos deploys da Vercel (`analyticsAtivo()` em `src/lib/site.ts`). Só a produção conta.
- Sem cookie e sem dado que identifique o visitante. Qualquer coleta nova passa pelo SECURITY.md antes.

## Idiomas e abas

- O site existe em português (raiz), inglês (`/en`), espanhol (`/es`) e chinês simplificado (`/zh`), com caminhos no idioma (`/en/work`, `/es/trabajos`). O chinês usa os caminhos em inglês (`/zh/work`): ideograma na URL vira `%E4%BD%9C…` quando copiado. O mapa está em `src/data/idiomas.ts` e as funções em `src/lib/rotas.ts`.
- Português é a fonte de verdade. Todo texto novo entra em todos os idiomas no mesmo PR: interface em `src/data/textos.ts`, conteúdo em `src/data/traducoes.ts`. Tradução fiel, sem acrescentar nada. O teste de conteúdo reprova trabalho, serviço, experiência ou legenda sem tradução.
- Cada idioma tem o próprio layout raiz em `src/app/(pt)`, `src/app/en`, `src/app/es` e `src/app/zh`. As rotas são finas: o conteúdo fica em `src/components/paginas`.
- As fontes do site só têm o alfabeto latino. Em chinês, os ideogramas usam fontes do sistema (`:lang(zh)` em `globals.css`); não acrescente fonte web chinesa (são vários megabytes).
- Componente de navegador (`use client`) recebe o conteúdo já traduzido por props e só importa `src/data/textos.ts`, nunca `traducoes.ts` (o conteúdo inteiro iria para o JS de todas as páginas).
- Todo trabalho tem pelo menos uma aba (`abas` em `trabalhos.ts`): `video`, `sites` ou `marketing`. Os links são `/trabalhos/<aba>` e equivalentes.
- Depois de mudar perfil, experiência ou contato, gere de novo os PDFs (`npm run cv:pdf`) e, se mudar o nome ou a função, as imagens de compartilhamento (`npm run og`).
- Só mídia real dos trabalhos. Logos só os arquivos de `public/media/logos/`. Marca sem arquivo aparece como texto.
- Não mexa na aparência das peças: recortar, reduzir e converter pode; recolorir ou filtrar, não.
- Passem a Respeitar: sem data de lançamento, sem nome de faixa, sem material inédito.
- OHC Motors: nunca escreva "airbag".
- Hora Bolas fica em Lavras (MG). Escreva "Chopp".
- Endereço: só "São Paulo, SP".
- Texto em português do Brasil, primeira pessoa, frases curtas. Sem travessão. Sem frase de anúncio.
- A pasta acima de `site/` é material bruto, só leitura. Nunca abra nem copie arquivos `.env*`.

## Visual

- Uma cor de acento só (`--color-rec`). Fontes: Big Shoulders, JetBrains Mono e Instrument Sans. Proibidas: Inter, Roboto, Arial, Poppins, Space Grotesk, Montserrat.
- Sem gradiente roxo, glassmorphism, aurora, spotlight, emoji como ícone, cursor customizado no site inteiro.

## Movimento

- Anime só `transform`, `opacity`, `filter` e `clip-path`.
- Efeitos GSAP ficam registrados em `src/lib/motion.ts`. Todo movimento novo tem caminho em `prefers-reduced-motion` no mesmo PR, com teste em `tests/e2e/movimento-reduzido.spec.ts`.
- Ação de teclado não anima. Imagem ou poster de LCP nunca espera animação.
- Vídeo de prévia é mudo, `playsInline`, e só toca visível na tela.

## Arquitetura e testes

- Camadas: `src/data` → `src/lib` → `src/components` → `src/app`. Estilos e fontes ficam em `src/estilos`. Cada uma só importa as anteriores (`npm run arch`).
- Função nova em `src/lib` entra com teste ao lado (`arquivo.test.ts`).
- `tests/integration/conteudo.test.ts` confere mídia existente, slugs, selo de IA e palavras proibidas. Rode depois de editar `src/data/`.
- Mudança visível (rota, fluxo, link) entra com teste em `tests/e2e/`.
- Não desligue regra de lint. Se não se aplica, `biome-ignore` com o motivo.
- Máquina de desenvolvimento com pouca RAM: rode build e navegadores um de cada vez.

## Scripts

- `npm run cv:pdf`: gera o PDF do CV em todos os idiomas (`public/paulo-rabelo-cv*.pdf`) a partir das páginas de CV. Rode depois de mudar experiência, formação ou contato.
- `npm run og`: gera `public/og/home*.jpg` (imagem de compartilhamento em todos os idiomas) com o servidor em `localhost:3400`.
- `node scripts/prints.mjs`: prints de conferência em `reports/prints/`.
- `node scripts/gravar-sites.mjs`: grava os sites no ar (precisa de `FFMPEG`). A gravação do Passem a Respeitar tem de parar antes da seção do clipe inédito.
- `node scripts/grao.mjs`: tile do grão.
- `node scripts/fps.mjs`: quadros por segundo na home com CPU 4× mais lenta.
