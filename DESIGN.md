# DESIGN.md: plano da landing page

Plano de design completo antes de qualquer HTML/CSS. Consultar `CLAUDE.md` (fonte de conteúdo, identidade e regras) e `assets/img/INVENTARIO.md` (fonte de imagens) junto com este arquivo. Nenhum número, depoimento ou promessa aqui além do que já está aprovado em `CLAUDE.md`.

## Leitura de briefing

Landing page B2B para uma empresa de stands, quiosques e cenografia de feiras em Curitiba. Público: profissionais de marketing/eventos de empresas que vão expor e precisam de um fornecedor confiável, rápido de avaliar. Linguagem visual: industrial-condensada (Bebas Neue gigante, navy/teal/mint, fotografia de produção real), não genérica de agência criativa nem de SaaS. Direção: composição assimétrica e editorial (influência das referências ref-03 e ref-04), construída em HTML/CSS/JS puro com GSAP para os momentos de animação, sem framework (decisão já travada em `CLAUDE.md`).

**Dials de design** (vocabulário interno de planejamento, não aparecem no código):
- **Variância**: 7 de 10. Composições deslocadas e assimétricas nas seções Hero, Diferenciais e Manifesto, grid tipo bento no Portfólio. Não vai a 9 a 10 porque o público é B2B e precisa continuar lendo rápido e com confiança.
- **Intensidade de movimento**: 5 de 10. GSAP usado com propósito (barra de progresso do Processo, troca de header no scroll, reveals de entrada), nunca decorativo por decoração.
- **Densidade visual**: 4 de 10. Seções respiram (`--section-space`), sem virar painel de dados.

## Decisão de ordem das seções

A ordem proposta pelo briefing já segue um arco narrativo sólido e foi mantida sem alteração: gancho (Hero) → prova social rápida (Clientes) → o que fazemos (Serviços) → por que nós (Diferenciais) → como funciona (Processo) → prova completa (Portfólio) → fechamento emocional (Manifesto) → conversão (CTA + formulário) → suporte (Rodapé e WhatsApp flutuante).

Uma alternativa considerada foi mover o Portfólio para logo depois da faixa de Clientes, antes de explicar os Serviços, apostando em "mostrar antes de explicar". Foi descartada porque o visitante ainda não sabe os nomes dos 4 serviços nesse ponto, e a galeria de portfólio mistura fotos de todos eles. Sem contexto prévio dos serviços, a galeria perde parte do sentido. Mantendo a ordem original, quando o visitante chega ao Portfólio ele já sabe o que está olhando.

## Princípio de identidade visual que atravessa a página inteira

**Sem eyebrow tracked-uppercase em nenhuma seção de conteúdo.** Nenhum rótulo pequeno em caixa alta tipo "NOSSOS SERVIÇOS" ou "COMO FUNCIONA" acima dos títulos. Os próprios títulos em Bebas Neue, grandes e condensados, já carregam a hierarquia sozinhos. A única exceção é o rodapé, onde rótulos de coluna em caixa alta são uma convenção funcional de navegação, não um enfeite decorativo repetido em toda seção (ver seção 3 das decisões de design, abaixo).

---

## Ritmo de alternância de fundos

| # | Seção | Fundo | Tom |
|---|---|---|---|
| 1 | Header | transparente sobre o hero, depois off-white sólido | segue o hero |
| 2 | Hero | navy sólido (metade esquerda) + foto com overlay leve (metade direita) | escuro |
| 3 | Faixa de clientes | navy-deck | escuro |
| 4 | Serviços | off-white | claro |
| 5 | Diferenciais | navy-deck | escuro |
| 6 | Processo | off-white | claro |
| 7 | Portfólio | navy | escuro |
| 8 | Manifesto | off-white | claro |
| 9 | CTA + formulário | navy | escuro |
| 10 | Rodapé | navy-deck | escuro |

Sequência: escuro, escuro, claro, escuro, claro, escuro, claro, escuro, escuro.

Motivo: do meio da página em diante (Serviços até Manifesto) a alternância é estrita (claro, escuro, claro, escuro, claro), cada troca de tom sinaliza uma virada de assunto e evita que uma página longa fique monótona. As duas exceções são deliberadas, não acidentais:

