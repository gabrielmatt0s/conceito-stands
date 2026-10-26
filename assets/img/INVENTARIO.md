# Inventário de imagens

Critério de uso: **hero** exige largura mínima 1600px; **card** exige mínima 800px; abaixo disso, só **miniatura** (ícones, selos, thumbs de depoimento/galeria pequena). Fotos de pavilhão real recebem overlay navy fora da galeria de portfólio (ver `CLAUDE.md`, seção "Tratamento de foto"). Fotos marcadas "pavilhão" têm luz fluorescente e cores de cliente muito variadas, exatamente o cenário que o overlay existe para resolver.

## `assets/img/pdf/`: extraídas de `referencias/apresentacao-comercial-conceito.pdf`

| Arquivo | Origem (pág.) | Resolução | O que mostra | Uso recomendado |
|---|---|---|---|---|
| `producao-marcenaria-corte-p02.jpeg` | p.2 | 908x1210 | Marceneiro cortando madeira na oficina, ambiente de produção | **card**, retrato com boa luz, sem cores de cliente competindo, não precisa de overlay forte |
| `producao-equipe-tablet-p02.jpeg` | p.2 | 908x1210 | Dois membros da equipe revisando projeto em tablet na oficina, camiseta com logo Conceito visível | **card**, ótima para seção "Equipe dedicada" |
| `producao-montagem-parafusadeira-p02.jpeg` | p.2 | 908x1210 | Montador usando parafusadeira em peça de MDF branco | **card**, para seção "Produção e Montagem" do processo |
| `stand-perego-correct-feira-p03.jpeg` | p.3 | 1081x1440 | Stand pronto Perego / Lentes Correct, pavilhão, ângulo amplo | **hero/card** (abaixo de 1600px de largura, não serve como hero full-bleed em telas grandes sem upscale, serve bem como card ou hero em mobile/tablet). Pavilhão: aplicar overlay fora da galeria |
| `stand-perego-correct-feira-alt-p05.jpeg` | p.5 | 721x960 | Mesmo stand Perego / Correct, outro ângulo/recorte | **miniatura**, abaixo do mínimo de card, usar só se precisar de variação pequena |
| `stand-kx3-p05.jpeg` | p.5 | 1210x681 | Stand KX3 Acessórios Automotivos, pavilhão, cores laranja/preto fortes | **card**, bom exemplo para a galeria de portfólio (cor total permitida ali) |
| `stand-metalring-agel-p05.jpeg` | p.5 | 1210x681 | Stand Metalring / AGEL, pavilhão, tons azul/branco | **card**, galeria de portfólio |
| `stand-almata-quimica-feicon2026-p05.png` | p.5 | 1013x1266 | Stand Almata Química, Feicon 2026, com legenda "ALMATA QUÍMICA \| FEICON 2026" já impressa na imagem | **card**, galeria. Legenda embutida exige crop se não quiser o texto duplicado |
| `stand-obra-prima-expoapras2026-p05.png` | p.5 | 1013x1266 | Stand Obra Prima Importadora, ExpoApras 2026, legenda embutida | **card**, galeria. Mesma ressalva da legenda embutida |
| `stand-schultz-maxtech-p05.png` | p.5 | 1013x1266 | Stand Schultz Max Tech, legenda embutida "Acessórios Caminhonete" | **card**, galeria. Mesma ressalva |
| `stand-kerootica-expooptica2026-p05.png` | p.5 | 1013x1266 | Stand Keroótica, ExpoÓptica 2026, legenda embutida | **card**, galeria. Mesma ressalva |
| `stand-geloni-expoapras2026-p05.png` | p.5 | 1013x1266 | Stand Geloni Sorvetes, ExpoApras 2026, legenda embutida | **card**, galeria. Mesma ressalva |
| `render-stand-perego-wireframe-p01.png` | p.1 | 1290x762 | Render 3D wireframe (line art) do projeto do stand Perego antes da montagem | **card**, ótimo para ilustrar a etapa "Projeto" do processo, sem precisar de overlay (já é em preto e branco) |
| `simbolo-decorativo-p01.png` | p.1 e p.6 (duplicada, 1 cópia removida) | 258x258 | Símbolo "C" circular decorativo nas cores da marca, usado como elemento gráfico na apresentação | **miniatura**, abaixo do mínimo de card, usar como ícone/selo, não como foto |
| `textura-fundo-quase-vazia-p02.png` | p.2 | 1500x553 | Elemento quase todo branco/transparente, provável textura ou fundo decorativo da apresentação | **descartar**, sem conteúdo fotográfico útil |

