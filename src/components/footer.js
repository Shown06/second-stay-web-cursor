import { paths } from '../lib/paths.js';
import { SITE_NAME, SITE_PHONE_DISPLAY, SITE_PHONE_TEL, SITE_ADDRESS, SITE_HOURS } from '../config/site.js';

export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">

          <!-- ブランド -->
          <div class="footer-col footer-brand">
            <a href="${paths.home()}" class="footer-logo">${SITE_NAME}</a>
            <p class="footer-tagline">贅沢なひとときを、あなたへ。</p>
            <p class="footer-mission">
              伊丹の地にたたずむプレミアム貸別荘。<br>
              非日常の寛ぎと贅沢なひとときをご提供します。
            </p>
          </div>

          <!-- ナビゲーション -->
          <div class="footer-col">
            <h4 class="footer-heading">ナビゲーション</h4>
            <ul class="footer-links">
              <li><a href="${paths.home()}">トップ</a></li>
              <li><a href="${paths.facilities()}">施設・サービス</a></li>
              <li><a href="${paths.blog()}">ブログ</a></li>
              <li><a href="${paths.company()}">会社概要</a></li>
              <li><a href="${paths.access()}">アクセス</a></li>
              <li><a href="${paths.contact()}">お問い合わせ</a></li>
            </ul>
          </div>

          <!-- 連絡先 -->
          <div class="footer-col">
            <h4 class="footer-heading">ご予約・お問い合わせ</h4>
            <ul class="footer-contact-list">
              <li class="footer-contact-item">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a href="tel:${SITE_PHONE_TEL}">${SITE_PHONE_DISPLAY}</a>
              </li>
              <li class="footer-contact-item">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 4l-10 8L2 4"/>
                </svg>
                <a href="${paths.contact()}">お問い合わせフォームへ</a>
              </li>
              <li class="footer-contact-item">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="11" r="3"/>
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span>${SITE_ADDRESS}</span>
              </li>
              <li class="footer-contact-item">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>${SITE_HOURS}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-inner">
          <div class="footer-legal">
            <a href="#" class="footer-legal-link">プライバシーポリシー</a>
            <span class="footer-legal-sep">|</span>
            <a href="#" class="footer-legal-link">特定商取引法に基づく表記</a>
          </div>
          <p class="copyright">&copy; ${new Date().getFullYear()} ${SITE_NAME}. All Rights Reserved.</p>
        </div>
      </div>
    </div>

    <button class="back-to-top" id="backToTop" aria-label="ページトップへ戻る">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
           stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  `;

  return footer;
}
