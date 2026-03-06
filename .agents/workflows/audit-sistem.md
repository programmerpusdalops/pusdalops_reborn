---
description: Audit Project dan Persiapan Deploy ke VPS Ubuntu
---

Anda adalah **Senior DevOps Engineer, Security Auditor, dan Full-Stack Developer** yang sangat berpengalaman.

Tugas Anda adalah **menganalisis seluruh project saya dan memastikan project ini aman, stabil, dan siap untuk di-deploy ke VPS Ubuntu untuk production**.

Project ini terdiri dari:

Backend:

* Node.js
* Express.js

Frontend:

* React.js
* TypeScript
* Vite

Database:

* MySQL

Silakan lakukan analisis secara menyeluruh terhadap seluruh kode dan struktur project.

---

# 1. ANALISIS STRUKTUR PROJECT

Pertama, analisis seluruh struktur project saya, termasuk:

* folder backend
* folder frontend
* file environment (.env)
* konfigurasi database
* konfigurasi API
* sistem upload file/gambar
* folder public
* konfigurasi static file
* routing backend
* routing frontend
* cara frontend memanggil API backend

Kemudian jelaskan secara singkat:

* Project ini sebenarnya berfungsi untuk apa
* Bagaimana alur komunikasi antara frontend dan backend
* Bagaimana sistem upload gambar bekerja
* Dimana file gambar disimpan
* Bagaimana gambar tersebut diakses oleh frontend

---

# 2. PENGECEKAN KESIAPAN DEPLOY KE VPS

Periksa apakah project ini **sudah aman dan siap untuk di deploy ke VPS Ubuntu**.

Periksa kemungkinan masalah pada:

### Lingkungan Server

Pastikan project kompatibel dengan:

* Ubuntu Server
* Node.js runtime
* Nginx reverse proxy
* PM2 process manager

---

### Sistem Upload File / Gambar

Ini sangat penting.

Pada deployment sebelumnya saya pernah mengalami masalah berikut:

Upload gambar berhasil di lokal, tetapi **gagal ketika di deploy ke VPS**.

Kemungkinan masalah bisa berasal dari:

* path upload yang salah
* konfigurasi multer yang tidak tepat
* folder upload tidak ada
* permission folder tidak benar
* penggunaan path absolut
* kesalahan konfigurasi express static
* kesalahan base URL
* URL gambar tidak sesuai dengan domain production

Silakan cek seluruh bagian yang berkaitan dengan:

* multer
* penyimpanan file
* path upload
* folder public
* express static
* path handling
* cara frontend mengakses gambar

Jika ada potensi masalah, jelaskan dan berikan perbaikan.

---

### Masalah Path dan Environment

Periksa apakah ada:

* URL yang masih hardcoded localhost
* base_url yang salah
* penggunaan environment variable yang tidak konsisten
* path absolut yang bisa rusak saat deploy
* konfigurasi .env yang tidak aman

Pastikan project dapat berjalan dengan baik menggunakan file:

.env

---

### Pengecekan Keamanan Dasar

Lakukan audit keamanan dasar pada project ini.

Periksa kemungkinan:

* secret yang terekspos
* upload file yang tidak aman
* validasi input yang kurang
* potensi SQL injection
* konfigurasi CORS yang tidak aman
* akses file yang terlalu terbuka

Jelaskan setiap risiko yang ditemukan dan berikan rekomendasi perbaikannya.

---

### Stabilitas Backend

Periksa bagian backend seperti:

* struktur controller
* penggunaan async/await
* error handling
* response API
* koneksi database

Pastikan backend akan **stabil ketika dijalankan di production menggunakan PM2**.

---

### Kesiapan Frontend untuk Production

Periksa apakah frontend sudah siap untuk production:

* konfigurasi Vite build
* penggunaan API base URL
* penggunaan environment variable
* cara memanggil API
* cara memuat asset dan gambar

Pastikan frontend build dapat berjalan dengan baik di belakang **Nginx**.

---

# 3. PERBAIKAN DAN REKOMENDASI

Jika Anda menemukan masalah:

* perbaiki langsung jika memungkinkan
  atau
* berikan rekomendasi perbaikan yang jelas

Jelaskan setiap masalah yang ditemukan.

---

# 4. BUAT DOKUMENTASI DEPLOY VPS

Setelah analisis selesai, buat satu file dokumentasi baru di **root project** dengan nama:

DEPLOYMENT_GUIDE.md

File ini harus berisi **tutorial paling lengkap dan paling jelas untuk deploy project ini ke VPS Ubuntu**.

---

Isi dokumentasi harus mencakup:

## Persiapan Server

Langkah langkah:

* update Ubuntu
* install Node.js
* install MySQL
* install Nginx
* install Git
* install PM2

---

## Setup Project

Jelaskan cara:

* clone repository
* install dependency backend
* install dependency frontend
* konfigurasi file .env
* build frontend
* menjalankan backend

---

## Konfigurasi Upload File

Jelaskan cara memastikan:

* folder upload tersedia
* permission folder benar
* express static berjalan
* file gambar bisa diakses dari browser

---

## Konfigurasi Nginx Reverse Proxy

Berikan contoh konfigurasi lengkap untuk:

* menjalankan frontend React
* menghubungkan API backend Node.js

---

## Menjalankan Backend dengan PM2

Jelaskan cara:

* menjalankan backend menggunakan PM2
* auto restart ketika server restart
* monitoring process

---

## Setup CI/CD

Buat contoh sederhana CI/CD menggunakan:

GitHub Actions

Alurnya:

* pull kode terbaru dari repository
* install dependency
* build frontend
* restart backend menggunakan PM2

---

## Best Practice Production

Tambahkan rekomendasi:

* keamanan server
* backup database
* logging
* monitoring server

---

# 5. FORMAT HASIL ANALISIS

Output Anda harus berisi:

1. Ringkasan analisis project
2. Daftar masalah yang ditemukan
3. Perbaikan atau rekomendasi
4. File DEPLOYMENT_GUIDE.md yang dibuat di root project

Tujuan akhir dari tugas ini adalah memastikan project ini **aman, stabil, dan siap untuk di deploy ke VPS Ubuntu untuk production**.
