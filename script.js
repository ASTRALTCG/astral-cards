
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

// Galerie de cartes
(() => {
  const gallery = document.querySelector('.gallery-content');
  if (!gallery) return;

  const cards = [...gallery.querySelectorAll('.gallery-card')];
  const filters = [...gallery.querySelectorAll('.gallery-filter')];
  const searchInput = gallery.querySelector('#gallery-search-input');
  const resultStatus = gallery.querySelector('#gallery-result-status');
  const viewer = document.querySelector('#card-viewer');
  const viewerCard = viewer?.querySelector('#viewer-card');
  const viewerFront = viewer?.querySelector('.viewer-front img');
  const viewerBack = viewer?.querySelector('.viewer-back img');
  const viewerName = viewer?.querySelector('#viewer-card-name');
  const viewerType = viewer?.querySelector('#viewer-card-type');
  const viewerArchetype = viewer?.querySelector('#viewer-card-archetype');
  const flipButton = viewer?.querySelector('.viewer-flip');
  const closeButtons = viewer ? [...viewer.querySelectorAll('.viewer-close, .viewer-backdrop')] : [];
  const validTypes = ['Sbire', 'Navigateur', 'Environnement', 'Pouvoir', 'Cosmique', 'Spéciale'];
  let activeFilter = 'Tous';
  let lastTrigger = null;

  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  const makeMissingVisual = (button, name) => {
    button.innerHTML = `<span class="gallery-card-missing"><span><img src="logo-astral-cards.png" alt=""><br>Image introuvable<br><strong>${name}</strong></span></span>`;
  };

  cards.forEach((card) => {
    const name = card.dataset.name?.trim() || 'Carte sans nom';
    const type = card.dataset.type?.trim() || '';
    const deck = card.closest('.starter-deck');
    const archetype = deck?.dataset.archetype || '';
    const fileName = card.dataset.file?.trim() || `${name}.png`;
    const frontPath = `images/cartes/${fileName}`;
    const backFile = card.dataset.back?.trim() || 'dos-carte.png';
    const backPath = `images/cartes/${backFile}`;

    card.dataset.archetype = archetype;
    card.dataset.front = frontPath;
    card.dataset.backPath = backPath;
    deck?.classList.add('has-cards');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-card-button';
    button.setAttribute('aria-label', `Ouvrir la carte ${name}`);

    const image = document.createElement('img');
    image.className = 'gallery-card-image';
    image.src = frontPath;
    image.alt = `Carte ${name}`;
    image.loading = 'lazy';
    image.addEventListener('error', () => makeMissingVisual(button, name), { once: true });

    const label = document.createElement('span');
    label.className = 'gallery-card-label';
    label.innerHTML = `${name}<span class="gallery-card-type">${validTypes.includes(type) ? type : 'Type non renseigné'}</span>`;
    button.append(image, label);
    card.append(button);

    button.addEventListener('click', () => openViewer(card, button));
  });

  const updateCounts = () => {
    gallery.querySelectorAll('[data-count]').forEach((counter) => {
      const type = counter.dataset.count;
      counter.textContent = type === 'Tous' ? cards.length : cards.filter((card) => card.dataset.type === type).length;
    });
  };

  const applyFilters = () => {
    const query = normalize(searchInput?.value || '');
    let visibleTotal = 0;

    gallery.querySelectorAll('.starter-deck').forEach((deck) => {
      let visibleInDeck = 0;
      deck.querySelectorAll('.gallery-card').forEach((card) => {
        const matchesType = activeFilter === 'Tous' || card.dataset.type === activeFilter;
        const matchesSearch = !query || normalize(card.dataset.name || '').includes(query);
        const visible = matchesType && matchesSearch;
        card.hidden = !visible;
        if (visible) visibleInDeck += 1;
      });
      deck.classList.toggle('is-filter-empty', cards.length > 0 && visibleInDeck === 0);
      visibleTotal += visibleInDeck;
    });

    if (resultStatus) {
      resultStatus.textContent = cards.length === 0
        ? 'Aucune carte n’est encore publiée dans la galerie.'
        : `${visibleTotal} carte${visibleTotal > 1 ? 's' : ''} affichée${visibleTotal > 1 ? 's' : ''}.`;
    }
  };

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'Tous';
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      applyFilters();
    });
  });
  searchInput?.addEventListener('input', applyFilters);

  function openViewer(card, trigger) {
    if (!viewer || !viewerCard || !viewerFront || !viewerBack) return;
    lastTrigger = trigger;
    viewerFront.src = card.dataset.front;
    viewerFront.alt = `Carte ${card.dataset.name}`;
    viewerBack.src = card.dataset.backPath;
    viewerBack.onerror = () => {
      viewerBack.onerror = null;
      viewerBack.src = 'logo-astral-cards.png';
      viewerBack.style.objectFit = 'contain';
      viewerBack.style.padding = '16%';
    };
    viewerName.textContent = card.dataset.name || 'Carte';
    viewerType.textContent = card.dataset.type || '';
    viewerArchetype.textContent = `Starter Deck — ${card.dataset.archetype || ''}`;
    viewerCard.classList.remove('is-flipped');
    viewerCard.removeAttribute('style');
    flipButton?.setAttribute('aria-pressed', 'false');
    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('viewer-open');
    viewer.querySelector('.viewer-close')?.focus();
  }

  function closeViewer() {
    if (!viewer) return;
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('viewer-open');
    viewerCard?.classList.remove('is-flipped');
    viewerCard?.removeAttribute('style');
    lastTrigger?.focus();
  }

  closeButtons.forEach((button) => button.addEventListener('click', closeViewer));
  flipButton?.addEventListener('click', () => {
    const flipped = viewerCard.classList.toggle('is-flipped');
    flipButton.setAttribute('aria-pressed', String(flipped));
    flipButton.textContent = flipped ? '↻ Revenir au recto' : '↻ Retourner la carte';
  });

  viewerCard?.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = viewerCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - .5) * 18;
    const rotateX = (.5 - y) * 18;
    viewerCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    viewerCard.style.setProperty('--shine-x', `${x * 100}%`);
    viewerCard.style.setProperty('--shine-y', `${y * 100}%`);
  });
  viewerCard?.addEventListener('pointerleave', () => {
    viewerCard.style.transform = '';
    viewerCard.style.setProperty('--shine-x', '50%');
    viewerCard.style.setProperty('--shine-y', '50%');
  });

  document.addEventListener('keydown', (event) => {
    if (!viewer?.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeViewer();
    if (event.key.toLowerCase() === 'f') flipButton?.click();
  });

  updateCounts();
  applyFilters();
})();