- **Abertura (Hero + Clientes, dois fundos escuros seguidos)**: funciona como um único bloco de abertura. A faixa de clientes é visualmente um "cinto" que continua o navy do hero antes de a página clarear pela primeira vez na seção de Serviços, reforçando que a prova social pertence ao mesmo momento de impacto inicial.
- **Fechamento (Portfólio, CTA e Rodapé majoritariamente escuros)**: o Portfólio usa navy para fazer as fotos coloridas dos stands saltarem visualmente (ver risco "excesso de cor no portfólio" abaixo). O Manifesto respira em off-white entre o Portfólio e o CTA para dar uma pausa de leitura antes do pedido de conversão. O CTA final e o Rodapé voltam ao escuro para fechar a página com a mesma energia do Hero, criando simetria entre abertura e fechamento.

---

## 1. Header fixo

**Objetivo**: manter a marca presente e o caminho para pedir orçamento sempre acessível, sem competir visualmente com o hero.

**Layout desktop**: uma linha, altura 72px. Logo à esquerda, menu centro/direita (Serviços, Processo, Portfólio, Clientes, Contato), botão "Solicitar orçamento" na extremidade direita.
**Layout mobile** (< 768px): logo à esquerda, ícone de menu (hamburger) à direita. Ao abrir, painel cobre a tela com os mesmos itens empilhados e o botão de orçamento no final do painel.

**Fundo**: transparente sobre o hero. Ao ultrapassar a altura do hero menos 80px de scroll, o header assume fundo off-white sólido com `--shadow-header`.

**Tokens de cor**: estado inicial, texto e logo em branco sobre a foto do hero. Estado com scroll, texto em `--color-text`, botão com `--color-primary` (teal) e hover em `--color-primary-hover`.

**Tipografia**: itens de menu em Montserrat, `--text-button` (0.875rem, weight 600, tracking 0.02em). Botão de orçamento no mesmo token.

**Imagens**: `assets/brand/logo/svg/logo-horizontal-branca.svg` no estado inicial, `assets/brand/logo/svg/logo-horizontal-colorido.svg` no estado com scroll.

**Copy**: itens de menu "Serviços", "Processo", "Portfólio", "Clientes", "Contato". Botão "Solicitar orçamento" (esta é a única label de CTA de pedido de orçamento usada em toda a página: header, hero e CTA final repetem o mesmo texto, nunca uma variação como "Fale conosco" ou "Peça seu orçamento").

**Animação**: transição de `background-color` e troca de logo ao cruzar o limite de scroll, feedback de estado (não decoração), duração `--transition-base` (240ms). Implementado com um listener leve de scroll via `requestAnimationFrame` throttle ou `IntersectionObserver` em um marcador no fim do hero (preferível, mais barato que calcular `scrollY` a cada frame).

---

## 2. Hero dividido

**Objetivo**: comunicar em segundos o que a empresa faz e abrir dois caminhos imediatos, pedir orçamento ou ver prova (portfólio), sem ampliar uma foto provisória além da sua resolução real.

**Layout desktop**: hero dividido em duas metades, `min-h-[100dvh]`. Metade esquerda em navy sólido com o conteúdo de texto (headline, apoio, dois CTAs). Metade direita com a foto do stand em retrato, ocupando a altura do hero, exibida na largura nativa dela, sem ampliação. Atrás do texto, na metade esquerda, o render wireframe do stand (`assets/img/hero/render-stand-perego-wireframe-light.png`) aparece como textura em traço claro e opacidade baixa: o projeto de um lado, o stand pronto do outro.
**Layout mobile**: foto no topo com altura limitada (não ocupa a tela inteira), texto abaixo em navy sólido, mesma ordem de leitura (foto primeiro, depois headline, apoio e CTAs).

**Fundo**: metade esquerda `--color-navy` sólido com a textura wireframe atrás do texto. Metade direita, a foto `stand-perego-correct-feira-p03.jpeg` com overlay navy leve, só para unificar o tom com o resto da página, não para esconder a foto.

**Tokens de cor**: headline e apoio em `--color-off-white`. CTA primário em `--color-primary` com `--color-primary-hover-on-dark` no hover (seção é fundo escuro). CTA secundário em contorno, texto off-white, borda off-white translúcida. Textura wireframe em `--color-mint` ou off-white, opacidade baixa.

**Tipografia**: headline em `--font-display` / `--text-h1` / `--weight-h1`. Apoio em `--font-body` / `--text-lead`. Botões em `--text-button`.

