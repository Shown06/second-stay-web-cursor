import { bookingButtonsHTML } from '../components/booking.js';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '../config/site.js';
import { asset } from '../lib/asset-path.js';
import { paths } from '../lib/paths.js';

const sections = [
  {
    id: 'sauna',
    title: 'プライベートサウナ',
    desc: '完全プライベートのフィンランド式サウナ。アウフグース体験や外気浴エリアを完備。日常のストレスから解放される最高のサウナ体験をお楽しみください。',
    icon: '🔥',
    imgs: [
      '/assets/facilities/01_sauna/DSC07992-HDR.webp',
      '/assets/facilities/01_sauna/DSC07996.webp',
      '/assets/facilities/01_sauna/DSC08000-HDR.webp',
      '/assets/facilities/01_sauna/DSC08239.webp',
    ],
  },
  {
    id: 'living',
    title: 'リビングダイニング',
    desc: '広々とした開放感あふれるリビングダイニング。大型ソファや充実した家具で、ご家族・グループどなたでも快適にお過ごしいただけます。',
    icon: '🛋️',
    imgs: [
      '/assets/facilities/02_living/DSC07934-Edit.webp',
      '/assets/facilities/02_living/DSC07949.webp',
    ],
  },
  {
    id: 'theater',
    title: 'シアタールーム',
    desc: '大型スクリーンと高音質サウンドシステムを完備したプライベートシアター。映画鑑賞・スポーツ観戦・ゲームなど、あらゆるエンターテインメントを極上の環境で楽しめます。',
    icon: '🎬',
    imgs: [
      '/assets/facilities/07_theater/DSC07966.webp',
      '/assets/facilities/07_theater/DSC07981.webp',
    ],
  },
  {
    id: 'bedroom',
    title: 'ベッドルーム',
    desc: '上質な寝具を揃えた快適な寝室。旅の疲れをしっかり癒し、翌日も元気にお過ごしいただけるよう整えています。',
    icon: '🛏️',
    imgs: [
      '/assets/facilities/04_bedroom/DSC07751-HDR.webp',
      '/assets/facilities/04_bedroom/DSC07754.webp',
      '/assets/facilities/04_bedroom/DSC07759.webp',
    ],
  },
  {
    id: 'kitchen',
    title: 'キッチン',
    desc: '充実したキッチン設備で自炊も楽しめます。調理器具・食器類も完備しており、BBQや鍋パーティーなど多彩なシーンに対応。',
    icon: '🍳',
    imgs: [
      '/assets/facilities/05_kitchen/DSC08032-Edit.webp',
      '/assets/facilities/05_kitchen/DSC08037-Edit.webp',
    ],
  },
  {
    id: 'bathroom',
    title: 'バスルーム',
    desc: '高級感あるバスルーム。ゆったりとした湯船で、旅の疲れをじっくり癒してください。',
    icon: '🛁',
    imgs: [
      '/assets/facilities/03_bathroom/DSC07796.webp',
      '/assets/facilities/03_bathroom/DSC07799.webp',
    ],
  },
];

export function createFacilitiesPage() {
  const container = document.createElement('div');
  container.className = 'hospice-page page-container';

  container.innerHTML = `
    <section class="hospice-page-hero">
      <div class="container">
        <div class="hospice-page-hero-inner fade-up">
          <p class="stay-section-kicker">— FACILITIES —</p>
          <h1 class="hospice-page-title">施設・サービス</h1>
          <p class="hospice-page-subtitle">
            プライベートサウナ・シアタールーム・キッチンなど、<br>
            贅沢な滞在のための設備を完備しています。
          </p>
        </div>
      </div>
    </section>

    <section class="stay-facilities-detail section">
      <div class="container">
        ${sections
          .map(
            (s, i) => `
          <div class="stay-fd-block fade-up-scroll ${i % 2 === 1 ? 'stay-fd-reverse' : ''}">
            <div class="stay-fd-imgs">
              ${s.imgs
                .map(
                  (img, j) => `
                <div class="stay-fd-img${j === 0 ? ' stay-fd-img-main' : ''}">
                  <img src="${asset(img)}" alt="${s.title}" loading="lazy"/>
                </div>
              `,
                )
                .join('')}
            </div>
            <div class="stay-fd-text">
              <div class="stay-fd-icon">${s.icon}</div>
              <h2 class="stay-fd-title">${s.title}</h2>
              <p class="stay-fd-desc">${s.desc}</p>
            </div>
          </div>
        `,
          )
          .join('')}
      </div>
    </section>

    <section class="stay-cta section">
      <div class="container">
        <div class="stay-cta-inner fade-up-scroll">
          <p class="stay-section-kicker" style="color:rgba(255,255,255,.7);">— RESERVATION —</p>
          <h2 class="stay-cta-title">ご予約・お問い合わせ</h2>
          <p class="stay-cta-desc">
            ご予約は各予約サイトから。ご質問はお電話またはフォームでお気軽にどうぞ。
          </p>
          ${bookingButtonsHTML()}
          <div class="stay-cta-buttons" style="margin-top:28px;">
            <a href="tel:${SITE_PHONE_TEL}" class="btn stay-cta-btn-phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
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
