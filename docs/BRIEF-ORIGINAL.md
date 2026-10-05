# Site portfólio Paulo Rabelo · brief para o agente

> Recebido em 05/10/2026. O texto chegou cortado no meio da seção `/sobre` ("retrato, bio curta e experiência rolando"). O que veio depois disso (resto do mapa, checkpoints, stack, metas) não foi recebido. As decisões tomadas para preencher essa lacuna estão em `docs/PLANO.md`.

Você é um vibe coder profissional: dev criativo sênior, diretor de arte e motion designer no nível dos sites premiados do Awwwards. Trabalha com IA com disciplina: planeja, executa por fases, verifica e mostra evidência. Sua missão é construir o meu site de portfólio pessoal. Ele deve ser animado, na pegada dos sites que eu já faço, mas com o acabamento e a clareza de um portfólio profissional.

## 0. Como trabalhar
- Raiz: esta pasta `portfolio/`. Crie o projeto em `portfolio/site/`. O resto da pasta é material bruto e referência: só leitura.
- Comece em modo de planejamento. Nenhum código antes do checkpoint 1.
- Use subagentes para o inventário de mídia e para estudar as referências, sem lotar o contexto principal.
- Salve este brief em `site/docs/BRIEF-ORIGINAL.md`. Crie `site/AGENTS.md` curto, só com as regras que valem sempre, e `site/CLAUDE.md` contendo apenas `@AGENTS.md` (mesmo padrão dos meus outros repositórios).
- Não diga que terminou sem evidência: prints do Playwright, saída de testes e build, relatório do Lighthouse.
- Se algo aqui contradizer o que você encontrar na pasta, a pasta vence e você me avisa.
- No fim de cada fase, mande um resumo de até 8 linhas com prints e links.

## 1. Objetivo
1. Em 5 segundos, um recrutador ou cliente entende quem eu sou, vê trabalho em movimento e acha como me chamar.
2. Quem é do audiovisual sente que o site foi montado como um filme.
Público: recrutadores (editor de vídeo, motion, direção de arte, social media), marcas, artistas e criadores. Mobile primeiro: a maioria chega pelo Instagram, WhatsApp e LinkedIn no celular.

## 2. Quem sou (fatos confirmados, não acrescente nada)
- Nome no site: Paulo Rabelo. Nome completo só no JSON-LD e no CV: Paulo Vitor Pereira Rabelo. São Paulo, SP. Disponível para trabalho remoto e projetos.
- Faço: edição de vídeo, motion design e VFX, color grading, direção de arte, vídeo com IA generativa, sites, social media e fotografia.
- Fundador da WhyNot Visuals (audiovisual e marketing para negócios) e diretor de arte da WhyNot Records (selo e produtora de clipes de trap).
- Experiência (para /sobre e /cv):
  - OHC Motors: Diretor de Arte e Marketing, jul/2026 até hoje
  - Uwuant (DDPAI Brasil): Influencer Digital Sênior, abr/2025 até hoje. Roteiro, gravação, apresentação e edição; cerca de 130 horas de live por mês
  - WhyNot Records: Diretor de Arte, jul/2024 até hoje
  - Hiroshima: Assistente de Marketplace, set/2024 a mar/2025
  - Resumo Produtora: Diretor de Design, jun a nov/2023
  - E-Construmarket: Analista de E-commerce, mar/2022 a jul/2023. Mais de 30 mil produtos homologados
  - Rabelo Design: Secretário Administrativo, 2015 a 2020 (só no CV)
- 4 anos editando conteúdo long-form para YouTube e talking head, com direção criativa junto de roteiristas.
- Formação: Tecnólogo em Marketing, Universidade São Judas Tadeu (2023). Alura: Color Grading, Ritmo de Edição, Eficiência e Praticidade, After Effects, Motion Design, Carreira Growth Marketing.
- Ferramentas: Premiere Pro, After Effects, DaVinci Resolve, Photoshop, Canva e IA generativa (Higgsfield).
- Contato: WhatsApp +55 11 97523-1957 (link `https://wa.me/5511975231957` com a mensagem "Oi, Paulo! Vi seu portfólio e quero falar sobre um projeto."), e-mail paulinrab@gmail.com, LinkedIn linkedin.com/in/paulinrab, Instagram da agência @whynotvisuals.
- Endereço: nunca publique rua. Só "São Paulo, SP".

