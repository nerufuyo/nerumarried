# 💒 Neru & AI Wedding Invitation

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-pink)](https://www.framer.com/motion/)

An elegant digital wedding invitation with black, white, and gold theme. Built using modern technologies for an unforgettable experience.

## ✨ Key Features

### 🎯 Core Features
- **📱 Responsive Design** - Optimized for all devices
- **🎨 Advanced Animations** - 15+ interactive animation components
- **🌍 Multi-language** - 8 languages (Indonesia, English, 日本語, 한국어, 中文, Español, Français, العربية)
- **♿ Accessibility** - WCAG 2.1 AA compliant
- **⚡ High Performance** - 182KB First Load JS

### 🎭 Animations & Interactions
- **ParticleField** - Floating golden particles
- **ImageReveal** - Sophisticated image reveal effects
- **Magnetic** - Mouse-following interactions
- **TextReveal** - Progressive text animations
- **TouchGestures** - Swipe, pinch, pull for mobile
- **ScrollAnimations** - 7 types of scroll animations

### 🌐 Multi-language Support
- **Auto-detection** - Automatic browser language detection
- **RTL Support** - Arabic language support
- **Cultural Adaptation** - Typography and format adjustments
- **Persistent Selection** - Language choice saved

## 🛠️ Technology Stack

### Frontend Stack
- **Next.js 15.4.6** - React framework with Turbopack
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Animations and transitions

### Optimization & Performance
- **PWA Ready** - Web App Manifest and offline support
- **SEO Optimized** - Structured data and meta tags
- **Core Web Vitals** - Real-time performance monitoring
- **Lazy Loading** - Intersection Observer optimizations
- **Font Optimization** - Next.js font loading with display swap

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn or pnpm

### Installation
```bash
# Clone repository
git clone https://github.com/nerufuyo/nerumarried.git
cd nerumarried

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

### Available Scripts
```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage
├── components/
│   ├── animations/        # 15+ animation components
│   │   ├── ParticleField.tsx
│   │   ├── ImageReveal.tsx
│   │   ├── Magnetic.tsx
│   │   ├── TextReveal.tsx
│   │   ├── TouchGestures.tsx
│   │   └── ScrollAnimations/
│   ├── sections/          # Main website sections
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
│   ├── translations/     # Translation files for 8 languages
│   │   ├── en.json
│   │   ├── id.json
│   │   ├── ja.json
│   │   ├── ko.json
│   │   ├── zh.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   └── ar.json
│   └── wedding.json      # Wedding data
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
- **Bundle Size**: Tree-shaking and code splitting optimized

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **Screen Reader** support with ARIA labels
- **Keyboard Navigation** complete
- **Color Contrast** validation
- **Focus Management** properly implemented
- **Mobile Touch Targets** 44px minimum

## 🌍 Internationalization

Supports 8 languages with features:
- Auto-detection of browser language
- RTL support for Arabic
- Date and number formatting per locale
- Typography adjusted per language
- Persistent language selection

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
```

Deploy to Vercel with one click or connect to GitHub repository.

### Manual Deployment
```bash
npm run build
npm run start
```

## 📝 Customization

### Changing Wedding Data
Edit the `src/data/wedding.json` file:

```json
{
  "couple": {
    "bride": {
      "name": "Bride Name",
      "fullName": "Full Name",
      "parents": ["Father", "Mother"]
    },
    "groom": {
      "name": "Groom Name",
      "fullName": "Full Name", 
      "parents": ["Father", "Mother"]
    }
  },
  "wedding": {
    "date": "2024-12-15",
    "ceremony": {
      "time": "09:00",
      "venue": "Venue Name",
      "address": "Full Address"
    }
  }
}
```

### Adding New Language
1. Create translation file in `src/data/translations/[lang].json`
2. Add language to `src/types/index.ts`
3. Update `LanguageUtils.ts` for language detection

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- **Next.js Team** - Amazing framework
- **Tailwind CSS** - Powerful utility-first CSS
- **Framer Motion** - Best animation library for React
- **Vercel** - Seamless deployment platform

---

<div align="center">

**💒 Built with ❤️ for a special day**

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black)](https://nextjs.org/)
[![Powered by Vercel](https://img.shields.io/badge/Powered%20by-Vercel-black)](https://vercel.com/)

</div>