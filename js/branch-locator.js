(function () {
  const search = document.querySelector("#branch-search");
  const empty = document.querySelector("[data-branch-empty]");
  const branchFrame = document.querySelector("[data-branch-frame]");
  const branchMapName = document.querySelector("[data-branch-map-name]");
  const branchMapOpen = document.querySelector("[data-branch-map-open]");
  const branchItems = Array.from(document.querySelectorAll("[data-branch]"));
  let region = "all";

  if (!branchItems.length) return;

  function mapUrls(query) {
    const q = encodeURIComponent(query || "Siyapatha Finance Sri Lanka");
    return {
      embed: "https://maps.google.com/maps?q=" + q + "&z=16&hl=en&output=embed",
      open: "https://www.google.com/maps/search/?api=1&query=" + q
    };
  }

  function selectBranch(item) {
    if (!item) return;
    branchItems.forEach((row) => {
      const on = row === item;
      row.classList.toggle("is-on", on);
      row.setAttribute("aria-pressed", on ? "true" : "false");
    });
    const query = item.getAttribute("data-map") || "";
    const nameEl = item.querySelector("strong");
    const urls = mapUrls(query);
    if (branchFrame && branchFrame.getAttribute("src") !== urls.embed) {
      branchFrame.setAttribute("src", urls.embed);
    }
    if (branchMapName && nameEl) branchMapName.textContent = nameEl.textContent.trim();
    if (branchMapOpen) branchMapOpen.setAttribute("href", urls.open);
  }

  function firstVisibleBranch() {
    return branchItems.find((item) => !item.hidden) || null;
  }

  function paintBranches() {
    const q = ((search && search.value) || "").trim().toLowerCase();
    let shown = 0;
    branchItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      const regionOk = region === "all" || item.getAttribute("data-region") === region;
      const on = regionOk && (!q || text.includes(q));
      item.hidden = !on;
      if (on) shown += 1;
    });
    if (empty) empty.hidden = shown !== 0;
    const selected = branchItems.find((item) => item.classList.contains("is-on"));
    if (!selected || selected.hidden) selectBranch(firstVisibleBranch());
  }

  branchItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      selectBranch(item);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      selectBranch(item);
    });
  });

  if (search) search.addEventListener("input", paintBranches);
  document.querySelectorAll(".chips [data-region]").forEach((btn) => {
    btn.addEventListener("click", () => {
      region = btn.getAttribute("data-region");
      document.querySelectorAll(".chips [data-region]").forEach((item) => {
        item.classList.toggle("is-on", item === btn);
      });
      paintBranches();
    });
  });

  paintBranches();
  document.addEventListener("siyapatha-lang", paintBranches);
})();
