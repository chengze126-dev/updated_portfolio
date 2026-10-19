const projects = {
  wova: {
    eyebrow: "CTO · Wova.cc · 2026 — Present",
    title: "Wova.cc",
    summary:
      "Technical direction for the product: architecture, cloud, security, and the engineering system around delivery.",
    metrics: [
      ["CTO", "Owns technical direction"],
      ["Cloud", "Infrastructure and security"],
      ["CI/CD", "Review, release, observability"],
    ],
    story: [
      "Tim owns the technical direction of Wova.cc, turning product and business priorities into architecture, engineering roadmaps, and delivery plans.",
      "He leads full-stack, cloud, infrastructure, security, and scalability decisions from design through production operations, and sets the standards for code quality, review, CI/CD, release management, and observability.",
      "The other half of the role is partnership: technical feasibility, delivery sequencing, and the long-term shape of the platform, decided with product and the business.",
    ],
    stack: ["TypeScript", "React", "Node.js", "AWS", "Kubernetes", "Terraform", "CI/CD"],
  },
  logistics: {
    eyebrow: "Senior Full-Stack · Tamadevlabs · 2023 — 2026",
    title: "B2B logistics platform",
    summary:
      "End-to-end product for 120,000 users. Checkout conversion rose 18% while the platform stayed operable in production.",
    metrics: [
      ["120K", "Users on the platform"],
      ["18%", "Higher checkout conversion"],
      ["Owned", "Design through production"],
    ],
    story: [
      "At Tamadevlabs, Tim led development of a B2B logistics platform that grew to 120,000 users and improved checkout conversion by 18%.",
      "He owned production delivery across application architecture, API design, performance tuning, cloud deployment, and operational reliability.",
      "The same period covered the API and platform work beside it: services that could take real traffic, and a delivery system the team could use every week.",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
  },
  apis: {
    eyebrow: "Senior Full-Stack · Tamadevlabs · 2023 — 2026",
    title: "Services under a latency budget",
    summary:
      "REST and GraphQL at 2.4 million requests a day, under 150 ms, after a monolith became a set of services.",
    metrics: [
      ["2.4M", "Requests per day"],
      ["<150ms", "Response time"],
      ["8 min", "Deploys, down from 45"],
    ],
    story: [
      "Tim architected Node.js REST and GraphQL services handling 2.4 million requests a day with sub-150 ms response times.",
      "He migrated a legacy monolith to microservices, cutting infrastructure cost by 28% and deployment time from 45 minutes to 8. He also mentored five engineers and put code-review standards in place that reduced production defects by 35%.",
      "The point of the split was not the diagram. It was a shorter path to production and a cost line that matched the traffic the platform actually served.",
    ],
    stack: ["Node.js", "Express", "NestJS", "GraphQL", "REST", "Docker", "Kubernetes", "Redis"],
  },
  payments: {
    eyebrow: "Web Developer · Mingdao Interactive · 2018 — 2020",
    title: "Payments for 60+ clients",
    summary:
      "React and Express applications, WeChat Pay and Stripe, and test coverage lifted from 45% to 85%.",
    metrics: [
      ["60+", "Active clients"],
      ["12h", "Saved each week on reconciliation"],
      ["85%", "Test coverage, up from 45%"],
    ],
    story: [
      "At Mingdao Interactive, Tim built client-facing React and Express applications supporting more than 60 active clients.",
      "He integrated WeChat Pay and Stripe so those clients could take payments online, removing about 12 hours a week of manual reconciliation.",
      "He also raised automated test coverage from 45% to 85%, which changed how confidently the team could ship.",
    ],
    stack: ["React", "Express", "Stripe", "WeChat Pay", "Jest", "MySQL"],
  },
};

const notes = {
  deploys: {
    eyebrow: "Field note",
    title: "From 45 minutes to eight",
    dek: "A monolith does not get faster because you drew boxes around it.",
    body: [
      "At Tamadevlabs the deploy was a 45-minute event. That shape changes how a team behaves. People batch risk, reviews get rushed at the end, and production stays a place you visit carefully.",
      "The move to services was the visible part. What changed the week was everything around it: smaller releases, a pipeline that could run without a ceremony, and a cost line that dropped 28% once the unused surface of the monolith was gone.",
      "Eight minutes is not a trophy. It is a shorter distance between a decision and the evidence. The same instinct showed up later as a release standard — review, CI/CD, observability — rather than a hero deploy.",
    ],
  },
  latency: {
    eyebrow: "Field note",
    title: "Holding the line at 150 milliseconds",
    dek: "2.4 million requests a day will find the query you hoped nobody would hit.",
    body: [
      "Sub-150 ms only holds if it is a product constraint, not a hope you check after launch. On the logistics APIs, REST and GraphQL shared one rule: the slow path is designed, not discovered. Indexes, payload shape, and cache boundaries were part of the interface.",
      "The number beside latency was checkout. A calmer API path sat next to an 18% lift in conversion on a platform of 120,000 users. Speed was not a separate project from the product.",
      "Earlier, at Hexin Digital, the same idea showed up in PostgreSQL: schema and query work cut average page-load time by 40%. The budget changes. The habit does not.",
    ],
  },
  reviews: {
    eyebrow: "Field note",
    title: "How a defect rate actually moves",
    dek: "Tooling did not cut production defects by 35%. A clearer review did.",
    body: [
      "Mentoring five engineers is slow if you measure it in meetings. It is fast if you measure it in what stops reaching production. The change was specific: review had a standard, and ownership of a change stayed with the person who understood it.",
      "At Mingdao that instinct showed up as coverage moving from 45% to 85%. At Hexin it showed up as pages getting 40% faster once the schema was treated as design, and as a GitHub Actions pipeline that supported more than 30 deploys a week.",
      "Quality is a system you can point at. The dashboards come after the standard, not before it.",
    ],
  },
};

const modal = document.querySelector("#modal");
const modalCard = document.querySelector("#modal-card");
const modalKicker = document.querySelector("#modal-kicker");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const drawer = document.querySelector("#nav-drawer");
const menuBtn = document.querySelector("#menu-btn");
const skillsBtn = document.querySelector("#skills-btn");
const skillsPanel = document.querySelector("#skill-groups");
const toTop = document.querySelector("#to-top");
const form = document.querySelector("#contact-form");
const formLive = document.querySelector("#form-live");
let lastFocus = null;

function openModal(entry, kind) {
  lastFocus = document.activeElement;
  modalKicker.textContent = entry.eyebrow;
  modalTitle.textContent = entry.title;
  const summary = kind === "note" ? entry.dek : entry.summary;
  const paragraphs = kind === "note" ? entry.body : entry.story;
  const metrics = entry.metrics
    ? `<dl class="metric-row">${entry.metrics
        .map(([value, label]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
        .join("")}</dl>`
    : "";
  const tags = entry.stack
    ? `<div class="tags">${entry.stack.map((item) => `<span>${item}</span>`).join("")}</div>`
    : "";
  modalBody.innerHTML = `<p class="modal-summary">${summary}</p>${metrics}${paragraphs
    .map((paragraph) => `<p class="modal-copy">${paragraph}</p>`)
    .join("")}${tags}`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  modalBody.innerHTML = "";
  if (lastFocus instanceof HTMLElement) lastFocus.focus();
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => openModal(projects[button.dataset.project], "project"));
});

