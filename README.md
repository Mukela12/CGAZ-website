# CGAZ Website

**Cashew Growers Association of Zambia - Official Website**

A modern, professional website built with Next.js 15, TypeScript, Tailwind CSS, and Payload CMS 3.0.

## Project Overview

This website serves the Cashew Growers Association of Zambia (CGAZ), empowering 22,490 cashew farmers across 145 development centers in 10 districts. The platform provides:

- **Product Showcase**: Display cashew products and quality standards
- **Training Resources**: Educational content for farmers
- **Project Updates**: Current and completed initiatives
- **News & Events**: Latest updates and announcements
- **Multi-language Support**: English (primary) and Lozi (future)
- **Full CMS**: Complete content management for administrators

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Internationalization**: next-intl

### Backend
- **CMS**: Payload CMS 3.0
- **Database**: PostgreSQL
- **File Storage**: Cloudinary

### Deployment
- **Frontend**: Netlify
- **Backend**: Railway
- **Domain**: TBD

## Features

✓ Clean, modern design with glassmorphism effects
✓ Separate mobile and desktop UI components
✓ Full CMS for content management
✓ Multi-language support (English + Lozi)
✓ Blog/news section
✓ Project showcase with filters
✓ Training resources library
✓ Success stories
✓ Partner showcase
✓ Contact forms
✓ SEO optimized
✓ Accessibility compliant (WCAG AA)

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL database (for Payload CMS)
- Cloudinary account (for image hosting)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cgaz-website
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Payload CMS
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/cgaz

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
cgaz-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── mobile/             # Mobile-specific components
│   ├── desktop/            # Desktop-specific components
│   ├── shared/             # Shared components
│   └── adaptive/           # Adaptive wrappers
├── lib/
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
├── payload/                # Payload CMS (to be added)
│   ├── collections/        # Content types
│   ├── globals/            # Global settings
│   └── blocks/             # Reusable blocks
├── public/
│   └── images/             # Static assets
├── i18n/                   # Internationalization
│   └── messages/           # Translation files
├── docs/                   # Documentation
└── styles/                 # Additional styles
```

## Development Phases

- [x] **Phase 1**: Setup & Infrastructure (Weeks 1-2)
- [ ] **Phase 2**: Core Pages & Layout (Weeks 3-4)
- [ ] **Phase 3**: CMS Integration (Weeks 5-6)
- [ ] **Phase 4**: Content Population (Weeks 7-8)
- [ ] **Phase 5**: Features & Polish (Weeks 9-10)
- [ ] **Phase 6**: Testing & Optimization (Week 11)
- [ ] **Phase 7**: Deployment & Launch (Week 12)

## Design System

### Color Palette

**Primary Colors** (Agricultural Theme):
- Cashew Green: `#34A853`
- Cashew Dark Green: `#1E7E34`
- Cashew Brown: `#8B6914`
- Earth Brown: `#6B4423`

**Secondary Colors**:
- Zambia Copper: `#CC7722`
- Growth Lime: `#A4D65E`
- Sky Blue: `#4A90E2`

### Typography

- **Headings**: Inter (700, 600, 500)
- **Body**: Inter (400, 500)
- **Accent**: Playfair Display (quotes, special sections)

### Icons

- **Library**: Lucide React only
- **Never use**: Emojis or decorative "sprinkle" icons

## Agency Standards Compliance

✓ **Inline-First Interactions**: Minimal modals, inline confirmations
✓ **Professional Iconography**: Lucide React throughout
✓ **Separate Mobile/Desktop**: Dedicated components for each platform
✓ **Code Quality**: TypeScript strict mode, no `any` types
✓ **Accessibility**: WCAG AA compliance, semantic HTML
✓ **Performance**: Lighthouse 90+ score target

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

This is a proprietary project developed by Fluxium Software Agency for the Cashew Growers Association of Zambia.

## License

Copyright © 2026 Cashew Growers Association of Zambia. All rights reserved.

## Contact

**Cashew Growers Association of Zambia (CGAZ)**
- Address: P.O. Box 910067, Mongu, Zambia
- Phone: +260-977429666
- Email: allanchinambu666@gmail.com

**Developer**: Fluxium Software Agency
- Phone: +260771699187
- Email: Mukela.j.katungu@gmail.com

---

Built with ❤️ for cashew farmers across Zambia
