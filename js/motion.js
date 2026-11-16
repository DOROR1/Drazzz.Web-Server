/* Animasi saat scroll: scroll halus, teks muncul per kata, kartu dan gambar muncul bertahap,
   parallax foto hero, dan garis progres di atas halaman.
   Semua dimatikan otomatis bila perangkat memilih "kurangi gerakan" (prefers-reduced-motion). */

const motionEnabled = !prefersReducedMotion;
if (motionEnabled) document.documentElement.classList.add('motion');

/* ---------- 1. Scroll halus (inersia) untuk mouse/trackpad ---------- */
function startSmoothScroll() {
  let target = scrollY;
  let current = scrollY;
  let running = false;

  const maxScroll = () => document.documentElement.scrollHeight - innerHeight;
  const clamp = (value) => Math.max(0, Math.min(maxScroll(), value));

  function frame() {
    current += (target - current) * 0.11;
    if (Math.abs(target - current) < 0.4) {
      current = target;
      running = false;
    }
    scrollTo(0, current);
    if (running) requestAnimationFrame(frame);
  }

  function goTo(value) {
    target = clamp(value);
    if (!running) {
      running = true;
      requestAnimationFrame(frame);
    }
  }

  addEventListener('wheel', (event) => {
    const skip = event.ctrlKey
      || Math.abs(event.deltaX) > Math.abs(event.deltaY)
      || document.querySelector('dialog[open]')
      || event.target.closest('select, textarea, input');
    if (skip) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? innerHeight : 1;
    goTo(target + event.deltaY * unit);
  }, { passive: false });

  /* scroll lewat keyboard atau scrollbar: samakan posisi */
  addEventListener('scroll', () => {
    if (!running) target = current = scrollY;
  }, { passive: true });

  /* klik menu: meluncur halus ke bagian tujuan */
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const section = document.getElementById(link.getAttribute('href').slice(1));
      if (!section) return;
      event.preventDefault();
      goTo(section.getBoundingClientRect().top + scrollY - 16);
      history.replaceState(null, '', link.getAttribute('href'));
    });
  });
}

/* ---------- 2. Teks muncul per kata ---------- */
const TEXT_TARGETS = '.sec h2, .about p, .contact h3, .contact p';

/* Bungkus tiap kata dalam <span class="w"><span>kata</span></span> (hanya teks langsung, bukan elemen anak) */
function splitWords(element) {
  if (element.querySelector('.w')) return;
  let index = 0;
  [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part.trim()) { fragment.append(part); return; }
      const outer = document.createElement('span');
      const inner = document.createElement('span');
      outer.className = 'w';
      outer.style.setProperty('--i', index++);
      inner.textContent = part;
      outer.append(inner);
      fragment.append(outer);
    });
    node.replaceWith(fragment);
  });
}

/* ---------- 3. Pengamat: tandai elemen saat masuk layar ---------- */
const revealObserver = motionEnabled ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    /* elemen yang sudah terlewat (di atas layar) juga langsung ditampilkan */
    if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return;
    entry.target.classList.add('is-in');
    entry.target.dataset.revealed = '1';
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }) : null;

function prepareText() {
  if (!motionEnabled) return;
  $$(TEXT_TARGETS).forEach((element) => {
    const wasRevealed = element.dataset.revealed === '1';
    splitWords(element);
    element.classList.add('text-reveal');
    if (wasRevealed) element.classList.add('is-in');   /* teks diganti bahasa: tidak perlu animasi ulang */
    else revealObserver.observe(element);
  });
}

/* Kartu/gambar muncul bertahap (stagger). Dipanggil juga oleh showcase.js dan agent-build.js */
function revealItems(elements) {
  if (!motionEnabled) return;
  [...elements].forEach((element, index) => {
    element.style.setProperty('--i', index);
    element.classList.add('item-reveal');
    revealObserver.observe(element);
  });
}
const revealChildren = (container) => container && revealItems(container.children);

/* ---------- 4. Parallax dan garis progres ---------- */
const parallaxItems = [
  { selector: '.art', speed: 0.1 },     /* foto hero tertinggal pelan */
  { selector: '.copy', speed: -0.06 },  /* teks hero naik sedikit lebih cepat */
];

function initScrollEffects() {
  document.body.insertAdjacentHTML('beforeend', '<div class="scroll-progress" id="scroll-progress"></div>');
  const progress = $('#scroll-progress');
  const items = parallaxItems.map((item) => ({ element: $(item.selector), speed: item.speed })).filter((item) => item.element);
  let ticking = false;

  function update() {
    ticking = false;
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${maxScroll > 0 ? scrollY / maxScroll : 0})`;
    items.forEach(({ element, speed }) => {
      const box = element.getBoundingClientRect();
      if (box.bottom < -200 || box.top > innerHeight + 200) return;
      element.style.translate = `0 ${(innerHeight / 2 - (box.top + box.height / 2)) * speed}px`;
    });
  }

  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

/* ---------- 5. Kartu miring mengikuti kursor ---------- */
function enableTilt(container, selector, maxTilt = 6) {
  if (!motionEnabled || !matchMedia('(pointer: fine)').matches) return;
  const reset = (card) => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); };

  container.addEventListener('pointermove', (event) => {
    const card = event.target.closest(selector);
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty('--ry', ((event.clientX - box.left) / box.width - 0.5) * maxTilt * 2 + 'deg');
    card.style.setProperty('--rx', (0.5 - (event.clientY - box.top) / box.height) * maxTilt * 2 + 'deg');
  });
  container.addEventListener('pointerout', (event) => {
    const card = event.target.closest(selector);
    if (card && !card.contains(event.relatedTarget)) reset(card);
  });
}

/* ---------- Mulai ---------- */
initScrollEffects();
if ($('#video-grid')) enableTilt($('#video-grid'), '.video-card');
if (motionEnabled) {
  prepareText();
  revealItems($$('.two > *, .skills li, .steps li, .contact.panel, footer'));
  document.addEventListener('app-language-change', prepareText);   /* teks diganti bahasa: pecah ulang */
  if (matchMedia('(pointer: fine)').matches) {
    document.documentElement.classList.add('has-smooth');
    startSmoothScroll();
  }
}
