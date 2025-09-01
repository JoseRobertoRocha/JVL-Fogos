// ===== Ano no footer =====
document.getElementById("y").textContent = new Date().getFullYear();

// ===== Menu Mobile =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("open");
});

// ===== Canvas de fogos =====
const canvas = document.getElementById("fireworks-canvas");
const ctx = canvas.getContext("2d");
let fireworks = [], particles = [], running = true;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Firework {
  constructor(x, y, targetY, color) {
    this.x = x; this.y = y; this.targetY = targetY; this.color = color;
    this.speed = 5; this.exploded = false;
  }
  update() {
    if (this.y > this.targetY) { this.y -= this.speed; }
    else { this.explode(); this.exploded = true; }
  }
  explode() {
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(this.x, this.y, this.color));
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}
class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y; this.color = color;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 4 + 1; this.life = 100;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + 0.3;
    this.speed *= 0.96; this.life--;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(this.life / 100, 0);
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}
function animate() {
  if (!running) return;
  ctx.fillStyle = "rgba(7,10,18,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((f, i) => { f.update(); f.draw(); if (f.exploded) fireworks.splice(i, 1); });
  particles.forEach((p, i) => { p.update(); p.draw(); if (p.life <= 0) particles.splice(i, 1); });
  requestAnimationFrame(animate);
}
setInterval(() => {
  let x = Math.random() * canvas.width;
  let color = `hsl(${Math.random() * 360},100%,50%)`;
  fireworks.push(new Firework(x, canvas.height, Math.random() * canvas.height / 2 + 100, color));
}, 1000);
animate();

// ===== Explosão ao clicar em botões/links =====
function explodeAt(x, y) {
  let color = `hsl(${Math.random() * 360},100%,50%)`;
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle(x, y, color));
  }
}

// Pega apenas botões e links que você tem no HTML
const clickable = document.querySelectorAll(
  "a.btn, a.cta-btn, .nav-links a, .hero-actions a"
);

clickable.forEach(el => {
  el.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    explodeAt(x, y);
  });
});

// === Popup de segurança ===
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupClose = document.getElementById("popup-close");

// Quando clicar no card, abre popup
document.querySelectorAll("#produtos .card").forEach(card => {
  card.addEventListener("click", () => {
    const info = card.getAttribute("data-info");
    popupText.textContent = info;
    popup.style.display = "flex";
  });
});

// Fechar popup
popupClose.addEventListener("click", () => {
  popup.style.display = "none";
});

// Fechar clicando fora
popup.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

function adaptScreen() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const ratio = (w / h).toFixed(2);

  // Definir no :root
  document.documentElement.style.setProperty("--screen-w", w + "px");
  document.documentElement.style.setProperty("--screen-h", h + "px");
  document.documentElement.style.setProperty("--screen-ratio", ratio);
}

// inicializar e reagir ao resize
window.addEventListener("load", adaptScreen);
window.addEventListener("resize", adaptScreen);
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let index = 0;
  let autoSlide;

  function showTestimonial(i) {
    testimonials.forEach((t, idx) => {
      t.classList.toggle("active", idx === i);
    });
  }

  function next() {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  }

  function prev() {
    index = (index - 1 + testimonials.length) % testimonials.length;
    showTestimonial(index);
  }

  nextBtn.addEventListener("click", () => {
    next();
    resetAutoSlide();
  });
  prevBtn.addEventListener("click", () => {
    prev();
    resetAutoSlide();
  });

  function startAutoSlide() {
    autoSlide = setInterval(next, 5000); // troca a cada 5s
  }
  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // inicializa
  showTestimonial(index);
  startAutoSlide();
});