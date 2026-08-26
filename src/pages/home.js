import { asset } from '../lib/asset-path.js';
import { paths } from '../lib/paths.js';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '../config/site.js';

/* ヒーロー用スライド写真 */
const heroSlides = [
  { src: '/assets/facilities/01_sauna/DSC08239.webp',      alt: 'プライベートサウナ' },
  { src: '/assets/facilities/02_living/DSC07934-Edit.webp', alt: 'リビングダイニング' },
  { src: '/assets/facilities/07_theater/DSC07966.webp',     alt: 'シアタールーム' },
  { src: '/assets/facilities/04_bedroom/DSC07751-HDR.webp', alt: 'ベッドルーム' },
];

/* 施設カード */
const facilityCards = [
  {
    img: '/assets/facilities/01_sauna/DSC07992-HDR.webp',
    title: 'プライベートサウナ',
    desc: '貸切専用のフィンランド式サウナ。アウフグース体験や外気浴で日常を超えた感覚へ。',
    icon: '🔥',
  },
  {
    img: '/assets/facilities/02_living/DSC07949.webp',
    title: 'リビングダイニング',
    desc: '広々とした開放感あるリビング。大人数でも快適にお過ごしいただけます。',
    icon: '🛋️',
  },
  {
    img: '/assets/facilities/07_theater/DSC07966.webp',
    title: 'シアタールーム',
    desc: '大型スクリーンと高音質サウンドシステムを完備。映画鑑賞・ゲームを極上の環境で。',
    icon: '🎬',
  },
  {
    img: '/assets/facilities/04_bedroom/DSC07751-HDR.webp',
    title: 'ベッドルーム',
    desc: '上質な寝具を揃えた快適な寝室。ゆったりとした眠りをお約束します。',
    icon: '🛏️',
  },
  {
    img: '/assets/facilities/05_kitchen/DSC08032-Edit.webp',
    title: 'キッチン・ダイニング',
    desc: '充実した設備のキッチンで自炊も楽しめます。お食事はアレンジ自在。',
    icon: '🍳',
  },
  {
    img: '/assets/facilities/03_bathroom/DSC07796.webp',
    title: 'バスルーム',
    desc: '高級感あるバスルーム。旅の疲れをゆっくりと癒してください。',
    icon: '🛁',
  },
];

/* FAQ */
const faqs = [
  {
    q: 'チェックインとチェックアウトの時間は？',
    a: 'チェックインは 15:00〜、チェックアウトは 11:00 となります。アーリーチェックインやレイトチェックアウトについては別途ご相談ください。',
  },
  {
    q: '何名まで宿泊できますか？',
    a: '最大12名様まで対応可能です。グループ・ファミリー・合宿など幅広くご利用いただけます。',
  },
  {
    q: 'ペットの同伴はできますか？',
    a: '大変申し訳ございませんが、ペットのご同伴はお断りしております。あらかじめご了承ください。',
  },
  {
    q: '駐車場はありますか？',
    a: '専用駐車場をご用意しております。台数に限りがある場合がございますので、事前にお問い合わせください。',
  },
  {
    q: 'バーベキューや宴会はできますか？',
    a: '専用スペースにてバーベキューや宴会をお楽しみいただけます。器材の貸し出しについては事前にご相談ください。',
  },
  {
    q: 'キャンセルポリシーについて教えてください。',
    a: 'ご予約の7日前まではキャンセル料無料、3日前まで30%、前日50%、当日100%のキャンセル料を申し受けます。詳細はお問い合わせください。',
  },
];

