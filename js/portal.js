(function () {
  const KEYS = {
    users: "siyapatha-bidders",
    session: "siyapatha-session",
    quotes: "siyapatha-quotes",
  };

  const terms = [
    "The company reserves the right to withdraw any vehicle from the tender process without any notice.",
    "The successful bidder has to pay the full bidding amount within 03 working days if the company decides to sell vehicles on tender. The company also has the right to sell the vehicles to any other party.",
    "Vehicles will be sold as is and will not be returned to the company for any reason, and the company is not liable to accept the vehicle after sale.",
    "Any advance payments for sale of vehicles on tender will not be refunded and may be forfeited.",
    "On the date of viewing the vehicle you should inspect it properly; complaints will not be accepted after the sale is completed.",
    "Without prejudice to our legal rights, the sale of the vehicle is solely at the discretion of the company.",
    "25% of the value of the vehicle will be deposited as an advance payment for any purchase.",
  ];

  const yards = [
    {
      id: "pamankada",
      name: "Pamankada yard",
      number: "Y-01",
      contact: "Suranjith",
      sales: "Suranjith",
      mobile: "076 324 1184",
      address: "Pamankada, Colombo",
    },
    {
      id: "piliyandala",
      name: "Piliyandala yard",
      number: "Y-02",
      contact: "Srilal",
      sales: "Srilal",
      mobile: "076 573 1397",
      address: "Piliyandala",
    },
    {
      id: "pamankada-siyapatha",
      name: "Pamankada Siyapatha yard",
      number: "Y-03",
      contact: "Suranjith",
      sales: "Suranjith",
      mobile: "076 324 1184",
      address: "Pamankada, Colombo",
    },
  ];

  const vehicles = [
    { id: "foton-truck", title: "Foton Light Truck", category: "Dual purpose", plate: "WP PR-XXXX", year: "2011", mileage: "", fuel: "Diesel", yardId: "piliyandala", closesAt: "2026-11-20T15:00:00+05:30", closes: "20 Nov 2026, 3.00 p.m.", images: ["../assets/vehicles/foton-truck.jpg"] },
    { id: "hiace", title: "Toyota LH125 Hiace", category: "Motor coach", plate: "Registered 1991", year: "1991", mileage: "72,052 km", fuel: "Diesel", yardId: "pamankada", closesAt: "2026-11-12T15:00:00+05:30", closes: "12 Nov 2026, 3.00 p.m.", images: ["../assets/vehicles/hiace-lh125.jpg"] },
    { id: "figo", title: "Ford Figo", category: "Motor car", plate: "WP KV-XXXX", year: "2011", registered: "2012", mileage: "83,600 km", fuel: "Petrol", yardId: "pamankada", closesAt: "2026-11-20T15:00:00+05:30", closes: "20 Nov 2026, 3.00 p.m.", images: ["../assets/vehicles/ford-figo.jpg"] },
    { id: "wagon-r", title: "Suzuki Wagon R", category: "Motor car", plate: "WP CAY-XXXX", year: "2018", mileage: "68,300 km", fuel: "Petrol", yardId: "pamankada", closesAt: "2026-11-11T15:00:00+05:30", closes: "11 Nov 2026, 3.00 p.m.", images: ["../assets/vehicles/wagon-r.jpg"] },
    { id: "mitsubishi-coach", title: "Mitsubishi Motor Coach", category: "Motor coach", plate: "WP NF-XXXX", year: "2013", registered: "2015", mileage: "", fuel: "Diesel", yardId: "piliyandala", closesAt: "2026-11-20T15:00:00+05:30", closes: "20 Nov 2026, 3.00 p.m.", images: ["../assets/vehicles/mitsubishi-coach.jpg"] },
    { id: "s320", title: "Mercedes-Benz S320", category: "Motor car", plate: "WP KE-XXXX", year: "2002", mileage: "", fuel: "Petrol", yardId: "pamankada-siyapatha", closesAt: "2026-11-13T15:00:00+05:30", closes: "13 Nov 2026, 3.00 p.m.", images: ["../assets/vehicles/mercedes-s320.jpg"] },
    { id: "familia", title: "Mazda Familia", category: "Motor car", plate: "SP KB-3XXX", year: "2002", mileage: "", fuel: "Petrol", transmission: "Automatic", yardId: "pamankada", closesAt: "2026-11-05T15:00:00+05:30", closes: "05 Nov 2026, 3.00 p.m.", images: ["../assets/vehicles/mazda-familia.jpg"] },
    { id: "fuso", title: "Mitsubishi Fuso", category: "Motor coach", plate: "WP NB-7XXX", year: "2008", registered: "2014", seats: "33", mileage: "", fuel: "Diesel", yardId: "piliyandala", closesAt: "2026-11-20T15:00:00+05:30", closes: "20 Nov 2026, 3.00 p.m.", images: ["../assets/vehicles/fuso-rosa.jpg"] },
  ].map((lot) => {
    const yard = yards.find((item) => item.id === lot.yardId);
    return Object.assign({}, lot, {
      image: lot.images[0],
      location: yard ? yard.name : "",
    });
  });

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function read(key) {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null || raw === "") return [];
      const parsed = JSON.parse(raw);
      return parsed == null ? [] : parsed;
    } catch (e) {
      return [];
    }
  }
  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }
  function session() {
    try {
      const raw = localStorage.getItem(KEYS.session);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch (e) {
      return null;
    }
  }
  function under1000(n) {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + under1000(n % 100) : "");
  }
  function rupeesInWords(value) {
    const n = Math.floor(Number(String(value).replace(/,/g, "")));
    if (!n || n < 0) return "";
    const crore = Math.floor(n / 10000000);
    const lakh = Math.floor((n % 10000000) / 100000);
    const thousand = Math.floor((n % 100000) / 1000);
    const rest = n % 1000;
    const parts = [];
    if (crore) parts.push(under1000(crore) + " Crore");
    if (lakh) parts.push(under1000(lakh) + " Lakh");
    if (thousand) parts.push(under1000(thousand) + " Thousand");
    if (rest) parts.push(under1000(rest));
    return "Rupees " + parts.join(" ") + " Only";
  }
  function money(n) {
    return "Rs. " + Number(n).toLocaleString("en-LK");
  }
  function vehicle(id) { return vehicles.find((item) => item.id === id); }
  function yardById(id) { return yards.find((item) => item.id === id); }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  }

  function t(key) {
    return window.I18n ? I18n.t(key) : key;
  }

  function daysUntil(closesAt) {
    const end = new Date(closesAt).getTime();
    if (Number.isNaN(end)) return 0;
    return Math.ceil((end - Date.now()) / 86400000);
  }

  function remainingParts(closesAt) {
    const end = new Date(closesAt).getTime();
    if (Number.isNaN(end)) {
      return { days: 0, hours: 0, min: 0, sec: 0, closed: true, ms: 0 };
    }
    const ms = Math.max(0, end - Date.now());
    const totalSec = Math.floor(ms / 1000);
    return {
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      min: Math.floor((totalSec % 3600) / 60),
      sec: totalSec % 60,
      closed: ms <= 0,
      ms: ms,
    };
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function lotStatus(lot) {
    const parts = remainingParts(lot.closesAt);
    if (parts.closed) return "closed";
    if (parts.days <= 3) return "closingSoon";
    return "live";
  }

  function statusLabel(status) {
    if (status === "live") return t("tn.statusLive");
    if (status === "closingSoon") return t("tn.statusClosing");
    return t("tn.closed");
  }

  function countdownLabel(lot) {
    const days = daysUntil(lot.closesAt);
    if (days < 0) return t("tn.closed");
    if (days === 0) return t("tn.closesToday");
    if (days === 1) return t("tn.closesIn1");
    return t("tn.closesIn").replace("{n}", String(days));
  }

  function kindLabel(category) {
    if (category === "Motor car") return t("tn.car");
    if (category === "Motor coach") return t("tn.coach");
    if (category === "Dual purpose") return t("tn.dual");
    return category;
  }

  function logo() {
    return '<img class="brand-logo" src="../assets/logo.png" alt="Siyapatha Finance">';
  }

  function langSwitch() {
    const current = window.I18n ? I18n.lang() : "en";
    const item = (code, label, name) => '<button type="button" data-lang="' + code + '"' + (current === code ? ' class="is-on"' : "") + ' aria-pressed="' + (current === code) + '" aria-label="' + name + '">' + label + "</button>";
    return '<div class="lang" role="group" aria-label="Language">' + item("en", "EN", "English") + item("si", "සිං", "සිංහල") + item("ta", "த", "தமிழ்") + "</div>";
  }

  let navId = "tenders";
  function mount(active) {
    navId = active || navId;
    const user = session();
    const slot = document.querySelector("[data-header]");
    if (!slot) return;
    const link = (id, href, label) => '<a class="' + (navId === id ? "is-on" : "") + '" href="' + href + '">' + label + "</a>";
    const account = user
      ? '<a class="who" href="dashboard.html">' + escapeHtml(user.name.split(" ")[0]) + '</a><button type="button" class="text-btn" data-logout>' + t("tn.signout") + "</button>"
      : '<a class="btn btn-line" href="login.html">' + t("tn.signin") + '</a><a class="btn btn-fill" href="register.html">' + t("tn.register") + "</a>";
    slot.innerHTML = '<header class="bar"><a class="brand" href="../index.html">' + logo() + '</a><nav class="bar-nav">' +
      link("home", "../index.html", t("tn.home")) +
      link("tenders", "index.html", t("tn.open")) +
      link("quotes", "dashboard.html", t("tn.quotes")) +
      link("form", "quotation.html", t("tn.paper")) +
      "</nav><div class=\"bar-actions\">" + langSwitch() + account + "</div></header>";
    const out = slot.querySelector("[data-logout]");
    if (out) out.addEventListener("click", () => { localStorage.removeItem(KEYS.session); location.href = "index.html"; });
  }

  function currentPage() {
    let page = (location.pathname.split("/").pop() || "index.html").trim();
    if (!page || page === "tender") page = "index.html";
    if (!/\.html$/i.test(page)) page += ".html";
    return page;
  }

  function requireUser() {
    if (session()) return session();
    const next = currentPage() + location.search;
    location.href = "login.html?next=" + encodeURIComponent(next);
    return null;
  }

  function safeNext(value) {
    if (!value) return "dashboard.html";
    const raw = String(value).trim();
    const match = raw.match(/^([a-z0-9-]+)(?:\.html)?(\?id=[a-z0-9-]+)?$/i);
    if (!match) return "dashboard.html";
    return match[1].toLowerCase() + ".html" + (match[2] || "");
  }

  function updateStatusCounts() {
    const counts = { all: vehicles.length, live: 0, closingSoon: 0, closed: 0 };
    vehicles.forEach((lot) => { counts[lotStatus(lot)] += 1; });
    const map = {
      all: "[data-count-all]",
      live: "[data-count-live]",
      closingSoon: "[data-count-closing]",
      closed: "[data-count-closed]",
    };
    Object.keys(map).forEach((key) => {
      const el = document.querySelector(map[key]);
      if (el) el.textContent = String(counts[key]);
    });
    const open = document.querySelector("[data-count]");
    if (open) open.textContent = String(counts.live + counts.closingSoon);
  }

  function fillYardSelect() {
    const select = document.querySelector("[data-yard]");
    if (!select || select.dataset.filled === "1") return;
    const keep = select.querySelector("option[value='']");
    select.innerHTML = "";
    if (keep) select.appendChild(keep);
    else {
      const all = document.createElement("option");
      all.value = "";
      all.setAttribute("data-i18n", "tn.allYards");
      all.textContent = t("tn.allYards");
      select.appendChild(all);
    }
    yards.forEach((yard) => {
      const option = document.createElement("option");
      option.value = yard.id;
      option.textContent = yard.name;
      select.appendChild(option);
    });
    select.dataset.filled = "1";
  }

  function renderLots(list, total) {
    const grid = document.querySelector("[data-lots]");
    if (!grid) return;
    updateStatusCounts();
    const showing = document.querySelector("[data-showing]");
    if (showing) {
      showing.textContent = t("tn.showing")
        .replace("{n}", String(list.length))
        .replace("{total}", String(total == null ? vehicles.length : total));
    }
    if (!list.length) {
      grid.innerHTML = '<p class="empty">' + t("tn.empty") + "</p>";
      return;
    }
    grid.innerHTML = list.map((lot) => {
      const status = lotStatus(lot);
      const metas = [
        lot.year && (t("tn.year") + " " + lot.year),
        lot.mileage || t("tn.mileageNa"),
        lot.fuel,
        lot.transmission,
        lot.seats && (lot.seats + " " + t("tn.seats")),
      ].filter(Boolean);
      return '<article class="lot">' +
        '<div class="lot-media">' +
          '<img class="lot-img" src="' + escapeHtml(lot.image) + '" alt="' + escapeHtml(lot.title) + '">' +
          '<span class="status-badge is-' + status + '">' + escapeHtml(statusLabel(status)) + "</span>" +
          '<span class="lot-countdown">' + escapeHtml(countdownLabel(lot)) + "</span>" +
        "</div>" +
        '<div class="lot-body">' +
          '<p class="kicker">' + escapeHtml(kindLabel(lot.category)) + "</p>" +
          "<h3>" + escapeHtml(lot.title) + "</h3>" +
          '<p class="plate">' + escapeHtml(lot.plate) + "</p>" +
          '<div class="lot-metas">' + metas.map((bit) => '<span class="lot-meta"><i></i>' + escapeHtml(bit) + "</span>").join("") + "</div>" +
          '<p class="yard">' + escapeHtml(lot.location) + "</p>" +
          '<div class="lot-foot"><span>' + t("tn.highest") + '</span><a class="btn btn-sm btn-fill" href="vehicle.html?id=' + lot.id + '">' + t("tn.view") + "</a></div>" +
        "</div></article>";
    }).join("");
  }

  let activeYardInfo = "";

  function fillYardInfoSelect() {
    const select = document.querySelector("[data-yard-info]");
    if (!select) return;
    const current = select.value || activeYardInfo || "";
    const allLabel = t("tn.allYards");
    select.innerHTML = "";
    const all = document.createElement("option");
    all.value = "";
    all.setAttribute("data-i18n", "tn.allYards");
    all.textContent = allLabel;
    select.appendChild(all);
    yards.forEach((yard) => {
      const option = document.createElement("option");
      option.value = yard.id;
      option.textContent = yard.name;
      select.appendChild(option);
    });
    select.value = yards.some((yard) => yard.id === current) ? current : "";
    activeYardInfo = select.value;
    if (select.dataset.bound === "1") return;
    select.dataset.bound = "1";
    select.addEventListener("change", () => {
      activeYardInfo = select.value || "";
      renderYards();
    });
  }

  function renderYards() {
    const root = document.querySelector("[data-yards]");
    if (!root) return;
    fillYardInfoSelect();
    const list = activeYardInfo
      ? yards.filter((yard) => yard.id === activeYardInfo)
      : yards;
    if (!list.length) {
      root.innerHTML = '<p class="empty">' + t("tn.emptyYards") + "</p>";
      return;
    }
    root.innerHTML = list.map((yard) => {
      const rows = [
        [t("yard.name"), yard.name],
        [t("yard.number"), yard.number],
        [t("yard.contact"), yard.contact],
        [t("yard.sales"), yard.sales],
        [t("yard.mobile"), yard.mobile],
        [t("yard.address"), yard.address],
      ];
      return '<article class="yard-card" data-yard-id="' + escapeHtml(yard.id) + '"><h3>' + escapeHtml(yard.name) + "</h3><dl>" +
        rows.map((row) => "<div><dt>" + escapeHtml(row[0]) + "</dt><dd>" + escapeHtml(row[1]) + "</dd></div>").join("") +
        "</dl></article>";
    }).join("");
  }

  let activeStatus = "all";

  function bindFilters() {
    const grid = document.querySelector("[data-lots]");
    if (!grid) return;
    fillYardSelect();
    renderYards();
    const search = document.querySelector("[data-search]");
    const yard = document.querySelector("[data-yard]");
    const kind = document.querySelector("[data-kind]");
    const yearFrom = document.querySelector("[data-year-from]");
    const yearTo = document.querySelector("[data-year-to]");
    const tabs = document.querySelector("[data-status-tabs]");

    const years = vehicles
      .map((lot) => parseInt(lot.year, 10))
      .filter((y) => Number.isFinite(y));
    const minYear = years.length ? Math.min(...years) : 1980;
    const maxYear = years.length ? Math.max(...years) : new Date().getFullYear();
    [yearFrom, yearTo].forEach((el) => {
      if (!el) return;
      el.min = String(minYear);
      el.max = String(maxYear);
      if (!el.placeholder) el.placeholder = el === yearFrom ? String(minYear) : String(maxYear);
    });
    if (yearFrom && !yearFrom.value) yearFrom.placeholder = "From " + minYear;
    if (yearTo && !yearTo.value) yearTo.placeholder = "To " + maxYear;

    function apply() {
      const q = ((search && search.value) || "").trim().toLowerCase();
      const fromY = yearFrom && yearFrom.value !== "" ? parseInt(yearFrom.value, 10) : null;
      const toY = yearTo && yearTo.value !== "" ? parseInt(yearTo.value, 10) : null;
      const filtered = vehicles.filter((lot) => {
        const status = lotStatus(lot);
        if (activeStatus !== "all" && status !== activeStatus) return false;
        const blob = (lot.title + " " + lot.plate + " " + lot.category + " " + lot.location).toLowerCase();
        if (q && !blob.includes(q)) return false;
        if (yard && yard.value && lot.yardId !== yard.value) return false;
        if (kind && kind.value && lot.category !== kind.value) return false;
        const y = parseInt(lot.year, 10);
        if (fromY != null && Number.isFinite(fromY)) {
          if (!Number.isFinite(y) || y < fromY) return false;
        }
        if (toY != null && Number.isFinite(toY)) {
          if (!Number.isFinite(y) || y > toY) return false;
        }
        return true;
      });
      renderLots(filtered, vehicles.length);
    }

    paintLots = apply;

    if (tabs && !tabs.dataset.bound) {
      tabs.dataset.bound = "1";
      tabs.addEventListener("click", (event) => {
        const btn = event.target.closest("[data-status]");
        if (!btn) return;
        activeStatus = btn.getAttribute("data-status") || "all";
        tabs.querySelectorAll("[data-status]").forEach((el) => el.classList.toggle("is-on", el === btn));
        apply();
      });
    }

    [search, yard, kind, yearFrom, yearTo].forEach((el) => {
      if (!el || el.dataset.bound === "1") return;
      el.dataset.bound = "1";
      el.addEventListener("input", apply);
      el.addEventListener("change", apply);
    });
    apply();
  }

  function renderVehicle() {
    const root = document.querySelector("[data-vehicle]");
    if (!root) return;
    const lot = vehicle(new URLSearchParams(location.search).get("id"));
    if (!lot) { location.href = "index.html"; return; }
    document.title = lot.title + " | Siyapatha Tenders";
    const status = lotStatus(lot);
    const yard = yardById(lot.yardId);
    const facts = [
      [t("fact.no"), lot.plate],
      [t("fact.category"), kindLabel(lot.category)],
      [t("fact.year"), lot.year],
      [t("fact.registered"), lot.registered],
      [t("fact.mileage"), lot.mileage || t("tn.mileageNa")],
      [t("fact.fuel"), lot.fuel],
      [t("fact.transmission"), lot.transmission],
      [t("fact.seats"), lot.seats],
      [t("fact.inspection"), lot.location],
      [t("fact.close"), lot.closes],
    ].filter((row) => row[1]);

    const images = lot.images && lot.images.length ? lot.images : [lot.image];
    const thumbs = images.length > 1
      ? '<div class="lot-thumbs">' + images.map((src, i) =>
          '<button type="button" class="lot-thumb-btn' + (i === 0 ? " is-on" : "") + '" data-gallery-src="' + escapeHtml(src) + '"><img src="' + escapeHtml(src) + '" alt=""></button>'
        ).join("") + "</div>"
      : "";

    const closed = status === "closed";
    const user = session();
    const myOffer = user
      ? read(KEYS.quotes).find((quote) => quote.email === user.email && quote.vehicleId === lot.id)
      : null;
    const parts = remainingParts(lot.closesAt);

    root.innerHTML =
      '<div class="tn-rise" style="--i:0">' +
        '<p class="crumb"><a href="index.html">' + t("tn.open") + "</a> / " + escapeHtml(lot.plate) + "</p>" +
        '<div class="lot-gallery"><img class="lot-hero" data-hero src="' + escapeHtml(images[0]) + '" alt="' + escapeHtml(lot.title) + '">' + thumbs + "</div>" +
        '<div class="vehicle-head"><div><p class="kicker">' + escapeHtml(kindLabel(lot.category)) + "</p><h1>" + escapeHtml(lot.title) + "</h1></div>" +
        '<span class="status-badge is-' + status + '">' + escapeHtml(statusLabel(status)) + "</span></div>" +
        '<p class="lead">' + t("lot.lead") + "</p>" +
        '<dl class="spec-grid tn-rise" style="--i:1">' + facts.map((row) => "<div><dt>" + row[0] + "</dt><dd>" + escapeHtml(row[1]) + "</dd></div>").join("") + "</dl>" +
        (yard ? '<p class="yard">' + escapeHtml(yard.name) + " · " + escapeHtml(yard.mobile) + "</p>" : "") +
        '<div class="tn-rise" style="--i:2"><h2>' + t("lot.terms") + '</h2><ol class="terms-panel">' +
        terms.map((line, i) => "<li><b>0" + (i + 1) + ".</b><span>" + escapeHtml(line) + "</span></li>").join("") +
        "</ol></div></div>" +
      '<aside class="bid-card tn-rise tn-rise-side" style="--i:1" data-bid-card>' +
        "<h2>" + t("tn.highest") + "</h2>" +
        '<p class="closes-line">' + t("lot.closes") + " " + escapeHtml(lot.closes) + "</p>" +
        '<div class="lot-timer" data-lot-timer aria-live="polite">' +
          '<div><strong data-t-days>' + pad2(parts.days) + "</strong><span>" + t("lot.days") + "</span></div>" +
          '<div><strong data-t-hours>' + pad2(parts.hours) + "</strong><span>" + t("lot.hours") + "</span></div>" +
          '<div><strong data-t-min>' + pad2(parts.min) + "</strong><span>" + t("lot.min") + "</span></div>" +
          '<div><strong data-t-sec>' + pad2(parts.sec) + "</strong><span>" + t("lot.sec") + "</span></div>" +
        "</div>" +
        '<p class="lot-timer-status" data-timer-status>' + (closed ? t("lot.quotesClosed") : t("lot.quotesOpen")) + "</p>" +
        '<div class="your-offer">' +
          "<h3>" + t("lot.yourOffer") + "</h3>" +
          '<div class="your-offer-box" data-your-offer>' +
            (myOffer
              ? '<strong data-offer-amount>' + escapeHtml(money(myOffer.price)) + "</strong><span>" + escapeHtml(myOffer.ref) + "</span>"
              : '<span class="your-offer-empty">' + (closed ? t("lot.noOffer") : t("lot.noOfferYet")) + "</span>") +
          "</div>" +
        "</div>" +
        (closed
          ? '<button class="btn btn-line" type="button" disabled>' + t("tn.closed") + "</button>"
          : '<a class="btn btn-fill" href="quote.html?id=' + lot.id + '">' + (myOffer ? t("lot.updateOffer") : t("lot.submit")) + "</a>") +
        '<a class="btn btn-line" href="quotation.html">' + t("lot.print") + "</a>" +
        '<p class="help">Suranjith 076 324 1184 · Srilal 076 573 1397</p></aside>';

    root.querySelectorAll("[data-gallery-src]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const hero = root.querySelector("[data-hero]");
        if (hero) hero.src = btn.getAttribute("data-gallery-src");
        root.querySelectorAll("[data-gallery-src]").forEach((el) => el.classList.toggle("is-on", el === btn));
      });
    });

    bindLotTimer(lot);
    requestAnimationFrame(function () {
      root.classList.add("is-ready");
    });
  }

  let lotTimerId = 0;
  function setTimerDigit(el, value) {
    if (!el) return;
    const next = pad2(value);
    if (el.textContent === next) return;
    el.textContent = next;
    el.classList.remove("is-tick");
    void el.offsetWidth;
    el.classList.add("is-tick");
  }

  function bindLotTimer(lot) {
    if (lotTimerId) window.clearInterval(lotTimerId);
    const daysEl = document.querySelector("[data-t-days]");
    const hoursEl = document.querySelector("[data-t-hours]");
    const minEl = document.querySelector("[data-t-min]");
    const secEl = document.querySelector("[data-t-sec]");
    const statusEl = document.querySelector("[data-timer-status]");
    const card = document.querySelector("[data-bid-card]");
    if (!daysEl || !hoursEl || !minEl || !secEl) return;

    function tick() {
      const parts = remainingParts(lot.closesAt);
      setTimerDigit(daysEl, parts.days);
      setTimerDigit(hoursEl, parts.hours);
      setTimerDigit(minEl, parts.min);
      setTimerDigit(secEl, parts.sec);
      if (statusEl) statusEl.textContent = parts.closed ? t("lot.quotesClosed") : t("lot.quotesOpen");
      if (card) card.classList.toggle("is-closed", parts.closed);
      if (parts.closed && lotTimerId) {
        window.clearInterval(lotTimerId);
        lotTimerId = 0;
      }
    }

    tick();
    if (!remainingParts(lot.closesAt).closed) {
      lotTimerId = window.setInterval(tick, 1000);
    }
  }

  function landInner(root) {
    if (!root) return;
    root.querySelectorAll(".bid-rail, .sheet, .ipg-portal, .auth-card, .done").forEach((el, i) => {
      el.classList.add("tn-rise");
      if (el.classList.contains("bid-rail") || el.classList.contains("auth-card")) el.classList.add("tn-rise-side");
      el.style.setProperty("--i", String(i));
    });
    requestAnimationFrame(function () { root.classList.add("is-ready"); });
  }

  function renderQuote() {
    const form = document.querySelector("[data-quote]");
    if (!form) return;
    const user = requireUser();
    if (!user) return;
    const lot = vehicle(new URLSearchParams(location.search).get("id"));
    if (!lot) { location.href = "index.html"; return; }
    document.title = "Quotation | " + lot.title;
    landInner(document.querySelector(".quote-layout"));
    document.querySelector("[data-lot-name]").textContent = lot.title;
    document.querySelector("[data-lot-plate]").textContent = lot.plate;
    const closes = document.querySelector("[data-lot-closes]");
    if (closes) closes.textContent = t("lot.closes") + " " + lot.closes + " · " + countdownLabel(lot);
    const thumb = document.querySelector("[data-lot-photo]");
    if (thumb) { thumb.src = lot.image; thumb.alt = lot.title; thumb.hidden = false; }
    form.vehicleNo.value = lot.plate;
    form.date.value = new Date().toISOString().slice(0, 10);
    form.name.value = user.name;
    form.address.value = user.address;
    form.tel.value = user.tel;
    form.querySelector("[data-terms]").innerHTML = terms.map((line, i) => "<li><b>0" + (i + 1) + ".</b><span>" + escapeHtml(line) + "</span></li>").join("");
    form.price.addEventListener("input", () => { form.words.value = rupeesInWords(form.price.value); });

    const ipg = document.querySelector("[data-ipg]");
    const ipgCard = document.querySelector("[data-ipg-card]");
    const ipgVishwa = document.querySelector("[data-ipg-vishwa]");
    const ipgStatus = document.querySelector("[data-ipg-status]");
    const ipgLot = document.querySelector("[data-ipg-lot]");
    const rail = document.querySelector(".bid-rail");
    let draft = null;

    function showStep(step) {
      form.hidden = step !== "form";
      if (ipg) ipg.hidden = step !== "pay";
      const done = document.querySelector("[data-done]");
      if (done) done.hidden = step !== "done";
      if (rail) rail.hidden = step === "done";
    }

    function setIpgMethod(method) {
      document.querySelectorAll("[data-ipg-method]").forEach((btn) => {
        btn.classList.toggle("is-on", btn.getAttribute("data-ipg-method") === method);
      });
      if (ipgCard) ipgCard.hidden = method !== "card";
      if (ipgVishwa) ipgVishwa.hidden = method !== "vishwa";
      if (ipgStatus) ipgStatus.textContent = "";
    }

    function finalizeQuote(payment) {
      if (!draft) return;
      const quotes = read(KEYS.quotes);
      const ref = "SF-" + new Date().getFullYear() + "-" + String(quotes.length + 41).padStart(4, "0");
      const payRef = "IPG-" + Date.now().toString().slice(-8);
      quotes.unshift({
        ref: ref,
        vehicleId: lot.id,
        title: lot.title,
        plate: lot.plate,
        image: lot.image,
        name: draft.name,
        address: draft.address,
        tel: draft.tel,
        email: user.email,
        price: draft.price,
        words: draft.words,
        date: draft.date,
        fee: 400,
        feePaid: true,
        paymentRef: payRef,
        paymentMethod: payment.method,
        paidAt: new Date().toISOString(),
        status: "Submitted",
      });
      write(KEYS.quotes, quotes);
      showStep("done");
      document.querySelector("[data-ref]").textContent = ref;
      document.querySelector("[data-done-price]").textContent = money(draft.price) + " — " + draft.words;
      const paidLine = document.querySelector("[data-paid-line]");
      if (paidLine) {
        paidLine.textContent = t("ipg.paidLine")
          .replace("{amount}", "Rs. 400.00")
          .replace("{ref}", payRef);
      }
      const donePhoto = document.querySelector("[data-done-photo]");
      if (donePhoto) { donePhoto.src = lot.image; donePhoto.alt = lot.title; donePhoto.hidden = false; }
      draft = null;
    }

    function simulatePay(method) {
      if (ipgStatus) ipgStatus.textContent = t("ipg.processing");
      const payBtns = ipg ? ipg.querySelectorAll("button, input") : [];
      payBtns.forEach((el) => { el.disabled = true; });
      window.setTimeout(() => {
        payBtns.forEach((el) => { el.disabled = false; });
        finalizeQuote({ method: method });
      }, 1200);
    }

    if (ipgLot) ipgLot.textContent = lot.title + " · " + t("ipg.feeOnly");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-status]");
      const amount = Number(String(form.price.value).replace(/,/g, ""));
      if (!amount || amount < 1) { status.textContent = t("q.needPrice"); return; }
      if (!form.words.value.trim()) { status.textContent = t("q.needWords"); return; }
      if (!form.terms.checked) { status.textContent = t("q.needTerms"); return; }
      status.textContent = "";
      draft = {
        name: form.name.value.trim(),
        address: form.address.value.trim(),
        tel: form.tel.value.trim(),
        price: amount,
        words: form.words.value.trim(),
        date: form.date.value,
      };
      setIpgMethod("card");
      showStep("pay");
      if (ipg) ipg.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    if (ipg && !ipg.dataset.bound) {
      ipg.dataset.bound = "1";
      ipg.querySelectorAll("[data-ipg-method]").forEach((btn) => {
        btn.addEventListener("click", () => setIpgMethod(btn.getAttribute("data-ipg-method")));
      });
      const back = ipg.querySelector("[data-ipg-back]");
      if (back) {
        back.addEventListener("click", () => {
          showStep("form");
          if (ipgStatus) ipgStatus.textContent = "";
        });
      }
      if (ipgCard) {
        const number = ipgCard.querySelector("#ipg-number");
        const exp = ipgCard.querySelector("#ipg-exp");
        if (number) {
          number.addEventListener("input", () => {
            const digits = number.value.replace(/\D/g, "").slice(0, 16);
            number.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
          });
        }
        if (exp) {
          exp.addEventListener("input", () => {
            const digits = exp.value.replace(/\D/g, "").slice(0, 4);
            exp.value = digits.length > 2 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
          });
        }
        ipgCard.addEventListener("submit", (event) => {
          event.preventDefault();
          if (!ipgCard.checkValidity()) {
            if (ipgStatus) ipgStatus.textContent = t("ipg.needCard");
            ipgCard.reportValidity();
            return;
          }
          simulatePay("card");
        });
      }
      const vishwaPay = ipg.querySelector("[data-ipg-vishwa-pay]");
      if (vishwaPay) {
        vishwaPay.addEventListener("click", () => {
          window.open("https://www.sampathvishwa.com/", "_blank", "noopener,noreferrer");
          if (ipgStatus) ipgStatus.textContent = t("ipg.vishwaReturn");
          window.setTimeout(() => simulatePay("vishwa"), 900);
        });
      }
    }
  }

  function renderDashboard() {
    const root = document.querySelector("[data-dashboard]");
    if (!root) return;
    const user = requireUser();
    if (!user) return;
    const mine = read(KEYS.quotes).filter((quote) => quote.email === user.email);
    const hello = document.querySelector("[data-hello]");
    if (hello) hello.textContent = user.name;
    if (!mine.length) {
      root.innerHTML = '<p class="empty">' + t("dash.empty") + ' <a href="index.html">' + t("dash.browse") + "</a>.</p>";
      return;
    }
    root.innerHTML = mine.map((quote) => {
      const lot = vehicle(quote.vehicleId);
      const img = quote.image || (lot && lot.image) || "../assets/logo.png";
      return '<article class="quote-row">' +
        '<img class="quote-row-img" src="' + escapeHtml(img) + '" alt="' + escapeHtml(quote.title) + '">' +
        '<div class="quote-row-main">' +
          '<p class="quote-row-ref">' + escapeHtml(quote.ref) + "</p>" +
          "<h3>" + escapeHtml(quote.title) + "</h3>" +
          '<p class="plate">' + escapeHtml(quote.plate) + "</p>" +
        "</div>" +
        '<div class="quote-row-meta">' +
          "<strong>" + money(quote.price) + "</strong>" +
          "<span>" + escapeHtml(quote.date) + "</span>" +
          '<span class="pill">' + escapeHtml(quote.status) + "</span>" +
          (quote.feePaid
            ? '<span class="pill is-paid">' + t("ipg.feePaid") + (quote.paymentRef ? " · " + escapeHtml(quote.paymentRef) : "") + "</span>"
            : "") +
          (quote.vehicleId ? '<a href="vehicle.html?id=' + encodeURIComponent(quote.vehicleId) + '">' + t("dash.openLot") + "</a>" : "") +
        "</div></article>";
    }).join("");
  }

  function bindAuth() {
    landInner(document.querySelector(".auth-layout"));
    const login = document.querySelector("[data-login]");
    if (login) {
      login.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = login.querySelector("[data-status]");
        const email = login.email.value.trim().toLowerCase();
        const users = Array.isArray(read(KEYS.users)) ? read(KEYS.users) : [];
        const user = users.find((item) => item.email === email && item.password === login.password.value);
        if (!user) { status.textContent = t("q.badLogin"); return; }
        if (!write(KEYS.session, { name: user.name, email: user.email, address: user.address, tel: user.tel })) {
          status.textContent = t("auth.storageFail");
          return;
        }
        location.href = safeNext(new URLSearchParams(location.search).get("next"));
      });
    }
    const register = document.querySelector("[data-register]");
    if (register) {
      register.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = register.querySelector("[data-status]");
        const email = register.email.value.trim().toLowerCase();
        const users = Array.isArray(read(KEYS.users)) ? read(KEYS.users) : [];
        if (users.some((item) => item.email === email)) { status.textContent = t("q.taken"); return; }
        const user = {
          name: register.name.value.trim(),
          address: register.address.value.trim(),
          tel: register.tel.value.trim(),
          email: email,
          password: register.password.value,
        };
        users.push(user);
        if (!write(KEYS.users, users) || !write(KEYS.session, { name: user.name, email: user.email, address: user.address, tel: user.tel })) {
          status.textContent = t("auth.storageFail");
          return;
        }
        const next = safeNext(new URLSearchParams(location.search).get("next"));
        location.href = next === "dashboard.html" ? "index.html" : next;
      });
    }
  }

  function bindHowQuoting() {
    const fg = document.getElementById("hq-fg");
    const dot = document.getElementById("hq-dot");
    const qw = document.getElementById("qw");
    const qs = document.getElementById("qs");
    if (!fg || !dot || !qw || !qs) return;

    const lis = [].slice.call(qs.children);
    const X = [150, 450, 750, 1050];
    const F = [0.12, 0.37, 0.62, 0.87];
    let L = 0;
    let ok = false;

    try {
      L = fg.getTotalLength();
      ok = L > 0;
    } catch (e) {}

    if (ok) {
      X.forEach((x, i) => {
        let lo = 0;
        let hi = L;
        let m = 0;
        let p;
        for (let k = 0; k < 30; k++) {
          m = (lo + hi) / 2;
          p = fg.getPointAtLength(m);
          if (p.x < x) lo = m;
          else hi = m;
        }
        p = fg.getPointAtLength(m);
        F[i] = m / L;
        lis[i].style.setProperty("--x", (p.x / 1200) * 100);
        lis[i].style.setProperty("--y", (p.y / 420) * 100);
      });
    }
    if (!ok) L = 1;
    fg.style.strokeDasharray = String(L);

    function upd() {
      const r = qw.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.78 - r.top) / (r.height + vh * 0.1)));
      fg.style.strokeDashoffset = String(L * (1 - p));
      if (ok) {
        const pt = fg.getPointAtLength(L * p);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
      }
      dot.style.opacity = p > 0.01 && p < 0.995 ? "1" : "0";
      qs.style.setProperty("--pp", p * 100 + "%");
      lis.forEach((li, i) => li.classList.toggle("on", p >= F[i] - 0.02));
    }

    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".hq-rv").forEach((el) => io.observe(el));
  }

  let paintLots = function () {};
  document.addEventListener("siyapatha-lang", () => {
    if (document.querySelector("[data-header]")) mount(navId);
    paintLots();
    renderYards();
    if (document.querySelector("[data-vehicle]")) renderVehicle();
    if (document.querySelector("[data-dashboard]")) renderDashboard();
    const closes = document.querySelector("[data-lot-closes]");
    if (closes) {
      const lot = vehicle(new URLSearchParams(location.search).get("id"));
      if (lot) closes.textContent = t("lot.closes") + " " + lot.closes + " · " + countdownLabel(lot);
    }
  });

  window.Portal = { mount, vehicles, yards, terms, rupeesInWords };
  document.addEventListener("DOMContentLoaded", () => {
    bindFilters();
    bindHowQuoting();
    renderVehicle();
    renderQuote();
    renderDashboard();
    bindAuth();
  });
})();
