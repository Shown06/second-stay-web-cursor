import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/animations.css';
import './styles/home.css';
import './styles/business.css';
import './styles/facilities.css';
import './styles/blog.css';

import { createHeader } from './components/header.js';
import { createFooter } from './components/footer.js';
import { createHomePage } from './pages/home.js';
import { createCompanyPage } from './pages/company.js';
import { createBusinessPage } from './pages/business.js';
import { createFacilitiesPage } from './pages/facilities.js';
import { createBlogListPage, createBlogDetailPage } from './pages/blog.js';
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
let currentView = null; // 'home' | 'blog-list' | 'blog-detail'

function applyHeroLazyBackgrounds() {
  main.querySelectorAll('.hero-slide[data-bg]').forEach((el) => {
    el.style.backgroundImage = `url(${el.getAttribute('data-bg')})`;
    el.removeAttribute('data-bg');
  });
}

let homePage = null; // Cache the home page DOM

function showHomePage() {
  if (currentView === 'home') return;
  main.innerHTML = '';

  if (!homePage) {
    homePage = createHomePage();
  }
  main.appendChild(homePage);

  // 表示を先に出し、重い初期化はアイドル時に実行
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
  currentView = 'home';
}

function showBlogList() {
  main.innerHTML = '';
  main.appendChild(createBlogListPage());
  main.style.opacity = '1';
  window.scrollTo({ top: 0 });

  const headerEl = document.querySelector('.header');
  headerEl.classList.add('solid');

  currentView = 'blog-list';
}

function showBlogDetail(postId) {
  main.innerHTML = '';
  main.appendChild(createBlogDetailPage(postId));
  main.style.opacity = '1';
  window.scrollTo({ top: 0 });

  const headerEl = document.querySelector('.header');
  headerEl.classList.add('solid');

  currentView = 'blog-detail';
}

function handleRoute() {
  const hash = window.location.hash || '#top';
  const headerEl = document.querySelector('.header');

  // Blog routing
  if (hash === '#blog') {
    showBlogList();
    return;
  }

  if (hash.startsWith('#blog?')) {
    const params = new URLSearchParams(hash.replace('#blog?', ''));
    const postId = params.get('id');
    if (postId) {
      showBlogDetail(postId);
      return;
    }
    showBlogList();
    return;
  }

  // Home page — show if not already showing
  if (currentView !== 'home') {
    headerEl.classList.remove('solid');
    showHomePage();
  }

  // hash が #top または初回読み込みなら最上部に固定
  if (hash === '#top' || hash === '') {
    window.scrollTo(0, 0);
    return;
  }

  // Scroll to section
  setTimeout(() => {
    const target = document.querySelector(hash);
    headerEl.classList.remove('solid');

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, currentView === 'home' ? 100 : 300);
}

// Event Listeners
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  initGlobalAnimations();
  handleRoute();

  const loading = document.getElementById('loading');
  if (loading) {
    setTimeout(() => {
      window.scrollTo(0, 0);
      loading.style.opacity = '0';
      setTimeout(() => {
        loading.remove();
        window.scrollTo(0, 0);
      }, 1000);
    }, 2000);
  }

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });
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
