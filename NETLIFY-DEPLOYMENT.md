# CGAZ Website - Netlify Deployment Guide

## 📋 Prerequisites

- [ ] GitHub repository with your code
- [ ] Netlify account (free tier works)
- [ ] Railway PostgreSQL database running
- [ ] Resend API key active
- [ ] Cloudinary account configured

---

## 🚀 Step 1: Initial Netlify Setup

### 1.1 Create New Site

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Select the `cgaz-website` repository

### 1.2 Build Settings

Configure the following build settings:

```
Base directory: (leave empty or set to root)
Build command: npm run build
Publish directory: .next
```

**IMPORTANT**: Before clicking "Deploy", set up environment variables first (Step 2)!

---

## 🔐 Step 2: Environment Variables

Go to **Site settings** → **Environment variables** → **Add a variable**

Add each of these variables (copy from `.env.production`):

### Required Variables

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-site-name.netlify.app` | Update after first deploy |
| `DATABASE_URL` | `postgresql://postgres:LlvVizawjDRrfLdeRNpvwUvYabBsNIXQ@maglev.proxy.rlwy.net:24245/railway` | Railway public URL |
| `PAYLOAD_SECRET` | `7713f577d053e7d31f199e8fedf431f591e30fff08d01031c1e3ba84da8984f7` | Keep secure |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dvj7ayoot` | Image storage |
| `CLOUDINARY_API_KEY` | `955358423342641` | Cloudinary key |
| `CLOUDINARY_API_SECRET` | `O4IXzllAJ6xO6uhuy4FE7eDkAxw` | Keep secure |
| `CLOUDINARY_URL` | `cloudinary://955358423342641:O4IXzllAJ6xO6uhuy4FE7eDkAxw@dvj7ayoot` | Full URL |
| `RESEND_API_KEY` | `re_dQQKbmJk_BHtqSQquP6bbzmMD8qeUozUc` | Email service |
| `FROM_EMAIL` | `contact@fluxium.dev` | Sender email |
| `FROM_NAME` | `Cashew Growers Association of Zambia` | Sender name |
| `NODE_ENV` | `production` | Environment |

### Optional PostgreSQL Variables (for reference)

These are optional but can help with debugging:

| Variable Name | Value |
|---------------|-------|
| `PGHOST` | `maglev.proxy.rlwy.net` |
| `PGPORT` | `24245` |
| `PGUSER` | `postgres` |
| `PGPASSWORD` | `LlvVizawjDRrfLdeRNpvwUvYabBsNIXQ` |
| `PGDATABASE` | `railway` |

---

## 📦 Step 3: Deploy

1. Click **"Deploy site"**
2. Wait for build to complete (usually 2-5 minutes)
3. Check build logs for any errors

### Common Build Issues

**Issue: "Cannot find module 'sharp'"**
- Solution: Already handled - sharp is in dependencies

**Issue: "Database connection failed"**
- Solution: Verify `DATABASE_URL` is correct
- Check Railway database is running
- Ensure Railway allows external connections

**Issue: "Missing environment variables"**
- Solution: Double-check all variables are set in Netlify dashboard

---

## 🔄 Step 4: Update Site URL

After first successful deployment:

1. Copy your Netlify URL (e.g., `https://cgaz-website-xyz.netlify.app`)
2. Go to **Site settings** → **Environment variables**
3. Update `NEXT_PUBLIC_SITE_URL` with your actual Netlify URL
4. Click **"Deploy"** → **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 🗄️ Step 5: Database Setup

Your Railway database should already have all tables from local development. If starting fresh:

### Option A: Run Migrations (if needed)
```bash
# Connect to Railway database locally
DATABASE_URL=postgresql://postgres:LlvVizawjDRrfLdeRNpvwUvYabBsNIXQ@maglev.proxy.rlwy.net:24245/railway npm run payload migrate
```

### Option B: Access Admin Panel
1. Visit `https://your-site-name.netlify.app/admin`
2. Payload CMS will auto-create tables on first access
3. Create admin user if prompted

---

## 👤 Step 6: Create Admin User (If Needed)

If you need to create a new admin user:

1. Go to `https://your-site-name.netlify.app/admin`
2. Click **"Create your first user"**
3. Use credentials:
   - Email: `allanchinambu666@gmail.com`
   - Password: `CGAZ2026Admin!` (or create new one)

---

## ✅ Step 7: Verify Deployment

Test all critical features:

### 7.1 Admin Panel
- [ ] Visit `/admin` - should load without errors
- [ ] Login works
- [ ] Can view collections (ContactSubmissions, CourseRegistrations, etc.)
- [ ] Can edit Site Metrics
- [ ] Can edit Payment Settings