**Imagens**:
- `stand-perego-correct-feira-p03.jpeg` [PROVISÓRIA, 1081x1440 reais]. Exibida na metade direita do hero na sua resolução nativa, sem ampliação (`object-fit: contain` ou largura do container travada em 1081px com `--color-navy` preenchendo qualquer excedente). Overlay navy leve por cima, só para unificar o tom.
- `render-stand-perego-wireframe-light.png` (convertido a partir de `render-stand-perego-wireframe-p01.png`, salvo em `assets/img/hero/`, nunca sobrescrever o original): traço claro (mint ou off-white) sobre fundo transparente, usado como textura de baixa opacidade atrás do texto na metade esquerda.

**Copy**:
- Headline: "Transformamos sua presença em feiras e eventos."
- Apoio: "Há [ANOS] anos criando projetos e experiências que geram resultados."
- CTA primário: "Solicitar orçamento" (abre WhatsApp via `wa.me`, número de `js/config.js`).
- CTA secundário: "Ver projetos" (âncora para `#portfolio`).

**Animação**: único momento coreografado de carregamento da página. Headline revela por linha (clip/mask, cada linha sobe com leve atraso, aproximadamente 600 a 800ms, ease de saída). Apoio e os dois CTAs entram em seguida com fade e leve translateY, stagger de 80ms entre eles. Gatilho: carregamento da página (`DOMContentLoaded` ou após fontes carregarem). Reduced motion: todo o conteúdo aparece no estado final, sem transform.

**Nota de evolução futura**: o contador "01, 02, 03" de slides da referência `ref-01-tokyo.png` fica planejado como evolução futura, quando houver fotos originais suficientes para um hero com slider. Hoje o hero é uma foto única, sem slider, porque a foto disponível é provisória e múltiplas fotos provisórias no mesmo carrossel amplificariam o problema de qualidade em vez de resolvê-lo.

---

## 3. Faixa de clientes (marquee)

**Objetivo**: estabelecer credibilidade imediata mostrando quem já confiou na empresa, sem depender de logos de baixa resolução.

**Layout desktop e mobile**: faixa horizontal full-width, altura compacta (entre 96px e 120px). Os 8 nomes de clientes em marquee contínuo (lista duplicada para o loop não ter costura visível), separados por espaçamento generoso e o símbolo decorativo do kit entre os nomes.

**Fundo**: `--color-navy-deck` (continuação do navy do hero).

**Tokens de cor**: texto em `--color-off-white`.

**Tipografia**: Bebas Neue, tamanho médio (`--text-h4` aproximadamente), tracking levemente aberto.

**Imagens**: `assets/brand/logo/svg/simbolo-branco.svg` em tamanho pequeno, como separador entre os nomes. Nunca usar o PNG extraído do PDF (`simbolo-decorativo-p01.png`) aqui, o SVG do kit é vetor limpo e já pensado para fundo escuro.

**Copy**: nomes exatamente como aprovados em `CLAUDE.md`, "Perego / Lentes Correct", "Almata Química", "Kerootica", "Obra Prima", "KX3", "Metalring / AGEL", "Geloni", "Schultz". Sem rótulo de seção adicional (ver princípio de "sem eyebrow").

**Animação**: `translateX` em loop infinito, velocidade constante, ciclo de 40 a 60 segundos. Pausa no hover (desktop) para permitir leitura de um nome específico. Reduced motion: marquee para e a lista vira um grid estático com quebra de linha (`flex-wrap`), continua legível sem movimento.

---

## 4. Serviços

**Objetivo**: mostrar as 4 frentes de atuação e deixar claro o escopo do que a empresa faz, sem depender de fotos que não existem para dois dos quatro serviços.

**Layout desktop**: seção tipográfica, grid 2x2. Cada bloco tem o nome do serviço em Bebas grande e uma frase curta abaixo, separados dos vizinhos por hairline (`--color-border`). Sem foto, sem ícone, sem card com sombra, a tipografia é o próprio conteúdo visual.
**Layout mobile**: 1 coluna, os 4 blocos empilhados, hairline entre eles.

**Fundo da seção**: `--color-off-white`.

**Tokens de cor**: título de seção e títulos dos blocos em `--color-text`. Frase curta de cada bloco em `--color-text` com opacidade reduzida.

**Tipografia**: título de seção "Serviços" em `--font-display` / `--text-h2`. Título de cada bloco em `--font-display` / `--text-h4`. Frase curta em `--font-body` / `--text-body`.

**Imagens**: nenhuma. Decisão deliberada, ver "Três decisões" abaixo: a seção vira tipográfica em vez de usar fotos de stands genéricos para representar Quiosques e Cenografia, que não têm nenhuma foto correspondente no inventário.

