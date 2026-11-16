STRUKTUR FILE
index.html            Beranda: hero, Tentang, kartu Jelajahi, Kontak
showcase.html         halaman Showcase (video TikTok)
build.html            halaman Build agent
proyek.html           halaman "Dari VM ke internet"
css/style.css         semua tampilan (warna, layout, animasi)
js/data/videos.js     DATA showcase: video / thumbnail / link TikTok
js/data/agents.js     DATA build agent: stat, W-Engine, drive disc, mindscape, warna tema
js/data/loading.js    DATA loading page: tip dan daftar artwork
js/utils.js           fungsi bantu (tanggal, warna, slug)
js/theme.js           agent terpilih: warna tema + lencana nav, tersimpan di browser
js/i18n.js            pilihan bahasa Indonesia / English
js/motion.js          animasi scroll (scroll halus, teks per kata, kartu bertahap, parallax)
js/loading.js         loading page (tampil penuh sekali per kunjungan)
js/home.js            foto hero + pemilih agent, ringkasan, dan kartu di Beranda
js/showcase.js        logika halaman Showcase
js/agent-build.js     logika halaman Build agent
js/main.js            jam live dan gerak foto hero
assets/               font dan gambar

CARA EDIT CEPAT
- Tambah video baru   : taruh thumbnail di assets/img/ (t32.webp dst.), lalu tambah satu baris di js/data/videos.js
                        (group = pilihan filter, date = tanggal upload). Video terbaru otomatis tampil
                        di panel NEW UPLOAD (Showcase) dan di kartu Beranda.
- Ganti / tambah build: js/data/agents.js (petunjuk ada di bagian atas file)
- Tambah artwork loading: taruh gambar di assets/img/loading/, daftarkan di js/data/loading.js
- Ganti teks Tentang  : index.html (terjemahan Inggris ada di atribut data-en pada elemen yang sama)
- Ubah menu           : blok <nav> di keempat file .html (isinya sama)
- Loading di tiap halaman: js/loading.js -> LOADING_ONCE_PER_SESSION = false
- Link langsung       : showcase.html#deadly_assault, showcase.html#annihilation_simulacrum, build.html#vivian
Setelah mengubah file, muat ulang browser dengan Ctrl + F5.
