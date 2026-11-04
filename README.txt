STRUKTUR FILE
index.html            kerangka halaman (teks Tentang, Hero, Proyek, Kontak)
css/style.css         semua tampilan (warna, layout, animasi)
js/data/videos.js     DATA showcase: video / thumbnail / link TikTok
js/data/agents.js     DATA build agent: stat, W-Engine, drive disc, mindscape, warna tema
js/data/loading.js    DATA loading page: tip dan daftar artwork
js/utils.js           fungsi bantu (tanggal, warna)
js/loading.js         logika loading page
js/showcase.js        logika bagian Showcase
js/agent-build.js     logika bagian Build agent
js/main.js            navigasi, jam live, gerak foto hero
assets/               font dan gambar

CARA EDIT CEPAT
- Tambah video baru   : taruh thumbnail di assets/img/, lalu tambah satu baris di js/data/videos.js
                        (isi group = pilihan filter, date = tanggal upload untuk urutan terbaru/terlama)
- Ganti / tambah build: edit blok agent di js/data/agents.js (petunjuk ada di bagian atas file)
- Ganti mindscape     : js/data/agents.js -> mindscape: 'M0W1'
- Ganti skill / faksi : js/data/agents.js -> skills: [Basic, Dodge, Assist, Special, Chain, Core], faction: '...'
- Ganti artwork/tip loading: taruh gambar di assets/img/loading/, daftarkan di js/data/loading.js
- Ganti teks Tentang  : index.html
- Ganti warna/tampilan: css/style.css
Setelah mengubah file, muat ulang browser dengan Ctrl + F5.
