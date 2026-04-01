/* ============================================================
   script.js — Serverless Static Website
   ============================================================ */

// ── 1. Console confirmation ──────────────────────────────────
console.log("%c⬡ ServerlessHQ loaded successfully!", "color:#00e5c3;font-family:monospace;font-size:14px;font-weight:bold;");

// ── 2. Active nav link highlight on scroll ──────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");

const observerOptions = { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 };

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ── 3. Scroll-reveal animation ───────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    ".feature-card, .step, .stat, .about-text, .about-image-wrap"
).forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
});

// inject reveal styles
const revealStyle = document.createElement("style");
revealStyle.textContent = `
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .reveal.revealed { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(revealStyle);

// ── 4. Navbar scroll shrink ──────────────────────────────────
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.style.background = window.scrollY > 60
        ? "rgba(10,12,16,0.96)"
        : "rgba(15,18,24,0.85)";
});

// ── 5. Header click easter egg ───────────────────────────────
document.querySelector("header, .hero-title")?.addEventListener("click", function () {
    this.style.color = `hsl(${Math.random() * 360}deg, 80%, 65%)`;
    setTimeout(() => this.style.color = "", 1200);
});

// ── 6. Contact form submission feedback ─────────────────────
const submitBtn = document.getElementById("submitBtn");
if (submitBtn) {
    submitBtn.addEventListener("click", function () {
        const inputs = document.querySelectorAll(".form-input");
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = "#ff4d6d";
                allFilled = false;
            } else {
                input.style.borderColor = "";
            }
        });

        if (allFilled) {
            submitBtn.textContent = "✓ Message Sent!";
            submitBtn.style.background = "#00e5c3";
            submitBtn.disabled = true;
            inputs.forEach(input => input.value = "");
            setTimeout(() => {
                submitBtn.textContent = "Send Message";
                submitBtn.style.background = "";
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// ── 7. Smooth scroll for nav links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// ── 8. Active nav link CSS ───────────────────────────────────
const navStyle = document.createElement("style");
navStyle.textContent = `.nav-links a.active { color: #00e5c3 !important; }`;
document.head.appendChild(navStyle);