### 7.2 Frontend
- [ ] Homepage loads correctly
- [ ] All images display (Cloudinary)
- [ ] Dynamic metrics show correct values
- [ ] Navigation buttons work

### 7.3 Forms
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] Training registration submits
- [ ] Email notifications send (check inbox)

### 7.4 Payment Display
- [ ] Visit `/farmers/training/register`
- [ ] Payment methods display correctly
- [ ] Mobile money number shows: +260 97 7429666
- [ ] Bank details display

---

## 🎨 Step 8: Custom Domain (Optional)

To use your own domain (e.g., `www.cgaz.org.zm`):

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_SITE_URL` environment variable
6. Redeploy site

---

## 🔒 Security Checklist

- [ ] All API keys are stored as environment variables (not in code)
- [ ] `PAYLOAD_SECRET` is strong and unique
- [ ] Database password is secure
- [ ] Railway database has SSL enabled
- [ ] Admin panel is password-protected
- [ ] No sensitive data in git repository

---

## 🔧 Troubleshooting

### Build Fails
**Check build logs:**
1. Go to **Deploys** tab
2. Click on failed deploy
3. View build logs for specific errors

**Common fixes:**
- Clear build cache: **Trigger deploy** → **Clear cache and deploy site**
- Check environment variables are all set
- Verify `package.json` scripts are correct

### Database Connection Issues
**Test connection locally:**
```bash
psql "postgresql://postgres:LlvVizawjDRrfLdeRNpvwUvYabBsNIXQ@maglev.proxy.rlwy.net:24245/railway"
```

**In Railway dashboard:**
- Verify database is running
- Check connection limits
- Ensure public networking is enabled

### Email Not Sending
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for send logs
- Ensure sender email is verified in Resend
- Check spam folder for test emails

### Images Not Loading
- Verify Cloudinary credentials
- Check browser console for CORS errors
- Ensure images exist in Cloudinary dashboard

---

## 📊 Monitoring

### Netlify Analytics
- Go to **Analytics** tab
- Monitor page views, load times
- Check for 404 errors

### Database Monitoring
- Railway dashboard shows:
  - Connection count
  - Storage usage
  - Query performance

### Email Monitoring
- Resend dashboard shows:
  - Delivery rate
  - Bounce rate
  - Failed sends

---

## 🔄 Continuous Deployment

Netlify will automatically deploy when you push to your GitHub repository:

1. Make changes locally
2. Commit to git: `git commit -m "Update feature"`
3. Push to GitHub: `git push origin main`
4. Netlify automatically builds and deploys

### Manual Deployment
If you need to manually trigger a deploy:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

---

## 📝 Post-Deployment Tasks

### Update Real Information

1. **Contact Information** (Footer component)
   - Replace `+260 XXX XXX XXX` with real phone numbers
   - Verify email addresses are correct

2. **Social Media Links** (Footer component)
   - Update Facebook URL
   - Update Twitter URL
   - Update Instagram URL
   - Update LinkedIn URL

3. **Payment Email** (optional)
   - Change `FROM_EMAIL` from `contact@fluxium.dev` to `info@cgaz.org.zm`
   - Verify domain with Resend

4. **Application Form PDF**
   - Upload actual form to `/public/forms/cgaz-application-form.pdf`
   - Test download button on `/farmers/join`

### Seed Production Data

If starting fresh, seed initial data:

```bash
# Connect to production database
DATABASE_URL=postgresql://postgres:LlvVizawjDRrfLdeRNpvwUvYabBsNIXQ@maglev.proxy.rlwy.net:24245/railway

# Run seed scripts
npx tsx scripts/seed-metrics.ts
npx tsx scripts/seed-payment-settings.ts
```

---

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ Site loads at Netlify URL
- ✅ Admin panel accessible and functional
- ✅ Forms submit and save to database
- ✅ Emails send successfully
- ✅ Images load from Cloudinary
- ✅ Metrics update dynamically
- ✅ Payment methods display correctly
- ✅ All buttons navigate properly
- ✅ No console errors

---

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Railway Docs**: https://docs.railway.app/
- **Payload CMS Docs**: https://payloadcms.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

## 🚨 Emergency Rollback

If deployment breaks the site:

1. Go to **Deploys** tab
2. Find last working deployment
3. Click **"Publish deploy"**
4. Site reverts to previous version immediately

---

**Generated**: January 15, 2026
**Version**: Production v1.0
**Ready for**: Netlify Deployment 🚀
