/* Fungsi bantu yang dipakai oleh file lain */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const jakartaTime = (options) => new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', ...options });

/* '2026-10-29' -> '29 Okt 2026'  |  dengan jam -> '29 Okt 2026, 21:33 WIB' */
function formatDate(date) {
  const hasTime = date.length > 10;
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  if (hasTime) Object.assign(options, { hour: '2-digit', minute: '2-digit', hour12: false });
  const text = jakartaTime(options).format(new Date(date)).replace(/(\d)\.(\d)/, '$1:$2');
  return hasTime ? text + ' WIB' : text;
}

/* true bila tanggal upload belum lewat 7 hari (untuk badge NEW) */
const isRecent = (date) => Boolean(date) && Date.now() - new Date(date) < 7 * 24 * 36e5;

/* Mencerahkan warna aksen yang terlalu gelap supaya tetap terbaca di latar hitam */
function readableAccent(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.substr(i, 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;
  let hue = 0;
  let saturation = 0;

  if (delta) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
    if (max === r) hue = (g - b) / delta + (g < b ? 6 : 0);
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue *= 60;
  }

  const toRgb = (level) => {
    const a = saturation * Math.min(level, 1 - level);
    const channel = (n) => {
      const k = (n + hue / 30) % 12;
      return level - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    };
    return [channel(0), channel(8), channel(4)].map((v) => Math.round(v * 255));
  };

  const luminance = (rgb) => {
    const [R, G, B] = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  let level = Math.max(lightness, 0.5);
  let rgb = toRgb(level);
  while (luminance(rgb) < 0.22 && level < 0.92) {
    level += 0.02;
    rgb = toRgb(level);
  }
  return '#' + rgb.map((v) => v.toString(16).padStart(2, '0')).join('');
}
