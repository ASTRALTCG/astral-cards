/* Ambiance décorative de la carte Lore : aucune modification des liens ou du zoom. */
(() => {
  'use strict';
  const viewport = document.getElementById('universe-viewport');
  const stars = document.getElementById('universe-stars');
  const toggle = document.getElementById('toggle-ambience');
  const dialog = document.getElementById('planet-dialog');
  if (!viewport || !stars || !toggle) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'universe-ambience';
  canvas.setAttribute('aria-hidden', 'true');
  stars.after(canvas);
  const ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let width = 1, height = 1, visible = false, paused = false;
  let frame = 0, last = null, clock = 0;
  let seed = 419;
  const random = () => { seed = seed * 16807 % 2147483647; return seed / 2147483647; };
  const lights = Array.from({ length: 38 }, () => ({
    x: random(), y: random(), radius: .55 + random() * .65,
    phase: random() * Math.PI * 2, speed: .65 + random() * .7
  }));
  const routes = [
    { x: -.08, y: .14, dx: .83, dy: .29, duration: 2.8 },
    { x: .82, y: -.06, dx: -.52, dy: .55, duration: 3.2 },
    { x: .09, y: .61, dx: .94, dy: .22, duration: 2.6 }
  ];
  function comet(time, routeIndex) {
    const route = routes[routeIndex % routes.length];
    const progress = time / route.duration;
    if (progress < 0) return;
    if (progress > 1) return;
    const fade = Math.min(1, progress * 6, (1 - progress) * 5) * .65;
    const x = (route.x + route.dx * progress) * width;
    const y = (route.y + route.dy * progress) * height;
    const vx = route.dx * width, vy = route.dy * height;
    const norm = Math.hypot(vx, vy);
    const tail = Math.min(width * .13, 140);
    const tx = x - vx / norm * tail, ty = y - vy / norm * tail;
    const trail = ctx.createLinearGradient(tx, ty, x, y);
    trail.addColorStop(0, 'rgba(161,131,217,0)');
    trail.addColorStop(.65, `rgba(181,163,238,${fade * .27})`);
    trail.addColorStop(1, `rgba(236,226,255,${fade})`);
    ctx.strokeStyle = trail; ctx.lineWidth = 1.3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
    const glow = ctx.createRadialGradient(x, y, 0, x, y, 7);
    glow.addColorStop(0, `rgba(239,228,255,${fade * .8})`);
    glow.addColorStop(.2, `rgba(203,175,254,${fade * .4})`);
    glow.addColorStop(1, 'rgba(171,132,238,0)');
    ctx.fillStyle = glow; ctx.fillRect(x - 7, y - 7, 14, 14);
  }
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    if (reduced.matches) return;
    for (const light of lights) {
      const a = .16 + (Math.sin(clock * light.speed + light.phase) + 1) * .2;
      const x = light.x * width, y = light.y * height;
      ctx.fillStyle = `rgba(222,207,252,${a})`;
      ctx.beginPath(); ctx.arc(x, y, light.radius, 0, Math.PI * 2); ctx.fill();
      if (light.radius > 1) {
        ctx.fillStyle = `rgba(186,150,235,${a * .12})`;
        ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    // Deux puis trois passages fins, décalés et parfois simultanés.
    const elapsed = clock - .8;
    if (elapsed >= 0) {
      const cycle = Math.floor(elapsed / 6.5);
      const local = elapsed % 6.5;
      const count = cycle % 2 === 0 ? 3 : 2;
      for (let i = 0; i < count; i++) comet(local - i * 1.15, cycle + i);
    }
  }
  const canAnimate = () => visible && !paused && !reduced.matches && !document.hidden && !dialog?.open;
  function tick(now) {
    frame = 0;
    if (!canAnimate()) { last = null; return; }
    if (last === null) last = now;
    const delta = now - last;
    // Le ciel ne nécessite pas 60 rendus par seconde.
    if (delta >= 1000 / 30) {
      clock += Math.min(delta, 100) / 1000;
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function sync() {
    const active = canAnimate();
    viewport.classList.toggle('ambience-paused', !active);
    toggle.hidden = reduced.matches;
    toggle.setAttribute('aria-pressed', String(paused));
    const label = paused ? 'Reprendre les animations' : 'Mettre les animations en pause';
    toggle.setAttribute('aria-label', label); toggle.title = label;
    toggle.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
    if (!active) {
      cancelAnimationFrame(frame); frame = 0; last = null;
      if (reduced.matches) draw();
    } else if (!frame) frame = requestAnimationFrame(tick);
  }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0 }).observe(viewport);
  if (dialog) new MutationObserver(sync).observe(dialog, { attributes: true, attributeFilter: ['open'] });
  new ResizeObserver(() => {
    width = viewport.clientWidth; height = viewport.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }).observe(viewport);
  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frame); frame = 0; last = null;
    viewport.classList.add('ambience-paused');
  });
  window.addEventListener('pageshow', sync);
  sync();
})();
