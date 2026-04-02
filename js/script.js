/* ============================================================
   script.js — Serverless Static Website
   ============================================================ */

console.log("%c⬡ ServerlessHQ loaded successfully!", "color:#00e5c3;font-family:monospace;font-size:14px;font-weight:bold;");

// ── 1. Toast popup ───────────────────────────────────────────
function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4000);
}
function closeToast() {
    document.getElementById("toast").classList.remove("show");
}

// ── 2. Contact form submit ───────────────────────────────────
const submitBtn = document.getElementById("submitBtn");
if (submitBtn) {
    submitBtn.addEventListener("click", function () {
        const name  = document.getElementById("nameInput");
        const email = document.getElementById("emailInput");
        const msg   = document.getElementById("msgInput");
        let allFilled = true;

        [name, email, msg].forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = "#ff4d6d";
                allFilled = false;
            } else {
                input.style.borderColor = "";
            }
        });

        if (allFilled) {
            // Show toast popup
            showToast();
            // Reset form
            name.value = "";
            email.value = "";
            msg.value = "";
            // Button feedback
            submitBtn.textContent = "✓ Sent!";
            submitBtn.style.background = "#00e5c3";
            setTimeout(() => {
                submitBtn.textContent = "Send Message";
                submitBtn.style.background = "";
            }, 3000);
        }
    });
}

// ── 3. Active nav link on scroll ────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");

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
}, { root: null, rootMargin: "-40% 0px -55% 0px", threshold: 0 });

sections.forEach(s => sectionObserver.observe(s));

// ── 4. Scroll-reveal animation ───────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".feature-card, .step, .stat, .about-text, .about-image-wrap").forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = `
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .reveal.revealed { opacity: 1; transform: translateY(0); }
    .nav-links a.active { color: #00e5c3 !important; }
`;
document.head.appendChild(revealStyle);

// ── 5. Navbar scroll shrink ──────────────────────────────────
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.style.background = window.scrollY > 60
        ? "rgba(10,12,16,0.96)"
        : "rgba(15,18,24,0.85)";
});

// ── 6. Smooth scroll for nav links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
