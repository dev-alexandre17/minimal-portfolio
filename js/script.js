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

const textToType = `Olá, eu sou Alexandre Gonçalo, um desenvolvedor backend apaixonado por criar experiências digitais únicas e funcionais.
Neste portfólio, você encontrará alguns dos meus melhores projetos, onde busquei sempre combinar estética, funcionalidade e usabilidade para oferecer o melhor resultado aos usuários.
Sinta-se à vontade para explorar minha página e descobrir mais sobre meu trabalho.`;

const typedTextElement = document.getElementById("typed-text");
let i = 0;

function typeText() {
  if (i < textToType.length) {
    typedTextElement.innerHTML += textToType.charAt(i);
    i++;
    setTimeout(typeText, 30);
  }
}
typeText();

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = document.getElementById("hero").offsetHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById("hero").offsetHeight;
});

const colors = ["#DDEFE2", "#B7C4B2", "#6B8F71", "#1F2E2B"];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 120; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

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
