# Conceito Feiras e Eventos: Landing Page

Fonte de verdade do projeto. Consultar este arquivo antes de qualquer etapa (identidade, conteúdo, pendências, regras). Não assumir nada que não esteja aqui ou no kit de identidade.

Site atual a ser substituído: https://conceitostands.com.br/
Segmento: stands, quiosques e cenografia para feiras e eventos. Curitiba, PR.

## Stack

- HTML, CSS e JS puros. Sem framework, sem build step.
- GSAP 3.13+ via CDN jsDelivr (core, ScrollTrigger, SplitText).
- Deploy na Vercel via GitHub.

## Identidade visual

Kit completo em `./conceito-identidade` (ler `LEIA-ME.txt` lá antes de usar qualquer peça). Cópia de trabalho em `./assets/brand` (mesma estrutura).

### Logo
- Logo oficial: símbolo + "CONCEITO / FEIRAS E EVENTOS" empilhado, texto preto vetorizado do original. Arquivos `logo/svg/logo-vertical-*` e `logo/png/logo-vertical-*`.
- Header usa a variante horizontal: `logo/svg/logo-horizontal-*` (mesmos elementos lado a lado).
- Variações: **colorido** (fundo claro), **branca** (fundo escuro ou sobre foto), **preta**.
- Nunca usar nada de `logo/_descartado` (assinaturas antigas em Bebas Neue, versões substituídas).

### Tokens (`css/tokens.css`)
Fontes locais em WOFF2 (subset latino) com fallback TTF, já referenciadas no arquivo. Variáveis principais:

| Token | Valor | Uso |
|---|---|---|
| `--color-navy` | `#002538` | base escura |
| `--color-navy-deck` | `#00323D` | navy secundário/decks |
| `--color-teal` | `#036477` | primária / CTAs |
| `--color-teal-medium` | `#30807D` | hover (e primária-hover em fundo escuro) |
| `--color-mint` | `#79BAA6` | acento |
| `--color-off-white` | `#F2F5F4` | fundo claro |
| `--color-text` | `#0B1F27` | texto |

Regras de uso de cor:
- **Mint nunca em texto pequeno sobre fundo claro** (contraste insuficiente). Só em títulos grandes, detalhes, ou sobre fundo escuro.
- Em seções navy, hover de botão usa `--color-primary-hover-on-dark` (= teal médio), não `--color-primary-hover` (que é navy e desaparece sobre fundo navy).

### Tipografia
- **Bebas Neue**: headlines.
- **Montserrat**: corpo, menus, botões.
- Nenhuma outra fonte.

