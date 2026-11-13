(function () {
  if (window.__siyapathaSplash) return;
  window.__siyapathaSplash = true;

  const script = document.currentScript;
  const base = script && script.src
    ? script.src.replace(/[^/]+$/, "").replace(/\/js\/?$/, "/")
    : (location.pathname.indexOf("/tender/") !== -1 ? "../" : "./");

  const asset = (name) => base + "assets/splash/" + name;
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minMs = reduced ? 350 : 2600;
  const maxMs = reduced ? 700 : 3600;
  const started = Date.now();

  document.documentElement.classList.add("is-splash");

  function markup() {
    return (
      '<div class="splash-logo is-play" role="img" aria-label="Siyapatha Finance">' +
        '<div class="splash-stage">' +
          '<img class="splash-layer splash-petals" alt="" src="' + asset("petals.png") + '">' +
          '<img class="splash-layer splash-ring" alt="" src="' + asset("ring.png") + '">' +
          '<img class="splash-layer splash-pot" alt="" src="' + asset("pot.png") + '">' +
          '<img class="splash-layer splash-wheel" alt="" src="' + asset("wheel.png") + '">' +
          '<div class="splash-sheen" aria-hidden="true"></div>' +
        "</div>" +
      "</div>"
    );
  }

  function mount() {
    if (document.getElementById("siyapatha-splash")) return;
    const el = document.createElement("div");
    el.id = "siyapatha-splash";
    el.setAttribute("aria-hidden", "false");
    el.innerHTML = markup();
    document.body.appendChild(el);
  }

  function hide() {
    const el = document.getElementById("siyapatha-splash");
    document.documentElement.classList.remove("is-splash");
    if (!el) return;
    el.classList.add("is-done");
    el.setAttribute("aria-hidden", "true");
    window.setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 600);
  }

  function finish() {
    const wait = Math.max(0, minMs - (Date.now() - started));
    window.setTimeout(hide, wait);
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);

  window.setTimeout(hide, maxMs);

  if (document.readyState === "complete") finish();
  else window.addEventListener("load", finish);
})();
