/* ==========================================================
   SITE SETTINGS — edit these to make the site yours
   ========================================================== */
const CONFIG = {
  // Free form backend: create a form at https://formspree.io and paste its endpoint here,
  // e.g. "https://formspree.io/f/abcdwxyz". Leave empty to fall back to opening the visitor's email app.
  formEndpoint: "",
  // Where enquiries go when no form endpoint is set.
  email: "hello@example.com",
};

// Mobile navigation
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Header shadow on scroll
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal-on-scroll animation
const revealEls = document.querySelectorAll(".card, .case, .steps li, .plan, .quote, .why-list li, .faq details");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

// Animated stat counters
const counters = document.querySelectorAll("[data-count]");
const runCounter = (el) => {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if ("IntersectionObserver" in window) {
  const co = new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        runCounter(e.target);
        co.unobserve(e.target);
      }
    })
  );
  counters.forEach((c) => co.observe(c));
} else {
  counters.forEach((c) => (c.textContent = c.dataset.count));
}

// Pricing buttons pre-select the matching package in the form
document.querySelectorAll("[data-plan]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const msg = document.querySelector('#contact-form [name="message"]');
    if (!msg.value) msg.value = `I'm interested in the ${btn.dataset.plan} package.`;
  })
);

// Contact form
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

const setStatus = (text, type) => {
  status.textContent = text;
  status.className = "form-status " + (type || "");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form._gotcha.value) return; // spam bot

  let valid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.type === "email" ? /^\S+@\S+\.\S+$/.test(field.value.trim()) : field.value.trim() !== "";
    field.classList.toggle("invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    setStatus("Please fill in the required fields.", "err");
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  delete data._gotcha;

  if (!CONFIG.formEndpoint) {
    const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href =
      `mailto:${CONFIG.email}?subject=${encodeURIComponent("New enquiry from " + data.name)}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email app…", "ok");
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  setStatus("Sending…");
  try {
    const res = await fetch(CONFIG.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    setStatus("Thanks! I'll get back to you within 24 hours.", "ok");
  } catch {
    setStatus(`Something went wrong. Please email ${CONFIG.email} directly.`, "err");
  } finally {
    button.disabled = false;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