**Copy** (frase de cada serviço adicionada ao conteúdo aprovado em `CLAUDE.md`, vinda do site atual):
- "Stands": "Transforme sua ideia em exposição e atraia a atenção do público."
- "Quiosques": "Exponha seus produtos e serviços e conquiste mais clientes."
- "Feiras e Eventos": "Conte conosco como sua montadora oficial."
- "Cenografia": "Desde shows a feiras comerciais, a estrutura que seu evento precisa."

**Animação**: entrada em viewport com fade e leve translateY, stagger de 80ms entre os 4 blocos, dispara uma vez. Sem hover elaborado, só mudança discreta de cor no hairline do bloco sob o cursor (desktop). Reduced motion: blocos aparecem no estado final, sem fade/translate.

---

## 5. Diferenciais

**Objetivo**: justificar a escolha da Conceito com evidência fotográfica real de produção, não com adjetivos genéricos.

**Layout desktop**: 3 linhas, uma por diferencial, cada uma com uma foto pequena de produção e o texto ao lado, em composição deslocada (direção ref-03): a linha 1 tem foto à esquerda e texto à direita, a linha 2 inverte (texto à esquerda, foto à direita), a linha 3 volta a foto à esquerda. As fotos e os blocos de texto têm leve deslocamento vertical entre si (não alinhados em grade perfeita). Hairline (`--color-border`) separa as 3 linhas. Sem numeração, os diferenciais são 3 razões paralelas, não uma sequência.
**Layout mobile**: para as 3 linhas, mesma ordem (foto em cima, full-width, texto embaixo), sem inversão, hairlines mantidos entre os itens.

**Fundo**: `--color-navy-deck`.

**Tokens de cor**: título de seção em `--color-off-white`. Título de cada diferencial em `--color-mint` (permitido porque são títulos curtos e grandes, não texto pequeno, respeitando a regra do token). Corpo do texto em `--color-off-white` com opacidade reduzida (aproximadamente 85%).

**Tipografia**: título de seção "Por que a Conceito" em `--text-h2`. Título de cada diferencial em `--text-h5`. Corpo em `--font-body` / `--text-body`.

**Imagens**, uma foto de produção por diferencial, todas PROVISÓRIAS:
- Gráfica interna: `producao-marcenaria-corte-p02.jpeg` (908x1210, card ok). Marceneiro cortando material, reforça o controle sobre a produção.
- Estruturas modernas: `producao-montagem-parafusadeira-p02.jpeg` (908x1210, card ok). Montagem de estrutura em MDF, reforça o processo de construção.
- Equipe dedicada: `producao-equipe-tablet-p02.jpeg` (908x1210, card ok). Equipe revisando o projeto em tablet, reforça o acompanhamento do início ao fim.

Overlay navy leve em todas (opacidade reduzida, aproximadamente 0.3), porque são fotos de ambiente neutro de oficina, sem cores de cliente competindo.

**Copy** (aprovado, travessões trocados por dois pontos conforme regra do projeto):
- "Gráfica interna: controle total sobre materiais, cores e acabamento para garantir a identidade da marca do cliente."
- "Estruturas modernas: projetos impactantes que aumentam engajamento e destacam a empresa."
- "Equipe dedicada: do início ao fim do projeto, com pontualidade e confiabilidade."

**Animação**: cada linha entra com fade e leve translateX (16px, direção alternando com a inversão do layout), ao cruzar 70% do viewport, stagger entre as 3 linhas, dispara uma vez. Reduced motion: as 3 linhas aparecem no estado final, sem fade/translate.

---

## 6. Processo

**Objetivo**: reduzir a incerteza do comprador mostrando um processo claro, do briefing à entrega. Esta é a única seção da página que é genuinamente uma sequência, por isso é a única que leva numeração.

**Layout desktop**: linha do tempo horizontal, 4 etapas em colunas iguais conectadas por uma linha fina com barra de progresso teal que preenche conforme o scroll da seção avança.
**Layout mobile**: linha do tempo vertical, mesma barra de progresso na lateral esquerda, etapas empilhadas.

**Fundo**: `--color-off-white`.

**Tokens de cor**: ícones em `--color-navy`. Linha base em `--color-border` com opacidade baixa. Barra de progresso ativa em `--color-primary` (teal). Número de cada etapa em `--color-navy` com opacidade baixa, como marca d'água atrás do ícone (não usar `--color-mint` aqui: o fundo da seção é off-white, claro, e `assets/brand/css/contrastes.json` confirma que mint sobre off-white fica bem abaixo do mínimo de contraste, a regra de "mint só em fundo escuro" do `CLAUDE.md` vale mesmo para uso decorativo).

