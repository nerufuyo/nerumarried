# Wedding Invitation Website - Project Plan

## 🎯 Project Overview
Website undangan pernikahan modern dengan tema hitam, putih, dan gold yang dilengkapi animasi elegan menggunakan TypeScript, Tailwind CSS, dan Framer Motion.

## 📋 Technical Requirements

### Core Technologies
- **TypeScript**: Static typing dan better development experience
- **Tailwind CSS**: Utility-first CSS framework untuk styling
- **Framer Motion**: Animasi dan transisi yang smooth
- **Next.js/React**: Framework untuk development
- **JSON**: Data management untuk multi-language support

### Additional Tools & Libraries
- **Lucide React**: Icon library yang elegant
- **React Hook Form**: Form handling untuk RSVP
- **Date-fns**: Date manipulation
- **React Intersection Observer**: Scroll animations
- **Embla Carousel**: Gallery carousel
- **React Leaflet**: Maps integration (optional)

## 🎨 Design System

### Color Palette
```css
Primary Colors:
- Black: #000000, #1a1a1a, #2d2d2d
- White: #ffffff, #f8f9fa, #e9ecef
- Gold: #d4af37, #b8860b, #ffd700, #fff8dc

Gradients:
- Gold gradient: from-yellow-400 via-yellow-500 to-yellow-600
- Dark gradient: from-black via-gray-900 to-gray-800
```

### Typography
- **Headings**: Elegant serif fonts (Playfair Display, Cormorant Garamond)
- **Body**: Clean sans-serif (Inter, Poppins)
- **Script**: Cursive for names (Dancing Script, Great Vibes)

### Animation Principles
- **Entrance**: Fade in from bottom, scale, stagger
- **Hover**: Subtle scale, glow effects
- **Scroll**: Parallax, reveal on scroll
- **Page transitions**: Smooth fade/slide

## 📁 Project Structure

```
wedding-website/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── sections/     # Page sections
│   │   ├── animations/   # Animation components
│   │   └── layout/       # Layout components
│   ├── data/
│   │   ├── wedding.json  # Wedding data
│   │   ├── translations/ # Language files
│   │   └── gallery.json  # Photo gallery data
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── styles/          # Global styles
├── public/
│   ├── images/          # Wedding photos
│   ├── music/           # Background music
│   └── favicon/         # Favicon files
└── docs/                # Documentation
```

## 🔧 Development Phases

### Phase 1: Setup & Foundation (2-3 days)
- [ ] Initialize Next.js with TypeScript
- [ ] Configure Tailwind CSS with custom theme
- [ ] Setup Framer Motion
- [ ] Create basic project structure
- [ ] Setup JSON data structure
- [ ] Configure development environment

### Phase 2: Core Components (3-4 days)
- [ ] Hero section with names and date
- [ ] Navigation with smooth scroll
- [ ] Story section (how we met)
- [ ] Wedding details (venue, time, dress code)
- [ ] Gallery/carousel component
- [ ] RSVP form
- [ ] Footer with contact info

### Phase 3: Animations & Interactions (2-3 days)
- [ ] Entrance animations for all sections
- [ ] Scroll-triggered animations
- [ ] Hover effects and micro-interactions
- [ ] Page transition animations
- [ ] Loading animations
- [ ] Mobile touch interactions

### Phase 4: Multi-language Support (1-2 days)
- [ ] JSON structure for translations
- [ ] Language switcher component
- [ ] Dynamic content rendering
- [ ] Language persistence

### Phase 5: Optimization & Testing (2-3 days)
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Cross-browser testing
- [ ] SEO optimization
- [ ] Accessibility improvements

## 📱 Website Sections

### 1. Landing/Hero Section
- **Content**: Couple names, wedding date, countdown timer
- **Animations**: Typewriter effect, floating elements, parallax background
- **Features**: Background music toggle, scroll indicator

### 2. Our Story
- **Content**: How you met, relationship timeline
- **Animations**: Timeline reveal, photo fade-ins, text stagger
- **Features**: Interactive timeline, photo hover effects

### 3. Wedding Details
- **Content**: Ceremony & reception details, venue info, schedule
- **Animations**: Card flip animations, map reveal
- **Features**: Add to calendar, location map, dress code info

### 4. Gallery
- **Content**: Engagement photos, couple photos
- **Animations**: Masonry layout with stagger, lightbox transitions
- **Features**: Carousel, full-screen view, download option

### 5. RSVP Section
- **Content**: RSVP form, dietary restrictions, song requests
- **Animations**: Form field focus animations, submit success
- **Features**: Form validation, confirmation email

### 6. Gift Registry
- **Content**: Gift suggestions, bank transfer info
- **Animations**: Gift box hover effects, QR code reveal
- **Features**: Copy account details, multiple payment methods

## 🌐 JSON Data Structure

### wedding.json
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
    "date": "2024-XX-XX",
    "ceremony": {
      "time": "09:00",
      "venue": "Nama Venue",
      "address": "Alamat Lengkap"
    },
    "reception": {
      "time": "11:00", 
      "venue": "Nama Venue",
      "address": "Alamat Lengkap"
    }
  },
  "story": {
    "timeline": [...]
  },
  "gallery": [...],
  "registry": [...]
}
```

## 🎵 Animation Examples

### Scroll Animations
```typescript
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
}
```

### Hover Effects
```typescript
const cardHover = {
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)",
    transition: { duration: 0.3 }
  }
}
```

## 📱 Responsive Design
- **Mobile First**: Start with mobile design
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px)
- **Touch Interactions**: Swipe gestures for gallery
- **Performance**: Optimized images and animations for mobile

## 🔍 SEO & Performance
- **Meta Tags**: Open Graph, Twitter Cards
- **Structured Data**: Wedding event schema
- **Image Optimization**: WebP format, lazy loading
- **Bundle Size**: Code splitting, tree shaking
- **Loading**: Progressive loading, skeleton screens

## 🚀 Deployment Options
1. **Vercel**: Seamless Next.js deployment
2. **Netlify**: Static site hosting with forms
3. **GitHub Pages**: Free static hosting
4. **Custom Domain**: Professional wedding URL

## 📊 Timeline Estimate
- **Total Development**: 10-15 days
- **Content Collection**: 2-3 days
- **Testing & Refinement**: 3-4 days
- **Total Project**: 15-22 days

## 💡 Additional Features (Optional)
- [ ] Guest book with comments
- [ ] Live streaming integration
- [ ] Photo upload by guests
- [ ] Wedding hashtag display
- [ ] Spotify playlist integration
- [ ] Weather widget for wedding day
- [ ] Transportation info
- [ ] Accommodation recommendations

## 🎨 Design Inspiration Resources
- **Dribbble**: Wedding website designs
- **Awwwards**: Award-winning wedding sites
- **Pinterest**: Wedding invitation designs
- **Behance**: Typography and layout ideas

Apakah Anda ingin saya mulai membuat prototype atau ada bagian tertentu yang ingin Anda ubah atau tambahkan?