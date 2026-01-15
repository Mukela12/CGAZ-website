# CMS Integration Review - All Navbar Pages

**Date:** January 15, 2026
**Purpose:** Review all pages in navigation to ensure admin can manage ALL content via CMS
**User Requirement:** "The admin should be able to manage all content on the website that's the whole point of the admin"

---

## Navigation Structure

### Main Pages (7):
1. **Home** (/)
2. **About** (/about) - Not a page, redirects or shows submenu
3. **For Farmers** (/farmers) - Main farmers page
4. **Projects** (/projects)
5. **Products** (/products)
6. **News & Events** (/news)
7. **Contact** (/contact)

### About Submenu (4):
- Our Story (/about/story)
- Mission & Vision (/about/mission)
- Leadership (/about/leadership)
- Partners (/about/partners)

### For Farmers Submenu (4):
- Training Programs (/farmers/training)
- Resources (/farmers/resources)
- Success Stories (/farmers/stories) - Note: nav says "success-stories" but route is "stories"
- Join CGAZ (/farmers/join)

**Total Pages to Review:** 14 pages

---

## Page-by-Page CMS Integration Status

### 1. Home (/) ✅ PARTIALLY READY

**File:** `/app/(app)/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Presidential visit)
- ✅ ImageSlider: Using gallery slides (6 images) - NEW, just added
- ✅ Stats: Hardcoded impact metrics (4 stats)
- ✅ About Preview: Hardcoded text + 1 image
- ✅ Services/Programs: Hardcoded 3 GlassCards
- ✅ CTA Section: Hardcoded text

**What's Hardcoded:**
```typescript
// Lines 13-38: Impact stats array
const impactStats = [
  { icon: Users, value: "22,490", label: "Registered Members", ... },
  // ... 3 more stats
];

// Lines 49-84: Gallery slides array (NEW)
const gallerySlides = [
  { image: "cloudinary-url", alt: "...", caption: "..." },
  // ... 5 more slides
];

// Lines 82-95: About preview text (2 paragraphs)
// Lines 120-179: Services cards (3 cards with titles, descriptions)
// Lines 186-193: CTA section text
```

**CMS Integration Needed:**

1. **Create `SiteSettings` Global** (Priority: HIGH)
   - `aboutPreviewTitle` (text)
   - `aboutPreviewParagraph1` (textarea)
   - `aboutPreviewParagraph2` (textarea)
   - `aboutPreviewImage` (relationship to Media)
   - `ctaTitle` (text)
   - `ctaDescription` (textarea)

2. **Create `ImpactStats` Collection** (Priority: MEDIUM)
   - `label` (text)
   - `value` (text)
   - `description` (text)
   - `icon` (select: Users, MapPin, Sprout, TrendingUp, etc.)
   - `displayOrder` (number)

3. **Create `GallerySlides` Collection** (Priority: HIGH)
   - `image` (relationship to Media)
   - `alt` (text)
   - `caption` (text)
   - `displayOrder` (number)
   - `showOnHomepage` (checkbox)

4. **Create `ServicesCards` Collection** (Priority: MEDIUM)
   - `title` (text)
   - `description` (textarea)
   - `icon` (select: Sprout, TrendingUp, Users, etc.)
   - `linkUrl` (text)
   - `linkLabel` (text)
   - `displayOrder` (number)
   - `showOnHomepage` (checkbox)

**Implementation Steps:**
1. Create 4 new collections/globals
2. Convert page to Server Component or use getPayloadClient()
3. Fetch data from CMS instead of hardcoded arrays
4. Keep UI structure, populate with CMS data

---

### 2. About > Our Story (/about/story) ✅ PARTIALLY READY

**File:** `/app/(app)/about/story/page.tsx`

**Current State:**
- ✅ Hero: No background image (needs one)
- ✅ Story Introduction: Hardcoded text + 1 image (National Forum)
- ✅ Timeline: Hardcoded 6 milestones
- ✅ Impact Today: 3 cards with images (just fixed duplicates)

**What's Hardcoded:**
```typescript
// Lines 10-46: Timeline milestones array
const milestones = [
  { year: "2010", title: "Foundation", description: "..." },
  // ... 5 more milestones
];