export function createHomePage() {
  const container = document.createElement('div');
  container.className = 'stay-home';

  /* ---- HERO ---- */
  const heroSlideHTML = heroSlides
    .map((s, i) => `
      <div class="hero-slide${i === 0 ? ' active' : ''}"
           style="background-image:url(${asset(s.src)})"
           role="img" aria-label="${s.alt}"></div>
    `)
    .join('');

  container.innerHTML = `
    <!-- HERO -->
    <section class="stay-hero" id="top">
      <div class="stay-hero-slider">${heroSlideHTML}</div>
      <div class="stay-hero-overlay"></div>
      <div class="stay-hero-content">
        <p class="stay-hero-kicker fade-up">Premium Private Resort</p>
        <h1 class="stay-hero-title fade-up">
          贅沢なひとときを、<br>
          <span class="stay-hero-accent">あなたへ。</span>
        </h1>
        <p class="stay-hero-sub fade-up">
          プライベートサウナ・シアタールーム完備。<br>
          兵庫・伊丹の高級貸別荘で、特別な時間を。
        </p>
        <div class="stay-hero-actions fade-up">
          <a href="tel:${SITE_PHONE_TEL}" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.72 6.72l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            ${SITE_PHONE_DISPLAY}
          </a>
          <a href="${paths.facilities()}" class="btn btn-outline-light">施設を見る</a>
        </div>
      </div>
      <!-- スライドインジケーター -->
      <div class="stay-hero-indicators">
        ${heroSlides.map((_, i) => `<button class="hero-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="${i + 1}枚目"></button>`).join('')}
      </div>
    </section>

    <!-- CONCEPT -->
    <section class="stay-concept section" id="concept">
      <div class="container">
        <div class="stay-concept-inner">
          <div class="stay-concept-image fade-up-scroll">
            <img src="${asset('/assets/concept.jpg')}" alt="SECOND STAY コンセプト" loading="lazy"/>
          </div>
          <div class="stay-concept-text fade-up-scroll">
            <p class="stay-section-kicker">— CONCEPT —</p>
            <h2 class="stay-section-title">
              「第二の家」として、<br>
              心から寛げる場所へ。
            </h2>
            <p class="stay-concept-body">
              SECOND STAYは、日常から離れた「もうひとつの我が家」をコンセプトとした高級貸別荘です。
              プライベートサウナ、シアタールーム、充実したキッチン設備など、ご家族やグループが贅沢に過ごすための設備を完備。
            </p>
            <p class="stay-concept-body">
              特別な記念日、仲間との集まり、静かな休暇——どんな場面でも、忘れられない思い出をお届けします。
            </p>
            <a href="${paths.facilities()}" class="btn btn-primary" style="margin-top:28px;">施設詳細を見る →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FACILITIES -->
    <section class="stay-facilities section" id="facilities">
      <div class="container">
        <div class="stay-section-head fade-up-scroll">
          <p class="stay-section-kicker">— FACILITIES —</p>
          <h2 class="stay-section-title">充実した設備</h2>
          <p class="stay-section-desc">プライベート空間だからこそできる、特別な体験をご用意しています。</p>
        </div>
        <div class="stay-facilities-grid">
          ${facilityCards.map((c, i) => `
            <div class="stay-facility-card fade-up-scroll" style="transition-delay:${(i % 3) * 0.08}s;">
              <div class="stay-facility-img-wrap">
                <img src="${asset(c.img)}" alt="${c.title}" loading="lazy"/>
                <span class="stay-facility-icon">${c.icon}</span>
              </div>
              <div class="stay-facility-body">
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="stay-facilities-more fade-up-scroll">
          <a href="${paths.facilities()}" class="btn btn-outline">すべての施設を見る →</a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="stay-faq section" id="faq">
      <div class="container">
        <div class="stay-section-head fade-up-scroll">
          <p class="stay-section-kicker">— FAQ —</p>
          <h2 class="stay-section-title">よくあるご質問</h2>
          <p class="stay-section-desc">ご不明な点はお気軽にお問い合わせください。</p>
        </div>
        <div class="stay-faq-list">
          ${faqs.map((f, i) => `
            <details class="stay-faq-item fade-up-scroll" style="transition-delay:${i * 0.05}s;">
              <summary class="stay-faq-q">
                <span class="stay-faq-q-icon">Q</span>
                <span>${f.q}</span>
                <svg class="stay-faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </summary>
              <div class="stay-faq-a">
                <span class="stay-faq-a-icon">A</span>
                <p>${f.a}</p>
              </div>
            </details>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- NEWS/BLOG -->
    <section class="stay-news section" id="news">
      <div class="container">
        <div class="stay-section-head fade-up-scroll">
          <p class="stay-section-kicker">— NEWS —</p>
          <h2 class="stay-section-title">お知らせ・ブログ</h2>
        </div>
        <div class="stay-news-placeholder fade-up-scroll">
          <p>最新のお知らせはブログページをご覧ください。</p>
          <a href="${paths.blog()}" class="btn btn-primary" style="margin-top:16px;">ブログを見る →</a>
        </div>
      </div>
    </section>

    <!-- CTA / CONTACT -->
    <section class="stay-cta section" id="reserve">
      <div class="container">
        <div class="stay-cta-inner fade-up-scroll">
          <p class="stay-section-kicker" style="color:rgba(255,255,255,.7);">— RESERVATION —</p>
          <h2 class="stay-cta-title">ご予約・お問い合わせ</h2>
          <p class="stay-cta-desc">
            お電話またはフォームからお気軽にご連絡ください。<br>
            ご質問・ご要望もお気軽にどうぞ。
          </p>
          <div class="stay-cta-buttons">
            <a href="tel:${SITE_PHONE_TEL}" class="btn stay-cta-btn-phone">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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

  /* ヒーロースライダー */
  initHeroSlider(container);

  return container;
}

function initHeroSlider(container) {
  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('.hero-dot');
  let current = 0;
  let timer = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startAuto();
    });
  });

  startAuto();
}
