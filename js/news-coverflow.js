(function () {
  const root = document.querySelector("[data-news-coverflow]");
  if (!root) return;

  const stage = root.querySelector("[data-nc-stage]");
  const cardsHost = root.querySelector("[data-nc-cards]");
  const titleEl = root.querySelector("[data-nc-title]");
  const bodyEl = root.querySelector("[data-nc-body]");
  const liveEl = root.querySelector("[data-nc-live]");
  const prevBtn = root.querySelector("[data-nc-prev]");
  const nextBtn = root.querySelector("[data-nc-next]");

  const ITEMS = [
    {
      id: "boralesgamuwa",
      image: "assets/news-boralesgamuwa.jpg",
      href: "https://www.siyapatha.lk/news/",
      tagKey: "news.tag1",
      titleKey: "news.1.title",
      bodyKey: "news.1.body",
      tag: "Network",
      title: "Siyapatha Finance Expands Footprint with Boralesgamuwa Branch Opening",
      body: "A fully fledged Boralesgamuwa branch expands the islandwide network to 63, bringing leasing, deposits, gold, loans, factoring and Smart Pay to a fast-growing suburb."
    },
    {
      id: "leadership",
      image: "assets/news-leadership.png",
      href: "https://www.siyapatha.lk/news/",
      tagKey: "news.tag2",
      titleKey: "news.2.title",
      bodyKey: "news.2.body",
      tag: "Leadership",
      title: "Mathisha Hewavitharana appointed Chief Executive Officer",
      body: "A seamless leadership transition: Mathisha Hewavitharana becomes CEO from 1 January 2026 as Ananda Seneviratne concludes his tenure as Managing Director."
    },
    {
      id: "employer-brand",
      image: "assets/news-employer-brand.jpg",
      href: "https://www.siyapatha.lk/news/",
      tagKey: "news.tag3",
      titleKey: "news.3.title",
      bodyKey: "news.3.body",
      tag: "Awards",
      title: "Crowned ‘Best Employer Brand’ for the Third Consecutive Year",
      body: "Siyapatha Finance shines again at the Employer Branding Awards 2025, recognised for engagement, retention and an inspiring workplace culture."
    },
    {
      id: "anniversary",
      image: "assets/news-anniversary.png",
      href: "https://www.siyapatha.lk/news/",
      tagKey: "news.tag4",
      titleKey: "news.4.title",
      bodyKey: "news.4.body",
      tag: "Milestone",
      title: "Siyapatha Finance Celebrates 20 Years of Transformative Leadership",
      body: "Religious observances, flag hoisting and islandwide staff celebrations mark two decades of empowering Sri Lankans."
    },
    {
      id: "ambalangoda",
      image: "assets/news-ambalangoda.png",
      href: "https://www.siyapatha.lk/news/",
      tagKey: "news.tag1",
      titleKey: "news.5.title",
      bodyKey: "news.5.body",
      tag: "Network",
      title: "55th branch opens in Ambalangoda",
      body: "A new southern coastal branch at No. 29, Galle Road, Ambalangoda brings flexible finance closer to local communities and SMEs."
    }
  ];

  let index = 2;
  let drag = 0;
  let dragging = false;
  let playing = true;
  let reduced = false;
  let hovered = false;
  let pageVisible = true;
  let stageWidth = 1100;
  let timer = null;
  const gesture = { x: 0, y: 0, time: 0, horizontal: false, active: false };
  let suppressClickUntil = 0;
  const INTERVAL = 5200;

  const t = (key, fallback) => (window.I18n ? I18n.t(key) : fallback) || fallback;
  const wrap = (value, length) => ((value % length) + length) % length;
  const motionOff = () => reduced || document.documentElement.dataset.motion === "off";

  function cardWidth() {
    return Math.min(440, Math.max(280, stageWidth * 0.48));
  }

  function step() {
    return cardWidth() * 0.82;
  }

  function localized(item) {
    return {
      tag: t(item.tagKey, item.tag),
      title: t(item.titleKey, item.title),
      body: t(item.bodyKey, item.body)
    };
  }

  function paintReadout() {
    const item = ITEMS[wrap(index, ITEMS.length)];
    const copy = localized(item);
    if (titleEl) titleEl.textContent = copy.title;
    if (bodyEl) bodyEl.textContent = copy.body;
    if (liveEl && !playing) liveEl.textContent = copy.title + ". " + (wrap(index, ITEMS.length) + 1) + " of " + ITEMS.length + ".";
  }

  function slotRange() {
    const before = Math.min(2, Math.floor((ITEMS.length - 1) / 2));
    const after = Math.min(2, Math.ceil((ITEMS.length - 1) / 2));
    return {
      before,
      after,
      slots: ITEMS.length > 1
        ? Array.from({ length: before + after + 3 }, (_, position) => index + position - before - 1)
        : [index]
    };
  }

  function applyCardMotion() {
    const width = cardWidth();
    const { before, after } = slotRange();
    cardsHost.querySelectorAll(".nc-card").forEach((card) => {
      const slot = Number(card.getAttribute("data-slot"));
      const d = slot - index;
      const offset = d + drag;
      const abs = Math.abs(offset);
      const x = offset * step();
      const selected = slot === index;
      const hidden = d < -before || d > after;
      card.classList.toggle("is-on", selected);
      card.tabIndex = selected ? 0 : -1;
      card.setAttribute("aria-current", selected ? "true" : "false");
      card.setAttribute("aria-hidden", hidden ? "true" : "false");
      card.setAttribute("data-delta", String(d));
      card.style.setProperty("--nc-w", width + "px");
      card.style.setProperty("--nc-shade", String(Math.min(abs, 2) * 0.18));
      card.style.transform = "translate3d(" + x + "px,0," + (-Math.min(abs, 3) * 120) + "px) rotateY(" + (-Math.max(-38, Math.min(38, offset * 28))) + "deg) scale(" + (1 - Math.min(abs, 3) * 0.08) + ")";
      card.style.opacity = hidden ? "0" : "1";
      card.style.zIndex = String(10 - Math.abs(d));
      card.style.pointerEvents = hidden ? "none" : "auto";
    });
  }

  function paintCards() {
    if (!cardsHost) return;
    const width = cardWidth();
    const { before, after, slots } = slotRange();
    cardsHost.innerHTML = slots.map((slot) => {
      const item = ITEMS[wrap(slot, ITEMS.length)];
      const copy = localized(item);
      const d = slot - index;
      const selected = slot === index;
      const hidden = d < -before || d > after;
      return (
        '<button type="button" class="nc-card' + (selected ? " is-on" : "") + '" data-slot="' + slot + '" data-delta="' + d + '" tabindex="' + (selected ? "0" : "-1") + '"' +
        ' aria-current="' + (selected ? "true" : "false") + '" aria-hidden="' + (hidden ? "true" : "false") + '"' +
        ' aria-label="' + (selected ? "Open " : "Select ") + copy.title.replace(/"/g, "&quot;") + '"' +
        ' style="--nc-w:' + width + 'px">' +
          '<span class="nc-poster">' +
            '<img src="' + item.image + '" alt="" draggable="false" loading="' + (Math.abs(d) < 2 ? "eager" : "lazy") + '">' +
            '<span class="nc-poster-shade" aria-hidden="true"></span>' +
          "</span>" +
          '<span class="nc-card-info"><span><strong>' + copy.title + "</strong></span>" +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M10 7h7v7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
        "</button>"
      );
    }).join("");
    applyCardMotion();
    paintReadout();
  }

  function select(next) {
    index = next;
    drag = 0;
    paintCards();
    schedule();
  }

  function openActive() {
    if (performance.now() < suppressClickUntil) return;
    const item = ITEMS[wrap(index, ITEMS.length)];
    if (item.href) window.open(item.href, "_blank", "noopener,noreferrer");
  }

  function setPlaying(next) {
    playing = next;
    schedule();
  }

  function running() {
    return playing && !motionOff() && !dragging && pageVisible && !hovered && ITEMS.length > 1;
  }

  function schedule() {
    if (timer) window.clearTimeout(timer);
    timer = null;
    if (!running()) return;
    timer = window.setTimeout(() => select(index + 1), INTERVAL);
  }

  function onPointerDown(event) {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    gesture.active = true;
    gesture.x = event.clientX;
    gesture.y = event.clientY;
    gesture.time = performance.now();
    gesture.horizontal = false;
  }

  function onPointerMove(event) {
    if (!gesture.active) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.horizontal && Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
      gesture.active = false;
      return;
    }
    if (!gesture.horizontal && Math.abs(dx) > 8) {
      gesture.horizontal = true;
      stage.setPointerCapture(event.pointerId);
      dragging = true;
      root.dataset.dragging = "true";
    }
    if (gesture.horizontal) {
      drag = Math.max(-1.2, Math.min(1.2, dx / step()));
      applyCardMotion();
    }
  }

  function onPointerUp(event, cancel) {
    if (!gesture.active) return;
    const dx = event.clientX - gesture.x;
    const velocity = Math.abs(dx) / Math.max(1, performance.now() - gesture.time);
    if (gesture.horizontal) {
      if (!cancel && (Math.abs(dx) > Math.min(55, cardWidth() * 0.18) || (Math.abs(dx) > 14 && velocity > 0.35))) {
        select(index + (dx < 0 ? 1 : -1));
      } else {
        drag = 0;
        applyCardMotion();
      }
      suppressClickUntil = performance.now() + 300;
    }
    gesture.active = false;
    dragging = false;
    delete root.dataset.dragging;
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    schedule();
  }

  cardsHost.addEventListener("click", (event) => {
    const card = event.target.closest(".nc-card");
    if (!card || performance.now() < suppressClickUntil) return;
    const delta = Number(card.getAttribute("data-delta") || 0);
    if (delta === 0) openActive();
    else select(index + delta);
  });

  if (prevBtn) prevBtn.addEventListener("click", () => select(index - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => select(index + 1));

  let wheelLock = 0;
  stage.addEventListener("wheel", (event) => {
    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const delta = horizontal ? event.deltaX : event.deltaY;
    if (!delta || Math.abs(delta) < 2) return;
    event.preventDefault();
    const now = performance.now();
    if (now < wheelLock) return;
    wheelLock = now + 420;
    select(index + (delta > 0 ? 1 : -1));
  }, { passive: false });

  stage.addEventListener("pointerdown", onPointerDown);
  stage.addEventListener("pointermove", onPointerMove);
  stage.addEventListener("pointerup", (event) => onPointerUp(event, false));
  stage.addEventListener("pointercancel", (event) => onPointerUp(event, true));
  stage.addEventListener("mouseenter", () => { hovered = true; schedule(); });
  stage.addEventListener("mouseleave", () => { hovered = false; schedule(); });

  root.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight") { event.preventDefault(); select(index + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); select(index - 1); }
    if (event.key === "Home") { event.preventDefault(); select(0); }
    if (event.key === "End") { event.preventDefault(); select(ITEMS.length - 1); }
    if (event.key === "Enter" || event.key === " ") {
      const active = event.target.closest(".nc-card.is-on");
      if (active) { event.preventDefault(); openActive(); }
    }
  });

  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => {
      stageWidth = stage.clientWidth || 1100;
      paintCards();
    });
    ro.observe(stage);
  }

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const syncReduced = () => {
    reduced = media.matches;
    if (reduced) setPlaying(false);
    else schedule();
  };
  syncReduced();
  media.addEventListener("change", syncReduced);

  document.addEventListener("visibilitychange", () => {
    pageVisible = !document.hidden;
    schedule();
  });
  document.addEventListener("siyapatha-lang", paintCards);
  document.addEventListener("siyapatha-a11y", () => {
    if (motionOff()) setPlaying(false);
    else schedule();
  });

  stageWidth = stage.clientWidth || 1100;
  paintCards();
  setPlaying(true);
})();
