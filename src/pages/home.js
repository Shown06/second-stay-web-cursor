export function createHomePage() {
  const container = document.createElement('div');

  // Hero Section with Background Slider
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.id = 'top';
  hero.innerHTML = `
    <div class="hero-slider">
      <div class="hero-slide" style="background-image: url('/assets/t2stay.png');"></div>
      <div class="hero-slide" style="background-image: url('/assets/bdstay.png');"></div>
      <div class="hero-slide" style="background-image: url('/assets/kasumi.jpg');"></div>
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content container float">
      <h1 class="hero-title fade-in typewriter text-light" style="text-shadow: 0 2px 10px rgba(0,0,0,0.5);">兵庫で体験する<br>非日常の贅沢</h1>
      <p class="hero-subtitle fade-in text-light" style="animation-delay: 0.3s; text-shadow: 0 1px 5px rgba(0,0,0,0.5);">記憶に残る、プレミアムな宿泊体験を。</p>
      <a href="#facilities" class="btn btn-primary fade-in" style="animation-delay: 0.6s;">施設一覧を見る</a>
    </div>
    <div class="scroll-indicator fade-in" style="animation-delay: 1s;">
      <span class="text-light" style="text-shadow: 0 1px 3px rgba(0,0,0,0.5);">Scroll</span>
      <div class="line bg-light"></div>
    </div>
  `;

  // Concept Section
  const concept = document.createElement('section');
  concept.className = 'section concept';
  concept.id = 'company';
  concept.innerHTML = `
    <div class="container">
      <div class="section-header text-center">
        <h2 class="section-title fade-in">コンセプト</h2>
        <div class="section-line fade-in"></div>
      </div>
      <div class="concept-grid">
        <div class="concept-text slide-in-left glass-panel p-lg">
          <h3 class="text-dark">「滞在」を再定義する</h3>
          <p class="text-dark">Second Stayは、宿泊を単なる「寝る場所」以上のものと考えます。それは思い出の劇場であり、癒しの聖域であり、五感を刺激する遊び場です。</p>
          <p class="text-dark">兵庫県内で展開する私たちの施設は、それぞれが独自の個性を持ち、他では味わえない圧倒的な体験を提供するために設計されています。</p>
        </div>
        <div class="concept-image slide-in-right">
          <div class="image-placeholder pulse" style="background-image: url('/assets/concept.jpg'); background-size: cover; background-position: center;"></div>
        </div>
      </div>
    </div>
  `;

  // Corporate Message Section
  const corporate = document.createElement('section');
  corporate.className = 'section corporate bg-alt';
  corporate.innerHTML = `
    <div class="container">
      <div class="corporate-grid">
        <div class="corporate-content glass-panel p-lg slide-in-left">
          <h2 class="section-title text-left">代表挨拶</h2>
          <div class="section-line align-left"></div>
          <p class="mt-md text-lg">「心に残る、至高のひとときを」</p>
          <p class="mt-md">私たちは、単なる宿泊施設の運営にとどまらず、地域と旅行者を繋ぐ架け橋となることを目指しています。兵庫県の豊かな自然と文化を背景に、訪れるすべての方々に「第二の故郷」と感じていただけるような、温かくも洗練された空間を提供し続けます。</p>
          <div class="signature mt-lg">
            <p>株式会社セカンドステイ</p>
            <p>代表取締役</p>
          </div>
        </div>
        <div class="corporate-image slide-in-right">
           <div class="image-placeholder" style="background-image: url('/assets/t2stay.png'); background-size: cover; background-position: center; height: 100%; min-height: 400px; border-radius: 8px;"></div>
        </div>
      </div>
    </div>
  `;

  // Facilities Section
  const facilities = document.createElement('section');
  facilities.id = 'facilities';
  facilities.className = 'section facilities bg-alt';
  facilities.innerHTML = `
    <div class="container">
      <div class="section-header text-center mb-xl">
        <h2 class="section-title">Facilities</h2>
        <div class="section-line"></div>
        <p class="section-subtitle mt-sm">非日常を彩る、3つの邸宅</p>
      </div>
      
      <div class="facilities-list">
        <!-- T2STAY -->
        <div class="facility-card glass-panel p-md hover-lift">
          <div class="facility-img" style="background-image: url('/assets/t2stay.png'); background-size: cover; background-position: center;"></div>
          <div class="facility-info">
            <h3>TOTONOU THEATER T2STAY ITAMI</h3>
            <p class="address text-muted mb-sm">兵庫県伊丹市東有岡３丁目１４１</p>
            <p class="desc mb-md">シアター、サウナ、ラグジュアリーな空間で、特別なひとときをお過ごしください。</p>
            <div class="btn-group text-right">
              <button class="btn btn-airbnb" onclick="window.open('https://www.airbnb.jp/rooms/1126366127821669765', '_blank')">Airbnbで予約</button>
              <button class="btn btn-direct" data-modal-trigger="t2stay">直接予約</button>
            </div>
          </div>
        </div>

        <!-- BD stay -->
        <div class="facility-card glass-panel p-md hover-lift">
          <div class="facility-img" style="background-image: url('/assets/bdstay.png'); background-size: cover; background-position: center;"></div>
          <div class="facility-info">
            <h3>BD stay BBQ&DOGRUN</h3>
            <p class="address text-muted mb-sm">兵庫県西脇市黒田庄柳字深山口53-104</p>
            <p class="desc mb-md">広大なドッグランとBBQ設備を完備。愛犬と一緒に楽しめるプライベート別荘。</p>
            <div class="btn-group text-right">
              <button class="btn btn-airbnb" onclick="window.open('https://www.airbnb.jp/rooms/1126366127821669765', '_blank')">Airbnbで予約</button>
              <button class="btn btn-direct" data-modal-trigger="bdstay">直接予約</button>
            </div>
          </div>
        </div>

        <!-- Kasumi Hotel -->
        <div class="facility-card glass-panel p-md hover-lift">
          <div class="facility-img" style="background-image: url('/assets/kasumi.jpg'); background-size: cover; background-position: center;"></div>
          <div class="facility-info">
            <h3>Kasumi Hotel</h3>
            <p class="address text-muted mb-sm">兵庫県美方郡香美町香住区訓谷</p>
            <p class="desc mb-md">海の家とバーを併設。潮風を感じながら、自由なスタイルで楽しむホテル。</p>
            <div class="btn-group text-right">
              <button class="btn btn-airbnb" onclick="window.open('#', '_blank')">Airbnbで予約</button>
              <button class="btn btn-direct" data-modal-trigger="kasumi">直接予約</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Contact Section
  const contact = document.createElement('section');
  contact.className = 'section contact';
  contact.id = 'contact';
  contact.innerHTML = `
    <div class="container text-center">
      <h2 class="section-title fade-in">お問い合わせ</h2>
      <p class="fade-in">ご予約やご質問は、以下よりお気軽にお問い合わせください。</p>
      <form class="contact-form fade-in glass-panel p-lg" onsubmit="event.preventDefault(); alert('お問い合わせありがとうございます！');">
        <input type="text" placeholder="お名前" required class="form-input">
        <input type="email" placeholder="メールアドレス" required class="form-input">
        <textarea placeholder="お問い合わせ内容" rows="5" required class="form-input"></textarea>
        <button type="submit" class="btn btn-primary hover-lift">送信する</button>
      </form>
    </div>
  `;

  container.appendChild(hero);
  container.appendChild(concept);
  container.appendChild(facilities);
  container.appendChild(contact);

  return container;
}
