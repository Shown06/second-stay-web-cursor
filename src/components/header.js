import { paths } from '../lib/paths.js';
import { SITE_NAME, SITE_PHONE_DISPLAY, SITE_PHONE_TEL, SITE_HOURS } from '../config/site.js';

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  header.innerHTML = `
    <!-- 電話番号バー -->
    <div class="header-phone-row">
      <div class="container header-phone-inner">
        <a href="tel:${SITE_PHONE_TEL}" class="header-phone-link">
          <svg class="header-phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <span class="header-phone-num">${SITE_PHONE_DISPLAY}</span>
        </a>
        <span class="header-phone-hours">${SITE_HOURS}</span>
      </div>
    </div>

    <!-- メインヘッダー -->
    <div class="container header-container">
      <a href="${paths.home()}" class="logo" aria-label="${SITE_NAME} トップへ">
        ${SITE_NAME}
      </a>
      <button class="menu-toggle" aria-label="メニューを開く">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <nav class="nav-menu" aria-label="メインナビゲーション">
        <button class="menu-close" aria-label="メニューを閉じる">
          <span class="line"></span>
          <span class="line"></span>
        </button>
        <a href="${paths.home()}" class="nav-link">トップ</a>
        <a href="${paths.facilities()}" class="nav-link">施設・サービス</a>
        <a href="${paths.blog()}" class="nav-link">ブログ</a>
        <a href="${paths.company()}" class="nav-link">会社概要</a>
        <a href="${paths.access()}" class="nav-link">アクセス</a>
        <a href="${paths.contact()}" class="nav-link nav-link-cta">お問い合わせ</a>
      </nav>
    </div>
  `;

  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  header.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = `${height > 0 ? (winScroll / height) * 100 : 0}%`;
  }, { passive: true });

  const toggle = header.querySelector('.menu-toggle');
  const nav = header.querySelector('.nav-menu');

  toggle.addEventListener('click', () => {
    nav.classList.add('active');
    toggle.style.display = 'none';
  });

  header.querySelector('.menu-close').addEventListener('click', () => {
    nav.classList.remove('active');
    toggle.style.display = '';
  });

  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.style.display = '';
    });
  });

  return header;
}
