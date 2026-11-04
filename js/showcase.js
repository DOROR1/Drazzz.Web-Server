/* Bagian Showcase: kartu kategori -> filter + urutan -> grid thumbnail -> lightbox + link video.
   Data: js/data/videos.js */

const lightbox = {
  dialog: $('#lightbox'),
  image: $('#lightbox-image'),
  caption: $('#lightbox-caption'),
  link: $('#lightbox-link'),
};

/* Pilihan yang sedang aktif */
const view = { modeIndex: 0, group: '', order: 'newest' };

const thumbnailPath = (video) => 'assets/img/' + video.image;
const videoCaption = (video) => video.title + (video.points ? ` · ${video.points} PTS` : '');
const timeOf = (video) => (video.date ? new Date(video.date).getTime() : 0);   /* tanpa tanggal = paling lama */

function openLightbox(video) {
  lightbox.image.src = thumbnailPath(video);
  lightbox.image.alt = 'Thumbnail ' + video.title;
  lightbox.caption.textContent = videoCaption(video) + (video.date ? ' · ' + formatDate(video.date) : '');
  lightbox.link.href = video.link || TIKTOK_PROFILE;
  lightbox.link.textContent = video.link ? 'Tonton video di TikTok' : 'Buka TikTok @draazzzy';
  lightbox.dialog.showModal();
}

/* Video pada kategori aktif, sesudah difilter dan diurutkan berdasarkan tanggal */
function visibleVideos() {
  const direction = view.order === 'newest' ? -1 : 1;
  return SHOWCASE[view.modeIndex].videos
    .map((video, index) => ({ video, index }))
    .filter(({ video }) => !view.group || video.group === view.group)
    .sort((a, b) => direction * (timeOf(a.video) - timeOf(b.video)) || a.index - b.index);
}

function renderModes() {
  $('#mode-list').innerHTML = SHOWCASE.map((mode, index) => `
    <button class="mode-card" data-index="${index}" aria-pressed="${index === view.modeIndex}">
      <img src="assets/img/${mode.cover}" alt="">
      <span>${mode.name}</span>
      <small>${mode.videos.length} video</small>
    </button>`).join('');
}

/* Tombol filter dibuat dari nilai "group" pada video; disembunyikan bila hanya ada satu grup */
function renderFilters() {
  const videos = SHOWCASE[view.modeIndex].videos;
  const groups = [...new Set(videos.map((video) => video.group).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'id', { numeric: true }));
  const list = $('#filter-list');
  list.hidden = groups.length < 2;
  if (list.hidden) return;

  const chip = (value, label, count) => `
    <button class="filter-chip" data-group="${value}" aria-pressed="${view.group === value}">${label} (${count})</button>`;
  list.innerHTML = chip('', 'Semua', videos.length)
    + groups.map((group) => chip(group, group, videos.filter((video) => video.group === group).length)).join('');
}

function renderVideos() {
  $('#video-grid').innerHTML = visibleVideos().map(({ video, index }) => `
    <button class="video-card" data-mode="${view.modeIndex}" data-video="${index}">
      <img src="${thumbnailPath(video)}" alt="Thumbnail ${video.title}" loading="lazy">
      ${isRecent(video.date) ? '<em class="badge-new">NEW</em>' : ''}
      <span>${videoCaption(video)}</span>
      ${video.date ? `<small>${formatDate(video.date)}</small>` : ''}
    </button>`).join('');
}

function showMode(modeIndex) {
  view.modeIndex = modeIndex;
  view.group = '';
  renderModes();
  renderFilters();
  renderVideos();
}

/* Panel NEW UPLOAD = video dengan tanggal upload paling baru */
function renderNewUpload() {
  const uploads = SHOWCASE
    .flatMap((mode) => mode.videos.map((video) => ({ mode: mode.name, video })))
    .filter((item) => item.video.date)
    .sort((a, b) => timeOf(b.video) - timeOf(a.video));
  if (!uploads.length) return;

  const { mode, video } = uploads[0];
  const panel = $('#new-upload');
  panel.hidden = false;
  panel.innerHTML = `
    <img src="${thumbnailPath(video)}" alt="Thumbnail ${video.title}">
    <div>
      <em class="badge-new">NEW UPLOAD</em>
      <h3>${video.title}</h3>
      <p>${mode}${video.points ? ` · ${video.points} PTS` : ''}</p>
      <p>Diupload ${formatDate(video.date)}</p>
      <div class="btns">
        <a class="btn p" href="${video.link || TIKTOK_PROFILE}" target="_blank" rel="noopener">${video.link ? 'Tonton video' : 'Buka TikTok'}</a>
        <button class="btn" id="new-upload-thumbnail" type="button">Lihat thumbnail</button>
      </div>
    </div>`;
  $('#new-upload-thumbnail').addEventListener('click', () => openLightbox(video));
}

$('#mode-list').addEventListener('click', (event) => {
  const card = event.target.closest('.mode-card');
  if (card) showMode(Number(card.dataset.index));
});

$('#filter-list').addEventListener('click', (event) => {
  const chip = event.target.closest('.filter-chip');
  if (!chip) return;
  view.group = chip.dataset.group;
  renderFilters();
  renderVideos();
});

$('#sort-order').addEventListener('change', (event) => {
  view.order = event.target.value;
  renderVideos();
});

$('#video-grid').addEventListener('click', (event) => {
  const card = event.target.closest('.video-card');
  if (card) openLightbox(SHOWCASE[card.dataset.mode].videos[card.dataset.video]);
});

$('#lightbox-close').addEventListener('click', () => lightbox.dialog.close());
lightbox.dialog.addEventListener('click', (event) => {
  if (event.target === lightbox.dialog) lightbox.dialog.close();
});

$('#video-count').textContent = SHOWCASE.reduce((sum, mode) => sum + mode.videos.length, 0) + ' video';
showMode(0);
renderNewUpload();
