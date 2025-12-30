import { createCarousel } from '../components/carousel.js';


export function createFacilitiesPage() {
  const container = document.createElement('div');
  container.className = 'page-container fade-in';

  const t2Images = [
    { url: '/assets/t2stay.png', title: 'Theater Room', desc: 'Immersive cinema experience' },
    { url: '/assets/bdstay.png', title: 'Private Sauna', desc: 'Relax in your own private space' }
  ];

  container.innerHTML = `
    <div class="page-hero" style="background-image: url('/assets/t2stay.png'); height: 60vh; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--spacing-xl);">
      <div class="overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.4);"></div>
      <div class="container text-center" style="position: relative; z-index: 2;">
        <h1 class="hero-title" style="font-size: 3.5rem; margin-bottom: 1rem;">Our Facilities</h1>
        <p class="hero-subtitle" style="font-size: 1.2rem; font-weight: 300;">非日常を彩る、3つの邸宅</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        
        <!-- T2STAY -->
        <div class="facility-detail-card mb-xl" id="t2stay">
          <div class="facility-header mb-lg text-center">
            <span class="facility-label text-accent" style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.9rem;">Private Villa</span>
            <h2 class="facility-title" style="font-size: 2.5rem; margin: 0.5rem 0;">TOTONOU THEATER T2STAY ITAMI</h2>
            <p class="facility-location text-muted">兵庫県伊丹市東有岡３丁目１４１</p>
          </div>
          
          <div class="facility-content-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl); align-items: start;">
            <div class="facility-visuals">
               <div id="t2-carousel" class="mb-md" style="border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-lg);"></div>
            </div>
            <div class="facility-info-text">
              <p class="lead mb-md" style="font-size: 1.1rem; line-height: 1.8;">
                シアター、サウナ、そしてラグジュアリーな空間。<br>
                日常を忘れ、大切な人と過ごすためのプライベートヴィラです。<br>
                最新の設備と洗練されたインテリアが、あなたをお出迎えします。
              </p>
              
              <div class="feature-tags mb-lg" style="display: flex; gap: 10px; flex-wrap: wrap;">
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">シアター</span>
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">サウナ</span>
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">一棟貸し</span>
              </div>

              <div class="action-buttons" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                 <a href="https://www.airbnb.jp/rooms/1468587267648945252" target="_blank" class="btn btn-airbnb">Airbnbで予約</a>
                 <button class="btn btn-direct" data-modal-trigger="t2stay">直接予約</button>
                 <a href="https://maps.app.goo.gl/FBT67A99cWhSQt9C7" target="_blank" class="btn btn-outline">Google Maps</a>
              </div>
            </div>
          </div>
        </div>

        <div class="divider" style="height: 1px; background: #eee; margin: var(--spacing-xl) 0;"></div>

        <!-- BD stay -->
        <div class="facility-detail-card mb-xl" id="bdstay">
          <div class="facility-header mb-lg text-center">
            <span class="facility-label text-accent" style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.9rem;">Private Villa</span>
            <h2 class="facility-title" style="font-size: 2.5rem; margin: 0.5rem 0;">BD stay BBQ&DOGRUN</h2>
            <p class="facility-location text-muted">兵庫県西脇市黒田庄柳字深山口53-104</p>
          </div>
          
          <div class="facility-content-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl); align-items: start;">
            <div class="facility-info-text">
              <p class="lead mb-md" style="font-size: 1.1rem; line-height: 1.8;">
                広大なドッグランと本格的なBBQ設備を完備。<br>
                愛犬と一緒に、自然の中で思いっきり遊べるプライベート別荘です。<br>
                家族や友人とのグループ旅行に最適です。
              </p>
              
              <div class="feature-tags mb-lg" style="display: flex; gap: 10px; flex-wrap: wrap;">
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">BBQ</span>
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">ドッグラン</span>
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">自然</span>
              </div>

              <div class="action-buttons" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                 <a href="#" class="btn btn-airbnb">Airbnbで予約</a>
                 <button class="btn btn-direct" data-modal-trigger="bdstay">直接予約</button>
              </div>
            </div>
            <div class="facility-visuals">
               <div class="img-box" style="background-image: url('/assets/bdstay.png'); height: 400px; background-size: cover; background-position: center; border-radius: 8px; box-shadow: var(--shadow-lg);"></div>
            </div>
          </div>
        </div>

        <div class="divider" style="height: 1px; background: #eee; margin: var(--spacing-xl) 0;"></div>

        <!-- Kasumi Hotel -->
        <div class="facility-detail-card mb-xl" id="kasumi">
          <div class="facility-header mb-lg text-center">
            <span class="facility-label text-accent" style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.9rem;">Hotel</span>
            <h2 class="facility-title" style="font-size: 2.5rem; margin: 0.5rem 0;">Kasumi Hotel</h2>
            <p class="facility-location text-muted">兵庫県美方郡香美町香住区訓谷</p>
          </div>
          
          <div class="facility-content-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl); align-items: start;">
            <div class="facility-visuals">
               <div class="img-box" style="background-image: url('/assets/kasumi.jpg'); height: 400px; background-size: cover; background-position: center; border-radius: 8px; box-shadow: var(--shadow-lg);"></div>
            </div>
            <div class="facility-info-text">
              <p class="lead mb-md" style="font-size: 1.1rem; line-height: 1.8;">
                海の家とバーを併設した、新しいスタイルのホテル。<br>
                潮風を感じながら、自由気ままな滞在をお楽しみください。<br>
                地元の食材を使った料理やお酒も魅力です。
              </p>
              
              <div class="feature-tags mb-lg" style="display: flex; gap: 10px; flex-wrap: wrap;">
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">海の家</span>
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">バー</span>
                <span class="tag" style="padding: 5px 15px; border: 1px solid #ddd; border-radius: 20px; font-size: 0.85rem;">海近</span>
              </div>

              <div class="action-buttons" style="display: flex; gap: 1rem; flex-wrap: wrap;">
                 <a href="#" class="btn btn-airbnb">Airbnbで予約</a>
                 <button class="btn btn-direct" data-modal-trigger="kasumi">直接予約</button>
                 <a href="https://maps.app.goo.gl/jb1EhKaqwNW9hXNy7" target="_blank" class="btn btn-outline">Google Maps</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;

  // Append Carousel
  const carouselContainer = container.querySelector('#t2-carousel');
  if (carouselContainer) {
    carouselContainer.appendChild(createCarousel(t2Images));
  }

  return container;
}
