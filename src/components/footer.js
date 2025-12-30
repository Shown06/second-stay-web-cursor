export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>SECOND STAY</h4>
          <p>兵庫県で価値ある空間と記憶に残る体験を創造します。</p>
        </div>
        <div class="footer-col">
          <h4>リンク</h4>
          <ul class="footer-links">
            <li><a href="#company">会社情報</a></li>
            <li><a href="#business">事業紹介</a></li>
            <li><a href="#facilities">施設紹介</a></li>
            <li><a href="#news">お知らせ</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>お問い合わせ</h4>
          <ul class="footer-links">
            <li><a href="#contact">お問い合わせフォーム</a></li>
            <li>Tel: 078-XXX-XXXX</li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        &copy; ${new Date().getFullYear()} Second Stay Co., Ltd. All Rights Reserved.
      </div>
    </div>
  `;

  return footer;
}
