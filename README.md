# Karya Seni 

Proyek Ujian Tengah Semester (UTS) mata kuliah Pemrograman Web.

- **Nama:** Ragil Bayu Saputra
- **NIM:** 123140128

---

## Link Deployment (Vercel)

Aplikasi ini telah di-deploy dan dapat diakses secara publik melalui link berikut:

**[uts-pemweb-opal.vercel.app]**

---

## Deskripsi

**Karya Seni** adalah aplikasi web berbasis React (dibuat dengan Vite) yang berfungsi sebagai penjelajah koleksi museum. Aplikasi ini terhubung langsung dengan API publik dari **The Metropolitan Museum of Art** untuk mengambil dan menampilkan data karya seni.

Aplikasi ini dibangun sebagai *Single Page Application* (SPA) di mana pengguna dapat bernavigasi antara halaman pencarian (Beranda) dan halaman koleksi favorit mereka tanpa me-refresh halaman.

## Fitur Utama
p
- **Pencarian Karya Seni:** Pengguna dapat mencari karya seni berdasarkan *keyword* (contoh: "Mona Lisa", "dog", dll).
- **Filter Departemen:** Hasil pencarian dapat difilter berdasarkan 12 departemen resmi yang disediakan oleh API.
- **Tampilan Detail:** Karya seni ditampilkan dalam bentuk kartu (card) yang memuat informasi penting seperti gambar, judul, artis, tanggal, medium, dan kultur.
- **Sistem Favorit:** Pengguna dapat menambahkan karya seni yang mereka sukai ke daftar "Favorit".
- **Manajemen Favorit:** Pengguna dapat melihat semua koleksi favorit mereka dalam tampilan tabel dan menghapusnya dari daftar.
- **Penyimpanan Lokal:** Daftar favorit disimpan di `localStorage` browser, sehingga data favorit pengguna tidak akan hilang bahkan setelah me-refresh atau menutup halaman.

## Teknologi yang Digunakan

- **Framework:** React.js (dibuat menggunakan Vite)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Styling:** CSS Modules
- **HTTP Client:** Fetch API (untuk berinteraksi dengan Met Museum API)
- **Penyimpanan:** LocalStorage

## Cara Instalasi dan Menjalankan Proyek

Jika Anda ingin menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**
    ```bash
    git clone [MASUKKAN_URL_GIT_REPOSITORY_ANDA_DI_SINI]
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd [NAMA_FOLDER_PROYEK_ANDA]
    ```

3.  **Install semua dependencies:**
    ```bash
    npm install
    ```

4.  **Jalankan aplikasi di mode development:**
    ```bash
    npm run dev
    ```

5.  Buka `http://localhost:5173` (atau port yang tertera di terminal Anda) di browser.

## Tampilan Aplikasi

Berikut adalah screenshot dari tampilan aplikasi:

**Halaman Beranda (Pencarian)**
![Tampilan Halaman Beranda](./Screenshot/Beranda.png)

**Halaman Favorit**
![Tampilan Halaman Favorit](./Screenshot/Favorit.png)