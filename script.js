// ===== MATRIX RAIN =====
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let cols, drops;
  const chars = '01アイウエオカキクケコサシスセソタチツテト'.split('');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  setInterval(function () {
    ctx.fillStyle = 'rgba(8,13,20,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = '13px JetBrains Mono, monospace';
    drops.forEach(function (y, i) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 18, y * 18);
      drops[i] = (y * 18 > canvas.height && Math.random() > 0.975) ? 0 : y + 1;
    });
  }, 60);
})();

// ===== TYPING ANIMATION =====
(function () {
  const roles = [
    'SOC Tier-1 Analyst',
    'Threat Monitor',
    'Incident Responder',
    'Cybersecurity Enthusiast'
  ];
  let ri = 0, ci = 0, deleting = false;
  const el = document.getElementById('typed-text');

  function type() {
    const word = roles[ri];
    el.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
    let delay = deleting ? 60 : 110;
    if (!deleting && ci > word.length) { delay = 2000; deleting = true; }
    else if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; delay = 400; }
    setTimeout(type, delay);
  }
  type();
})();

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', function () {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER =====
(function () {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  btn.addEventListener('click', function () {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });
})();

// ===== SCROLL ANIMATIONS =====
(function () {
  const els = document.querySelectorAll('.glass, .section-title, .hero-text, .hero-image-wrap');
  els.forEach(function (el) { el.classList.add('fade-up'); });

  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Animate skill bars
        const fill = e.target.querySelector('.skill-fill');
        if (fill) {
          const w = fill.getAttribute('data-width');
          setTimeout(function () { fill.style.width = w + '%'; }, 100);
        }
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { obs.observe(el); });

  // Also observe skill cards
  document.querySelectorAll('.skill-card').forEach(function (card) {
    obs.observe(card);
  });
})();

// ===== ACTIVE NAV LINK =====
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function () {
    let cur = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 100) cur = s.getAttribute('id');
    });
    navLinks.forEach(function (a) {
      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--green)' : '';
    });
  });
})();

// ===== PROFILE IMAGE FALLBACK =====
(function () {
  const img = document.getElementById('profile-img');
  if (!img) return;
  img.addEventListener('error', function () {
    img.style.display = 'none';
    const wrap = img.parentElement;
    const fallback = document.createElement('div');
    fallback.style.cssText = 'width:340px;height:340px;border-radius:50%;background:linear-gradient(135deg,#0a3d2e,#1a0533);border:4px solid var(--green);display:flex;align-items:center;justify-content:center;font-size:5rem;color:var(--green);position:relative;z-index:2;box-shadow:0 0 40px rgba(0,255,136,0.25)';
    fallback.innerHTML = '<i class="fas fa-user-shield"></i>';
    wrap.insertBefore(fallback, img.nextSibling);
  });
})();

// ===== MODALS =====
<<<<<<< HEAD
// function openModal(id) {
//   document.getElementById(id).classList.add('open');
//   document.body.style.overflow = 'hidden';
// }
function openModal(id, imagePath) {
  const modal = document.getElementById(id);
  const modalImg = modal.querySelector('img');
  
  if (imagePath) {
    modalImg.src = imagePath; // Set the image dynamically
  }
  
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

=======
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
>>>>>>> aa40ca3d2cd73811ca4293f017506f77efcf6d1a
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(function (m) {
      m.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
});
