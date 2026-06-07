const INCLUDE_CACHE_VERSION = "2026-04-05-05";

function buildSiteUrl(path) {
  return new URL(path, document.baseURI);
}

async function loadIncludes() {
  const nodes = document.querySelectorAll("[data-include]");

  await Promise.all(
    Array.from(nodes).map(async (node) => {
      const file = node.getAttribute("data-include");
      const cacheKey = `include:${INCLUDE_CACHE_VERSION}:${file}`;
      const requestUrl = `${file}?v=${INCLUDE_CACHE_VERSION}`;
      const cached = window.sessionStorage.getItem(cacheKey);

      if (cached) {
        node.innerHTML = cached;
        return;
      }

      const response = await fetch(requestUrl, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
      }

      const markup = await response.text();
      window.sessionStorage.setItem(cacheKey, markup);
      node.innerHTML = markup;
    })
  );
}

function initHeader() {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const currentPage = document.body.dataset.page;
  const cta = document.querySelector(".header-cta");

  if (!nav || !toggle) {
    return;
  }

  if (cta) {
    cta.classList.toggle("is-active", currentPage === "hire");
  }

  nav.querySelectorAll("[data-page-link]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.pageLink === currentPage);
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initFooter() {
  const year = document.getElementById("footer-year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function initHeaderCta() {
  if (!window.gsap) {
    return;
  }

  const cta = document.querySelector(".header-cta");

  if (!cta) {
    return;
  }

  const reset = () =>
    gsap.to(cta, {
      y: 0,
      scale: 1,
      duration: 0.22,
      ease: "power2.out"
    });

  cta.addEventListener("pointerenter", () => {
    gsap.to(cta, {
      y: -2,
      scale: 1.03,
      duration: 0.22,
      ease: "power2.out"
    });
  });

  cta.addEventListener("pointerleave", reset);
  cta.addEventListener("blur", reset);

  cta.addEventListener("pointerdown", () => {
    gsap.to(cta, {
      y: 0,
      scale: 0.97,
      duration: 0.12,
      ease: "power2.out"
    });
  });

  cta.addEventListener("pointerup", () => {
    gsap.to(cta, {
      y: -2,
      scale: 1.03,
      duration: 0.18,
      ease: "back.out(2.4)"
    });
  });
}

function initBrandIntro() {
  if (!window.gsap) {
    return;
  }

  const brandName = document.querySelector("[data-brand-name]");
  const brandSubtitle = document.querySelector(".brand-subtitle");
  const brandMark = document.querySelector(".brand-mark");

  if (!brandName || !brandSubtitle || !brandMark) {
    return;
  }

  gsap.set(brandMark, {
    opacity: 0,
    y: -18,
    scale: 0.9
  });

  gsap.set(brandName, {
    opacity: 0,
    y: -22,
    filter: "blur(6px)"
  });

  gsap.set(brandSubtitle, {
    opacity: 0,
    y: -16,
    filter: "blur(6px)"
  });

  requestAnimationFrame(() => {
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    timeline.to(brandMark, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.46
    });

    timeline.to(
      brandName,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.52,
        clearProps: "transform,filter"
      },
      "-=0.24"
    );

    timeline.to(
      brandSubtitle,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.46,
        clearProps: "transform,filter"
      },
      "-=0.28"
    );
  });
}

