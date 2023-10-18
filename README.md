# BCA Kurs API

## Deskripsi
Proyek ini adalah aplikasi Node.js yang digunakan untuk mengambil data kurs mata uang dari BCA menggunakan API resmi BCA. Informasi kurs mata uang ini dapat digunakan untuk tujuan bisnis, keuangan, atau pelacakan perubahan nilai tukar mata uang.

## Cara Menggunakan
1. Pastikan Anda memiliki Node.js terinstal di komputer Anda. Jika belum, Anda dapat mengunduhnya di [nodejs.org](https://nodejs.org/).
2. Clone repositori ini ke komputer Anda atau unduh sebagai ZIP dan ekstrak.
3. Buka terminal dan navigasikan ke direktori proyek.
4. Jalankan `npm install` untuk menginstal semua dependensi yang diperlukan.
5. Salin file `.env.example` sebagai dasar untuk konfigurasi Anda. Anda dapat melakukannya dengan menjalankan perintah berikut di terminal:
   ```bash
   cp .env.example .env
   ```

6. Buka file `.env` yang baru dibuat. Ubah nilai variabel PORT sesuai dengan port yang Anda inginkan. Misalnya, jika Anda ingin menggunakan port 3000, maka ubah PORT=8082 menjadi PORT=3000
7. Jalankan aplikasi dengan perintah berikut:
   ```bash
   node index.js
   ```

8. Aplikasi akan mulai berjalan dan mengambil data kurs mata uang dari API BCA sesuai dengan konfigurasi yang telah Anda atur sebelumnya.

## Kontribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan melakukan fork repositori ini, lakukan perubahan yang diperlukan, dan ajukan pull request. Kami akan senang menerima kontribusi dari Anda.

## Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).
