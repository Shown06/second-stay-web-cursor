import { asset } from '../lib/asset-path.js';

export function createBusinessPage() {
  const container = document.createElement('div');
  container.className = 'page-container fade-in';

  container.innerHTML = `
    <div class="page-hero" style="background-image: url('${asset('/assets/bdstay.png')}'); height: 50vh; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--spacing-xl);">
      <div class="overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5);"></div>
      <div class="container text-center" style="position: relative; z-index: 2;">
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 1rem;">Business</h1>
        <p class="hero-subtitle" style="font-size: 1.1rem; font-weight: 300;">事業紹介</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-header text-center mb-xl">
          <p class="section-desc text-muted" style="max-width: 600px; margin: 0 auto;">
            私たちは、宿泊施設の運営から空間デザイン、コンサルティングまで、<br>
            一貫したプロデュースで価値ある体験を創造します。
          </p>
        </div>
        
        <div class="service-list">
          
          <!-- Service 01 -->
          <div class="service-row">
            <div class="service-visual">
              <div class="service-img" style="background-image: url('${asset('/assets/t2stay.png')}');"></div>
              <div class="service-number">01</div>
            </div>
            <div class="service-content">
              <h3 class="service-title">宿泊施設運営<span class="service-subtitle-en">Hotel Operation</span></h3>
              <p class="service-desc">
                独自のコンセプトを持つホテルやゲストハウスの運営を行い、ゲストに特別な体験を提供します。
                清掃、予約管理、ゲスト対応まで、質の高いオペレーションで高稼働・高評価を実現します。
              </p>
              <ul class="service-features">
                <li>施設運営受託</li>
                <li>集客マーケティング</li>
                <li>ゲストリレーション</li>
              </ul>
            </div>
          </div>

          <!-- Service 02 -->
          <div class="service-row reverse">
            <div class="service-visual">
              <div class="service-img" style="background-image: url('${asset('/assets/t2stay.png')}');"></div>
              <div class="service-number">02</div>
            </div>
            <div class="service-content">
              <h3 class="service-title">空間デザイン<span class="service-subtitle-en">Space Design</span></h3>
              <p class="service-desc">
                物件のポテンシャルを最大限に引き出すリノベーションとデザインを行います。
                「泊まる」だけでなく「過ごす」時間の質を高める、ストーリーのある空間を設計します。
              </p>
              <ul class="service-features">
                <li>インテリアデザイン</li>
                <li>リノベーション企画</li>
                <li>家具・備品コーディネート</li>
              </ul>
            </div>
          </div>

          <!-- Service 03 -->
          <div class="service-row">
            <div class="service-visual">
              <div class="service-img" style="background-image: url('${asset('/assets/bdstay.png')}');"></div>
              <div class="service-number">03</div>
            </div>
            <div class="service-content">
              <h3 class="service-title">コンサルティング<span class="service-subtitle-en">Consulting</span></h3>
              <p class="service-desc">
                宿泊業の開業支援や運営サポートなど、豊富な実績と専門知識を活かした支援を行います。
                市場調査から収支計画、許認可取得まで、ビジネスの成功をトータルでサポートします。
              </p>
              <ul class="service-features">
                <li>開業支援</li>
                <li>収益改善コンサルティング</li>
                <li>運営オペレーション構築</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;

  return container;
}
