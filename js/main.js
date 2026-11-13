(function () {
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const details = Array.from(document.querySelectorAll("[data-detail]"));
  const dots = Array.from(document.querySelectorAll("[data-dot]"));
  const currentEl = document.querySelector("[data-current]");
  const totalEl = document.querySelector("[data-total]");
  const photo = document.querySelector(".hero-scene");
  const pop = document.querySelector(".hero-pop");
  const hero = document.querySelector(".hero");
  const shot = document.querySelector(".hero-shot");
  const tagline = document.querySelector(".tagline-text");
  let index = 0;
  const hasCarousel = slides.length > 0;

  if (totalEl && hasCarousel) totalEl.textContent = String(slides.length).padStart(2, "0");

  function show(next) {
    if (!hasCarousel) return;
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const on = i === index;
      slide.classList.toggle("is-active", on);
      slide.setAttribute("aria-hidden", on ? "false" : "true");
    });
    details.forEach((detail, i) => {
      detail.classList.toggle("is-active", i === index);
    });
    dots.forEach((dot, i) => {
      const on = i === index;
      dot.classList.toggle("is-active", on);
      dot.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (currentEl) currentEl.textContent = String(index + 1).padStart(2, "0");

    const active = slides[index];
    if (photo && active.dataset.image) {
      photo.src = active.dataset.image;
      const altKey = active.dataset.altKey;
      photo.alt = altKey && window.I18n ? I18n.t(altKey) : (active.dataset.alt || "");
    }
    if (pop && active.dataset.pop) {
      pop.src = active.dataset.pop;
    }
    if (hero) {
      hero.style.setProperty("--pop-w", active.dataset.popw || "90%");
      hero.style.setProperty("--pop-r", active.dataset.popr || "-10%");
      hero.style.setProperty("--pop-y", active.dataset.popy || "-30%");
      hero.style.setProperty("--pop-max", active.dataset.popmax || "1080px");
      hero.style.setProperty("--pop-maxh", active.dataset.popmaxh || "min(118%, 980px)");
      hero.style.setProperty("--pop-scale", active.dataset.popscale || "1");
    }
    if (shot) {
      shot.style.setProperty("--pos", active.dataset.pos || "50% 46%");
      shot.classList.remove("is-popping");
      void shot.offsetWidth;
      shot.classList.add("is-popping");
    }
    if (tagline) {
      const key = active.dataset.taglineKey;
      tagline.textContent = key && window.I18n ? I18n.t(key) : (active.dataset.tagline || "");
    }
  }

  if (hasCarousel) {
    document.querySelectorAll("[data-next]").forEach((btn) => {
      btn.addEventListener("click", () => show(index + 1));
    });
    document.querySelectorAll("[data-prev]").forEach((btn) => {
      btn.addEventListener("click", () => show(index - 1));
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => show(Number(dot.dataset.dot)));
    });
    document.addEventListener("keydown", (event) => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key === "ArrowRight") show(index + 1);
      if (event.key === "ArrowLeft") show(index - 1);
    });
  }

  const items = Array.from(document.querySelectorAll(".nav-item"));
  function closeMenus(except) {
    items.forEach((item) => {
      if (item === except) return;
      item.classList.remove("is-open");
      const btn = item.querySelector("button");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }
  items.forEach((item) => {
    const btn = item.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = !item.classList.contains("is-open");
      closeMenus(open ? item : null);
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (event.detail > 0) btn.blur();
    });
    item.addEventListener("mouseenter", () => {
      if (window.matchMedia("(max-width: 860px)").matches) return;
      closeMenus(item);
      item.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    });
    item.addEventListener("mouseleave", () => {
      if (window.matchMedia("(max-width: 860px)").matches) return;
      item.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest(".nav-item")) return;
    closeMenus(null);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenus(null);
  });

  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      const labelKey = open ? "nav.close" : "nav.open";
      burger.setAttribute("aria-label", window.I18n ? I18n.t(labelKey) : (open ? "Close menu" : "Open menu"));
    });
  }

  if (hasCarousel) {
    const start = Number(new URLSearchParams(location.search).get("slide"));
    show(Number.isFinite(start) ? start : 0);
    document.addEventListener("siyapatha-lang", () => show(index));

    const hero = document.querySelector(".hero");
    let timer = 0;
    function motionPaused() {
      if (document.documentElement.dataset.motion === "off") return true;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function arm() {
      window.clearInterval(timer);
      if (motionPaused()) return;
      timer = window.setInterval(() => show(index + 1), 7000);
    }
    if (hero) {
      hero.addEventListener("mouseenter", () => window.clearInterval(timer));
      hero.addEventListener("mouseleave", arm);
      hero.addEventListener("focusin", () => window.clearInterval(timer));
      hero.addEventListener("focusout", arm);
    }
    document.addEventListener("siyapatha-a11y", arm);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) window.clearInterval(timer);
      else arm();
    });
    arm();
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    if (!id || document.getElementById(id)) return;
    link.addEventListener("click", (event) => event.preventDefault());
  });

  const siteHeader = document.querySelector("[data-site-header]");
  if (siteHeader) {
    const syncHeader = () => {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }
})();
