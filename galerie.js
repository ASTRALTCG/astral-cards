(() => {
  const cards = [...document.querySelectorAll('.gallery-card')];
  const decks = [...document.querySelectorAll('.starter-deck')];
  const filterButtons = [...document.querySelectorAll('.gallery-filter')];
  const searchInput = document.querySelector('#gallery-search');
  const results = document.querySelector('.gallery-results');
  const viewer = document.querySelector('.card-viewer');

  if (!viewer) return;

  const viewerCard = viewer.querySelector('.viewer-card');
  const viewerTilt = viewer.querySelector('.viewer-tilt');
  const viewerShine = viewer.querySelector('.viewer-shine');
  const viewerFrontImage = viewer.querySelector('.viewer-front img');
  const viewerBackImage = viewer.querySelector('.viewer-back > img');
  const viewerBackFallback = viewer.querySelector('.viewer-back-fallback');
  const viewerName = viewer.querySelector('#viewer-card-name');
  const viewerType = viewer.querySelector('.viewer-type');
  const viewerArchetype = viewer.querySelector('.viewer-archetype');
  const flipButton = viewer.querySelector('.viewer-flip');
  const closeButton = viewer.querySelector('.card-viewer-close');
  const backdrop = viewer.querySelector('.card-viewer-backdrop');

  let activeFilter = 'all';
  let lastFocusedCard = null;

  const cleanName = (value) => value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  cards.forEach((card) => {
    const deck = card.closest('.starter-deck');
    const fileName = card.dataset.name?.trim();
    const extension = card.dataset.extension?.trim() || 'png';
    const title = card.dataset.title?.trim() || cleanName(fileName || 'Carte Astral');
    const type = card.dataset.type?.trim() || 'Carte';
    const archetype = deck?.dataset.archetype || '';
    const front = `images/cartes/${fileName}.${extension}`;
    const back = card.dataset.back?.trim() || 'images/cartes/dos-carte.png';

    card.dataset.archetype = archetype;
    card.dataset.front = front;
    card.dataset.backResolved = back;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ouvrir la carte ${title}`);
    card.innerHTML = `
      <span class="gallery-card-art">
        <img src="${front}" alt="Carte ${title}" loading="lazy">
        <span class="gallery-card-glow" aria-hidden="true"></span>
      </span>
      <span class="gallery-card-meta">
        <strong>${title}</strong>
        <span>${type}</span>
      </span>`;

    const image = card.querySelector('img');
    image.addEventListener('error', () => {
      card.classList.add('image-missing');
      image.alt = `Image introuvable : ${front}`;
    });

    const open = () => openViewer(card, title, type, archetype, front, back);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  function applyFilters() {
    const query = (searchInput?.value || '').trim().toLocaleLowerCase('fr');
    let totalVisible = 0;

    cards.forEach((card) => {
      const title = (card.dataset.title || cleanName(card.dataset.name || '')).toLocaleLowerCase('fr');
      const matchesType = activeFilter === 'all' || card.dataset.type === activeFilter;
      const matchesSearch = !query || title.includes(query);
      const visible = matchesType && matchesSearch;
      card.hidden = !visible;
      if (visible) totalVisible += 1;
    });

    decks.forEach((deck) => {
      const allDeckCards = [...deck.querySelectorAll('.gallery-card')];
      const visibleDeckCards = allDeckCards.filter((card) => !card.hidden);
      const empty = deck.querySelector('.deck-empty');
      deck.classList.toggle('has-no-result', allDeckCards.length > 0 && visibleDeckCards.length === 0);
      if (empty) {
        empty.hidden = allDeckCards.length > 0;
      }
    });

    if (results) {
      if (cards.length === 0) results.textContent = 'Ajoutez vos premières cartes dans galerie.html pour remplir les quatre Starter Decks.';
      else results.textContent = `${totalVisible} carte${totalVisible > 1 ? 's' : ''} affichée${totalVisible > 1 ? 's' : ''}.`;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', applyFilters);

  function openViewer(card, title, type, archetype, front, back) {
    lastFocusedCard = card;
    viewerName.textContent = title;
    viewerType.textContent = type;
    viewerArchetype.textContent = `Starter Deck — ${archetype}`;
    viewerFrontImage.src = front;
    viewerFrontImage.alt = `Carte ${title}`;
    viewerBackImage.src = back;
    viewerBackFallback.hidden = true;
    viewerBackImage.hidden = false;
    viewerBackImage.onerror = () => {
      viewerBackImage.hidden = true;
      viewerBackFallback.hidden = false;
    };
    viewerCard.classList.remove('is-flipped');
    flipButton.setAttribute('aria-pressed', 'false');
    viewer.hidden = false;
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('viewer-open');
    requestAnimationFrame(() => viewer.classList.add('is-open'));
    closeButton.focus();
  }

  function closeViewer() {
    viewer.classList.remove('is-open');
    document.body.classList.remove('viewer-open');
    resetTilt();
    window.setTimeout(() => {
      viewer.hidden = true;
      viewer.setAttribute('aria-hidden', 'true');
      lastFocusedCard?.focus();
    }, 220);
  }

  function flipCard() {
    const flipped = viewerCard.classList.toggle('is-flipped');
    flipButton.setAttribute('aria-pressed', String(flipped));
    flipButton.textContent = flipped ? '↻ Revenir au recto' : '↻ Retourner la carte';
  }

  function resetTilt() {
    viewerTilt.style.transform = '';
    viewerShine.style.opacity = '0';
  }

  viewerTilt.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    const rect = viewerTilt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 15;
    const rotateX = (0.5 - y) * 15;
    viewerTilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    viewerShine.style.setProperty('--shine-x', `${x * 100}%`);
    viewerShine.style.setProperty('--shine-y', `${y * 100}%`);
    viewerShine.style.opacity = '.7';
  });
  viewerTilt.addEventListener('pointerleave', resetTilt);

  flipButton.addEventListener('click', flipCard);
  closeButton.addEventListener('click', closeViewer);
  backdrop.addEventListener('click', closeViewer);
  document.addEventListener('keydown', (event) => {
    if (viewer.hidden) return;
    if (event.key === 'Escape') closeViewer();
    if (event.key.toLocaleLowerCase('fr') === 'f') flipCard();
  });

  applyFilters();
})();
