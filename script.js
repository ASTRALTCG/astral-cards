
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((el) => observer.observe(el));

// Frise interactive du lore
const timelineViewport = document.querySelector('.lore-timeline-viewport');
const timelineLeft = document.querySelector('.timeline-control-left');
const timelineRight = document.querySelector('.timeline-control-right');

if (timelineViewport) {
  const scrollAmount = () => Math.max(280, timelineViewport.clientWidth * 0.72);

  timelineLeft?.addEventListener('click', () => {
    timelineViewport.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  timelineRight?.addEventListener('click', () => {
    timelineViewport.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  timelineViewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    isDragging = true;
    startX = event.clientX;
    startScrollLeft = timelineViewport.scrollLeft;
    timelineViewport.setPointerCapture?.(event.pointerId);
  });

  timelineViewport.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    timelineViewport.scrollLeft = startScrollLeft - (event.clientX - startX);
  });

  const stopDragging = () => { isDragging = false; };
  timelineViewport.addEventListener('pointerup', stopDragging);
  timelineViewport.addEventListener('pointercancel', stopDragging);

  const transition = document.querySelector('.timeline-transition');
  const transitionImage = document.querySelector('.timeline-transition-image');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.timeline-node').forEach((node) => {
    node.addEventListener('click', (event) => {
      if (Math.abs(timelineViewport.scrollLeft - startScrollLeft) > 8) {
        event.preventDefault();
        return;
      }
      if (reduceMotion || !transition || !transitionImage) return;

      event.preventDefault();
      const image = node.querySelector('img');
      const destination = node.getAttribute('href');
      transitionImage.style.backgroundImage = image ? `url("${image.getAttribute('src')}")` : 'none';
      transition.classList.add('active');
      window.setTimeout(() => { window.location.href = destination; }, 650);
    });
  });
}
