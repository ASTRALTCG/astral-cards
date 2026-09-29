/* Interactions limitées à la fiche pilote de l’Épine. */
(() => {
  'use strict';
  const page = document.querySelector('body.lore-epine-pilot');
  if (!page) return;
  const dialog = page.querySelector('#epine-character-dialog');
  if (!dialog) return;
  const content = dialog.querySelector('.epine-dialog-content');
  const closeButton = dialog.querySelector('.epine-dialog-close');
  let trigger = null;

  page.querySelectorAll('[data-character]').forEach(button => {
    button.addEventListener('click', () => {
      const template = document.getElementById(`epine-bio-${button.dataset.character}`);
      if (!template || dialog.open) return;
      trigger = button;
      content.replaceChildren(template.content.cloneNode(true));
      dialog.showModal();
      page.classList.add('epine-dialog-open');
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
    page.classList.remove('epine-dialog-open');
    if (trigger) trigger.focus({ preventScroll: true });
  });
})();
