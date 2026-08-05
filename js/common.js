/* =========================================================
   COMMON HELPERS — shared by index.html and profile.html
   You normally don't need to edit this file.
   ========================================================= */

/* A small fixed palette used to colour-code specialties,
   like department colours on a hospital wayfinding sign. */
const SPECIALTY_PALETTE = [
  "#B5533C", "#2E6F63", "#B08D57", "#5C6EA6",
  "#8A6BAE", "#3F7DB0", "#C77B45", "#4E8B6B",
  "#A25B7D", "#4A7A8C", "#9C7A2E", "#6B7FB0"
];

/* Deterministic colour for a specialty name, so the same
   specialty always gets the same colour across the site. */
function colorForSpecialty(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % SPECIALTY_PALETTE.length;
  return SPECIALTY_PALETTE[idx];
}

/* Builds a placeholder avatar (initials on a coloured field)
   as a data-URI SVG, used whenever a member has no photo yet,
   or their photo file fails to load. */
function initialsAvatar(name, hexColor) {
  const initials = name
    .replace(/^Dr\.?\s*/i, "")
    .trim()
    .split(/\s+/)
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="${hexColor}"/>
      <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle"
            font-family="IBM Plex Sans, Arial, sans-serif" font-size="72"
            fill="#FFFFFF" opacity="0.95">${initials || "K61"}</text>
    </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

/* Attaches a graceful photo fallback: if the real photo file
   is missing/broken, swap in the initials avatar instead. */
function withPhotoFallback(imgEl, member) {
  const fallback = initialsAvatar(member.name, colorForSpecialty(member.specialty || "K61"));
  if (!member.photo) {
    imgEl.src = fallback;
    return;
  }
  imgEl.src = member.photo;
  imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = fallback; };
}

/* Renders the small ECG "pulse line" divider used across the site. */
function pulseDividerSVG() {
  return `<svg class="pulse-divider" viewBox="0 0 600 28" preserveAspectRatio="none">
    <path d="M0 14 H210 L228 4 L246 24 L264 14 H600" />
  </svg>`;
}

/* Reads members from data.js and returns them sorted by roll number. */
function getSortedMembers() {
  return [...members].sort((a, b) => a.roll - b.roll);
}

/* Groups members by specialty, returns [{name, color, list}], A→Z. */
function groupBySpecialty() {
  const map = new Map();
  for (const m of members) {
    const key = m.specialty || "Unspecified";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(m);
  }
  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, list]) => ({ name, color: colorForSpecialty(name), list }));
}