function initHeroShowcase() {
  if (!window.gsap) {
    return;
  }

  const hero = document.querySelector(".hero");

  if (!hero) {
    return;
  }

  const eyebrow = hero.querySelector(".hero-eyebrow");
  const titleLines = hero.querySelectorAll(".hero-title-line");
  const copy = hero.querySelector(".hero-copy");
  const actionButtons = hero.querySelectorAll(".hero-actions .button");
  const panel = hero.querySelector(".hero-panel");
  const photoFrame = hero.querySelector(".hero-photo-frame");
  const miniCards = hero.querySelectorAll(".mini-card");

  if (!eyebrow || !titleLines.length || !copy || !actionButtons.length || !panel) {
    return;
  }

  gsap.set([eyebrow, copy, ...actionButtons, panel, ...miniCards], {
    opacity: 0
  });

  gsap.set(titleLines, {
    opacity: 0,
    y: 34,
    rotateX: -10,
    transformOrigin: "50% 100%"
  });

  gsap.set(eyebrow, {
    y: 18,
    scale: 0.96
  });

  gsap.set(copy, {
    y: 22,
    filter: "blur(8px)"
  });

  gsap.set(actionButtons, {
    y: 18
  });

  gsap.set(panel, {
    x: 26,
    y: 18,
    scale: 0.98
  });

  gsap.set(miniCards, {
    y: 16
  });

  requestAnimationFrame(() => {
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    timeline.to(eyebrow, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.44,
      clearProps: "transform,opacity"
    });

    timeline.to(
      titleLines,
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.62,
        stagger: 0.08,
        clearProps: "transform,opacity"
      },
      "-=0.16"
    );

    timeline.to(
      copy,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.46,
        clearProps: "transform,opacity,filter"
      },
      "-=0.34"
    );

    timeline.to(
      actionButtons,
      {
        opacity: 1,
        y: 0,
        duration: 0.38,
        stagger: 0.08,
        clearProps: "transform,opacity"
      },
      "-=0.24"
    );

    timeline.to(
      panel,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.58,
        clearProps: "transform,opacity"
      },
      "-=0.42"
    );

    timeline.to(
      miniCards,
      {
        opacity: 1,
        y: 0,
        duration: 0.34,
        stagger: 0.05,
        clearProps: "transform,opacity"
      },
      "-=0.34"
    );

    if (photoFrame && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timeline.add(() => {
        gsap.to(photoFrame, {
          y: -6,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }, "-=0.18");
    }
  });
}

function initAnimations() {
  if (!window.gsap) {
    return;
  }

  if (window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  const introItems = [
    ...document.querySelectorAll(".page-hero .animate-item"),
    ...document.querySelectorAll(".page-title, .page-copy")
  ].filter((item, index, list) => list.indexOf(item) === index);

  if (introItems.length) {
    gsap.from(introItems, {
      y: 22,
      opacity: 0,
      duration: 0.58,
      stagger: 0.055,
      ease: "power2.out",
      clearProps: "transform,opacity"
    });
  }

  gsap.utils.toArray(".animate-item").forEach((item) => {
    if (item.closest(".hero") || item.closest(".page-hero")) {
      return;
    }

    gsap.from(item, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      clearProps: "transform,opacity",
      scrollTrigger: window.ScrollTrigger
        ? {
            trigger: item,
            start: "top 90%",
            once: true
          }
        : undefined
    });
  });
}

function initSkillBars() {
  const stack = document.querySelector(".skill-stack");
  const rows = stack ? Array.from(stack.querySelectorAll(".skill-row[data-skill]")) : [];

  if (!rows.length) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setStaticState = () => {
    rows.forEach((row) => {
      const fill = row.querySelector(".skill-bar-fill");
      const value = row.querySelector(".skill-row-head strong");
      const target = Number(row.dataset.skill || 0);

      if (!fill || !value) {
        return;
      }

      fill.style.transform = `scaleX(${target / 100})`;
      value.textContent = `${target}%`;
    });
  };

  if (!window.gsap || reducedMotion) {
    setStaticState();
    return;
  }

  rows.forEach((row) => {
    const fill = row.querySelector(".skill-bar-fill");
    const value = row.querySelector(".skill-row-head strong");

    if (!fill || !value) {
      return;
    }

    gsap.set(fill, {
      scaleX: 0,
      transformOrigin: "left center"
    });

    value.textContent = "0%";
  });

  const animateStack = () => {
    if (stack.dataset.animated === "true") {
      return;
    }

    stack.dataset.animated = "true";

    rows.forEach((row, index) => {
      const fill = row.querySelector(".skill-bar-fill");
      const value = row.querySelector(".skill-row-head strong");
      const target = Number(row.dataset.skill || 0);

      if (!fill || !value) {
        return;
      }

      const counter = { value: 0 };
      const delay = index * 0.07;

      gsap.to(fill, {
        scaleX: target / 100,
        duration: 0.82,
        delay,
        ease: "power2.out",
        overwrite: "auto"
      });

      gsap.to(counter, {
        value: target,
        duration: 0.72,
        delay,
        ease: "power1.out",
        overwrite: "auto",
        onUpdate() {
          value.textContent = `${Math.round(counter.value)}%`;
        }
      });
    });
  };

  if (window.ScrollTrigger) {
    window.ScrollTrigger.create({
      trigger: stack,
      start: "top 84%",
      once: true,
      onEnter: animateStack
    });
    return;
  }

  animateStack();
}

