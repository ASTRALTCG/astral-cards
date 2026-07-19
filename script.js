// Menu mobile
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Apparition progressive des sections
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

// Frise interactive du lore
const timelineViewport = document.querySelector('.lore-timeline-viewport');
const timelineLeft = document.querySelector('.timeline-control-left');
const timelineRight = document.querySelector('.timeline-control-right');
const timelineTransition = document.querySelector('.timeline-transition');

// L'ancien calque de transition n'est plus utilisé.
// On le masque pour qu'il ne puisse pas recouvrir la page ni bloquer les clics.
if (timelineTransition) {
  timelineTransition.style.display = 'none';
  timelineTransition.style.pointerEvents = 'none';
}

if (timelineViewport) {
  const scrollAmount = () => Math.max(280, timelineViewport.clientWidth * 0.72);

  if (timelineLeft) {
    timelineLeft.addEventListener('click', () => {
      timelineViewport.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
  }

  if (timelineRight) {
    timelineRight.addEventListener('click', () => {
      timelineViewport.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });
  }

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  timelineViewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    // Une bulle est uniquement cliquable : le glissement ne démarre pas dessus.
    if (event.target.closest('.timeline-node')) return;

    isDragging = true;
    startX = event.clientX;
    startScrollLeft = timelineViewport.scrollLeft;
    timelineViewport.classList.add('is-dragging');

    if (timelineViewport.setPointerCapture) {
      timelineViewport.setPointerCapture(event.pointerId);
    }
  });

  timelineViewport.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    timelineViewport.scrollLeft = startScrollLeft - (event.clientX - startX);
  });

  const stopDragging = (event) => {
    if (!isDragging) return;

    isDragging = false;
    timelineViewport.classList.remove('is-dragging');

    if (
      timelineViewport.hasPointerCapture &&
      timelineViewport.hasPointerCapture(event.pointerId)
    ) {
      timelineViewport.releasePointerCapture(event.pointerId);
    }
  };

  timelineViewport.addEventListener('pointerup', stopDragging);
  timelineViewport.addEventListener('pointercancel', stopDragging);
  timelineViewport.addEventListener('pointerleave', (event) => {
    if (isDragging && event.pointerType === 'mouse') stopDragging(event);
  });

  // Empêche les images d'être saisies ou déplacées par le navigateur.
  timelineViewport.querySelectorAll('img').forEach((image) => {
    image.draggable = false;
    image.addEventListener('dragstart', (event) => event.preventDefault());
  });

  timelineViewport.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });

  // Aucun effet de zoom au clic : les liens s'ouvrent normalement et immédiatement.
}
