import { bookingButtonsHTML } from '../components/booking.js';
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from '../config/site.js';
import { asset } from '../lib/asset-path.js';
import { fetchPosts } from '../lib/cms.js';
import { paths } from '../lib/paths.js';

/* ヒーロー用スライド写真（実際の空間で過ごすシーン） */
const heroSlides = [
  {
    src: '/assets/facilities/07_theater/Output_this_modern_kitchen_party_scene_in_maximum_-1772364548901.webp',
    alt: '仲間と過ごすキッチンダイニング',
  },
  {
    src: '/assets/facilities/01_sauna/Output_this_nighttime_rooftop_terrace_scene_in_max-1772364517088.webp',
    alt: '夜のルーフトップとプライベートサウナ',
  },
  {
    src: '/assets/facilities/07_theater/Output_this_modern_kitchen_family_scene_in_maximum-1772364569022.webp',
    alt: '家族で楽しむキッチン',
  },
  {
    src: '/assets/facilities/01_sauna/Output_this_sauna_interior_scene_in_maximum_4K_qua-1772364528959.webp',
    alt: 'プライベートサウナでととのう',
  },
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
    .map(
      (s, i) => `
      <div class="hero-slide${i === 0 ? ' active' : ''}"
           style="background-image:url(${asset(s.src)})"
           role="img" aria-label="${s.alt}"></div>
    `,
    )
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
          <a href="#reserve" class="btn btn-primary" data-scroll="reserve">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ご予約はこちら
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
            <img src="${asset('/assets/facilities/07_theater/Output_this_home_theater_scene_in_maximum_4K_quali-1772364577028.webp')}" alt="SECOND STAY シアタールームで過ごす家族" loading="lazy"/>
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
          ${facilityCards
            .map(
              (c, i) => `
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
          `,
            )
            .join('')}
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
          ${faqs
            .map(
              (f, i) => `
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
          `,
            )
            .join('')}
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
        <div class="stay-news-grid" id="home-news-grid">
          <div class="stay-news-loading">読み込み中...</div>
        </div>
        <div class="stay-news-more fade-up-scroll">
          <a href="${paths.blog()}" class="btn btn-primary">全ブログを見る →</a>
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
            ご予約は各予約サイトから。ご質問・ご要望はお電話またはフォームでお気軽にどうぞ。
          </p>
          ${bookingButtonsHTML()}
          <div class="stay-cta-buttons" style="margin-top:28px;">
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

  /* ヘッダー内アンカー: ご予約はこちら → #reserve へスムーズスクロール */
  container.querySelectorAll('[data-scroll]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = document.getElementById(el.dataset.scroll);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* お知らせ・ブログ（最新3件をトップに表示） */
  loadHomeNews(container);

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

/* お知らせ・ブログ: 最新記事を3カラムで表示（先頭に New バッジ） */
async function loadHomeNews(container) {
  const grid = container.querySelector('#home-news-grid');
  if (!grid) return;

  const posts = await fetchPosts();

  if (!posts || posts.length === 0) {
    grid.innerHTML = '<p class="stay-news-empty">現在お知らせはありません。</p>';
    return;
  }

  const top = posts.slice(0, 3);
  grid.innerHTML = top
    .map((post, i) => {
      const excerpt = `${(post.body || '').replace(/\n/g, ' ').slice(0, 64)}…`;
      const img = post.image_url
        ? `<img src="${post.image_url}" alt="${escapeAttrHome(post.title)}" loading="lazy">`
        : '<div class="stay-news-noimg"><span>NO IMAGE</span></div>';
      return `
      <a href="${paths.blogPost(post.id)}" class="stay-news-card fade-up-scroll">
        <div class="stay-news-card-img">
          ${i === 0 ? '<span class="stay-news-new">New</span>' : ''}
          ${img}
        </div>
        <div class="stay-news-card-body">
          <time class="stay-news-card-date">${formatNewsDate(post.date)}</time>
          <h3 class="stay-news-card-title">${escapeHtmlHome(post.title)}</h3>
          <p class="stay-news-card-excerpt">${escapeHtmlHome(excerpt)}</p>
        </div>
      </a>`;
    })
    .join('');

  // 非同期で後から差し込むため、スクロールアニメは手動で可視化
  grid.querySelectorAll('.fade-up-scroll').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 60 + i * 90);
  });
}

function formatNewsDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function escapeHtmlHome(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function escapeAttrHome(str) {
  return (str || '').replace(/"/g, '&quot;');
}
