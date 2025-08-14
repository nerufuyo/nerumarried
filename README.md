# 💒 Neru & AI Wedding Invitation

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-pink)](https://www.framer.com/motion/)

Undangan pernikahan digital yang elegan dengan tema hitam, putih, dan emas. Dibangun menggunakan teknologi modern untuk pengalaman yang tak terlupakan.

## ✨ Fitur Utama

### 🎯 Fitur Inti
- **📱 Responsive Design** - Optimal di semua perangkat
- **🎨 Animasi Canggih** - 15+ komponen animasi interaktif
- **🌍 Multi-bahasa** - 8 bahasa (Indonesia, English, 日本語, 한국어, 中文, Español, Français, العربية)
- **♿ Aksesibilitas** - WCAG 2.1 AA compliant
- **⚡ Performa Tinggi** - 182KB First Load JS

### 🎭 Animasi & Interaksi
- **ParticleField** - Partikel emas yang mengambang
- **ImageReveal** - Efek reveal gambar yang sophisticated
- **Magnetic** - Interaksi yang mengikuti mouse
- **TextReveal** - Animasi teks bertahap
- **TouchGestures** - Swipe, pinch, pull untuk mobile
- **ScrollAnimations** - 7 jenis animasi scroll

### 🌐 Dukungan Multi-bahasa
- **Auto-detection** - Deteksi bahasa browser otomatis
- **RTL Support** - Dukungan bahasa Arab
- **Cultural Adaptation** - Penyesuaian tipografi dan format
- **Persistent Selection** - Pilihan bahasa tersimpan

## 🛠️ Teknologi

### Frontend Stack
- **Next.js 15.4.6** - React framework dengan Turbopack
- **TypeScript** - Type safety dan developer experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Animasi dan transisi

### Optimisasi & Performance
- **PWA Ready** - Web App Manifest dan offline support
- **SEO Optimized** - Structured data dan meta tags
- **Core Web Vitals** - Monitoring performa real-time
- **Lazy Loading** - Intersection Observer optimizations
- **Font Optimization** - Next.js font loading dengan display swap

## 🚀 Memulai

### Prasyarat
- Node.js 18.17 atau lebih baru
- npm atau yarn atau pnpm

### Instalasi
```bash
# Clone repository
git clone https://github.com/nerufuyo/nerumarried.git
cd nerumarried

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

### Scripts yang Tersedia
```bash
npm run dev          # Development server dengan Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## 📁 Struktur Project

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles dan theme
│   ├── layout.tsx         # Root layout dengan metadata
│   └── page.tsx           # Homepage
├── components/
│   ├── animations/        # 15+ komponen animasi
│   │   ├── ParticleField.tsx
│   │   ├── ImageReveal.tsx
│   │   ├── Magnetic.tsx
│   │   ├── TextReveal.tsx
│   │   ├── TouchGestures.tsx
│   │   └── ScrollAnimations/
│   ├── sections/          # Section utama website
│   │   ├── HeroSection.tsx
│   │   ├── StorySection.tsx
│   │   ├── WeddingDetailsSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── RSVPSection.tsx
│   │   └── GiftRegistrySection.tsx
│   ├── ui/               # UI components
│   │   └── LanguageSwitcher.tsx
│   ├── monitoring/       # Performance monitoring
│   │   └── PerformanceMonitor.tsx
│   └── optimization/     # Mobile & performance optimizations
│       └── MobileOptimization.tsx
├── data/
│   ├── translations/     # File terjemahan 8 bahasa
│   │   ├── en.json
│   │   ├── id.json
│   │   ├── ja.json
│   │   ├── ko.json
│   │   ├── zh.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   └── ar.json
│   └── wedding.json      # Data pernikahan
├── hooks/               # Custom React hooks
│   └── useTranslation.ts
├── types/               # TypeScript type definitions
│   └── index.ts
└── utils/               # Utility functions
    ├── accessibility.utils.ts
    ├── performance.utils.ts
    ├── language.utils.ts
    ├── seo.utils.ts
    └── storage.utils.ts
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--color-black: #000000, #1a1a1a, #2d2d2d
--color-white: #ffffff, #f8f9fa, #e9ecef
--color-gold: #d4af37, #b8860b, #ffd700, #fff8dc

/* Gradients */
--gradient-gold: from-yellow-400 via-yellow-500 to-yellow-600
--gradient-dark: from-black via-gray-900 to-gray-800
```

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)  
- **Script**: Dancing Script (cursive)

## 📊 Performance Metrics

- **First Load JS**: 182KB (optimized)
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Excellent ratings
- **Bundle Size**: Tree-shaking dan code splitting optimized

## ♿ Aksesibilitas

- **WCAG 2.1 AA** compliant
- **Screen Reader** support dengan ARIA labels
- **Keyboard Navigation** lengkap
- **Color Contrast** validation
- **Focus Management** yang proper
- **Mobile Touch Targets** 44px minimum

## 🌍 Internationalization

Mendukung 8 bahasa dengan fitur:
- Auto-detection bahasa browser
- RTL support untuk bahasa Arab
- Format tanggal dan angka sesuai locale
- Tipografi yang disesuaikan per bahasa
- Persistent language selection

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
```

Deploy ke Vercel dengan satu klik atau connect ke GitHub repository.

### Manual Deployment
```bash
npm run build
npm run start
```

## 📝 Customization

### Mengubah Data Pernikahan
Edit file `src/data/wedding.json`:

```json
{
  "couple": {
    "bride": {
      "name": "Nama Pengantin Wanita",
      "fullName": "Nama Lengkap",
      "parents": ["Ayah", "Ibu"]
    },
    "groom": {
      "name": "Nama Pengantin Pria",
      "fullName": "Nama Lengkap", 
      "parents": ["Ayah", "Ibu"]
    }
  },
  "wedding": {
    "date": "2024-12-15",
    "ceremony": {
      "time": "09:00",
      "venue": "Nama Venue",
      "address": "Alamat Lengkap"
    }
  }
}
```

### Menambah Bahasa Baru
1. Buat file terjemahan di `src/data/translations/[lang].json`
2. Tambahkan bahasa ke `src/types/index.ts`
3. Update `LanguageUtils.ts` untuk deteksi bahasa

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- **Next.js Team** - Framework yang luar biasa
- **Tailwind CSS** - Utility-first CSS yang powerful
- **Framer Motion** - Library animasi terbaik untuk React
- **Vercel** - Platform deployment yang seamless

---

<div align="center">

**💒 Dibuat dengan ❤️ untuk hari yang spesial**

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black)](https://nextjs.org/)
[![Powered by Vercel](https://img.shields.io/badge/Powered%20by-Vercel-black)](https://vercel.com/)

</div>