**Tipografia**: título de seção "Como funciona" em `--text-h2`. Título de cada etapa em `--text-h5`. Descrição em `--font-body` / `--text-body`.

**Imagens**: `assets/brand/graficos/01-briefing.svg`, `02-projeto.svg`, `03-producao-montagem.svg`, `04-entrega-pronta.svg`. Sem fotos nesta seção, mantém o ritmo leve depois do bloco escuro de Diferenciais.

**Copy** (aprovado):
1. Briefing: "Entendemos seus objetivos de participação na feira."
2. Projeto: "Design estratégico e personalizado."
3. Produção e Montagem: "Processo completo da construção do stand."
4. Entrega Pronta: "Você só precisa chegar e aproveitar o evento."

**Animação**: barra de progresso anima de 0% a 100% (largura no desktop, altura no mobile) conforme o usuário rola pela seção, via GSAP ScrollTrigger com `scrub` atrelado à posição da seção (sem necessidade de pin). Cada ícone acende (opacidade 0.4 a 1, leve scale) no momento exato em que a barra o alcança, sincronizado ao scrub, não por entrada em viewport. Reduced motion: barra aparece já preenchida a 100%, todos os ícones no estado final, sem scrub.

---

## 7. Portfólio

**Objetivo**: provar com exemplos reais e variados que a empresa entrega stands de qualidade para marcas diferentes. Esta seção é a decisão de compra, feita por imagem, não por texto.

**Layout desktop**: grid assimétrico tipo bento, células de tamanhos variados (não um grid uniforme), cada stand em cor total. Legenda com o nome do cliente abaixo da foto, fora da imagem, nunca sobreposta (evita duplicar a legenda que já está impressa em algumas fotos e evita o padrão de "pill sobre imagem").
**Layout mobile**: grid colapsa para 1 a 2 colunas, mantendo a proporção das fotos.

**Fundo**: `--color-navy`. Funciona como um fundo neutro escuro que faz as fotos coloridas e heterogêneas dos stands se destacarem, em vez de brigarem entre si ou com a página (ver risco "excesso de cor no portfólio" abaixo).

**Tokens de cor**: título de seção em `--color-off-white`. Legenda de cada foto em `--color-off-white`.

**Tipografia**: título de seção "Portfólio" em `--text-h2`. Legenda de cliente em `--font-body` / `--text-caption`, weight 600.

**Imagens** (8 clientes aprovados, todos cobertos por pelo menos uma foto candidata):
- Perego / Lentes Correct: `stand-perego-correct-feira-alt-p05.jpeg` (721x960, abaixo do mínimo de card, PROVISÓRIA). Usar em célula pequena do bento, não em célula grande.
- KX3: `stand-kx3-p05.jpeg` (1210x681, card ok, PROVISÓRIA). Célula grande.
- Metalring / AGEL: `stand-metalring-agel-p05.jpeg` (1210x681, card ok, PROVISÓRIA). Célula grande.
- Almata Química: `stand-almata-quimica-feicon2026-p05.png` (1013x1266, PROVISÓRIA). **[RECORTE NECESSÁRIO]** a legenda "ALMATA QUÍMICA | FEICON 2026" está impressa no rodapé da foto, sobre o piso, fora da área do stand. Recorte da faixa inferior é viável sem cortar o stand.
- Obra Prima: `stand-obra-prima-expoapras2026-p05.png` (1013x1266, PROVISÓRIA). **[RECORTE NECESSÁRIO]**, legenda no rodapé sobre o piso azul, mesmo tratamento.
- Schultz: `stand-schultz-maxtech-p05.png` (1013x1266, PROVISÓRIA). **[RECORTE NECESSÁRIO]**, legenda no rodapé inferior esquerdo, mesmo tratamento.
- Keroótica: `stand-kerootica-expooptica2026-p05.png` (1013x1266, PROVISÓRIA). **[RECORTE NECESSÁRIO]**, legenda no rodapé inferior esquerdo, mesmo tratamento.
- Geloni: `stand-geloni-expoapras2026-p05.png` (1013x1266, PROVISÓRIA). **[RECORTE NECESSÁRIO]**, legenda no rodapé inferior, mesmo tratamento.

Em todas as 5 fotos com legenda impressa, a legenda ocupa a faixa inferior sobre o piso do estande, não sobre a estrutura do stand em si, então o recorte deve preservar o stand inteiro. Confirmar visualmente o crop exato na implementação. Se em algum caso o recorte cortar parte relevante do stand, essa foto fica de fora do portfólio e o lugar dela vira **[FOTO PENDENTE]**, nunca entra uma versão com a legenda duplicada.