// function initLeadForm() {
//   const form = document.getElementById("lead-form");
//   const status = document.getElementById("form-status");

//   if (!form || !status) {
//     return;
//   }

//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const payload = Object.fromEntries(new FormData(form).entries());

//     if (!payload.name || !payload.email || !payload.message) {
//       status.textContent = "Please fill all required fields.";
//       return;
//     }

//     const subject = encodeURIComponent(`${payload.projectType || "Website inquiry"} from ${payload.name}`);
//     const body = encodeURIComponent(
//       [
//         `Name: ${payload.name}`,
//         `Email: ${payload.email}`,
//         `Phone: ${payload.phone || "-"}`,
//         `Project Type: ${payload.projectType || "-"}`,
//         "",
//         "Message:",
//         payload.message
//       ].join("\n")
//     );

//     const sourcePage = document.body.dataset.page === "hire" ? "hire" : "contact";

//     try {
//       window.sessionStorage.setItem(
//         "lead-submission",
//         JSON.stringify({
//           name: payload.name,
//           projectType: payload.projectType || "Website inquiry",
//           source: sourcePage
//         })
//       );
//     } catch (error) {
//       console.error(error);
//     }

//     status.textContent = "Opening your email app and taking you to the thank-you page...";

//     const emailLink = document.createElement("a");
//     emailLink.href = `mailto:poojaranaa07@gmail.com?subject=${subject}&body=${body}`;
//     emailLink.style.display = "none";
//     document.body.append(emailLink);
//     emailLink.click();
//     emailLink.remove();

//     window.setTimeout(() => {
//       const thankYouUrl = buildSiteUrl("thank-you/");
//       thankYouUrl.searchParams.set("source", sourcePage);
//       window.location.assign(thankYouUrl.href);
//     }, 180);
//   });
// }

function initThankYouPage() {
  if (document.body.dataset.page !== "thank-you") {
    return;
  }

  const nameNode = document.getElementById("thank-you-name");
  const copyNode = document.getElementById("thank-you-copy");
  const card = document.querySelector(".thank-you-card");
  const mark = document.querySelector(".thank-you-mark");
  const title = document.querySelector(".thank-you-card-title");
  const cardCopy = document.querySelector(".thank-you-card-copy");
  const button = document.querySelector(".thank-you-card .button");
  let submission = null;

  try {
    submission = JSON.parse(window.sessionStorage.getItem("lead-submission") || "null");
  } catch (error) {
    submission = null;
  }

  if (submission?.name && nameNode) {
    nameNode.textContent = `Thank you, ${submission.name}.`;
  }

  if (copyNode) {
    copyNode.textContent =
      submission?.source === "hire"
        ? "Your project note is in. I will connect with you soon."
        : "Your message is in. I will connect with you soon.";
  }

  if (!window.gsap || !card || !mark || !title || !cardCopy || !button) {
    return;
  }

  const rings = mark.querySelectorAll(".thank-you-mark-ring");

  gsap.set([mark, title, cardCopy, button], {
    opacity: 0
  });

  gsap.set(mark, {
    scale: 0.84,
    y: 18
  });

  gsap.set([title, cardCopy, button], {
    y: 18
  });

  requestAnimationFrame(() => {
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    timeline.to(mark, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.58,
      clearProps: "transform,opacity"
    });

    timeline.to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: 0.42,
        clearProps: "transform,opacity"
      },
      "-=0.18"
    );

    timeline.to(
      cardCopy,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        clearProps: "transform,opacity"
      },
      "-=0.22"
    );

    timeline.to(
      button,
      {
        opacity: 1,
        y: 0,
        duration: 0.36,
        clearProps: "transform,opacity"
      },
      "-=0.16"
    );

    gsap.to(rings, {
      scale: 1.12,
      opacity: 0,
      duration: 1.8,
      repeat: -1,
      stagger: 0.28,
      ease: "power1.out"
    });
  });
}

