/* Pilihan bahasa: Indonesia (id) dan English (en).
   - Teks statis di index.html: bahasa Indonesia ada di dalam elemen, terjemahan Inggris di atribut data-en.
   - Teks yang dibuat lewat JavaScript: kamus TEXT di bawah.
   Pilihan pengunjung disimpan di browser. */

const LOCALES = { id: 'id-ID', en: 'en-GB' };

const TEXT = {
  id: {
    all: 'Semua',
    videoCount: (n) => `${n} video`,
    newUpload: 'NEW UPLOAD',
    uploaded: 'Diupload',
    watch: 'Tonton video',
    watchOnTikTok: 'Tonton video di TikTok',
    openTikTok: 'Buka TikTok',
    openProfile: 'Buka TikTok @draazzzy',
    viewThumbnail: 'Lihat thumbnail',
    effective: (n) => `Effective sub-stat didapat <b>${n}</b> kali`,
    statVideos: 'Video',
    statAgents: 'Agent',
    statLatest: 'Upload terbaru',
  },
  en: {
    all: 'All',
    videoCount: (n) => `${n} videos`,
    newUpload: 'NEW UPLOAD',
    uploaded: 'Uploaded',
    watch: 'Watch video',
    watchOnTikTok: 'Watch on TikTok',
    openTikTok: 'Open TikTok',
    openProfile: 'Open TikTok @draazzzy',
    viewThumbnail: 'View thumbnail',
    effective: (n) => `Effective sub-stats obtained <b>${n}</b> times`,
    statVideos: 'Videos',
    statAgents: 'Agents',
    statLatest: 'Latest upload',
  },
};

let currentLanguage = 'id';
try {
  const saved = localStorage.getItem('language');
  if (saved in LOCALES) currentLanguage = saved;
} catch (error) { /* penyimpanan browser tidak tersedia: pakai bahasa Indonesia */ }

/* Teks sesuai bahasa aktif; nilai berupa fungsi menerima argumen tambahan */
function t(key, ...args) {
  const value = TEXT[currentLanguage][key];
  return typeof value === 'function' ? value(...args) : value;
}

/* Tukar semua elemen yang punya data-en antara teks Indonesia (asli) dan Inggris */
function applyStaticText() {
  $$('[data-en]').forEach((element) => {
    const isMeta = element.tagName === 'META';
    if (element.dataset.id === undefined) element.dataset.id = isMeta ? element.content : element.textContent;
    const text = currentLanguage === 'en' ? element.dataset.en : element.dataset.id;
    if (isMeta) element.content = text;
    else element.textContent = text;
  });
  document.documentElement.lang = currentLanguage;
  $$('#lang-toggle span').forEach((flag) => flag.classList.toggle('on', flag.dataset.lang === currentLanguage));
}

function setLanguage(language) {
  currentLanguage = language;
  try { localStorage.setItem('language', language); } catch (error) { /* abaikan */ }
  applyStaticText();
  document.dispatchEvent(new CustomEvent('app-language-change'));
}

$('#lang-toggle').addEventListener('click', () => setLanguage(currentLanguage === 'id' ? 'en' : 'id'));
applyStaticText();
