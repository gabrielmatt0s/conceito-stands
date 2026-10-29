(function () {
  "use strict";

  var CFG = window.CONCEITO_CONFIG || {};
  var DEFAULT_MESSAGE = "Olá! Vim pelo site e quero um orçamento de stand.";

  function digitsOnly(value) {
    return (value || "").toString().replace(/\D/g, "");
  }

  function formatDateBR(isoDate) {
    var parts = (isoDate || "").toString().split("-");
    if (parts.length !== 3) return isoDate || "";
    return parts[2] + "/" + parts[1] + "/" + parts[0];
  }

  function buildWhatsAppUrl(message, phone) {
    var digits = digitsOnly(phone || CFG.WHATSAPP_PRINCIPAL);
    var text = encodeURIComponent(message);
    return digits
      ? "https://wa.me/" + digits + "?text=" + text
      : "https://wa.me/?text=" + text;
  }

  function fillPlaceholders() {
    var nodes = document.querySelectorAll("[data-cfg]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-cfg");
      if (Object.prototype.hasOwnProperty.call(CFG, key)) {
        nodes[i].textContent = CFG[key];
      }
    }
  }

  function wireWhatsAppLinks() {
    var links = document.querySelectorAll("[data-wa-link]");
    for (var i = 0; i < links.length; i++) {
      links[i].setAttribute("href", buildWhatsAppUrl(DEFAULT_MESSAGE));
      links[i].setAttribute("target", "_blank");
      links[i].setAttribute("rel", "noopener noreferrer");
    }
  }

  function wireContactLinks() {
    var instaLink = document.querySelector("[data-cfg-instagram]");
    if (instaLink) {
      var handle = (CFG.INSTAGRAM || "").toString().replace("@", "").trim();
      instaLink.setAttribute("href", "https://instagram.com/" + handle);
    }
  }

  function renderFooterContacts() {
    var container = document.querySelector("[data-contatos]");
    if (!container || !Array.isArray(CFG.CONTATOS)) return;

    container.replaceChildren();

    CFG.CONTATOS.forEach(function (contato) {
      var entry = document.createElement("div");
      entry.className = "footer__contact-entry";

      var nome = document.createElement("p");
      nome.className = "footer__contact-nome";
      nome.textContent = contato.nome;
      if (contato.cargo) {
        var cargo = document.createElement("span");
        cargo.className = "footer__contact-cargo";
        cargo.textContent = " · " + contato.cargo;
        nome.appendChild(cargo);
      }
      entry.appendChild(nome);

      var telefoneLink = document.createElement("a");
      telefoneLink.href = buildWhatsAppUrl(DEFAULT_MESSAGE, contato.whatsapp);
      telefoneLink.target = "_blank";
      telefoneLink.rel = "noopener noreferrer";
      telefoneLink.textContent = contato.telefone;
      entry.appendChild(telefoneLink);

      if (contato.email) {
        var emailLink = document.createElement("a");
        emailLink.href = "mailto:" + contato.email;
        emailLink.textContent = contato.email;
        entry.appendChild(emailLink);
      }

      container.appendChild(entry);
    });
  }

  function setFooterYear() {
    var el = document.getElementById("footer-year");
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }

  function setupMobileMenu() {
    var toggle = document.querySelector(".header__menu-toggle");
    var nav = document.getElementById("nav-panel");
    if (!toggle || !nav) return;

    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("nav-open", isOpen);
    });

    var links = nav.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", closeMenu);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  function setupHeaderScroll() {
    var header = document.querySelector(".header");
    var sentinel = document.getElementById("hero-sentinel");
    if (!header || !sentinel || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        header.classList.toggle("header--scrolled", !entries[0].isIntersecting);
      },
      // O hero agora é 72px (--header-h) mais alto que a tela para abrir espaço
      // pro header sólido, então o sentinela (logo depois do hero) descansa 72px
      // além do que a margem de baixo cobre por padrão: expande-a no mesmo valor.
      { rootMargin: "-72px 0px 72px 0px", threshold: 0 }
    );
    observer.observe(sentinel);
  }

  function setupWhatsAppFab() {
    var fab = document.querySelector(".whatsapp-fab");
    var hero = document.querySelector(".hero");
    if (!fab || !hero || !("IntersectionObserver" in window)) {
      if (fab) fab.classList.add("is-visible");
      return;
    }

    // No mobile, o botão flutuante fica em cima do botão de enviar do formulário
    // quando a seção #contato está na tela: esconde nesse caso, só no mobile.
    var contato = document.getElementById("contato");
    var mobileQuery = window.matchMedia("(max-width: 47.99rem)");
    var pastHero = false;
    var inContato = false;

    function updateVisibility() {
      var hideForContato = mobileQuery.matches && inContato;
      fab.classList.toggle("is-visible", pastHero && !hideForContato);
    }

    var heroObserver = new IntersectionObserver(
      function (entries) {
        pastHero = !entries[0].isIntersecting;
        updateVisibility();
      },
      { threshold: 0 }
    );
    heroObserver.observe(hero);

    if (contato) {
      var contatoObserver = new IntersectionObserver(
        function (entries) {
          inContato = entries[0].isIntersecting;
          updateVisibility();
        },
        { threshold: 0 }
      );
      contatoObserver.observe(contato);
    }
  }

  // Vídeo do hero: toca em loop mudo, com um botão de pausa obrigatório
  // (WCAG 2.2.2, conteúdo em movimento com mais de 5s) e pausa/retoma sozinho
  // conforme o hero entra e sai da tela, a menos que o usuário tenha pausado
  // manualmente. Com movimento reduzido ou dados economizados, só o pôster
  // aparece: as fontes são removidas pra nem baixar o vídeo.
  function setupHeroVideo() {
    var video = document.querySelector(".hero__video");
    var toggle = document.querySelector(".hero__video-toggle");
    if (!video) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var saveData = !!(navigator.connection && navigator.connection.saveData);

    if (reduceMotion || saveData) {
      video.querySelectorAll("source").forEach(function (source) {
        source.remove();
      });
      if (toggle) toggle.remove();
      return;
    }

    var userPaused = false;

    function updateToggle(isPlaying) {
      if (!toggle) return;
      toggle.classList.toggle("is-paused", !isPlaying);
      toggle.setAttribute("aria-label", isPlaying ? "Pausar vídeo" : "Reproduzir vídeo");
    }

    if (toggle) {
      toggle.addEventListener("click", function () {
        if (video.paused) {
          userPaused = false;
          video.play().catch(function () {});
        } else {
          userPaused = true;
          video.pause();
        }
      });
    }

    video.addEventListener("play", function () {
      updateToggle(true);
    });
    video.addEventListener("pause", function () {
      updateToggle(false);
    });
    video.addEventListener("playing", function () {
      video.classList.add("is-visible");
      if (toggle) toggle.classList.add("is-ready");
    });

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            if (!userPaused) video.play().catch(function () {});
          } else {
            video.pause();
          }
        },
        { threshold: 0 }
      );
      observer.observe(video);
    }

    // Carregamento adiado: o vídeo só compete por banda depois que a página
    // termina de carregar (CSS, fontes e pôster já resolvidos), escolhendo a
    // fonte pela mesma regra de densidade usada no pôster.
    function loadVideo() {
      var isHighDensityDesktop = window.innerWidth >= 768 && window.devicePixelRatio >= 1.5;
      Array.prototype.forEach.call(video.querySelectorAll("source"), function (source) {
        var isHighDensitySource = source.media === "(min-width: 768px) and (min-resolution: 1.5dppx)";
        if (isHighDensitySource !== isHighDensityDesktop) {
          source.remove();
        } else {
          source.src = source.getAttribute("data-src");
        }
      });
      video.load();
      video.play().catch(function () {});
    }

    function scheduleLoadVideo() {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadVideo);
      } else {
        setTimeout(loadVideo, 200);
      }
    }

    if (document.readyState === "complete") {
      scheduleLoadVideo();
    } else {
      window.addEventListener("load", scheduleLoadVideo);
    }
  }

  // Contador "1 / N" dos carrosséis mobile (Diferenciais e Portfólio), via
  // IntersectionObserver: marca o card mais visível dentro da lista como atual.
  function setupCarouselCounter(listSelector, itemSelector, counterSelector, pad) {
    var list = document.querySelector(listSelector);
    var counter = document.querySelector(counterSelector);
    if (!list || !counter || !("IntersectionObserver" in window)) return;

    var items = Array.prototype.slice.call(list.querySelectorAll(itemSelector));
    if (!items.length) return;
    var total = items.length;

    function pad2(n) {
      return pad && n < 10 ? "0" + n : String(n);
    }

    function updateCounter(index) {
      counter.textContent = pad2(index + 1) + " / " + pad2(total);
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var best = null;
        entries.forEach(function (entry) {
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
            best = entry;
          }
        });
        if (best) {
          var index = items.indexOf(best.target);
          if (index !== -1) updateCounter(index);
        }
      },
      { root: list, threshold: [0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );
    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  // ---------- Portfólio no mobile: lista com "Ver mais projetos" + lightbox ----------
  // As figuras a partir da 5ª (Cofemo, Guabifios, Squadroni, Almata Química, KX3 x2) já
  // nascem com o atributo hidden no próprio HTML, não aplicado depois por JS:
  // loading="lazy" sozinho não é suficiente (o scanner de pré-carregamento do
  // Chrome ainda baixa a primeira foto escondida antes do JS rodar, por ela
  // ficar perto da dobra), então só travar o display:none desde o HTML evita
  // essa corrida. O CSS (@media min-width: 48rem) força essas 4 de volta pra
  // display:flex no desktop, então a grade de sempre continua intacta ali
  // mesmo sem esperar o JS. Abaixo de 768px (mesmo ponto de corte do CSS em
  // @media max-width: 47.99rem): "Ver mais projetos" revela o resto com fade
  // e move o foco pra 5ª foto; tocar em qualquer foto (mostrada ou não) abre
  // a mesma visualização em tela cheia. Em 768px+ os gatilhos de clique/
  // teclado não são ligados, então a grade de sempre continua intacta.
  function setupPortfolio() {
    var section = document.getElementById("portfolio");
    var grid = section ? section.querySelector(".portfolio__grid") : null;
    var moreBtn = section ? section.querySelector(".portfolio__more") : null;
    var lightbox = document.getElementById("portfolio-lightbox");
    if (!section || !grid || !moreBtn || !lightbox) return;

    var items = Array.prototype.slice.call(grid.querySelectorAll(".portfolio__item"));
    if (!items.length) return;
    var hiddenItems = items.slice(4);

    var mobileQuery = window.matchMedia("(max-width: 47.99rem)");
    var reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var expanded = false;

    // ---------- Lightbox: abre a partir de QUALQUER item (visível ou não via "Ver mais") ----------

    var lbImg = document.getElementById("portfolio-lightbox-img");
    var lbClient = document.getElementById("portfolio-lightbox-client");
    var lbFair = document.getElementById("portfolio-lightbox-fair");
    var lbCounter = document.getElementById("portfolio-lightbox-counter");
    var lbFigure = document.getElementById("portfolio-lightbox-figure");
    var lbClose = document.getElementById("portfolio-lightbox-close");
    var lbPrev = document.getElementById("portfolio-lightbox-prev");
    var lbNext = document.getElementById("portfolio-lightbox-next");
    var focusableLbControls = [lbClose, lbPrev, lbNext];
    var lbIndex = 0;
    var lbLastFocused = null;

    function pad2(n) {
      return n < 10 ? "0" + n : String(n);
    }

    function itemData(item) {
      var img = item.querySelector(".portfolio__frame img");
      var client = item.querySelector(".portfolio__client");
      var fair = item.querySelector(".portfolio__fair");
      return {
        src: img ? img.currentSrc || img.src : "",
        srcset: img ? img.getAttribute("srcset") || "" : "",
        alt: img ? img.getAttribute("alt") || "" : "",
        width: img ? img.getAttribute("width") : null,
        height: img ? img.getAttribute("height") : null,
        client: client ? client.textContent.trim() : "",
        fair: fair ? fair.textContent.trim() : "",
      };
    }

    function itemLabel(item) {
      var data = itemData(item);
      return "Ver em tela cheia: " + data.client + (data.fair ? ", " + data.fair : "");
    }

    function itemTrigger(item) {
      return item.querySelector(".portfolio__trigger");
    }

    function renderLightbox() {
      var data = itemData(items[lbIndex]);
      lbImg.src = data.src;
      lbImg.srcset = data.srcset;
      lbImg.alt = data.alt;
      if (data.width) lbImg.setAttribute("width", data.width);
      if (data.height) lbImg.setAttribute("height", data.height);
      lbClient.textContent = data.client;
      lbFair.textContent = data.fair;
      lbCounter.textContent = pad2(lbIndex + 1) + " / " + pad2(items.length);
    }

    function openLightbox(index, triggerEl) {
      lbIndex = index;
      lbLastFocused = triggerEl || document.activeElement;
      renderLightbox();
      lightbox.hidden = false;
      document.body.classList.add("portfolio-lightbox-open");
      document.addEventListener("keydown", onLightboxKeydown);
      lbClose.focus();
    }

    function closeLightbox() {
      if (lightbox.hidden) return;
      lightbox.hidden = true;
      document.body.classList.remove("portfolio-lightbox-open");
      document.removeEventListener("keydown", onLightboxKeydown);
      if (lbLastFocused && typeof lbLastFocused.focus === "function") lbLastFocused.focus();
    }

    function showPrev() {
      lbIndex = (lbIndex - 1 + items.length) % items.length;
      renderLightbox();
    }

    function showNext() {
      lbIndex = (lbIndex + 1) % items.length;
      renderLightbox();
    }

    function onLightboxKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrev();
      } else if (event.key === "ArrowRight") {
        showNext();
      } else if (event.key === "Tab") {
        // Foco preso: só close/prev/next são focáveis dentro do lightbox.
        var first = focusableLbControls[0];
        var last = focusableLbControls[focusableLbControls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", showPrev);
    lbNext.addEventListener("click", showNext);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    var dragStartX = 0;
    var dragDeltaX = 0;
    var dragging = false;

    lbFigure.addEventListener("pointerdown", function (event) {
      dragging = true;
      dragStartX = event.clientX;
      dragDeltaX = 0;
      lbImg.style.transition = "none";
      if (lbFigure.setPointerCapture) {
        try {
          lbFigure.setPointerCapture(event.pointerId);
        } catch (err) {}
      }
    });

    lbFigure.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      dragDeltaX = event.clientX - dragStartX;
      lbImg.style.transform = "translateX(" + dragDeltaX + "px)";
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      lbImg.style.transition = "";
      lbImg.style.transform = "";
      if (Math.abs(dragDeltaX) > 60) {
        if (dragDeltaX > 0) showPrev();
        else showNext();
      }
      dragDeltaX = 0;
    }

    lbFigure.addEventListener("pointerup", endDrag);
    lbFigure.addEventListener("pointercancel", endDrag);

    // ---------- Gatilhos de cada foto (só ligados no mobile) ----------

    function onItemClick(event) {
      if (!mobileQuery.matches) return;
      var item = event.currentTarget.closest(".portfolio__item");
      var index = items.indexOf(item);
      if (index !== -1) openLightbox(index, event.currentTarget);
    }

    // Sem handler de keydown: é um <button> nativo agora, Enter/Espaço já
    // disparam "click" sozinhos (ver onItemClick), sem precisar reimplementar.
    items.forEach(function (item) {
      itemTrigger(item).addEventListener("click", onItemClick);
    });

    // ---------- "Ver mais projetos" / "Ver menos" ----------

    function collapse() {
      hiddenItems.forEach(function (item) {
        item.hidden = true;
      });
      moreBtn.textContent = "Ver mais projetos";
      moreBtn.setAttribute("aria-expanded", "false");
      expanded = false;
    }

    function expand() {
      hiddenItems.forEach(function (item) {
        item.hidden = false;
      });
      moreBtn.textContent = "Ver menos";
      moreBtn.setAttribute("aria-expanded", "true");
      expanded = true;

      if (!reduceMotionQuery.matches) {
        hiddenItems.forEach(function (item) {
          item.style.opacity = "0";
        });
        // Força o navegador a aplicar opacity:0 antes de animar pra opacity:1.
        void grid.offsetHeight;
        hiddenItems.forEach(function (item) {
          item.style.transition = "opacity 300ms";
          item.style.opacity = "1";
        });
        window.setTimeout(function () {
          hiddenItems.forEach(function (item) {
            item.style.transition = "";
            item.style.opacity = "";
          });
        }, 320);
      }

      if (hiddenItems[0]) itemTrigger(hiddenItems[0]).focus();
    }

    moreBtn.addEventListener("click", function () {
      if (expanded) {
        collapse();
        section.scrollIntoView({ block: "start" });
      } else {
        expand();
      }
    });

    // ---------- Liga/desliga tudo conforme a largura da tela ----------

    function syncResponsiveState() {
      if (mobileQuery.matches) {
        items.forEach(function (item) {
          var trigger = itemTrigger(item);
          trigger.disabled = false;
          trigger.setAttribute("aria-label", itemLabel(item));
        });
        collapse();
      } else {
        closeLightbox();
        items.forEach(function (item) {
          var trigger = itemTrigger(item);
          // No desktop não existe lightbox (ver onItemClick): desativa o
          // botão em vez de deixar focável/anunciado sem fazer nada ao ativar.
          trigger.disabled = true;
          trigger.removeAttribute("aria-label");
        });
        hiddenItems.forEach(function (item) {
          item.hidden = false;
        });
        moreBtn.setAttribute("aria-expanded", "false");
        expanded = false;
      }
    }

    mobileQuery.addEventListener("change", syncResponsiveState);
    syncResponsiveState();
  }

  function setupQuoteForm() {
    var form = document.getElementById("quote-form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      var nome = (data.get("nome") || "").toString().trim();
      var empresa = (data.get("empresa") || "").toString().trim();
      var feira = (data.get("feira") || "").toString().trim();
      var dataEvento = formatDateBR((data.get("data-evento") || "").toString().trim());
      var metragem = (data.get("metragem") || "").toString().trim();

      var mensagem = [
        DEFAULT_MESSAGE,
        "",
        "Nome: " + nome,
        "Empresa: " + empresa,
        "Feira: " + feira,
        "Data do evento: " + dataEvento,
        "Metragem aproximada: " + metragem + " m²",
      ].join("\n");

      var url = buildWhatsAppUrl(mensagem);

      // window.open precisa rodar no mesmo tick do gesto do usuário (clique/submit):
      // se adiado por setTimeout, Safari e Firefox bloqueiam o popup.
      window.open(url, "_blank", "noopener,noreferrer");

      var submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        var originalLabel = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Abrindo WhatsApp.";

        window.setTimeout(function () {
          submitButton.disabled = false;
          submitButton.textContent = originalLabel;
          form.reset();
        }, 400);
      } else {
        form.reset();
      }
    });
  }

  function injectLocalBusinessSchema() {
    // Endereço completo não entra aqui: é residencial, não publicado (ver CLAUDE.md).
    var schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: CFG.NOME_NO_TEXTO,
      description: "Há mais de 30 anos projetando, fabricando e montando stands personalizados para feiras e eventos. Stands, quiosques comerciais e cenografia em Curitiba e região.",
      image: "assets/brand/social/og-image.png",
      telephone: "+55 41 99697-4677",
      email: "marco@conceitostands.com.br",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Curitiba",
        addressRegion: "PR",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -25.3912917,
        longitude: -49.2243121,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      areaServed: "Curitiba e região",
      hasMap: "https://maps.app.goo.gl/TDenwAQ8dSWAmT8z7",
      sameAs: ["https://www.instagram.com/conceito.stands/"],
      url: window.location.href,
    };

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillPlaceholders();
    wireWhatsAppLinks();
    wireContactLinks();
    renderFooterContacts();
    setFooterYear();
    setupMobileMenu();
    setupHeaderScroll();
    setupHeroVideo();
    setupWhatsAppFab();
    setupQuoteForm();
    injectLocalBusinessSchema();
    setupCarouselCounter(".diferenciais__list", ".diferencial", ".diferenciais__counter");
    setupPortfolio();
  });
})();
