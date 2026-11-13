(function () {
  const ratesSection = document.querySelector("#rates");
  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function countUp(el, delay) {
    const to = parseFloat(el.getAttribute("data-count"));
    if (!Number.isFinite(to)) return;
    el.textContent = (0).toFixed(2);
    const start = () => {
      let t0 = null;
      const dur = 1300;
      function step(t) {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = (to * e).toFixed(2);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = to.toFixed(2);
      }
      requestAnimationFrame(step);
    };
    if (delay) setTimeout(start, delay);
    else start();
  }

  function settleRatesCounts() {
    ratesSection.querySelectorAll("[data-count]").forEach((el) => {
      const to = parseFloat(el.getAttribute("data-count"));
      if (Number.isFinite(to)) el.textContent = to.toFixed(2);
    });
  }

  function runRatesLive() {
    if (ratesSection.classList.contains("is-live")) return;
    ratesSection.classList.add("is-live");
    const motionOff = reduceMotion || document.documentElement.getAttribute("data-motion") === "off";
    if (motionOff) {
      settleRatesCounts();
      return;
    }
    ratesSection.querySelectorAll("[data-count]").forEach((el, i) => {
      countUp(el, 80 + i * 70);
    });
  }

  if (ratesSection) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runRatesLive();
          io.disconnect();
        });
      }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
      io.observe(ratesSection);
    } else {
      runRatesLive();
    }
  }

  const prodStage = document.querySelector("[data-prod-stage]");
  if (prodStage) {
    const slides = Array.from(prodStage.querySelectorAll("[data-prod-slide]"));
    const tabs = Array.from(prodStage.querySelectorAll("[data-prod-tab]"));
    let index = 0;
    let timer = null;
    const intervalMs = 5200;
    function dictLabel(key, fallback) {
      const value = window.I18n && typeof window.I18n.t === "function" ? window.I18n.t(key) : "";
      return value || fallback;
    }
    const seeMoreLabel = () => dictLabel("prod.seeMore", "See more");
    const seeLessLabel = () => dictLabel("prod.seeLess", "See less");

    function syncProdSee(panel) {
      if (!panel) return;
      const body = panel.querySelector(".prod-feature-body");
      const btn = panel.querySelector("[data-prod-see]");
      if (!body || !btn) return;
      const expanded = panel.classList.contains("is-expanded");
      if (expanded) {
        btn.hidden = false;
        btn.textContent = seeLessLabel();
        btn.setAttribute("aria-expanded", "true");
        return;
      }
      const overflows = body.scrollHeight > body.clientHeight + 1;
      btn.hidden = !overflows;
      btn.textContent = seeMoreLabel();
      btn.setAttribute("aria-expanded", "false");
    }

    function show(next) {
      if (!slides.length) return;
      index = ((next % slides.length) + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle("is-on", on);
        if (on) slide.removeAttribute("hidden");
        else {
          slide.setAttribute("hidden", "");
          const panel = slide.querySelector(".prod-feature-panel");
          if (panel) panel.classList.remove("is-expanded");
        }
      });
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.classList.toggle("is-on", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      });
      requestAnimationFrame(() => {
        const active = slides[index] && slides[index].querySelector(".prod-feature-panel");
        syncProdSee(active);
      });
    }

    prodStage.querySelectorAll("[data-prod-see]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const panel = btn.closest(".prod-feature-panel");
        if (!panel) return;
        panel.classList.toggle("is-expanded");
        syncProdSee(panel);
        stop();
      });
    });

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function start() {
      stop();
      if (reduceMotion || document.documentElement.getAttribute("data-motion") === "off") return;
      timer = setInterval(() => show(index + 1), intervalMs);
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        show(Number(tab.getAttribute("data-prod-tab")));
        start();
      });
    });

    prodStage.addEventListener("mouseenter", stop);
    prodStage.addEventListener("mouseleave", start);
    prodStage.addEventListener("focusin", stop);
    prodStage.addEventListener("focusout", (event) => {
      if (!prodStage.contains(event.relatedTarget)) start();
    });

    document.addEventListener("siyapatha-a11y", () => {
      if (reduceMotion || document.documentElement.getAttribute("data-motion") === "off") stop();
      else start();
    });

    document.addEventListener("siyapatha-lang", () => {
      requestAnimationFrame(() => {
        const active = slides[index] && slides[index].querySelector(".prod-feature-panel");
        syncProdSee(active);
      });
    });

    show(0);
    start();
  }

  const root = document.documentElement;
  const motionOff = () => root.dataset.motion === "off" || reduceMotion;
  const progress = document.querySelector("[data-scroll-progress] i");
  const hero = document.querySelector(".hero");
  const aboutBg = document.querySelector(".about-bg");
  const branchMedia = document.querySelector(".branch-cta-media img");
  const orbs = Array.from(document.querySelectorAll(".path-sky .orb"));

  if (aboutBg) aboutBg.classList.add("parallax-layer");
  if (branchMedia) branchMedia.classList.add("parallax-layer");
  if (hero) hero.setAttribute("data-scroll-hero", "");

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    reveals.forEach((el) => {
      if (motionOff()) el.classList.add("is-in");
      else io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  let scrollTick = false;
  function paintScroll() {
    scrollTick = false;
    const doc = document.documentElement;
    const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
    const y = window.scrollY || doc.scrollTop || 0;
    const pct = Math.min(Math.max(y / max, 0), 1);

    if (progress) progress.style.width = (pct * 100).toFixed(2) + "%";
    if (motionOff()) return;

    if (aboutBg) {
      const rect = aboutBg.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.5 - window.innerHeight * 0.5;
      aboutBg.style.transform = "translate3d(0, " + (mid * -0.08).toFixed(1) + "px, 0) scale(1.06)";
    }
    if (branchMedia) {
      const rect = branchMedia.getBoundingClientRect();
      const mid = rect.top + rect.height * 0.5 - window.innerHeight * 0.5;
      branchMedia.style.transform = "translate3d(0, " + (mid * -0.06).toFixed(1) + "px, 0) scale(1.04)";
    }
    if (hero) {
      const shift = Math.min(y, window.innerHeight) * 0.12;
      hero.style.setProperty("--hero-shift", shift.toFixed(1) + "px");
    }
    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 0.035;
      orb.style.transform = "translate3d(0, " + (y * factor).toFixed(1) + "px, 0)";
    });
  }

  function onScroll() {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(paintScroll);
  }

  paintScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  document.querySelectorAll(".glass-chip, .prod-tile").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      if (motionOff()) return;
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 5;
      el.style.transform = "translateY(-2px) translate(" + x + "px, " + y + "px)";
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });

  document.addEventListener("siyapatha-a11y", () => {
    if (motionOff()) {
      reveals.forEach((el) => el.classList.add("is-in"));
      document.querySelectorAll(".glass-chip, .prod-tile").forEach((el) => {
        el.style.transform = "";
      });
      if (aboutBg) aboutBg.style.transform = "";
      if (branchMedia) branchMedia.style.transform = "";
      orbs.forEach((orb) => { orb.style.transform = ""; });
      if (hero) hero.style.setProperty("--hero-shift", "0px");
    }
  });

})();