**Copy**: legenda de cada foto é só o nome do cliente, como já aprovado em `CLAUDE.md`.

**Animação**: entrada em grid com fade e leve scale (0.97 a 1), stagger de 40ms entre células, dispara uma vez ao entrar no viewport. Hover desktop: leve scale na foto (1.03) como indicação de interatividade. Reduced motion: grid aparece no estado final, sem fade/scale de entrada e sem scale no hover.

---

## 8. Manifesto / missão

**Objetivo**: consolidar a mensagem de confiança antes do CTA final, preparando o terreno emocional para o pedido de orçamento.

**Layout desktop**: frase grande alinhada à esquerda, bem respirada (direção ref-03), marca d'água "CONCEITO" vazada posicionada atrás do texto, grande e sutil, levemente cortada pelas bordas da seção para dar sensação de escala.
**Layout mobile**: mesma estrutura, texto menor, marca d'água reduzida ou apenas parcialmente visível, para não brigar com o texto em telas estreitas.

**Fundo**: `--color-off-white`.

**Tokens de cor**: texto em `--color-text`. Marca d'água em opacidade baixa (aproximadamente 0.06 a 0.08), cor navy.

**Tipografia**: frase em `--font-display`, tamanho grande mas não tão gigante quanto o hero (`--text-h2` ou `--text-h3`, dependendo do comprimento final da frase).

**Imagens**: `assets/brand/graficos/conceito-vazado.svg` como marca d'água de fundo. Não é foto, não precisa de overlay.

**Copy** (aprovado, literal, é a frase de missão do `CLAUDE.md`, falando diretamente com o visitante): "Cuidamos de cada detalhe do projeto, da produção e da montagem para que você foque no que realmente importa: conquistar e encantar seus clientes."

**Animação**: texto revela por linha ao entrar no viewport (clip-path ou mask, cada linha sobe e aparece, stagger de aproximadamente 100ms entre linhas, 500ms cada), simula o ritmo de leitura de um manifesto. A marca d'água permanece estática, é textura de fundo, não anima. Reduced motion: texto aparece no estado final, sem reveal.

---

## 9. CTA final + formulário de orçamento

**Objetivo**: converter a intenção em ação concreta, reduzindo fricção ao montar a mensagem de WhatsApp automaticamente a partir dos dados da feira do visitante.

**Layout desktop**: título e subtítulo no topo, full-width. Abaixo, formulário em 2 colunas de campos (nome / empresa, nome da feira / data do evento, metragem aproximada ocupa a linha toda), botão de envio alinhado à direita ou full-width na última linha.
**Layout mobile**: formulário em 1 coluna, todos os campos empilhados, botão full-width.

**Fundo**: `--color-navy`. Os campos do formulário usam fundo `--color-off-white` (necessário para contraste AA dos inputs, nunca campo navy sobre fundo navy).

**Tokens de cor**: título e subtítulo em `--color-off-white`. Labels dos campos em `--color-text` dentro do campo claro. Botão em `--color-primary` com `--color-primary-hover-on-dark` no hover.

**Tipografia**: título "Pronto para se destacar?" em `--text-h2`. Subtítulo em `--font-body` / `--text-lead`. Labels de campo em `--font-body` / `--text-caption`, weight 600, posicionados acima do input. Botão em `--text-button`.

**Imagens**: nenhuma foto obrigatória, seção funcional com foco total no formulário.

**Copy**:
- Título: "Pronto para se destacar?"
- Subtítulo: "Nossa equipe cuida de tudo, do projeto à desmontagem."
- Campos: "Nome", "Empresa", "Nome da feira", "Data do evento", "Metragem aproximada do stand (m²)".
- Botão: "Solicitar orçamento" (mesma label do header e do hero).
- Texto de ajuda abaixo do botão: "Você será redirecionado ao WhatsApp com a mensagem pronta."

**Comportamento** (sem backend): ao submeter, o formulário monta uma string com os campos preenchidos e abre `https://wa.me/[WHATSAPP]?text=` com a mensagem já codificada, usando o número de `js/config.js`.

**Animação**: nenhuma decorativa. Feedback de interação padrão, foco visível nos campos, leve `scale(0.98)` no botão ao `:active`, troca temporária do texto do botão para "Abrindo WhatsApp." por cerca de 400ms antes do redirecionamento, só para confirmar que o clique foi reconhecido. Reduced motion: mesmo feedback, sem easing elaborado.

