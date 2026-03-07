import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/animations.css';
import './styles/home.css';
import './styles/business.css';
import './styles/facilities.css';

import { createHeader } from './components/header.js';
import { createFooter } from './components/footer.js';
import { createHomePage } from './pages/home.js';
import { createCompanyPage } from './pages/company.js';
import { createBusinessPage } from './pages/business.js';
import { createFacilitiesPage } from './pages/facilities.js';
import { createNewsPage, createContactPage } from './pages/others.js';
import { initTypewriter } from './effects/typewriter.js';
import { initCursor } from './components/cursor.js';
import { initMagneticButtons } from './components/magnetic.js';
import { openModal } from './components/modal.js';
import { initGlobalAnimations, initPageAnimations } from './effects/gsap-animations.js';

const app = document.querySelector('#app');

// Initialize Layout
const header = createHeader();
const main = document.createElement('main');
const footer = createFooter();

app.appendChild(header);
app.appendChild(main);
app.appendChild(footer);

// Single Page Application Logic
let isInitialized = false;

function applyHeroLazyBackgrounds() {
  main.querySelectorAll('.hero-slide[data-bg]').forEach((el) => {
    el.style.backgroundImage = `url(${el.getAttribute('data-bg')})`;
    el.removeAttribute('data-bg');
  });
}

function initApp() {
  if (!isInitialized) {
    main.innerHTML = '';
    main.appendChild(createHomePage());

    // 表示を先に出し、重い初期化はアイドル時に実行（体感を軽くする）
    const runAfterIdle = () => {
      applyHeroLazyBackgrounds();
      initPageAnimations();
      initTypewriter();
      initCursor();
      initMagneticButtons();
    };
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(runAfterIdle, { timeout: 2000 });
    } else {
      setTimeout(runAfterIdle, 100);
    }

    main.style.opacity = '1';
    isInitialized = true;
  }
}

function scrollToSection() {
  const hash = window.location.hash || '#top';
  const target = document.querySelector(hash);

  // Header Visibility Logic Reset
  const header = document.querySelector('.header');
  header.classList.remove('solid');
  header.classList.remove('scrolled');

  if (target) {
    // Smooth scroll to the target section
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Event Listeners
window.addEventListener('hashchange', scrollToSection);
window.addEventListener('load', () => {
  // Initialize Lenis global smooth scroll
  initGlobalAnimations();

  // Render initial page
  initApp();

  // Scroll if hash exists
  setTimeout(scrollToSection, 500);

  // Remove Loading Screen
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.opacity = '0';
    setTimeout(() => loading.remove(), 500);
  }
});

// Global Modal Delegation
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-modal-trigger]')) {
    e.preventDefault();
    const content = e.target.dataset.modalContent || '<h2>Detail Info</h2><p>More information coming soon...</p>';
    openModal(content);
  }
});

// Global Transition Style
main.style.transition = 'opacity 0.3s ease';