## 3. Material na pasta
| Caminho | O que é | Técnico | Uso |
|---|---|---|---|
| `PORTFÓLIO PAULO RABELO.mp4` | Gravação de 64 min do meu portfólio antigo (apresentação do Canva: fundo creme #FFFEF2, títulos serifados vermelhos). Os trabalhos tocam dentro de molduras com cantos arredondados | 1920×1080, 30 fps, H.264, 888 MB | Fonte de prévias recortadas (mapa abaixo). Nunca vai inteiro para o site nem para o repositório |
| `videos ai/video 1.mp4` e `video 2.mp4` | Vídeos UGC criados com IA generativa (personagens apresentando ingredientes naturais) | 720×1280, 30 fps, 48 s e 38 s | Case de IA, sempre com o selo "Feito com IA" |
| `whynot/reel-whynot-v1-com-efeitos.mp4` | Reel "Site sob medida" da WhyNot Visuals (sites da OHC, do Passem a Respeitar e da MH Phones em celulares; abre com "Nada nesse vídeo é real.") | 1080×1920, 24 fps, 37 s | Case próprio e trechos para os cases de sites |
| `whynot/LOGOS.png` | Logo da WhyNot (W com globo), preto sobre transparente | PNG 1920×1080 | No escuro use `filter: invert(1)`. Nunca redesenhe |
| `ohc/1.jpg` | Capa do carrossel "A OHC Motors vai pra pista" | 1080×1350 | Case OHC |
| `hora bolas/*.png` | 3 artes: futebol com open Chopp, karaokê, sinuca | 941×1672 | Case Hora Bolas |
| `hora bolas/DSC026*.jpg` e `C744*T01.jpg` | Fotos de produto: porção de salgados (6000×4000) e 3 drinks (720×1280) | | Case Hora Bolas |
| `mh phones/` | Logo dourado da MH Phones e versão com fundo | PNG 1254², JPEG 1024² | Case MH Phones |
| `sites/ohc` e `sites/passem-a-respeitar` | Código dos meus sites (Vite + React 18 + Tailwind; Next.js 16.3 + GSAP 3.15) | | Só leitura, para herdar padrões |

Sites no ar para gravar: https://ohc-seven.vercel.app e https://passem-a-respeitar.vercel.app

Mapa do vídeo mestre. Os tempos são aproximados: confirme com detecção de cena. Recortes em pixels (x,y,largura,altura no quadro 1920×1080), com a moldura incluída. Recue 16 px de cada lado para tirar os cantos e o fundo creme.
| Trecho | Slide | Conteúdo | Recorte |
|---|---|---|---|
| 00:00 a 01:05 | Produção de vídeos com IA | 3 verticais: UGC com IA (o original está em `videos ai/`, use ele), anúncio OHC "A partir de R$ 1.500", história ilustrada | 564,88,366,648 · 960,88,412,648 · 1400,88,414,648 |
| 01:05 a 01:42 | Criação e implementação de sites | Site da OHC no celular e no desktop | 106,254,406,718 · 560,260,1252,712 (prefira gravar o site ao vivo) |
| 01:42 a ~02:04 | Fotografias / Coloração | Porsche 911 em evento; pistola em feira, com cor | 0,0,952,1080 · 1234,204,410,660 (provisório) |
| ~02:05 a ~02:10 | Mídias para redes sociais | 2 verticais, trecho curto | 960,106,410,630 · 1400,106,412,630 |
| ~02:10 a 03:25 | Produção de VSL | VSL talking head e anúncio "Volante BMW R$ 1.600" | 938,84,432,594 · 1400,108,412,566 |
| 03:25 a 06:17 | VFX e motion, color e cortes | Clipe musical de Santxx e Azam MC | 640,304,1186,670 |
| 06:25 a 08:46 | VFX e motion, capas | Visualizer de Anjo005 e capa | vídeo 986,112,826,856 · capa 608,362,314,364 |
| 09:01 a 54:08 | Montagem de podcasts | Podcast Opinião Segura, edição especial LAAD Security Milipol Brazil 2026, com lower thirds dos convidados | 724,358,1088,616 |
| 54:08 a 64:19 | Apresentação YouTube | Vídeo "Constance superou Silksong?": motion e edição, apresentado por mim | vídeo 650,310,1162,664 · thumb 106,458,438,246 |
| 64:19 a 64:34 | Trabalhe comigo | Contato e logo WhyNot | só referência |
Os recortes saem com no máximo ~1180×670 (horizontais) e ~410×650 (verticais). São prévias provisórias até eu mandar os originais.

## 4. Regras inegociáveis
1. Não invente nada: cliente, número, prêmio, depoimento, ano, função ou resultado. Faltou dado: pergunte ou deixe de fora. Nenhum texto de preenchimento visível.
2. Só mídia real. Nada de imagem ou vídeo gerado para enfeitar. Trabalho feito com IA leva o selo "Feito com IA".
3. Logos: só os arquivos da pasta, sem redesenhar e sem gerar por IA. Marca sem arquivo aparece como texto.
4. Respeite a aparência real de cada trabalho: sem recolorir, sem alterar rosto, produto ou peça. Converter formato pode; mexer no conteúdo, não.
5. Passem a Respeitar: não cite data de lançamento nem nomes das faixas (ainda não são públicos). Não use material inédito, como o clipe de Blick.
6. OHC Motors: não escreva "airbag" e não atribua à peça característica que ela não tem.
7. Hora Bolas fica em Lavras (MG). Escreva sempre "Chopp".
8. Texto em português do Brasil revisado, primeira pessoa, frases curtas, voz direta. Sem travessão. Sem frase de anúncio: "soluções inovadoras", "transformando ideias em realidade" e parecidas estão proibidas.
9. `sites/` e os arquivos brutos são só leitura. NUNCA abra, copie, imprima ou faça commit de arquivos `.env*`: há segredos nessas pastas.
10. Produção só com o meu OK. Preview pode.
11. Nada de cara de template de IA. Estão proibidos:
    - as fontes Inter, Roboto, Arial, Poppins, Space Grotesk e Montserrat (essa é da OHC);
    - gradiente roxo, glassmorphism genérico, aurora ou spotlight de biblioteca;
    - cards todos iguais e emoji como ícone;
    - cursor customizado no site inteiro e o mesmo fade em tudo.

## 5. Referências: estude a mecânica, não copie o visual
- igloo.inc (Abeto, Site of the Year e Developer Site of the Year do Awwwards 2024): uma ideia só conduz o scroll inteiro, com acabamento de produto.
- landonorris.com (OFF+BRAND, Site of the Year 2025): impacto máximo com poucas interações, WebGL com parcimônia, fluido no celular.
- matvoyce.tv (case no Awwwards): portfólio de criador de motion. Layout diferente por tipo de trabalho, player próprio, performance tratada desde o começo.
- ligthelm.work (Salomon Ligthelm, diretor): índice em lista com filtro por categoria e uma página por projeto. Credibilidade antes de efeito.
- finalcut-edit.com (casa de edição): cada trabalho com prévia e créditos (direção, produtora, agência, edição).
- theycallmegiulio.com (case no Codrops, abr/2026): linguagem de cinema na web. Aberração cromática só na transição, grão integrado ao texto, animação a serviço da história.
- goodgrowth.com (case no Codrops, ago/2026): abertura curta tipo "boot" e transição de projeto com wipe de barras.
- Codrops, "Arnaud Rocca's Portfolio" (mar/2026):
  - efeitos GSAP reutilizáveis registrados num lugar só;
  - SplitText revertido depois de animar;
  - `gsap.matchMedia()` para reduced motion;
  - paridade mouse e teclado e versão sem JS.
- Meus sites:
  - passem-a-respeitar.vercel.app: abertura VHS com REC e timecode, grão, scanlines, vinheta, View Transitions e regras de motion no AGENTS.md;
  - ohc-seven.vercel.app: experiência guiada pelo scroll, luz de cinema e componentes de terceiros com crédito.
- Critério de jurado (Hon Tran, Awwwards): direção de arte com ponto de vista, motion que carrega significado e 60 fps em celular intermediário. Teste com CPU 4× mais lenta e rede lenta. Cada quadro parado precisa funcionar sozinho.

## 6. Direção de arte: "Ilha de edição"
Conceito: o site é a minha ilha de edição. A linguagem usa timecode, REC, trilhas de timeline (V1, V2, V3), cartelas de cinema, letterbox e grão leve.

Ele continua o que já fazemos:
- a abertura VHS com REC e timecode do Passem a Respeitar;
- o texto digitado em mono com marca-texto e cursor do reel da WhyNot;
- a luz de cinema dos anúncios da OHC.

A diferença é a postura de portfólio sênior: o trabalho é o protagonista e a interface é discreta como a de um software de edição.

Paleta (variáveis CSS no `@theme` do Tailwind):
- `--preto #0B0B0C` fundo de cinema · `--carvao #151517` superfícies · `--linha #2A2A2E` divisórias.
- `--creme #F3EFE4` texto no escuro e fundo das cartelas de leitura (eco do creme do portfólio antigo).
- `--cinza #9B988F` texto secundário no escuro (6,8:1) · `--grafite #5E5B55` texto secundário no creme (5,9:1).
- `--rec #E23E3A` é o único acento: o vermelho do REC e dos títulos do portfólio antigo (4,7:1 sobre o preto). Sobre o creme, texto pequeno usa `--rec-escuro #C8322E` (4,6:1).
- Uma cor de acento só. Quem traz cor são os vídeos e as fotos.

Tipografia (next/font auto-hospedada, no máximo 3 famílias, só os pesos usados):
- Opção A (padrão): Big Shoulders em tamanho de display, pesos 800 a 900, nos títulos (cartaz de cinema) · JetBrains Mono em timecode, rótulos, tags e HUD · Instrument Sans no texto.
- Opção B: Instrument Serif nos títulos (continua os títulos serifados do portfólio antigo) · JetBrains Mono · Instrument Sans.
- Escala com saltos grandes: nome no herói entre 12 e 18vw, corpo de 16 a 18 px. Números tabulares no timecode.

Textura e grid:
- Grão animado leve (opacidade até 0,08, a 12 fps, parado em reduced motion), vinheta sutil, letterbox nas transições e HUD de visor nos cantos do herói.
- Grid de 12 colunas e margem lateral `clamp(20px, 5vw, 72px)`.
- Seções de vídeo no preto; seções de leitura (sobre, créditos, CV) podem virar cartela creme.

## 7. Mapa do site
Home, nesta ordem:
1. **Abertura** (assinatura 1; só na primeira visita da sessão; no máximo 1,8 s):
   - tela preta, ● REC pisca duas vezes e o timecode corre a partir de 00:00:00:00;
   - "PAULO RABELO" se monta letra a letra a partir de dígitos de timecode;
   - as barras de letterbox abrem e revelam o herói;
   - "Pular" aparece desde o primeiro quadro, e clique, tecla ou scroll também pulam;
   - o herói já está renderizado por baixo, então a abertura não atrasa o LCP.
2. **Herói monitor** (assinatura 2):
   - loop mudo em tela cheia, com o poster AVIF como elemento de LCP;
   - HUD de visor nos cantos: ● REC, timecode do loop, "SÃO PAULO · BR" e "DESÇA";
   - nome enorme na fonte de título e a função em mono, digitada com cursor e marca-texto como no reel da WhyNot: "edição · motion · direção de arte";
   - botões "Ver trabalhos" e "Falar comigo";
   - ao rolar, o vídeo encolhe para dentro de um monitor com moldura (scrub, só transform).
3. **Manifesto**: duas linhas curtas e diretas. Proponha 3 opções.
4. **Trabalhos selecionados**: 6 destaques em lista estilo casa de edição: número, projeto, cliente ou artista, minha função, categoria.
   - Desktop: no hover ou no foco do teclado, a prévia aparece e segue o cursor com atraso suave, com timecode de entrada e saída.
   - Celular: o item no centro da tela toca a própria prévia, um por vez.
   - O rótulo "▶ ASSISTIR" aparece só sobre itens de vídeo; cursor nativo no resto.
5. **Timeline** (assinatura 3):
   - No desktop, seção fixada por cerca de 250vh com 4 trilhas: V1 Edição e cor, V2 Motion e VFX, V3 IA generativa, V4 Direção de arte (sites, social e foto).
   - Um playhead vermelho anda com o scroll. Quando ele passa por um clipe, o monitor acima mostra aquele trabalho e o timecode avança.
   - Barra de progresso visível e controle por teclado.
   - No celular, sem pin: as trilhas viram faixas com scroll-snap horizontal e o monitor fica sticky.
   - Em reduced motion, vira lista por categoria.
6. **Clientes e artistas**: nomes em mono passando devagar como créditos, com pausa no hover e no foco e parados em reduced motion.
   - Nomes: OHC Motors, DDPAI, WhyNot Records, WhyNot Visuals, Hora Bolas Club, MH Phones, Santxx, Ch3fe, Azam MC, Anjo005, Podcast Opinião Segura.
   - Logo só da WhyNot e da MH Phones, que estão na pasta.
7. **Sobre**: resumo com link para /sobre.
8. **Fim**: cartela "TRABALHE COMIGO" com WhatsApp, e-mail, LinkedIn e Instagram da WhyNot. O timecode do cabeçalho termina em "FIM".

Outras páginas:
- `/trabalhos`: todos os cases, com filtro por categoria (Edição, Motion e VFX, Cor, IA, Sites, Social, Fotografia, Podcast), reordenação animada (GSAP Flip) e alternância Lista/Grade.
- `/trabalhos/[slug]`: página de exibição.
  - Player no topo como conteúdo principal, depois o título.
  - Bloco CRÉDITOS: cliente ou artista, minha função, entregas, ferramentas e ano (só quando eu informar).
  - Texto em 3 partes curtas: contexto, o que eu fiz e resultado real, se existir.
  - Frames ou fotos, selo "Feito com IA" quando couber e link para o próximo trabalho.
  - Vídeo vertical fica ao lado do texto no desktop.
- `/sobre`:
  - retrato, bio curta e experiência rolando

[o texto recebido termina aqui]