// Lines 62-81: Story introduction text (3 paragraphs)
// Lines 163-216: Impact cards (3 cards with images, titles, descriptions)
```

**CMS Integration Needed:**

1. **Add to `SiteSettings` Global:**
   - `storyIntroTitle` (text) - "How It All Began"
   - `storyIntroParagraph1` (textarea)
   - `storyIntroParagraph2` (textarea)
   - `storyIntroParagraph3` (textarea)
   - `storyIntroImage` (relationship to Media)

2. **Create `TimelineMilestones` Collection:**
   - `year` (text)
   - `title` (text)
   - `description` (textarea)
   - `displayOrder` (number)

3. **Create `ImpactCards` Collection:**
   - `title` (text)
   - `description` (textarea)
   - `image` (relationship to Media)
   - `displayOrder` (number)
   - `showOnStoryPage` (checkbox)

**Additional Fix Needed:**
- Add hero background image (e.g., founding members or historical CGAZ photo)

---

### 3. About > Mission & Vision (/about/mission) ✅ PARTIALLY READY

**File:** `/app/(app)/about/mission/page.tsx`

**Current State:**
- ✅ Hero: Has background image (National Forum)
- ✅ Mission Section: Hardcoded text
- ✅ Vision Section: Hardcoded text
- ✅ Values Section: Hardcoded 4 values with icons

**What's Hardcoded:**
- Mission statement (2 paragraphs)
- Vision statement (2 paragraphs)
- 4 core values with icons, titles, descriptions

**CMS Integration Needed:**

**Add to `SiteSettings` Global:**
- `missionStatement` (richText) - Already in plan!
- `visionStatement` (richText) - Already in plan!
- `missionImage` (relationship to Media)
- `visionImage` (relationship to Media)

**Create `CoreValues` Collection:**
- `title` (text)
- `description` (textarea)
- `icon` (select: Heart, Users, Target, TrendingUp, Leaf, etc.)
- `displayOrder` (number)

---

### 4. About > Leadership (/about/leadership) ❌ NOT CMS-READY

**File:** `/app/(app)/about/leadership/page.tsx`

**Current State:**
- ✅ Hero: Has background image
- ❌ Team Members: Hardcoded 9 team members

**What's Hardcoded:**
```typescript
const teamMembers = [
  { name: "...", position: "...", bio: "...", image: "..." },
  // ... 8 more members
];
```

**CMS Status:**
- ✅ Collection EXISTS: `TeamMembers` collection already configured in Payload
- ❌ Page NOT CONNECTED: Page uses hardcoded array instead of fetching from CMS

**Fields in CMS:**
- name (text)
- position (text)
- bio (textarea)
- image (upload)
- email (email)
- phone (text)
- department (select)
- displayOrder (number)

**Implementation Needed:**
1. Convert page to Server Component
2. Create API helper: `getTeamMembers()`
3. Replace hardcoded array with CMS fetch
4. Populate via admin panel (9 staff members)

**Data Source:** `/CGAZ PROFILE mukela.pdf` - has verified team information

---

### 5. About > Partners (/about/partners) ❌ NOT CMS-READY

**File:** `/app/(app)/about/partners/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Deputy Minister visit)
- ❌ Partners: Hardcoded 15 partner organizations

**What's Hardcoded:**
```typescript
const partners = [
  { name: "...", description: "...", logo: "...", category: "..." },
  // ... 14 more partners
];
```

**CMS Status:**
- ✅ Collection EXISTS: `Partners` collection already configured in Payload
- ❌ Page NOT CONNECTED: Page uses hardcoded array instead of fetching from CMS

**Fields in CMS:**
- name (text)
- slug (text)
- logo (upload)
- description (textarea)
- website (text)
- type (select: government, ngo, international, corporate, research)
- status (select: active, past)
- displayOrder (number)

