export function createModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <div class="modal-body"></div>
    </div>
  `;

  const closeBtn = overlay.querySelector('.modal-close');
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.body.appendChild(overlay);
  return overlay;
}

let modalOverlay = null;

export function openModal(content) {
  if (!modalOverlay) {
    modalOverlay = createModal();
  }

  const body = modalOverlay.querySelector('.modal-body');
  body.innerHTML = content;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

export function closeModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
