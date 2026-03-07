export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  header.innerHTML = `
    <div class="container header-container">
      <a href="/" class="logo">SECOND STAY</a>
      <button class="menu-toggle" aria-label="Toggle Menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <nav class="nav-menu">
        <button class="menu-close" aria-label="Close Menu">
          <span class="line"></span>
          <span class="line"></span>
        </button>
        <a href="#top" class="nav-link">トップ</a>
        <a href="#company" class="nav-link">会社情報</a>
        <a href="#business" class="nav-link">事業紹介</a>
        <a href="#facilities" class="nav-link">施設紹介</a>
        <a href="#blog" class="nav-link">お知らせ</a>
        <a href="#contact" class="nav-link">お問い合わせ</a>
      </nav>
    </div>
  `;

  // Scroll Progress Indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  header.appendChild(progressBar);

  // Sticky Header & Progress Logic
  window.addEventListener('scroll', () => {
    // Sticky
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });

  // Mobile Menu Logic
  const toggle = header.querySelector('.menu-toggle');
  const nav = header.querySelector('.nav-menu');

  toggle.addEventListener('click', () => {
    nav.classList.add('active');
    toggle.style.display = 'none';
  });

  const closeBtn = header.querySelector('.menu-close');
  closeBtn.addEventListener('click', () => {
    nav.classList.remove('active');
    toggle.style.display = '';
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.style.display = '';
    });
  });

  return header;
}