**Implementation Needed:**
1. Convert page to Server Component
2. Create API helper: `getPartners(category?: string)`
3. Replace hardcoded array with CMS fetch
4. Add filtering by category/type
5. Populate via admin panel (15+ partners)

**Data Source:** `/CGAZ PROFILE mukela.pdf` - has verified partner information

---

### 6. For Farmers > Training Programs (/farmers/training) ✅ PARTIALLY READY

**File:** `/app/(app)/farmers/training/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Master Trainers)
- ✅ Introduction: Hardcoded text (2 paragraphs)
- ✅ Training Programs: Hardcoded 4 programs with images

**What's Hardcoded:**
```typescript
const trainingPrograms = [
  { title: "...", description: "...", duration: "...", image: "...", features: [...] },
  // ... 3 more programs
];
```

**CMS Integration Needed:**

**Create `TrainingPrograms` Collection:**
- `title` (text)
- `slug` (text)
- `description` (textarea)
- `duration` (text)
- `image` (relationship to Media)
- `features` (array of text)
- `prerequisites` (textarea)
- `schedule` (textarea)
- `registrationLink` (text)
- `status` (select: active, upcoming, archived)
- `displayOrder` (number)

**Add to `SiteSettings` Global:**
- `trainingIntroText` (richText)

---

### 7. For Farmers > Resources (/farmers/resources) ✅ PARTIALLY READY

**File:** `/app/(app)/farmers/resources/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Cashew Nursery)
- ✅ Resource Categories: Hardcoded 4 categories
- ✅ Resources: Hardcoded 12 resources

**What's Hardcoded:**
```typescript
const resources = [
  { title: "...", description: "...", type: "...", size: "...", downloadUrl: "..." },
  // ... 11 more resources
];
```

**CMS Integration Needed:**

**Create `Resources` Collection:**
- `title` (text)
- `description` (textarea)
- `type` (select: pdf, guide, video, tool)
- `category` (select: guides, videos, tools, forms)
- `file` (relationship to Media) - For PDFs, videos
- `externalUrl` (text) - For external links
- `size` (text) - Auto-calculated or manual
- `thumbnail` (relationship to Media)
- `downloadCount` (number) - Track popularity
- `status` (select: active, archived)
- `displayOrder` (number)

**Benefits:**
- Admin can upload PDFs, videos directly via CMS
- Auto-track download counts
- Easy to archive old resources

---

### 8. For Farmers > Success Stories (/farmers/stories) ❌ NOT CMS-READY

**File:** `/app/(app)/farmers/stories/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Women at planting season)
- ❌ Success Stories: Hardcoded 4 stories

**What's Hardcoded:**
```typescript
const successStories = [
  { name: "...", location: "...", story: "...", image: "...", achievement: "..." },
  // ... 3 more stories
];
```

**CMS Status:**
- ✅ Collection EXISTS: `SuccessStories` collection already configured in Payload
- ❌ Page NOT CONNECTED: Page uses hardcoded array instead of fetching from CMS

**Fields in CMS:**
- name (text)
- slug (text)
- location (text)
- story (richText)
- excerpt (textarea)
- image (upload)
- achievement (text)
- date (date)
- status (select: published, draft)
- displayOrder (number)

**Implementation Needed:**
1. Convert page to Server Component
2. Create API helper: `getSuccessStories(limit?: number)`
3. Replace hardcoded array with CMS fetch
4. Create individual story pages: `/farmers/stories/[slug]`
5. Populate via admin panel

---

### 9. For Farmers > Join CGAZ (/farmers/join) ✅ PARTIALLY READY

**File:** `/app/(app)/farmers/join/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Women beneficiaries)
- ✅ Benefits: Hardcoded 6 benefits
- ✅ Requirements: Hardcoded 5 requirements
- ✅ Process Steps: Hardcoded 4 steps
- ❌ Application Form: Frontend only, no submission logic

