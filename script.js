/* =========================================================
   Redamancy - Shared JavaScript
   ========================================================= */

/* ---------- Mobile Menu Toggle ---------- */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  if (!menu || !overlay) return;
  menu.classList.toggle('open');
  overlay.classList.toggle('on');
  document.body.classList.toggle('menu-open');
}

function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  if (!menu || !overlay) return;
  menu.classList.remove('open');
  overlay.classList.remove('on');
  document.body.classList.remove('menu-open');
}

/* ---------- Highlight active nav link based on current page ---------- */
function setActiveNav() {
  let path = window.location.pathname.split('/').pop();
  if (!path || path === '') path = 'index.html';

  document.querySelectorAll('.nav-links a, .mob-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop();
    if (linkFile === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ---------- Gallery filter (Photography page) ---------- */
function filterG(cat, btn) {
  document.querySelectorAll('.gf').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gi').forEach(i => {
    const show = cat === 'all' || i.dataset.cat === cat;
    i.style.display = show ? '' : 'none';
    if (show) {
      i.style.animation = 'none';
      void i.offsetHeight;
      i.style.animation = '';
    }
  });
}

/* ---------- Contact form submit (demo) ----------
   Bug fix: previous version used textContent during the "Sending…" state,
   which wiped the button's child SVG. Now we cache and restore innerHTML. */
function doSubmit(btn) {
  if (btn.dataset.busy === '1') return;       // prevent double-submits
  btn.dataset.busy = '1';

  const originalHTML = btn.innerHTML;          // cache the full button content
  btn.disabled = true;
  btn.innerHTML = 'Sending…';

  setTimeout(() => {
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = 'var(--gold-light)';
    setTimeout(() => {
      btn.innerHTML = originalHTML;            // restore exactly what was there
      btn.disabled = false;
      btn.style.background = '';
      btn.dataset.busy = '0';
    }, 3000);
  }, 1400);
}

/* ---------- Scroll reveal animation ----------
   Bug fix: previously observed elements stayed observed forever.
   Now we unobserve after reveal so the observer doesn't keep firing. */
function initReveal() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---------- Close mobile menu on Escape key ---------- */
function initKeyboardClose() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const menu = document.getElementById('mobileMenu');
      if (menu && menu.classList.contains('open')) closeMenu();
    }
  });
}

/* ---------- Close menu if window grows past mobile breakpoint ---------- */
function initResizeHandler() {
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (window.innerWidth > 768) closeMenu();
    }, 150);
  });
}

/* ---------- Update CSS viewport-height variable for true 100vh on mobile ----------
   iOS Safari / some Android browsers include the URL bar in 100vh.
   Setting --vh lets you use calc(var(--vh) * 100) for a true full-screen hero. */
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

/* ---------- Smooth-scroll for in-page anchors (#book on contact page, etc.) ----------
   Bug fix: previously these links jumped instantly because of the fixed nav.
   This handler accounts for nav height so the target lands below it. */
function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('nav.main-nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------- Initialise everything on DOM ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initReveal();
  initKeyboardClose();
  initResizeHandler();
  initAnchorScroll();
  setVH();

  const overlay = document.getElementById('overlay');
  if (overlay) overlay.addEventListener('click', closeMenu);
});

window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

