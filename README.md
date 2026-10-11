# Our Little Story — Muhammad Fauzia × Dinda Kharnita

Website ulang tahun personal dengan gaya cute + romantic + elegant + cinematic + aesthetic.

## Struktur

- `index.html` — struktur website
- `styles.css` — seluruh styling dan animasi
- `script.js` — secret access, countdown, scrapbook memories, download PNG HD, surat, musik, and love-note interaction
- `qr-code.html` — halaman untuk membuat dan mengunduh QR menuju website
- `qr-code.js` — logika QR pada halaman tersebut
- `assets/photos/` — masukkan 8 foto
- `assets/music/silence.mp3` — masukkan file audio yang kamu miliki/hak gunakan
- `.github/workflows/pages.yml` — deploy otomatis ke GitHub Pages

## Masukkan 8 foto

Rename foto menjadi:

1. `photo-01.jpg`
2. `photo-02.jpg`
3. `photo-03.jpg`
4. `photo-04.jpg`
5. `photo-05.jpg`
6. `photo-06.jpg`
7. `photo-07.jpg`
8. `photo-08.jpg`

Taruh semuanya di `assets/photos/`.

Folder `assets/photos/` menyertakan slot foto kosong. Ganti masing-masing slot dengan foto kenangan milikmu menggunakan nama file yang sama agar foto tampil di hero dan galeri.

Album Our Story Scrapbook memuat delapan foto, navigasi thumbnail, previous/next, swipe di ponsel, detail kenangan, dan ekspor PNG HD berukuran 1800 × 2400 px. Tanggal, judul, caption, dan cerita masing-masing kenangan disimpan di array `memories` pada `script.js`; ubah nilai `DATE TO ADD` dan cerita netralnya sesuai detail yang ingin kamu bagikan. Tombol print mencetak foto dan caption yang sedang dipilih saja.

Bagian Our Little Timeline di `index.html` menggunakan tiga tanggal/peristiwa yang sudah diketahui. Bagian Little Things About You memiliki 12 catatan yang dapat diedit pada array `reasons` di `script.js`.

## Musik

Masukkan file musik yang kamu miliki/hak gunakan ke:

`assets/music/silence.mp3`

Player menggunakan file `assets/music/silence.mp3` (lagu Silence dari file yang disediakan). Musik baru diputar setelah tombol play ditekan di dashboard.

## Menjalankan lokal

Bisa dibuka langsung dengan `index.html`, tetapi lebih baik pakai Live Server di VS Code.

## Deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `our-little-story`.
2. Upload semua file dan folder.
3. Push ke branch `main`.
4. Workflow GitHub Pages akan menjalankan deployment.
5. Di repository, buka `Settings > Pages` dan pastikan source menggunakan GitHub Actions jika diperlukan.

URL biasanya:

`https://USERNAME.github.io/our-little-story/`

## Catatan

Kalau nama repository kamu adalah `USERNAME.github.io`, URL-nya menjadi:

`https://USERNAME.github.io/`

Semua teks, caption, warna, dan isi surat bisa diubah langsung dari `script.js` dan `index.html`.

Halaman QR setelah deployment tersedia di `https://muhammadfauzia0704-source.github.io/happybirthday-dinda/qr-code.html`. QR mengarah ke website GitHub Pages dan menggunakan QRCode.js dari CDN untuk membuat PNG.

Secret access divalidasi sepenuhnya di browser dan menyimpan status buka hanya di `sessionStorage`; ini adalah gerbang kejutan, bukan sistem keamanan.
