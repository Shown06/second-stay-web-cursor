export function createCarousel(images) {
    const container = document.createElement('div');
    container.className = 'carousel-container fade-in';

    const slidesHtml = images.map((img, index) => `
    <div class="carousel-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${img.url}');">
      <div class="carousel-caption">
        <h3>${img.title}</h3>
        <p>${img.desc}</p>
      </div>
    </div>
  `).join('');

    container.innerHTML = `
    <div class="carousel-track">
      ${slidesHtml}
    </div>
    <button class="carousel-btn prev">&lt;</button>
    <button class="carousel-btn next">&gt;</button>
    <div class="carousel-indicators">
      ${images.map((_, i) => `<span class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
    </div>
  `;

    // Logic
    let current = 0;
    const slides = container.querySelectorAll('.carousel-slide');
    const indicators = container.querySelectorAll('.indicator');

    function showSlide(index) {
        slides[current].classList.remove('active');
        indicators[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        indicators[current].classList.add('active');
    }

    container.querySelector('.next').addEventListener('click', () => showSlide(current + 1));
    container.querySelector('.prev').addEventListener('click', () => showSlide(current - 1));

    indicators.forEach(ind => {
        ind.addEventListener('click', (e) => showSlide(parseInt(e.target.dataset.index)));
    });

    // Auto play
    setInterval(() => showSlide(current + 1), 5000);

    return container;
}
