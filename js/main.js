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
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
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

    var observer = new IntersectionObserver(
      function (entries) {
        fab.classList.toggle("is-visible", !entries[0].isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(hero);
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
    setupWhatsAppFab();
    setupQuoteForm();
    injectLocalBusinessSchema();
  });
})();