**What's Hardcoded:**
- 6 membership benefits
- 5 eligibility requirements
- 4 application process steps
- Form submission not implemented

**CMS Integration Needed:**

**Create `MembershipBenefits` Collection:**
- `title` (text)
- `description` (textarea)
- `icon` (select)
- `displayOrder` (number)

**Create `MembershipRequirements` Collection:**
- `requirement` (text)
- `displayOrder` (number)

**Create `ApplicationSteps` Collection:**
- `step` (number)
- `title` (text)
- `description` (textarea)
- `displayOrder` (number)

**Create `MembershipApplications` Collection:**
- `fullName` (text)
- `email` (email)
- `phone` (text)
- `district` (select)
- `farmSize` (text)
- `experience` (textarea)
- `status` (select: new, under-review, approved, rejected)
- `submittedAt` (date - auto)
- `reviewedBy` (relationship to Users)
- `reviewNotes` (textarea)

**Implementation Needed:**
1. Add server action for form submission
2. Save applications to CMS
3. Admin can review/approve in admin panel
4. Email notifications (optional)

---

### 10. Projects (/projects) ❌ NOT CMS-READY

**File:** `/app/(app)/projects/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Seedling distribution with CGAZ branding)
- ❌ Projects: Hardcoded 1 project (Nalolo Women & Youth)
- ❌ Filter: Frontend state, not server-side

**What's Hardcoded:**
```typescript
// Lines 46-68
const projects = [
  {
    id: 1,
    title: "Nalolo Women & Youth Empowerment Project",
    description: "...",
    status: "Active",
    location: "Nalolo District",
    beneficiaries: "7,000 women and youth",
    // ... more fields
  }
];
```

**CMS Status:**
- ✅ Collection EXISTS: `Projects` collection already configured in Payload
- ❌ Page NOT CONNECTED: Page uses hardcoded array instead of fetching from CMS

**Fields in CMS:**
- title (text)
- slug (text)
- summary (textarea)
- description (richText)
- district (select: Mongu, Senanga, Kalabo, etc.)
- status (select: active, completed, planned)
- startDate (date)
- endDate (date)
- beneficiaries (text)
- budget (text)
- partners (relationship to Partners)
- featuredImage (relationship to Media)
- gallery (array of relationship to Media)
- impactMetrics (group with fields)
- displayOrder (number)

**Implementation Needed:**
1. Convert page to Server Component
2. Create API helper: `getProjects(status?: string, district?: string)`
3. Replace hardcoded array with CMS fetch
4. Add server-side filtering (useSearchParams)
5. Create individual project pages: `/projects/[slug]`
6. Populate via admin panel

**Data Source:** `/Project Brief.pdf` - has Nalolo project details

---

### 11. Products (/products) ✅ MOSTLY STATIC (USER DECISION NEEDED)

**File:** `/app/(app)/products/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Women in processing factory)
- ✅ Products: Hardcoded 4 products

**What's Hardcoded:**
```typescript
const products = [
  { name: "...", description: "...", features: [...], image: "..." },
  // ... 3 more products
];
```

**CMS Integration Status:**
- ⚠️ Plan recommends keeping STATIC (products rarely change)
- ⚠️ User decision needed: CMS-managed or static?

**IF CMS-Managed, Create `Products` Collection:**
- `name` (text)
- `slug` (text)
- `description` (textarea)
- `features` (array of text)
- `image` (relationship to Media)
- `category` (select: raw, processed, value-added)
- `inStock` (checkbox)
- `displayOrder` (number)

**Recommendation:** Keep static for now, make CMS-managed only if user requests it.

---

### 12. News & Events (/news) ❌ NOT CMS-READY

**File:** `/app/(app)/news/page.tsx`

**Current State:**
- ✅ Hero: Has background image (Official launch ceremony)
- ❌ Blog Posts: Hardcoded 3 posts
- ❌ Filter/Search: Frontend state only

