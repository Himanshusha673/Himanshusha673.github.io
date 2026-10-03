import { SITE, NAV_ITEMS, METRICS } from "../data/site.js";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/projects.js";
import { SKILLS } from "../data/skills.js";
import { EXPERIENCE } from "../data/experience.js";
import { ENGINEERING, ENGINEERING_FILTERS } from "../data/engineering.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const finePointer = window.matchMedia(
  "(hover:hover) and (pointer:fine)",
).matches;

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>'"]/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[char],
  );

const safeUrl = (value = "") => {
  try {
    const url = new URL(value, window.location.href);
    return ["https:", "http:", "mailto:"].includes(url.protocol)
      ? url.href
      : "#";
  } catch {
    return "#";
  }
};

const toast = (message) => {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("on");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("on"), 2200);
};

function renderNavigation() {
  $("#nav-links").innerHTML = NAV_ITEMS.map(
    (item) =>
      `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`,
  ).join("");
}

function renderMetrics() {
  $("#metrics-grid").innerHTML = METRICS.map(
    ([value, label]) =>
      `<div><b>${escapeHtml(value)}</b><span>${escapeHtml(label)}</span></div>`,
  ).join("");
}

function projectLink(label, url, primary = false) {
  if (!url) return "";
  return `<a class="project-link ${primary ? "primary" : ""}" href="${escapeHtml(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)} →</a>`;
}

function projectCard(project, compact = false, index = 0) {
  const links = project.links || {};
  const delivery = project.backend ? "Mobile + Backend" : "Mobile";
  const image = project.image
    ? `<div class="project-image"><span class="project-number">${String(index + 1).padStart(2, "0")}</span><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.name)} project visual" loading="lazy"></div>`
    : "";

  if (compact) {
    return `<article class="card compact-card">
      ${image}
      <div class="project-meta"><span class="project-period">${escapeHtml(project.period)}</span><span class="project-type">${escapeHtml(project.category)}</span></div>
      <div class="project-company">${escapeHtml(project.company)}</div>
      <h3>${escapeHtml(project.name)}</h3>
      <p class="project-description">${escapeHtml(project.description)}</p>
      <div class="tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="project-links">${projectLink("GitHub", links.github, true)}</div>
    </article>`;
  }

  return `<article class="card" data-category="${escapeHtml(project.category)}">
    ${image}
    <div class="project-meta"><span class="project-period">${escapeHtml(project.period)}</span><span class="project-type">${escapeHtml(project.category)}</span></div>
    <div class="project-company">${escapeHtml(project.company)} · ${escapeHtml(delivery)}</div>
    <h3>${escapeHtml(project.name)}</h3>
    <p class="project-description">${escapeHtml(project.description)}</p>
    <div class="project-challenge"><strong>Engineering challenge</strong>${escapeHtml(project.challenge)}</div>
    <div class="project-role"><strong>Role:</strong> ${escapeHtml(project.role)}</div>
    <div class="tags">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    <div class="project-links">
      ${projectLink("App Store / Play Store", links.store, true)}
      ${projectLink("GitHub", links.github)}
    </div>
  </article>`;
}

function renderProjects(filter = "All") {
  const visible = PROJECTS.filter(
    (project) => filter === "All" || project.category === filter,
  );
  $("#projects-grid").innerHTML = visible
    .map((project, index) => projectCard(project, false, index))
    .join("");
  attachRevealAndTilt($("#projects-grid"));
}

function renderProjectFilters() {
  const container = $("#project-filters");
  container.innerHTML = PROJECT_CATEGORIES.map(
    (category, index) =>
      `<button type="button" aria-pressed="${index === 0}">${escapeHtml(category)}</button>`,
  ).join("");
  $$("button", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$(".filters button", container).forEach((item) =>
        item.setAttribute("aria-pressed", item === button),
      );
      renderProjects(button.textContent);
    });
  });
}

function renderExperience() {
  $("#experience-list").innerHTML = EXPERIENCE.map(
    (item) => `
    <li class="${item.current ? "now" : ""}">
      <h3>${escapeHtml(item.role)}${item.current ? '<span class="badge">Current</span>' : ""}</h3>
      <div class="m">${escapeHtml(item.company)} · ${escapeHtml(item.period)}</div>
      <p>${escapeHtml(item.description)}</p>
    </li>
  `,
  ).join("");
}

function renderSkills() {
  $("#skills-grid").innerHTML = SKILLS.map(
    (group) => `
    <div><h3>${escapeHtml(group.title)}</h3><ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
  `,
  ).join("");
}

function renderGithubLab() {
  const githubProjects = PROJECTS.filter(
    (project) => project.source === "GitHub",
  );
  $("#github-grid").innerHTML = githubProjects
    .map((project, index) => projectCard(project, true, index))
    .join("");
}

