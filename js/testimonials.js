gsap.from("#main-header", {
    y: -60,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

gsap.from("#main-header .menu_navegacao li", {
    opacity: 0,
    y: -20,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.15,
    delay: 0.5
});

const sections = gsap.utils.toArray(".slide");
let currentIndex = 0;

gsap.set(sections, { visibility: "hidden" });
gsap.set(sections[0], { visibility: "visible" });

const wrapIndex = gsap.utils.wrap(0, sections.length);

function gotoSection(index) {
    currentIndex = wrapIndex(index);
    gsap.set(sections, { visibility: "hidden" });
    gsap.set(sections[currentIndex], { visibility: "visible" });
}

Observer.create({
    type: "wheel,touch,pointer",
    preventDefault: true,
    wheelSpeed: -1,
    onUp: () => gotoSection(currentIndex + 1),
    onDown: () => gotoSection(currentIndex - 1),
    tolerance: 10,
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowUp") gotoSection(currentIndex - 1);
    if (["ArrowDown", "Space", "Enter"].includes(e.code)) {
        gotoSection(currentIndex + 1);
    }
});