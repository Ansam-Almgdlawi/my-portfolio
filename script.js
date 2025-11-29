/* Basic UI interactions, premium animations, and form validation */

// --- Loader ---
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // small delay so spinner shows briefly for polish
  if (loader) setTimeout(() => { loader.classList.add('hidden'); loader.setAttribute('aria-hidden','true'); }, 450);
});

// --- Nav toggle (mobile) ---
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle && navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
}));

// --- Smooth internal links ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- Intersection animations (reveal on scroll) ---
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('inview');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.project, .skill-card, .section-title, .anim-heading, .profile-wrap').forEach(el => animObserver.observe(el));

// --- Skills animation (reads data-percent) ---
function animateSkillBars() {
  document.querySelectorAll('.skill-line').forEach(line => {
    const pct = parseInt(line.getAttribute('data-percent') || '0', 10);
    const fill = line.querySelector('.fill');
    if (fill) {
      // stagger animations slightly
      setTimeout(() => { fill.style.width = pct + '%'; }, 300);
    }
  });
}
window.addEventListener('load', animateSkillBars);

// --- Cursor glow effect (follow mouse) ---
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
  // subtle transform for fluid follow
  cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
});

// --- Typing effect for subtitle ---
const typingText = "Backend Laravel Developer";
let typingIndex = 0;
function typeLoop() {
  const el = document.getElementById('typing');
  if (!el) return;
  if (typingIndex < typingText.length) {
    el.textContent += typingText.charAt(typingIndex);
    typingIndex++;
    setTimeout(typeLoop, 55);
  } else {
    // keep cursor blink style by toggling class if desired
  }
}
window.addEventListener('load', () => setTimeout(typeLoop, 600));

// --- Contact form validation (client-side only) ---
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formMsg.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill in all fields.';
      formMsg.style.color = '#ffbaba';
      return;
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.style.color = '#ffbaba';
      return;
    }

    // Client-only simulation: for production integrate backend or third-party form service.
    formMsg.textContent = 'Message sent! I will get back to you soon.';
    formMsg.style.color = getComputedStyle(document.documentElement).getPropertyValue('--purple-main') || '#a06bff';
    form.reset();
  });
}

// --- Accessibility: close nav with Escape ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') nav.classList.remove('open');
});
