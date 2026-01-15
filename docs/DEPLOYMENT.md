# CGAZ Website - Deployment Guide

**Project:** Cashew Growers Association of Zambia (CGAZ) Website
**Version:** 1.0
**Last Updated:** January 14, 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
4. [Backend Deployment (Railway)](#backend-deployment-railway)
5. [Domain & SSL Setup](#domain--ssl-setup)
6. [Environment Variables](#environment-variables)
7. [Database Setup](#database-setup)
8. [Image Storage (Cloudinary)](#image-storage-cloudinary)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### Deployment Architecture

```
Frontend (Netlify)          Backend (Railway)
    ↓                            ↓
Next.js App              Payload CMS + API
    ↓                            ↓
Static Assets            PostgreSQL Database
    ↓                            ↓
Cloudinary CDN           Cloudinary Storage
```

### Current Status

**Phase 1-2: Frontend Only** ✅
- 14 static pages built
- Ready for Netlify deployment
- No backend/CMS yet

**Phase 3+: Full Stack** ⏳
- Payload CMS integration
- PostgreSQL database
- Railway backend deployment

---

## Prerequisites

### Required Accounts

1. **GitHub Account**
   - Repository: Push your code to GitHub
   - Required for automatic deployments

2. **Netlify Account** (Free tier works)
   - Sign up at: https://netlify.com
   - Connect to your GitHub account

3. **Railway Account** (Phase 3+)
   - Sign up at: https://railway.app
   - Add payment method (free tier available)

4. **Cloudinary Account**
   - Sign up at: https://cloudinary.com
   - Free tier: 25 GB storage, 25 GB bandwidth

5. **Custom Domain** (Optional but recommended)
   - Register domain (.org or .com recommended)
   - Access to DNS settings

### Required Tools

- Node.js 20.x or later
- npm 10.x or later
- Git
- Command line access

---

## Frontend Deployment (Netlify)

### Step 1: Prepare Repository

1. **Ensure code is in Git repository**
   ```bash
   cd /Users/mukelakatungu/Downloads/CGAZ-WEBSITE/cgaz-website
   git init
   git add .
   git commit -m "Initial commit - Phase 1-2 complete"
   ```

2. **Create GitHub repository**
   - Go to https://github.com/new
   - Name: `cgaz-website`
   - Visibility: Private (recommended)
   - Don't initialize with README (you already have code)

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cgaz-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Connect to Netlify

1. **Log in to Netlify**
   - Visit https://app.netlify.com

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repositories

3. **Select Repository**
   - Find `cgaz-website` in the list
   - Click on it

### Step 3: Configure Build Settings

**Build Settings:**
```
Base directory: (leave empty)
Build command: npm run build
Publish directory: .next
```

**Environment Variables (Phase 1-2):**
```
NODE_VERSION=20
NEXT_PUBLIC_SITE_URL=https://YOUR_SITE.netlify.app
```

**Advanced Settings:**
- Node version: 20
- Build image: Ubuntu Focal 20.04

### Step 4: Deploy

1. **Click "Deploy site"**
   - Netlify will automatically:
     - Install dependencies (`npm install`)
     - Run build (`npm run build`)
     - Deploy to CDN
   - First build takes 2-3 minutes

2. **Check deployment status**
   - Watch the deploy log in Netlify dashboard
   - Look for "Site is live" message

3. **Verify deployment**
   - Visit the provided Netlify URL (e.g., `https://cgaz-website-abc123.netlify.app`)
   - Test all 14 pages
   - Check mobile and desktop views
   - Verify glassmorphism effects

### Step 5: Custom Domain (Optional)

1. **In Netlify Dashboard:**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Enter your domain (e.g., `cgaz.org`)

2. **Configure DNS** (see [Domain & SSL Setup](#domain--ssl-setup))

3. **Enable HTTPS**
   - Netlify automatically provisions Let's Encrypt SSL
   - Wait 5-10 minutes for SSL to activate
   - Force HTTPS redirect: Settings → Domain management → HTTPS

---

## Backend Deployment (Railway)

> **Note:** This section applies to Phase 3+ when Payload CMS is integrated.

### Step 1: Create Railway Project

1. **Sign up/Log in to Railway**
   - Visit https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Choose "Empty Project"
   - Name it "CGAZ Backend"

### Step 2: Add PostgreSQL Database

1. **Add Database Service**
   - In your Railway project, click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway automatically provisions database

2. **Note Connection Details**
   - Click on PostgreSQL service
   - Go to "Connect" tab
   - Copy the `DATABASE_URL` (you'll need this)

### Step 3: Deploy Payload CMS

**Option A: Deploy from GitHub (Recommended)**

1. **Create separate backend repository**
   ```bash
   # Create new folder for backend
   mkdir cgaz-backend
   cd cgaz-backend

   # Initialize Payload project (Phase 3)
   npx create-payload-app@latest
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial backend setup"
   git remote add origin https://github.com/YOUR_USERNAME/cgaz-backend.git
   git push -u origin main
   ```

3. **Connect Railway to GitHub**
   - In Railway project, click "+ New"
   - Select "GitHub Repo"
   - Choose `cgaz-backend`
   - Railway auto-detects and deploys

**Option B: Deploy from CLI**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

### Step 4: Configure Backend Environment

**Required Environment Variables:**
```
NODE_ENV=production
DATABASE_URL=${Railway_PostgreSQL_URL}
PAYLOAD_SECRET=<generate-secure-random-string>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
SMTP_HOST=<email-server>
SMTP_PORT=587
SMTP_USER=<email-username>
SMTP_PASS=<email-password>
CORS_ORIGIN=https://cgaz.org
```

**Generate PAYLOAD_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Test Backend

1. **Access Payload Admin**
   - URL: `https://cgaz-backend.up.railway.app/admin`
   - Create first admin user
   - Test creating content

2. **Verify API**
   - Test endpoint: `https://cgaz-backend.up.railway.app/api/health`
   - Should return 200 OK

---

## Domain & SSL Setup

### DNS Configuration

**For Netlify Frontend:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 75.2.60.5 | 3600 |
| CNAME | www | cgaz.netlify.app | 3600 |

**For Railway Backend (Phase 3+):**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | api | cgaz-backend.up.railway.app | 3600 |

### Verify DNS Propagation

```bash
# Check A record
dig cgaz.org

# Check CNAME
dig www.cgaz.org
dig api.cgaz.org
```

DNS propagation can take 4-48 hours.

### SSL Certificate

**Netlify:**
- Automatically provisions Let's Encrypt SSL
- No manual configuration needed
- Force HTTPS redirect in Netlify settings

**Railway:**
- Automatic SSL on Railway domains
- For custom domain: Railway handles Let's Encrypt
- Enable in Railway dashboard → Settings → Domains

---

## Environment Variables

### Frontend (.env.local for local dev)

```bash
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudinary (Phase 3+)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# API URL (Phase 3+)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Frontend (Netlify production)

```bash
NODE_VERSION=20
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://cgaz.org
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_API_URL=https://api.cgaz.org
```

### Backend (Railway production - Phase 3+)

```bash
NODE_ENV=production
PORT=3001
DATABASE_URL=${Railway_PostgreSQL_URL}
PAYLOAD_SECRET=your-secret-from-crypto
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CORS_ORIGIN=https://cgaz.org
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@cgaz.org
SMTP_PASS=your-smtp-password
```

---

## Database Setup

### PostgreSQL (Railway - Phase 3+)

**Automatic Provisioning:**
- Railway automatically creates database
- Connection string available in Railway dashboard
- No manual setup required

**Manual Backup:**
```bash
# Install Railway CLI
railway login
railway link

# Backup database
railway run pg_dump $DATABASE_URL > backup.sql

# Restore database
railway run psql $DATABASE_URL < backup.sql
```

**Database Migrations:**
```bash
# Payload CMS handles migrations automatically
# On deployment, run:
railway run npm run payload migrate
```

---

## Image Storage (Cloudinary)

### Initial Setup

1. **Create Cloudinary Account**
   - Visit https://cloudinary.com/users/register/free
   - Verify email

2. **Get Credentials**
   - Dashboard → Account Details
   - Copy:
     - Cloud name
     - API Key
     - API Secret

3. **Configure Upload Preset**
   - Settings → Upload
   - Enable unsigned uploads (or create signed preset)
   - Set folder structure: `cgaz/{category}/{filename}`

### Upload 49 Photos (Phase 4)

**Using Cloudinary UI:**
1. Go to Media Library
2. Create folders:
   - `cgaz/government-visits` (14 images)
   - `cgaz/training-programs` (35 images)
3. Bulk upload from CGAZ-IMAGES folder

**Using CLI:**
```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Configure
cld config

# Bulk upload
cld upload /path/to/CGAZ-IMAGES/CGAZ-PROFILE/* --folder cgaz/government-visits
cld upload /path/to/CGAZ-IMAGES/Nakato-pictures/* --folder cgaz/training-programs
```

### Image Optimization Settings

**In Cloudinary Dashboard:**
- Quality: Auto
- Format: Auto (WebP/AVIF for modern browsers)
- Responsive: Enabled
- Lazy loading: Enabled

---

## Monitoring & Analytics

### Uptime Monitoring (Free)

**Uptime Robot:**
1. Sign up: https://uptimerobot.com
2. Add monitor:
   - Type: HTTPS
   - URL: https://cgaz.org
   - Interval: 5 minutes
3. Add email alerts

### Error Tracking (Optional)

**Sentry:**
```bash
# Install
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard -i nextjs
```

**Add to .env:**
```
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Analytics (Optional)

**Google Analytics:**
1. Create GA4 property
2. Get Measurement ID
3. Add to `app/layout.tsx`:
```typescript
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Performance Monitoring

**Netlify Analytics:**
- Enable in Netlify dashboard
- $9/month per site
- Server-side analytics (no client-side script)

---

## Troubleshooting

### Build Failures

**Error: "Command failed with exit code 1"**
```bash
# Check Node version
node --version  # Should be 20.x

# Clear cache and rebuild locally
rm -rf node_modules .next
npm install
npm run build
```

**Error: "Module not found"**
- Check all imports use correct paths
- Verify `@/*` aliases in tsconfig.json
- Run `npm install` to ensure all dependencies

**Error: "Out of memory"**
- Increase Node memory in `package.json`:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
  }
}
```

### Deployment Issues

**Site shows 404**
- Check "Publish directory" is `.next`
- Verify build completed successfully
- Check deploy log for errors

**Images not loading**
- Verify Cloudinary credentials in env vars
- Check `next.config.ts` has correct `remotePatterns`
- Test image URL directly in browser

**Glassmorphism not working**
- Check browser support for `backdrop-filter`
- Verify CSS fallback is in place
- Test in modern browser (Chrome, Safari, Firefox)

### Database Issues (Phase 3+)

**Connection refused**
- Verify DATABASE_URL is correct
- Check Railway service is running
- Test connection from Railway CLI:
```bash
railway run psql $DATABASE_URL
```

**Migrations failed**
- Check Payload config syntax
- Verify database user has CREATE TABLE permissions
- Run migrations manually:
```bash
railway run npm run payload migrate
```

### Performance Issues

**Slow page loads**
- Check Lighthouse score
- Enable image optimization (Cloudinary)
- Verify CDN is serving assets
- Check for large JavaScript bundles

**High bandwidth usage**
- Optimize images (reduce file sizes)
- Enable Cloudinary transformations
- Use responsive images
- Enable browser caching

---

## Deployment Checklist

### Pre-Deployment

- [ ] All code committed to Git
- [ ] Tests passing locally
- [ ] Build successful locally (`npm run build`)
- [ ] Environment variables documented
- [ ] Logo files in place
- [ ] No sensitive data in code

### Frontend Deployment (Netlify)

- [ ] Repository connected to Netlify
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] HTTPS redirect enabled
- [ ] All pages accessible
- [ ] Mobile view tested
- [ ] Desktop view tested

### Backend Deployment (Railway - Phase 3+)

- [ ] PostgreSQL database created
- [ ] Backend repository connected
- [ ] Environment variables configured
- [ ] PAYLOAD_SECRET generated
- [ ] Cloudinary credentials added
- [ ] SMTP configured for emails
- [ ] CORS settings correct
- [ ] Admin panel accessible
- [ ] API endpoints working
- [ ] Database migrations run

### Post-Deployment

- [ ] DNS propagation complete
- [ ] SSL active on all domains
- [ ] All pages load correctly
- [ ] Forms submitting (Phase 3+)
- [ ] Images displaying
- [ ] Uptime monitoring active
- [ ] Error tracking configured
- [ ] Analytics installed
- [ ] Performance acceptable (Lighthouse 90+)
- [ ] Accessibility checked (WCAG AA)

---

## Rollback Procedure

### Netlify Rollback

1. **Go to Deploys**
   - Open Netlify dashboard
   - Click on "Deploys" tab

2. **Find Previous Deploy**
   - Locate last working deployment
   - Click on it

3. **Publish Deploy**
   - Click "Publish deploy"
   - Confirm rollback
   - Site reverts in ~30 seconds

### Railway Rollback

1. **Go to Deployments**
   - Open Railway project
   - Click on service
   - View deployment history

2. **Redeploy Previous Version**
   - Click on previous deployment
   - Click "Redeploy"

### Git Rollback

```bash
# Find commit to rollback to
git log --oneline

# Revert to specific commit
git revert <commit-hash>

# Or hard reset (dangerous - use with caution)
git reset --hard <commit-hash>
git push --force
```

---

## Support & Resources

### Documentation

- **Next.js:** https://nextjs.org/docs
- **Netlify:** https://docs.netlify.com
- **Railway:** https://docs.railway.app
- **Payload CMS:** https://payloadcms.com/docs
- **Cloudinary:** https://cloudinary.com/documentation

### Community

- **Next.js Discord:** https://nextjs.org/discord
- **Payload CMS Discord:** https://discord.gg/payload
- **Railway Discord:** https://discord.gg/railway

### Emergency Contacts

- **Netlify Support:** support@netlify.com
- **Railway Support:** https://railway.app/help
- **Developer:** [Your contact info]

---

## Conclusion

This deployment guide covers:
- ✅ Frontend deployment to Netlify (Phase 1-2)
- ✅ Backend deployment to Railway (Phase 3+)
- ✅ Database setup with PostgreSQL
- ✅ Image storage with Cloudinary
- ✅ Domain and SSL configuration
- ✅ Monitoring and analytics setup
- ✅ Troubleshooting common issues
- ✅ Rollback procedures

For Phase 1-2, only Netlify frontend deployment is needed. Backend deployment will be added in Phase 3 when Payload CMS is integrated.

**Current Status:** Ready for Netlify deployment with 14 static pages ✅
