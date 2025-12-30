export function createNewsPage() {
  const container = document.createElement('div');
  // News section removed as per request
  return container;
}

export function createContactPage() {
  const container = document.createElement('div');
  container.className = 'page-container fade-in';

  container.innerHTML = `
    <div class="page-hero" style="background: linear-gradient(45deg, #1e293b, #0f172a); height: 50vh; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: var(--spacing-xl);">
      <div class="overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.3);"></div>
      <div class="container text-center" style="position: relative; z-index: 2;">
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 1rem;">Contact</h1>
        <p class="hero-subtitle" style="font-size: 1.1rem; font-weight: 300;">お問い合わせ</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-header text-center mb-lg">
          <p class="mt-md">ご不明な点やご予約については、下記フォームよりお問い合わせください。</p>
        </div>
        
        <form class="contact-form glass-panel p-lg" onsubmit="event.preventDefault(); alert('お問い合わせありがとうございます！');">
          <div class="form-group">
            <label>お名前</label>
            <input type="text" class="form-input" required>
          </div>
          <div class="form-group">
            <label>メールアドレス</label>
            <input type="email" class="form-input" required>
          </div>
          <div class="form-group">
            <label>件名</label>
            <select class="form-input">
              <option>一般的なお問い合わせ</option>
              <option>ご予約について</option>
              <option>取材・提携について</option>
              <option>その他</option>
            </select>
          </div>
          <div class="form-group">
            <label>お問い合わせ内容</label>
            <textarea rows="6" class="form-input" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary w-full mt-md">送信する</button>
        </form>
      </div>
    </section>
  `;
  return container;
}
