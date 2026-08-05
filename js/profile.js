/* =========================================================
   PROFILE PAGE LOGIC (profile.html)
   Reads the roll number from the URL, e.g. profile.html?roll=7
   and renders that classmate's card. This is why the directory
   grid links look like profile.html?roll=7 — one HTML file
   serves every profile automatically.
   ========================================================= */

function iconSVG(name) {
  const icons = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20"/><path d="M9 22v-4h6v4M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3.5h-3V7.8c0-1 .3-1.7 1.7-1.7H16.5V3.1C16 3 15 3 13.9 3 11.5 3 10 4.5 10 7.4V10H7.5v3.5H10V21h3.5z"/></svg>'
  };
  return icons[name] || "";
}

function getRollFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("roll");
}

function renderProfile() {
  const roll = getRollFromURL();
  const root = document.getElementById("profileRoot");
  const member = members.find(m => String(m.roll) === String(roll));

  if (!member) {
    root.innerHTML = `
      <div class="profile-notfound">
        <h1>Profile not found</h1>
        <p>We couldn't find a classmate with roll number "${roll ?? ""}".</p>
        <a class="back-link" href="index.html">&larr; Back to the directory</a>
      </div>`;
    document.title = "Not found · K61 Directory";
    return;
  }

  document.title = `${member.name} · K61 Directory`;
  const color = colorForSpecialty(member.specialty || "K61");

  const contactRows = [];
  if (member.phone) contactRows.push(`
    <a class="contact-row" href="tel:${member.phone.replace(/\s+/g, "")}">${iconSVG("phone")}<span>${member.phone}</span></a>`);
  if (member.email) contactRows.push(`
    <a class="contact-row" href="mailto:${member.email}">${iconSVG("email")}<span>${member.email}</span></a>`);
  if (member.location) contactRows.push(`
    <div class="contact-row">${iconSVG("pin")}<span>${member.location}</span></div>`);

  const socialButtons = [];
  if (member.linkedin) socialButtons.push(`
    <a class="social-btn" href="${member.linkedin}" target="_blank" rel="noopener">${iconSVG("linkedin")} LinkedIn</a>`);
  if (member.facebook) socialButtons.push(`
    <a class="social-btn" href="${member.facebook}" target="_blank" rel="noopener">${iconSVG("facebook")} Facebook</a>`);

  root.innerHTML = `
    <a class="back-link" href="index.html">&larr; Back to the directory</a>
    <div class="profile-card">
      <div>
        <div class="profile-photo"><img id="profileImg" alt="${member.name}"></div>
        <span class="roll-badge">Roll No. ${member.roll} · K61</span>
      </div>
      <div>
        <h1 class="profile-name">${member.name}</h1>
        <div class="profile-role">${member.designation || ""}</div>
        ${member.workplace ? `<div class="profile-workplace">${iconSVG("building")} ${member.workplace}</div>` : ""}
        ${member.specialty ? `<span class="specialty-chip"><span class="dot" style="background:${color}"></span>${member.specialty}</span>` : ""}
        ${contactRows.length ? `<div class="contact-grid">${contactRows.join("")}</div>` : ""}
        ${socialButtons.length ? `<div class="social-row">${socialButtons.join("")}</div>` : ""}
      </div>
    </div>`;

  const img = document.getElementById("profileImg");
  if (img) withPhotoFallback(img, member);
}

document.addEventListener("DOMContentLoaded", renderProfile);