> **Atualização:** as linhas `producao-marcenaria-corte-p02`, `producao-equipe-tablet-p02`, `producao-montagem-parafusadeira-p02`, `stand-perego-correct-feira-p03`, `stand-perego-correct-feira-alt-p05`, `stand-kx3-p05`, `stand-metalring-agel-p05`, `stand-almata-quimica-feicon2026-p05` e `stand-obra-prima-expoapras2026-p05` abaixo descrevem material já **substituído e removido do repositório**: o cliente enviou o banco de mídia original (Drive "Banco de imagens"), ver seção `assets/img/v2/` e `assets/video/` logo abaixo. `stand-schultz-maxtech-p05`, `stand-kerootica-expooptica2026-p05` e `stand-geloni-expoapras2026-p05` também já foram substituídas: Schultz, Kerootica e Geloni saíram da galeria de portfólio, trocadas pelo lote 2026 (`assets/img/v2/portfolio-*`, ver seção abaixo).

## `assets/img/v2/` e `assets/video/`: mídia em alta definição, gerada a partir dos originais em `bruto/`

`bruto/` guarda o material bruto do cliente (fotos de até 4032px, vídeos 4K em HEVC/HDR) e **não é versionado nem referenciado pelo site**. Cada arquivo abaixo foi gerado a partir de um original específico de `bruto/` (ver coluna "Original"), com `exif_transpose` para respeitar a rotação do celular, em WebP qualidade 82 / method 6, sem metadados EXIF, em larguras responsivas (horizontais: 640/1024/1600/2400px; verticais: 480/768/1200/1800px; só as larguras que o original comporta, nunca upscale). O vídeo do hero foi recortado dos originais 4K (tonemap HDR→SDR, HLG/BT.2020→BT.709) e recodificado em WebM (VP9) e MP4 (H.264) em duas resoluções.

| Arquivo | Original em `bruto/` | Larguras geradas (peso) | O que mostra | Uso |
|---|---|---|---|---|
| `video/hero-montagem-1080.webm` (crf 38) / `.mp4` (crf 28) | 6 clipes de `autopar-videos/` e `expo-industria/` (ver `CLAUDE.md`/histórico para os cortes exatos) | 1080x1920, 12,9s, sem áudio (webm 4085,2 KB / mp4 3592,2 KB) | Montagem de um stand, em vídeo | **hero**, fundo do vídeo em telas ≥768px |
| `video/hero-montagem-720.webm` (crf 38) / `.mp4` (crf 26) | idem, recodificado em menor resolução | 720x1280, 12,9s, sem áudio (webm 2371,6 KB / mp4 2354,6 KB) | idem | **hero**, fundo do vídeo em telas <768px |
| `video/hero-montagem-poster-1080.webp` / `-poster-720.webp` | último quadro dos vídeos acima | 1080x1920 (108,0 KB) / 720x1280 (68,8 KB) | Último quadro do vídeo (stand de hexágonos, 3D Criar/Formlabs) | **hero**, pôster/fallback do vídeo, selecionado via `imagesrcset`/`imagesizes` |
| `img/v2/diferencial-grafica-acabamento-{480,768,1200,1800}w.webp` | `autopar-fotos/IMG_6846.HEIC` | 480w (29,3 KB) · 768w (56,4 KB) · 1200w (104,6 KB) · 1800w (183,7 KB) | Equipe instalando acabamento de um stand | **card**, seção "Gráfica interna" |
| ~~`img/v2/diferencial-estruturas-*.webp`~~ (removido) | `autopar-fotos/IMG_6776.HEIC` | — | Portal de LED de um estande | Substituído pelo estande da Guabifios (`img/v2/portfolio-guabifios-*.webp`, ver tabela do portfólio 2026 abaixo) na seção "Estruturas modernas" |
| `img/v2/diferencial-equipe-{480,768,1200,1800}w.webp` | `autopar-fotos/IMG_6643.HEIC` | 480w (41,0 KB) · 768w (82,0 KB) · 1200w (151,7 KB) · 1800w (256,3 KB) | Montador com camiseta da Conceito | **card**, seção "Equipe dedicada" |
Portfólio 2026 (tabela abaixo): originais do cliente em `bruto/portfolio-2026/` (JPEGs de 1086 a 1600px de largura, nunca versionados). Larguras geradas: horizontais 640/1024/original; verticais 480/768/original — menores que o padrão 640/1024/1600/2400 (ou 480/768/1200/1800) acima porque nenhum original deste lote passa de 1600px; a maior versão de cada imagem é sempre a largura original, nunca upscale.

