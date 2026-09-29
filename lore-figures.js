/* Fiches des personnages du Lore. */
(() => {
  'use strict';
  const page = document.querySelector('body.lore-navigator-sheet');
  if (!page) return;
  const dialog = page.querySelector('#lore-profile-dialog');
  if (!dialog) return;
  const content = dialog.querySelector('.lore-profile-content');
  const closeButton = dialog.querySelector('.lore-profile-close');
  let trigger = null;

  page.querySelectorAll('[data-figure]').forEach(button => {
    button.addEventListener('click', () => {
      const template = document.getElementById(`lore-figure-${button.dataset.figure}`);
      if (!template || dialog.open) return;
      trigger = button;
      content.replaceChildren(template.content.cloneNode(true));
      dialog.showModal();
      page.classList.add('lore-profile-open');
      closeButton.focus({ preventScroll: true });
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  // Fermer sur le fond extérieur, jamais sur un clic dans la fiche.
  let pointerStartedOutside = false;
  const isOutside = event => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  };
  dialog.addEventListener('pointerdown', event => {
    pointerStartedOutside = event.target === dialog && isOutside(event);
  });
  dialog.addEventListener('click', event => {
    if (pointerStartedOutside && event.target === dialog && isOutside(event)) dialog.close();
    pointerStartedOutside = false;
  });
  // La touche Échap et le confinement du focus sont assurés par <dialog>.
  dialog.addEventListener('close', () => {
    page.classList.remove('lore-profile-open');
    if (trigger) trigger.focus({ preventScroll: true });
  });
})();
