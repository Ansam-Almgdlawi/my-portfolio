/* Basic UI interactions, animations and form validation */

// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 450); // short delay for smoother feel
  }
});

// Nav toggle
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle && navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Smooth scroll for internal links (native behavior also works)
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if (href.length>1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      nav.classList.remove('open');
    }
  });
});

// Intersection animations for elements
const animObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (entry.isIntersecting) {
      entry.target.classList.add('inview');
    }
  });
},{threshold:0.12});

document.querySelectorAll('.project, .skill-card, .section-title, .anim-heading').forEach(el=>{
  animObserver.observe(el);
});

// Skills animation (reads data-percent)
function animateSkillBars() {
  document.querySelectorAll('.skill-line').forEach(line=>{
    const pct = parseInt(line.getAttribute('data-percent') || '0', 10);
    const fill = line.querySelector('.fill');
    if (fill) {
      // animate width
      setTimeout(()=> fill.style.width = pct + '%', 250);
    }
  });
}
window.addEventListener('load', animateSkillBars);

// Simple reveal for project cards (adds opacity/translate transitions via CSS)
const style = document.createElement('style');
style.innerHTML = `
  .project, .skill-card, .section-title, .anim-heading { opacity:0; transform: translateY(14px); transition: all 0.8s cubic-bezier(.2,.9,.3,1); }
  .project.inview, .skill-card.inview, .section-title.inview, .anim-heading.inview{ opacity:1; transform:none; }
`;
document.head.appendChild(style);

// Contact form validation (JS-only)
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if(form){
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
    // basic email regex
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRe.test(email)){
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.style.color = '#ffbaba';
      return;
    }

    // Simulate successful send (client-side only). For actual email you need backend or form service.
    formMsg.textContent = 'Message sent! I will get back to you soon.';
    formMsg.style.color = 'var(--accent)';
    form.reset();
  });
}

// Accessibility: allow closing mobile nav on escape
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') nav.classList.remove('open');
});
