/* Loading page ala game ZZZ: panel kiri (judul + tip), artwork di kanan,
   dan animasi "Now Loading" di pojok kanan bawah.
   Data: js/data/loading.js */

(function () {
  const root = $('#loading');
  const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];
  const tip = pickRandom(LOADING_TIPS);

  $('#loading-art').src = 'assets/img/loading/' + pickRandom(LOADING_ARTS);
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
