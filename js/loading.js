/* Loading page ala game ZZZ: panel kiri (judul + tip), artwork di kanan,
   dan animasi "Now Loading" di pojok kanan bawah.
   Data: js/data/loading.js */

/* true = layar loading hanya tampil di halaman pertama tiap kunjungan; halaman berikutnya langsung terbuka.
   Ubah ke false bila ingin loading tampil di setiap halaman. */
const LOADING_ONCE_PER_SESSION = true;

(function () {
  const root = $('#loading');
  let seen = false;
  try {
    seen = sessionStorage.getItem('drazzz-loading-seen') === '1';
    sessionStorage.setItem('drazzz-loading-seen', '1');
  } catch (error) { /* penyimpanan browser tidak tersedia: loading tampil seperti biasa */ }
  if (LOADING_ONCE_PER_SESSION && seen) { root.remove(); return; }
  document.documentElement.classList.remove('skip-loading');

  const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];
  const tip = pickRandom(LOADING_TIPS);

  const art = pickRandom(LOADING_ARTS);
  $('#loading-art').src = 'assets/img/loading/' + art.file;
  $('#loading-art').style.objectPosition = art.position || '50% 25%';
  $('#loading-icon').src = `assets/img/svg/icon_${tip.icon}.svg`;
  $('#loading-tip').textContent = tip.text;
  $('#loading-no').textContent = 'No.' + tip.no;
  $('#loading-category').textContent = tip.category;

  const MIN_DURATION = prefersReducedMotion ? 300 : 3000;
  let minTimePassed = false;
  let pageLoaded = document.readyState === 'complete';
  let closed = false;

  function close() {
    if (closed) return;
    closed = true;
    root.classList.add('is-leaving');
    setTimeout(() => root.remove(), prefersReducedMotion ? 400 : 850);
  }

  function closeWhenReady() {
    if (minTimePassed && pageLoaded) close();
  }

  addEventListener('load', () => { pageLoaded = true; closeWhenReady(); });
  setTimeout(() => { minTimePassed = true; closeWhenReady(); }, MIN_DURATION);
  root.addEventListener('click', close);   /* klik untuk melewati */
})();
