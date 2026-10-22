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

  // ---------- 1. Hero: timeline única de carregamento ----------

  function initHero() {
    var headline = document.querySelector(".hero__headline");
    var lede = document.querySelector(".hero__lede");
    var actions = document.querySelectorAll(".hero__actions .btn");
    var media = document.querySelector(".hero__media img");
    var wireframe = document.querySelector(".hero__wireframe");
    if (!headline) return;

    SplitText.create(headline, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: function (self) {
        var tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(self.lines, { yPercent: 110, duration: 0.9, stagger: 0.08 }, 0);

        if (lede) {
          tl.from(lede, { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.5");
        }
        if (actions.length) {
          tl.from(actions, { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.08 }, "-=0.35");
        }
        if (media) {
          tl.from(media, { scale: 1.06, duration: 1.4, ease: "power2.out" }, 0);
        }
        if (wireframe) {
          gsap.set(wireframe, { opacity: 0 });
          tl.to(wireframe, { opacity: 0.6, duration: 1.3, ease: "sine.out" }, 0.1);
        }

        return tl;
      },
    });
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
    gsap.utils.toArray(".diferencial").forEach(function (row, i) {
      var media = row.querySelector(".diferencial__media");
      var img = media ? media.querySelector("img") : null;
      var text = row.querySelector(".diferencial__text");
      var photoFromLeft = i !== 1; // a 2ª linha é row-reverse (foto fica à direita).

      var tl = gsap.timeline({
        scrollTrigger: { trigger: row, start: "top 75%", once: true },
      });

      if (isDesktop) {
        tl.from(media, { autoAlpha: 0, x: photoFromLeft ? -48 : 48, duration: 0.7, ease: "power3.out" }).from(
          text,
          { autoAlpha: 0, y: 20, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        );
      } else {
        tl.from(media, { autoAlpha: 0, y: 24, duration: 0.5, ease: "power2.out" }).from(
          text,
          { autoAlpha: 0, y: 16, duration: 0.4, ease: "power2.out" },
          "-=0.2"
        );
      }

      if (isDesktop && img) {
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

    var lights = document.querySelectorAll(".process__icon, .process__number");
    gsap.set(lights, { opacity: 0.35 });

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
        { opacity: 1, duration: 0.06, ease: "none" },
        pos
      );
    });
  }

  // ---------- 7. Portfólio: fade + scale, stagger 40ms, uma vez + parallax nas fotos largas ----------

  function initPortfolio(isDesktop) {
    var items = gsap.utils.toArray(".portfolio__item");
    revealOnce(
      items,
      { autoAlpha: 0, scale: 0.97, duration: 0.5, ease: "power2.out", stagger: 0.04 },
      { trigger: ".portfolio__grid", start: "top 85%" }
    );

    if (isDesktop) {
      gsap.utils.toArray(".portfolio__item--wide .portfolio__frame img").forEach(function (img) {
        // Desliga a transição CSS de hover para o scrub não brigar com ela.
        gsap.set(img, { scale: 1.1, transition: "none" });
        gsap.to(img, {
          y: 24,
          ease: "none",
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 0.6 },
        });
      });
    }
  }

  // ---------- 8. Manifesto: palavra por palavra em scrub + parallax horizontal na marca d'água ----------

  function initManifesto() {
    var quote = document.querySelector(".manifesto__quote");
    var watermark = document.querySelector(".manifesto__watermark");

    if (quote) {
      SplitText.create(quote, {
        type: "words",
        autoSplit: true,
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

  // ---------- 10. Botão flutuante do WhatsApp: dois pulsos só na primeira aparição ----------
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

      fontsReady.then(function () {
        initHero();
        initSectionHeadings();
        initServices();
        initDiferenciais(conditions.isDesktop);
        initProcesso(conditions.isDesktop);
        initPortfolio(conditions.isDesktop);
        initManifesto();
        initWhatsappPulse();
        // Sem refresh() aqui: refreshAfterAssets() já faz o único recálculo
        // necessário, depois que fontes E imagens terminarem de carregar.
      });
    }
  );

  refreshAfterAssets();
})();
