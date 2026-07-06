// ---------- Typing effect ----------
const roles = [
  'Associate System Engineer',
  'Full-Stack Developer',
  'Backend & API Specialist',
  'React Enthusiast'
];

const typedEl = document.getElementById('typed');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 85);
}

typeLoop();

// ---------- Navbar scroll state ----------
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');

function handleScroll() {
  const scrolled = window.scrollY > 20;
  navbar.classList.toggle('scrolled', scrolled);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
  });
});

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  const offset = window.scrollY + 120;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle('active', anchor.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
