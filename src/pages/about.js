import { paths } from '../lib/paths.js';

export function createAboutPage() {
  const container = document.createElement('div');
  container.className = 'hospice-page page-container';

  container.innerHTML = `
    <!-- ページヘッダー -->
    <section class="hospice-page-hero">
      <div class="container">
        <div class="hospice-page-hero-inner fade-up">
          <p class="hospice-about-label" style="margin-bottom:16px;">
            <span class="hospice-leaf-icon" aria-hidden="true">🌿</span>
            <span>こどもホスピスとは</span>
          </p>
          <h1 class="hospice-page-title">
            最期を待つ場所では<br>ありません。
          </h1>
          <p class="hospice-page-subtitle">
            病気とともに生きる子どもとその家族が、<br>
            安心して過ごせる「もうひとつの家」です。
          </p>
        </div>
      </div>
    </section>

    <!-- 説明ブロック -->
    <section class="hospice-about-page section">
      <div class="container">
        <div class="hospice-about-page-grid">
          <div class="hospice-about-page-text fade-up-scroll">
            <h2 class="hospice-about-page-heading">こどもホスピスとは</h2>
            <p>
              こどもホスピスは、命に関わる病気を持つ子ども（0歳〜18歳）と、その家族を支える施設・活動です。
              「ホスピス」という言葉から「最期の場所」と思われがちですが、そうではありません。
            </p>
            <p>
              子どもたちが病気を持ちながらも「ふつうの子ども」として過ごせる時間と場所を提供します。
              家族も安心して休んだり、話したりできる居場所でもあります。
            </p>
            <p>
              英国をはじめ世界各地に広がっており、日本でも横浜・大阪などで活動が始まっています。
              伊丹こどもホスピスは、兵庫・伊丹のまちでその実現を目指して活動しています。
            </p>
          </div>

          <div class="hospice-about-page-card-col fade-up-scroll">
            <div class="hospice-feature-card">
              <div class="hospice-feature-icon">🏡</div>
              <h3>もうひとつの家</h3>
              <p>病院でも自宅でもない、第三の場所。子どもも家族もありのままでいられます。</p>
            </div>
            <div class="hospice-feature-card">
              <div class="hospice-feature-icon">☀️</div>
              <h3>楽しい思い出をつくる</h3>
              <p>遊び、工作、音楽、季節のイベント。子どもらしい「今」を大切にします。</p>
            </div>
            <div class="hospice-feature-card">
              <div class="hospice-feature-icon">💛</div>
              <h3>家族が休める場所</h3>
              <p>ケアをする家族も、安心して過ごせる時間と空間を提供します。</p>
            </div>
          </div>
        </div>

        <!-- 対象 -->
        <div class="hospice-target-block fade-up-scroll">
          <h2 class="hospice-target-title">どんな子どもたちが利用しますか？</h2>
          <div class="hospice-target-grid">
            <div class="hospice-target-item">
              <span class="hospice-target-icon">🫀</span>
              <p>心臓・循環器の病気</p>
            </div>
            <div class="hospice-target-item">
              <span class="hospice-target-icon">🧠</span>
              <p>神経・筋肉の病気</p>
            </div>
            <div class="hospice-target-item">
              <span class="hospice-target-icon">🫁</span>
              <p>肺・呼吸器の病気</p>
            </div>
            <div class="hospice-target-item">
              <span class="hospice-target-icon">🩺</span>
              <p>がん・血液の病気</p>
            </div>
            <div class="hospice-target-item">
              <span class="hospice-target-icon">🧬</span>
              <p>先天性・代謝の病気</p>
            </div>
            <div class="hospice-target-item">
              <span class="hospice-target-icon">🌟</span>
              <p>その他の難病</p>
            </div>
          </div>
          <p class="hospice-target-note">
            ※ 対象・利用方法は設立後に改めてご案内します。
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="hospice-cta section">
      <div class="container">
        <div class="hospice-cta-inner fade-up-scroll">
          <h2 class="hospice-cta-title">一緒に活動しませんか</h2>
          <p class="hospice-cta-desc">
            ご支援・ボランティア・講演依頼など、<br>お気軽にお問い合わせください。
          </p>
          <div class="hospice-cta-buttons">
            <a href="${paths.contact()}" class="btn btn-primary">お問い合わせ</a>
            <a href="${paths.activities()}" class="btn btn-outline">活動・お知らせを見る</a>
          </div>
        </div>
      </div>
    </section>
  `;

  return container;
}
