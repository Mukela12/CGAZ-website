# CGAZ Website - System Architecture Documentation

**Project:** Cashew Growers Association of Zambia (CGAZ) Website
**Version:** 1.0
**Last Updated:** January 14, 2026
**Status:** Phase 1-2 Complete ✅

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Patterns](#architecture-patterns)
4. [Component Architecture](#component-architecture)
5. [Data Flow](#data-flow)
6. [Design System](#design-system)
7. [Performance Considerations](#performance-considerations)
8. [Security](#security)
9. [Scalability](#scalability)

---

## System Overview

### Project Goals

The CGAZ website serves multiple audiences with distinct needs:

1. **Farmers (22,490 members)** - Access training, resources, success stories, membership info
2. **Government/Donors** - Professional showcase of impact, projects, partnerships
3. **Buyers/Wholesalers** - Product information, quality standards, contact
4. **General Public** - Brand awareness, news, events

### Architecture Philosophy

**Separation of Concerns**
- Frontend (Next.js 15) deployed to Netlify
- Backend/CMS (Payload CMS) deployed to Railway
- Static generation where possible for performance
- Dynamic content through CMS API

**Progressive Enhancement**
- Core content accessible without JavaScript
- Enhanced interactions with client-side React
- Responsive images with lazy loading
- Optimized for 3G connections

**Device-First Design**
- Separate mobile and desktop component implementations
- Not just responsive CSS, but entirely different UX patterns
- Mobile: Bottom navigation, single-column, touch-optimized
- Desktop: Sidebar navigation, multi-column, hover states

---

## Technology Stack

### Frontend Layer

**Framework: Next.js 15.1.0**
- **Why Next.js?**
  - Server Components for optimal performance
  - Built-in image optimization
  - File-based routing
  - SEO-friendly with metadata API
  - Excellent TypeScript support

**Language: TypeScript (Strict Mode)**
- Type safety across entire codebase
- Better IDE support and refactoring
- Self-documenting code
- Catch errors at compile time

**Styling: Tailwind CSS 3.4.17**
- Utility-first approach for rapid development
- Custom design tokens for CGAZ brand
- Purged CSS for minimal bundle size
- Glassmorphism utilities

**Animation: Framer Motion 12.24.11**
- Smooth, performant animations
- Scroll-triggered effects
- Page transitions
- Glass effect animations

**Icons: Lucide React 0.468.0**
- Premium, consistent icon set
- Tree-shakeable for smaller bundles
- NO emojis or decorative icons
- Professional appearance

### Backend/CMS Layer (Phase 3)

**CMS: let CMS 3.0**
- **Why Payload?**
  - Native Next.js integration
  - TypeScript-first
  - Runs in same codebase (optional)
  - Excellent media management
  - Built-in i18n support

**Database: PostgreSQL (Railway)**
- Relational data model
- ACID compliance
- Excellent performance
- Easy to scale

**Image Storage: Cloudinary**
- Automatic optimization
- WebP/AVIF conversion
- Responsive image sets
- CDN delivery

### Infrastructure

**Frontend Hosting: Netlify**
- Automatic deployments from Git
- Edge functions
- Instant rollbacks
- Free SSL certificates

**Backend Hosting: Railway**
- PostgreSQL database
- Payload CMS admin panel
- Environment management
- Easy scaling

---

## Architecture Patterns

### 1. Adaptive Component Pattern

**Problem:** Responsive CSS compromises both mobile and desktop experiences.

**Solution:** Separate component implementations for each platform.

```typescript
// components/adaptive/AdaptiveNav.tsx
export function AdaptiveNav() {
  const { isMobile } = useDevice();
  return isMobile ? <MobileBottomNav /> : <DesktopSidebar />;
}
```

**Benefits:**
- Complete control over each experience
- No CSS compromises or media query complexity
- Better performance through code splitting
- Clearer component logic

**Implementation:**
```
components/
├── mobile/           # Mobile-specific components
├── desktop/          # Desktop-specific components
├── shared/           # Platform-agnostic components
└── adaptive/         # Wrappers that choose the right component
```

**Breakpoint:** 1024px (lg)
- Below: Mobile components
- Above: Desktop components

### 2. Glassmorphism Design System

**Visual Identity:** Modern, agricultural, professional

**Core Effect:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

**Usage:**
- Navigation overlays (mobile bottom nav, desktop sidebar)
- Hero section content cards
- Statistics/metrics displays
- Call-to-action sections
- Modal dialogs

**Accessibility:**
- Minimum 4.5:1 contrast ratio (WCAG AA)
- Fallback styles for unsupported browsers
- Respects `prefers-reduced-transparency`

### 3. Server Component Architecture

**Default:** Server Components
- Better performance (less JavaScript)
- SEO-friendly
- Simplified data fetching

**Client Components:** Only when needed
- Interactive UI (forms, animations)
- Browser APIs (localStorage, geolocation)
- Event handlers
- Marked with `'use client'` directive

**Hydration Strategy:**
```typescript
// useDevice hook prevents hydration mismatches
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true);
}, []);

if (!isHydrated) {
  return <DefaultLayout />;
}
```

### 4. Image Optimization Strategy

**Approach:** Cloudinary + Next.js Image Component

**Pipeline:**
1. **Source:** 49 professional photos in CGAZ-IMAGES folder
2. **Upload:** Organized upload to Cloudinary (Phase 4)
3. **Delivery:** Next.js Image component with Cloudinary URLs
4. **Optimization:** Automatic format conversion (WebP/AVIF)
5. **Responsive:** Multiple sizes generated automatically

**Implementation:**
```typescript
// components/shared/OptimizedImage/index.tsx
<Image
  src={cloudinaryUrl}
  alt={descriptiveAlt}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
  loading="lazy"
/>
```

---

## Component Architecture

### Component Hierarchy

```
AdaptiveLayout (Root)
├── AdaptiveNav
│   ├── MobileBottomNav (< 1024px)
│   │   └── 5 navigation items
│   └── DesktopSidebar (≥ 1024px)
│       └── Nested navigation
├── Main Content
│   ├── Hero
│   │   └── GlassCard (overlay)
│   ├── Stats
│   │   └── Multiple GlassCards
│   ├── Page-specific sections
│   │   └── Reusable components
│   └── Footer
└── Mobile padding-bottom / Desktop margin-left
```

### Component Categories

**1. Layout Components**
- `AdaptiveLayout` - Root layout with device detection
- `AdaptiveNav` - Conditional navigation renderer

**2. Navigation Components**
- `MobileBottomNav` - 5-item fixed bottom navigation
- `DesktopSidebar` - Fixed left sidebar with nested menus

**3. Content Components**
- `Hero` - Full-width hero sections (4 height variants)
- `GlassCard` - Glassmorphism card (3 style variants)
- `Stats` - Statistics display with icons
- `Button` - Call-to-action buttons (4 variants, 3 sizes)
- `Footer` - Comprehensive site footer

**4. Media Components**
- `OptimizedImage` - Next.js Image wrapper with Cloudinary support

**5. Utility Hooks**
- `useDevice` - Device detection with hydration safety

### Component Design Principles

**1. Composition over Configuration**
```typescript
// Good: Composable
<Hero height="large">
  <GlassCard variant="overlay">
    <h1>Title</h1>
    <Button variant="primary">CTA</Button>
  </GlassCard>
</Hero>

// Avoid: Too many props
<Hero
  height="large"
  overlayType="glass"
  title="Title"
  ctaText="CTA"
  ctaVariant="primary"
/>
```

**2. TypeScript Props**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
```

**3. Tailwind Utilities with cn()**
```typescript
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'base-styles',
  variant === 'primary' && 'variant-specific-styles',
  className // Allow overrides
)}>
```

---

## Data Flow

### Current Architecture (Phase 1-2: Static)

```
Page Components (SSR/SSG)
    ↓
Static Data (in components)
    ↓
Rendered HTML
    ↓
Client Hydration
    ↓
Interactive UI
```

### Future Architecture (Phase 3+: CMS)

```
User Request
    ↓
Next.js Server Component
    ↓
Fetch from Payload CMS API
    ↓
Data Transformation
    ↓
Render HTML
    ↓
Send to Client
    ↓
Hydrate Interactive Parts
```

**Content Flow:**
```
Admin → Payload CMS → PostgreSQL
                ↓
        Next.js API Route
                ↓
        Server Component
                ↓
        Rendered Page
```

### Multi-Language Data Flow (Phase 3)

```
Browser Language Detection
    ↓
next-intl Middleware
    ↓
Load locale messages
    ↓
Fetch CMS content (localized)
    ↓
Render in user's language
```

---

## Design System

### Color Palette

**Primary Colors** (Agricultural Theme)
```css
--cashew-green: #34A853;        /* Primary brand color */
--cashew-dark-green: #1E7E34;   /* Darker shade for accents */
--cashew-brown: #8B6914;        /* Cashew nut brown */
--earth-brown: #6B4423;         /* Rich earth tone */
```

**Secondary Colors**
```css
--zambia-copper: #CC7722;       /* Zambian copper heritage */
--growth-lime: #A4D65E;         /* Growth and prosperity */
--sky-blue: #4A90E2;            /* Trust and reliability */
```

**Neutrals**
```css
--neutral-50: #FAFAFA;
--neutral-100: #F5F5F5;
--neutral-200: #E5E5E5;
--neutral-300: #D4D4D4;
--neutral-400: #A3A3A3;
--neutral-500: #737373;
--neutral-600: #525252;
--neutral-700: #404040;
--neutral-800: #262626;
--neutral-900: #171717;
```

### Typography

**Font Families**
- **Headings:** Inter (700, 600, 500)
- **Body:** Inter (400, 500)
- **Accents:** Playfair Display (quotes, special sections)

**Type Scale**
```
text-xs:   12px
text-sm:   14px
text-base: 16px
text-lg:   18px
text-xl:   20px
text-2xl:  24px
text-3xl:  30px
text-4xl:  36px
text-5xl:  48px
text-6xl:  60px
```

**Line Heights**
- Headings: 1.2
- Body: 1.6
- Captions: 1.4

### Spacing System

**Base Unit:** 4px

```
space-1:  4px
space-2:  8px
space-3:  12px
space-4:  16px
space-6:  24px
space-8:  32px
space-12: 48px
space-16: 64px
space-20: 80px
space-24: 96px
```

### Breakpoints

```
sm:  640px   (Mobile landscape)
md:  768px   (Tablet portrait)
lg:  1024px  (Tablet landscape / Desktop breakpoint)
xl:  1280px  (Desktop)
2xl: 1536px  (Large desktop)
```

**Key Breakpoint:** 1024px (lg)
- Below: Mobile components
- Above: Desktop components

---

## Performance Considerations

### Build Optimization

**Bundle Analysis**
- Current: ~162KB first load JS
- Target: < 170KB first load JS
- Code splitting by route

**Image Optimization**
- Next.js Image component
- Cloudinary automatic format conversion
- Lazy loading with blur placeholders
- Responsive image sets

**Font Loading**
- Variable fonts (Inter)
- Font display: swap
- Preload critical fonts

### Runtime Performance

**Server Components**
- Reduce client-side JavaScript
- Faster initial page load
- Better SEO

**Hydration Strategy**
- Selective hydration
- Lazy load interactive components
- useDevice hook prevents mismatches

**Caching Strategy**
```
Static Pages:      Cache-Control: public, max-age=3600
Dynamic Content:   Cache-Control: public, s-maxage=60, stale-while-revalidate
Images:            Cache-Control: public, max-age=31536000, immutable
```

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**Strategies:**
- Hero images: Priority loading
- Above-fold content: Server-rendered
- Below-fold: Lazy loaded
- Font swapping: Minimize layout shift

---

## Security

### Frontend Security

**Content Security Policy**
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' https://res.cloudinary.com data:;
font-src 'self';
connect-src 'self' https://api-cgaz.railway.app;
```

**Environment Variables**
- Never commit secrets to Git
- Use `.env.local` for local development
- Netlify environment variables for production
- Prefix public variables with `NEXT_PUBLIC_`

### Backend Security (Phase 3)

**Authentication**
- JWT tokens for admin users
- Secure password hashing (bcrypt)
- Rate limiting on API endpoints
- CORS configuration

**Database**
- Prepared statements (SQL injection prevention)
- Input validation
- Access control per collection

**File Uploads**
- File type validation
- Size limits
- Virus scanning (Cloudinary)
- CDN delivery (Cloudinary)

---

## Scalability

### Current Limits (Phase 1-2)

- **Pages:** 14 static pages
- **Build time:** < 30 seconds
- **Bundle size:** ~162KB
- **Images:** Placeholder paths

### Future Scale (Phase 3+)

**Content Growth**
- Hundreds of blog posts
- Dozens of projects
- Multiple product categories
- Thousands of images

**Architectural Support**
- Incremental Static Regeneration (ISR)
- On-demand revalidation
- CDN caching (Netlify Edge)
- Database indexing (PostgreSQL)

**Performance Monitoring**
- Vercel Analytics (optional)
- Sentry for error tracking
- Uptime Robot for availability
- Lighthouse CI in deployment pipeline

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Request                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Netlify CDN Edge                       │
│  - SSL/TLS Termination                                  │
│  - Static Asset Caching                                 │
│  - DDoS Protection                                      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js Application (Netlify)              │
│  - Server-Side Rendering                                │
│  - Static Generation                                    │
│  - API Routes (if needed)                               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼ (Phase 3+)
┌─────────────────────────────────────────────────────────┐
│            Payload CMS API (Railway)                    │
│  - Content Management                                   │
│  - Media Library                                        │
│  - User Authentication                                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          PostgreSQL Database (Railway)                  │
│  - Content Storage                                      │
│  - User Data                                            │
│  - Media Metadata                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              Cloudinary CDN                             │
│  - Image Storage                                        │
│  - Automatic Optimization                               │
│  - Format Conversion                                    │
│  - Responsive Delivery                                  │
└─────────────────────────────────────────────────────────┘
```

---

## Future Enhancements

### Phase 3-4
- Payload CMS integration
- PostgreSQL database
- Multi-language support (English, Lozi)
- Projects, Products, News pages
- Contact form with validation

### Phase 5-6
- Search functionality
- Event calendar
- Downloadable resources
- Newsletter integration
- Advanced filtering

### Phase 7+
- E-commerce (if needed)
- Member portal
- Mobile app integration
- Real-time chat support
- Analytics dashboard

---

## Conclusion

This architecture provides:

1. **Performance** - Fast loading, optimized assets, efficient rendering
2. **Scalability** - Can grow from 14 to hundreds of pages
3. **Maintainability** - Clear structure, TypeScript safety, documented code
4. **Flexibility** - Easy to add features, modify design, extend functionality
5. **Professional** - Clean, modern, glassmorphism design with premium components

**Status:** ✅ Phase 1-2 foundations complete and verified
**Next:** Phase 3 CMS integration and remaining pages
