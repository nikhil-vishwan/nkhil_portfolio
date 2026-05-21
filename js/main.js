/* ══ PRELOADER ══ */
const languages = ["Nikhil","നിഖിൽ","निखिल","尼希尔","ニヒル","நிகில்","نيكهيل","こんにちは","你好","안녕하세요","Olá","Hej","Merhaba","Xin chào"];
const helloEl = document.getElementById("hello");
const preloader = document.getElementById("preloader");
let idx = 0;

function rotateHello() {
  helloEl.style.opacity = "0";
  helloEl.style.transform = "translateY(10px)";
  setTimeout(() => {
    helloEl.textContent = languages[idx % languages.length];
    helloEl.style.opacity = "1";
    helloEl.style.transform = "translateY(0)";
    idx++;
  }, 150);
}
rotateHello();
const helloInterval = setInterval(rotateHello, 900);
setTimeout(() => {
  clearInterval(helloInterval);
  preloader.style.opacity = "0";
  setTimeout(() => { preloader.style.display = "none"; }, 900);
}, 4500);

/* ══ DARK / LIGHT MODE ══ */
const html = document.documentElement;
const themeBtn = document.getElementById("theme-btn");
const themeIcon = document.getElementById("theme-icon");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const saved = localStorage.getItem("nv-theme");
const initTheme = saved || (prefersDark ? "dark" : "light");
html.setAttribute("data-theme", initTheme);
themeIcon.textContent = initTheme === "dark" ? "☀︎" : "☾";
themeBtn.addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  themeIcon.textContent = next === "dark" ? "☀︎" : "☾";
  localStorage.setItem("nv-theme", next);
});

/* ══ GRADIENT CURSOR ══ */
const isPointerFine = window.matchMedia("(pointer:fine)").matches;
if (isPointerFine) {
  const cursorGradient = document.getElementById("cursor-gradient");
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, gradX = 0, gradY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;
    gradX += (mouseX - gradX) * 0.07;
    gradY += (mouseY - gradY) * 0.07;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    cursorGradient.style.left = gradX + "px";
    cursorGradient.style.top = gradY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverEls = "a, button, .stag, .stag-dark, .work-item, .btn-dark, .btn-cv, .btn-submit, .ulink, input, textarea, .exp-card";
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
  document.addEventListener("mousedown", () => document.body.classList.add("cursor-click"));
  document.addEventListener("mouseup", () => document.body.classList.remove("cursor-click"));
} else {
  ["cursor-gradient","cursor-dot","cursor-ring"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  document.body.style.cursor = "auto";
}

/* ══ READ PROGRESS ══ */
const progressBar = document.getElementById("read-progress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docH * 100) + "%";
}, { passive: true });

