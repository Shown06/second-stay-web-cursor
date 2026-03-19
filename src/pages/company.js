import { asset } from '../lib/asset-path.js';

export function createCompanyPage() {
  const container = document.createElement('div');
  container.className = 'page-container company-page fade-in';

  container.innerHTML = `
    <section class="company-hero" style="background-image: url('${asset('/assets/t2stay.png')}');">
      <div class="company-hero-overlay"></div>
      <div class="container company-hero-inner">
        <div class="company-hero-copy">
          <span class="company-eyebrow">CORPORATE SITE</span>
          <h1 class="company-hero-title">宿泊体験から、<br>地域の価値を育てる。</h1>
          <p class="company-hero-lead">株式会社セカンドステイは、一棟貸し宿泊施設の企画運営を軸に、空間プロデュース、リゾート開発、地方創生までを一貫して手がける会社です。</p>
          <div class="company-hero-actions">
            <a href="#top" class="btn btn-outline company-hero-button">宿泊LPへ戻る</a>
            <a href="#contact" class="btn btn-primary company-hero-button">お問い合わせへ</a>
          </div>
        </div>

        <div class="company-hero-panel glass-panel">
          <p class="company-panel-label">OUR SCOPE</p>
          <div class="company-hero-metrics">
            <div class="company-metric">
              <span class="company-metric-value">01</span>
              <span class="company-metric-label">高級宿泊施設</span>
            </div>
            <div class="company-metric">
              <span class="company-metric-value">02</span>
              <span class="company-metric-label">空間プロデュース</span>
            </div>
            <div class="company-metric">
              <span class="company-metric-value">03</span>
              <span class="company-metric-label">地方創生・開発</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section company-intro-section">
      <div class="container company-intro-grid">
        <div class="company-intro-copy">
          <span class="company-section-kicker">ABOUT US</span>
          <h2 class="company-section-title">滞在の先にある、<br>体験価値まで設計する。</h2>
          <p class="company-intro-text">セカンドステイが目指しているのは、単なる宿泊施設の運営ではありません。施設に訪れる瞬間から、滞在中の導線、空間の質感、過ごした後の記憶までを含めた「体験の設計」を大切にしています。</p>
          <p class="company-intro-text">宿泊事業で培った知見を、空間づくりや地域連携にも広げることで、長く愛される場所と事業を育てていきます。</p>
          <div class="company-tag-row">
            <span class="company-tag">Hospitality</span>
            <span class="company-tag">Spatial Design</span>
            <span class="company-tag">Regional Development</span>
          </div>
        </div>

        <div class="company-profile-card glass-panel">
          <div class="company-profile-card-head">
            <span class="company-section-kicker">COMPANY PROFILE</span>
            <h3>会社概要</h3>
          </div>
          <dl class="company-list">
            <div class="company-item">
              <dt>会社名</dt>
              <dd>株式会社セカンドステイ</dd>
            </div>
            <div class="company-item">
              <dt>代表者</dt>
              <dd>代表取締役 吉田 知博</dd>
            </div>
            <div class="company-item">
              <dt>設立</dt>
              <dd>2023年</dd>
            </div>
            <div class="company-item">
              <dt>所在地</dt>
              <dd>〒664-0845 兵庫県伊丹市東有岡3丁目141</dd>
            </div>
            <div class="company-item">
              <dt>事業内容</dt>
              <dd>宿泊施設企画・運営、空間プロデュース、リゾート開発・地方創生</dd>
            </div>
            <div class="company-item">
              <dt>連絡先</dt>
              <dd>TEL/FAX: 072-767-6503 / E-mail: second.stay02@gmail.com</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="section company-services-section">
      <div class="container">
        <div class="company-section-head text-center">
          <span class="company-section-kicker">BUSINESS DOMAIN</span>
          <h2 class="company-section-title">事業領域</h2>
          <p class="company-section-lead">宿泊運営の現場感覚を起点に、空間づくりと地域価値向上まで一貫して取り組んでいます。</p>
        </div>

        <div class="company-service-grid">
          <article class="company-service-card glass-panel">
            <span class="company-service-number">01</span>
            <h3>高級宿泊施設</h3>
            <p>一棟貸し宿泊施設の企画・運営を通じて、滞在価値そのものを高める宿泊体験を提供します。</p>
          </article>
          <article class="company-service-card glass-panel">
            <span class="company-service-number">02</span>
            <h3>空間プロデュース</h3>
            <p>サウナ、シアター、リビングなど、過ごし方まで設計した空間リノベーションを行います。</p>
          </article>
          <article class="company-service-card glass-panel">
            <span class="company-service-number">03</span>
            <h3>リゾート開発</h3>
            <p>地域資源や土地の魅力を活かし、持続的な滞在価値につながる開発に取り組みます。</p>
          </article>
          <article class="company-service-card glass-panel">
            <span class="company-service-number">04</span>
            <h3>地方創生</h3>
            <p>宿泊を起点に、地域の人・文化・経済が循環する仕組みづくりを目指します。</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section company-philosophy-section">
      <div class="container company-philosophy-grid">
        <div class="company-philosophy-main">
          <span class="company-section-kicker">PHILOSOPHY</span>
          <h2 class="company-section-title">企業理念</h2>
          <p class="company-philosophy-quote">「滞在価値を再定義し、人と地域に新しい豊かさを届ける」</p>
          <p class="company-intro-text">私たちは宿泊を起点に、空間・体験・地域をつなぐ事業を展開し、長く愛される価値の創出を目指します。</p>
        </div>

        <div class="company-values-card glass-panel">
          <div class="company-value-item">
            <h3>Quality</h3>
            <p>細部まで品質を整え、体験全体の完成度を高めます。</p>
          </div>
          <div class="company-value-item">
            <h3>Design</h3>
            <p>空間だけでなく、過ごし方と記憶までを設計します。</p>
          </div>
          <div class="company-value-item">
            <h3>Locality</h3>
            <p>地域と共に価値を育て、持続可能な事業をつくります。</p>
          </div>
        </div>
      </div>
    </section>
  `;

  return container;
}
