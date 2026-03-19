import { asset } from '../lib/asset-path.js';

export function createCompanyPage() {
  const container = document.createElement('div');
  container.className = 'page-container fade-in';

  container.innerHTML = `
    <div class="page-hero" style="background-image: url('${asset('/assets/t2stay.png')}'); height: 44vh; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; color: #f5f4f0; margin-bottom: var(--spacing-xl);">
      <div class="overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(180deg, rgba(18, 34, 61, 0.78), rgba(18, 34, 61, 0.5));"></div>
      <div class="container text-center" style="position: relative; z-index: 2;">
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 1rem;">Company</h1>
        <p class="hero-subtitle" style="font-size: 1.1rem; font-weight: 300;">セカンドステイ 企業サイト</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:20px; flex-wrap:wrap; margin-bottom:28px;">
          <h2 style="margin:0; color:#12223d; letter-spacing:0.08em;">会社概要</h2>
          <a href="#top" class="btn btn-outline" style="text-decoration:none;">宿泊LPへ戻る</a>
        </div>

        <div class="company-info-card hover-lift glass-panel p-lg mb-xl" style="background:#fff; border:1px solid rgba(18,34,61,0.1);">
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

        <div class="mission-section section" style="padding-top:0;">
          <h3 class="text-center mb-md" style="color:#12223d;">事業領域</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px;">
            <article class="mission-card glass-panel p-md" style="background:#fff; border:1px solid rgba(18,34,61,0.1);">
              <h4 class="mb-sm" style="color:#12223d;">高級宿泊施設</h4>
              <p style="margin:0; color:#30405f;">一棟貸し宿泊施設の企画・運営を通じ、滞在価値を最大化する空間づくりを行っています。</p>
            </article>
            <article class="mission-card glass-panel p-md" style="background:#fff; border:1px solid rgba(18,34,61,0.1);">
              <h4 class="mb-sm" style="color:#12223d;">空間プロデュース</h4>
              <p style="margin:0; color:#30405f;">サウナ・シアター・リビングなど、体験価値を高める空間設計とリノベーションを提供します。</p>
            </article>
            <article class="mission-card glass-panel p-md" style="background:#fff; border:1px solid rgba(18,34,61,0.1);">
              <h4 class="mb-sm" style="color:#12223d;">リゾート開発</h4>
              <p style="margin:0; color:#30405f;">地域資源を活かした滞在開発を通じて、持続可能な観光とエリア価値向上に取り組みます。</p>
            </article>
            <article class="mission-card glass-panel p-md" style="background:#fff; border:1px solid rgba(18,34,61,0.1);">
              <h4 class="mb-sm" style="color:#12223d;">地方創生</h4>
              <p style="margin:0; color:#30405f;">宿泊体験を軸に、地域事業者との連携・雇用・交流を生み出すプロジェクトを推進します。</p>
            </article>
          </div>

          <div class="mission-card glass-panel p-lg mt-xl" style="background:#f5f4f0; border:1px solid rgba(18,34,61,0.1);">
            <h4 class="mb-sm" style="color:#12223d;">企業理念</h4>
            <p style="margin-bottom:10px; color:#30405f;">「滞在価値を再定義し、人と地域に新しい豊かさを届ける」</p>
            <p style="margin:0; color:#30405f;">私たちは宿泊を起点に、空間・体験・地域をつなぐ事業を展開し、長く愛される価値の創出を目指します。</p>
          </div>
        </div>
      </div>
    </section>
  `;

  return container;
}
