# CGAZ Website - Comprehensive Testing Guide

## Overview
This guide will help you test all the newly implemented features to ensure everything is working correctly.

---

## Prerequisites

**Server Status:** Ensure development server is running on `http://localhost:3000`

```bash
npm run dev
```

---

## Phase 1: Admin Panel Testing

### 1.1 Access Admin Panel
- Navigate to: `http://localhost:3000/admin/login`
- Login with credentials:
  - Email: `allanchinambu666@gmail.com`
  - Password: `CGAZ2026Admin!`
- ✅ **Expected:** Dashboard loads with all collections visible

### 1.2 Verify New Collections
Check that these collections appear in the sidebar:
- ✅ Contact Submissions
- ✅ Course Registrations
- ✅ Newsletter Subscribers
- ✅ Site Metrics (under Globals)

### 1.3 Test Site Metrics Global
1. Click **Site Metrics** in the sidebar (under Globals)
2. ✅ **Expected:** You should see:
   - Members Count: 22,490
   - Centers Count: 145
   - Districts Count: 10
   - Growth Rate: 85%
3. Try editing a value (e.g., change Members to 23,000)
4. Save and refresh the homepage
5. ✅ **Expected:** Homepage stats update automatically

---

## Phase 2: Contact Form Testing

### 2.1 Submit Contact Form
1. Navigate to: `http://localhost:3000/contact`
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +260 XXX XXX XXX
   - Subject: General Inquiry
   - Message: This is a test message
3. Click **Send Message**
4. ✅ **Expected:** Success alert appears

### 2.2 Verify Submission in Admin
1. Go to Admin Panel → Contact Submissions
2. ✅ **Expected:** Your test submission appears
3. Check email console logs for notification email
4. ✅ **Expected:** Email sent to `contact@fluxium.dev`

### 2.3 Test Form Validation
1. Try submitting empty form
2. ✅ **Expected:** Validation errors appear
3. Try invalid email format
4. ✅ **Expected:** Error message for invalid email

---

## Phase 3: Newsletter Subscription Testing

### 3.1 Subscribe via Footer
1. Scroll to bottom of any page (e.g., homepage)
2. Find **Stay Updated** newsletter signup
3. Enter email: `newsletter-test@example.com`
4. Click **Subscribe**
5. ✅ **Expected:** Success message appears

### 3.2 Verify in Admin
1. Admin Panel → Newsletter Subscribers
2. ✅ **Expected:** Your subscription appears with:
   - Status: Active
   - Source: Website
   - Welcome Email Sent: true

### 3.3 Test Duplicate Subscription
1. Try subscribing with same email again
2. ✅ **Expected:** Message says "You're already subscribed!"

### 3.4 Check Welcome Email
Look in console logs for welcome email content
✅ **Expected:** Professional HTML email with:
- Welcome message
- List of what they'll receive
- Link to website

---

## Phase 4: Training Registration Testing

### 4.1 Access Registration Page
- Navigate to: `http://localhost:3000/farmers/training/register`
- ✅ **Expected:** Full registration form loads

### 4.2 Complete Registration
Fill in all required fields:
- **Personal Info:**
  - Name: John Farmer
  - Email: john@example.com
  - Phone: +260 XXX XXX XXX
  - District: Mongu

- **Course Details:**
  - Course: Foundation Course
  - Preferred Date: January 2026
  - Experience: Beginner

- **Payment Info:**
  - Method: MTN Mobile Money
  - Amount: 500
  - Transaction Ref: MTN123456789

3. Click **Submit Registration**
4. ✅ **Expected:** Success message appears

### 4.3 Verify in Admin
1. Admin Panel → Course Registrations
2. ✅ **Expected:** Registration appears with:
   - Status: Pending Review
   - All form data visible

### 4.4 Test File Upload
1. Create another registration
2. This time upload a payment receipt (image or PDF)
3. Click **Upload** button
4. ✅ **Expected:** "Uploaded" confirmation
5. Submit form
6. ✅ **Expected:** Receipt linked to registration in admin

### 4.5 Check Confirmation Emails
Console logs should show:
- ✅ Confirmation email to applicant
- ✅ Notification email to admin

---

## Phase 5: Navigation & Buttons Testing

### 5.1 Hero Buttons (Homepage)
1. Homepage hero section
2. Click **Learn More** button
3. ✅ **Expected:** Navigates to `/about`
4. Go back, click **Join CGAZ**
5. ✅ **Expected:** Navigates to `/farmers/join`

### 5.2 Feature Cards (Homepage)
Test all three "Learn More" buttons in feature cards:
- Training card → ✅ Goes to `/farmers/training`
- Market Access card → ✅ Goes to `/products`
- Community card → ✅ Goes to `/farmers/stories`

### 5.3 Training Page Buttons
Navigate to: `/farmers/training`

Test these buttons:
- "Register for This Course" (in course cards) → ✅ `/farmers/training/register`
- "Register Now" (upcoming sessions) → ✅ `/farmers/training/register`
- "Contact Training Team" (bottom CTA) → ✅ `/contact`

### 5.4 Application Form Download
1. Go to: `/farmers/join`
2. Scroll to bottom CTA section
3. Click **Download Application Form**
4. ✅ **Expected:** PDF download triggers
   - **Note:** You need to add actual PDF to `/public/forms/cgaz-application-form.pdf`

---

## Phase 6: Dynamic Metrics Testing

