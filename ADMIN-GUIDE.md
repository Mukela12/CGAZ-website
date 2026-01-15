# CGAZ Website - Admin Panel Guide

## Overview

The CGAZ website is now fully dynamic and admin-manageable. All content can be added, edited, and deleted through the Payload CMS admin panel at `/admin`.

## Admin Access

### Login Credentials
- **URL:** `http://localhost:3000/admin` (development) or `https://yourdomain.com/admin` (production)
- **Email:** allanchinambu666@gmail.com
- **Password:** CGAZ2026Admin!
- **Role:** Admin (full access)

## Available Collections

### 1. Projects
**Path:** `/admin/collections/projects`

Manage all CGAZ projects (Nalolo Women & Youth Empowerment, etc.)

**Fields:**
- **Title:** Project name
- **Slug:** URL-friendly identifier (auto-generated)
- **Summary:** Brief project description
- **Description:** Full project details (rich text)
- **Status:** planning | active | completed
- **Start Date:** Project start date
- **End Date:** Project completion date (optional)
- **Districts:** Multi-select (Nalolo, Mongu, Kaoma, etc.)
- **Budget:** Project budget (e.g., "USD 2.5 Million")
- **Objectives:** Array of project objectives
- **Impact Metrics:**
  - Beneficiaries (number)
  - Women empowered (number)
  - Youth involved (number)
  - Trees planted (number)
  - Hectares covered (number)
  - Jobs created (number)
- **Gallery:** Multiple images
- **Featured Image:** Main project image
- **Featured:** Checkbox (display prominently)

**Example Data:**
- Title: "Nalolo Women & Youth Empowerment Project"
- Slug: "nalolo-women-youth-empowerment"
- Status: active
- Start Date: October 2024
- End Date: October 2026
- Districts: Nalolo
- Beneficiaries: 7,000
- Trees Planted: 700,000

### 2. Blog Posts (News & Events)
**Path:** `/admin/collections/blog-posts`

Manage news articles, press releases, events, training announcements

**Fields:**
- **Title:** Article title
- **Slug:** URL-friendly identifier
- **Excerpt:** Brief summary
- **Content:** Full article content (rich text)
- **Category:** news | press-release | events | training | success-stories | announcements
- **Status:** draft | published
- **Published Date:** When to publish
- **Author:** Select from Users collection
- **Featured Image:** Main article image
- **Tags:** Array of tags
- **Related Projects:** Link to Projects collection

**Categories:**
- **News:** General CGAZ news and updates
- **Press Release:** Official announcements and statements
- **Events:** Upcoming and past events
- **Training:** Training program announcements
- **Success Stories:** Farmer success stories and testimonials
- **Announcements:** Important announcements

### 3. Success Stories
**Path:** `/admin/collections/success-stories`

Farmer testimonials and success stories

**Fields:**
- **Title:** Story title
- **Slug:** URL identifier
- **Summary:** Brief summary
- **Story:** Full story content (rich text)
- **Farmer Name:** Name of farmer
- **Location:** Where they farm
- **Impact:** Measurable impact achieved
- **Before/After Photos:** Image gallery
- **Status:** draft | published
- **Published Date:** When to publish

### 4. Team Members
**Path:** `/admin/collections/team-members`

Manage CGAZ staff and leadership

**Fields:**
- **Name:** Full name
- **Role/Position:** Job title
- **Bio:** Biography (rich text)
- **Email:** Contact email
- **Phone:** Contact phone
- **Photo:** Profile photo
- **Order:** Display order (lower numbers first)

**Example:**
- Name: "John Doe"
- Role: "Executive Director"
- Bio: "John has 20 years of experience..."
- Order: 1

### 5. Partners
**Path:** `/admin/collections/partners`

Manage partnership organizations

**Fields:**
- **Name:** Organization name
- **Logo:** Partner logo image
- **Website:** Partner website URL
- **Category:** funding | technical | government | private-sector | ngo | other
- **Partnership Details:** Description of partnership
- **Active:** Checkbox (currently active partnership)

**Example Partners:**
- GIZ (German Agency for International Cooperation)
- European Union
- OACPS (Organisation of African, Caribbean and Pacific States)
- African Development Bank (AfDB)

