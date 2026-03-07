export function createFacilitiesPage() {
  const container = document.createElement('div');
  container.className = 'page-container fade-in';

  // ── Hero Section ──
  const heroSection = document.createElement('div');
  heroSection.className = 'page-hero';
  heroSection.style.cssText = `
    background-image: url('/assets/t2stay.png');
    height: 60vh;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-bottom: var(--spacing-xl);
  `;
  heroSection.innerHTML = `
    <div class="overlay" style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);"></div>
    <div class="container text-center" style="position:relative;z-index:2;">
      <h1 class="hero-title" style="font-size:3.5rem;margin-bottom:1rem;">Our Facilities</h1>
      <p class="hero-subtitle" style="font-size:1.2rem;font-weight:300;">非日常を彩る、空間のコレクション</p>
    </div>
  `;
  container.appendChild(heroSection);

  // ── Main Gallery Section ──
  const gallerySection = document.createElement('section');
  gallerySection.className = 'section';
  const galleryContainer = document.createElement('div');
  galleryContainer.className = 'container';
  galleryContainer.innerHTML = '<div class="text-center py-xl"><p>Loading gallery...</p></div>';
  gallerySection.appendChild(galleryContainer);
  container.appendChild(gallerySection);

  // ── Lightbox ──
  const lightbox = document.createElement('div');
  lightbox.className = 'facilities-lightbox';
  lightbox.innerHTML = `
    <button class="lb-btn lb-close" aria-label="Close">&times;</button>
    <button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>
    <button class="lb-btn lb-next" aria-label="Next">&#8250;</button>
    <div class="lb-category"></div>
    <img id="lb-img" alt="" />
    <div class="lb-counter"></div>
  `;
  container.appendChild(lightbox);

  // ── State ──
  let categories = [];
  let activeCategory = null;
  let currentImages = [];
  let currentIdx = 0;

  // ── Fetch Manifest & Build UI ──
  fetch('/assets/facilities/manifest.json')
    .then(r => {
      if (!r.ok) throw new Error('Manifest not found');
      return r.json();
    })
    .then(data => {
      categories = data.categories || [];
      galleryContainer.innerHTML = '';

      if (categories.length === 0) {
        galleryContainer.innerHTML = `
          <div class="text-center py-xl">
            <h3>準備中</h3>
            <p>施設写真は現在準備中です。</p>
          </div>`;
        return;
      }

      // — Tab bar —
      const tabBar = document.createElement('div');
      tabBar.className = 'facilities-tabs';

      categories.forEach((cat, i) => {
        const tab = document.createElement('button');
        tab.className = 'facilities-tab';
        tab.textContent = cat.label;
        tab.dataset.index = i;
        if (i === 0) tab.classList.add('active');
        tab.addEventListener('click', () => switchCategory(i));
        tabBar.appendChild(tab);
      });

      galleryContainer.appendChild(tabBar);

      // — Description area —
      const descEl = document.createElement('p');
      descEl.className = 'facilities-description';
      galleryContainer.appendChild(descEl);

      // — Grid wrapper —
      const gridWrapper = document.createElement('div');
      gridWrapper.id = 'facilities-grid-wrapper';
      galleryContainer.appendChild(gridWrapper);

      // Show first category
      switchCategory(0);
    })
    .catch(err => {
      console.error('Gallery error:', err);
      galleryContainer.innerHTML = `
        <div class="text-center py-xl">
          <h3>Gallery Error</h3>
          <p>${err.message}</p>
        </div>`;
    });

  // ── Switch Category ──
  function switchCategory(index) {
    const cat = categories[index];
    if (!cat) return;
    activeCategory = cat;

    // Update tabs
    const tabs = galleryContainer.querySelectorAll('.facilities-tab');
    tabs.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });

    // Scroll active tab into view (for mobile)
    const activeTab = tabs[index];
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    // Update description
    const descEl = galleryContainer.querySelector('.facilities-description');
    descEl.style.animation = 'none';
    descEl.offsetHeight; // force reflow
    descEl.style.animation = '';
    descEl.textContent = cat.description;

    // Build image paths
    currentImages = cat.images.map(f => `/assets/facilities/${f}`);

    // Build grid with fade animation
    const wrapper = galleryContainer.querySelector('#facilities-grid-wrapper');
    wrapper.style.opacity = '0';
    wrapper.style.transition = 'opacity 0.25s ease';

    setTimeout(() => {
      wrapper.innerHTML = '';
      const grid = document.createElement('div');
      grid.className = 'facilities-grid';

      currentImages.forEach((src, idx) => {
        const item = document.createElement('div');
        item.className = 'facilities-grid-item';

        const img = document.createElement('img');
        img.src = src;
        img.alt = `${cat.label} ${idx + 1}`;
        img.loading = 'lazy';
        item.appendChild(img);

        item.addEventListener('click', () => openLightbox(idx));

        grid.appendChild(item);

        // Staggered fade-in
        setTimeout(() => {
          item.classList.add('visible');
        }, 40 + idx * 50);
      });

      wrapper.appendChild(grid);
      wrapper.style.opacity = '1';
    }, 250);
  }

  // ── Lightbox Logic ──
  function openLightbox(idx) {
    currentIdx = idx;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const img = lightbox.querySelector('#lb-img');
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = currentImages[currentIdx];
      img.alt = `${activeCategory?.label || ''} ${currentIdx + 1}`;
      img.style.opacity = '1';
    }, 150);
    lightbox.querySelector('.lb-counter').textContent = `${currentIdx + 1} / ${currentImages.length}`;
    lightbox.querySelector('.lb-category').textContent = activeCategory?.label || '';
  }

  lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightbox.querySelector('.lb-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
  });
  lightbox.querySelector('.lb-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % currentImages.length;
    updateLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIdx = (currentIdx - 1 + currentImages.length) % currentImages.length;
      updateLightbox();
    }
    if (e.key === 'ArrowRight') {
      currentIdx = (currentIdx + 1) % currentImages.length;
      updateLightbox();
    }
  });

  return container;
}
