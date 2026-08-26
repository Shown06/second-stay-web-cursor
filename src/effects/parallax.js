export function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Parallax for Hero Section
        const hero = document.querySelector('.hero');
        if (hero) {
            // Move background slower than scroll
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;

            // Move content slightly faster/slower
            const content = hero.querySelector('.hero-content');
            if (content) {
                content.style.transform = `translateY(${scrolled * 0.3}px)`;
                content.style.opacity = 1 - (scrolled / 700);
            }
        }

        // Parallax for other elements with .parallax class
        document.querySelectorAll('.parallax').forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const rect = el.getBoundingClientRect();
            // Only animate if in view
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (window.innerHeight - rect.top) * speed;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    });
}