| Arquivo | Original em `bruto/` | Larguras geradas (peso) | O que mostra | Uso |
|---|---|---|---|---|
| `img/v2/portfolio-upton-{640,1024,1448}w.webp` | `portfolio-2026/Upton - Fispal Tec 2026.jpeg` (original só tem 1448px) | 640w (69,1 KB) · 1024w (147,0 KB) · 1448w (246,9 KB) | Estande Upton, Fispal Tec 2026 | **card**, galeria de portfólio, célula de destaque (2x2) |
| `img/v2/portfolio-fergraf-{480,768,1086}w.webp` | `portfolio-2026/Fergraf - Formóbile 2026.jpeg` (original só tem 1086px, foto vertical) | 480w (51,5 KB) · 768w (119,8 KB) · 1086w (209,5 KB) | Estande Fergraf, Formóbile 2026 | **card**, galeria de portfólio, célula vertical de 2 linhas |
| `img/v2/portfolio-perego-lentes-{480,768,1086}w.webp` | `portfolio-2026/Perego Lentes - Expoótica 2026.jpeg` (original só tem 1086px, foto vertical) | 480w (71,6 KB) · 768w (154,9 KB) · 1086w (267,6 KB) | Estande Perego Lentes, Expoótica 2026 | **card**, galeria de portfólio, célula vertical de 2 linhas |
| `img/v2/portfolio-cofemo-{640,1024,1371}w.webp` | `portfolio-2026/Cofemo - Formóbile 2026.jpeg` (original só tem 1371px) | 640w (56,8 KB) · 1024w (120,5 KB) · 1371w (186,9 KB) | Estande Cofemo, Formóbile 2026 | **card**, galeria de portfólio, célula larga de 2 colunas |
| `img/v2/portfolio-guabifios-{640,1024,1600}w.webp` | `portfolio-2026/Guabifios - Febratex 2026.jpeg` | 640w (40,8 KB) · 1024w (81,7 KB) · 1600w (150,4 KB) | Estande Guabifios, Febratex 2026 | **card**, galeria de portfólio (célula larga de 2 colunas) **e** seção "Estruturas modernas" (`object-position: 100% center` na imagem, para o zoom do parallax de desktop não cortar o texto "Guabifios" do letreiro) |
| `img/v2/portfolio-squadroni-{640,1024,1600}w.webp` | `portfolio-2026/Squadroni - Formóbile 2026.jpeg` | 640w (37,9 KB) · 1024w (78,8 KB) · 1600w (147,2 KB) | Estande Squadroni, Formóbile 2026 | **card**, galeria de portfólio, célula larga de 2 colunas |
| `img/v2/portfolio-almata-quimica-{640,1024,1600}w.webp` | `portfolio-2026/Almata Química - Formóbile 2026.jpeg` | 640w (52,8 KB) · 1024w (106,0 KB) · 1600w (194,0 KB) | Estande Almata Química, Formóbile 2026 | **card**, galeria de portfólio |
| `img/v2/portfolio-obra-prima-{640,1024,1600}w.webp` | `portfolio-2026/Obra Prima - ProWine 2026.jpeg` | 640w (52,7 KB) · 1024w (105,8 KB) · 1600w (187,7 KB) | Estande Obra Prima, ProWine 2026 | **card**, galeria de portfólio |

