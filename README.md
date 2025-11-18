# 🎨 3D T-Shirt Designer

Aplikasi web interaktif untuk mendesain baju 3D dengan kemampuan menempelkan desain custom Anda ke model baju 3D.

## ✨ Fitur Utama

- **Model 3D Realistis**: Baju 3D lengkap dengan lengan dan kerah
- **Upload Desain**: Upload gambar/logo Anda sendiri untuk ditempelkan ke baju
- **Ubah Warna Baju**: Pilih warna baju sesuai keinginan dengan color picker
- **Kontrol Ukuran**: Atur ukuran desain dengan slider (0.5x - 2x)
- **Posisi Vertikal**: Geser desain ke atas atau bawah pada baju
- **Kontrol 3D Interaktif**:
  - Drag untuk memutar baju
  - Scroll untuk zoom in/out
- **Reset**: Kembalikan semua pengaturan ke default
- **Screenshot**: Ambil screenshot hasil desain Anda

## 🚀 Cara Menggunakan

1. **Jalankan Server**:
   ```bash
   python3 -m http.server 8000
   ```

2. **Buka Browser**:
   ```
   http://localhost:8000
   ```

3. **Mulai Mendesain**:
   - Klik tombol "Pilih Gambar" untuk upload desain Anda
   - Pilih warna baju dengan color picker
   - Atur ukuran dan posisi desain dengan slider
   - Drag untuk memutar baju dan lihat dari berbagai sudut
   - Scroll untuk zoom in/out
   - Klik "Screenshot" untuk menyimpan hasil desain

## 🛠️ Teknologi

- **Three.js**: Library 3D untuk rendering model baju
- **OrbitControls**: Kontrol interaktif untuk rotasi dan zoom
- **HTML5 Canvas**: Rendering grafis 3D
- **Vanilla JavaScript**: Tanpa framework tambahan
- **CSS3**: Styling modern dengan gradient dan shadow

## 📋 Fitur Detail

### Upload Desain
- Support format: JPG, PNG, GIF, SVG, dan format gambar lainnya
- Preview gambar sebelum diterapkan ke baju
- Desain diterapkan secara real-time ke model 3D

### Kontrol Warna
- Color picker lengkap dengan spectrum
- Warna diterapkan ke seluruh bagian baju (body, lengan, kerah)
- Update real-time saat memilih warna

### Kontrol Ukuran & Posisi
- Slider ukuran: 0.5x hingga 2x
- Slider posisi vertikal: -0.5 hingga 0.5
- Nilai ditampilkan secara real-time
- Perubahan langsung terlihat pada model 3D

### Kontrol 3D
- **Drag**: Klik dan drag untuk memutar baju
- **Scroll**: Scroll mouse untuk zoom in/out
- **Damping**: Animasi smooth saat memutar
- **Batas**: Zoom dan rotasi dibatasi untuk pengalaman optimal

### Lighting & Shadow
- Ambient light untuk pencahayaan merata
- Directional light dengan shadow
- Point light untuk highlight
- Shadow mapping untuk realisme

## 🎯 Use Case

- Desain merchandise custom
- Preview desain sebelum produksi
- Presentasi konsep desain baju
- Portfolio desainer grafis
- E-commerce preview produk

## 📱 Responsive

Aplikasi ini responsive dan dapat digunakan di berbagai ukuran layar.

## 🎨 Desain UI

- Gradient background modern (purple-blue)
- Panel kontrol dengan glassmorphism effect
- Button dengan hover animation
- Slider dengan nilai real-time
- Info tooltip di bagian bawah

## 🔧 Customization

Anda dapat dengan mudah memodifikasi:
- Warna default baju
- Ukuran model 3D
- Posisi kamera
- Lighting setup
- Warna UI theme

Selamat mendesain! 🎉