document.querySelectorAll("[data-note]").forEach((button) => {
  button.addEventListener("click", () => openModal(notes[button.dataset.note], "note"));
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
modal.querySelector(".modal-close").addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    setMenu(false);
  }
  if (event.key !== "Tab" || modal.hidden) return;
  const items = modalCard.querySelectorAll("button, a[href]");
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function setMenu(open) {
  drawer.classList.toggle("is-open", open);
  menuBtn.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => {
  setMenu(!drawer.classList.contains("is-open"));
});

function clearHash() {
  if (!location.hash) return;
  history.replaceState(null, "", location.pathname + location.search);
}

function scrollToTarget(target) {
  const top = target.getBoundingClientRect().top + window.scrollY - 12;
  window.scrollTo({ top, behavior: "smooth" });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    clearHash();
    if (drawer.contains(link)) setMenu(false);
  });
});

skillsBtn.addEventListener("click", () => {
  const open = skillsPanel.hasAttribute("hidden");
  skillsPanel.toggleAttribute("hidden", !open);
  skillsBtn.setAttribute("aria-expanded", String(open));
  skillsBtn.textContent = open ? "Show fewer" : "View all skills";
});

const sections = ["top", "about", "work", "experience", "notes", "history", "resume", "contact"];
const links = [...document.querySelectorAll(".nav-link")];