### 6.1 Verify Dynamic Metrics Load
Pages that should show dynamic metrics:
1. **Homepage** (`/`)
   - Stats section shows: 22,490 Members, 145 Centers, 10 Districts, 85% Growth
   - ✅ Check console for successful API call to `/api/metrics`

2. **About Page** (`/about`)
   - Intro text mentions metrics
   - "CGAZ at a Glance" section shows stats
   - ✅ All numbers match admin values

3. **Farmers Page** (`/farmers`)
   - Multiple locations showing member count
   - Service centers count
   - ✅ Verify consistency across page

4. **Footer** (all pages)
   - Description mentions member count
   - ✅ Should say "Empowering 22,490 cashew farmers"

### 6.2 Test Admin Metrics Update
1. Admin → Site Metrics
2. Change **Members Count** from 22,490 to **25,000**
3. Save changes
4. Open new browser tab (or refresh existing)
5. Visit homepage
6. ✅ **Expected:** Stats now show 25,000 members
7. Check footer, about page, farmers page
8. ✅ **Expected:** All show updated count

### 6.3 Test Metrics API Endpoint
```bash
curl http://localhost:3000/api/metrics
```
✅ **Expected JSON response:**
```json
{
  "membersCount": 22490,
  "centersCount": 145,
  "districtsCount": 10,
  "growthRate": "85%",
  "lastUpdated": "2026-01-15T..."
}
```

---

## Phase 7: Email System Testing

### 7.1 Email Configuration
Verify environment variables in `.env.local`:
```env
RESEND_API_KEY=re_dQQKbmJk_BHtqSQquP6bbzmMD8qeUozUc
FROM_EMAIL=contact@fluxium.dev
FROM_NAME=Cashew Growers Association of Zambia
```

### 7.2 Console Email Output
When testing in development, emails appear in console:
- ✅ Check terminal for email logs
- ✅ Verify HTML formatting
- ✅ Confirm correct recipients

### 7.3 Production Email Testing (When Ready)
To test actual email delivery:
1. Ensure Resend API key is valid
2. Submit forms
3. Check inbox at recipient email addresses
4. ✅ Verify emails arrive
5. ✅ Check spam folder if not in inbox

---

## Phase 8: Database Verification

### 8.1 PostgreSQL Check
```bash
# Connect to database
psql -U mukelakatungu -d cgaz

# Check collections exist
\dt

# View contact submissions
SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 5;

# View newsletter subscribers
SELECT email, status FROM newsletter_subscribers;

# View course registrations
SELECT name, email, course_name, status FROM course_registrations;

# View site metrics
SELECT * FROM site_metrics;
```

---

## Common Issues & Solutions

### Issue 1: Port Mismatch
**Symptom:** PDF downloads fail with `ERR_CONNECTION_REFUSED`
**Solution:** Ensure `.env.local` has `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

### Issue 2: Metrics Not Updating
**Symptom:** Changes in admin don't reflect on pages
**Solution:**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check `/api/metrics` endpoint response
- Verify admin save was successful

### Issue 3: Emails Not Sending
**Symptom:** Form submits but no email
**Solution:**
- Check console for error messages
- Verify Resend API key is correct
- In development, emails log to console (not sent)

### Issue 4: Form Validation Errors
**Symptom:** Can't submit valid form
**Solution:**
- Check all required fields are filled
- Verify email format is valid
- Check console for JavaScript errors

---

## Success Criteria Checklist

### ✅ Infrastructure
- [ ] Server runs on port 3000
- [ ] Admin panel accessible
- [ ] All new collections visible
- [ ] Site Metrics global exists

### ✅ Forms
- [ ] Contact form saves to CMS
- [ ] Contact form sends email
- [ ] Newsletter subscription works
- [ ] Welcome email sends
- [ ] Training registration saves
- [ ] Registration confirmation emails send
- [ ] File upload works

### ✅ Navigation
- [ ] All Hero buttons navigate
- [ ] All "Learn More" buttons work
- [ ] All "Register" buttons link correctly
- [ ] Training page CTAs functional
- [ ] Application download works

### ✅ Dynamic Metrics
- [ ] Metrics API returns data
- [ ] Homepage shows dynamic metrics
- [ ] About page shows dynamic metrics
- [ ] Farmers page shows dynamic metrics
- [ ] Footer shows dynamic metrics
- [ ] Admin can update metrics
- [ ] Changes reflect immediately

### ✅ Email System
- [ ] Contact notifications send
- [ ] Newsletter welcomes send
- [ ] Registration confirmations send
- [ ] Admin notifications send
- [ ] Emails have professional formatting

---

## Next Steps After Testing

### 1. Add Real Content
- [ ] Upload actual application form PDF to `/public/forms/`
- [ ] Add real contact information to footer
- [ ] Update social media links

### 2. Production Preparation
- [ ] Test with real Resend account
- [ ] Update email addresses to official domains
- [ ] Configure production database
- [ ] Set up environment variables for production

### 3. Optional Enhancements
- [ ] Add email templates with branding
- [ ] Implement email verification for newsletter
- [ ] Add reCAPTCHA to forms
- [ ] Set up email notifications via Slack/Discord

---

## Support & Troubleshooting

**Need Help?**
- Check console for error messages
- Review server logs for API errors
- Verify database connection
- Check Payload CMS documentation

**Everything Working?**
🎉 Congratulations! Your CGAZ website is fully functional!

---

**Generated:** January 15, 2026, 12:50 PM
**Version:** 1.0.0
**Ready for:** User Testing & Production Deployment
