/* Interface du carnet. Pour les annonces, modifiez notes-de-patch.js uniquement. */
(() => {
  'use strict';
  const button = document.querySelector('#patch-notes-button');
  const dialog = document.querySelector('#patch-notes-dialog');
  if (!button || !dialog) return;
  const content = dialog.querySelector('#patch-notes-content');
  const status = dialog.querySelector('#patch-notes-status');
  const historyButton = dialog.querySelector('#patch-notes-history-button');
  const history = dialog.querySelector('#patch-notes-history');
  const key = 'astralfighter-patch-notes-read-v1';
  let notes = [], seen = '', loading = null, lastCheck = 0, historyOpen = false;
  try { seen = localStorage.getItem(key) || ''; } catch {}
  const node = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  function validated(raw) {
    if (!Array.isArray(raw) || !raw.length) throw Error('Liste de notes vide.');
    const ids = new Set();
    return raw.map(n => {
      if (!n || typeof n.id !== 'string' || !n.id.trim() || ids.has(n.id) ||
          typeof n.titre !== 'string' || !n.titre.trim() ||
          typeof n.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(n.date) ||
          !Number.isFinite(Date.parse(n.date)) ||
          (n.introduction !== undefined && typeof n.introduction !== 'string') ||
          !Array.isArray(n.sections) || n.sections.some(s => !s || typeof s.titre !== 'string' ||
            !Array.isArray(s.points) || s.points.some(p => typeof p !== 'string'))) throw Error('Note invalide.');
      ids.add(n.id);
      return { id: n.id, date: n.date, titre: n.titre, introduction: n.introduction || '',
        sections: n.sections.map(s => ({ titre: s.titre, points: [...s.points] })) };
    });
  }
  function indicator() {
    const unread = !!notes.length && notes[0].id !== seen;
    button.classList.toggle('has-unread', unread);
    button.querySelector('.patch-unread-dot').hidden = !unread;
    button.setAttribute('aria-label', unread ? 'Note de patch : nouvelle mise à jour à consulter' : 'Note de patch');
    button.title = unread ? 'Une nouvelle note de patch vous attend' : 'Consulter les notes de patch';
  }
  function markRead() {
    if (!notes.length || !dialog.open || document.hidden) return;
    seen = notes[0].id;
    try { localStorage.setItem(key, seen); } catch {}
    indicator();
  }
  function article(n, latest) {
    const el = node('article', undefined, 'patch-article');
    const meta = node('div', undefined, 'patch-meta');
    meta.append(node('span', latest ? 'DERNIÈRE MISE À JOUR' : 'ARCHIVES', 'patch-tag'));
    const date = node('time', new Intl.DateTimeFormat('fr-FR', {day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(n.date+'T12:00:00Z')));
    date.dateTime = n.date; meta.append(date); el.append(meta, node('h3', n.titre));
    if (n.introduction) el.append(node('p', n.introduction, 'patch-intro'));
    for (const s of n.sections) {
      const section = node('section'); section.append(node('h4', s.titre));
      const list = node('ul'); for (const p of s.points) list.append(node('li', p));
      section.append(list); el.append(section);
    }
    return el;
  }
  function render() {
    content.replaceChildren(); history.replaceChildren();
    if (notes.length) content.append(article(notes[0], true));
    historyButton.hidden = notes.length < 2;
    history.hidden = !historyOpen;
    historyButton.setAttribute('aria-expanded', String(historyOpen));
    historyButton.textContent = historyOpen ? 'Masquer les précédentes mises à jour' : 'Voir les précédentes mises à jour';
    if (historyOpen) for (const n of notes.slice(1)) {
      const detail = node('details', undefined, 'patch-archive');
      detail.append(node('summary', n.date.split('-').reverse().join('/')+' · '+n.titre), article(n, false));
      history.append(detail);
    }
  }
  function refresh() {
    if (loading) return loading;
    lastCheck = Date.now();
    loading = new Promise(resolve => {
      const script = document.createElement('script');
      let done = false;
      const finish = ok => {
        if (done) return; done = true; clearTimeout(timer); script.remove();
        if (ok) {
          try {
            const next = validated(window.ASTRAL_PATCH_NOTES);
            const changed = JSON.stringify(notes) !== JSON.stringify(next);
            notes = next; status.textContent = '';
            if (changed) { historyOpen = false; render(); }
            indicator(); if (dialog.open) markRead();
          } catch { ok = false; }
        }
        if (!ok) status.textContent = notes.length ? 'Impossible d’actualiser les annonces. Les dernières notes chargées restent disponibles.' : 'Les notes sont momentanément indisponibles. Fermez puis rouvrez ce carnet pour réessayer.';
        loading = null; resolve();
      };
      // Un nouveau paramètre évite de conserver une ancienne annonce dans le cache.
      // Le chargement par script fonctionne aussi avec JOUER.html, sans serveur.
      const url = new URL('notes-de-patch.js', document.baseURI);
      if (location.protocol !== 'file:') url.searchParams.set('actualisation', String(Date.now()));
      window.ASTRAL_PATCH_NOTES = undefined;
      script.src = url.href; script.async = true;
      script.onload = () => finish(true); script.onerror = () => finish(false);
      const timer = setTimeout(() => finish(false), 12000);
      document.head.append(script);
    });
    return loading;
  }
  button.addEventListener('click', () => {
    historyOpen = false; render();
    if (!notes.length) status.textContent = 'Chargement des nouvelles…';
    if (!dialog.open) dialog.showModal();
    markRead(); refresh();
  });
  dialog.querySelector('#patch-notes-close').addEventListener('click', () => dialog.close());
  historyButton.addEventListener('click', () => { historyOpen = !historyOpen; render(); });
  window.addEventListener('storage', e => { if (e.key === key) { seen = e.newValue || ''; indicator(); } });
  const check = () => { if (!document.hidden && Date.now() - lastCheck >= 60000) refresh(); };
  window.addEventListener('focus', check);
  document.addEventListener('visibilitychange', () => { check(); markRead(); });
  setInterval(() => { if (!document.hidden) refresh(); }, 300000);
  indicator(); refresh();
})();
