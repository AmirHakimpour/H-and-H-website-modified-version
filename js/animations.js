function initAnimations() {
  // Scroll reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Parallax hero animation
  const hero = document.querySelector('.hero');
  if (hero) {
    let lastScroll = 0;
    const update = () => {
      const sc = window.scrollY;
      if (Math.abs(sc - lastScroll) > 0.5) { // Only update if scroll changed by a meaningful amount
        hero.style.transform = `translateY(${sc * 0.12}px)`;
        lastScroll = sc;
      }
      requestAnimationFrame(update);
    };

    // Run only if reduced motion is not preferred
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!motionQuery.matches) {
      requestAnimationFrame(update);
    }
  }
}

// Export the init function
window.animations = {
  init: initAnimations,
};
