import '../styles/variables.css';
import '../styles/global.css';
import '../styles/layout.css';
import '../styles/animations.css';
import '../styles/home.css';
import '../styles/blog.css';
import '../styles/subpage.css';

import { createHeader } from '../components/header.js';
import { createFooter } from '../components/footer.js';
import { createHomePage } from '../pages/home.js';
import { createFacilitiesPage } from '../pages/facilities.js';
import { createBlogListPage, createBlogDetailPage } from '../pages/blog.js';
import { createCompanyPage } from '../pages/company.js';
import { createContactPage, createAccessPage } from '../pages/others.js';
import { initPageAnimations } from '../effects/gsap-animations.js';
import { paths } from '../lib/paths.js';

/**
 * @param {{ page: string; blogPostId?: string | null }} options
 */
export function boot(options) {
  const { page, blogPostId } = options;
  const app = document.querySelector('#app');
  if (!app) return;

  const header = createHeader();
  const main = document.createElement('main');
  const footer = createFooter();

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);

  const isHome = page === 'home';

  function setSubpageHeader() {
    const headerEl = document.querySelector('.header');
    if (headerEl) headerEl.classList.add('solid');
  }

  function initScrollAnimations() {
    const els = main.querySelectorAll('.fade-up-scroll');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  function initHeroFadeUp() {
    const els = main.querySelectorAll('.fade-up');
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 300 + i * 130);
    });
  }

  function revealPage() {
    initHeroFadeUp();
    setTimeout(initScrollAnimations, 100);
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => initPageAnimations(), { timeout: 1500 });
    }
  }

  function mountPage(pageEl, scrollTop = true) {
    main.innerHTML = '';
    main.appendChild(pageEl);
    if (scrollTop) window.scrollTo(0, 0);
    revealPage();
  }

  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    switch (page) {
      case 'home':
        mountPage(createHomePage(), false);
        break;
      case 'facilities':
        setSubpageHeader();
        mountPage(createFacilitiesPage());
        break;
      case 'blog-list':
        setSubpageHeader();
        mountPage(createBlogListPage());
        break;
      case 'blog-detail':
        setSubpageHeader();
        mountPage(createBlogDetailPage(blogPostId || ''));
        break;
      case 'company':
        setSubpageHeader();
        mountPage(createCompanyPage());
        break;
      case 'contact':
        setSubpageHeader();
        mountPage(createContactPage());
        break;
      case 'access':
        setSubpageHeader();
        mountPage(createAccessPage());
        break;
      default:
        mountPage(createHomePage(), false);
    }

    /* ローディング非表示 */
    const loading = document.getElementById('loading');
    if (loading && isHome) {
      setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 800);
      }, 1600);
    } else if (loading) {
      loading.remove();
    }

    /* ページトップボタン */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
      );
      window.addEventListener(
        'scroll',
        () => backToTop.classList.toggle('visible', window.scrollY > 300),
        { passive: true }
      );
    }
  });
}