function createTransitionLayer() {
  const existing = document.querySelector(".site-transition");

  if (existing) {
    return existing;
  }

  const layer = document.createElement("div");
  layer.className = "site-transition";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = `
    <div class="site-transition-card">
      <div class="site-transition-mark">PR</div>
      <p class="site-transition-kicker">Hire me</p>
      <h2 class="site-transition-title">Opening the project brief</h2>
      <p class="site-transition-copy">A clean page is loading for your next website or UI requirement.</p>
      <div class="site-transition-loader"><span></span></div>
      <div class="site-transition-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;

  document.body.append(layer);
  return layer;
}

function initPageTransitions() {
  const links = document.querySelectorAll("[data-transition-link='hire']");

  if (!links.length) {
    return;
  }

  const layer = createTransitionLayer();
  let isNavigating = false;

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        isNavigating ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === "_blank"
      ) {
        return;
      }

      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      const targetUrl = buildSiteUrl(href);
      const currentUrl = new URL(window.location.href);

      if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) {
        return;
      }

      event.preventDefault();
      isNavigating = true;
      document.body.classList.add("is-transitioning");
      layer.classList.add("is-active");
      layer.setAttribute("aria-hidden", "false");

      if (window.gsap) {
        const card = layer.querySelector(".site-transition-card");
        const mark = layer.querySelector(".site-transition-mark");
        const textItems = layer.querySelectorAll(
          ".site-transition-kicker, .site-transition-title, .site-transition-copy, .site-transition-loader, .site-transition-dots"
        );

        gsap.killTweensOf([card, mark, ...textItems]);
        gsap.set(card, { opacity: 1, scale: 0.96, y: 18 });
        gsap.set(mark, { opacity: 0, y: 14, scale: 0.88 });
        gsap.set(textItems, { opacity: 0, y: 10 });

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline.to(card, { opacity: 1, scale: 1, y: 0, duration: 0.36 });
        timeline.to(mark, { opacity: 1, y: 0, scale: 1, duration: 0.34 }, "-=0.2");
        timeline.to(textItems, { opacity: 1, y: 0, duration: 0.28, stagger: 0.05 }, "-=0.18");
      }

      window.setTimeout(() => {
        window.location.assign(targetUrl.href);
      }, 980);
    });
  });
}

async function bootstrap() {
  try {
    await loadIncludes();
    initHeader();
    initFooter();
    initBrandIntro();
    initHeaderCta();
    initHeroShowcase();
    initPageTransitions();
    initAnimations();
    initSkillBars();
    initLeadForm();
    initThankYouPage();
  } catch (error) {
    console.error(error);
  }
}

bootstrap();

document.getElementById("lead-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const projectType = this.projectType.value;
    const message = this.message.value.trim();

    const status = document.getElementById("form-status");

    // Reset message
    status.textContent = "";

    // Validation
    if (!name) {
        status.textContent = "Please enter your name.";
        return;
    }

    if (!email) {
        status.textContent = "Please enter your email.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        status.textContent = "Please enter a valid email address.";
        return;
    }

    if (!message) {
        status.textContent = "Please enter your project details.";
        return;
    }

    const whatsappMessage = `
🚀 New Portfolio Inquiry

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone || "Not provided"}
💼 Project Type: ${projectType}

📝 Message:
${message}
    `;

    const whatsappNumber = "918130489067"; // Replace with your number

    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank"
    );

    // Optional success message
    status.textContent = "Redirecting to WhatsApp...";
});