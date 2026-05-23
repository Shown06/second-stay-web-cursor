import { bookingButtonsHTML } from '../components/booking.js';
import {
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_HOURS,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from '../config/site.js';
import { paths } from '../lib/paths.js';

export function createContactPage() {
  const container = document.createElement('div');
  container.className = 'hospice-page page-container';

  container.innerHTML = `
    <section class="hospice-page-hero">
      <div class="container">
        <div class="hospice-page-hero-inner fade-up">
          <p class="stay-section-kicker">— CONTACT —</p>
          <h1 class="hospice-page-title">お問い合わせ</h1>
          <p class="hospice-page-subtitle">
            ご予約・ご質問はお気軽にどうぞ。<br>
            お電話またはフォームからご連絡ください。
          </p>
        </div>
      </div>
    </section>

    <section class="stay-contact-main section">
      <div class="container">
        <div class="hospice-contact-grid">
          <div class="fade-up-scroll">
            <h2 class="hospice-company-heading">お問い合わせフォーム</h2>
            <form class="hospice-form" id="contactForm" novalidate>
              <input type="hidden" name="_subject" value="【SECOND STAY】お問い合わせ">
              <input type="hidden" name="_template" value="table">
              <input type="hidden" name="_captcha" value="false">
              <div class="form-group">
                <label for="c-name">お名前 <span class="form-required">必須</span></label>
                <input type="text" id="c-name" name="name" class="form-input"
                       placeholder="山田 太郎" required autocomplete="name">
              </div>
              <div class="form-group">
                <label for="c-email">メールアドレス <span class="form-required">必須</span></label>
                <input type="email" id="c-email" name="email" class="form-input"
                       placeholder="example@email.com" required autocomplete="email">
              </div>
              <div class="form-group">
                <label for="c-phone">お電話番号</label>
                <input type="tel" id="c-phone" name="phone" class="form-input"
                       placeholder="090-0000-0000" autocomplete="tel">
              </div>
              <div class="form-group">
                <label for="c-subject">件名</label>
                <input type="text" id="c-subject" name="subject" class="form-input"
                       placeholder="ご予約について">
              </div>
              <div class="form-group">
                <label for="c-message">メッセージ <span class="form-required">必須</span></label>
                <textarea id="c-message" name="message" class="form-input"
                          placeholder="宿泊日程・人数・ご要望をお書きください" required rows="6"></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100">送信する</button>
            </form>
          </div>

          <div class="fade-up-scroll">
            <h2 class="hospice-company-heading">お電話でのお問い合わせ</h2>
            <div class="stay-contact-phone-card">
              <a href="tel:${SITE_PHONE_TEL}" class="stay-contact-phone-num">${SITE_PHONE_DISPLAY}</a>
              <p class="stay-contact-hours">${SITE_HOURS}</p>
            </div>
            <h2 class="hospice-company-heading" style="margin-top:32px;">所在地</h2>
            <table class="hospice-table">
              <tbody>
                <tr>
                  <th>住所</th>
                  <td>${SITE_ADDRESS}</td>
                </tr>
                <tr>
                  <th>アクセス</th>
                  <td><a href="${paths.access()}" class="hospice-table-link">アクセスページへ →</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- ご予約（外部サイト） -->
    <section class="stay-contact-booking section">
      <div class="container">
        <div class="hospice-booking-head fade-up-scroll">
          <p class="stay-section-kicker">— RESERVATION —</p>
          <h2 class="hospice-company-heading">今すぐご予約はこちら</h2>
          <p class="hospice-booking-lead">空室確認・ご予約は各予約サイトから承っております。</p>
        </div>
        ${bookingButtonsHTML({ label: '' })}
      </div>
    </section>
  `;

  const form = container.querySelector('#contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = '送信中…';

      try {
        const res = await fetch(`https://formsubmit.co/ajax/${SITE_EMAIL}`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        if (!res.ok) throw new Error(`status ${res.status}`);

        btn.textContent = '送信完了しました。ありがとうございます！';
        btn.style.background = 'var(--color-green)';
        form.reset();
      } catch (err) {
        btn.disabled = false;
        btn.textContent = original;
        let errEl = form.querySelector('.form-error');
        if (!errEl) {
          errEl = document.createElement('p');
          errEl.className = 'form-error';
          btn.insertAdjacentElement('afterend', errEl);
        }
        errEl.textContent = `送信に失敗しました。お手数ですがお電話（${SITE_PHONE_DISPLAY}）またはメール（${SITE_EMAIL}）までご連絡ください。`;
      }
    });
  }

  return container;
}

export function createAccessPage() {
  const container = document.createElement('div');
  container.className = 'hospice-page page-container';

  container.innerHTML = `
    <section class="hospice-page-hero">
      <div class="container">
        <div class="hospice-page-hero-inner fade-up">
          <p class="stay-section-kicker">— ACCESS —</p>
          <h1 class="hospice-page-title">アクセス</h1>
          <p class="hospice-page-subtitle">
            兵庫県伊丹市へのアクセスをご案内します。
          </p>
        </div>
      </div>
    </section>

    <section class="stay-access-main section">
      <div class="container">
        <div class="hospice-access-block fade-up-scroll">
          <h2 class="hospice-company-heading">所在地・アクセス方法</h2>
          <table class="hospice-table">
            <tbody>
              <tr>
                <th>住所</th>
                <td>${SITE_ADDRESS}</td>
              </tr>
              <tr>
                <th>電話</th>
                <td><a href="tel:${SITE_PHONE_TEL}" class="hospice-table-link">${SITE_PHONE_DISPLAY}</a></td>
              </tr>
              <tr>
                <th>電車</th>
                <td>阪急伊丹線「伊丹駅」より徒歩約10分</td>
              </tr>
              <tr>
                <th>お車</th>
                <td>阪神高速11号池田線「伊丹南IC」より約10分<br>専用駐車場完備</td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top:24px;">
            <a href="${paths.contact()}" class="btn btn-primary">お問い合わせ・ご予約</a>
          </div>
        </div>

        <div class="hospice-access-note fade-up-scroll">
          <p>詳細な住所・地図はご予約確認後にご案内いたします。</p>
        </div>
      </div>
    </section>
  `;

  return container;
}