function renderSocialLinks() {
  const links = [
    ["Email me", `mailto:${SITE.email}`, true],
    ["LinkedIn", SITE.linkedin],
    ["GitHub", SITE.github],
    ["Upwork", SITE.upwork],
  ];
  $("#social-links").innerHTML = links
    .map(
      ([label, url, primary]) =>
        `<a class="btn ${primary ? "p" : ""}" href="${escapeHtml(safeUrl(url))}" ${url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${escapeHtml(label)}${primary ? " →" : ""}</a>`,
    )
    .join("");
  const copy = document.createElement("button");
  copy.className = "btn";
  copy.type = "button";
  copy.textContent = "Copy email";
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      toast("Email copied.");
    } catch {
      toast(SITE.email);
    }
  });
  $("#social-links").append(copy);
}

function renderEngineering(filter = "All") {
  const visible = ENGINEERING.filter(
    (item) => filter === "All" || item.categories.includes(filter),
  );
  $("#engineering-grid").innerHTML = visible
    .map(
      (item) => `
    <article class="case">
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <div class="tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <pre>${escapeHtml(item.code)}</pre>
      <ul class="case-details">${item.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}</ul>
    </article>
  `,
    )
    .join("");
  attachRevealAndTilt($("#engineering-grid"));
}

function renderEngineeringFilters() {
  const container = $("#engineering-filters");
  container.innerHTML = ENGINEERING_FILTERS.map(
    (filter, index) =>
      `<button type="button" aria-pressed="${index === 0}">${escapeHtml(filter)}</button>`,
  ).join("");
  $$("button", container).forEach((button) => {
    button.addEventListener("click", () => {
      $$(".filters button", container).forEach((item) =>
        item.setAttribute("aria-pressed", item === button),
      );
      renderEngineering(button.textContent);
    });
  });
}

function setupNavigation() {
  const nav = $("#nav");
  const bar = $("#bar");
  const updateScroll = () => {
    nav.classList.toggle("s", window.scrollY > 20);
    const height = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${height > 0 ? (window.scrollY / height) * 100 : 0}%`;
  };
  window.addEventListener("scroll", updateScroll, { passive: true });
  updateScroll();

  if (!("IntersectionObserver" in window)) return;
  const links = $$("#nav-links a");
  const sections = links
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) =>
          link.classList.toggle(
            "a",
            link.getAttribute("href") === `#${entry.target.id}`,
          ),
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((section) => observer.observe(section));
}

function countUp() {
  if (reducedMotion || !("IntersectionObserver" in window)) return;
  const metrics = $("#metrics");
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      $$(".metrics b").forEach((node) => {
        const match = node.textContent.match(/^(\d+(?:\.\d+)?)(.*)$/);
        if (!match) return;
        const target = Number(match[1]);
        const decimals = (match[1].split(".")[1] || "").length;
        const suffix = match[2];
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min(1, (now - start) / 1200);
          const eased = 1 - Math.pow(1 - progress, 4);
          node.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });
      observer.disconnect();
    },
    { threshold: 0.3 },
  );
  observer.observe(metrics);
}

