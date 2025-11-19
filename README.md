# Table d'Adrian - Luxury Private Chef Services

A modern, animated landing page for Table d'Adrian, featuring sophisticated animations, SEO optimization, and a minimalist design approach.

## 🚀 Features

- **Modern Animations**: Powered by Framer Motion with smooth scroll-triggered animations
- **SEO Optimized**: Comprehensive SEO strategy with structured data and optimized content
- **Responsive Design**: Mobile-first approach with perfect rendering on all devices
- **SVGL Icon System**: Custom SVG icon integration with animated interactions
- **Performance Focused**: Optimized for Core Web Vitals and fast loading
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Custom SVGL implementation
- **UI Components**: Headless UI, Material UI elements
- **Build Tool**: Next.js built-in optimizer

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/tabledadriandev/tabledadrian.git
cd tabledadrian
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Homepage with all sections
│   └── globals.css     # Global styles and Tailwind config
├── components/
│   ├── Navigation.tsx  # Fixed navigation with smooth scroll
│   ├── Hero.tsx        # Animated hero section
│   ├── About.tsx       # About section with features
│   ├── Services.tsx    # Services grid with FAQ
│   ├── Gallery.tsx     # Bento grid gallery
│   ├── Contact.tsx     # Contact form and info
│   ├── Footer.tsx      # Minimal footer
│   ├── ScrollToTop.tsx # Scroll to top button
│   └── icons/
│       └── SVGLIcon.tsx # SVGL icon wrapper component
```

## 🎨 Design System

### Colors
- **Primary Gold**: #D4AF37
- **Cream**: #FAF8F3
- **Slate Blue**: #8FA3B0
- **Terracotta**: #E09F7D
- **Charcoal**: #333333

### Typography
- **Headings**: Playfair Display, Cormorant, or Fraunces (serif)
- **Body**: Inter, DM Sans, or Manrope (sans-serif)

### Animations
- Scroll-triggered animations with Intersection Observer
- Smooth micro-interactions on hover/click
- Staggered animations for lists and grids
- Floating elements with continuous motion

## 🔍 SEO Features

- **Optimized Meta Tags**: Title, description, Open Graph, Twitter Cards
- **Structured Data**: LocalBusiness and Service schema
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Content Strategy**: Keyword-optimized copy targeting private chef searches
- **FAQ Schema**: Structured FAQ section for rich snippets

## 🚀 Performance Optimization

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting by Next.js
- **Font Optimization**: Next.js font optimization
- **CSS Optimization**: Tailwind CSS with PurgeCSS
- **Minimal JavaScript**: Only essential animations and interactions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🧩 SVGL Icon Usage

The project includes a custom SVGL icon system. Icons are defined in `src/components/icons/SVGLIcon.tsx`.

To use an icon:
```tsx
import SVGLIcon from '@/components/icons/SVGLIcon';

<SVGLIcon 
  name="chef-hat" 
  size={48} 
  className="text-gold"
  whileHover={{ rotate: 360 }}
/>
```

Available icons:
- `chef-hat`, `utensils`, `wine-glass`, `plate`
- `arrow-down`, `check`, `star`
- `instagram`, `twitter`, `linkedin`
- `calendar`, `clock`, `location`, `envelope`, `phone`

## 🌐 Deployment

The site is optimized for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📄 License

© 2025 Table d'Adrian. All rights reserved.

## 🤝 Contributing

For any updates or modifications, ensure:
1. Maintain the existing design system
2. Test on all breakpoints
3. Verify SEO elements are intact
4. Check accessibility compliance
5. Ensure smooth animations across devices
