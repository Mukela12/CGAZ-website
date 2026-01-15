# CGAZ Website - Component Library

**Project:** Cashew Growers Association of Zambia (CGAZ) Website
**Version:** 1.0
**Last Updated:** January 14, 2026
**Status:** Phase 1-2 Complete ✅

---

## Table of Contents

1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [Layout Components](#layout-components)
4. [Navigation Components](#navigation-components)
5. [Content Components](#content-components)
6. [Media Components](#media-components)
7. [Utility Hooks](#utility-hooks)
8. [Usage Examples](#usage-examples)

---

## Overview

### Component Categories

The CGAZ component library is organized into five categories:

1. **Layout** - Page structure and adaptive layouts
2. **Navigation** - Mobile and desktop navigation
3. **Content** - Reusable content components
4. **Media** - Image optimization components
5. **Utilities** - Hooks and helper functions

### Import Paths

All components use path aliases for clean imports:

```typescript
import { Button } from '@/components/shared/Button';
import { GlassCard } from '@/components/shared/GlassCard';
import { useDevice } from '@/lib/hooks/useDevice';
```

### TypeScript Support

All components are fully typed with TypeScript interfaces and strict mode enabled.

---

## Design Principles

### 1. Composition Over Configuration

**Prefer:**
```typescript
<Hero height="large">
  <GlassCard variant="overlay">
    <h1>Welcome</h1>
    <Button variant="primary">Get Started</Button>
  </GlassCard>
</Hero>
```

**Avoid:**
```typescript
<Hero
  height="large"
  overlayType="glass"
  title="Welcome"
  buttonText="Get Started"
  buttonVariant="primary"
/>
```

### 2. Consistent Styling with Tailwind

Use the `cn()` utility for className management:

```typescript
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'base-classes',
  variant === 'primary' && 'variant-classes',
  className // Allow prop overrides
)}>
```

### 3. Accessibility First

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Minimum 4.5:1 contrast ratio

### 4. Mobile-First Responsive

- Separate mobile/desktop components
- Breakpoint at 1024px (lg)
- Touch-optimized mobile UI
- Hover states for desktop

---

## Layout Components

### AdaptiveLayout

Root layout component that adapts to device size.

**Location:** `components/adaptive/AdaptiveLayout.tsx`

**Props:**
```typescript
interface AdaptiveLayoutProps {
  children: React.ReactNode;
}
```

**Usage:**
```typescript
import { AdaptiveLayout } from '@/components/adaptive/AdaptiveLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdaptiveLayout>
          {children}
        </AdaptiveLayout>
      </body>
    </html>
  );
}
```

**Features:**
- Automatically detects mobile/desktop
- Renders appropriate navigation
- Adds correct padding/margin for content
- Handles hydration safely

**Behavior:**
- Mobile (< 1024px): Adds `pb-20` for bottom nav clearance
- Desktop (≥ 1024px): Adds `ml-64` for sidebar clearance

---

### AdaptiveNav

Conditional navigation renderer.

**Location:** `components/adaptive/AdaptiveNav.tsx`

**Props:**
```typescript
// No props - internally uses useDevice hook
```

**Usage:**
```typescript
import { AdaptiveNav } from '@/components/adaptive/AdaptiveNav';

// In AdaptiveLayout
<AdaptiveNav />
```

**Features:**
- Renders `MobileBottomNav` on mobile
- Renders `DesktopSidebar` on desktop
- Smooth transitions on resize
- No hydration mismatches

---

## Navigation Components

### MobileBottomNav

Fixed bottom navigation for mobile devices.

**Location:** `components/mobile/Navigation/MobileBottomNav.tsx`

**Props:**
```typescript
// No props - navigation items are hardcoded
```

**Usage:**
```typescript
import { MobileBottomNav } from '@/components/mobile/Navigation/MobileBottomNav';

// Automatically used by AdaptiveNav
<MobileBottomNav />
```

**Features:**
- 5 navigation items: Home, Farmers, Projects, News, More
- Glassmorphism background (`backdrop-blur-xl bg-white/90`)
- Active state highlighting
- Safe area insets for notched devices
- Touch-optimized sizing
- Fixed positioning with `z-50`

**Structure:**
```typescript
const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Farmers', href: '/farmers', icon: Users },
  { label: 'Projects', href: '/projects', icon: Briefcase },
  { label: 'News', href: '/news', icon: Newspaper },
  { label: 'More', href: '/about', icon: Menu },
];
```

**Styling:**
- Height: `h-16`
- Glassmorphism: `backdrop-blur-xl bg-white/90`
- Border: `border-t border-neutral-200`
- Shadow: `shadow-lg`
- Active item: Green highlight

---

### DesktopSidebar

Fixed left sidebar for desktop.

**Location:** `components/desktop/Navigation/DesktopSidebar.tsx`

**Props:**
```typescript
// No props - navigation structure is defined internally
```

**Usage:**
```typescript
import { DesktopSidebar } from '@/components/desktop/Navigation/DesktopSidebar';

// Automatically used by AdaptiveNav
<DesktopSidebar />
```

**Features:**
- Fixed left sidebar (`w-64`)
- Nested navigation with expandable sections
- Logo at top
- Language selector at bottom (Phase 3)
- Social media links in footer
- Smooth hover effects
- Glassmorphism styling

**Navigation Structure:**
```
CGAZ Logo
─────────
Home
About
  ↳ Our Story
  ↳ Mission & Vision
  ↳ Leadership
  ↳ Partners
For Farmers
  ↳ Training Programs
  ↳ Resources
  ↳ Success Stories
  ↳ Join CGAZ
Projects
Products
News & Events
Contact
─────────
[Language Selector]
[Social Icons]
```

**Styling:**
- Width: `w-64` (256px)
- Height: `h-screen`
- Position: `fixed left-0`
- Background: `bg-white`
- Border: `border-r border-neutral-200`
- Padding: `p-6`

---

## Content Components

### Button

Versatile button component with multiple variants and sizes.

**Location:** `components/shared/Button/index.tsx`

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
```

**Usage:**
```typescript
import { Button } from '@/components/shared/Button';
import { ArrowRight } from 'lucide-react';

// Primary button
<Button variant="primary" size="lg">
  Get Started
</Button>

// With icon
<Button
  variant="secondary"
  iconAfter={<ArrowRight className="w-5 h-5" />}
>
  Learn More
</Button>

// Glass variant (for dark backgrounds)
<Button variant="glass" fullWidth>
  Join CGAZ
</Button>

// Loading state
<Button variant="primary" loading>
  Submitting...
</Button>
```

**Variants:**

**Primary** (Cashew Green)
```css
bg-cashew-green text-white
hover:bg-cashew-dark-green
```

**Secondary** (Outlined)
```css
border-2 border-cashew-green text-cashew-green
hover:bg-cashew-green hover:text-white
```

**Ghost** (Transparent)
```css
text-cashew-green hover:bg-cashew-green/10
```

**Glass** (Glassmorphism)
```css
backdrop-blur-md bg-white/10 border border-white/20
hover:bg-white/20
```

**Sizes:**
- **sm:** `px-4 py-2 text-sm`
- **md:** `px-6 py-3 text-base`
- **lg:** `px-8 py-4 text-lg`

---

### GlassCard

Glassmorphism card component for modern aesthetics.

**Location:** `components/shared/GlassCard/index.tsx`

**Props:**
```typescript
interface GlassCardProps {
  variant?: 'primary' | 'secondary' | 'overlay';
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
}
```

**Usage:**
```typescript
import { GlassCard } from '@/components/shared/GlassCard';

// Primary variant (default)
<GlassCard>
  <h3>Content Title</h3>
  <p>Card content goes here</p>
</GlassCard>

// Hoverable card
<GlassCard hoverable className="cursor-pointer">
  <div>Interactive content</div>
</GlassCard>

// Overlay variant (for hero sections)
<GlassCard variant="overlay">
  <h1 className="text-4xl">Hero Title</h1>
</GlassCard>
```

**Variants:**

**Primary** (Standard glassmorphism)
```css
backdrop-blur-md bg-white/10 border border-white/20
rounded-2xl shadow-xl
```

**Secondary** (Subtle glass)
```css
backdrop-blur-lg bg-white/5 border border-white/10
rounded-2xl
```

**Overlay** (Gradient overlay)
```css
backdrop-blur-xl bg-gradient-to-br from-white/20 to-transparent
border border-white/20 rounded-3xl
```

**Hover Effects:**
```css
hover:bg-white/15 hover:shadow-2xl
transform hover:-translate-y-1
transition-all duration-300
```

---

### Hero

Full-width hero section with background image support.

**Location:** `components/shared/Hero/index.tsx`

**Props:**
```typescript
interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: 'small' | 'medium' | 'large' | 'full';
  children?: React.ReactNode;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}
```

**Usage:**
```typescript
import { Hero } from '@/components/shared/Hero';

// Basic hero
<Hero
  title="Welcome to CGAZ"
  subtitle="Empowering cashew farmers across Zambia"
  height="large"
/>

// Hero with background image
<Hero
  title="Our Story"
  subtitle="Building a sustainable future"
  backgroundImage="/images/hero-bg.jpg"
  height="medium"
/>

// Hero with CTAs
<Hero
  title="Join Us Today"
  subtitle="22,490 farmers already benefit"
  primaryCta={{ label: 'Become a Member', href: '/farmers/join' }}
  secondaryCta={{ label: 'Learn More', href: '/about' }}
  height="large"
/>
```

**Height Variants:**
- **small:** `h-[300px]`
- **medium:** `h-[400px] sm:h-[500px]`
- **large:** `h-[500px] sm:h-[600px] lg:h-[700px]`
- **full:** `h-screen`

**Features:**
- Responsive heights
- Background image with overlay
- Glassmorphism content card
- Fade-in animation (Framer Motion)
- Centered content alignment
- Gradient overlay for readability

---

### Footer

Comprehensive site footer with navigation and contact info.

**Location:** `components/shared/Footer/index.tsx`

**Props:**
```typescript
interface FooterProps {
  variant?: 'default' | 'glass';
}
```

**Usage:**
```typescript
import { Footer } from '@/components/shared/Footer';

// Default footer (white background)
<Footer />

// Glass footer (for colored backgrounds)
<Footer variant="glass" />
```

**Structure:**
```
┌─────────────────────────────────────────────────────┐
│ CGAZ Logo & Description                             │
├──────────────┬──────────────┬──────────────────────┤
│ About        │ For Farmers  │ Information          │
│ - Our Story  │ - Training   │ - Contact            │
│ - Mission    │ - Resources  │ - Privacy Policy     │
│ - Leadership │ - Stories    │ - Terms              │
│ - Partners   │ - Join CGAZ  │                      │
└──────────────┴──────────────┴──────────────────────┘
│ Contact: email@cgaz.org | +260 XXX XXX XXX        │
│ Social: Facebook Twitter Instagram LinkedIn        │
└─────────────────────────────────────────────────────┘
│ © 2026 CGAZ. All rights reserved.                  │
└─────────────────────────────────────────────────────┘
```

**Features:**
- 3-column navigation grid
- Contact information
- Social media links
- Copyright notice
- Legal links (Privacy, Terms)
- Responsive layout (stacks on mobile)

---

### Stats

Statistics display component with icons and animations.

**Location:** `components/shared/Stats/index.tsx`

**Props:**
```typescript
interface StatsProps {
  title?: string;
  subtitle?: string;
  stats: Array<{
    icon: React.ComponentType<{ className?: string }>;
    value: string;
    label: string;
    description?: string;
  }>;
  className?: string;
}
```

**Usage:**
```typescript
import { Stats } from '@/components/shared/Stats';
import { Users, TrendingUp, MapPin } from 'lucide-react';

const impactStats = [
  {
    icon: Users,
    value: '22,490',
    label: 'Active Members',
    description: 'Farmers benefiting from CGAZ'
  },
  {
    icon: TrendingUp,
    value: '45%',
    label: 'Income Increase',
    description: 'Average improvement'
  },
  {
    icon: MapPin,
    value: '145',
    label: 'Service Centers',
    description: 'Across 10 districts'
  }
];

<Stats
  title="Our Impact"
  subtitle="Real results from our members"
  stats={impactStats}
/>
```

**Features:**
- Icon-based statistics
- Large, bold numbers
- Descriptive labels
- Optional descriptions
- Responsive grid layout
- Fade-in animations
- Glassmorphism card option

---

## Media Components

### OptimizedImage

Next.js Image component wrapper with Cloudinary support.

**Location:** `components/shared/OptimizedImage/index.tsx`

**Props:**
```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}
```

**Usage:**
```typescript
import { OptimizedImage } from '@/components/shared/OptimizedImage';

// Fill container (responsive)
<div className="relative w-full h-64">
  <OptimizedImage
    src="/images/hero.jpg"
    alt="Cashew farmers at work"
    fill
    className="object-cover"
  />
</div>

// Fixed dimensions
<OptimizedImage
  src="/images/logo.png"
  alt="CGAZ Logo"
  width={200}
  height={100}
  priority
/>

// With responsive sizes
<OptimizedImage
  src="https://res.cloudinary.com/your-cloud/image/upload/v1/cgaz/photo.jpg"
  alt="Cashew processing"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Features:**
- Automatic format optimization (WebP/AVIF)
- Responsive image sets
- Lazy loading by default
- Blur placeholder
- Cloudinary integration
- SEO-friendly alt tags

**Best Practices:**
- Always provide descriptive `alt` text
- Use `priority` for above-fold images
- Specify `sizes` for responsive images
- Use `fill` for flexible layouts

---

## Utility Hooks

### useDevice

Device detection hook for adaptive layouts.

**Location:** `lib/hooks/useDevice.ts`

**Returns:**
```typescript
{
  isMobile: boolean;
  isDesktop: boolean;
  isHydrated: boolean;
}
```

**Usage:**
```typescript
'use client';

import { useDevice } from '@/lib/hooks/useDevice';

export function AdaptiveComponent() {
  const { isMobile, isHydrated } = useDevice();

  if (!isHydrated) {
    // Prevent hydration mismatch
    return <DefaultView />;
  }

  return isMobile ? <MobileView /> : <DesktopView />;
}
```

**Features:**
- 1024px breakpoint (`lg`)
- Window resize detection
- Hydration-safe
- TypeScript typed

**How It Works:**
```typescript
export function useDevice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return {
    isMobile,
    isDesktop: !isMobile,
    isHydrated
  };
}
```

---

## Usage Examples

### Complete Page Example

```typescript
'use client';

import { Hero } from '@/components/shared/Hero';
import { GlassCard } from '@/components/shared/GlassCard';
import { Button } from '@/components/shared/Button';
import { Stats } from '@/components/shared/Stats';
import { Footer } from '@/components/shared/Footer';
import { Users, TrendingUp, MapPin } from 'lucide-react';

export default function HomePage() {
  const impactStats = [
    {
      icon: Users,
      value: '22,490',
      label: 'Active Members',
      description: 'Farmers benefiting from CGAZ'
    },
    {
      icon: TrendingUp,
      value: '45%',
      label: 'Income Increase',
      description: 'Average improvement'
    },
    {
      icon: MapPin,
      value: '145',
      label: 'Service Centers',
      description: 'Across 10 districts'
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero
        title="Welcome to CGAZ"
        subtitle="Empowering 22,490 cashew farmers across Zambia"
        backgroundImage="/images/hero-bg.jpg"
        height="large"
        primaryCta={{ label: 'Join Us', href: '/farmers/join' }}
        secondaryCta={{ label: 'Learn More', href: '/about' }}
      />

      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stats
            title="Our Impact"
            subtitle="Real results from our commitment to farmers"
            stats={impactStats}
          />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <GlassCard key={index} hoverable className="p-8">
                <service.icon className="w-12 h-12 text-cashew-green mb-4" />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-neutral-600 mb-4">{service.description}</p>
                <Button variant="secondary" size="sm">
                  Learn More
                </Button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

### Adaptive Component Example

```typescript
'use client';

import { useDevice } from '@/lib/hooks/useDevice';

export function AdaptiveContent() {
  const { isMobile, isHydrated } = useDevice();

  if (!isHydrated) {
    return <div className="animate-pulse bg-neutral-200 h-64 rounded-lg" />;
  }

  if (isMobile) {
    return (
      <div className="p-4">
        <h2 className="text-2xl">Mobile View</h2>
        <p>Single column, touch-optimized</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      <div>
        <h2 className="text-3xl">Desktop View</h2>
        <p>Multi-column, hover states</p>
      </div>
      <div>
        <img src="/image.jpg" alt="Example" />
      </div>
    </div>
  );
}
```

---

## Component Checklist

When creating new components:

- [ ] TypeScript interfaces for props
- [ ] Responsive design (mobile-first)
- [ ] Accessibility (ARIA labels, semantic HTML)
- [ ] Tailwind CSS with `cn()` utility
- [ ] Lucide React icons (no emojis)
- [ ] JSDoc comments for documentation
- [ ] Default props where appropriate
- [ ] Consistent naming conventions
- [ ] Export from index files
- [ ] Test on mobile and desktop

---

## Conclusion

This component library provides:

✅ **12 reusable components** - Fully typed and documented
✅ **Glassmorphism design** - Modern, professional aesthetics
✅ **Adaptive patterns** - Separate mobile/desktop UIs
✅ **Accessibility** - WCAG AA compliant
✅ **Performance** - Optimized images and code splitting
✅ **Consistency** - Unified design system

All components follow agency standards and are ready for Phase 3+ expansion.

**Status:** Phase 1-2 Complete ✅
**Next:** Phase 3 CMS integration and additional pages