---

## 10. Rodapé

**Objetivo**: oferecer todos os canais de contato e navegação secundária, fechar a página com a marca.

**Layout desktop**: 3 a 4 colunas (logo com descrição curta, navegação, contato, redes e endereço), hairline divisório no topo.
**Layout mobile**: colunas empilhadas, logo centralizada no topo.

**Fundo**: `--color-navy-deck`.

**Tokens de cor**: texto em `--color-off-white` com opacidade reduzida (aproximadamente 80%) para o corpo, 100% para os títulos de coluna.

**Tipografia**: logo é imagem. Títulos de coluna em `--font-body` / `--text-caption`, weight 600, caixa alta (única exceção de caixa alta tracked do site inteiro, aceitável aqui por ser convenção de rodapé, não um rótulo decorativo repetido seção a seção). Links e texto em `--text-body`.

**Imagens**: `assets/brand/logo/svg/logo-vertical-branca.svg`.

**Copy**:
- Contato: `[CONTATO NOME]`, `[WHATSAPP]`, `[EMAIL]` (todos via `js/config.js`).
- Instagram: `[INSTAGRAM]`.
- Endereço: `[ENDERECO]`.
- Navegação secundária repete os itens do menu principal: Serviços, Processo, Portfólio, Clientes, Contato.
- Linha de copyright: "[NOME NO TEXTO]. Todos os direitos reservados." com o ano atual gerado dinamicamente em JS, sem placeholder.

**Animação**: nenhuma. Seção estática para não cansar o visitante no fim da página.

---

## 11. Botão flutuante de WhatsApp

**Objetivo**: manter o canal de contato mais usado sempre acessível, sem depender de rolar até o rodapé ou o CTA final.

**Layout**: botão circular fixo no canto inferior direito, desktop e mobile (ajustar margem no mobile para respeitar a área segura do sistema).

**Fundo**: círculo em `--color-primary` (teal).

**Tokens de cor**: ícone em `--color-off-white` sobre o círculo teal (contraste AA verificado).

**Tipografia**: nenhuma visível. Tooltip opcional "Fale conosco" no hover (desktop apenas), `--text-caption`.

**Imagens**: ícone de WhatsApp (arquivo novo, não está no inventário atual, ver lista de pendências de implementação abaixo).

**Copy**: tooltip "Fale conosco" (hover apenas).

**Animação**: aparece com fade depois que o visitante rola além do hero (evita duplicar visualmente os CTAs do hero que já levam ao WhatsApp). Dois pulsos sutis (`scale` 1 a 1.04 a 1) só no momento em que aparece pela primeira vez, chamando atenção uma vez, sem loop perpétuo. Reduced motion: aparece direto, sem fade nem pulso.

---

## Três decisões que tornam esta LP diferente de um template genérico de "empresa de stands"

1. **Nenhum eyebrow tracked-uppercase em nenhuma seção de conteúdo.** Rótulos pequenos em caixa alta acima de cada título são o sinal mais comum de página gerada em série e não acrescentam nada quando o título já está em Bebas Neue gigante. Motivo: a hierarquia tipográfica da própria marca (fonte condensada e grande) já faz esse trabalho, um rótulo redundante só adiciona ruído.

2. **Faixa de clientes em marquee tipográfico, não em logos pequenos.** Os logos de clientes disponíveis no site atual têm 278px de largura e ficariam pixelizados em qualquer destaque maior. Em vez de esconder essa limitação ou usar logos ruins, a faixa de clientes vira um elemento gráfico de identidade: os nomes em Bebas Neue em movimento contínuo. Motivo: transforma uma restrição real de material em uma escolha de estilo deliberada, em vez de mascarar o problema.

3. **Barra de progresso real atrelada ao scroll na seção Processo.** É a única seção da página que é genuinamente sequencial (briefing, projeto, produção, entrega), então é a única que recebe uma metáfora visual literal de avanço: a barra enche conforme o visitante rola. Motivo: reforça a mensagem central "a equipe cuida de tudo do início ao fim" através do próprio comportamento da interface, sem repetir essa frase em texto.

---

## Riscos e como foram tratados

1. **Hero com foto abaixo de 1600px** (`stand-perego-correct-feira-p03.jpeg`, 1081px reais). Tratamento: o hero deixou de ser full-bleed e virou dividido, a foto ocupa só a metade direita na sua resolução nativa (sem ampliação além de 1081px), com `--color-navy` preenchendo qualquer excedente de largura. A metade esquerda é navy sólido com o texto e a textura wireframe, não depende da foto para ter impacto visual. Overlay navy leve só unifica o tom, não precisa esconder nitidez porque a foto nunca é esticada acima do que ela realmente é.

