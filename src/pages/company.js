export function createCompanyPage() {
  const container = document.createElement('div');
  container.className = 'page-container fade-in';

  container.innerHTML = `
    <div class="page-hero" style="background-image: url('/assets/t2stay.png'); height: 50vh; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--spacing-xl);">
      <div class="overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5);"></div>
      <div class="container text-center" style="position: relative; z-index: 2;">
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 1rem;">Company</h1>
        <p class="hero-subtitle" style="font-size: 1.1rem; font-weight: 300;">企業情報</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        
        <div class="company-info-card hover-lift glass-panel p-lg mb-xl">
          <dl class="company-list">
            <div class="company-item">
              <dt>会社名</dt>
              <dd>株式会社セカンドステイ</dd>
            </div>
            <div class="company-item">
              <dt>代表者</dt>
              <dd>代表取締役</dd>
            </div>
            <div class="company-item">
              <dt>設立</dt>
              <dd>20XX年X月</dd>
            </div>
            <div class="company-item">
              <dt>所在地</dt>
              <dd>兵庫県</dd>
            </div>
            <div class="company-item">
              <dt>事業内容</dt>
              <dd>宿泊施設運営、不動産活用、コンサルティング</dd>
            </div>
          </dl>
        </div>

        <div class="mission-section section">
          <h3 class="text-center mb-md">企業理念</h3>
          <div class="mission-card glass-panel p-lg mb-md text-center">
            <h4 class="text-accent mb-sm">Mission</h4>
            <p class="text-lg">"心安らぐ、第3の居場所を"</p>
            <p class="mt-sm">家でも職場でもない、あなたらしくいられる特別な場所を提供します。</p>
          </div>
          
          <div class="mission-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
            <div class="mission-card glass-panel p-md text-center">
              <h4 class="text-accent mb-sm">Vision</h4>
              <p>地域と世界をつなぐ、<br>新しい宿泊のスタンダードへ。</p>
            </div>
            <div class="mission-card glass-panel p-md text-center">
              <h4 class="text-accent mb-sm">Value</h4>
              <p>圧倒的な顧客体験と、<br>細部への徹底したこだわり。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return container;
}
