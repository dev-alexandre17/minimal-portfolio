window.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#main-header");
    if (header) {
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
    }

    if (document.querySelector(".contact-section")) {
        gsap.from(".contact-section h2", {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.out"
        });

        gsap.from(".contact-description", {
            opacity: 0,
            y: -10,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out"
        });

        gsap.from(".contact-form input, .contact-form textarea, .contact-form select, .contact-form button", {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.4,
            ease: "power2.out"
        });

        gsap.from(".contact-links a", {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.15,
            delay: 1,
            ease: "power2.out"
        });

        
        const form = document.querySelector(".contact-form");
        const feedback = document.getElementById("formFeedback");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (feedback) {
                feedback.style.display = "block";

                gsap.to(feedback, {
                    opacity: 1,
                    y: -10,
                    duration: 0.6,
                    ease: "power2.out"
                });

                setTimeout(() => {
                    gsap.to(feedback, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            feedback.style.display = "none";
                        }
                    });
                }, 5000);
            }
        });
    }
});