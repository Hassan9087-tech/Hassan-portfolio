// =============================================
// Hassan Shahzada — Portfolio JavaScript
// =============================================

// Custom Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .ach-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '52px';
    ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('progress').style.width = scrolled + '%';
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.close-menu').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Typing Effect
const words = ['Cloud Enthusiast', 'AWS Builder', 'Youth Diplomat', 'Content Creator', 'Problem Solver'];
let wi = 0, ci = 0, deleting = false;
const typingEl = document.getElementById('typing');

function type() {
  const word = words[wi];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typingEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars on reveal
      const bar = e.target.querySelector('.skill-bar');
      if (bar) {
        const pct = e.target.dataset.skill;
        setTimeout(() => bar.style.width = pct + '%', 200);
      }
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Floating Particles Generator
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDuration = (8 + Math.random() * 12) + 's';
  p.style.animationDelay = (-Math.random() * 20) + 's';
  p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
  p.style.opacity = 0.1 + Math.random() * 0.3;
  particlesContainer.appendChild(p);
}

// Achievement Cards — Mouse Glow Effect
document.querySelectorAll('.ach-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty('--x', x + '%');
    card.style.setProperty('--y', y + '%');
  });
});

// Stagger Reveal Delays for Cards
document.querySelectorAll('.ach-grid .ach-card, .skills-grid .skill-card, .vol-grid .vol-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.1) + 's';
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 50 ? 'rgba(5,8,16,0.95)' : 'rgba(5,8,16,0.7)';
});
