import { paths } from '../lib/paths.js';
import { SITE_NAME, SITE_PHONE_DISPLAY, SITE_PHONE_TEL, SITE_ADDRESS } from '../config/site.js';

export function createCompanyPage() {
  const container = document.createElement('div');
  container.className = 'hospice-page page-container';

  container.innerHTML = `
    <section class="hospice-page-hero">
      <div class="container">
        <div class="hospice-page-hero-inner fade-up">
          <p class="stay-section-kicker">— COMPANY —</p>
          <h1 class="hospice-page-title">会社概要</h1>
        </div>
      </div>
    </section>

    <section class="stay-company-main section">
      <div class="container">
        <div class="hospice-overview-table fade-up-scroll">
          <table class="hospice-table">
            <tbody>
              <tr>
                <th>施設名</th>
                <td>${SITE_NAME}</td>
              </tr>
              <tr>
                <th>所在地</th>
                <td>${SITE_ADDRESS}</td>
              </tr>
              <tr>
                <th>電話番号</th>
                <td><a href="tel:${SITE_PHONE_TEL}" class="hospice-table-link">${SITE_PHONE_DISPLAY}</a></td>
              </tr>
              <tr>
                <th>チェックイン</th>
                <td>15:00〜</td>
              </tr>
              <tr>
                <th>チェックアウト</th>
                <td>〜11:00</td>
              </tr>
              <tr>
                <th>駐車場</th>
                <td>専用駐車場あり（詳細はお問い合わせください）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="stay-cta section">
      <div class="container">
        <div class="stay-cta-inner fade-up-scroll">
          <p class="stay-section-kicker" style="color:rgba(255,255,255,.7);">— RESERVATION —</p>
          <h2 class="stay-cta-title">ご予約・お問い合わせ</h2>
          <div class="stay-cta-buttons">
            <a href="tel:${SITE_PHONE_TEL}" class="btn stay-cta-btn-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              ${SITE_PHONE_DISPLAY}
            </a>
            <a href="${paths.contact()}" class="btn stay-cta-btn-form">フォームで問い合わせる</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return container;
}