### 6. Media (Images)
**Path:** `/admin/collections/media`

Manage all images used across the website

**Fields:**
- **Alt Text:** Accessibility description (required)
- **Caption:** Image caption
- **Category:** government-visits | training | processing | farming | products | team | events | logos | other
- **Photographer:** Photo credit
- **Date Taken:** When photo was taken
- **Cloudinary URL:** Auto-populated after upload
- **Cloudinary Public ID:** Auto-populated

**Supported Formats:** JPG, PNG, WebP, GIF

**Automatic Cloudinary Upload:**
- When you upload an image, it's automatically uploaded to Cloudinary
- Stored in `CGAZ-IMAGES/` folder
- Cloudinary URL is saved for fast CDN delivery

### 7. Resources (Downloadable Files)
**Path:** `/admin/collections/resources`

Manage downloadable resources for farmers

**Fields:**
- **Title:** Resource name
- **Description:** What this resource contains
- **Category:** training | guides | reports | policy | projects | forms | research | annual-reports | other
- **File Type:** Auto-detected (PDF, Word, Excel, etc.)
- **File Size:** Auto-calculated
- **Language:** English, Bemba, Lozi, Nyanja, Tonga
- **Tags:** Array of tags
- **Featured:** Display prominently
- **Download Count:** Auto-tracked
- **Cloudinary URL:** Auto-populated

**Supported Formats:** PDF, Word (.doc/.docx), Excel (.xls/.xlsx), PowerPoint (.ppt/.pptx), Text, ZIP

**Example Resources:**
- "Cashew Farming Best Practices Guide 2024" (PDF)
- "Training Manual - Cashew Processing" (PDF)
- "Membership Application Form" (Word)
- "Project Report Template" (Excel)

## How to Add Content

### Adding a New Project

1. Go to `/admin/collections/projects`
2. Click "Create New"
3. Fill in all required fields:
   - Title (e.g., "Nalolo Women & Youth Empowerment Project")
   - Summary (brief description)
   - Status (planning/active/completed)
   - Start Date
   - Districts (select from dropdown)
4. Add Impact Metrics (beneficiaries, trees planted, etc.)
5. Upload Featured Image from Media collection or upload new
6. Add Gallery images (optional)
7. Set "Featured" if you want it highlighted
8. Click "Save"

**Result:** Project immediately appears on `/projects` page

### Adding a News Article

1. Go to `/admin/collections/blog-posts`
2. Click "Create New"
3. Fill in fields:
   - Title (e.g., "CGAZ Launches New Training Program")
   - Excerpt (brief summary for listings)
   - Content (full article with rich text editor)
   - Category (news/press-release/events/training)
   - Status: draft (to save for later) or published (to publish immediately)
   - Published Date (when to publish)
4. Select Author (yourself or another user)
5. Upload Featured Image
6. Add Tags (e.g., "training", "nalolo", "youth")
7. Link Related Projects (optional)
8. Click "Save"

**Result:** Article appears on `/news` page, individual page at `/news/[slug]`

### Adding a Downloadable Resource

1. Go to `/admin/collections/resources`
2. Click "Create New"
3. Fill in fields:
   - Title (e.g., "Cashew Farming Guide 2024")
   - Description (what farmers will learn)
   - Category (training/guides/reports/etc.)
   - Language (English/Bemba/Lozi/etc.)
4. Upload File (PDF, Word, Excel, etc.)
5. Add Tags for better search
6. Set "Featured" for important resources
7. Click "Save"

**Result:**
- File uploaded to Cloudinary automatically
- Appears on `/farmers/resources` page
- Users can download directly
- Download count tracked automatically

### Adding Team Members

1. Go to `/admin/collections/team-members`
2. Click "Create New"
3. Fill in fields:
   - Name
   - Role/Position
   - Bio (use rich text editor)
   - Email and Phone
   - Order (1 for Executive Director, 2 for Deputy, etc.)
4. Upload Photo
5. Click "Save"

**Result:** Appears on `/about/leadership` page

### Adding Partners