### Outros ativos do kit
- Favicon, manifest e og-image prontos em `favicon/` e `social/`.
- Gráficos em `graficos/`: `0X-*.svg` (ícones das 4 etapas do processo), `conceito-vazado.svg` (marca d'água "CONCEITO"), `marca-dagua-simbolo.svg`.

## Tratamento de foto (regra crítica)

As fotos reais disponíveis são de pavilhão de feira com luz fluorescente e marcas de clientes muito coloridas e heterogêneas entre si.

- **Hero, cards de serviço e fundos**: overlay navy (`#002538`) para unificar a paleta. Opacidade de referência no token `--photo-base-opacity` (`.78`).
- **Somente a galeria de portfólio** mostra as fotos em cor total: ali a variedade de clientes é o argumento, não um problema a esconder.

## Referências de design (`./referencias`)

- `logo-original.jpg`: logo oficial em raster (já vetorizada no kit, usar os SVGs).
- `apresentacao-comercial-conceito.pdf`: apresentação comercial com textos e fotos de stands.
- `ref-01-tokyo.png`: hero full-bleed escuro, headline condensada gigante, contador de slides 01 a 05.
- `ref-02-bauen.png`: seções escuras, cards com foto e legenda sobreposta.
- `ref-03-sw.png`: frase-manifesto grande em fundo claro, blocos foto + texto deslocados.
- `ref-04-aloft.png`: cards de serviço sobre foto, faixas diagonais.

Usar como direção de **ritmo e composição**, nunca copiar literalmente.

## Conteúdo aprovado

Extraído do site atual, da apresentação comercial e da logo. Não inventar nada além disto.

- **Headline**: "Transformamos sua presença em feiras e eventos".
- **Apoio**: "Há [ANOS] anos criando projetos e experiências que geram resultados."
- **Serviços**: Stands; Quiosques; Feiras e Eventos (montadora oficial); Cenografia para shows e feiras comerciais. Frases curtas de cada serviço, vindas do site atual:
  - Stands: "Transforme sua ideia em exposição e atraia a atenção do público."
  - Quiosques: "Exponha seus produtos e serviços e conquiste mais clientes."
  - Feiras e Eventos: "Conte conosco como sua montadora oficial."
  - Cenografia: "Desde shows a feiras comerciais, a estrutura que seu evento precisa."
- **Diferenciais**:
  - Gráfica interna: controle total sobre materiais, cores e acabamento para garantir a identidade da marca do cliente.
  - Estruturas modernas: projetos impactantes que aumentam engajamento e destacam a empresa.
  - Equipe dedicada: do início ao fim do projeto, com pontualidade e confiabilidade.
- **Processo** (4 etapas, ícones em `graficos/0X-*.svg`):
  1. Briefing: entendemos seus objetivos de participação na feira.
  2. Projeto: design estratégico e personalizado.
  3. Produção e Montagem: processo completo da construção do stand.
  4. Entrega Pronta: você só precisa chegar e aproveitar o evento.
- **Missão**: cuidamos de cada detalhe do projeto, da produção e da montagem para que você foque no que realmente importa: conquistar e encantar seus clientes.
- **CTA final**: "Pronto para se destacar?" + "Nossa equipe cuida de tudo, do projeto à desmontagem."
- **Clientes atendidos**: Perego / Lentes Correct, Almata Química, Kerootica, Obra Prima, KX3, Metalring / AGEL, Geloni, Schultz.

## Pendências: NÃO decidir, usar placeholder

Conflitos de fonte que só o cliente resolve. Todos os placeholders ficam centralizados em **um único objeto de configuração em `js/config.js`**, para troca em um lugar só.

| Placeholder | Conflito |
|---|---|
| `[ANOS]` | Site diz "mais de 10". Apresentação diz "30". |
| `[NOME NO TEXTO]` | Logo diz "Conceito Feiras e Eventos". Domínio e apresentação dizem "Conceito Stands". |
| `[CONTATO NOME]`, `[WHATSAPP]` | Site traz Marco Orasmo, (41) 99666-6865. Apresentação traz Lucas Jactchak, (41) 99697-4677. |
| `[EMAIL]` | Encontrado no rodapé do site atual: marco@conceitostands.com.br, vinculado ao contato de Marco Orasmo. Não confirmado pelo cliente como e-mail definitivo (pode haver outro vinculado a Lucas Jactchak). Continua `[EMAIL]` até a decisão. |
| `[INSTAGRAM]` | @conceito.stands ou @conceitofe. |
| `[ENDERECO]` | Não informado em nenhuma fonte. |

Fotos: todas as fotos atualmente no projeto (`assets/img/pdf` e `assets/img/site`) são provisórias. Fotos originais em alta resolução foram solicitadas ao cliente. Substituir assim que chegarem (lista de trocas por seção em `DESIGN.md`).

## Regras do projeto

- **Nunca inventar** números, depoimentos, prêmios, clientes ou dados de contato.
- **Nunca usar travessão (—)** em nenhum arquivo do projeto: código, copy do site, CLAUDE.md, DESIGN.md e qualquer outro documento. A regra vale para todo o projeto, não só para o conteúdo do site.
- **Alterações mínimas e com escopo**: ao corrigir algo, não reescrever o que já funciona.
- **Acessibilidade WCAG AA**, mobile-first, respeitar `prefers-reduced-motion` (tokens de transição já zeram em `--transition-*` quando a media query está ativa).
- **Copy em português do Brasil**, tom direto e B2B: público é empresas que vão expor em feiras e precisam de stand pronto.

## Estrutura do projeto

```
index.html      página única, HTML/CSS/JS puros (ver DESIGN.md para o plano seção a seção)
css/
  style.css     importa assets/brand/css/tokens.css, não redefine cor ou fonte fora dos tokens
js/
  config.js     objeto único com todos os placeholders de conteúdo (ver tabela de pendências acima)
  main.js       preenche placeholders, menu mobile, troca do header, formulário de orçamento, JSON-LD
assets/
  brand/        cópia de ./conceito-identidade (logo, tokens, fontes, favicon, social, gráficos)
  img/
    pdf/        imagens extraídas de referencias/apresentacao-comercial-conceito.pdf
    site/       imagens baixadas do site atual (banners, serviços, logos de clientes, fotos de Instagram)
    portfolio/  recortes das fotos com legenda impressa, usados na galeria (originais em img/pdf intactos)
    hero/       render wireframe convertido em traço claro, usado como textura no hero (original em img/pdf intacto)
    INVENTARIO.md   tabela de todas as imagens: origem, resolução, conteúdo, uso recomendado
```
