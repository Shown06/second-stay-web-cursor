export function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .nav-link, .logo');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            // Add a transition only on mouseleave for snap-back effect
            btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            setTimeout(() => {
                btn.style.transition = ''; // Remove transition so mousemove is instant
            }, 500);
        });
    });
}
