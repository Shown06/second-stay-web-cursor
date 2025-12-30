import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/animations.css';
import './styles/home.css';
import './styles/business.css';

import { createHeader } from './components/header.js';
import { createFooter } from './components/footer.js';
import { createHomePage } from './pages/home.js';
import { createCompanyPage } from './pages/company.js';
import { createBusinessPage } from './pages/business.js';
import { createFacilitiesPage } from './pages/facilities.js';
import { createNewsPage, createContactPage } from './pages/others.js';
import { initParallax } from './effects/parallax.js';
import { initTypewriter } from './effects/typewriter.js';
import { initCursor } from './components/cursor.js';
import { initMagneticButtons } from './components/magnetic.js';
import { openModal } from './components/modal.js';

const app = document.querySelector('#app');

// Initialize Layout
const header = createHeader();
const main = document.createElement('main');
const footer = createFooter();

app.appendChild(header);
app.appendChild(main);
app.appendChild(footer);

// Router Logic
const routes = {
  '': createHomePage,
  '#top': createHomePage,
  '#company': createCompanyPage,
  '#business': createBusinessPage,
  '#facilities': createFacilitiesPage,
  '#news': createNewsPage,
  '#contact': createContactPage
};

function handleRoute() {
  const hash = window.location.hash || '';
  const pageCreator = routes[hash] || createHomePage;

  // Transition Effect
  main.style.opacity = '0';

  // Header Visibility Logic
  // Allow header to be transparent at the top for all pages (Hero sections)
  const header = document.querySelector('.header');
  header.classList.remove('solid');
  header.classList.remove('scrolled'); // Reset scroll state

  setTimeout(() => {
    main.innerHTML = '';
    main.appendChild(pageCreator());
    window.scrollTo(0, 0);

    // Re-initialize animations
    initAnimations();

    // Fade in
    main.style.opacity = '1';
  }, 300);
}

// Animation Observer
function initAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in, .pulse').forEach(el => {
      observer.observe(el);
    });
  }, 100); // Slight delay to ensure DOM is ready
}

// Event Listeners
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
  handleRoute();

  initParallax();
  initTypewriter();
  initCursor();
  initMagneticButtons();

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
