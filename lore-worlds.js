/* Explorateur autonome : aucun chargement externe, fonctionne aussi depuis un dossier local. */
(() => {
  'use strict';
  const viewport = document.getElementById('universe-viewport');
  if (!viewport) return;
  const world = document.getElementById('universe-world');
  const canvas = document.getElementById('universe-stars');
  const ctx = canvas.getContext('2d');
  const search = document.getElementById('navigator-search');
  const results = document.getElementById('navigator-results');
  const status = document.getElementById('search-status');
  const dialog = document.getElementById('planet-dialog');
  const arrival = document.getElementById('arrival-sphere');
  const returnButton = document.getElementById('planet-return');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 600px)');
  // Un monde peut accueillir plusieurs Navigateurs : compléter simplement son tableau.
  const planets = {
    aenoria: { name: 'Ænoria', navigators: [
      { name: 'Le Dompteur', archetype: 'Guerriers Bêtes', image: 'images/dompteur.png', href: 'guerriers-betes.html' }
    ] },
    demono: { name: 'Démono', navigators: [
      { name: 'Zvatas', archetype: 'Démon nuageux', image: 'images/zvatas.png', href: 'demononuageux.html' }
    ] },
    harmony: { name: 'Harmony', navigators: [
      { name: 'Zyraël', archetype: 'Sceau Brisé', image: 'images/zyrael.png', href: 'sceau-brise.html' }
    ] },
    vespera: { name: 'Vespera', navigators: [
      { name: 'Rebecca', archetype: 'L’Épine', image: 'images/rebecca.png', href: 'ordre-epine.html' }
    ] }
  };
  const allNavigators = Object.values(planets).flatMap(p => p.navigators.map(n => ({ ...n, planet: p.name })));
  const normalize = text => text.toLocaleLowerCase('fr').replace(/æ/g, 'ae').replace(/œ/g, 'oe').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  let width = 1, height = 1, fit = 1, x = 0, y = 0, scale = 1, frame = 0;
  let lookX = 0, lookY = 0, aimX = 0, aimY = 0;
  const sky = viewport.querySelector('.depth-sky');
  const depthFactors = { aenoria: .65, harmony: .43, vespera: 1.14, demono: 1.25 };
  const depthObjects = [...viewport.querySelectorAll('.world-planet')].map(element => ({ element, depth: depthFactors[element.dataset.planet] }));
  const unrevealed = viewport.querySelector('.unrevealed-world');
  if (unrevealed) depthObjects.push({ element: unrevealed, depth: .83 });
  function renderDepth() {
    if (reduceMotion.matches) lookX = lookY = aimX = aimY = 0;
    else {
      lookX += (aimX - lookX) * .13;
      lookY += (aimY - lookY) * .13;
    }
    const active = !reduceMotion.matches;
    for (const { element, depth } of depthObjects) {
      const dx = active ? (x / scale) * (depth - 1) * .26 + lookX * (depth - .5) * 21 : 0;
      const dy = active ? (y / scale) * (depth - 1) * .21 + lookY * (depth - .5) * 15 : 0;
      element.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    }
    if (sky) sky.style.transform = active ? `translate(${x * .018 + lookX * 9}px, ${y * .012 + lookY * 6}px) scale(${1 + Math.max(0, scale / fit - 1) * .018})` : '';
    return Math.abs(aimX - lookX) + Math.abs(aimY - lookY) > .003;
  }
  const zoomOut = document.getElementById('zoom-out');
  const zoomIn = document.getElementById('zoom-in');
  let seed = 7349;
  const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const stars = Array.from({ length: 270 }, () => ({ x: random(), y: random(), r: .2 + random() * .8, a: .1 + random() * .52, depth: .008 + random() * .025 }));
  // De fines étoiles éparses soulignent les nébuleuses, sans ceinture de débris.
  for (let i = 0; i < 55; i++) {
    const branch = i % 2, position = random();
    stars.push({
      x: branch ? .65 + position * .33 : .02 + position * .33,
      y: (branch ? .66 : .22) + Math.sin(position * 4.2) * .12 + (random() - .5) * .14,
      r: .2 + random() * .5, a: .12 + random() * .35, depth: .02
    });
  }
  function drawStars() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      const sx = ((star.x * width + x * star.depth + lookX * star.depth * 140) % width + width) % width;
      const sy = ((star.y * height + y * star.depth + lookY * star.depth * 100) % height + height) % height;
      ctx.beginPath(); ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(209,193,237,${star.a})`; ctx.fill();
      if (star.r > .88 && star.a > .56) {
        ctx.fillStyle = `rgba(207,178,250,${star.a * .23})`;
        ctx.fillRect(sx - 3, sy - .4, 6, .8); ctx.fillRect(sx - .4, sy - 3, .8, 6);
      }
    }
  }
  function render() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      world.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      zoomOut.disabled = scale <= fit * .75 + .001;
      zoomIn.disabled = scale >= fit * 2.7 - .001;
      const moving = renderDepth();
      drawStars();
      if (moving) render();
    });
  }
  function bound() {
    const rangeX = (mobile.matches ? 390 : 1100) * scale / 2;
    const rangeY = (mobile.matches ? 710 : 590) * scale / 2;
    x = Math.max(-rangeX, Math.min(rangeX, x));
    y = Math.max(-rangeY, Math.min(rangeY, y));
  }
  function zoom(next, px = 0, py = 0) {
    next = Math.max(fit * .75, Math.min(fit * 2.7, next));
    const ratio = next / scale;
    x = px - (px - x) * ratio; y = py - (py - y) * ratio; scale = next;
    bound(); render();
  }
  function reset() { x = 0; y = mobile.matches ? -12 : 0; scale = fit; lookX = lookY = aimX = aimY = 0; render(); }
  function resize() {
    width = viewport.clientWidth; height = viewport.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fit = mobile.matches ? Math.min((width - 20) / 400, (height - 96) / 690) : Math.min((width - 60) / 1080, (height - 100) / 570, 1.15);
    reset();
  }
  new ResizeObserver(resize).observe(viewport);
  mobile.addEventListener('change', resize);
  zoomOut.addEventListener('click', () => zoom(scale / 1.25));
  zoomIn.addEventListener('click', () => zoom(scale * 1.25));
  document.getElementById('reset-view').addEventListener('click', reset);
  viewport.addEventListener('wheel', e => {
    e.preventDefault();
    const r = viewport.getBoundingClientRect();
    zoom(scale * Math.exp(-Math.max(-100, Math.min(100, e.deltaY)) * .0025), e.clientX - r.left - width / 2, e.clientY - r.top - height / 2);
  }, { passive: false });

  const pointers = new Map();
  let gesture = null, suppressClickUntil = 0;
  viewport.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || pointers.size || dialog.open || reduceMotion.matches) return;
    const bounds = viewport.getBoundingClientRect();
    aimX = Math.max(-1, Math.min(1, (e.clientX - bounds.left) / width * 2 - 1));
    aimY = Math.max(-1, Math.min(1, (e.clientY - bounds.top) / height * 2 - 1));
    render();
  });
  viewport.addEventListener('pointerleave', () => { aimX = aimY = 0; render(); });
  reduceMotion.addEventListener('change', () => { aimX = aimY = 0; render(); });
  function beginGesture() {
    const p = [...pointers.values()];
    gesture = p.length > 1 ? { kind: 'pinch', distance: Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y), midX: (p[0].x + p[1].x) / 2, midY: (p[0].y + p[1].y) / 2, x, y, scale } : p.length ? { kind: 'pan', px: p[0].x, py: p[0].y, x, y } : null;
  }
  viewport.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    (e.target.closest('.world-planet') || viewport).setPointerCapture(e.pointerId);
    beginGesture();
    if (pointers.size > 1) suppressClickUntil = performance.now() + 500;
  });
  viewport.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId) || !gesture) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (gesture.kind === 'pinch' && pointers.size > 1) {
      const p = [...pointers.values()];
      const r = viewport.getBoundingClientRect();
      const next = Math.max(fit * .75, Math.min(fit * 2.7, gesture.scale * Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y) / Math.max(1, gesture.distance)));
      const mx = (p[0].x + p[1].x) / 2 - r.left - width / 2;
      const my = (p[0].y + p[1].y) / 2 - r.top - height / 2;
      x = mx - (gesture.midX - r.left - width / 2 - gesture.x) * next / gesture.scale;
      y = my - (gesture.midY - r.top - height / 2 - gesture.y) * next / gesture.scale;
      scale = next;
    } else {
      const dx = e.clientX - gesture.px, dy = e.clientY - gesture.py;
      if (Math.hypot(dx, dy) < 6) return;
      x = gesture.x + dx; y = gesture.y + dy;
    }
    suppressClickUntil = performance.now() + 500;
    viewport.classList.add('is-dragging');
    bound(); render();
  });
  function endPointer(e) {
    if (!pointers.has(e.pointerId)) return;
    if (viewport.classList.contains('is-dragging')) suppressClickUntil = performance.now() + 250;
    pointers.delete(e.pointerId); beginGesture();
    if (!pointers.size) viewport.classList.remove('is-dragging');
  }
  viewport.addEventListener('pointerup', endPointer);
  viewport.addEventListener('pointercancel', endPointer);
  viewport.addEventListener('lostpointercapture', endPointer);
  viewport.addEventListener('click', e => {
    if (e.detail !== 0 && performance.now() < suppressClickUntil) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  viewport.addEventListener('keydown', e => {
    if (e.target !== viewport) return;
    const moves = { ArrowLeft: [65, 0], ArrowRight: [-65, 0], ArrowUp: [0, 65], ArrowDown: [0, -65] };
    if (moves[e.key]) { e.preventDefault(); x += moves[e.key][0]; y += moves[e.key][1]; bound(); render(); }
    if (['+', '=', '-', 'Home'].includes(e.key)) {
      e.preventDefault();
      if (e.key === 'Home') reset(); else zoom(scale * (e.key === '-' ? .8 : 1.25));
    }
  });
  viewport.addEventListener('focusin', e => {
    const button = e.target.closest('.world-planet');
    if (!button || pointers.size) return;
    const b = button.getBoundingClientRect(), r = viewport.getBoundingClientRect();
    if (b.left < r.left + 10 || b.right > r.right - 10 || b.top < r.top + 45 || b.bottom > r.bottom - 65) {
      x = -button.offsetLeft * scale; y = -button.offsetTop * scale; render();
    }
  });

  function makeImage(n) { const img = document.createElement('img'); img.src = n.image; img.alt = ''; img.draggable = false; return img; }
  function showResults() {
    const query = normalize(search.value);
    const matches = allNavigators.filter(n => normalize(`${n.name} ${n.planet} ${n.archetype}`).includes(query));
    results.replaceChildren();
    for (const n of matches) {
      const link = document.createElement('a'); link.href = n.href; link.className = 'search-result';
      const text = document.createElement('span');
      const name = document.createElement('strong'); name.textContent = n.name;
      const planet = document.createElement('small'); planet.textContent = n.planet;
      const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
      text.append(name, planet); link.append(makeImage(n), text, arrow); results.append(link);
    }
    if (!matches.length) { const p = document.createElement('p'); p.className = 'search-empty'; p.textContent = 'Aucun Navigateur trouvé. Essayez un autre nom.'; results.append(p); }
    results.hidden = false;
    status.textContent = `${matches.length} résultat${matches.length > 1 ? 's' : ''}.`;
  }
  search.addEventListener('input', showResults);
  search.addEventListener('focus', showResults);
  search.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.hidden = true; return; }
    const first = results.querySelector('a');
    if (e.key === 'ArrowDown' && first) { e.preventDefault(); first.focus(); }
    if (e.key === 'Enter' && first && !results.hidden) { e.preventDefault(); first.click(); }
  });
  results.addEventListener('keydown', e => {
    const links = [...results.querySelectorAll('a')], i = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); links[Math.min(i + 1, links.length - 1)]?.focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); if (i <= 0) search.focus(); else links[i - 1].focus(); }
    if (e.key === 'Escape') { search.focus(); results.hidden = true; }
  });
  document.addEventListener('pointerdown', e => { if (!e.target.closest('.navigator-search')) results.hidden = true; });
  document.querySelector('.navigator-search').addEventListener('focusout', e => { if (!e.currentTarget.contains(e.relatedTarget)) results.hidden = true; });

  // Décor partagé entre les petits globes et celui de la traversée.
  function decorateSphere(sphere) {
    for (const name of ['planet-terrain', 'planet-clouds', 'planet-aurora', 'planet-dust', 'planet-lightning', 'planet-ring']) {
      const layer = document.createElement('span');
      layer.className = name; layer.setAttribute('aria-hidden', 'true'); sphere.append(layer);
    }
  }
  for (const button of viewport.querySelectorAll('.world-planet')) {
    decorateSphere(button.querySelector('.planet-sphere'));
    const aura = document.createElement('span');
    aura.className = 'world-aura'; aura.setAttribute('aria-hidden', 'true'); button.prepend(aura);
  }
  decorateSphere(arrival);
  const magicCanvas = document.createElement('canvas');
  magicCanvas.className = 'arrival-magic'; magicCanvas.setAttribute('aria-hidden', 'true');
  dialog.append(magicCanvas);
  let magicFrame = 0;
  function stopMagic() {
    cancelAnimationFrame(magicFrame); magicFrame = 0;
    magicCanvas.style.opacity = '0';
  }
  function playMagic(rect, duration) {
    const magic = magicCanvas.getContext('2d');
    if (!magic) return;
    const w = innerWidth, h = innerHeight, dpr = Math.min(devicePixelRatio || 1, 1.5);
    magicCanvas.width = Math.round(w * dpr); magicCanvas.height = Math.round(h * dpr);
    magic.setTransform(dpr, 0, 0, dpr, 0, 0);
    const color = getComputedStyle(dialog).getPropertyValue('--planet-rgb').trim() || '130,110,180';
    const palette = { aenoria: '164,224,192', demono: '197,179,242', harmony: '232,210,156', vespera: '211,161,222' };
    const light = palette[dialog.dataset.planet];
    const startX = rect.left + rect.width / 2, startY = rect.top + rect.height / 2;
    const reach = Math.hypot(w, h) * .65;
    const motes = Array.from({ length: w < 600 ? 46 : 78 }, (_, i) => ({
      angle: i * 2.399963, distance: .17 + ((i * 37) % 100) / 120,
      size: .6 + ((i * 11) % 13) / 10, drift: ((i * 7) % 11 - 5) * .028
    }));
    const started = performance.now();
    magicCanvas.style.opacity = '1';
    function paint(now) {
      const t = Math.min(1, (now - started) / duration);
      const move = 1 - Math.pow(1 - Math.min(1, t / .68), 3);
      const cx = startX + (w / 2 - startX) * move, cy = startY + (h / 2 - startY) * move;
      const expansion = Math.pow(Math.max(0, (t - .12) / .88), 2.1);
      const envelope = Math.sin(Math.PI * t);
      magic.clearRect(0, 0, w, h);
      const radius = Math.max(1, rect.width * .72 + reach * expansion);
      const bloom = magic.createRadialGradient(cx, cy, radius * .35, cx, cy, radius);
      bloom.addColorStop(0, `rgba(${color},0)`);
      bloom.addColorStop(.68, `rgba(${color},${envelope * .12})`);
      bloom.addColorStop(.84, `rgba(${light},${envelope * .075})`);
      bloom.addColorStop(1, `rgba(${color},0)`);
      magic.fillStyle = bloom; magic.fillRect(0, 0, w, h);
      magic.globalCompositeOperation = 'lighter';
      for (const mote of motes) {
        const angle = mote.angle + t * (.42 + mote.drift);
        const distance = rect.width * (.48 + mote.distance * .5) + reach * expansion * mote.distance;
        const px = cx + Math.cos(angle) * distance;
        const py = cy + Math.sin(angle) * distance * .79;
        const trail = (5 + 66 * expansion) * envelope;
        magic.lineWidth = mote.size * .55;
        magic.strokeStyle = `rgba(${light},${envelope * .22})`;
        magic.beginPath(); magic.moveTo(px, py);
        magic.quadraticCurveTo(px - Math.cos(angle - .17) * trail * .6, py - Math.sin(angle - .17) * trail * .6, px - Math.cos(angle) * trail, py - Math.sin(angle) * trail * .79);
        magic.stroke();
        magic.fillStyle = `rgba(${light},${envelope * .63})`;
        magic.beginPath(); magic.arc(px, py, mote.size * (.6 + envelope * .3), 0, Math.PI * 2); magic.fill();
      }
      // Deux arcs fugaces accompagnent l'entrée ; pas de flash blanc ni de stroboscope.
      for (let i = 0; i < 2; i++) {
        const arcRadius = radius * (.76 + i * .12);
        magic.strokeStyle = `rgba(${light},${envelope * (1 - t) * .16})`;
        magic.lineWidth = .8;
        magic.beginPath();
        magic.ellipse(cx, cy, arcRadius, arcRadius * .7, -.35 + t * .35, i * Math.PI + t, i * Math.PI + t + Math.PI * .72);
        magic.stroke();
      }
      magic.globalCompositeOperation = 'source-over';
      if (t < 1 && dialog.open) magicFrame = requestAnimationFrame(paint);
      else stopMagic();
    }
    magicFrame = requestAnimationFrame(paint);
  }

  let openedBy = null, animations = [], arrivalRun = 0;
  function storyCard(n) {
    const link = document.createElement('a'); link.href = n.href; link.className = 'navigator-story';
    const portrait = document.createElement('span'); portrait.className = 'navigator-portrait'; portrait.append(makeImage(n));
    const copy = document.createElement('span'); copy.className = 'navigator-story-copy';
    const archetype = document.createElement('small'); archetype.textContent = n.archetype;
    const name = document.createElement('strong'); name.textContent = n.name;
    const action = document.createElement('span'); action.textContent = 'Découvrir son histoire';
    const arrow = document.createElement('b'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); action.append(arrow);
    copy.append(archetype, name, action); link.append(portrait, copy); return link;
  }
  function cleanArrival() { animations.forEach(a => a.cancel()); animations = []; stopMagic(); }
  async function openPlanet(button) {
    if (dialog.open) return;
    const p = planets[button.dataset.planet];
    const rect = button.querySelector('.planet-sphere').getBoundingClientRect();
    openedBy = button; const run = ++arrivalRun;
    dialog.dataset.planet = button.dataset.planet;
    document.getElementById('planet-title').textContent = p.name;
    document.getElementById('planet-navigators').replaceChildren(...p.navigators.map(storyCard));
    results.hidden = true;
    document.body.classList.add('lore-planet-open');
    dialog.showModal(); dialog.scrollTop = 0;
    if (reduceMotion.matches) { dialog.classList.add('is-arrived'); return; }
    dialog.classList.add('is-travelling');
    const duration = 1550;
    playMagic(rect, duration);
    const dx = rect.left + rect.width / 2 - innerWidth / 2;
    const dy = rect.top + rect.height / 2 - innerHeight / 2;
    const zoomSize = Math.max(innerWidth, innerHeight) * 1.65 / 340;
    const travel = arrival.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(${rect.width / 340})`, opacity: 1, offset: 0 },
      { transform: `translate(${dx * .95}px, ${dy * .95}px) scale(${rect.width / 340 * 1.08})`, opacity: 1, offset: .14 },
      { transform: `translate(0, 0) scale(${zoomSize})`, opacity: 1, offset: .73 },
      { transform: `translate(0, 0) scale(${zoomSize * 1.18})`, opacity: 0, offset: 1 }
    ], { duration, easing: 'cubic-bezier(.5,.08,.24,1)', fill: 'forwards' });
    animations.push(travel);
    try { await travel.finished; } catch { return; }
    if (run === arrivalRun && dialog.open) {
      dialog.classList.remove('is-travelling');
      dialog.classList.add('is-arrived');
    }
    cleanArrival();
  }
  for (const button of viewport.querySelectorAll('.world-planet')) button.addEventListener('click', () => openPlanet(button));
  returnButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    arrivalRun++; cleanArrival(); dialog.classList.remove('is-arrived', 'is-travelling');
    document.body.classList.remove('lore-planet-open'); openedBy?.focus({ preventScroll: true });
  });
  // Réinitialise un dialogue conservé par le cache du navigateur après la lecture d’un récit.
  window.addEventListener('pageshow', e => { if (e.persisted && dialog.open) dialog.close(); });
})();