2. **Falta de fotos de Quiosques e Cenografia.** Nenhuma imagem do inventário mostra um quiosque ou uma cenografia de show. Tratamento: a seção de Serviços deixou de depender de foto, virou tipográfica (nome do serviço em Bebas grande e frase curta), então os 4 serviços são tratados com o mesmo peso visual sem forçar uma foto de stand genérica como substituta enganosa para os dois que não têm foto correspondente.

3. **Fotos com legenda impressa** (Almata, Obra Prima, Schultz, Keroótica, Geloni). Tratamento: recorte da faixa inferior onde a legenda está impressa, sempre que isso não cortar o stand. A legenda real do site fica em HTML/CSS, abaixo da foto, nunca sobreposta, evitando que o nome do cliente apareça duas vezes na mesma composição. Quando o recorte não for viável sem cortar o stand, a foto sai do portfólio e vira `[FOTO PENDENTE]` em vez de entrar com a legenda duplicada.

4. **Excesso de cor no portfólio** (paletas muito diferentes entre os stands: laranja da KX3, roxo da Schultz e da Keroótica, amarelo e vermelho da Geloni, azul da Metalring). Tratamento: fundo navy sólido na seção inteira, funcionando como um "passe-partout" escuro de galeria fotográfica, neutralizador comum entre fotos de cores muito diferentes. A variedade de cor continua sendo o argumento (conforme a regra de tratamento de foto do `CLAUDE.md`), sem que as fotos briguem visualmente com o fundo da página.

5. **Placeholders `[ANOS]` e `[NOME NO TEXTO]` em posições de alta visibilidade** (headline e apoio do hero). Tratamento: o placeholder literal fica visível durante todo o desenvolvimento, nunca um número ou nome chutado. O comentário em `js/config.js` aponta a divergência de fonte (site diz uma coisa, apresentação comercial diz outra), para que a troca seja um dos últimos passos antes de publicar.

6. **Formulário sem backend pode parecer quebrado** se o dispositivo do visitante não tiver WhatsApp instalado. Tratamento: uso do link universal `wa.me`, que funciona em desktop abrindo o WhatsApp Web e em mobile abrindo o aplicativo, mais o texto de ajuda avisando o que vai acontecer antes do clique no botão.

---

## Trocar quando chegarem as fotos originais

Lista de todo arquivo provisório usado no plano e onde ele está:

| Arquivo provisório | Onde é usado |
|---|---|
| `stand-perego-correct-feira-p03.jpeg` | Hero, metade direita (seção 2) |
| `render-stand-perego-wireframe-light.png` (derivada de `render-stand-perego-wireframe-p01.png`) | Textura atrás do texto no Hero, metade esquerda (seção 2) |
| `stand-kx3-p05.jpeg` | Célula KX3 no Portfólio (seção 7) |
| `stand-metalring-agel-p05.jpeg` | Célula Metalring/AGEL no Portfólio (seção 7) |
| `producao-marcenaria-corte-p02.jpeg` | Foto do diferencial "Gráfica interna" (seção 5) |
| `producao-montagem-parafusadeira-p02.jpeg` | Foto do diferencial "Estruturas modernas" (seção 5) |
| `producao-equipe-tablet-p02.jpeg` | Foto do diferencial "Equipe dedicada" (seção 5) |
| `stand-perego-correct-feira-alt-p05.jpeg` | Célula Perego/Correct no Portfólio, miniatura (seção 7) |
| `stand-almata-quimica-feicon2026-p05.png` (recortada) | Célula Almata Química no Portfólio (seção 7) |
| `stand-obra-prima-expoapras2026-p05.png` (recortada) | Célula Obra Prima no Portfólio (seção 7) |
| `stand-schultz-maxtech-p05.png` (recortada) | Célula Schultz no Portfólio (seção 7) |
| `stand-kerootica-expooptica2026-p05.png` (recortada) | Célula Keroótica no Portfólio (seção 7) |
| `stand-geloni-expoapras2026-p05.png` (recortada) | Célula Geloni no Portfólio (seção 7) |

A seção de Serviços (seção 4) não usa mais fotos, é tipográfica, então não há pendência de imagem ali.

**Pendência de implementação, não de conteúdo**: o ícone de WhatsApp do botão flutuante (seção 11) ainda não existe nos assets do projeto e precisa ser adicionado como SVG simples na hora da implementação.
