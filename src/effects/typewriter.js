export function initTypewriter() {
    const elements = document.querySelectorAll('.typewriter');

    elements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.classList.add('typing');

        let i = 0;
        const speed = 100; // ms per char

        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                el.classList.remove('typing');
            }
        }

        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    type();
                    observer.unobserve(el);
                }
            });
        });

        observer.observe(el);
    });
}
