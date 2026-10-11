# Our Little Story — Muhammad Fauzia × Dinda Kharnita

Website ulang tahun personal dengan gaya cute + romantic + elegant + cinematic + aesthetic.

## Struktur

- `index.html` — struktur website
- `styles.css` — seluruh styling dan animasi
- `script.js` — secret access, countdown, scrapbook memories, love notes, timeline, and interactive keepsakes
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

## Little love-story features

- Open When Letters: edit the eight letter objects in `openWhenLetters` in `script.js`.
- 100 Little Reasons: the `littleReasons` list is shuffled without repeats; progress is saved locally in this browser and can be restarted after all notes are opened.
- The Love Jar: 30 notes are shuffled without repeats for each jar.
- Surprise Box: four small stages, with the scrapbook image using the existing photo slot.
- Relationship Counter: uses the local calendar date from 13 December 2025. Since no start time was provided, its hours, minutes, and seconds begin at local midnight.
- Hidden Notes: nine small notes are placed throughout the page; discovery progress is saved locally in this browser.
- Love Book: use the print button and choose “Save as PDF” in the browser's print dialog. It includes the timeline, letter, notes, and all eight scrapbook slots.

Browser storage is optional: if it is unavailable, the interactions still work for the current visit. Replace empty files in `assets/photos/` with your own images to personalize the scrapbook, Surprise Box, and printable Love Book.

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
