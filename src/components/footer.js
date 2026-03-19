export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <!-- Footer Main -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-col footer-brand">
            <a href="#top" class="footer-logo">SECOND STAY</a>
            <p class="footer-tagline">兵庫県伊丹で、<br class="sp-only">上質な一棟貸しステイ体験を提供します。</p>
            <div class="footer-sns">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="sns-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://line.me/" target="_blank" rel="noopener noreferrer" aria-label="LINE" class="sns-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 5.81 2 10.5c0 3.77 3.05 6.94 7.16 7.87.28.06.65.18.75.42.09.21.06.55.03.77l-.12.73c-.04.22-.17.86.75.47s5.02-2.96 6.84-5.07C19.56 13.21 22 11.39 22 10.5 22 5.81 17.52 2 12 2zm-3.5 11h-2a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0V12h1.5a.5.5 0 0 1 0 1zm1.5-.5a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 1 0v4zm4.5.5h-2a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v3.17l1.93-2.89A.5.5 0 0 1 15 9v4a.5.5 0 0 1-1 0V9.83l-1.93 2.89a.5.5 0 0 1-.57.28zm4-3h-1.5V9h1.5a.5.5 0 0 1 0 1h-1.5v1h1.5a.5.5 0 0 1 0 1h-1.5v1h1.5a.5.5 0 0 1 0 1z"/></svg>
              </a>
            </div>
          </div>

          <!-- Navigation Column -->
          <div class="footer-col">
            <h4 class="footer-heading">ナビゲーション</h4>
            <ul class="footer-links">
              <li><a href="#top">トップ</a></li>
              <li><a href="#concept">コンセプト</a></li>
              <li><a href="#facilities">施設紹介</a></li>
              <li><a href="#gallery">ギャラリー</a></li>
              <li><a href="#reviews">お客さまの声</a></li>
              <li><a href="#company-page">会社情報</a></li>
            </ul>
          </div>

          <!-- Service Column -->
          <div class="footer-col">
            <h4 class="footer-heading">サービス</h4>
            <ul class="footer-links">
              <li><a href="https://www.airbnb.jp/rooms/1468587267648945252" target="_blank" rel="noopener noreferrer">宿泊予約（Airbnb）<span class="external-icon">↗</span></a></li>
              <li><a href="#facilities">施設詳細を見る</a></li>
              <li><a href="#contact">ご宿泊に関するお問い合わせ</a></li>
              <li><a href="#company-page">会社サイトへ</a></li>
            </ul>
          </div>

          <!-- Contact Column -->
          <div class="footer-col">
            <h4 class="footer-heading">アクセス・お問い合わせ</h4>
            <ul class="footer-contact-list">
              <li class="footer-contact-item">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>〒664-0845<br>兵庫県伊丹市東有岡3丁目141</span>
              </li>
              <li class="footer-contact-item">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>072-767-6503</span>
              </li>
              <li class="footer-contact-item">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
                <a href="mailto:second.stay02@gmail.com">second.stay02@gmail.com</a>
              </li>
              <li class="footer-contact-item">
                <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>10:00 – 18:00（土日祝休）</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Middle: 地図のみ（1カラム・広め表示） -->
    <div class="footer-middle">
      <div class="container">
        <div class="footer-map-wrap">
          <div class="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.8!2d135.4!3d34.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5YW15bqr55yM5LyK5Li55biC5p2x5pyJ5bKh77yT5LiB55uu77yR77yU77yR!5e0!3m2!1sja!2sjp!4v1"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Second Stay 所在地"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-inner">
          <div class="footer-legal">
            <a href="#" class="footer-legal-link">プライバシーポリシー</a>
            <span class="footer-legal-sep">|</span>
            <a href="#" class="footer-legal-link">特定商取引法に基づく表記</a>
          </div>
          <p class="copyright">&copy; ${new Date().getFullYear()} Second Stay Co., Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="backToTop" aria-label="ページトップへ戻る">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  `;

  return footer;
}
