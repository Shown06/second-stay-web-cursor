import { SITE_INSTAGRAM, SITE_INSTAGRAM_ID } from '../config/site.js';
import { paths } from '../lib/paths.js';

export function createActivitiesPage() {
  const container = document.createElement('div');
  container.className = 'hospice-page page-container';

  container.innerHTML = `
    <!-- ページヘッダー -->
    <section class="hospice-page-hero">
      <div class="container">
        <div class="hospice-page-hero-inner fade-up">
          <p class="hospice-about-label" style="margin-bottom:16px;">
            <span class="hospice-leaf-icon" aria-hidden="true">☀️</span>
            <span>活動・お知らせ</span>
          </p>
          <h1 class="hospice-page-title">活動の様子</h1>
          <p class="hospice-page-subtitle">
            伊丹こどもホスピスの活動はInstagramで発信しています。<br>
            ぜひフォローしてください。
          </p>
        </div>
      </div>
    </section>

    <!-- Instagram誘導 -->
    <section class="hospice-activities-main section">
      <div class="container">
        <div class="hospice-ig-block fade-up-scroll">
          <div class="hospice-ig-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <h2 class="hospice-ig-title">Instagram で最新情報を発信中</h2>
          <p class="hospice-ig-id">${SITE_INSTAGRAM_ID}</p>
          <p class="hospice-ig-desc">
            活動の様子・イベント情報・お知らせを随時投稿しています。<br>
            ぜひフォローして、最新情報をご覧ください。
          </p>
          <a href="${SITE_INSTAGRAM}" target="_blank" rel="noopener noreferrer"
             class="btn btn-primary hospice-ig-btn">
            Instagramを見る →
          </a>
        </div>

        <!-- お知らせ欄（今後追加） -->
        <div class="hospice-news-block fade-up-scroll">
          <h2 class="hospice-news-title">
            <span class="hospice-leaf-icon" aria-hidden="true">🌱</span>
            お知らせ
          </h2>
          <div class="hospice-news-empty">
            <p>現在、掲載できるお知らせはありません。</p>
            <p>Instagramで最新情報を発信しています。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="hospice-cta section">
      <div class="container">
        <div class="hospice-cta-inner fade-up-scroll">
          <h2 class="hospice-cta-title">活動に参加しませんか</h2>
          <p class="hospice-cta-desc">
            ご支援・ボランティアのご相談など、<br>お気軽にお問い合わせください。
          </p>
          <div class="hospice-cta-buttons">
            <a href="${paths.contact()}" class="btn btn-primary">お問い合わせ</a>
            <a href="${paths.about()}" class="btn btn-outline">こどもホスピスとは</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return container;
}
