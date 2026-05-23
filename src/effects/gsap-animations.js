import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGlobalAnimations() {
  // ルート切り替え時用。初回の refresh は initPageAnimations 内で1回だけ行う
}

export function initPageAnimations() {
  // Clear any existing ScrollTriggers to prevent duplicates on route change
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Set visibility hidden elements to block opacity 0 so GSAP can animate them
  gsap.set('.fade-up, .fade-up-scroll', { autoAlpha: 0 }); // autoAlpha handles visibility & opacity

  // Wait a bit for DOM to render completely
  setTimeout(() => {
    // 1. Initial Hero Fade Up (Light & Fast)
    const heroFades = document.querySelectorAll('.fade-up');
    if (heroFades.length > 0) {
      gsap.fromTo(
        heroFades,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'transform', // Clean up inline styles after animation
        },
      );
    }

    // 2. Scroll Fade Up (Minimal & Kinetic)
    const scrollFades = document.querySelectorAll('.fade-up-scroll');
    scrollFades.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%', // Trigger slightly earlier for a snappier feel
            toggleActions: 'play none none none', // Only play once
          },
        },
      );
    });

    // 3. Simple Parallax (Pattern B - 移動量を抑え、画像が下側で止まりやすくする)
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach((img) => {
      gsap.fromTo(
        img,
        { y: '-12%' }, // 上方向の移動を抑える
        {
          y: '12%', // 下方向も抑え、全体の移動範囲を約24%に（以前は60%）
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      );
    });

    // 4. Magnetic Buttons (Pattern C - Hover enhancement)
    // We add a subtle JS-driven magnetic pull to buttons marked with 'hover-magnetic'
    const magneticButtons = document.querySelectorAll('.hover-magnetic');
    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move button slightly towards cursor
        gsap.to(btn, {
          x: x * 0.2, // Strength of pull (20%)
          y: y * 0.2,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        // Snap back
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)', // Bouncy return
        });
      });
    });

    // 5. Wave Separator — 他セクションと同じく、スクロールで左→右に線が流れるアニメーション
    const waveSeparators = document.querySelectorAll('.wave-separator svg');
    waveSeparators.forEach((svg) => {
      const paths = svg.querySelectorAll('path');
      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: svg.closest('.wave-separator'),
            start: 'top 92%',
            end: 'bottom 30%',
            scrub: 0.8,
          },
        });
      });
    });

    // Refresh layout to ensure triggers match newly rendered elements
    ScrollTrigger.refresh();
  }, 100);
}
