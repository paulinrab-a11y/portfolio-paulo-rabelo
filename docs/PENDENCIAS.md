# Pendências com o Paulo

Itens que dependem de dado ou decisão sua. Nada disso foi inventado no site: o campo fica vazio ou o texto fica genérico até a resposta.

## Resolvidas em 05/10/2026
- Manifesto: fica a opção 1 ("Edito como quem monta um filme. Mesmo quando é um story de 15 segundos.").
- Selo "Feito com IA": anúncio da OHC e história ilustrada. O reel Site sob medida e as artes do Hora Bolas não levam selo.
- Entraram os slides extras: rebranding do Hora Bolas (com "300 mil de alcance mensal" como resultado), eventos, fotos extras e a peça do volante Audi da OHC.
- A peça com o rapaz de óculos laranja não é IA. O texto "AI SPEC UX/UI DESIGN" estava errado no slide antigo e não é usado.
- Repositório público no GitHub (CI do Actions voltou a rodar).
- Produção: o deploy de 05/10 em portfolio-paulo-rabelo.vercel.app fica no ar.
- Retrato enviado (entra no /sobre, na home e no compartilhamento).
- Resto do brief: o Paulo pediu algo com bom SEO ligado ao que faz. Entraram as páginas de serviço (/servicos) e o /sobre com retrato e experiência rolando.
- Não há originais dos vídeos: as prévias recortadas ficam.
- Vídeo do drink é do Hora Bolas Club; o do Audi, da OHC Motors.
- Lower thirds do podcast e fotos do Hora Bolas são do Paulo.
- Pessoas das fotos de eventos autorizam o uso; não precisa dizer qual evento é qual.
- Placa do Porsche e "Forza / AD ASTRA" nos créditos podem ficar.

## Decidido em 06/10/2026

O Paulo não vai enviar mais dados: o site fica como está.
- VSL e anúncio do volante: sem cliente nos créditos.
- Arte do volante Audi: fica o recorte do slide.
- Sem legendas (.vtt) por enquanto.
- Créditos sem ano e sem ferramentas por trabalho.
- Único resultado numérico: 300 mil de alcance mensal no Hora Bolas.

## Em aberto

1. Domínio próprio (o Paulo coloca mais tarde). Passo a passo:
   1. Na Vercel, projeto `portfolio-paulo-rabelo` > Settings > Domains: adicionar o domínio e seguir as instruções de DNS.
   2. Em Settings > Environment Variables (Production): `NEXT_PUBLIC_SITE_URL=https://seu-dominio`. É o endereço usado no sitemap, nos links canônicos, no JSON-LD e na imagem de compartilhamento.
   3. Fazer um novo deploy de produção (merge de qualquer PR em `main` ou Redeploy no painel).
   4. Conferir `https://seu-dominio/sitemap.xml` e enviar o sitemap no Google Search Console.
