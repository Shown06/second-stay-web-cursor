import gsap from 'gsap';

export function initCinematicLoader() {
  const loader = document.createElement('div');
  loader.id = 'cinematic-loader';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  `;

  loader.innerHTML = `
    <div class="loader-content" style="text-align: center; color: #fff;">
      <div class="logo-reveal" style="font-family: 'Outfit', sans-serif; font-size: 3rem; font-weight: 700; opacity: 0; transform: translateY(20px);">
        SECOND STAY
      </div>
      <div class="line-reveal" style="width: 0; height: 1px; background: #d4af37; margin: 20px auto;"></div>
      <div class="sub-reveal" style="font-family: 'Noto Sans JP', sans-serif; font-size: 1rem; letter-spacing: 0.2em; opacity: 0;">
        HOTEL MANAGEMENT
      </div>
    </div>
  `;

  document.body.appendChild(loader);

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        height: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        onComplete: () => loader.remove(),
      });

      // Trigger Hero Animations
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out',
      });
    },
  });

  tl.to('.logo-reveal', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
  })
    .to(
      '.line-reveal',
      {
        width: '100px',
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '-=0.5',
    )
    .to(
      '.sub-reveal',
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.3',
    )
    .to('.loader-content', {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
    });
}
