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

            const formData = new FormData(form);

            fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    form.reset();

                    if (feedback) {
                        feedback.style.display = "block";
                        feedback.textContent = "Mensagem enviada com sucesso!";

                        setTimeout(() => {
                            feedback.style.display = "none";
                        }, 5000);
                    }
                } else {
                    alert("Erro ao enviar. Tente novamente.");
                }
            }).catch(error => {
                alert("Erro de rede. Verifique sua conexão.");
                console.error(error);
            });
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