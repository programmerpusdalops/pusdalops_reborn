---
description: Standardisasi Environment URL (Local vs Production) pada React + Express
---

Saya memiliki project dengan stack:

Backend: Node.js + Express

Frontend: React JS

Saat ini project berjalan dalam dua environment:

Local → http://localhost:5001/

Production → https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/

Masalah utama saya adalah banyak URL yang masih di-hardcode, baik di:

Frontend React (fetch API dan image src)

Backend Express (saat generate URL file upload)

Contoh masalah:

1. Hardcode URL di Backend
const url = `http://localhost:5001/public/images/${fileName}`;
// const url = `https://pusdalops-backend.com.pusdalops-bpbdsulteng.com/api/images/${fileName}`;
2. Perbedaan Path Static

Local menggunakan: /public/images

Production menggunakan: /api/images

3. Hardcode URL di Frontend
<img src="http://localhost:5001/public/images/file.png" />

Akibatnya setiap pindah environment, saya harus mengganti URL satu per satu secara manual.

Objective

Saya ingin:

Menghilangkan semua hardcoded base URL.

Membuat sistem environment-based configuration menggunakan .env.

Menyamakan path image agar tidak berbeda antara local dan production.

Membuat solusi clean dan scalable tanpa mengubah logic bisnis lainnya.

Fokus hanya pada perbaikan struktur environment & URL handling — jangan mengubah fitur lain.

Requirements

AI harus:

Memberikan solusi untuk:

Konfigurasi .env di backend (development & production)

Konfigurasi .env di React

Menstandarisasi static file route di Express (misalnya /images)

Menghilangkan penggunaan /public atau /api yang berbeda antar environment

Membuat contoh implementasi yang clean dan production-ready

Tidak mengubah struktur database, controller logic, atau fitur yang tidak terkait

Expected Output

AI harus memberikan:

Step-by-step solution

Struktur file .env untuk backend dan frontend

Contoh konfigurasi Express static

Contoh penggunaan environment variable di backend

Contoh penggunaan environment variable di React

Optional: helper function untuk image URL

Important Constraint

⚠ Jangan mengubah logic fitur yang sudah ada.
⚠ Fokus hanya pada refactor URL & environment handling.
⚠ Jangan menyarankan perubahan arsitektur besar yang tidak relevan.

Tujuan akhir adalah agar saya bisa:

Pindah dari local ke production tanpa mengganti kode manual.

Deploy menggunakan CI/CD tanpa modifikasi ulang URL.

Memiliki sistem yang scalable untuk staging di masa depan.