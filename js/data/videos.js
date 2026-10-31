/* =====================================================================
   DATA SHOWCASE (video TikTok)

   Cara menambah video: salin satu baris di kategori yang sesuai, lalu isi
     image  -> nama file thumbnail di folder assets/img/
     title  -> judul yang tampil di kartu
     points -> skor (boleh dikosongkan)
     link   -> link video TikTok (kosong = otomatis ke profil)
     date   -> tanggal upload: '2026-10-29' atau '2026-10-29T21:30:00+07:00'
   Video dengan date terbaru otomatis tampil di panel NEW UPLOAD.
   ===================================================================== */

const TIKTOK_PROFILE = 'https://www.tiktok.com/@draazzzy';

const SHOWCASE = [
  {
    name: 'Shiyu Defense',
    cover: 'shiyu.webp',
    videos: [
      { image: 't2.webp', title: 'Shiyu Defense 05 · Room 1', points: '42K', link: '', date: '' },
      { image: 't8.webp', title: 'Shiyu Defense 05 · Room 1', points: '45K', link: '', date: '' },
      { image: 't11.webp', title: 'Shiyu Defense 05 · Room 1', points: '48K', link: '', date: '' },
      { image: 't18.webp', title: 'Shiyu Defense 05 · Room 1', points: '41K', link: '', date: '' },
      { image: 't3.webp', title: 'Shiyu Defense 05 · Room 2', points: '45K', link: '', date: '' },
      { image: 't9.webp', title: 'Shiyu Defense 05 · Room 2', points: '44K', link: '', date: '' },
      { image: 't12.webp', title: 'Shiyu Defense 05 · Room 2', points: '36K', link: '', date: '' },
      { image: 't19.webp', title: 'Shiyu Defense 05 · Room 2', points: '42K', link: '', date: '' },
      { image: 't1.webp', title: 'Shiyu Defense 05 · Room 3', points: '41K', link: '', date: '' },
      { image: 't4.webp', title: 'Shiyu Defense 05 · Room 3', points: '43K', link: '', date: '' },
      { image: 't10.webp', title: 'Shiyu Defense 05 · Room 3', points: '39K', link: '', date: '' },
      { image: 't13.webp', title: 'Shiyu Defense 05 · Room 3', points: '37K', link: '', date: '' },
      { image: 't20.webp', title: 'Shiyu Defense 05 · Room 3', points: '45K', link: '', date: '' },
    ],
  },
  {
    name: 'Deadly Assault',
    cover: 'deadly.webp',
    videos: [
      { image: 't5.webp', title: 'Kusarikku', points: '34K', link: '', date: '' },
      { image: 't16.webp', title: 'Kusarikku', points: '36K', link: '', date: '' },
      { image: 't6.webp', title: 'Girtabilulu - Stagnant', points: '46K', link: '', date: '' },
      { image: 't7.webp', title: 'Ye Shiyuan the Thrall', points: '43K', link: '', date: '' },
      { image: 't14.webp', title: 'Phaethon of the Scorched', points: '44K', link: '', date: '' },
      { image: 't15.webp', title: 'Infernal Revenant', points: '26K', link: '', date: '' },
      { image: 't17.webp', title: 'Infernal Revenant', points: '43K', link: '', date: '' },
      { image: 't22.webp', title: 'Etheric Other - Truvie', points: '40K', link: '', date: '' },
      { image: 't23.webp', title: 'Unknown Corruption', points: '41K', link: '', date: '2026-10-29' },
      { image: 't24.webp', title: 'Discordant Solo - Vesper', points: '30K', link: '', date: '2026-10-29T21:33:00+07:00' },
    ],
  },
  {
    name: 'Annihilation Simulacrum',
    cover: 'an.webp',
    videos: [
      { image: 't21.webp', title: 'Integrated: Sacrifice - Heretic Jester (Extreme)', points: '', link: '', date: '' },
    ],
  },
];
