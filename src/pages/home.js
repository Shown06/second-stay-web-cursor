import { fetchPosts } from '../lib/supabase.js';
import { asset } from '../lib/asset-path.js';

export function createHomePage() {
  const container = document.createElement('div');
  container.className = 'home-page-container';

  // Hero Section with Background Slider
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.id = 'top';
  hero.innerHTML = `
    <div class="hero-slider">
      <div class="hero-slide" style="background-image: url('${asset('/assets/facilities/01_sauna/Output_this_sauna_interior_scene_in_maximum_4K_qua-1772364528959.webp')}');"></div>
      <div class="hero-slide" data-bg="${asset('/assets/facilities/01_sauna/sauna-barrel-night.webp')}"></div>
      <div class="hero-slide" data-bg="${asset('/assets/facilities/07_theater/Output_this_home_theater_scene_in_maximum_4K_quali-1772364577028.webp')}"></div>
      <div class="hero-slide" data-bg="${asset('/assets/facilities/07_theater/Output_this_modern_kitchen_family_scene_in_maximum-1772364569022.webp')}"></div>
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content container float">
      <h1 class="hero-title fade-up">兵庫で体験する<br>非日常の贅沢</h1>
      <p class="hero-subtitle fade-up" style="animation-delay: 0.3s;">記憶に残る、プレミアムな宿泊体験を。</p>
      <a href="#facilities" class="btn btn-primary fade-up" style="animation-delay: 0.6s;">施設を見る</a>
    </div>
    <div class="scroll-indicator fade-up" style="animation-delay: 1s;">
      <span>Scroll</span>
      <div class="line"></div>
    </div>
  `;

  // ----- 1. CONCEPT ----- //
  const concept = document.createElement('section');
  concept.className = 'section concept-art';
  concept.id = 'concept';
  concept.innerHTML = `
    <div class="concept-wave-top">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,120 L0,60 C360,40 1080,40 1440,60 L1440,120 Z" fill="#0f1219"/>
        <path d="M0,60 C360,40 1080,40 1440,60" fill="none" stroke="#D4AF37" stroke-opacity="0.03" stroke-width="12"/>
        <path d="M0,60 C360,40 1080,40 1440,60" fill="none" stroke="#D4AF37" stroke-opacity="0.08" stroke-width="4"/>
        <path d="M0,60 C360,40 1080,40 1440,60" fill="none" stroke="#D4AF37" stroke-opacity="0.2" stroke-width="1.5"/>
      </svg>
    </div>
    <div class="concept-bg">
      <div class="container-large relative">
        <h2 class="display-title fade-up-scroll">CONCEPT</h2>
        <div class="concept-content">
          <div class="section-label fade-up-scroll">
            <span class="section-label-num">01</span>
            <span class="section-label-line"></span>
            <span class="section-label-text">CONCEPT</span>
          </div>
          <h3 class="jp-title fade-up-scroll">「滞在」を再定義する</h3>
          <div class="title-accent fade-up-scroll"></div>
          <p class="fade-up-scroll">Second Stay（セカンドステイ）が提供するのは、単なる「宿泊」ではありません。それは、日常の喧騒から完全に隔絶された、五感を満たすための究極のプライベート・サンクチュアリです。</p>
          <p class="fade-up-scroll">私たちは「別荘を持つ以上の豊かさ」をテーマに、圧倒的な設備と洗練された空間デザインを融合。足を踏み入れた瞬間に始まる、誰にも邪魔されない極上の時間が、あなたの人生に新しいコントラストを描き出します。</p>
        </div>
      </div>
    </div>
  `;

  // ----- NEWS (お知らせ) ----- //
  const news = document.createElement('section');
  news.className = 'section news-art';
  news.id = 'news';
  news.innerHTML = `
    <div class="container-large relative">
      <h2 class="display-title center fade-up-scroll" style="top: -100px;">NEWS</h2>
      <div class="text-center fade-up-scroll" style="margin-bottom: 40px;">
        <h3 class="jp-title" style="font-size: 2rem; color: #fff; letter-spacing: 0.1em;">お知らせ</h3>
        <p style="color: rgba(255,255,255,0.5); margin-top: 20px;">Second Stayの最新情報をお届けします。</p>
      </div>
      <div class="news-grid" id="home-news-grid">
        <div class="blog-loading" style="grid-column: 1 / -1;">
          <div class="blog-loading-spinner"></div>
        </div>
      </div>
      <div class="news-more-wrap fade-up-scroll">
        <a href="#blog" class="btn btn-outline hover-magnetic">もっと見る →</a>
      </div>
    </div>
  `;

  const DUMMY = [
    { id: 'dummy-1', title: '【T2STAY ITAMI】グランドオープンのお知らせ', date: '2026-03-01' },
    { id: 'dummy-2', title: 'サウナ設備リニューアルのお知らせ', date: '2026-02-15' },
    { id: 'dummy-3', title: 'GW特別プランのご案内', date: '2026-02-01' },
  ];

  async function renderNewsGrid() {
    const grid = news.querySelector('#home-news-grid');
    if (!grid) return;
    grid.innerHTML = '<div class="blog-loading" style="grid-column: 1 / -1;"><div class="blog-loading-spinner"></div></div>';
    let posts = await fetchPosts(3);
    if (!posts || posts.length === 0) posts = DUMMY;

    grid.innerHTML = '';
    posts.forEach((post, i) => {
      const d = new Date(post.date);
      const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
      const card = document.createElement('a');
      card.href = `#blog?id=${post.id}`;
      card.className = 'news-card fade-up-scroll';
      card.style.transitionDelay = `${i * 0.15}s`;
      card.innerHTML = `
        <span class="news-card-date">${dateStr}</span>
        <h4 class="news-card-title">${post.title}</h4>
      `;
      grid.appendChild(card);
    });
  }

  renderNewsGrid();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') renderNewsGrid();
  });

  // ----- 2. BUSINESS ----- //
  const business = document.createElement('section');
  business.className = 'section business-art';
  business.id = 'business';
  business.innerHTML = `
    <div class="container-large relative">
      <h2 class="display-title right fade-up-scroll">BUSINESS</h2>
      
      <div class="business-header text-center fade-up-scroll">
        <h3 class="jp-title mb-md" style="font-size: 2rem; color: var(--gold-primary); letter-spacing: 0.1em;">感動をデザインする3つの領域</h3>
        <p style="color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto; line-height: 2;">空間、体験、地域社会を結びつけ、次世代のラグジュアリーを創造する3つの事業を展開しています。</p>
      </div>

      <div class="business-cards mt-xl">
        <div class="business-card fade-up-scroll">
          <div class="b-number">01</div>
          <h4>Luxury Accommodation<br><span>高級宿泊施設 企画・運営</span></h4>
          <p>プライベートヴィラやラグジュアリーホテルの企画・運営。五感を刺激する非日常の滞在体験を創造します。</p>
        </div>
        
        <div class="business-card fade-up-scroll" style="transition-delay: 0.2s;">
          <div class="b-number">02</div>
          <h4>Space Produce<br><span>空間プロデュース・設計</span></h4>
          <p>本格サウナ、シアタールーム、ハイエンド家具のリビングなど、付加価値の高い空間の設計・プロデュースと革新的リノベーション。</p>
        </div>

        <div class="business-card fade-up-scroll" style="transition-delay: 0.4s;">
          <div class="b-number">03</div>
          <h4>Resort Development<br><span>リゾート開発・地方創生</span></h4>
          <p>土地の歴史・自然・文化を活かしたリゾート開発。地域と共生する持続可能なツーリズムを推進します。</p>
        </div>
      </div>
    </div>
  `;

  // ----- 3. FACILITIES ----- //
  const facilities = document.createElement('section');
  facilities.className = 'section facilities-art';
  facilities.id = 'facilities';
  facilities.innerHTML = `
    <div class="container-large relative">
      <h2 class="display-title center fade-up-scroll">FACILITIES</h2>
      
      <div class="section-desc text-center fade-up-scroll mt-md mb-xl">
        <h3 class="jp-title" style="font-size: 2rem; color: #fff; letter-spacing: 0.1em;">非日常を彩る、唯一無二の空間</h3>
        <p style="color: rgba(255,255,255,0.6); margin-top: 20px;">現在展開中のフラッグシップ施設と、各施設の持つ圧倒的な魅力をご紹介します。</p>
      </div>
      
      <div class="art-list">
        <div class="art-card fade-up-scroll">
          <div class="art-card-image image-hover-zoom">
             <div class="image-inner parallax-img" style="background-image: url('${asset('/assets/facilities/07_theater/DSC07966.webp')}');"></div>
          </div>
          <div class="art-card-info">
            <div class="art-card-tags">
              <span>FLAGSHIP</span><span>SAUNA</span><span>THEATER</span>
            </div>
            <h3>TOTONOU THEATER<br>T2STAY ITAMI</h3>
            <p class="desc">1日1組限定。100インチの大迫力シアターと、本格ロウリュが楽しめるプライベートサウナを独占する、比類なきリトリート空間。伊丹という都会の隠れ家に潜む、五感を研ぎ澄ます「究極のととのい」と「没入感」を同時に叶える、大人のためのハイエンド・ステイ。</p>
            <div class="btn-group">
              <button class="btn btn-outline hover-magnetic" data-modal-trigger="t2stay">RESERVATION</button>
              <button class="btn btn-text hover-magnetic" onclick="window.open('https://www.airbnb.jp/rooms/1468587267648945252?viralityEntryPoint=1&s=76&source_impression_id=p3_1772771925_P3M4TvBXpdpQEs_v', '_blank')">AIRBNB <span>→</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // ----- 3-1. FEATURES (Facilities Detail) ----- //
  const features = document.createElement('section');
  features.className = 'section features-art pb-0';
  features.innerHTML = `
    <div class="container-large relative">
      <!-- Feature 1 -->
      <div class="feature-row fade-up-scroll mt-xl">
        <div class="feature-img image-hover-zoom">
           <div class="image-inner parallax-img" style="background-image: url('${asset('/assets/facilities/01_sauna/sauna-barrel-night.webp')}');"></div>
        </div>
        <div class="feature-text">
          <span class="feature-number">01</span>
          <h3 class="jp-title">至高のサウナ・リトリート</h3>
          <p>フィンランド・MISA社製の本格ストーブを採用した、自分のペースでセルフロウリュを楽しめる完全プライベートサウナ。100度越えの灼熱から、15度にキープされたチラー付き水風呂へ。そして計算し尽くされた設計による「内気浴スペース」への完璧な動線が、他者の目を一切気にすることのない「真のととのい」へとあなたを導きます。</p>
        </div>
      </div>
      
      <!-- Feature 2 -->
      <div class="feature-row reverse fade-up-scroll">
        <div class="feature-img image-hover-zoom">
           <div class="image-inner parallax-img" style="background-image: url('${asset('/assets/facilities/07_theater/Output_this_home_theater_scene_in_maximum_4K_quali-1772364577028.webp')}');"></div>
        </div>
        <div class="feature-text">
          <span class="feature-number">02</span>
          <h3 class="jp-title">五感を震わせるシアター空間</h3>
          <p>落ち着いたトーンで統一されたリビングの主役は、壁一面を覆う100インチオーバーの巨大プロジェクタースクリーン。高解像度プロジェクターと重低音が響くサウンドバーが、空間全体を圧倒的な没入感で包み込みます。特注のローソファに深く身を沈め、お好きな映画や音楽ライブ映像とともに、時を忘れる美しい夜をお過ごしください。</p>
        </div>
      </div>

      <!-- Feature 3 -->
      <div class="feature-row fade-up-scroll">
        <div class="feature-img image-hover-zoom">
           <div class="image-inner parallax-img" style="background-image: url('${asset('/assets/facilities/07_theater/Output_this_modern_kitchen_party_scene_in_maximum_-1772364548901.webp')}');"></div>
        </div>
        <div class="feature-text">
          <span class="feature-number">03</span>
          <h3 class="jp-title">一流に拘り抜いた設え</h3>
          <p>「暮らすように泊まる」ために、目に見えない細部にまで極上の品質を追求しました。肌に触れるタオルやバスアメニティは高級ホテル仕様のブランドを採用。広々としたアイランドキッチンには、BALMUDAなどのハイエンド家電からカトラリーに至るまですべて完備。シャンパングラスを傾けながら、最高にラグジュアリーな夜会をご堪能いただけます。</p>
        </div>
      </div>
    </div>
  `;

  // ----- 3-2. GALLERY ----- //
  const gallerySection = document.createElement('section');
  gallerySection.className = 'section gallery-art';
  gallerySection.id = 'gallery';
  const galleryContainer = document.createElement('div');
  galleryContainer.className = 'container-large relative';
  galleryContainer.innerHTML = `
    <h2 class="display-title center fade-up-scroll" style="top: -60px; z-index: 0;">GALLERY</h2>
    <div class="gallery-content-wrapper relative" style="z-index: 1;">
      <div class="text-center py-xl"><p>Loading gallery...</p></div>
    </div>
  `;
  gallerySection.appendChild(galleryContainer);

  const lightbox = document.createElement('div');
  lightbox.className = 'facilities-lightbox';
  lightbox.innerHTML = `
    <button class="lb-btn lb-close" aria-label="Close">&times;</button>
    <button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>
    <button class="lb-btn lb-next" aria-label="Next">&#8250;</button>
    <div class="lb-category"></div>
    <img id="lb-img" alt="" />
    <div class="lb-counter"></div>
  `;

  let categories = [];
  let activeCategory = null;
  let currentImages = [];
  let currentIdx = 0;

  // 埋め込みフォールバック: Netlify等で manifest が返らない場合でもタブを表示する
  const defaultCategories = [
    { id: 'sauna', label: 'サウナ', description: 'プライベートサウナで極上のリラックスタイムを', images: ['01_sauna/sauna-barrel-night.webp'] },
    { id: '07_theater', label: 'シアター', description: '100インチオーバーのシアターで没入の一夜を', images: ['07_theater/DSC07966.webp'] },
    { id: 'living', label: 'リビング', description: '広々としたリビングで寛ぎのひとときを', images: ['02_living/DSC07934-Edit.webp'] },
    { id: 'bathroom', label: 'バスルーム', description: '清潔感あふれるバスルームで旅の疲れを癒す', images: ['03_bathroom/DSC07796.webp'] },
    { id: 'bedroom', label: 'ベッドルーム', description: '上質な眠りをお約束するプライベート空間', images: ['04_bedroom/DSC07751-HDR.webp'] },
    { id: 'kitchen', label: 'キッチン', description: '本格的な調理器具を備えたフルキッチン', images: ['05_kitchen/DSC08032-Edit.webp'] },
    { id: 'other', label: 'その他', description: '細部にまでこだわったインテリアと設備', images: ['06_other/DSC07804.webp'] },
  ];

  function renderGalleryContent(data) {
    categories = data.categories || [];
    if (categories.length === 0) categories = defaultCategories;

    const contentWrapper = galleryContainer.querySelector('.gallery-content-wrapper');
    if (!contentWrapper) return;
    contentWrapper.innerHTML = '';

    const tabBar = document.createElement('div');
    tabBar.className = 'facilities-tabs mt-xl';

    categories.forEach((cat, i) => {
      const tab = document.createElement('button');
      tab.className = 'facilities-tab';
      tab.textContent = cat.label;
      tab.dataset.index = i;
      if (i === 0) tab.classList.add('active');
      tab.addEventListener('click', () => switchCategory(i));
      tabBar.appendChild(tab);
    });

    contentWrapper.appendChild(tabBar);

    const descEl = document.createElement('p');
    descEl.className = 'facilities-description';
    contentWrapper.appendChild(descEl);

    const gridWrapper = document.createElement('div');
    gridWrapper.id = 'facilities-grid-wrapper';
    contentWrapper.appendChild(gridWrapper);

    switchCategory(0);
  }

  fetch(asset('/assets/facilities/manifest.json') + '?t=' + Date.now())
    .then(r => {
      if (!r.ok) throw new Error('Manifest not found');
      const contentType = r.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) throw new Error('Invalid response');
      return r.json();
    })
    .then(data => renderGalleryContent(data))
    .catch(() => {
      const contentWrapper = galleryContainer.querySelector('.gallery-content-wrapper');
      if (contentWrapper) renderGalleryContent({ categories: defaultCategories });
    });

  function switchCategory(index) {
    const cat = categories[index];
    if (!cat) return;
    activeCategory = cat;

    const tabs = galleryContainer.querySelectorAll('.facilities-tab');
    tabs.forEach((t, i) => t.classList.toggle('active', i === index));

    const activeTab = tabs[index];
    if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    const descEl = galleryContainer.querySelector('.facilities-description');
    descEl.style.animation = 'none';
    descEl.offsetHeight;
    descEl.style.animation = '';
    descEl.textContent = cat.description;

    currentImages = cat.images.map(f => asset(`/assets/facilities/${f}`));

    const wrapper = galleryContainer.querySelector('#facilities-grid-wrapper');
    wrapper.style.opacity = '0';
    wrapper.style.transition = 'opacity 0.25s ease';

    setTimeout(() => {
      wrapper.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'facilities-grid';

      currentImages.forEach((src, idx) => {
        const item = document.createElement('div');
        item.className = 'facilities-grid-item';

        const img = document.createElement('img');
        img.src = src;
        img.alt = `${cat.label} ${idx + 1}`;
        img.loading = 'lazy';
        item.appendChild(img);

        item.addEventListener('click', () => openLightbox(idx));

        grid.appendChild(item);

        setTimeout(() => {
          item.classList.add('visible');
        }, 40 + idx * 50);
      });

      wrapper.appendChild(grid);
      wrapper.style.opacity = '1';
    }, 250);
  }

  function openLightbox(idx) {
    currentIdx = idx;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const img = lightbox.querySelector('#lb-img');
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = currentImages[currentIdx];
      img.alt = `${activeCategory?.label || ''} ${currentIdx + 1}`;
      img.style.opacity = '1';
    }, 150);
    lightbox.querySelector('.lb-counter').textContent = `${currentIdx + 1} / ${currentImages.length}`;
    lightbox.querySelector('.lb-category').textContent = activeCategory?.label || '';
  }

  lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightbox.querySelector('.lb-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
  });
  lightbox.querySelector('.lb-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % currentImages.length;
    updateLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
      updateLightbox();
    }
    if (e.key === 'ArrowRight') {
      currentIdx = (currentIdx + 1) % currentImages.length;
      updateLightbox();
    }
  });

  // ----- REVIEWS (お客さまの声) ----- //
  const reviews = document.createElement('section');
  reviews.className = 'section reviews-art';
  reviews.id = 'reviews';
  reviews.innerHTML = `
    <div class="container-large relative">
      <h2 class="display-title center fade-up-scroll" style="top: -100px;">VOICE</h2>
      <div class="text-center fade-up-scroll" style="margin-bottom: 80px;">
        <h3 class="jp-title" style="font-size: 2rem; color: #fff; letter-spacing: 0.1em;">お客さまの声</h3>
        <p style="color: rgba(255,255,255,0.5); margin-top: 20px;">実際にご宿泊いただいたゲストの皆さまからいただいた評価です。</p>
      </div>
      <div class="reviews-stats fade-up-scroll">
        <div class="reviews-score">
          <span class="score-number">4.96</span>
          <div class="score-stars">★★★★★</div>
        </div>
      </div>
      <div class="reviews-wrapper">
        <div class="review-box fade-up-scroll">
          <span class="quote-mark">"</span>
          <p class="review-text">サウナが本当に最高でした。100度を超える本格的なロウリュと、キンキンに冷えた水風呂の温度差がたまりません。外気浴スペースの設計も素晴らしく、人生で一番の「ととのい」を体験できました。プライベート空間なので、時間を気にせず何セットでも楽しめるのが贅沢そのものです。</p>
          <p class="review-author">— K.T. / 30代 男性グループ</p>
        </div>
        <div class="review-box fade-up-scroll" style="transition-delay: 0.15s;">
          <span class="quote-mark">"</span>
          <p class="review-text">家族の誕生日に貸切で利用しました。100インチのシアターで子どもたちは大興奮、大人はリビングでワインを片手にゆっくり過ごせました。キッチンの設備も本格的で、みんなで料理をする時間もいい思い出になりました。「また絶対来たい！」と全員一致でした。</p>
          <p class="review-author">— M.S. / 40代 ファミリー</p>
        </div>
        <div class="review-box fade-up-scroll" style="transition-delay: 0.3s;">
          <span class="quote-mark">"</span>
          <p class="review-text">写真で見て期待していましたが、実物は期待を遥かに超えていました。インテリアの統一感、アメニティの質、細部へのこだわりがすべてハイレベル。特にバスルームの高級感には驚きました。非日常を味わいたい方には間違いなくおすすめです。</p>
          <p class="review-author">— A.Y. / 20代 カップル</p>
        </div>
        <div class="review-box fade-up-scroll" style="transition-delay: 0.45s;">
          <span class="quote-mark">"</span>
          <p class="review-text">社員旅行のサプライズで利用しました。一棟貸切なので周りを気にせずにすみ、シアターでのプレゼン上映からそのまま懇親会へ。サウナ後のリラックスした状態でのコミュニケーションは、普段のオフィスでは絶対に生まれない一体感でした。次回の利用も確定です。</p>
          <p class="review-author">— T.N. / 法人利用</p>
        </div>
      </div>
    </div>
  `;

  // ----- 4. COMPANY ----- //
  const company = document.createElement('section');
  company.className = 'section company-art';
  company.id = 'company';
  company.innerHTML = `
    <div class="container-large relative">
      <h2 class="display-title fade-up-scroll">COMPANY</h2>
      <div class="company-wrapper mt-xl">
        <div class="company-message fade-up-scroll">
          <h3 class="jp-title">あなただけの「第二の居場所」を</h3>
          <p>「最高の休日とは何か」――私たちはその問いに対し、徹底したプライベート空間と、妥協のない本物の設備でお応えします。</p>
          <p>Second Stayは、画一的なホテルステイでは決して味わえない「邸宅を貸し切る贅沢」と「ハイエンドな体験（サウナ・シアター）」を約束します。大切な人とともに過ごす特別な時間が、永遠に色褪せない記憶となることを願って。</p>
          <div class="signature mt-lg text-muted">
            <p>株式会社セカンドステイ</p>
            <p style="font-size: 0.85rem; letter-spacing: 0.1em; color: var(--gold-primary); margin-bottom: 5px;">代表取締役</p>
            <p style="font-family: 'Zen Kaku Gothic New', sans-serif; font-size: 1.4rem; letter-spacing: 0.3em;">吉田 知博</p>
            <p style="font-size: 0.75rem; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; margin-top: 5px;">YOSHIDA TOMOHIRO</p>
          </div>
        </div>
        <div class="company-profile-table fade-up-scroll" style="transition-delay: 0.2s;">
          <h4 class="table-title">COMPANY PROFILE</h4>
          <dl class="profile-list">
            <div class="profile-row">
              <dt>会社名</dt>
              <dd>株式会社セカンドステイ<br><span class="en">Second Stay Co., Ltd.</span></dd>
            </div>
            <div class="profile-row">
              <dt>所在地</dt>
              <dd>〒664-0845<br>兵庫県伊丹市東有岡3丁目141</dd>
            </div>
            <div class="profile-row">
              <dt>設立</dt>
              <dd>2023年</dd>
            </div>
            <div class="profile-row">
              <dt>事業内容</dt>
              <dd>
                1. 宿泊施設（T2STAY等）の企画・運営<br>
                2. 空間プロデュース・リノベーション事業<br>
                3. リゾート開発・不動産事業
              </dd>
            </div>
            <div class="profile-row">
              <dt>主要取引銀行</dt>
              <dd>三井住友銀行 / PayPay銀行</dd>
            </div>
            <div class="profile-row">
              <dt>連絡先</dt>
              <dd>
                TEL/FAX: 072-767-6503<br>
                Mobile: 090-1672-4413<br>
                E-mail: <a href="mailto:second.stay02@gmail.com" style="color: var(--gold-primary);">second.stay02@gmail.com</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  `;

  // ----- 5. CONTACT ----- //
  const contact = document.createElement('section');
  contact.className = 'section contact-art';
  contact.id = 'contact';
  contact.innerHTML = `
    <div class="container-large relative">
      <h2 class="display-title right fade-up-scroll">CONTACT</h2>
      <div class="contact-grid mt-xl">
        <div class="contact-info fade-up-scroll">
          <h3 class="jp-title mb-md" style="font-size: 2rem; color: #fff; letter-spacing: 0.1em;">お問い合わせ</h3>
          <p style="color: rgba(255,255,255,0.6); line-height: 2; margin-bottom: 40px;">
            ご予約に関するご質問、法人利用のご相談、空間プロデュースのご依頼など、どうぞお気軽にお問い合わせください。専任のスタッフが丁寧にご案内いたします。
          </p>
          <div class="contact-details">
            <div class="c-item">
              <span class="c-label">ADDRESS</span>
              <p>〒664-0845 兵庫県伊丹市東有岡3-141</p>
            </div>
            <div class="c-item">
              <span class="c-label">CONTACT INFO</span>
              <p style="margin-bottom: 5px;">TEL/FAX: 072-767-6503</p>
              <p style="margin-bottom: 5px;">Mobile: 090-1672-4413</p>
              <p>Email: <a href="mailto:second.stay02@gmail.com" style="color: var(--gold-primary);">second.stay02@gmail.com</a></p>
            </div>
            <div class="c-item">
              <span class="c-label">HOURS</span>
              <p>10:00 - 18:00 (土日祝はメール対応のみ)</p>
            </div>
          </div>
        </div>
        <div class="contact-form-wrapper fade-up-scroll" style="transition-delay: 0.2s;">
          <form class="contact-form-premium" action="mailto:second.stay02@gmail.com" method="post" enctype="text/plain">
            <div class="form-group row">
              <div class="form-field">
                <label>お名前 <span>NAME</span></label>
                <input type="text" name="name" required class="input-premium">
              </div>
              <div class="form-field">
                <label>会社名 <span>COMPANY</span></label>
                <input type="text" name="company" class="input-premium">
              </div>
            </div>
            <div class="form-group">
              <label>メールアドレス <span>EMAIL</span></label>
              <input type="email" name="email" required class="input-premium">
            </div>
            <div class="form-group">
              <label>お問い合わせ種別 <span>SUBJECT</span></label>
              <select name="subject" class="input-premium select-premium">
                <option value="ご宿泊予約について">ご宿泊・予約について</option>
                <option value="空間プロデュースについて">空間プロデュース・設計について</option>
                <option value="法人利用・取材について">法人利用・取材について</option>
                <option value="その他のお問い合わせ">その他のお問い合わせ</option>
              </select>
            </div>
            <div class="form-group">
              <label>メッセージ <span>MESSAGE</span></label>
              <textarea name="message" rows="4" required class="input-premium auto-expand"></textarea>
            </div>
            <button type="submit" class="btn btn-outline hover-magnetic mt-md w-100" style="padding: 20px;">送信する / SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  `;

  // お問い合わせフォーム: 送信時にメールクライアントを開き、内容を件名・本文に反映
  const contactForm = contact.querySelector('form.contact-form-premium');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const subject = '【Second Stay】お問い合わせ - ' + (form.subject?.value || '');
      const body = [
        'お名前: ' + (form.name?.value || ''),
        '会社名: ' + (form.company?.value || ''),
        'メールアドレス: ' + (form.email?.value || ''),
        'お問い合わせ種別: ' + (form.subject?.value || ''),
        '',
        'メッセージ:',
        form.message?.value || ''
      ].join('\n');
      const mailto = 'mailto:second.stay02@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }

  function createWaveSeparator(shape) {
    const d = document.createElement('div');
    d.className = 'wave-separator';
    const paths = {
      arc: 'M0,40 C360,80 1080,80 1440,40',
      arcInverse: 'M0,40 C360,0 1080,0 1440,40',
      sWave: 'M0,60 C400,0 1040,80 1440,20',
      sWaveReverse: 'M0,20 C400,80 1040,0 1440,60',
    };
    const p = paths[shape] || paths.arc;
    d.innerHTML = `<svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${p}" fill="none" stroke="#D4AF37" stroke-opacity="0.03" stroke-width="12"/>
      <path d="${p}" fill="none" stroke="#D4AF37" stroke-opacity="0.08" stroke-width="4"/>
      <path d="${p}" fill="none" stroke="#D4AF37" stroke-opacity="0.2" stroke-width="1.5"/>
    </svg>`;
    return d;
  }

  // Appending all sections in the correct perfect order
  container.appendChild(hero);
  container.appendChild(concept);
  container.appendChild(createWaveSeparator('sWave'));
  container.appendChild(news);
  container.appendChild(createWaveSeparator('sWaveReverse'));
  container.appendChild(business);
  container.appendChild(createWaveSeparator('arcInverse'));
  container.appendChild(facilities);
  container.appendChild(features);
  container.appendChild(createWaveSeparator('arc'));
  container.appendChild(gallerySection);
  container.appendChild(lightbox);
  container.appendChild(createWaveSeparator('sWaveReverse'));
  container.appendChild(reviews);
  container.appendChild(createWaveSeparator('arc'));
  container.appendChild(company);
  container.appendChild(createWaveSeparator('arc'));
  container.appendChild(contact);

  return container;
}
