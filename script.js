
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
  let didDrag = false;
  let startX = 0;
  let startScrollLeft = 0;
  const dragThreshold = 7;

  timelineViewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    isDragging = true;
    didDrag = false;
    startX = event.clientX;
    startScrollLeft = timelineViewport.scrollLeft;
    timelineViewport.classList.add('is-dragging');
    timelineViewport.setPointerCapture?.(event.pointerId);
  });

  timelineViewport.addEventListener('pointermove', (event) => {
    if (!isDragging) return;

    const distance = event.clientX - startX;
    if (Math.abs(distance) > dragThreshold) didDrag = true;

    if (didDrag) {
      event.preventDefault();
      timelineViewport.scrollLeft = startScrollLeft - distance;
    }
  });

  const stopDragging = (event) => {
    if (!isDragging) return;
    isDragging = false;
    timelineViewport.classList.remove('is-dragging');
    timelineViewport.releasePointerCapture?.(event.pointerId);
  };

  timelineViewport.addEventListener('pointerup', stopDragging);
  timelineViewport.addEventListener('pointercancel', stopDragging);
  timelineViewport.addEventListener('pointerleave', (event) => {
    if (isDragging && event.pointerType === 'mouse') stopDragging(event);
  });

  // Empêche le navigateur de saisir/faire voler les images.
  timelineViewport.querySelectorAll('img').forEach((image) => {
    image.draggable = false;
    image.addEventListener('dragstart', (event) => event.preventDefault());
  });

  timelineViewport.addEventListener('dragstart', (event) => event.preventDefault());

  const transition = document.querySelector('.timeline-transition');
  const transitionImage = document.querySelector('.timeline-transition-image');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.timeline-node').forEach((node) => {
    node.addEventListener('click', (event) => {
      // Un vrai glissement ne doit pas ouvrir une page ; un simple clic, oui.
      if (didDrag) {
        event.preventDefault();
        didDrag = false;
        return;
      }

      const destination = node.getAttribute('href');
      if (!destination) {
        event.preventDefault();
        return;
      }

      if (reduceMotion || !transition || !transitionImage) return;

      event.preventDefault();
      const image = node.querySelector('img');
      transitionImage.style.backgroundImage = image
        ? `url("${image.getAttribute('src')}")`
        : 'none';
      transition.classList.add('active');

      window.setTimeout(() => {
        window.location.href = destination;
      }, 650);
    });
  });
}
