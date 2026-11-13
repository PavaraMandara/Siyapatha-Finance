(function () {
  const homeRates = "index.html#rates";
  const homeDeposits = "fixed-deposit-calculator.html";

  function mountChrome() {
    if (!document.querySelector(".quick-float")) {
      const nav = document.createElement("nav");
      nav.className = "quick-float";
      nav.setAttribute("aria-label", "Quick links");
      nav.innerHTML =
        '<a class="qf-btn is-on" href="https://www.sampathvishwa.com/" target="_blank" rel="noopener noreferrer" data-i18n-aria="q.pay" aria-label="Pay Online">' +
          '<span class="qf-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><rect x="2.8" y="6.2" width="18.4" height="12.2" rx="2.4"/><path d="M2.8 10h18.4"/><path d="M15.4 15.4h3.6"/><rect x="6" y="14.2" width="3.6" height="2.4" rx="0.5"/></svg></span>' +
          '<span class="qf-tip" data-i18n="q.pay">Pay Online</span>' +
        "</a>" +
        '<a class="qf-btn" href="branch-locator.html" data-i18n-aria="q.branches" aria-label="Find a branch">' +
          '<span class="qf-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.2s6.6-5.2 6.6-10.6a6.6 6.6 0 1 0-13.2 0c0 5.4 6.6 10.6 6.6 10.6Z"/><circle cx="12" cy="10.6" r="2.15"/></svg></span>' +
          '<span class="qf-tip" data-i18n="q.branches">Find a branch</span>' +
        "</a>" +
        '<a class="qf-btn" href="' + homeRates + '" data-i18n-aria="q.rates" aria-label="Rates snapshot">' +
          '<span class="qf-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19V12"/><path d="M9.2 19V9.5"/><path d="M13.4 19V7.2"/><path d="M17.6 19V5.5"/><path d="m14.6 4.8 1.5 1.5 2.9-3.2"/></svg></span>' +
          '<span class="qf-tip" data-i18n="q.rates">Rates snapshot</span>' +
        "</a>" +
        '<a class="qf-btn" href="' + homeDeposits + '" data-i18n-aria="q.deposits" aria-label="Fixed deposits">' +
          '<span class="qf-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16"/><path d="M6.2 10v8.8"/><path d="M10 10v8.8"/><path d="M14 10v8.8"/><path d="M17.8 10v8.8"/><path d="M3.2 18.8h17.6"/><path d="M12 4.1 3.6 9.4h16.8L12 4.1Z"/></svg></span>' +
          '<span class="qf-tip" data-i18n="q.deposits">Fixed deposits</span>' +
        "</a>" +
        '<a class="qf-btn" href="tender/index.html" data-i18n-aria="q.tenders" aria-label="Vehicle tenders">' +
          '<span class="qf-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M7.4 11.4 9.1 8A1.8 1.8 0 0 1 10.6 7.1h2.8A1.8 1.8 0 0 1 14.9 8l1.7 3.4"/><path d="M5.2 13.4h13.6l-1-2.6A2 2 0 0 0 15.9 9.5H8.1a2 2 0 0 0-1.9 1.3l-1 2.6Z"/><circle cx="8.2" cy="17.5" r="1.35"/><circle cx="15.8" cy="17.5" r="1.35"/><path d="M9.6 17.5h4.8"/><path d="M6.8 13.4v2"/><path d="M17.2 13.4v2"/></svg></span>' +
          '<span class="qf-tip" data-i18n="q.tenders">Vehicle tenders</span>' +
        "</a>";
      document.body.appendChild(nav);
    }

    if (!document.querySelector(".chat-float")) {
      const chat = document.createElement("div");
      chat.className = "chat-float";
      chat.setAttribute("aria-label", "Chat options");
      chat.innerHTML =
        '<a class="chat-fab chat-fab-wa" href="https://wa.me/94777605605" target="_blank" rel="noopener noreferrer" data-i18n-aria="chat.wa" aria-label="WhatsApp chat">' +
          '<span class="chat-fab-pulse" aria-hidden="true"></span>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 3C7.31 3 3.48 6.78 3.48 11.45c0 1.49.4 2.94 1.16 4.22L3.4 21l5.48-1.2a8.7 8.7 0 0 0 3.16.59h.01c4.73 0 8.56-3.78 8.56-8.45C20.6 6.78 16.77 3 12.04 3Zm4.9 11.94c-.2.57-1.17 1.09-1.63 1.16-.42.06-.95.09-1.53-.1-.35-.11-.8-.26-1.38-.51-2.43-1.05-4.01-3.5-4.13-3.66-.12-.17-.98-1.3-.98-2.48 0-1.18.62-1.76.84-2 .22-.24.48-.3.64-.3h.46c.15 0 .34-.06.53.4.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.24-.1.47.14.23.62 1.02 1.33 1.65.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.15Z"/></svg>' +
          '<span class="chat-fab-tip" data-i18n="chat.waTip">Message Us</span>' +
        "</a>" +
        '<button class="chat-fab chat-fab-ai" type="button" aria-expanded="false" aria-controls="ai-chat-panel" data-chat-ai data-i18n-aria="chat.ai" aria-label="AI chatbot">' +
          '<span class="chat-fab-pulse" aria-hidden="true"></span>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5.2 16.8 4 20l3.4-1.1"/><path d="M8.2 17.8A7.4 7.4 0 1 0 6.3 15"/><circle cx="9.2" cy="11.2" r="0.9" fill="currentColor" stroke="none"/><circle cx="12" cy="11.2" r="0.9" fill="currentColor" stroke="none"/><circle cx="14.8" cy="11.2" r="0.9" fill="currentColor" stroke="none"/></svg>' +
          '<span class="chat-fab-tip" data-i18n="chat.aiTip">Ask Siyapatha</span>' +
        "</button>";
      document.body.appendChild(chat);
    }

    if (!document.querySelector("#ai-chat-panel")) {
      const panel = document.createElement("div");
      panel.className = "ai-chat";
      panel.id = "ai-chat-panel";
      panel.hidden = true;
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "false");
      panel.setAttribute("aria-labelledby", "ai-chat-title");
      panel.innerHTML =
        '<div class="ai-chat-head"><div>' +
          '<strong id="ai-chat-title" data-i18n="chat.aiTitle">Siyapatha Assistant</strong>' +
          '<span data-i18n="chat.aiStatus">Online · demo</span>' +
        '</div><button type="button" class="ai-chat-x" data-chat-close data-i18n-aria="a11y.close" aria-label="Close">×</button></div>' +
        '<div class="ai-chat-body" data-chat-log><p class="ai-bubble" data-i18n="chat.aiHello">Hi — I can help with leasing, deposits, branches, and rates. What would you like to know?</p></div>' +
        '<form class="ai-chat-form" data-chat-form>' +
          '<label class="gc-sr-only" for="ai-chat-input" data-i18n="chat.aiAsk">Ask a question</label>' +
          '<input id="ai-chat-input" name="q" type="text" autocomplete="off" data-i18n-placeholder="chat.aiPlaceholder" placeholder="Ask about leasing, rates, or branches…">' +
          '<button type="submit" data-i18n-aria="chat.aiSend" aria-label="Send"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.4 11.2 20.2 3.6a.8.8 0 0 1 1.1 1L14 20.4a.9.9 0 0 1-1.6.1l-2.6-5.5-5.5-2.6a.9.9 0 0 1 .1-1.6Z"/></svg></button>' +
        "</form>";
      document.body.appendChild(panel);
    }

    if (!document.querySelector(".a11y-fab")) {
      const fab = document.createElement("button");
      fab.className = "a11y-fab";
      fab.type = "button";
      fab.setAttribute("aria-expanded", "false");
      fab.setAttribute("aria-controls", "a11y-panel");
      fab.setAttribute("data-i18n-aria", "a11y.label");
      fab.setAttribute("aria-label", "Accessibility");
      fab.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="4.5" r="2" fill="currentColor"/><path fill="currentColor" d="M4 9.2h16v1.8h-6.2V20h-1.8v-4.2h-1.9V20H8.3v-9H4V9.2Z"/></svg>';
      document.body.appendChild(fab);
    }

    if (!document.querySelector("#a11y-panel")) {
      const a11y = document.createElement("div");
      a11y.className = "a11y-panel";
      a11y.id = "a11y-panel";
      a11y.hidden = true;
      a11y.setAttribute("role", "dialog");
      a11y.setAttribute("aria-modal", "false");
      a11y.setAttribute("data-i18n-aria", "a11y.label");
      a11y.setAttribute("aria-label", "Accessibility");
      a11y.innerHTML =
        '<div class="a11y-head"><strong data-i18n="a11y.label">Accessibility</strong><button type="button" class="a11y-x" data-a11y-close data-i18n-aria="a11y.close" aria-label="Close">×</button></div>' +
        '<p data-i18n="a11y.text">Text size</p>' +
        '<div class="seg"><button type="button" data-text="sm" data-i18n-aria="a11y.smaller" aria-label="Smaller text">A−</button><button type="button" data-text="md" class="is-on">A</button><button type="button" data-text="lg" data-i18n-aria="a11y.larger" aria-label="Larger text">A+</button></div>' +
        '<label class="check"><input type="checkbox" data-a11y="contrast"> <span data-i18n="a11y.contrast">Higher contrast</span></label>' +
        '<label class="check"><input type="checkbox" data-a11y="links"> <span data-i18n="a11y.links">Underline links</span></label>' +
        '<label class="check"><input type="checkbox" data-a11y="motion"> <span data-i18n="a11y.motion">Pause motion</span></label>' +
        '<button type="button" class="a11y-reset" data-a11y-reset data-i18n="a11y.reset">Reset</button>';
      document.body.appendChild(a11y);
    }

    document.querySelectorAll(".dock, .social-rail").forEach((el) => el.remove());
    mountSiteFooter();
  }

  function mountSiteFooter() {
    document.querySelectorAll("footer.product-foot").forEach((el) => el.remove());
    if (document.querySelector("footer.site-foot")) return;

    const footer = document.createElement("footer");
    footer.className = "site-foot reveal is-in";
    footer.setAttribute("data-reveal-footer", "");
    footer.innerHTML =
      '<div class="path-inner site-foot-grid">' +
        '<div class="foot-brand">' +
          '<a class="foot-logo" href="index.html" aria-label="Siyapatha Finance, home">' +
            '<img src="assets/logo.png" alt="Siyapatha Finance">' +
          "</a>" +
          '<p class="foot-group" data-i18n="foot.group">Finance Company of Sampath Bank Group</p>' +
          '<p class="foot-blurb" data-i18n="foot.blurb">Your trusted one-stop finance company, licensed and regulated by the Central Bank of Sri Lanka (CBSL). Siyapatha Finance is geared to be a trusted financial partner for life.</p>' +
          '<div class="foot-care">' +
            '<span class="foot-care-ico" aria-hidden="true">' +
              '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
                '<path fill="currentColor" d="M12 3.2A7.3 7.3 0 0 0 4.7 10.5V13a2.3 2.3 0 0 0 2.3 2.3h1.1V11H7a.8.8 0 0 1-.8-.8v-.2A5.8 5.8 0 0 1 12 4.7a5.8 5.8 0 0 1 5.8 5.3v.2a.8.8 0 0 1-.8.8h-1.1v4.3h1.1A2.3 2.3 0 0 0 19.3 13v-2.5A7.3 7.3 0 0 0 12 3.2Z"/>' +
                '<path fill="currentColor" d="M9.4 17.6a.75.75 0 0 1 .75-.75h1.1v-.7a.75.75 0 0 1 1.5 0v.7h1.1a.75.75 0 0 1 0 1.5h-3.7a.75.75 0 0 1-.75-.75Z"/>' +
                '<circle cx="12" cy="10.4" r="1.85" fill="currentColor"/>' +
              "</svg>" +
            "</span>" +
            "<div>" +
              '<strong data-i18n="foot.care">Customer Relations</strong>' +
              '<a href="tel:+94117581333">0117 581 333</a>' +
              '<span data-i18n="foot.careHours">Monday to Friday · 8.30 a.m. to 4.30 p.m.</span>' +
              '<a class="foot-mail" href="mailto:customerrelations@siyapatha.lk">' +
                '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.2" y="5.5" width="17.6" height="13" rx="2"/><path d="m4.2 7.2 7.8 6.2 7.8-6.2"/></svg>' +
                "customerrelations@siyapatha.lk" +
              "</a>" +
            "</div>" +
          "</div>" +
          '<p class="foot-award" data-i18n="foot.award">Great Place to Work · Sri Lanka 2021</p>' +
        "</div>" +
        '<div class="foot-col">' +
          '<h3 data-i18n="foot.explore">Explore</h3>' +
          "<ul>" +
            '<li><a href="index.html#about" data-i18n="foot.profile">Corporate Profile</a></li>' +
            '<li><a href="index.html#rating" data-i18n="nav.rating">Credit Rating</a></li>' +
            '<li><a href="index.html#kpi" data-i18n="nav.kpi">Financial Information &amp; KPI</a></li>' +
            '<li><a href="tender/index.html" data-i18n="nav.vehicles">Vehicles for Sale</a></li>' +
            '<li><a href="index.html#investor" data-i18n="nav.investor">Investor Relations</a></li>' +
            '<li><a href="index.html#sustainability" data-i18n="nav.sustainability">Sustainability</a></li>' +
            '<li><a href="index.html#careers" data-i18n="nav.careers">Careers</a></li>' +
            '<li><a href="branch-locator.html" data-i18n="nav.branches">Branch Network</a></li>' +
            '<li><a href="https://www.sampathvishwa.com/" target="_blank" rel="noopener noreferrer" data-i18n="foot.payments">Payment Facility Methods</a></li>' +
          "</ul>" +
          '<a class="foot-notice" href="index.html#news" data-i18n="foot.notices">Notices</a>' +
        "</div>" +
        '<div class="foot-col">' +
          '<h3 data-i18n="foot.services">Services</h3>' +
          "<ul>" +
            '<li><a href="leasing.html" data-i18n="nav.leasing">Leasing</a></li>' +
            '<li><a href="index.html#gold" data-i18n="nav.gold">Gold Financing</a></li>' +
            '<li><a href="index.html#loans" data-i18n="nav.loans">Loans</a></li>' +
            '<li><a href="index.html#factoring" data-i18n="nav.factoring">Factoring</a></li>' +
            '<li><a href="fixed-deposit-calculator.html" data-i18n="nav.deposits">Fixed Deposits</a></li>' +
            '<li><a href="siyapatha-savings.html" data-i18n="nav.savings">Savings</a></li>' +
          "</ul>" +
          '<div class="foot-hours">' +
            '<h4 data-i18n="foot.hours">Business Hours</h4>' +
            '<p><strong data-i18n="foot.hq">Head Office</strong><span data-i18n="foot.hoursVal">Monday to Friday · 8.30 a.m. to 4.30 p.m.</span></p>' +
            '<p><strong data-i18n="foot.branchHrs">Branches</strong><span data-i18n="foot.hoursVal">Monday to Friday · 8.30 a.m. to 4.30 p.m.</span></p>' +
          "</div>" +
        "</div>" +
        '<div class="foot-network">' +
          '<h3 data-i18n="foot.network">Islandwide Network</h3>' +
          '<p data-i18n="foot.networkLede">Branches across Sri Lanka — find a desk near you.</p>' +
          '<a class="foot-map-cta" href="branch-locator.html" data-i18n="foot.findBranch">Find a branch near you</a>' +
          '<p class="foot-addr" data-i18n="foot.addr">Siyapatha Tower, 111, Dudley Senanayake Mawatha, Colombo 08</p>' +
          '<p class="foot-care-line"><a href="tel:+94117581333">0117 581 333</a></p>' +
        "</div>" +
      "</div>" +
      '<div class="site-foot-bar">' +
        '<div class="path-inner site-foot-bar-inner">' +
          '<p data-i18n="foot.copy">© 2026 Siyapatha Finance PLC. All Rights Reserved.</p>' +
          '<p class="foot-credit"><span data-i18n="foot.solution">Solution by</span> <a href="https://www.affno.com/" target="_blank" rel="noopener noreferrer">Affno</a></p>' +
          '<div class="foot-social" aria-label="Social">' +
            '<a href="https://www.facebook.com/siyapathafinance" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.2 8.4V6.9c0-.7.5-1.1 1.2-1.1h1.4V3h-2.3c-2.4 0-3.8 1.6-3.8 3.9v1.5H8.6V11h2.1v10h3.5V11h2.4l.4-2.6h-2.8Z"/></svg></a>' +
            '<a href="https://www.instagram.com/siyapathafinance" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7.4A4.6 4.6 0 1 0 16.6 12 4.6 4.6 0 0 0 12 7.4Zm0 7.6A3 3 0 1 1 15 12a3 3 0 0 1-3 3Zm5.8-8.8a1.1 1.1 0 1 1-1.1-1.1 1.1 1.1 0 0 1 1.1 1.1ZM19.4 5.5A4.7 4.7 0 0 0 16 3.1 9.2 9.2 0 0 0 12 2.6a9.2 9.2 0 0 0-4 .5A4.7 4.7 0 0 0 4.6 5.5 9.2 9.2 0 0 0 4.1 9.5v5a9.2 9.2 0 0 0 .5 4A4.7 4.7 0 0 0 8 21.4a9.2 9.2 0 0 0 4 .5 9.2 9.2 0 0 0 4-.5 4.7 4.7 0 0 0 3.4-2.9 9.2 9.2 0 0 0 .5-4v-5a9.2 9.2 0 0 0-.5-4ZM17.8 18a3.1 3.1 0 0 1-1.8 1.8 7.4 7.4 0 0 1-4 .4 7.4 7.4 0 0 1-4-.4A3.1 3.1 0 0 1 6.2 18a7.4 7.4 0 0 1-.4-4v-5a7.4 7.4 0 0 1 .4-4A3.1 3.1 0 0 1 8 3.2a7.4 7.4 0 0 1 4-.4 7.4 7.4 0 0 1 4 .4A3.1 3.1 0 0 1 17.8 6a7.4 7.4 0 0 1 .4 4v5a7.4 7.4 0 0 1-.4 3Z"/></svg></a>' +
            '<a href="https://www.linkedin.com/company/siyapatha-finance" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.4 9.2H3.6V20h2.8V9.2ZM5 4a1.7 1.7 0 1 0 0 3.4A1.7 1.7 0 0 0 5 4Zm15.4 6.4c-1.5 0-2.5.7-3 1.4V9.2h-2.8c0 1.3.1 10.8.1 10.8h2.8v-6c0-.3 0-.7.1-1 .3-.7.9-1.5 2-1.5 1.4 0 2 1.1 2 2.7V20H24v-6.4c0-3.2-1.7-4.8-4.6-4.8Z"/></svg></a>' +
            '<a href="https://www.youtube.com/@siyapathafinance" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.8a2.6 2.6 0 0 0-1.8-1.9C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.8 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.2 2.6 2.6 0 0 0 1.8 1.9c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.9A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.2ZM10 15.2V8.8L15.5 12 10 15.2Z"/></svg></a>' +
          "</div>" +
        "</div>" +
      "</div>";

    const scripts = document.querySelector("script[src*='site-chrome.js']");
    if (scripts && scripts.parentNode) scripts.parentNode.insertBefore(footer, scripts);
    else document.body.appendChild(footer);

  }

  function wireA11y() {
    const root = document.documentElement;
    const fab = document.querySelector(".a11y-fab");
    const panel = document.querySelector(".a11y-panel");
    const STORE = "siyapatha-a11y";
    if (!fab || !panel || fab.dataset.wired === "1") return;
    fab.dataset.wired = "1";

    function readPrefs() {
      try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (err) { return {}; }
    }

    function emit() {
      document.dispatchEvent(new CustomEvent("siyapatha-a11y"));
    }

    function applyPrefs(prefs) {
      const text = prefs.text || "md";
      root.dataset.text = text === "md" ? "" : text;
      root.dataset.contrast = prefs.contrast ? "high" : "";
      root.dataset.links = prefs.links ? "on" : "";
      root.dataset.motion = prefs.motion ? "off" : "";
      document.querySelectorAll("[data-text]").forEach((btn) => {
        btn.classList.toggle("is-on", btn.getAttribute("data-text") === text);
      });
      const contrast = document.querySelector("[data-a11y='contrast']");
      const links = document.querySelector("[data-a11y='links']");
      const motion = document.querySelector("[data-a11y='motion']");
      if (contrast) contrast.checked = !!prefs.contrast;
      if (links) links.checked = !!prefs.links;
      if (motion) motion.checked = !!prefs.motion;
      localStorage.setItem(STORE, JSON.stringify({
        text: text,
        contrast: !!prefs.contrast,
        links: !!prefs.links,
        motion: !!prefs.motion
      }));
      emit();
    }

    function openPanel(open) {
      panel.hidden = !open;
      fab.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        const close = panel.querySelector("[data-a11y-close]");
        if (close) close.focus();
      }
    }

    fab.addEventListener("click", () => openPanel(panel.hidden));
    panel.querySelector("[data-a11y-close]").addEventListener("click", () => {
      openPanel(false);
      fab.focus();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        openPanel(false);
        fab.focus();
      }
    });
    document.querySelectorAll("[data-text]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const prefs = readPrefs();
        prefs.text = btn.getAttribute("data-text");
        applyPrefs(prefs);
      });
    });
    panel.querySelectorAll("[data-a11y]").forEach((input) => {
      input.addEventListener("change", () => {
        const prefs = readPrefs();
        prefs[input.getAttribute("data-a11y")] = input.checked;
        applyPrefs(prefs);
      });
    });
    panel.querySelector("[data-a11y-reset]").addEventListener("click", () => {
      applyPrefs({ text: "md", contrast: false, links: false, motion: false });
    });
    applyPrefs(readPrefs());
  }

  function wireChat() {
    const chatBtn = document.querySelector("[data-chat-ai]");
    const chatPanel = document.querySelector("#ai-chat-panel");
    const chatClose = document.querySelector("[data-chat-close]");
    const chatForm = document.querySelector("[data-chat-form]");
    const chatLog = document.querySelector("[data-chat-log]");
    const chatInput = document.querySelector("#ai-chat-input");
    if (!chatBtn || !chatPanel || chatBtn.dataset.wired === "1") return;
    chatBtn.dataset.wired = "1";

    function chatReply(q) {
      const text = (q || "").toLowerCase();
      if (text.includes("branch") || text.includes("near")) {
        return { html: 'You can open the <a href="branch-locator.html">branch locator</a> to search by town and preview the map.' };
      }
      if (text.includes("rate") || text.includes("deposit") || text.includes("fd")) {
        return { html: 'See the latest snapshot on the <a href="index.html#rates">home rates</a> section — fixed deposits, savings, and more.' };
      }
      if (text.includes("leas") || text.includes("vehicle") || text.includes("car")) {
        return { html: 'Explore flexible plans on our <a href="leasing.html">Leasing</a> page, or message us on WhatsApp for a quick desk callback.' };
      }
      if (text.includes("gold") || text.includes("loan") || text.includes("saving")) {
        return { html: 'Products are listed under Products in the menu — or tell me leasing, deposits, or a branch town and I’ll point you there.' };
      }
      return { html: 'Thanks — for live help, tap <a href="https://wa.me/94777605605" target="_blank" rel="noopener noreferrer">WhatsApp</a>, or ask about leasing, rates, or branches here.' };
    }

    function openChat(open) {
      chatPanel.hidden = !open;
      chatBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open && chatInput) chatInput.focus();
    }

    chatBtn.addEventListener("click", () => openChat(chatPanel.hidden));
    if (chatClose) {
      chatClose.addEventListener("click", () => {
        openChat(false);
        chatBtn.focus();
      });
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !chatPanel.hidden) {
        openChat(false);
        chatBtn.focus();
      }
    });

    if (chatForm && chatLog && chatInput) {
      chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const q = chatInput.value.trim();
        if (!q) return;
        const you = document.createElement("p");
        you.className = "ai-bubble is-you";
        you.textContent = q;
        chatLog.appendChild(you);
        chatInput.value = "";
        const reply = document.createElement("p");
        reply.className = "ai-bubble";
        reply.innerHTML = chatReply(q).html;
        chatLog.appendChild(reply);
        chatLog.scrollTop = chatLog.scrollHeight;
      });
    }
  }

  function boot() {
    mountChrome();
    wireA11y();
    wireChat();
    if (window.I18n && typeof window.I18n.apply === "function") window.I18n.apply();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