**What's Hardcoded:**
```typescript
// Lines 39-82
const posts = [
  { title: "...", excerpt: "...", date: "...", category: "...", image: "..." },
  // ... 2 more posts
];
```

**CMS Status:**
- ✅ Collection EXISTS: `BlogPosts` collection already configured in Payload
- ❌ Page NOT CONNECTED: Page uses hardcoded array instead of fetching from CMS

**Fields in CMS:**
- title (text)
- slug (text)
- excerpt (textarea)
- content (richText)
- featuredImage (relationship to Media)
- author (relationship to Users)
- category (select: news, events, announcements, success-stories)
- tags (array of text)
- publishedDate (date)
- status (select: published, draft, archived)

**Implementation Needed:**
1. Convert to Server Component or use "use client" with API
2. Create API helper: `getBlogPosts(category?: string, search?: string)`
3. Replace hardcoded array with CMS fetch
4. Add server-side filtering/search (useSearchParams)
5. Create individual blog pages: `/news/[slug]`
6. Populate via admin panel (5-10 initial posts)

---

### 13. Contact (/contact) ❌ FORM NOT CONNECTED

**File:** `/app/(app)/contact/page.tsx`

**Current State:**
- ✅ Hero: Has background image (CGAZ poster)
- ✅ Contact Info: Hardcoded 4 cards (address, phone, email, hours)
- ✅ Regional Offices: Hardcoded 4 offices
- ❌ Contact Form: Frontend only, TODO comment on line 23

**What's Hardcoded:**
```typescript
// Line 23: TODO: Implement form submission logic
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  // TODO: Implement form submission logic
  setTimeout(() => {
    setIsSubmitting(false);
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  }, 1000);
};

// Lines 37-61: Contact info array
// Lines 63-84: Regional offices array
```

**CMS Integration Needed:**

**Create `ContactSubmissions` Collection:** (Already in plan!)
- `name` (text)
- `email` (email)
- `phone` (text)
- `subject` (select: membership, partnership, products, training, general)
- `message` (textarea)
- `status` (select: new, in-progress, resolved)
- `createdAt` (date - auto)

**Add to `SiteSettings` Global:**
- `contactPhone` (text)
- `contactEmail` (email)
- `address` (textarea)
- `businessHours` (textarea)
- `googleMapsEmbedUrl` (text)

**Create `RegionalOffices` Collection:**
- `name` (text)
- `address` (text)
- `phone` (text)
- `email` (email)
- `district` (select)
- `displayOrder` (number)

**Implementation Needed:**
1. Add server action for form submission
2. Save submissions to CMS
3. Admin can view/respond in admin panel
4. Email notification to admin (optional)
5. Replace hardcoded contact info with CMS data
6. Replace hardcoded regional offices with CMS data

---

### 14. For Farmers Main (/farmers) ❓ NEEDS INVESTIGATION

**Status:** Need to check if this page exists or if it just redirects/shows submenu

**If page exists:**
- Review content
- Document hardcoded elements
- Plan CMS integration

**If no page:**
- Mark as N/A

---

## Summary: CMS Integration Status

### ✅ Fully CMS-Ready (0 pages)
None - all pages need some level of CMS integration

### ⚠️ Partially CMS-Ready (7 pages)
1. Home - ImageSlider added, but stats/services/CTA still hardcoded
2. About > Story - Fixed images, but timeline/content still hardcoded
3. About > Mission - Has images, but mission/vision/values hardcoded
4. Training Programs - Has images, but programs hardcoded
5. Resources - Has images, but resources hardcoded
6. Join CGAZ - Has images/content, but no form submission
7. Products - Has content, decision needed on CMS vs static

### ❌ Not CMS-Ready (7 pages)
1. About > Leadership - Collection exists, page not connected
2. About > Partners - Collection exists, page not connected
3. Success Stories - Collection exists, page not connected
4. Projects - Collection exists, page not connected
5. News & Events - Collection exists, page not connected
6. Contact - Form submission not implemented
7. For Farmers (main) - Unknown status

