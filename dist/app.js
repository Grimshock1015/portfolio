(() => {
  "use strict";
  const profile = window.PORTFOLIO;
  if (!profile) return;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fill = (selector, value) => $$(selector).forEach(node => { node.textContent = value ?? ""; });
  // Allow web links and relative files, while rejecting executable URL schemes.
  const safeUrl = (value, local = false) => {
    if (!value || typeof value !== "string") return "";
    try {
      const url = new URL(value, location.href);
      if (!["https:", "http:"].includes(url.protocol)) return "";
      if (!local && !/^https?:\/\//i.test(value)) return "";
      return url.href;
    } catch { return ""; }
  };
  const email = typeof profile.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ? profile.email : "";
  const projects = Array.isArray(profile.projects) ? profile.projects : [];
  let toastTimeout;
  let previousOverflow = "";
  const showToast = message => {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("visible"), 3200);
  };

  fill("[data-name]", profile.name);
  fill("[data-initials]", profile.initials);
  fill("[data-role]", profile.role);
  fill("[data-location]", profile.location);
  fill("[data-intro]", profile.intro);
  document.title = `${profile.name} — Portfolio`;
  $("meta[name='description']").content = `${profile.name} — ${profile.role}. ${profile.intro}`;
  $("meta[property='og:title']").content = document.title;
  $("meta[property='og:description']").content = profile.intro;
  $("#copyright-year").textContent = `© ${new Date().getFullYear()}`;
  $("#about-paragraphs").innerHTML = (profile.about || []).map(p => `<p>${escape(p)}</p>`).join("");
  $("#interests").innerHTML = (profile.interests || []).map(item => `<span>${escape(item)}</span>`).join("");
  $("#skills").innerHTML = (profile.skills || []).map((group, index) => `<div class="skill-group"><div class="skill-top"><h3>${escape(group.title)}</h3><span>0${index + 1}</span></div><div class="skill-items">${group.items.map(item => `<span>${escape(item)}</span>`).join("")}</div></div>`).join("");
  $("#experience-list").innerHTML = (profile.experience || []).map(item => `<article class="experience-item"><span class="period">${escape(item.period)}</span><h3>${escape(item.title)}</h3><p class="organization">${escape(item.organization)}</p><p class="description">${escape(item.description)}</p><span class="journey-arrow" aria-hidden="true">↗</span></article>`).join("");
  const education = profile.education || {};
  $(".education-block").innerHTML = `<p class="eyebrow">EDUCATION</p><h3>${escape(education.degree)}</h3><p>${escape(education.institution)}</p><span class="period">${escape(education.period)}</span>${education.distinction ? `<p class="education-distinction">${escape(education.distinction)}</p>` : ""}${(education.additional || []).map(item => `<div class="education-extra"><h3>${escape(item.degree)}</h3><p>${escape(item.institution)}</p><span class="period">${escape(item.period)}</span></div>`).join("")}`;
  if (!education.degree) $(".education-block").hidden = true;

  if (!profile.sampleMode) {
    $("#template-note").hidden = true;
    $$("[data-sample-note]").forEach(node => { node.hidden = true; });
  }
  $("#dismiss-note").addEventListener("click", () => { $("#template-note").hidden = true; });
  const resume = safeUrl(profile.resumeUrl, true);
  if (resume) {
    $$("[data-resume-link]").forEach(link => {
      link.href = resume;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.hidden = false;
    });
  }

  const socialLinks = [["GitHub", profile.github], ["LinkedIn", profile.linkedin]].filter(([, url]) => safeUrl(url));
  $("#socials").innerHTML = socialLinks.length ? socialLinks.map(([name, url]) => `<a href="${escape(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${name} ↗<span class="sr-only"> (opens in a new tab)</span></a>`).join("") : (profile.sampleMode ? '<span class="social-placeholder">YOUR GITHUB & LINKEDIN WILL LIVE HERE ↗</span>' : "");
  const github = safeUrl(profile.github);
  if (github) {
    const more = $("#more-work-link");
    more.href = github;
    more.target = "_blank";
    more.rel = "noopener noreferrer";
    more.innerHTML = 'More on GitHub <span aria-hidden="true">↗</span>';
  }
  $("#contact-email").textContent = email || (profile.sampleMode ? "Your email goes here" : "Let’s connect");
  if (email) $("#copy-email").hidden = false;
  $("#email-action").addEventListener("click", () => {
    if (email) window.location.href = `mailto:${email}`;
    else openDialog($("#notice-dialog"));
  });
  $("#copy-email").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied. Say hello!");
    } catch {
      // A visible address remains selectable if clipboard access is unavailable.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($("#contact-email"));
      selection.removeAllRanges();
      selection.addRange(range);
      showToast("Select and copy the email address above.");
    }
  });

  // Project illustrations communicate the work; they are not product screenshots.
  const visuals = {
    superset: `<div class="project-diagram export-diagram"><div class="diagram-topline"><span>APACHE SUPERSET</span><span>TECHNICAL PROPOSAL</span></div><strong>From insight<br>to spreadsheet.</strong><div class="export-flow"><div><i>▥</i><span>Charts & dashboards</span></div><b>→</b><div><i>≋</i><span>Export workflow</span></div><b>→</b><div><i>▦</i><span>Google Sheets</span></div></div><div class="diagram-bottomline"><span>SYNC CHARTS · ASYNC DASHBOARDS</span><span>PROPOSED DESIGN ↗</span></div></div>`,
    planetze: `<div class="planetze-illustration"><div class="planetze-copy"><span>ANDROID / FIREBASE</span><strong>Small habits.<br>Lasting change.</strong><div class="habit-path"><span>01 &nbsp; ADOPT</span><span>02 &nbsp; LOG</span><span>03 &nbsp; REVIEW</span></div></div><div class="habit-phone"><div class="phone-speaker"></div><div class="habit-leaf">♧</div><strong>planetze</strong><span>YOUR DAILY HABITS</span><div class="habit-check"><i>✓</i><span>Adopt a habit</span></div><div class="habit-check"><i>✓</i><span>Log your progress</span></div><div class="habit-calendar">${Array.from({length:21},(_,i)=>`<b${[2,3,5,8,9,12,16,17].includes(i)?' class="day-done"':''}></b>`).join("")}</div></div><span class="illustration-caption">PROJECT ILLUSTRATION</span></div>`,
    gamejam: `<div class="project-diagram game-diagram"><div class="diagram-topline"><span>GLOBAL GAME JAM</span><span>48 HOURS</span></div><strong>Every choice<br>opens a path.</strong><div class="dialogue-tree"><span class="story-node node-start">PLAYER CHOICE</span><div class="tree-connectors"></div><div class="story-paths"><span class="story-node">PATH A <i>↗</i></span><span class="story-node">PATH B <i>↗</i></span></div></div><div class="diagram-bottomline"><span>GODOT · GDSCRIPT · JSON</span><span>NARRATIVE PUZZLE ↗</span></div></div>`,
    safety: `<div class="project-diagram safety-diagram"><div class="diagram-topline"><span>TORONTO SAFETY INDEX</span><span>2024–2025 HOLDOUT</span></div><div class="safety-metrics"><div><strong>158</strong><span>NEIGHBOURHOODS</span></div><div><strong>0.8176</strong><span>XGBOOST TEST R²</span></div></div><div class="comparison-title">TEST MEAN SQUARED ERROR <span>LOWER IS BETTER</span></div><div class="comparison-row"><span>Linear</span><i class="linear-bar"></i><b>0.00280</b></div><div class="comparison-row"><span>XGBoost</span><i class="xgboost-bar"></i><b>0.00270</b></div><div class="diagram-bottomline"><span>PYTHON · TIME SERIES · XGBOOST</span><span>MODEL COMPARISON ↗</span></div></div>`
  };
  const visualType = project => Object.hasOwn(visuals, project.visual) ? project.visual : "superset";
  const visualHtml = (project, className = "") => {
    const image = safeUrl(project.image, true);
    if (image) return `<div class="project-visual visual-image ${className}"><img src="${escape(image)}" alt="${escape(project.imageAlt || `${project.title} project preview`)}" loading="lazy" width="1200" height="750"></div>`;
    return `<div class="project-visual visual-${visualType(project)} ${className}" aria-hidden="true">${visuals[visualType(project)]}</div>`;
  };
  const tagsHtml = project => `<div class="project-tags">${(project.tags || []).map(tag => `<span>${escape(tag)}</span>`).join("")}</div>`;
  const galleryItems = project => (project.gallery || []).map(item => ({ ...item, url: safeUrl(item.src, true) })).filter(item => item.url);
  const galleryHtml = project => {
    const items = galleryItems(project);
    if (!items.length) return visualHtml(project, "dialog-hero");
    const cover = safeUrl(project.image, true);
    const index = Math.max(0, items.findIndex(item => item.url === cover));
    const item = items[index];
    return `<section class="project-gallery" data-gallery-project="${escape(project.id)}" aria-label="${escape(project.title)} screenshots"><p class="eyebrow gallery-heading">INSIDE THE GAME</p><figure class="gallery-figure"><a class="gallery-fullsize" href="${escape(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open screenshot at full size (opens in a new tab)"><img class="gallery-main-image" src="${escape(item.url)}" alt="${escape(item.alt || item.caption)}" width="794" height="446"><span class="gallery-expand" aria-hidden="true">↗</span></a><figcaption class="gallery-meta" aria-live="polite"><span class="gallery-caption">${escape(item.caption)}</span><span class="gallery-counter">${index + 1} / ${items.length}</span></figcaption></figure><div class="gallery-thumbnails" role="group" aria-label="Choose a screenshot">${items.map((image, i) => `<button type="button" class="gallery-thumbnail" data-gallery-index="${i}" aria-pressed="${i === index}" aria-label="Show screenshot ${i + 1}: ${escape(image.caption)}"><img src="${escape(image.url)}" alt="" width="794" height="446" loading="lazy"></button>`).join("")}</div></section>`;
  };
  $("#dialog-content").addEventListener("click", event => {
    const button = event.target.closest("[data-gallery-index]");
    if (!button) return;
    const gallery = button.closest("[data-gallery-project]");
    const project = projects.find(item => item.id === gallery.dataset.galleryProject);
    if (!project) return;
    const items = galleryItems(project);
    const index = Number(button.dataset.galleryIndex);
    const item = items[index];
    if (!item) return;
    const image = $(".gallery-main-image", gallery);
    image.src = item.url;
    image.alt = item.alt || item.caption;
    $(".gallery-fullsize", gallery).href = item.url;
    $(".gallery-caption", gallery).textContent = item.caption;
    $(".gallery-counter", gallery).textContent = `${index + 1} / ${items.length}`;
    $$(".gallery-thumbnail", gallery).forEach(thumbnail => thumbnail.setAttribute("aria-pressed", String(thumbnail === button)));
  });
  let currentFilter = "All work";
  const categories = ["All work", ...new Set(projects.map(project => project.category).filter(Boolean))];
  $(".filters").innerHTML = categories.map((category, index) => `<button class="filter${index === 0 ? " active" : ""}" data-filter="${escape(category)}" aria-pressed="${index === 0}">${escape(category)}${index === 0 ? ` <span>${projects.length}</span>` : ""}</button>`).join("");
  const renderProjects = () => {
    const filtered = projects.filter(project => currentFilter === "All work" || project.category === currentFilter);
    $("#projects").innerHTML = filtered.map(project => `<article class="project-card"><button class="project-open" data-project="${escape(project.id)}" aria-label="View ${escape(project.title)} project details">${visualHtml(project)}<div class="project-info"><div>${project.typeLabel ? `<span class="project-type">${escape(project.typeLabel)}</span>` : ""}<h3>${escape(project.title)}</h3><p>${escape(project.subtitle)}</p></div><span class="project-arrow" aria-hidden="true">↗</span></div></button>${tagsHtml(project)}</article>`).join("");
    $("#filter-status").textContent = `${filtered.length} ${filtered.length === 1 ? "project" : "projects"} shown${currentFilter === "All work" ? "" : ` in ${currentFilter}`}.`;
  };
  renderProjects();
  $(".filters").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    currentFilter = button.dataset.filter;
    $$(".filter").forEach(filter => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderProjects();
  });
  $("#projects").addEventListener("click", event => {
    const button = event.target.closest("[data-project]");
    if (!button) return;
    const project = projects.find(item => item.id === button.dataset.project);
    if (!project) return;
    const links = [["Visit project", project.liveUrl], ["View source", project.sourceUrl]].filter(([, url]) => safeUrl(url));
    $("#dialog-content").innerHTML = `${galleryHtml(project)}<div class="dialog-body"><p class="eyebrow">${escape(project.typeLabel || project.category)} / ${escape(project.year || "SELECTED PROJECT")}</p><h2 id="dialog-title">${escape(project.title)}</h2><p class="dialog-subtitle">${escape(project.subtitle)}</p>${tagsHtml(project)}<h3>The idea</h3><p>${escape(project.overview)}</p><h3>${profile.sampleMode ? "Your contribution" : "My contribution"}</h3><ul>${(project.contribution || []).map(item => `<li>${escape(item)}</li>`).join("")}</ul><h3>${escape(project.resultTitle || "What I learned")}</h3><p>${escape(project.learned)}</p>${links.length ? `<div class="dialog-actions">${links.map(([label, url]) => `<a class="text-link" href="${escape(safeUrl(url))}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span></a>`).join("")}</div>` : ""}${profile.sampleMode ? '<div class="dialog-sample-note">ILLUSTRATIVE PROJECT · This concept is sample content. Your real project story, screenshots, and links can take its place.</div>' : ""}</div>`;
    openDialog($("#project-dialog"));
  });

  function openDialog(dialog) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.scrollTop = 0;
  }
  $$("dialog").forEach(dialog => {
    $(".dialog-close", dialog).addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      // A click in the backdrop is outside the dialog's actual rectangle.
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener("close", () => { document.body.style.overflow = previousOverflow; });
  });
  $(".notice-dismiss").addEventListener("click", () => $("#notice-dialog").close());

  const themeButton = $(".theme-toggle");
  const moon = '<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>';
  const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';
  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    const next = theme === "dark" ? "light" : "dark";
    themeButton.setAttribute("aria-label", `Switch to ${next} theme`);
    themeButton.title = `Switch to ${next} theme`;
    $("svg", themeButton).innerHTML = theme === "dark" ? sun : moon;
    $("meta[name='theme-color']").content = theme === "dark" ? "#18251e" : "#f7f8f3";
  };
  let savedTheme;
  try { savedTheme = localStorage.getItem("portfolio-theme"); } catch { /* Storage can be disabled. */ }
  setTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light");
  themeButton.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(theme);
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* The theme still works without persistence. */ }
  });

  const menuButton = $(".menu-toggle");
  const mobileNav = $("#mobile-nav");
  const closeMenu = () => {
    mobileNav.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    mobileNav.hidden = !open;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  $$("a", mobileNav).forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
  });
  document.addEventListener("click", event => { if (!event.target.closest(".site-header") && !mobileNav.hidden) closeMenu(); });
  window.matchMedia("(min-width:701px)").addEventListener("change", event => { if (event.matches) closeMenu(); });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) $$(".desktop-nav a").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, {rootMargin:"-15% 0px -60% 0px", threshold:0});
    $$("#work,#about,#experience,#contact,#home").forEach(section => observer.observe(section));
  }
})();
