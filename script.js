
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

// Frise interactive du lore — clic direct, sans animation de transition
const timelineViewport = document.querySelector('.lore-timeline-viewport');
const timelineLeft = document.querySelector('.timeline-control-left');
const timelineRight = document.querySelector('.timeline-control-right');

// Sécurité pour le retour arrière : aucun ancien calque ou état de transition ne doit rester affiché.
const resetTimelineState = () => {
  document.querySelectorAll('.timeline-transition, .timeline-transition-image').forEach((element) => {
    element.classList.remove('active');
    element.removeAttribute('style');
  });
  document.body.classList.remove('timeline-leaving');
};

window.addEventListener('pageshow', resetTimelineState);
resetTimelineState();

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
  const dragThreshold = 7;
  let movedDistance = 0;

  timelineViewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    // Une bulle est uniquement cliquable : le glissement commence dans l'espace vide.
    if (event.target.closest('.timeline-node')) return;

    isDragging = true;
    movedDistance = 0;
    startX = event.clientX;
    startScrollLeft = timelineViewport.scrollLeft;
    timelineViewport.classList.add('is-dragging');
    timelineViewport.setPointerCapture?.(event.pointerId);
  });

  timelineViewport.addEventListener('pointermove', (event) => {
    if (!isDragging) return;

    movedDistance = event.clientX - startX;
    if (Math.abs(movedDistance) < dragThreshold) return;

    event.preventDefault();
    timelineViewport.scrollLeft = startScrollLeft - movedDistance;
  });

  const stopDragging = (event) => {
    if (!isDragging) return;
    isDragging = false;
    timelineViewport.classList.remove('is-dragging');
    if (timelineViewport.hasPointerCapture?.(event.pointerId)) {
      timelineViewport.releasePointerCapture(event.pointerId);
    }
  };

  timelineViewport.addEventListener('pointerup', stopDragging);
  timelineViewport.addEventListener('pointercancel', stopDragging);
  timelineViewport.addEventListener('pointerleave', (event) => {
    if (isDragging && event.pointerType === 'mouse') stopDragging(event);
  });

  // Empêche le navigateur de saisir ou de déplacer les portraits.
  timelineViewport.querySelectorAll('img').forEach((image) => {
    image.draggable = false;
    image.addEventListener('dragstart', (event) => event.preventDefault());
  });
  timelineViewport.addEventListener('dragstart', (event) => event.preventDefault());

  // Aucun JavaScript sur le clic : les balises <a> ouvrent directement leur page.
  // Cela supprime totalement le zoom et évite qu'un calque reste bloqué au retour arrière.
}
