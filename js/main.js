/* =========================================================
   HOMEPAGE LOGIC (index.html)
   ========================================================= */

/* -------- 1. Filmstrip (the "past to present" photo strip) --------
   Add your batch's photos here in chronological order — old group
   photos first, recent reunion photos last. Put the image files in
   images/hero/ and list their captions (e.g. the year) below. If a
   file is missing, that frame just shows the batch's teal colour
   with the caption, so nothing breaks. */
const heroPhotos = [
  { src: "images/hero/2004-first-year.jpg", caption: "2004 · First year, DMC" },
  { src: "images/hero/2007-ward-days.jpg",  caption: "2007 · Ward days" },
  { src: "images/hero/2009-convocation.jpg", caption: "2009 · Convocation, K61" },
  { src: "images/hero/2015-reunion.jpg",     caption: "2015 · Reunion" },
  { src: "images/hero/2022-reunion.jpg",     caption: "2022 · Reunion" },
  { src: "images/hero/today.jpg",            caption: "Today" }
];

function renderFilmstrip() {
  const track = document.getElementById("filmstripTrack");
  if (!track) return;
  // Render the list twice back-to-back for a seamless infinite scroll.
  const frames = [...heroPhotos, ...heroPhotos].map(p => `
    <div class="filmstrip-frame">
      <img src="${p.src}" alt="${p.caption}"
           onerror="this.style.display='none'">
      <span class="cap">${p.caption}</span>
    </div>`).join("");
  track.innerHTML = frames;
}

/* -------- 2. Directory grid -------- */
let activeSpecialtyFilter = null;
let activeSearchTerm = "";

function renderDirectory() {
  const grid = document.getElementById("directoryGrid");
  const countEl = document.getElementById("directoryCount");
  const banner = document.getElementById("filterBanner");
  const bannerLabel = document.getElementById("filterBannerLabel");
  if (!grid) return;

  let list = getSortedMembers();

  if (activeSpecialtyFilter) {
    list = list.filter(m => m.specialty === activeSpecialtyFilter);
  }
  if (activeSearchTerm.trim()) {
    const q = activeSearchTerm.trim().toLowerCase();
    list = list.filter(m =>
      m.name.toLowerCase().includes(q) ||
      (m.specialty || "").toLowerCase().includes(q) ||
      (m.workplace || "").toLowerCase().includes(q) ||
      String(m.roll).includes(q)
    );
  }

  if (banner) {
    if (activeSpecialtyFilter) {
      banner.classList.add("is-active");
      bannerLabel.textContent = `Showing: ${activeSpecialtyFilter}`;
    } else {
      banner.classList.remove("is-active");
    }
  }

  if (countEl) countEl.textContent = `${list.length} classmate${list.length === 1 ? "" : "s"}`;

  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">No one matches this search yet. Try a different name or specialty.</div>`;
    return;
  }

  grid.innerHTML = list.map(m => {
    const color = colorForSpecialty(m.specialty || "K61");
    return `
      <a class="id-card" href="profile.html?roll=${encodeURIComponent(m.roll)}">
        <div class="photo-wrap">
          <img data-member-roll="${m.roll}" alt="${m.name}">
          <span class="roll-tag">Roll ${m.roll}</span>
          <span class="spec-dot" style="background:${color}"></span>
        </div>
        <div class="id-body">
          <div class="name">${m.name}</div>
          <div class="spec">${m.specialty || ""}</div>
        </div>
      </a>`;
  }).join("");

  // Attach photo fallbacks after the markup is in the DOM.
  list.forEach(m => {
    const img = grid.querySelector(`img[data-member-roll="${m.roll}"]`);
    if (img) withPhotoFallback(img, m);
  });
}

/* -------- 3. Specialty overlay -------- */
function renderSpecialtyPanel() {
  const listEl = document.getElementById("specialtyList");
  if (!listEl) return;
  const groups = groupBySpecialty();
  listEl.innerHTML = groups.map(g => `
    <li class="specialty-item">
      <button type="button" data-specialty="${g.name}">
        <span class="dot" style="background:${g.color}"></span>
        ${g.name}
        <span class="n">${g.list.length}</span>
      </button>
    </li>`).join("");

  listEl.querySelectorAll("button[data-specialty]").forEach(btn => {
    btn.addEventListener("click", () => {
      activeSpecialtyFilter = btn.getAttribute("data-specialty");
      renderDirectory();
      closeOverlay();
      document.getElementById("directoryGrid").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function openOverlay() { document.getElementById("specialtyOverlay").classList.add("is-open"); }
function closeOverlay() { document.getElementById("specialtyOverlay").classList.remove("is-open"); }

/* -------- 4. Wire up events -------- */
document.addEventListener("DOMContentLoaded", () => {
  renderFilmstrip();
  renderDirectory();
  renderSpecialtyPanel();

  const specialtyTab = document.getElementById("specialtyTab");
  if (specialtyTab) specialtyTab.addEventListener("click", openOverlay);

  const overlay = document.getElementById("specialtyOverlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closeOverlay(); });
  }
  const closeBtn = document.getElementById("specialtyClose");
  if (closeBtn) closeBtn.addEventListener("click", closeOverlay);

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeOverlay(); });

  const clearFilterBtn = document.getElementById("clearFilter");
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener("click", () => {
      activeSpecialtyFilter = null;
      renderDirectory();
    });
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearchTerm = e.target.value;
      renderDirectory();
    });
  }
});
