# HealthCheck 🩺✨

> **Soft Pastel Healthcare** — Aplikasi Pemantauan & Analisis Indikator Kesehatan Mandiri Berbasis Web.

HealthCheck adalah aplikasi web modern, ramah, dan menenangkan yang dirancang untuk membantu pengguna mengevaluasi kondisi kesehatan dasar secara cepat, mandiri, dan aman. Menggunakan antarmuka visual berkonsep **Soft Pastel Healthcare**, aplikasi ini menghadirkan pengalaman pengguna yang hangat dan intuitif tanpa kesan kaku layaknya website medis konvensional.

---

## 🌟 Features

- **Notifikasi Pintar & Validasi Pengisian Data**: Notifikasi toast interaktif bertema pastel yang memberikan peringatan instan (*"Isi data terlebih dahulu"* jika seluruh kolom kosong, atau *"Lengkapi data terlebih dahulu"* jika data baru diisi sebagian) baik saat mengklik tombol submit maupun link navigasi *Hasil Analisis*.
- **Kalkulasi BMI (Body Mass Index)**: Menghitung BMI secara presisi dan mengelompokkan ke dalam kategori (*Underweight*, *Healthy*, *Overweight*, atau *Obese*).
- **Evaluasi Indikator Kesehatan Multi-Parametrik**:
  - **Tekanan Darah**: Evaluasi tingkat sistolik/diastolik (normal, elevated, hipertensi, crisis).
  - **Gula Darah**: Analisis kadar gula darah puasa/sewaktu (normal, prediabetes, diabetes, low).
  - **Status Hidrasi**: Tingkat kecukupan konsumsi air harian (liter/hari).
  - **Pola Makan**: Frekuensi makan harian (kali/hari).
- **Health Score Generator (0-100)**: Perhitungan skor agregat kesehatan berbasis bobot statistik terstruktur.
- **Rekomendasi Personal Otomatis**: Saran kesehatan kontekstual yang disesuaikan dengan profil pengguna.
- **Dashboard Visual Interaktif**: Lingkaran progress SVG dinamis (*Score Gauge*), pill statistik pastel, dan progress bar animasi.
- **Ekspor Laporan PDF**: Unduh hasil analisis kesehatan lengkap dalam dokumen PDF siap cetak via library client-side.
- **100% Data Privacy (Client-Side Only)**: Seluruh pemrosesan data dilakukan di browser pengguna tanpa pengiriman atau penyimpanan di server pihak ketiga.
- **Desain Responsif**: Tampilan yang rapi, bersih, dan konsisten baik pada layar desktop maupun smartphone.

---

## 🛠️ Technologies

Aplikasi ini dibangun menggunakan teknologi web standar tanpa framework yang memberatkan, menjamin performa yang cepat dan ringan:

- **HTML5**: Struktur halaman semantik dan aksesibel.
- **CSS3**: Stylesheet kustom dengan *Soft Pastel Healthcare Design System*, CSS Custom Properties, layout Flexbox & Grid, micro-shadows, dan font `Plus Jakarta Sans` & `Outfit`.
- **JavaScript (Vanilla ES6+)**: Object-oriented logic (`HealthAnalyzer`), manipulasi DOM, validasi form, dan `localStorage` API.
- **FontAwesome 6.5.0**: Ikon visual yang konsisten dan komunikatif.
- **jsPDF 2.5.1**: Library pembuatan file PDF secara dinamik di sisi browser via CDN.

---

## 📁 Project Structure

```text
HealthCeck/
├── index.html     # Halaman utama (Formulir input asesmen kesehatan)
├── results.html   # Halaman hasil (Dashboard analisis, rekomendasi, & PDF export)
├── style.css      # Custom stylesheet (Soft Pastel Healthcare Design System)
├── app.js         # Logic kalkulasi kesehatan, validasi form, & pemicu asesmen
├── results.js     # Render data dashboard, animasi visual SVG/progress, & fungsi PDF
└── README.md      # Dokumentasi resmi project
```

