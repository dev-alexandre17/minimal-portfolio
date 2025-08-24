gsap.from(".main-header", {
    y: -60,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

gsap.from(".main-header .menu_navegacao li", {
    opacity: 0,
    y: -20,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.15,
    delay: 0.5
});

window.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(InertiaPlugin);

    let oldX = 0, oldY = 0, deltaX = 0, deltaY = 0;

    const root = document.querySelector('.mwg_effect000');
    root.addEventListener("mousemove", (e) => {
        deltaX = e.clientX - oldX;
        deltaY = e.clientY - oldY;
        oldX = e.clientX;
        oldY = e.clientY;
    });

    root.querySelectorAll('.media').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const tl = gsap.timeline({ onComplete: () => tl.kill() });
            tl.timeScale(1.2);

            const image = el.querySelector('img');

            tl.to(image, {
                inertia: {
                    x: { velocity: deltaX * 30, end: 0 },
                    y: { velocity: deltaY * 30, end: 0 }
                },
                duration: 0.4
            });

            tl.fromTo(image, { rotate: 0 }, {
                duration: 0.4,
                rotate: (Math.random() - 0.5) * 30,
                yoyo: true,
                repeat: 1,
                ease: 'power1.inOut'
            }, '<');
        });
    });
});

console.log("Arquivo JS carregado!");