1. Go to `/admin/collections/partners`
2. Click "Create New"
3. Fill in:
   - Name (e.g., "GIZ")
   - Website URL
   - Category (funding/technical/government/etc.)
   - Partnership Details
4. Upload Logo
5. Check "Active" if currently partnered
6. Click "Save"

**Result:** Appears on `/about/partners` page

## Importing Existing Cloudinary Images

We have 49 images already uploaded to Cloudinary. To import them into the CMS:

```bash
npm run import:cloudinary
```

This will:
- Fetch all images from Cloudinary's `CGAZ-IMAGES/` folder
- Create Media collection entries for each
- Populate alt text from filenames
- Auto-categorize by folder/filename
- Skip already imported images

## Seeding Default Content

**IMPORTANT:** Run this command ONCE after initial setup to populate the database with real content from CGAZ documents.

```bash
npm run seed:content
```

### What Gets Seeded

The seed script automatically populates:

1. **Cloudinary Images (49 images)**
   - All images from `CGAZ-IMAGES/` folder imported into Media collection
   - Auto-categorized by content (government-visits, training, farming, processing, etc.)
   - Alt text generated from filenames

2. **Partner Organizations (10 partners)**
   - GIZ (German Agency for International Cooperation)
   - European Union
   - OACPS (Organisation of African, Caribbean and Pacific States)
   - African Development Bank (AfDB)
   - World Bank
   - Ministry of Agriculture and Livestock
   - Ministry of Green Economy and Environment
   - SNV Netherlands Development Organisation
   - People in Need (Czech Republic)
   - Zambia Agriculture Research Institute (ZARI)

3. **Team Members (9 staff)**
   - Allan Chinambu (National Coordinator)
   - Collins Katungu (Finance and Administration Manager)
   - Edgar Reed (Cashew Value Chain Development Officer)
   - Wakunyambo Yeta (Monitoring and Evaluation Specialist)
   - Mwenda Mukatimui (District Outreach Officer)
   - Savior Indala (Orchard and Nursery Supervisor)
   - Kaneta Kaneta (Driver)
   - Brenda Mwanamwalye (Office Assistant)
   - Charles Mafulo (General Worker)

4. **Projects (1 flagship project)**
   - Nalolo Women and Youth Cashew Development and Climate Resilience Project
   - 7,000 beneficiaries (3,500 women + 3,500 youths)
   - 700,000 trees to be planted
   - Districts: Kalabo, Mongu, Limulunga
   - Duration: October 2024 - October 2026
   - Funding: GIZ, EU, OACPS

5. **Blog Posts (3 initial articles)**
   - "CGAZ Launches Nalolo Women and Youth Cashew Development Project"
   - "CGAZ Membership Reaches 22,490 Farmers Across Western Province"
   - "Training Program Launches for Nalolo Project Beneficiaries"

6. **Success Stories (1 story)**
   - "From Subsistence Farmer to Cashew Entrepreneur: Maria Mulonda's Journey"

7. **Downloadable Resources (5 resource entries)**
   - Cashew Farming Best Practices Guide 2024
   - Cashew Grafting Training Manual
   - CGAZ Membership Application Form
   - Nalolo Project Profile 2024-2026
   - CGAZ Annual Report 2023
   - **Note:** PDF files need to be uploaded via admin panel

### After Seeding

Once seeding is complete:

1. **Login to Admin Panel** (`/admin`)
   - Email: allanchinambu666@gmail.com
   - Password: CGAZ2026Admin!

2. **Upload Missing Assets:**
   - Team member photos (via TeamMembers collection)
   - Partner logos (via Partners collection)
   - Project featured images (via Projects collection)
   - PDF files for downloadable resources (via Resources collection)

3. **Review Content:**
   - Check all seeded data for accuracy
   - Make any necessary edits
   - Add additional content as needed

4. **Publish:**
   - All blog posts are published by default
   - Success stories are published
   - Projects are set to "active" status
   - Resources may need PDF uploads before being useful

### Re-running the Seed Script

The seed script can be safely re-run. It will:
- Skip already imported Cloudinary images
- Attempt to create new entries (will warn if duplicates exist)
- Not delete or overwrite existing content