function onScroll() {
  const show = window.scrollY > 480;
  toTop.hidden = !show;
  const bandTop = window.innerHeight * 0.16;
  const bandBottom = window.innerHeight * 0.58;
  let best = "top";
  let bestOverlap = 0;
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const overlap = Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop);
    if (overlap > bestOverlap) {
      bestOverlap = overlap;
      best = id;
    }
  }
  const navId = best === "work" ? "history" : best;
  links.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${navId}`);
  });
}

function scrollToHash() {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  if (target) scrollToTarget(target);
  clearHash();
}

window.addEventListener("load", scrollToHash);
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const quotesTrack = document.getElementById("quotes-track");
const quoteCards = quotesTrack ? [...quotesTrack.children] : [];
let quoteIndex = 0;

function quotePageSize() {
  if (window.innerWidth <= 720) return 1;
  if (window.innerWidth <= 980) return 2;
  return 3;
}

function placeQuotes() {
  if (!quotesTrack || !quoteCards.length) return;
  const max = Math.max(0, quoteCards.length - quotePageSize());
  quoteIndex = Math.min(quoteIndex, max);
  const card = quoteCards[0];
  const gap = parseFloat(getComputedStyle(quotesTrack).columnGap || getComputedStyle(quotesTrack).gap) || 0;
  const shift = quoteIndex * (card.getBoundingClientRect().width + gap);
  quotesTrack.style.transform = `translateX(-${shift}px)`;
}

document.querySelectorAll(".quotes-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const max = Math.max(0, quoteCards.length - quotePageSize());
    const dir = Number(button.dataset.dir);
    if (!max) {
      const card = dir > 0 ? quotesTrack.firstElementChild : quotesTrack.lastElementChild;
      if (dir > 0) quotesTrack.appendChild(card);
      else quotesTrack.insertBefore(card, quotesTrack.firstElementChild);
      return;
    }
    quoteIndex = (quoteIndex + dir + max + 1) % (max + 1);
    placeQuotes();
  });
});

window.addEventListener("resize", placeQuotes);
placeQuotes();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const errors = {};
  if (name.length < 2) errors.name = "Add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email.";
  if (message.length < 12) errors.message = "Write a sentence or two so the note has context.";

  ["name", "email", "message"].forEach((field) => {
    const input = form.elements[field];
    const note = input.parentElement.querySelector(".field-error");
    input.setAttribute("aria-invalid", errors[field] ? "true" : "false");
    if (errors[field]) {
      if (note) note.textContent = errors[field];
      else {
        const el = document.createElement("p");
        el.className = "field-error";
        el.textContent = errors[field];
        input.insertAdjacentElement("afterend", el);
      }
    } else if (note) note.remove();
  });

  if (Object.keys(errors).length) {
    formLive.textContent = "";
    return;
  }

  const subject = encodeURIComponent(`Portfolio note from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  window.location.href = `mailto:demarsgold@gmail.com?subject=${subject}&body=${body}`;
  form.reset();
  formLive.textContent = "Your email app should open with this note addressed to Tim.";
});
