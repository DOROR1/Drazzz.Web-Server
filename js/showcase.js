/* Bagian Showcase: kartu kategori -> grid thumbnail -> lightbox + link video.
   Data: js/data/videos.js */

const lightbox = {
  dialog: $('#lightbox'),
  image: $('#lightbox-image'),
  caption: $('#lightbox-caption'),
  link: $('#lightbox-link'),
};

const thumbnailPath = (video) => 'assets/img/' + video.image;
const videoCaption = (video) => video.title + (video.points ? ` · ${video.points} PTS` : '');

function openLightbox(video) {
  lightbox.image.src = thumbnailPath(video);
  lightbox.image.alt = 'Thumbnail ' + video.title;
  lightbox.caption.textContent = videoCaption(video) + (video.date ? ' · ' + formatDate(video.date) : '');
  lightbox.link.href = video.link || TIKTOK_PROFILE;
  lightbox.link.textContent = video.link ? 'Tonton video di TikTok' : 'Buka TikTok @draazzzy';
  lightbox.dialog.showModal();
}

function renderModes() {
  $('#mode-list').innerHTML = SHOWCASE.map((mode, index) => `
    <button class="mode-card" data-index="${index}" aria-pressed="false">
      <img src="assets/img/${mode.cover}" alt="">
      <span>${mode.name}</span>
      <small>${mode.videos.length} video</small>
    </button>`).join('');
}

function showMode(modeIndex) {
  $$('.mode-card').forEach((card, index) => card.setAttribute('aria-pressed', index === modeIndex));
  $('#video-grid').innerHTML = SHOWCASE[modeIndex].videos.map((video, index) => `
    <button class="video-card" data-mode="${modeIndex}" data-video="${index}">
      <img src="${thumbnailPath(video)}" alt="Thumbnail ${video.title}" loading="lazy">
      ${isRecent(video.date) ? '<em class="badge-new">NEW</em>' : ''}
      <span>${videoCaption(video)}</span>
      ${video.date ? `<small>${formatDate(video.date)}</small>` : ''}
    </button>`).join('');
}

/* Panel NEW UPLOAD = video dengan tanggal upload paling baru */
function renderNewUpload() {
  const uploads = SHOWCASE
    .flatMap((mode) => mode.videos.map((video) => ({ mode: mode.name, video })))
    .filter((item) => item.video.date)
    .sort((a, b) => new Date(b.video.date) - new Date(a.video.date));
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

$('#video-grid').addEventListener('click', (event) => {
  const card = event.target.closest('.video-card');
  if (card) openLightbox(SHOWCASE[card.dataset.mode].videos[card.dataset.video]);
});

$('#lightbox-close').addEventListener('click', () => lightbox.dialog.close());
lightbox.dialog.addEventListener('click', (event) => {
  if (event.target === lightbox.dialog) lightbox.dialog.close();
});

$('#video-count').textContent = SHOWCASE.reduce((sum, mode) => sum + mode.videos.length, 0) + ' video';
renderModes();
showMode(0);
renderNewUpload();