function attachRevealAndTilt(root = document) {
  const elements = $$(".card, .case", root);
  elements.forEach((element) => {
    element.classList.add("rv");
    if (!reducedMotion && finePointer && element.classList.contains("card")) {
      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-4px)`;
      });
      element.addEventListener("pointerleave", () => {
        element.style.transform = "";
      });
    }
  });

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("vis"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("vis");
        observer.unobserve(entry.target);
      }),
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
  );
  elements.forEach((element) => observer.observe(element));
}

function setupPointerEffects() {
  if (!finePointer || reducedMotion) return;
  document.addEventListener(
    "pointermove",
    (event) => {
      const glass = event.target.closest?.(
        ".card, .case, .metrics > div, .skills > div, .contact .wrap",
      );
      if (!glass) return;
      const rect = glass.getBoundingClientRect();
      glass.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      glass.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );

  const background = $(".bg");
  window.addEventListener(
    "scroll",
    () => {
      background.style.transform = `translate3d(0, ${-window.scrollY * 0.06}px, 0)`;
    },
    { passive: true },
  );
}

function setupRevealObserver() {
  const elements = $$(
    "section:not(.hero) h2, section:not(.hero) .lead, .metrics > div, .skills > div, .tl li, .contact .wrap",
  );
  elements.forEach((element, index) => {
    element.classList.add("rv");
    element.style.animationDelay = `${(index % 4) * 80}ms`;
  });
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("vis"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("vis");
        observer.unobserve(entry.target);
      }),
    { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
  );
  elements.forEach((element) => observer.observe(element));
}

function setupThemeToggle() {
  const root = document.documentElement;
  const holder = $('.nav-inner');
  if (!holder) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-toggle';
  btn.innerHTML = `
    <svg class="ic-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    <svg class="ic-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`;

  const apply = (theme, save) => {
    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', String(theme === 'light'));
    const meta = $('meta[name="theme-color"]');
     if (meta) meta.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
    if (save) { try { localStorage.setItem('theme', theme); } catch {} }
  };

  apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);

  btn.addEventListener('click', () => {
    root.classList.add('theme-anim');
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    clearTimeout(btn.timer);
    btn.timer = setTimeout(() => root.classList.remove('theme-anim'), 600);
  });

  holder.append(btn);
}

function setupScrollHint() {
  const hero = $('.hero');
  if (!hero) return;
  const hint = document.createElement('a');
  hint.className = 'scroll-hint';
  hint.href = '#metrics';
  hint.innerHTML = '<span>Scroll</span><i></i>';
  hero.append(hint);
}

function setupCursorFX() {
  if (!finePointer || reducedMotion) return;
  document.body.classList.add('has-cursor');

  const make = (tag, cls) => {
    const node = document.createElement(tag);
    node.className = cls;
    document.body.append(node);
    return node;
  };
  const glow = make('div', 'cur-glow');
  const ring = make('div', 'cur-ring');
  const dot = make('div', 'cur-dot');
  const canvas = make('canvas', 'cur-trail');
  const ctx = canvas.getContext('2d');

  const orbs = $$('.bg i');
  const depth = [34, -44, 52, -28];
  const title = $('#hero-title');
  const role = $('.hero .role');
  const eyebrow = $('.hero .eyebrow');

  let w = 0, h = 0;
  const resize = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const m = { x: w / 2, y: h / 2 };      // actual cursor
  const g = { x: m.x, y: m.y };          // glow (slow follow)
  const r = { x: m.x, y: m.y };          // ring (medium follow)
  const p = { x: 0, y: 0 };              // parallax -0.5..0.5
  const parts = [];
  let last = { x: m.x, y: m.y };
  let magnet = null;

  const spawn = (x, y, n, burst = false) => {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = burst ? 2 + Math.random() * 3.2 : 0.3 + Math.random() * 1.1;
      parts.push({
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1,
        size: burst ? 3 + Math.random() * 3 : 2 + Math.random() * 3.5,
        hue: 200 + Math.random() * 120
      });
    }
    if (parts.length > 260) parts.splice(0, parts.length - 260);
  };

  document.addEventListener('pointermove', event => {
    m.x = event.clientX; m.y = event.clientY;
    const dist = Math.hypot(m.x - last.x, m.y - last.y);
    if (dist > 6) { spawn(m.x, m.y, Math.min(3, Math.ceil(dist / 25))); last = { x: m.x, y: m.y }; }

    ring.classList.toggle('hot', !!event.target.closest?.('a, button, .card, .case'));

    const target = event.target.closest?.('.btn, .filters button, .project-link') || null;
    if (magnet && magnet !== target) magnet.style.translate = '';
    magnet = target;
    if (target) {
      const rect = target.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      target.style.translate = `${dx * 0.25}px ${dy * 0.35}px`;
    }
  }, { passive: true });

  document.addEventListener('pointerdown', () => { ring.classList.add('down'); spawn(m.x, m.y, 16, true); });
  document.addEventListener('pointerup', () => ring.classList.remove('down'));
  document.documentElement.addEventListener('mouseleave', () => { [glow, ring, dot].forEach(n => n.style.opacity = 0); });
  document.documentElement.addEventListener('mouseenter', () => { [glow, ring, dot].forEach(n => n.style.opacity = 1); });

  const frame = () => {
    g.x += (m.x - g.x) * 0.08; g.y += (m.y - g.y) * 0.08;
    r.x += (m.x - r.x) * 0.2;  r.y += (m.y - r.y) * 0.2;
    p.x += ((m.x / w - 0.5) - p.x) * 0.06;
    p.y += ((m.y / h - 0.5) - p.y) * 0.06;

    glow.style.transform = `translate3d(${g.x}px, ${g.y}px, 0)`;
    ring.style.transform = `translate3d(${r.x}px, ${r.y}px, 0)`;
    dot.style.transform = `translate3d(${m.x}px, ${m.y}px, 0)`;

    orbs.forEach((orb, i) => { orb.style.translate = `${p.x * depth[i] * 2}px ${p.y * depth[i] * 2}px`; });

    if (title && window.scrollY < h) {
      const box = title.getBoundingClientRect();
      title.style.setProperty('--hx', `${m.x - box.left}px`);
      title.style.setProperty('--hy', `${m.y - box.top}px`);
      title.style.translate = `${p.x * -16}px ${p.y * -10}px`;
      if (role) role.style.translate = `${p.x * -9}px ${p.y * -6}px`;
      if (eyebrow) eyebrow.style.translate = `${p.x * -5}px ${p.y * -3}px`;
    }

    ctx.clearRect(0, 0, w, h);
    for (let i = parts.length - 1; i >= 0; i--) {
      const q = parts[i];
      q.x += q.vx; q.y += q.vy; q.vx *= 0.97; q.vy *= 0.97; q.life -= 0.022;
      if (q.life <= 0) { parts.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light'
        ? `rgba(0,0,0,${q.life * 0.6})`
        : `rgba(255,255,255,${q.life * 0.8})`;
      ctx.arc(q.x, q.y, q.size * q.life, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function init() {
  document.documentElement.classList.add("js");
  renderNavigation();
  renderMetrics();
  renderProjectFilters();
  renderProjects();
  renderExperience();
  renderEngineeringFilters();
  renderEngineering();
  renderSkills();
  renderGithubLab();
  renderSocialLinks();
  setupNavigation();
  countUp();
  setupRevealObserver();
  setupPointerEffects();
  setupThemeToggle();
  setupScrollHint();
  setupCursorFX();
}

init();
