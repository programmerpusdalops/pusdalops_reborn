---
description: Audit Keamanan Project Web
---

Anda adalah **Senior Security Engineer dan Full-Stack Developer** yang berpengalaman dalam melakukan **security audit pada aplikasi web production**.

Saya memiliki sebuah project web dengan stack berikut:

Backend:

* Node.js
* Express.js
* Sequelize
* MySQL

Frontend:

* React.js
* TypeScript
* Vite

Project ini nantinya akan di deploy ke **VPS Ubuntu menggunakan Nginx dan PM2**.

Tugas Anda adalah melakukan **audit keamanan secara menyeluruh terhadap project ini** dan memberikan laporan keamanan yang jelas.

---

# 1. ANALISIS KEAMANAN BACKEND

Periksa seluruh kode backend dan identifikasi potensi kerentanan keamanan.

Fokuskan pada hal-hal berikut:

### Validasi Input

Periksa apakah semua input dari user telah divalidasi dengan benar, seperti:

* request body
* query parameter
* form input
* upload file

Identifikasi kemungkinan kerentanan seperti:

* SQL Injection
* Command Injection
* Data Manipulation

Berikan rekomendasi perbaikan jika validasi masih kurang.

---

### Sistem Upload File

Periksa keamanan sistem upload file.

Pastikan:

* tipe file dibatasi
* ukuran file dibatasi
* file tidak bisa menimpa file lain
* file tidak bisa dieksekusi sebagai script
* path upload aman

Jika menggunakan multer atau library lain, analisis konfigurasinya.

Jelaskan apakah sistem upload file sudah aman untuk production.

---

### Authentication dan Authorization

Periksa apakah sistem login dan akses user aman.

Periksa:

* penyimpanan password
* penggunaan hashing (bcrypt)
* penggunaan token (JWT atau lainnya)
* proteksi endpoint admin
* kemungkinan bypass login

Berikan rekomendasi jika ada celah keamanan.

---

### Konfigurasi CORS

Periksa apakah konfigurasi CORS terlalu terbuka.

Contoh masalah:

* origin: "*"
* semua domain bisa akses API

Berikan rekomendasi konfigurasi yang lebih aman untuk production.

---

### Environment Variable

Periksa penggunaan file .env.

Pastikan:

* secret key tidak hardcoded di kode
* database credential tidak terekspos
* file .env tidak ikut di commit ke repository

Jelaskan apakah environment configuration sudah aman.

---

# 2. ANALISIS KEAMANAN FRONTEND

Periksa potensi kerentanan dari sisi frontend.

Periksa kemungkinan:

* XSS (Cross Site Scripting)
* penggunaan dangerouslySetInnerHTML
* rendering HTML tanpa sanitasi
* kebocoran token
* penyimpanan token di localStorage

Berikan rekomendasi best practice untuk meningkatkan keamanan frontend.

---

# 3. KEAMANAN API

Periksa seluruh endpoint API.

Analisis:

* apakah endpoint memiliki validasi
* apakah endpoint memiliki pembatasan akses
* apakah endpoint bisa diakses tanpa autentikasi
* kemungkinan brute force

Jika perlu, sarankan:

* rate limiting
* API protection
* middleware keamanan

---

# 4. KEAMANAN SAAT DEPLOY DI VPS

Analisis apakah project ini aman ketika di deploy di VPS Ubuntu.

Periksa kemungkinan risiko seperti:

* folder upload dapat diakses bebas
* file sensitif bisa diakses publik
* konfigurasi static file terlalu terbuka
* path traversal
* log error yang membocorkan informasi sistem

Berikan rekomendasi konfigurasi server yang lebih aman.

---

# 5. PENILAIAN KEAMANAN PROJECT

Setelah melakukan audit, berikan:

### Skor keamanan project

Contoh:

Security Score: 7 / 10

---

### Daftar kerentanan yang ditemukan

Jelaskan:

* jenis kerentanan
* lokasi kode
* dampak keamanan

---

### Rekomendasi perbaikan

Berikan langkah-langkah perbaikan yang jelas agar project ini lebih aman untuk production.

---

# 6. TUJUAN AKHIR

Tujuan audit ini adalah memastikan project ini:

* aman untuk di deploy ke VPS
* tidak memiliki kerentanan besar
* mengikuti best practice keamanan web modern

Berikan laporan keamanan yang jelas dan mudah dipahami.