However, it's recommended to run this **only once** during initial setup. After that, manage all content through the admin panel.

## Managing Content

### Editing Content
1. Go to collection (e.g., `/admin/collections/projects`)
2. Click on item to edit
3. Make changes
4. Click "Save"
5. Changes appear immediately on frontend

### Deleting Content
1. Go to collection
2. Click on item
3. Click "Delete" button (bottom right)
4. Confirm deletion
5. Content removed from frontend immediately

**Note:** Deleting media/resources also deletes from Cloudinary

### Drafts vs. Published
- **Draft:** Content saved but not visible on frontend
- **Published:** Content live and visible to users
- Use drafts to prepare content before publishing

## Content Guidelines

### Writing for the Web
- **Headlines:** Clear, descriptive, under 70 characters
- **Summaries:** 150-200 characters, focus on key benefit
- **Content:** Use headings (H2, H3), short paragraphs, bullet points
- **Images:** High quality, relevant, properly captioned

### SEO Best Practices
- **Slugs:** Keep lowercase, use hyphens (e.g., "nalolo-project")
- **Alt Text:** Describe images clearly for accessibility
- **Titles:** Include key terms but keep natural
- **Descriptions:** Accurate, compelling summaries

### Image Guidelines
- **Size:** Recommended 1920x1080px (16:9) for featured images
- **Format:** JPG for photos, PNG for logos/graphics
- **File Size:** Under 2MB (Cloudinary optimizes automatically)
- **Alt Text:** Always required, describe what's in the image

### Resource Guidelines
- **File Names:** Descriptive, no spaces (use-hyphens-like-this.pdf)
- **Size:** Under 10MB recommended
- **Format:** PDF preferred for documents
- **Description:** Tell users exactly what they'll learn

## Where Content Appears

| Collection | Frontend Pages |
|------------|---------------|
| Projects | `/projects` (list), `/projects/[slug]` (detail) |
| Blog Posts | `/news` (list), `/news/[slug]` (detail) |
| Success Stories | `/farmers/success-stories` |
| Team Members | `/about/leadership` |
| Partners | `/about/partners` |
| Resources | `/farmers/resources` |
| Media | Used across all pages for images |

## Troubleshooting

### "Cannot login"
- Check credentials match ADMIN-CREDENTIALS.md
- Clear browser cache
- Try incognito/private window
- Restart dev server: `npm run dev`

### "Upload failed"
- Check file size (under 10MB for resources, under 5MB for images)
- Check file format is supported
- Check Cloudinary credentials in `.env.local`

### "Changes not showing"
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+F5 on Windows)
- Clear Next.js cache: `rm -rf .next`
- Restart dev server

### "Image not displaying"
- Check Cloudinary URL is populated
- Check image uploaded successfully in Cloudinary dashboard
- Verify environment variables loaded

## Tips for Efficient Content Management

1. **Use Drafts:** Prepare multiple articles as drafts, publish when ready
2. **Bulk Actions:** Select multiple items to delete or update
3. **Search:** Use search bar in collections to find content quickly
4. **Filters:** Filter by status, category, date, etc.
5. **Relationships:** Link related content (projects to blog posts)
6. **Featured Content:** Mark important items as "Featured"
7. **Regular Updates:** Keep content fresh with regular blog posts
8. **Monitor Downloads:** Check resource download counts to see what's popular

## Support

For technical support or questions:
- Contact Developer: [Your contact information]
- Documentation: This file (ADMIN-GUIDE.md)
- Payload CMS Docs: https://payloadcms.com/docs

## Next Steps

1. ✅ Login to admin panel (`/admin`)
2. ✅ Import existing Cloudinary images (`npm run import:cloudinary`)
3. ✅ Add Nalolo Women & Youth project
4. ✅ Add 9 team members
5. ✅ Add 15+ partners
6. ✅ Create 5-10 initial blog posts
7. ✅ Upload training resources/guides
8. ✅ Test frontend pages to verify content appears
9. ✅ Train other administrators

---

**Website developed by Fluxium Software Agency**
**CMS: Payload 3.7 | Framework: Next.js 15**