Kerootica e Geloni (versões antigas extraídas do PDF, `img/portfolio/`) saíram da galeria de portfólio nesta troca: substituídas pelo lote 2026 acima.

## `assets/img/site/`: baixadas de `conceitostands.com.br` (site atual)

| Arquivo | Origem no site | Resolução | O que mostra | Uso recomendado |
|---|---|---|---|---|
| `banner1.webp` | banner principal, slide 1 | 1300x632 | Banner hero "EXPONDO NOVOS RUMOS" | **abaixo da qualidade necessária para hero** (mín. 1600px), qualidade insuficiente para reuso direto, serve de referência de enquadramento |
| `banner2.webp` | banner principal, slide 2 | 1500x911 | Banner hero, variação | **abaixo da qualidade necessária para hero** (mín. 1600px, está em 1500px), perto do limite, mas ainda insuficiente |
| `banner3.webp` | banner principal, slide 3 | 900x675 | Banner hero, variação | **abaixo da qualidade necessária**, só miniatura/referência |
| `empresa.webp` | seção "Sobre"/"Quem somos" | 471x579 | Foto institucional pequena | **abaixo da qualidade necessária para card** (mín. 800px), só miniatura |
| `service1-stands.webp` | card de serviço "Stands" | 379x500 | Imagem do card de serviço Stands | **abaixo da qualidade necessária**, só miniatura/referência de composição |
| `service2-quiosques.webp` | card de serviço "Quiosques" | 379x499 | Imagem do card de serviço Quiosques | **abaixo da qualidade necessária**, só miniatura |
| `service3-eventos.webp` | card de serviço "Feiras e Eventos" | 379x500 | Imagem do card de serviço Feiras e Eventos | **abaixo da qualidade necessária**, só miniatura |
| `video1.webp` | seção full-width, lado esquerdo (thumb de vídeo) | 1024x683 | Imagem/thumb de vídeo institucional | **abaixo da qualidade necessária para hero**, serve como **card** (acima de 800px) |
| `cliente-logo-i1.webp` a `i7.webp` | carrossel de logos de clientes | 278x166 cada | Logos de clientes (sem identificação individual clara na marcação do site) | **miniatura**, uso típico de logo de cliente, dimensão compatível com essa finalidade |
| `instagram-1.jpg` a `6.jpg` | seção "Instagram Fotos" (link para @conceitofe) | aprox. 286 a 291 x 287 a 292 (quase quadradas) | Fotos do feed do Instagram, miniaturas quadradas | **miniatura**, abaixo do mínimo de card, uso apenas como já é no site (grid pequeno) |
| `site-logo.png` | header do site atual | 133x124 | Logo em uso no site atual (substituída pelo kit novo) | **não usar**, a logo oficial do projeto novo é a de `assets/brand/logo/`, mantido aqui só como referência histórica |

## Resumo

- **Prontas para hero** (≥1600px): nenhuma imagem do site ou do PDF atinge 1600px de largura. Para o hero full-bleed nos moldes da referência `ref-01-tokyo.png`, será necessário solicitar fotos em alta resolução ao cliente ou usar as melhores disponíveis (`stand-perego-correct-feira-p03.jpeg`, 1081px, ou `stand-almata-quimica-feicon2026-p05.png`, 1013px) com upscale controlado e crop mais fechado, ciente da perda de nitidez.
- **Prontas para card** (≥800px): a maioria das fotos de produção e de stands montados extraídas do PDF (908 a 1290px de largura). Essas são a melhor fonte de imagem do projeto.
- **Só miniatura ou abaixo do necessário**: praticamente todas as imagens baixadas do site atual (banners, serviços, "empresa", logos de clientes, fotos de Instagram). O site atual já publica em baixa resolução.
- **Fotos de pavilhão** (luz fluorescente, cores de cliente fortes): todas as fotos de stands montados do PDF. Fora da galeria de portfólio, aplicar overlay navy conforme `CLAUDE.md`.
- **Imagens com legenda já impressa** (Almata, Obra Prima, Schultz, Keroótica, Geloni): avaliar crop para remover a legenda do PDF se o design da galeria tiver sua própria legenda em HTML/CSS.