---

## 🚀 Getting Started

### Prasyarat
Hanya memerlukan **Web Browser** modern (seperti Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari). Tidak memerlukan backend server atau database khusus.

### Cara Menjalankan Project
1. Clone atau download repositori ini ke komputer lokal Anda.
2. Buka folder project `HealthCeck`.
3. Jalankan file `index.html` dengan cara:
   - Klik ganda pada file `index.html` untuk membuka langsung di browser, ATAU
   - Gunakan extension seperti **Live Server** di VS Code, ATAU
   - Jalankan perintah server lokal melalui terminal:
     ```bash
     npx http-server .
     ```
4. Akses aplikasi melalui URL yang ditampilkan (misalnya `http://localhost:8080`).

---

## 📖 How to Use

1. Buka halaman utama aplikasi (`index.html`).
2. Masukkan data diri dan indikator kesehatan Anda pada formulir:
   - Nama Lengkap
   - Umur (tahun)
   - Jenis Kelamin (Laki-laki / Perempuan)
   - Berat Badan (kg) & Tinggi Badan (cm)
   - Tekanan Darah (format: `120/80`)
   - Gula Darah (mg/dL)
   - Frekuensi Makan (kali/hari)
   - Konsumsi Air Minum (Liter/hari)
3. Klik tombol **"Cek Kesehatan Sekarang"**.
4. Aplikasi akan memproses data dan langsung mengarahkan Anda ke halaman **Hasil Analisis** (`results.html`).
5. Pada halaman hasil, Anda dapat meninjau:
   - Skor Kesehatan (0 - 100)
   - Kategori BMI
   - Rincian nilai indikator
   - Bar analisis detail
   - Rekomendasi saran kesehatan
6. Klik tombol **"Download PDF"** untuk menyimpan laporan kesehatan ke perangkat Anda, atau tombol **"Cek Lagi"** untuk melakukan pengujian ulang.

---

## ⚠️ Health Disclaimer

> **PENTING**: Aplikasi HealthCheck dibuat murni untuk tujuan informasi umum, edukasi, dan peningkat kesadaran kesehatan mandiri. Hasil kalkulasi, skor kesehatan, kategori BMI, dan rekomendasi yang ditampilkan oleh aplikasi ini **BUKANLAH diagnosis medis profesional** dan **TIDAK BOLEH digunakan sebagai pengganti konsultasi, diagnosis, atau perawatan medis dari dokter atau ahli kesehatan profesional**. 
> 
> Jika Anda mengalami masalah kesehatan atau memiliki pertanyaan mengenai kondisi medis tertentu, selalu konsultasikan langsung dengan dokter atau tenaga medis yang berwenang.

---

## 💻 Development

- **Architecture**: Murni Client-side Architecture (SPA-like flow dengan HTML multi-halaman yang dihubungkan melalui `localStorage`).
- **Encapsulated Class**: Seluruh alur perhitungan medis berada di dalam class `HealthAnalyzer` di `app.js`, memudahkan pemeliharaan tanpa efek samping pada UI.

---

## 🔮 Future Improvements

Ide pengembangan potensial untuk versi mendatang:
- **Riwayat Asesmen**: Menyimpan riwayat pemeriksaan kesehatan di `localStorage` dengan grafik riwayat perkembangan dari waktu ke waktu.
- **Export/Import JSON**: Fitur untuk mencadangkan dan memulihkan data catatan kesehatan pribadi.
- **Multi-language Support**: Pilihan antarmuka Bahasa Indonesia dan Bahasa Inggris.
- **Mode Pastel Gelap (Dark Mode)**: Tema warna pastel malam yang nyaman untuk mata saat malam hari.

---

<p center>&copy; 2026 HealthCheck. Developed with care for a friendly & accessible healthcare experience.</p>
