/* Transisi pindah halaman: pita miring menutup layar, halaman baru dimuat, lalu pita menyapu keluar.
   Warna pita mengikuti agent terpilih (--accent). Dimatikan otomatis bila perangkat memilih "kurangi gerakan".
   Untuk mematikan sendiri: hapus <script src="js/transition.js"> di keempat halaman. */

const pageWipe = document.createElement('div');
pageWipe.className = 'pt pt-reset';
pageWipe.setAttribute('aria-hidden', 'true');
pageWipe.innerHTML = '<i></i><i><img src="assets/img/logo_white.png" alt=""></i>';
document.body.append(pageWipe);

const rootClass = document.documentElement.classList;
let leaving = false;

/* Halaman baru dibuka dalam keadaan tertutup (kelas pt-enter), lalu disapu keluar */
if (rootClass.contains('pt-enter')) {
  addEventListener('DOMContentLoaded', () => setTimeout(() => requestAnimationFrame(() => {
    pageWipe.classList.remove('pt-reset');
    pageWipe.classList.add('is-out');
    rootClass.remove('pt-enter');
  }), 80));
}

/* Tombol Back dari cache browser: pastikan pita tidak tertinggal menutup layar */
addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  leaving = false;
  rootClass.remove('pt-enter');
  pageWipe.className = 'pt pt-reset';
});

function isPageLink(event, link) {
  if (!link || event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (link.target === '_blank' || link.hasAttribute('download')) return false;
  const url = new URL(link.href, location.href);
  return url.origin === location.origin && /(\.html?|\/)$/.test(url.pathname) && url.pathname !== location.pathname;
}

if (!prefersReducedMotion) {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!isPageLink(event, link) || leaving) return;
    event.preventDefault();
    leaving = true;
    try { sessionStorage.setItem('drazzz-pt', '1'); } catch (error) { /* abaikan */ }
    pageWipe.classList.remove('pt-reset', 'is-out');
    pageWipe.classList.add('is-in');
    setTimeout(() => { location.href = link.href; }, 500);
  });
}
