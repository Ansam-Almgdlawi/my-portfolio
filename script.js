const elements = document.querySelectorAll('.project-card, .skill');

window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.9;
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 0.6s ease-out';
    }
  });
});