---

## Priority Actions Required

### Priority 1: CRITICAL - Connect Existing Collections (4 pages)

These collections are already configured in Payload but pages don't use them:

1. **Leadership Page** → Connect to `TeamMembers` collection
2. **Partners Page** → Connect to `Partners` collection
3. **Success Stories Page** → Connect to `SuccessStories` collection
4. **Projects Page** → Connect to `Projects` collection
5. **News Page** → Connect to `BlogPosts` collection

**Why Critical:** CMS is configured and ready, just need to fetch data instead of hardcoded arrays.

**Implementation:** 2-3 hours
- Create `/lib/payload/api.ts` helper
- Convert pages to Server Components
- Replace hardcoded arrays with `getPayloadClient()` fetches

---

### Priority 2: HIGH - Form Submissions (2 forms)

1. **Contact Form** → Save to `ContactSubmissions` collection
2. **Join CGAZ Form** → Save to `MembershipApplications` collection

**Why High:** These are user-facing forms that currently do nothing. Users expect them to work.

**Implementation:** 1-2 hours
- Create collections in Payload
- Add server actions for form submission
- Admin can view submissions in panel

---

### Priority 3: MEDIUM - Create New Collections (10 collections)

For pages with hardcoded content that need new collections:

1. `SiteSettings` (Global) - Homepage, mission/vision, contact info
2. `ImpactStats` - Homepage stats
3. `GallerySlides` - Homepage slider
4. `ServicesCards` - Homepage services
5. `TimelineMilestones` - Story page timeline
6. `ImpactCards` - Story page impact cards
7. `CoreValues` - Mission page values
8. `TrainingPrograms` - Training page programs
9. `Resources` - Resources page downloads
10. `MembershipBenefits/Requirements/Steps` - Join page content

**Why Medium:** Important for full CMS control, but not blocking functionality.

**Implementation:** 4-5 hours
- Create collection configs
- Add to `payload.config.ts`
- Update pages to fetch from CMS

---

### Priority 4: LOW - Products Decision

**Decision Needed:** Should Products be CMS-managed or remain static?

**Plan recommendation:** Keep static (products rarely change)
**User decision:** Waiting for confirmation

---

## Technical Implementation Plan

### Phase 1: Connect Existing Collections (Day 1 - 3 hours)

**File:** `/lib/payload/api.ts` (CREATE)
```typescript
export async function getTeamMembers() { ... }
export async function getPartners(type?: string) { ... }
export async function getProjects(status?: string) { ... }
export async function getBlogPosts(category?: string) { ... }
export async function getSuccessStories(limit?: number) { ... }
```

**Update Pages:**
- `/app/(app)/about/leadership/page.tsx` - Fetch team members
- `/app/(app)/about/partners/page.tsx` - Fetch partners
- `/app/(app)/farmers/stories/page.tsx` - Fetch success stories
- `/app/(app)/projects/page.tsx` - Fetch projects
- `/app/(app)/news/page.tsx` - Fetch blog posts

### Phase 2: Implement Forms (Day 1 - 2 hours)

**Create Collections:**
- `ContactSubmissions`
- `MembershipApplications`

**Add Server Actions:**
- `/app/(app)/contact/page.tsx` - Submit contact form
- `/app/(app)/farmers/join/page.tsx` - Submit membership application

### Phase 3: Create New Collections (Day 2-3 - 5 hours)

**Create 10 new collections/globals**
**Update pages to fetch from CMS**

### Phase 4: Content Population (Day 3-4 - 3 hours)

**Via Admin Panel:**
- Add 9 team members
- Add 15+ partners
- Create Nalolo project
- Add 5-10 blog posts
- Upload resources (PDFs, guides)
- Add training programs

---

## What Admin Will See in CMS Panel

After full implementation, admin panel will have:

