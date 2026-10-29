(function () {
  "use strict";

  // Progressive enhancement: se o GSAP (ou ScrollTrigger/SplitText) não carregar,
  // esta função inteira some e a página fica exatamente como o HTML/CSS renderiza,
  // inteira e legível, sem nada escondido.
  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined" ||
    typeof SplitText === "undefined"
  ) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);
  document.documentElement.classList.add("js-anim");

  var fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

  // Fade/scale de entrada, uma vez, ao cruzar a viewport: usado por serviços e portfólio.
  function revealOnce(items, vars, triggerVars) {
    if (!items.length) return;
    var tweenVars = Object.assign({}, vars, {
      scrollTrigger: Object.assign({ once: true }, triggerVars),
    });
    gsap.from(items, tweenVars);
  }

  // ---------- Header: esconde ao rolar para baixo, mostra ao rolar para cima ----------
  // Só troca uma classe (transform, ver css/style.css); a cor (header--scrolled)
  // continua feita por IntersectionObserver em js/main.js, sem relação com isto.
  // Perto do topo (scroll < 120px) ou com o painel mobile aberto, nunca esconde.

  function initHeaderHide() {
    var header = document.querySelector(".header");
    if (!header) return;

    ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: function (self) {
        if (document.body.classList.contains("nav-open")) return;
        if (self.scroll() < 120) {
          header.classList.remove("header--hidden");
          return;
        }
        header.classList.toggle("header--hidden", self.direction === 1);
      },
    });
  }

  // ---------- 1. Hero: vídeo e wireframe de fundo ----------
  // Título, linha de apoio e CTAs NÃO entram aqui: a entrada deles é CSS puro
  // (ver .hero__headline-line-inner, .hero__lede e .hero__actions .btn em
  // css/style.css), rodando desde o primeiro quadro sem esperar GSAP/fontes.
  // Isso corrige o LCP, que antes só pintava quando SplitText terminava.

  function initHero() {
    var wireframe = document.querySelector(".hero__wireframe");
    if (!wireframe) return;

    var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // O video permanece no enquadramento final desde o primeiro quadro.
    if (wireframe) {
      gsap.set(wireframe, { opacity: 0 });
      tl.to(wireframe, { opacity: 0.6, duration: 1.3, ease: "sine.out" }, 0.1);
    }
  }

  // ---------- 1b. Hero: saída (parallax/fade) ao rolar para fora ----------
  // Só a saída. O H1 não entra aqui (regra do projeto: nunca animar o H1 via
  // JS), só o vídeo/wireframe e a linha de apoio + CTAs, enquanto o hero
  // inteiro sai da tela rolando.

  function initHeroExit() {
    var hero = document.querySelector(".hero");
    var media = document.querySelector(".hero__media");
    var wireframe = document.querySelector(".hero__wireframe");
    var lede = document.querySelector(".hero__lede");
    var actions = document.querySelector(".hero__actions");
    if (!hero) return;

    var tl = gsap.timeline({
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
    });

    if (media) tl.to(media, { y: 40, autoAlpha: 0.5, ease: "none" }, 0);
    if (wireframe) tl.to(wireframe, { autoAlpha: 0, ease: "none" }, 0);
    if (lede || actions) {
      tl.to([lede, actions].filter(Boolean), { y: -20, autoAlpha: 0, ease: "none" }, 0);
    }
  }

  // ---------- 3. Títulos de seção (h2): revelação por linha, uma vez ----------

  function initSectionHeadings() {
    gsap.utils.toArray(".section__heading").forEach(function (heading) {
      SplitText.create(heading, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: function (self) {
          return gsap.from(self.lines, {
            yPercent: 100,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              once: true,
            },
          });
        },
      });
    });
  }

  // ---------- 4. Serviços: 4 blocos, fade + translateY, stagger 80ms, uma vez ----------

  function initServices() {
    var items = gsap.utils.toArray(".service");
    revealOnce(
      items,
      { autoAlpha: 0, y: 24, duration: 0.6, ease: "power2.out", stagger: 0.08 },
      { trigger: ".services__grid", start: "top 80%" }
    );
  }

  // ---------- 5. Diferenciais: entrada por linha a 75% + parallax interno na foto ----------

  function initDiferenciais(isDesktop) {
    // No mobile os cards viraram um carrossel horizontal: uma entrada disparada
    // por scroll vertical (e o parallax interno) não fazem sentido mais ali.
    if (!isDesktop) return;

    gsap.utils.toArray(".diferencial").forEach(function (row, i) {
      var media = row.querySelector(".diferencial__media");
      var img = media ? media.querySelector("img") : null;
      var text = row.querySelector(".diferencial__text");
      var photoFromLeft = i !== 1; // a 2ª linha é row-reverse (foto fica à direita).

      var tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: "top 75%", once: true },
      });

      tl.from(media, { autoAlpha: 0, x: photoFromLeft ? -48 : 48, duration: 0.7, ease: "power3.out" }).from(
        text,
        { autoAlpha: 0, y: 20, duration: 0.5, ease: "power2.out" },
        "-=0.35"
      );

      if (img) {
        gsap.set(img, { scale: 1.15 });
        gsap.to(img, {
          y: 36,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      }
    });
  }

  // ---------- 6. Processo: barra de progresso em scrub, etapas acendem com ela ----------

  function initProcesso(isDesktop) {
    var track = document.querySelector(".process__track");
    var bar = document.querySelector(".process__progress");
    var steps = gsap.utils.toArray(".process__step");
    if (!track || !bar || !steps.length) return;

    var icons = document.querySelectorAll(".process__icon");
    var numbers = document.querySelectorAll(".process__number");
    gsap.set(icons, { opacity: 0.35 });
    // 0.88, não 0.35: span.process__number é texto real (ícone é só
    // decorativo). Em 0.35 o teal sobre o fundo claro cai pra 1.73:1 de
    // contraste; 0.88 é o mínimo que garante AA (4.5:1) nesse par de cores.
    gsap.set(numbers, { opacity: 0.88 });
    gsap.set(icons, { scale: 0.82 });

    var axisProp = isDesktop ? "scaleX" : "scaleY";
    gsap.set(bar, { transformOrigin: isDesktop ? "left" : "top" });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: track,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 0.5,
      },
    });

    var barFrom = {};
    barFrom[axisProp] = 0;
    var barVars = { ease: "none", duration: 1 };
    barVars[axisProp] = 1;
    tl.fromTo(bar, barFrom, barVars, 0);

    steps.forEach(function (step, i) {
      var pos = gsap.utils.mapRange(0, Math.max(steps.length - 1, 1), 0.1, 0.9, i);
      tl.to(
        step.querySelectorAll(".process__icon, .process__number"),
        { opacity: 1, duration: 0.08, ease: "none" },
        pos
      ).to(
        step.querySelectorAll(".process__icon"),
        { scale: 1, duration: 0.08, ease: "back.out(2)" },
        pos
      );
    });
  }

  // ---------- 7. Portfólio: revelação com clip-path, uma vez por item ----------
  // Mobile (lista vertical) e desktop (bento) revelam igual, cada um com seu
  // próprio gatilho. Sem zoom/parallax na foto: aqui as fotos aparecem
  // inteiras, sem corte (ver .portfolio__item .portfolio__frame img em
  // css/style.css), então deslocar a imagem por dentro do card distorceria
  // esse enquadramento deliberado.
  // Itens que só existem depois do clique em "Ver mais projetos" ficam de
  // fora: com display:none no load, o ScrollTrigger não consegue medir a
  // posição deles (ficariam presos invisíveis); eles já têm seu próprio fade
  // em js/main.js quando revelados.

  function initPortfolio(isDesktop) {
    var items = gsap.utils.toArray(".portfolio__item").filter(function (item) {
      return window.getComputedStyle(item).display !== "none";
    });
    if (!items.length) return;

    function addReveal(item, position, timeline) {
      var frame = item.querySelector(".portfolio__frame");
      timeline.from(item, { autoAlpha: 0, y: 16, duration: 0.5, ease: "power2.out" }, position);
      if (frame) {
        timeline.from(
          frame,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "power2.out" },
          position
        );
      }
    }

    if (isDesktop) {
      var tl = gsap.timeline({
        scrollTrigger: { trigger: ".portfolio__grid", start: "top 85%", once: true },
      });
      items.forEach(function (item, i) {
        addReveal(item, i * 0.08, tl);
      });
    } else {
      items.forEach(function (item) {
        var itemTl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
        addReveal(item, 0, itemTl);
      });
    }
  }

  // ---------- Portfólio mobile: "Ver mais projetos" muda a altura da página ----------
  // As fotos reveladas empurram o Manifesto, o CTA e o Rodapé para baixo, então
  // os ScrollTriggers deles (medidos no load, antes desse bloco existir) ficam
  // desatualizados. O atraso casa com o fade de 300ms feito em js/main.js.

  function initPortfolioExpandRefresh() {
    var moreBtn = document.querySelector(".portfolio__more");
    if (!moreBtn) return;
    moreBtn.addEventListener("click", function () {
      window.setTimeout(function () {
        ScrollTrigger.refresh();
      }, 340);
    });
  }

  // ---------- 8. Manifesto: palavra por palavra em scrub + parallax horizontal na marca d'água ----------

  function initManifesto() {
    var quote = document.querySelector(".manifesto__quote");
    var watermark = document.querySelector(".manifesto__watermark");

    if (quote) {
      SplitText.create(quote, {
        type: "words",
        autoSplit: true,
        // aria:"none" evita o aria-label (texto duplicado) que o SplitText
        // injetaria por padrão no elemento original; sem aria-hidden nas
        // palavras, o texto real continua exposto e legível por leitor de tela.
        aria: "none",
        onSplit: function (self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.15 },
            {
              opacity: 1,
              ease: "none",
              stagger: { each: 0.4, from: "start" },
              scrollTrigger: {
                trigger: quote,
                start: "top 80%",
                end: "bottom 45%",
                scrub: 0.5,
              },
            }
          );
        },
      });
    }

    if (watermark) {
      gsap.to(watermark, {
        x: 60,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }
  }

  // ---------- 9. CTA final: título, apoio e botão com mais presença, uma vez ----------

  function initCta() {
    var head = document.querySelector(".cta__head");
    var submitRow = document.querySelector(".cta__submit-row");
    if (!head && !submitRow) return;

    var tl = gsap.timeline({
      scrollTrigger: { trigger: "#contato", start: "top 70%", once: true },
    });

    if (head) {
      tl.from(head.children, { autoAlpha: 0, y: 24, duration: 0.6, ease: "power2.out", stagger: 0.1 });
    }
    if (submitRow) {
      tl.from(submitRow, { autoAlpha: 0, y: 16, duration: 0.5, ease: "power2.out" }, head ? "-=0.2" : 0);
    }
  }

  // ---------- 10. Rodapé: colunas com entrada suave, uma vez ----------

  function initFooter() {
    var grid = document.querySelector(".footer__grid");
    if (!grid) return;
    revealOnce(
      gsap.utils.toArray(grid.children),
      { autoAlpha: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.06 },
      { trigger: grid, start: "top 85%" }
    );
  }

  // ---------- 11. Botão flutuante do WhatsApp: dois pulsos só na primeira aparição ----------
  // (o fade/aparecer e sumir já é feito via classe CSS em js/main.js; aqui só o pulso.)

  function initWhatsappPulse() {
    var fab = document.querySelector(".whatsapp-fab");
    var sentinel = document.getElementById("hero-sentinel");
    if (!fab || !sentinel || !("IntersectionObserver" in window)) return;

    var pulsed = false;
    var observer = new IntersectionObserver(
      function (entries) {
        if (!entries[0].isIntersecting && !pulsed) {
          pulsed = true;
          gsap.fromTo(
            fab,
            { scale: 1 },
            { scale: 1.12, duration: 0.35, ease: "power1.inOut", yoyo: true, repeat: 3 }
          );
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
  }

  // ---------- Atualiza o ScrollTrigger depois que fontes e imagens carregarem ----------

  function refreshAfterAssets() {
    var images = Array.prototype.slice.call(document.images);
    var imagePromises = images.map(function (img) {
      if (img.complete) return Promise.resolve();
      return new Promise(function (resolve) {
        img.addEventListener("load", resolve, { once: true });
        img.addEventListener("error", resolve, { once: true });
      });
    });

    Promise.all([fontsReady].concat(imagePromises)).then(function () {
      ScrollTrigger.refresh();
    });
  }

  // ---------- gsap.matchMedia: reduced motion, mobile (<768px) e desktop ----------

  var mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    function (context) {
      var conditions = context.conditions;

      // prefers-reduced-motion: nada é escondido, nada anima, nenhum scrub.
      // Como o estado inicial só é aplicado pelas funções abaixo, não chamá-las
      // já deixa tudo no estado final, visível, sem motion nenhum.
      if (conditions.reduceMotion) {
        return;
      }

      initHeaderHide();

      fontsReady.then(function () {
        initHero();
        initHeroExit();
        initSectionHeadings();
        initServices();
        initDiferenciais(conditions.isDesktop);
        initProcesso(conditions.isDesktop);
        initPortfolio(conditions.isDesktop);
        initManifesto();
        initCta();
        initFooter();
        initWhatsappPulse();
        // Sem refresh() aqui: refreshAfterAssets() já faz o único recálculo
        // necessário, depois que fontes E imagens terminarem de carregar.
      });
    }
  );

  initPortfolioExpandRefresh();
  refreshAfterAssets();
})();