/* ══ STICKY HEADER ══ */
const siteHeader = document.getElementById("site-header");
window.addEventListener("scroll", () => {
  siteHeader.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

/* ══ MENU ══ */
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const menuOverlay = document.getElementById("menu-overlay");
let menuOpen = false;

function toggleMenu(force) {
  menuOpen = force !== undefined ? force : !menuOpen;
  menuOverlay.classList.toggle("open", menuOpen);
  closeBtn.classList.toggle("visible", menuOpen);
  document.body.style.overflow = menuOpen ? "hidden" : "";
}
menuBtn.addEventListener("click", () => toggleMenu(true));
closeBtn.addEventListener("click", () => toggleMenu(false));
document.querySelectorAll(".menu-link").forEach(l => l.addEventListener("click", () => toggleMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape" && menuOpen) toggleMenu(false); });

/* ══ SCROLL REVEAL ══ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal, .reveal-l").forEach(el => io.observe(el));

/* ══ CONFETTI ══ */
const confettiColors = ["#7c50ff","#4db8ff","#0a0a0a","#999","#ccc"];

function spawnConfetti(el) {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < 14; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const angle = (i / 14) * 360;
    const dist = 35 + Math.random() * 45;
    const tx = Math.cos(angle * Math.PI / 180) * dist;
    const ty = Math.sin(angle * Math.PI / 180) * dist - 18;
    piece.style.cssText = `left:${cx}px;top:${cy}px;background:${confettiColors[i % confettiColors.length]};border-radius:${Math.random() > .5 ? "50%" : "2px"};--tx:${tx}px;--ty:${ty}px;--r:${Math.random()*720-360}deg;animation-duration:${0.8+Math.random()*0.5}s;`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1400);
  }
}

/* ══ STAT COUNTERS ══ */
function animateCount(el, target) {
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(ease * target) + "+";
    if (t < 1) requestAnimationFrame(step);
    else { el.textContent = target + "+"; spawnConfetti(el); }
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target.querySelector("[data-target]");
      if (num) animateCount(num, parseInt(num.dataset.target));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll(".stat-item").forEach(el => statsObserver.observe(el));

/* ══ SMOOTH SCROLL ══ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", function(e) {
    const t = document.querySelector(this.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth" }); }
  });
});

/* ══ CONTACT FORM ══ */
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("form-submit-btn");
const formSuccess = document.getElementById("form-success");
const hiddenIframe = document.getElementById("hidden_iframe");
let submitted = false;

if (hiddenIframe) {
  hiddenIframe.addEventListener("load", function() {
    if (submitted) {
      submitBtn.style.display = "none";
      formSuccess.classList.add("show");
      spawnConfetti(submitBtn);
      contactForm.reset();
      submitted = false;
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      [["contact-name", name], ["contact-email", email], ["contact-message", message]].forEach(([id, val]) => {
        if (!val) {
          const el = document.getElementById(id);
          el.style.borderColor = "rgba(220,38,38,0.5)";
          setTimeout(() => { el.style.borderColor = ""; }, 1000);
        }
      });
      return;
    }

    submitted = true;
  });
}

/* ══ SKILL TAG ENTRANCE ══ */
document.querySelectorAll(".stag-dark, .stag").forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(12px) scale(0.92)";
  el.style.transition = `opacity 0.5s ease ${i * 0.045}s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.045}s`;
});
const tagObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll(".stag-dark, .stag").forEach(tag => {
        tag.style.opacity = "1";
        tag.style.transform = "translateY(0) scale(1)";
      });
      tagObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll(".flex.flex-wrap").forEach(wrap => tagObserver.observe(wrap));

/* ══ WORK IMAGE PREVIEW ══ */
(function() {
  if (!window.matchMedia("(pointer:fine)").matches) return;

  const preview = document.getElementById("work-img-preview");
  const inner   = document.getElementById("preview-inner");

  const projects = {
    proj1: {
      bg: "url('assets/work1.png') center/cover no-repeat",
      icon: "",
      title: "",
      tag: "",
    },
    proj2: {
       bg: "url('assets/work3.png') center/cover no-repeat",
       icon: "",
      title: "",
      tag: "",
    },
    proj3: {
      bg: "url('assets/work4.png') center/cover no-repeat",
      icon: "",
      title: "",
      tag: "",
      
    }
  };

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;
  let rafId = null;
  let active = false;
  let lastX = 0;

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    curX = lerp(curX, mouseX, 0.1);
    curY = lerp(curY, mouseY, 0.1);

    let ox = 28, oy = -80;
    if (mouseX + 340 > window.innerWidth) ox = -328;
    if (mouseY - 80 < 0) oy = 20;

    preview.style.left = (curX + ox) + "px";
    preview.style.top  = (curY + oy) + "px";
    rafId = requestAnimationFrame(tick);
  }

  document.addEventListener("mousemove", e => {
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (active) {
      preview.classList.remove("tilt-l", "tilt-r");
      if      (dx >  2.5) preview.classList.add("tilt-r");
      else if (dx < -2.5) preview.classList.add("tilt-l");
    }
  });

  document.querySelectorAll(".work-item[data-preview-id]").forEach(item => {
    item.addEventListener("mouseenter", () => {
      const p = projects[item.dataset.previewId];
      if (!p) return;

      inner.style.background = p.bg;
      inner.innerHTML = `
        <div class="preview-grid"></div>
        <div style="
          position:absolute;inset:0;
          background:radial-gradient(circle at 50% 50%, ${p.accent} 0%, transparent 70%);
          pointer-events:none;
        "></div>
        <div style="font-size:2.2rem;margin-bottom:4px;position:relative;z-index:1;">${p.icon}</div>
        <div class="preview-title" style="position:relative;z-index:1;">${p.title}</div>
        <div class="preview-tag" style="position:relative;z-index:1;">${p.tag}</div>
      `;

      active = true;
      preview.classList.add("show");
      preview.classList.remove("tilt-l", "tilt-r");
      curX = mouseX; curY = mouseY;
      if (!rafId) tick();
    });

    item.addEventListener("mouseleave", () => {
      active = false;
      preview.classList.remove("show", "tilt-l", "tilt-r");
    });
  });
})();
