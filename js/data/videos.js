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
      { image: 't2.webp', title: 'Shiyu Defense 05 · Room 1', points: '42K', link: 'https://www.tiktok.com/@draazzzy/video/7681651986554457364?is_from_webapp=1&sender_device=pc', date: '2026-09-04T20:13:00+07:00' },
      { image: 't8.webp', title: 'Shiyu Defense 05 · Room 1', points: '45K', link: 'https://www.tiktok.com/@draazzzy/video/7686906858006744340?is_from_webapp=1&sender_device=pc', date: '2026-09-19T00:04:00+07:00' },
      { image: 't11.webp', title: 'Shiyu Defense 05 · Room 1', points: '48K', link: 'https://www.tiktok.com/@draazzzy/video/7692969312549670164?is_from_webapp=1&sender_device=pc', date: '2026-10-05T08:10:00+07:00' },
      { image: 't18.webp', title: 'Shiyu Defense 05 · Room 1', points: '41K', link: 'https://www.tiktok.com/@draazzzy/video/7697285540084944148?is_from_webapp=1&sender_device=pc', date: '2026-10-16T23:19:00+07:00' },
      { image: 't25.webp', title: 'Shiyu Defense 05 · Room 1', points: '40K', link: 'https://www.tiktok.com/@draazzzy/video/7702688775670942997?is_from_webapp=1&sender_device=pc', date: '2026-10-31T16:34:00+07:00' },
      { image: 't3.webp', title: 'Shiyu Defense 05 · Room 2', points: '45K', link: 'https://www.tiktok.com/@draazzzy/video/7681830432660376852?is_from_webapp=1&sender_device=pc', date: '2026-09-05T08:05:00+07:00' },
      { image: 't9.webp', title: 'Shiyu Defense 05 · Room 2', points: '44K', link: 'https://www.tiktok.com/@draazzzy/video/7687273077989805332?is_from_webapp=1&sender_device=pc', date: '2026-09-19T23:45:00+07:00' },
      { image: 't12.webp', title: 'Shiyu Defense 05 · Room 2', points: '36K', link: 'https://www.tiktok.com/@draazzzy/video/7693202239015603462?is_from_webapp=1&sender_device=pc', date: '2026-10-05T23:13:00+07:00' },
      { image: 't19.webp', title: 'Shiyu Defense 05 · Room 2', points: '42K', link: 'https://www.tiktok.com/@draazzzy/video/7697472756245335316?is_from_webapp=1&sender_device=pc', date: '2026-10-17T23:25:00+07:00' },
      { image: 't26.webp', title: 'Shiyu Defense 05 · Room 2', points: '47K', link: 'https://www.tiktok.com/@draazzzy/video/7703416997173808404?is_from_webapp=1&sender_device=pc', date: '2026-11-02T11:52:00+07:00' },
      { image: 't1.webp', title: 'Shiyu Defense 05 · Room 3', points: '41K', link: 'https://www.tiktok.com/@draazzzy/video/7667819572078071056?is_from_webapp=1&sender_device=pc', date: '2026-07-29T13:36:00+07:00' },
      { image: 't4.webp', title: 'Shiyu Defense 05 · Room 3', points: '43K', link: 'https://www.tiktok.com/@draazzzy/video/7681955768681139477?is_from_webapp=1&sender_device=pc', date: '2026-09-05T21:00:00+07:00' },
      { image: 't10.webp', title: 'Shiyu Defense 05 · Room 3', points: '39K', link: 'https://www.tiktok.com/@draazzzy/video/7687278294571437332?is_from_webapp=1&sender_device=pc', date: '2026-09-20T00:06:00+07:00' },
      { image: 't13.webp', title: 'Shiyu Defense 05 · Room 3', points: '37K', link: 'https://www.tiktok.com/@draazzzy/video/7693730535599901972?is_from_webapp=1&sender_device=pc', date: '2026-10-07T09:24:00+07:00' },
      { image: 't20.webp', title: 'Shiyu Defense 05 · Room 3', points: '45K', link: 'https://www.tiktok.com/@draazzzy/video/7697886968629431572?is_from_webapp=1&sender_device=pc', date: '2026-10-18T14:13:00+07:00' },
    ],
  },
  {
    name: 'Deadly Assault',
    cover: 'deadly.webp',
    videos: [
      { image: 't5.webp', title: 'Kusarikku', points: '34K', link: 'https://www.tiktok.com/@draazzzy/video/7684308769328647444?is_from_webapp=1&sender_device=pc', date: '2026-09-12T00:02:00+07:00' },
      { image: 't16.webp', title: 'Kusarikku', points: '36K', link: 'https://www.tiktok.com/@draazzzy/video/7695414080110136596?is_from_webapp=1&sender_device=pc', date: '2026-10-11T22:16:00+07:00' },
      { image: 't6.webp', title: 'Girtabilulu - Stagnant', points: '46K', link: 'https://www.tiktok.com/@draazzzy/video/7684692824448617749?is_from_webapp=1&sender_device=pc', date: '2026-09-13T00:53:00+07:00' },
      { image: 't7.webp', title: 'Ye Shiyuan the Thrall', points: '43K', link: 'https://www.tiktok.com/@draazzzy/video/7684947146193341717?is_from_webapp=1&sender_device=pc', date: '2026-09-13T17:19:00+07:00' },
      { image: 't14.webp', title: 'Phaethon of the Scorched', points: '44K', link: 'https://www.tiktok.com/@draazzzy/video/7695037120196513044?is_from_webapp=1&sender_device=pc', date: '2026-10-10T09:54:00+07:00' },
      { image: 't15.webp', title: 'Infernal Revenant', points: '26K', link: 'https://www.tiktok.com/@draazzzy/video/7695234588196621588?is_from_webapp=1&sender_device=pc', date: '2026-10-11T10:40:00+07:00' },
      { image: 't22.webp', title: 'Etheric Other - Truvie', points: '40K', link: 'https://www.tiktok.com/@draazzzy/video/7700279855262453012?is_from_webapp=1&sender_device=pc', date: '2026-10-25T00:58:00+07:00' },
      { image: 't23.webp', title: 'Unknown Corruption', points: '41K', link: 'https://www.tiktok.com/@draazzzy/video/7701732113627745556?is_from_webapp=1&sender_device=pc', date: '2026-10-28T22:54:00+07:00' },
      { image: 't24.webp', title: 'Discordant Solo - Vesper', points: '30K', link: 'https://www.tiktok.com/@draazzzy/video/7702106464789220629?is_from_webapp=1&sender_device=pc', date: '2026-10-29T21:33:00+07:00' },
    ],
  },
  {
    name: 'Annihilation Simulacrum',
    cover: 'an.webp',
    videos: [
      { image: 't21.webp', title: 'Integrated: Sacrifice - Heretic Jester (Extreme)', points: '', link: 'https://www.tiktok.com/@draazzzy/video/7699165672600849684?is_from_webapp=1&sender_device=pc', date: '2026-10-22T00:55:00+07:00' },
    ],
  },
];
