import { BOOKING_LINKS } from '../config/site.js';

/**
 * 宿泊予約サイトへの導線（Airbnb / Booking.com / 直接予約）。
 * stay-cta（濃色）・通常背景の両方で使えるよう白カードで構成。
 * @param {{ label?: string }} [options]
 * @returns {string} HTML 文字列
 */
export function bookingButtonsHTML(options = {}) {
  const { label = '3つの予約サイトからお選びいただけます' } = options;
  const order = ['airbnb', 'booking', 'airhost'];

  const cards = order
    .map((key) => {
      const { url, name, desc } = BOOKING_LINKS[key];
      return `
      <a href="${url}" class="stay-booking-btn" target="_blank" rel="noopener noreferrer">
        <span class="stay-booking-name">${name}</span>
        <span class="stay-booking-desc">${desc}</span>
        <span class="stay-booking-arrow" aria-hidden="true">→</span>
      </a>`;
    })
    .join('');

  return `
    <div class="stay-booking fade-up-scroll">
      ${label ? `<p class="stay-booking-label">${label}</p>` : ''}
      <div class="stay-booking-grid">${cards}</div>
    </div>`;
}
