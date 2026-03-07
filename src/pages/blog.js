import { fetchPosts, fetchPostById } from '../lib/supabase.js';

// --- ダミーデータ（Supabase未接続時のフォールバック） ---
const DUMMY_POSTS = [
    {
        id: 'dummy-1',
        title: '【T2STAY ITAMI】グランドオープンのお知らせ',
        date: '2026-03-01',
        body: '兵庫県伊丹市に佇む一棟貸切のプレミアム宿泊施設「T2STAY ITAMI」が、ついにグランドオープンいたしました。\n\n100インチの大迫力シアターと本格フィンランド式サウナを完全プライベート空間でお楽しみいただける、他に類を見ないリトリート施設です。\n\nオープン記念として、3月末までのご予約で特別料金にてご宿泊いただけます。皆さまのご来訪を心よりお待ちしております。',
        image_url: '/assets/facilities/07_theater/DSC07966.webp',
        published: true,
    },
    {
        id: 'dummy-2',
        title: 'サウナ設備リニューアルのお知らせ',
        date: '2026-02-15',
        body: 'フィンランド・MISA社製の最新ストーブを導入し、サウナ設備を全面リニューアルいたしました。\n\nより本格的なロウリュ体験と、快適な温度管理を実現。チラー付き水風呂は常時15度にキープされ、最高の「ととのい」をお約束します。\n\nぜひ新しくなったサウナ空間をご体験ください。',
        image_url: '/assets/facilities/01_sauna/sauna-barrel-night.webp',
        published: true,
    },
    {
        id: 'dummy-3',
        title: 'GW特別プランのご案内',
        date: '2026-02-01',
        body: '2026年ゴールデンウィーク期間の特別宿泊プランをご用意いたしました。\n\n大切なご家族やご友人と、非日常のラグジュアリー空間で忘れられない思い出をお作りください。\n\n詳細・ご予約はAirbnbページよりお願いいたします。',
        image_url: '/assets/facilities/07_theater/Output_this_modern_kitchen_family_scene_in_maximum-1772364569022.webp',
        published: true,
    },
];

/**
 * ブログ一覧ページを生成
 */
export function createBlogListPage() {
    const page = document.createElement('div');
    page.className = 'blog-page home-page-container';

    page.innerHTML = `
    <section class="blog-hero">
      <div class="container-large">
        <a href="#top" class="blog-hero-back">← 戻る</a>
        <h2 class="display-title center fade-up" style="top: -80px;">NEWS</h2>
        <div class="blog-hero-content fade-up">
          <div class="section-label" style="justify-content: center;">
            <span class="section-label-num">NEWS</span>
            <span class="section-label-line"></span>
            <span class="section-label-text">お知らせ</span>
          </div>
          <h1 class="blog-page-title">お知らせ</h1>
          <p class="blog-page-subtitle">Second Stayの最新情報をお届けします</p>
        </div>
      </div>
    </section>
    <section class="blog-list-section">
      <div class="container-large">
        <div class="blog-grid" id="blog-grid">
          <div class="blog-loading">
            <div class="blog-loading-spinner"></div>
            <p>記事を読み込んでいます...</p>
          </div>
        </div>
      </div>
    </section>
  `;

    loadBlogList(page);
    return page;
}

async function loadBlogList(page) {
    const grid = page.querySelector('#blog-grid');
    let posts = await fetchPosts();
    if (!posts || posts.length === 0) posts = DUMMY_POSTS;

    grid.innerHTML = '';

    posts.forEach((post, i) => {
        const card = document.createElement('article');
        card.className = 'blog-card fade-up';
        card.style.animationDelay = `${i * 0.1}s`;

        const dateStr = formatDate(post.date);
        const excerpt = (post.body || '').replace(/\n/g, ' ').substring(0, 100) + '…';

        card.innerHTML = `
      <a href="#blog?id=${post.id}" class="blog-card-link">
        <div class="blog-card-image">
          ${post.image_url
                ? `<img src="${post.image_url}" alt="${post.title}" loading="lazy">`
                : `<div class="blog-card-noimage"><span>NO IMAGE</span></div>`
            }
        </div>
        <div class="blog-card-body">
          <time class="blog-card-date" datetime="${post.date}">${dateStr}</time>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${excerpt}</p>
          <span class="blog-card-more">READ MORE <span>→</span></span>
        </div>
      </a>
    `;

        grid.appendChild(card);
        // Trigger animation
        requestAnimationFrame(() => {
            setTimeout(() => card.classList.add('visible'), 60 + i * 80);
        });
    });
}

/**
 * ブログ詳細ページを生成
 */
export function createBlogDetailPage(postId) {
    const page = document.createElement('div');
    page.className = 'blog-page blog-detail-page home-page-container';

    page.innerHTML = `
    <section class="blog-detail-section">
      <div class="container-large">
        <div class="blog-detail-wrapper">
          <div class="blog-loading">
            <div class="blog-loading-spinner"></div>
            <p>記事を読み込んでいます...</p>
          </div>
        </div>
      </div>
    </section>
  `;

    loadBlogDetail(page, postId);
    return page;
}

async function loadBlogDetail(page, postId) {
    const wrapper = page.querySelector('.blog-detail-wrapper');

    let post = await fetchPostById(postId);
    // フォールバック: ダミーデータから検索
    if (!post) {
        post = DUMMY_POSTS.find(p => p.id === postId);
    }

    if (!post) {
        wrapper.innerHTML = `
      <div class="blog-not-found">
        <h2>記事が見つかりませんでした</h2>
        <p>お探しの記事は存在しないか、削除された可能性があります。</p>
        <a href="#blog" class="btn btn-outline">一覧に戻る</a>
      </div>
    `;
        return;
    }

    const dateStr = formatDate(post.date);
    // 本文の改行を <p> タグに変換
    const bodyHtml = (post.body || '')
        .split(/\n\n+/)
        .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('');

    wrapper.innerHTML = `
    <a href="#blog" class="blog-back-link fade-up">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      一覧に戻る
    </a>
    <article class="blog-article fade-up" style="animation-delay: 0.1s;">
      ${post.image_url ? `
        <div class="blog-article-hero">
          <img src="${post.image_url}" alt="${post.title}">
        </div>
      ` : ''}
      <div class="blog-article-content">
        <time class="blog-article-date" datetime="${post.date}">${dateStr}</time>
        <h1 class="blog-article-title">${post.title}</h1>
        <div class="blog-article-body">
          ${bodyHtml}
        </div>
      </div>
    </article>
    <div class="blog-article-footer fade-up" style="animation-delay: 0.2s;">
      <a href="#blog" class="btn btn-outline hover-magnetic">一覧に戻る</a>
    </div>
  `;

    // Trigger fade-in
    page.querySelectorAll('.fade-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 100 + i * 100);
    });
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
}
