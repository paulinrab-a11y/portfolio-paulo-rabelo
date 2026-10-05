# Segurança

O portfólio é um site estático: sem login, sem banco de dados, sem formulário e sem pagamento. O visitante assiste aos trabalhos e chama o Paulo pelo WhatsApp, e-mail ou LinkedIn. Isso elimina a maior parte dos riscos de uma aplicação web.

## Como relatar um problema

Não abra Issue pública para falha de segurança. Use "Report a vulnerability" na aba Security do repositório ou fale direto com o responsável pelo GitHub.

## O que está aplicado

| Item | Como |
|---|---|
| Segredos fora do Git | `.env*` e `.vercel` no `.gitignore`; gitleaks no histórico inteiro a cada PR (`.github/workflows/ci.yml`). O repositório é público. |
| Cabeçalhos de segurança | `src/lib/security.ts`: CSP só com a própria origem, HSTS de 2 anos, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP. Testado em `src/lib/security.test.ts` e `tests/e2e/seguranca.spec.ts`. |
| HTTPS | A Vercel redireciona HTTP; HSTS com `preload`; CSP com `upgrade-insecure-requests`. |
| Rotas | Só o que é gerado no build existe (`dynamicParams = false`); o resto é 404. |
| Varredura de robôs | `vercel.json` nega na borda `/.env`, `/.git`, `*.php`, `wp-admin` e parecidos. |
| Vazamento | Sem source maps em produção, sem `X-Powered-By`, páginas de erro sem detalhe técnico. |
| Dependências | `.npmrc` sem scripts de instalação e só versões com 7 dias ou mais; `npm ci`; `npm audit` e `npm audit signatures` no CI; Dependabot semanal com espera de 7 dias. |
| Dados do visitante | O site não cria cookies nem guarda dado de visitante. O `sessionStorage` só lembra que a abertura já passou. |

## Decisões conhecidas

- `script-src` e `style-src` com `'unsafe-inline'`: o Next injeta scripts inline em páginas estáticas, e o nonce obrigaria a renderizar cada página a cada visita (sem cache da CDN).
- Telefone e e-mail são públicos de propósito: são o canal de contato.

## Quando o site ganhar funções novas

Antes do merge do PR que trouxer formulário, login, banco ou upload: validação no servidor com esquema, rate limit no endpoint, segredos só em variáveis de servidor (nunca `NEXT_PUBLIC_*`) e liberação na CSP apenas do host novo, com teste.
