/* Halaman Beranda: ringkasan di bawah tombol hero dan kartu "Jelajahi".
   Datanya diambil dari js/data/videos.js dan js/data/agents.js, jadi ikut berubah otomatis. */

function renderHome() {
  const total = SHOWCASE.reduce((sum, mode) => sum + mode.videos.length, 0);
  const latest = latestUpload();
  const latestDate = latest ? formatDate(latest.date.slice(0, 10)) : '';
  const stat = (value, label) => `<div><b>${value}</b><span>${label}</span></div>`;

  $('#hero-stats').innerHTML = stat(total, t('statVideos')) + stat(AGENTS.length, t('statAgents'))
    + (latest ? stat(latestDate, t('statLatest')) : '');

  if (latest) {
    $('#explore-thumb').src = 'assets/img/' + latest.image;
    $('#explore-thumb').alt = 'Thumbnail ' + latest.title;
  }
  $('#explore-showcase-meta').textContent = t('videoCount', total) + (latest ? ` · ${t('statLatest')} ${latestDate}` : '');
  $('#explore-build-meta').textContent = t('agentCount', AGENTS.length);
}

$('#explore-avatars').innerHTML = AGENTS
  .map((agent) => `<img src="assets/img/b/${agent.id}_av.webp" alt="${agent.name}" loading="lazy">`).join('');

revealItems($$('.explore-card'));
renderHome();
document.addEventListener('app-language-change', renderHome);

/* Foto hero + pemilih agent: tiap agent punya foto dan warna tema sendiri (dibawa ke halaman lain lewat js/theme.js) */
const heroArt = $('#hero-art');
let heroId = null;

function showHeroAgent(agent, instant = false) {
  if (agent.id === heroId) return;
  heroId = agent.id;
  $$('.pick').forEach((button) => button.setAttribute('aria-pressed', button.dataset.id === agent.id));
  $('#hero-name').textContent = agent.name;
  $('#hero-faction').textContent = agent.faction || '';
  const src = `assets/img/hero/${agent.id}.webp`;
  const apply = () => { heroArt.src = src; heroArt.alt = `Ilustrasi agent ${agent.name} dari Zenless Zone Zero`; heroArt.style.opacity = 1; };
  if (instant || prefersReducedMotion) { apply(); return; }
  const preload = new Image();
  preload.onload = () => {
    if (heroId !== agent.id) return;   /* agent sudah diganti lagi */
    heroArt.style.opacity = 0;
    setTimeout(apply, 200);
  };
  preload.src = src;
}

$('#hero-picker').innerHTML = AGENTS.map((agent) => `
  <button class="pick" type="button" data-id="${agent.id}" aria-pressed="false" title="${agent.name}" aria-label="${agent.name}">
    <img src="assets/img/b/${agent.id}_av.webp" alt="">
  </button>`).join('');

$('#hero-picker').addEventListener('click', (event) => {
  const button = event.target.closest('.pick');
  if (!button) return;
  const agent = AGENTS.find((item) => item.id === button.dataset.id);
  selectAgent(agent);
  showHeroAgent(agent);
});

showHeroAgent(AGENTS.find((agent) => agent.id === savedAgent().id) || AGENTS.find((agent) => agent.id === DEFAULT_AGENT.id), true);

$('#hero-picker').addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
  const step = event.key === 'ArrowRight' ? 1 : AGENTS.length - 1;
  const next = AGENTS[(AGENTS.findIndex((agent) => agent.id === heroId) + step) % AGENTS.length];
  selectAgent(next);
  showHeroAgent(next);
  $(`.pick[data-id="${next.id}"]`).focus();
  event.preventDefault();
});
