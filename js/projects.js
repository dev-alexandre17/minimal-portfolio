window.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header-content");
    if (header) {
        gsap.from(".header-content", {
            y: -60,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(".menu_navegacao li", {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.5
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('menu-toggle');
    const panel = document.getElementById('side-panel');
    const themeBtn = document.getElementById('toggle-theme');
    const langBtn = document.getElementById('toggle-lang');

    toggle.addEventListener('click', () => {
        panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
    });

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeBtn.textContent = isDark ? '🌞 Modo Claro' : '🌗 Modo Escuro';
    });
});