### Collections (15):
1. Users - Manage admin users
2. Media - Upload images, PDFs, videos to Cloudinary
3. **TeamMembers** - Add/edit staff profiles
4. **Partners** - Add/edit partner organizations
5. **Projects** - Create/manage projects
6. **BlogPosts** - Write news articles and updates
7. **SuccessStories** - Share farmer success stories
8. ImpactStats - Update homepage statistics
9. GallerySlides - Manage homepage image slider
10. TrainingPrograms - Add/edit training offerings
11. Resources - Upload guides, PDFs, videos
12. **ContactSubmissions** - View/respond to contact form messages
13. **MembershipApplications** - Review/approve membership applications
14. ServicesCards - Update homepage services
15. CoreValues - Manage organizational values

### Globals (1):
1. **SiteSettings** - Update mission, vision, contact info, about text, CTAs

### Admin Capabilities:
- ✅ Add/edit/delete all content
- ✅ Upload images directly to Cloudinary
- ✅ Upload PDFs and documents
- ✅ Review form submissions
- ✅ Approve membership applications
- ✅ Publish/draft blog posts
- ✅ Update site-wide text (mission, vision, etc.)
- ✅ Manage team members and partners
- ✅ Create and track projects
- ✅ Update homepage content (slider, stats, services)

**Result:** Admin has full control without touching code!

---

## Current Blockers & Issues

### 1. Admin Login Fixed ✅
- User was locked out (too many attempts)
- **Status:** RESOLVED - Unlocked via database update

### 2. Navigation Design
- User mentioned: "the sidebar looks a little weird"
- **Plan:** Switch from sidebar to top horizontal navbar
- **Status:** In backlog, not blocking CMS work

### 3. Image "sizes" Prop Warnings
- User mentioned seeing warnings about missing sizes prop
- **Status:** To be addressed after CMS integration

### 4. Route Naming Inconsistency
- Nav says "/farmers/success-stories" but route is "/farmers/stories"
- **Impact:** Minor, but should be fixed for consistency

---

## Files Referenced

### Existing Collection Configs:
- `/payload/collections/Users.ts` ✅
- `/payload/collections/TeamMembers.ts` ✅
- `/payload/collections/Partners.ts` ✅
- `/payload/collections/Projects.ts` ✅
- `/payload/collections/BlogPosts.ts` ✅
- `/payload/collections/SuccessStories.ts` ✅
- `/payload/collections/Media.ts` ✅

### Pages Needing Update:
All 14 pages listed above

### New Files to Create:
- `/lib/payload/api.ts` - Helper functions
- `/payload/collections/ContactSubmissions.ts`
- `/payload/collections/MembershipApplications.ts`
- `/payload/collections/ImpactStats.ts`
- `/payload/collections/GallerySlides.ts`
- `/payload/collections/TrainingPrograms.ts`
- `/payload/collections/Resources.ts`
- `/payload/globals/SiteSettings.ts`
- Multiple other collection files

### Documentation:
- `/CGAZ PROFILE mukela.pdf` - Team members, partners data
- `/Project Brief.pdf` - Nalolo project details
- `/VALUES.pdf` - Core values
- `/Cashew Develop.Strategic Plan 2020-2025.pdf` - Strategic information

---

## Next Steps

1. **Get User Confirmation:**
   - Should Products be CMS-managed or static?
   - Confirm priority order
   - Any other pages to review?

2. **Start Implementation:**
   - Phase 1: Connect existing collections (3 hours)
   - Phase 2: Implement forms (2 hours)
   - Phase 3: Create new collections (5 hours)
   - Phase 4: Populate content via admin (3 hours)

3. **Testing:**
   - Verify all pages load data from CMS
   - Test form submissions
   - Check admin panel accessibility
   - Validate no hardcoded content remains

4. **Documentation:**
   - Create admin user guide
   - Document CMS workflow
   - Screen recordings for training

---

**Total Estimated Time:** 13-15 hours
**Goal:** Admin can manage 100% of website content without developer assistance

---

Generated: January 15, 2026
Status: Ready for Implementation
Next: Await user confirmation, then begin Phase 1
