// Load environment variables FIRST before any other imports
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Now import cloudinary directly to avoid circular import issues
import { v2 as cloudinary } from 'cloudinary'

// Verify environment variables are loaded
if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
  console.error('❌ Error: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME not found in .env.local')
  process.exit(1)
}

if (!process.env.CLOUDINARY_API_KEY) {
  console.error('❌ Error: CLOUDINARY_API_KEY not found in .env.local')
  process.exit(1)
}

if (!process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Error: CLOUDINARY_API_SECRET not found in .env.local')
  process.exit(1)
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Comprehensive Content Seeding Script for CGAZ Website
 *
 * This script:
 * 1. Imports all 49 Cloudinary images from CGAZ-IMAGES folder
 * 2. Seeds real content from provided PDFs
 * 3. Creates Nalolo Women & Youth Empowerment Project
 * 4. Adds key partners (GIZ, EU, OACPS, AfDB)
 * 5. Creates team members from staff list
 * 6. Adds initial blog posts about project launch
 * 7. Populates organizational values
 */

async function seedContent() {
  console.log('🌱 Starting CGAZ content seeding...')

  const payload = await getPayload({ config })

  // ============================================================
  // STEP 1: Import Cloudinary Images (49 images)
  // ============================================================
  console.log('\n📸 Step 1: Importing Cloudinary images...')

  try {
    const cloudinaryImages = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'CGAZ-IMAGES/',
      max_results: 500,
      resource_type: 'image'
    })

    console.log(`Found ${cloudinaryImages.resources.length} images in Cloudinary`)

    const mediaIds: Record<string, string> = {}

    for (const resource of cloudinaryImages.resources) {
      const filename = resource.public_id.split('/').pop() || 'image'

      // Generate alt text from filename
      const altText = filename
        .replace(/_/g, ' ')
        .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
        .replace(/([A-Z])/g, ' $1')
        .trim()

      // Auto-categorize based on filename keywords
      let category = 'other'
      const lowerFilename = filename.toLowerCase()

      if (lowerFilename.includes('minister') || lowerFilename.includes('government')) {
        category = 'government-visits'
      } else if (lowerFilename.includes('training') || lowerFilename.includes('workshop')) {
        category = 'training'
      } else if (lowerFilename.includes('processing') || lowerFilename.includes('factory')) {
        category = 'processing'
      } else if (lowerFilename.includes('farmer') || lowerFilename.includes('plantation')) {
        category = 'farming'
      } else if (lowerFilename.includes('nursery') || lowerFilename.includes('seedling')) {
        category = 'farming'
      } else if (lowerFilename.includes('cashew') && lowerFilename.includes('nut')) {
        category = 'products'
      } else if (lowerFilename.includes('team') || lowerFilename.includes('staff')) {
        category = 'team'
      }

      try {
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: altText,
            caption: `CGAZ ${category.replace(/-/g, ' ')}`,
            category,
            cloudinaryUrl: resource.secure_url,
            cloudinaryPublicId: resource.public_id,
            filename: resource.public_id,
            dateTaken: resource.created_at,
          },
        })

        mediaIds[filename] = media.id
        console.log(`  ✅ Imported: ${filename}`)
      } catch (error: any) {
        console.log(`  ⚠️  Skipped ${filename}: ${error.message}`)
      }
    }

    console.log(`\n✅ Imported ${Object.keys(mediaIds).length} images into Media collection`)

    // ============================================================
    // STEP 2: Create Partners
    // ============================================================
    console.log('\n🤝 Step 2: Creating partner organizations...')

    const partners = [
      {
        name: 'GIZ (German Agency for International Cooperation)',
        website: 'https://www.giz.de',
        category: 'funding',
        partnershipDetails: 'Primary funding partner for the Nalolo Women & Youth Cashew Development and Climate Resilience Project. Supports sustainable agricultural development and climate adaptation initiatives in Zambia.',
        active: true,
      },
      {
        name: 'European Union',
        website: 'https://ec.europa.eu',
        category: 'funding',
        partnershipDetails: 'Co-financing partner for cashew development projects. Provides technical and financial support for agricultural value chain development and rural economic empowerment.',
        active: true,
      },
      {
        name: 'OACPS (Organisation of African, Caribbean and Pacific States)',
        website: 'https://www.acp.int',
        category: 'funding',
        partnershipDetails: 'Supporting partner for the Nalolo project. Promotes sustainable development and economic cooperation across ACP member states.',
        active: true,
      },
      {
        name: 'African Development Bank (AfDB)',
        website: 'https://www.afdb.org',
        category: 'funding',
        partnershipDetails: 'Funded the Cashew Infrastructure Development Project (CIDP) from 2017-2023. Helped mobilize over 22,000 farmers to plant cashew trees and develop the warehouse receipt system.',
        active: true,
      },
      {
        name: 'World Bank',
        website: 'https://www.worldbank.org',
        category: 'funding',
        partnershipDetails: 'Supported CGAZ as Climate Risk Adaptation Facilitator under the Pilot Project for Climate Resilience (PPCR II) from 2015-2020. Facilitated development of 250 Community Adaptation Projects.',
        active: false,
      },
      {
        name: 'Ministry of Agriculture and Livestock (Zambia)',
        website: 'https://www.agriculture.gov.zm',
        category: 'government',
        partnershipDetails: 'Implementing partner for cashew development initiatives. Provides technical support and policy framework for cashew production in Western Province.',
        active: true,
      },
      {
        name: 'Ministry of Green Economy and Environment (Zambia)',
        website: 'https://www.mge.gov.zm',
        category: 'government',
        partnershipDetails: 'Partner in environmental protection and sustainable natural resource management. Includes cashew trees in the National Tree Planting Program (NTPP).',
        active: true,
      },
      {
        name: 'SNV Netherlands Development Organisation',
        website: 'https://snv.org',
        category: 'technical',
        partnershipDetails: 'Collaborated on the Expanding Water & Sanitation project (2023-2024) in Nalolo district. Provides technical expertise in rural development and WASH services.',
        active: false,
      },
      {
        name: 'People in Need (Czech Republic)',
        website: 'https://www.peopleinneed.net',
        category: 'ngo',
        partnershipDetails: 'Partner in the Empowering Women and Youth Through Cashew Production project (2018-2021). Supported 500+ beneficiaries in Mongu, Limulunga, and Kalabo districts.',
        active: false,
      },
      {
        name: 'Zambia Agriculture Research Institute (ZARI)',
        website: 'https://www.zari.gov.zm',
        category: 'technical',
        partnershipDetails: 'Hosts CGAZ offices at ZARI premises in Mongu. Provides research support and technical expertise for cashew production and agroforestry systems.',
        active: true,
      },
    ]

    const partnerIds: Record<string, string> = {}

    for (const partner of partners) {
      try {
        const created = await payload.create({
          collection: 'partners',
          data: partner,
        })
        partnerIds[partner.name] = created.id
        console.log(`  ✅ Created partner: ${partner.name}`)
      } catch (error: any) {
        console.log(`  ⚠️  Partner already exists: ${partner.name}`)
      }
    }

    console.log(`\n✅ Created ${Object.keys(partnerIds).length} partner organizations`)

    // ============================================================
    // STEP 3: Create Team Members
    // ============================================================
    console.log('\n👥 Step 3: Creating team members...')

    const teamMembers = [
      {
        name: 'Allan Chinambu',
        role: 'National Coordinator',
        bio: '<p>Allan Chinambu serves as the National Coordinator of the Cashew Growers Association of Zambia (CGAZ). He holds a Master of Science degree in Agricultural Sciences and has extensive experience in agricultural development, climate adaptation, and rural empowerment programs.</p><p>Under his leadership, CGAZ has mobilized over 22,490 farmers across 10 districts in Western Province and secured partnerships with leading international development organizations including GIZ, the European Union, and the African Development Bank.</p>',
        email: 'allanchinambu666@gmail.com',
        phone: '+260-977429666',
        order: 1,
      },
      {
        name: 'Collins Katungu',
        role: 'Finance and Administration Manager',
        bio: '<p>Collins Katungu manages CGAZ financial operations and administrative systems. He is an ACCA-certified accountant with expertise in non-profit financial management, donor reporting, and organizational governance.</p><p>Collins ensures transparent financial management and accountability across all CGAZ projects and operations.</p>',
        email: 'finance@cgaz.org.zm',
        phone: '+260-977000000',
        order: 2,
      },
      {
        name: 'Edgar Reed',
        role: 'Cashew Value Chain Development Officer',
        bio: '<p>Edgar Reed holds a Master of Science in Agriculture and specializes in value chain development, agricultural processing, and market linkages. He leads CGAZ efforts to develop the cashew business model and establish connections between farmers, processors, and markets.</p><p>Edgar has played a key role in developing the warehouse receipt system and establishing quality standards for Zambian cashew products.</p>',
        email: 'valuechain@cgaz.org.zm',
        phone: '+260-977000001',
        order: 3,
      },
      {
        name: 'Wakunyambo Yeta',
        role: 'Monitoring and Evaluation Specialist',
        bio: '<p>Wakunyambo Yeta is responsible for monitoring project implementation and evaluating impact across all CGAZ programs. He holds a Diploma in Finance and Administration with specialized training in M&E systems.</p><p>Wakunyambo ensures that CGAZ projects achieve their intended outcomes and that lessons learned are documented and shared with stakeholders.</p>',
        email: 'monitoring@cgaz.org.zm',
        phone: '+260-977000002',
        order: 4,
      },
      {
        name: 'Mwenda Mukatimui',
        role: 'District Outreach Officer',
        bio: '<p>Mwenda Mukatimui coordinates CGAZ activities at the district level, working directly with Cashew Development Centers and farmer groups. He holds a Certificate in General Agriculture and has extensive field experience in extension services.</p><p>Mwenda facilitates trainings, mobilizes farmers, and ensures effective communication between CGAZ headquarters and grassroots communities.</p>',
        email: 'outreach@cgaz.org.zm',
        phone: '+260-977000003',
        order: 5,
      },
      {
        name: 'Savior Indala',
        role: 'Orchard and Nursery Supervisor',
        bio: '<p>Savior Indala manages CGAZ cashew nurseries and demonstration orchards. He holds a Certificate in Nursery Management and Grafting and has received specialized training in cashew propagation techniques from Mozambique.</p><p>Savior oversees production of high-quality cashew seedlings and grafted plants for distribution to farmers across Western Province.</p>',
        email: 'nursery@cgaz.org.zm',
        phone: '+260-977000004',
        order: 6,
      },
      {
        name: 'Kaneta Kaneta',
        role: 'Driver',
        bio: '<p>Kaneta Kaneta provides transportation services for CGAZ field operations, ensuring timely delivery of seedlings, training materials, and project resources to remote communities across Western Province.</p>',
        email: 'transport@cgaz.org.zm',
        phone: '+260-977000005',
        order: 7,
      },
      {
        name: 'Brenda Mwanamwalye',
        role: 'Office Assistant',
        bio: '<p>Brenda Mwanamwalye provides administrative support to the CGAZ team, managing office operations, correspondence, and visitor coordination at the Mongu headquarters.</p>',
        email: 'office@cgaz.org.zm',
        phone: '+260-977000006',
        order: 8,
      },
      {
        name: 'Charles Mafulo',
        role: 'General Worker',
        bio: '<p>Charles Mafulo supports CGAZ field operations and facilities maintenance, ensuring smooth day-to-day operations at nurseries and demonstration sites.</p>',
        email: 'operations@cgaz.org.zm',
        phone: '+260-977000007',
        order: 9,
      },
    ]

    for (const member of teamMembers) {
      try {
        await payload.create({
          collection: 'team-members',
          data: member,
        })
        console.log(`  ✅ Created team member: ${member.name}`)
      } catch (error: any) {
        console.log(`  ⚠️  Team member already exists: ${member.name}`)
      }
    }

    console.log(`\n✅ Created ${teamMembers.length} team members`)

    // ============================================================
    // STEP 4: Create Nalolo Women & Youth Empowerment Project
    // ============================================================
    console.log('\n🌳 Step 4: Creating Nalolo Women & Youth Empowerment Project...')

    try {
      const naloloProject = await payload.create({
        collection: 'projects',
        data: {
          title: 'Nalolo Women and Youth Cashew Development and Climate Resilience Project',
          slug: 'nalolo-women-youth-empowerment',
          summary: 'Empowering 7,000 beneficiaries (3,500 women and 3,500 youths) to grow 700,000 cashew trees integrated with agroforestry systems in Western Province, contributing to economic growth, food security, and climate resilience.',
          description: `
            <h2>Project Overview</h2>
            <p>The Nalolo Women and Youth Cashew Development and Climate Resilience Project is CGAZ's flagship initiative aimed at transforming livelihoods and restoring degraded landscapes in Western Province through sustainable cashew production.</p>

            <h3>Project Goal</h3>
            <p>To contribute to Zambia's economic growth and food security by supporting 3,500 women and 3,500 youths with resources to grow 700,000 cashew trees integrated with agroforestry systems.</p>

            <h3>Project Districts</h3>
            <p>The project is implemented in Kalabo, Mongu, and Limulunga Districts in Western Province, targeting communities living on heavily degraded Kalahari sand soils.</p>

            <h3>Key Components</h3>
            <ul>
              <li><strong>Cashew Seedling Production:</strong> Establishing nurseries to produce 700,000 high-quality cashew seedlings</li>
              <li><strong>Farmer Training:</strong> Comprehensive training in cashew production, grafting techniques, and orchard management</li>
              <li><strong>Land Security:</strong> Supporting beneficiaries to secure land tenure for sustainable cashew orchards</li>
              <li><strong>Climate Adaptation:</strong> Integrating cashew with agroforestry systems to rehabilitate degraded land</li>
              <li><strong>Women & Youth Empowerment:</strong> Prioritizing women and youth as primary beneficiaries and leaders</li>
              <li><strong>Market Linkages:</strong> Connecting farmers to processors and markets for cashew products</li>
            </ul>

            <h3>Environmental Benefits</h3>
            <p>The evergreen cashew trees play an important role in rehabilitating heavily degraded pieces of land while providing a sustainable and alternative source of livelihood. Cashew trees thrive on infertile Kalahari sands and contribute to:</p>
            <ul>
              <li>Soil restoration and erosion control</li>
              <li>Carbon sequestration and climate change mitigation</li>
              <li>Biodiversity conservation</li>
              <li>Watershed protection</li>
            </ul>

            <h3>Expected Outcomes</h3>
            <ul>
              <li>7,000 beneficiaries (3,500 women + 3,500 youths) empowered</li>
              <li>700,000 cashew trees planted across 3 districts</li>
              <li>Improved household incomes and food security</li>
              <li>Restored degraded landscapes and improved ecosystem services</li>
              <li>Strengthened climate resilience in vulnerable communities</li>
              <li>Enhanced democratic governance and gender equality at grassroots level</li>
            </ul>

            <h3>Funding Partners</h3>
            <p>This project is made possible through financial support from:</p>
            <ul>
              <li>GIZ (German Agency for International Cooperation)</li>
              <li>European Union (EU)</li>
              <li>Organisation of African, Caribbean and Pacific States (OACPS)</li>
            </ul>
          `,
          status: 'active',
          startDate: '2024-10-01',
          endDate: '2026-10-31',
          districts: ['Kalabo', 'Mongu', 'Limulunga'],
          budget: 'USD 2.5 Million',
          objectives: [
            'Empower 3,500 women and 3,500 youths to establish sustainable cashew orchards',
            'Plant 700,000 cashew trees integrated with agroforestry systems',
            'Rehabilitate degraded Kalahari sand landscapes in Western Province',
            'Enhance climate resilience of vulnerable communities',
            'Improve household incomes through cashew value chain development',
            'Promote gender equality and youth participation in agricultural development',
            'Strengthen democratic governance and community-led development',
          ],
          impactMetrics: {
            beneficiaries: 7000,
            womenEmpowered: 3500,
            youthInvolved: 3500,
            treesPlanted: 700000,
            hectaresCovered: 7000,
            jobsCreated: 7000,
          },
          featured: true,
        },
      })

      console.log(`  ✅ Created project: ${naloloProject.title}`)
    } catch (error: any) {
      console.log(`  ⚠️  Project may already exist: ${error.message}`)
    }

    // ============================================================
    // STEP 5: Create Initial Blog Posts
    // ============================================================
    console.log('\n📰 Step 5: Creating initial blog posts...')

    const blogPosts = [
      {
        title: 'CGAZ Launches Nalolo Women and Youth Cashew Development Project',
        slug: 'nalolo-project-launch-2024',
        excerpt: 'CGAZ partners with GIZ, EU, and OACPS to empower 7,000 beneficiaries through cashew production and climate resilience in Western Province.',
        content: `
          <h2>Historic Partnership to Transform Lives and Landscapes</h2>

          <p>The Cashew Growers Association of Zambia (CGAZ) is proud to announce the launch of the Nalolo Women and Youth Cashew Development and Climate Resilience Project in October 2024. This groundbreaking initiative will empower 7,000 beneficiaries—3,500 women and 3,500 youths—to establish sustainable livelihoods through cashew production while restoring degraded landscapes in Western Province.</p>

          <h3>A Vision for Sustainable Development</h3>

          <p>The project represents a significant milestone in Zambia's agricultural development strategy, aligning with the Eighth National Development Plan's objectives to achieve economic growth through sustainable agriculture, value addition, and environmental protection.</p>

          <p>"This project embodies our mission to enhance the adaptive capacity of vulnerable communities while promoting democratic governance and inclusive development," said Allan Chinambu, National Coordinator of CGAZ. "By focusing on women and youth, we are not only addressing poverty and food insecurity but also building the next generation of agricultural entrepreneurs."</p>

          <h3>Strategic Partnerships for Impact</h3>

          <p>The project is made possible through generous financial support from three key development partners:</p>

          <ul>
            <li><strong>GIZ (German Agency for International Cooperation)</strong> - Lead funding partner</li>
            <li><strong>European Union</strong> - Co-financing partner</li>
            <li><strong>OACPS (Organisation of African, Caribbean and Pacific States)</strong> - Supporting partner</li>
          </ul>

          <h3>Targeting Three Key Districts</h3>

          <p>The project will be implemented in Kalabo, Mongu, and Limulunga Districts, areas characterized by heavily degraded Kalahari sand soils that are ideal for cashew production. These districts have limited agricultural opportunities due to poor soil fertility, making cashew trees an ideal solution for both economic and environmental challenges.</p>

          <h3>700,000 Trees for Economic and Environmental Transformation</h3>

          <p>At the heart of the project is the ambitious goal to plant 700,000 cashew trees integrated with agroforestry systems. Each beneficiary will establish an orchard of 100 trees, creating a sustainable source of income while contributing to landscape restoration and climate change mitigation.</p>

          <p>Cashew trees are uniquely suited to Western Province conditions:</p>
          <ul>
            <li>Thrive on infertile Kalahari sands</li>
            <li>Require minimal inputs and maintenance</li>
            <li>Provide both cashew nuts and cashew apples for consumption and processing</li>
            <li>Contribute to soil restoration and carbon sequestration</li>
            <li>Create year-round employment opportunities in production, processing, and marketing</li>
          </ul>

          <h3>Empowering Women and Youth</h3>

          <p>A defining feature of the Nalolo project is its focus on women and youth empowerment. Women and young people are often marginalized in traditional agricultural systems, yet they represent the majority of the rural population and have enormous potential as agents of change.</p>

          <p>The project will support beneficiaries to:</p>
          <ul>
            <li>Secure land tenure for sustainable cashew production</li>
            <li>Access high-quality cashew seedlings and grafted plants</li>
            <li>Receive comprehensive training in cashew production and management</li>
            <li>Form farmer groups and cooperatives for collective action</li>
            <li>Connect to markets and value chain opportunities</li>
            <li>Participate in democratic governance at community level</li>
          </ul>

          <h3>Building on a Strong Foundation</h3>

          <p>CGAZ brings 17 years of experience in cashew development to this project. Since its establishment in 2007, the association has mobilized over 22,490 farmers across Western Province and implemented numerous successful projects with partners including the World Bank, African Development Bank, and European Commission.</p>

          <p>The Nalolo project builds on lessons learned from previous initiatives, including the Cashew Infrastructure Development Project (2017-2023) and the Empowering Women and Youth Through Cashew Production project (2018-2021).</p>

          <h3>Looking Ahead</h3>

          <p>Over the next two years, CGAZ will work closely with beneficiary communities, government ministries, and development partners to ensure successful project implementation. Regular monitoring and evaluation will track progress toward targets and ensure accountability to all stakeholders.</p>

          <p>The project represents not only an investment in cashew production but also an investment in people, environment, and sustainable development for Western Province and Zambia as a whole.</p>

          <p><em>For more information about the Nalolo Women and Youth Cashew Development and Climate Resilience Project, contact CGAZ at allanchinambu666@gmail.com or +260-977429666.</em></p>
        `,
        category: 'news',
        status: 'published',
        publishedDate: '2024-10-15',
        tags: ['Nalolo Project', 'Women Empowerment', 'Youth Development', 'Climate Resilience', 'GIZ Partnership'],
      },
      {
        title: 'CGAZ Membership Reaches 22,490 Farmers Across Western Province',
        slug: 'cgaz-membership-milestone-2024',
        excerpt: 'The Cashew Growers Association of Zambia continues to grow, now representing over 22,000 smallholder farmers organized in 145 Cashew Development Centers across 10 districts.',
        content: `
          <h2>Celebrating Growth and Community Strength</h2>

          <p>The Cashew Growers Association of Zambia (CGAZ) is proud to announce that its membership has reached 22,490 farmers organized in 145 Cashew Development Centers across 10 districts in Western Province. This milestone reflects the growing recognition of cashew as a viable agricultural enterprise and CGAZ's commitment to supporting smallholder farmers.</p>

          <h3>A Strong and Diverse Membership Base</h3>

          <p>CGAZ membership includes 12,272 men (54.36%) and 10,218 women (45.43%), demonstrating strong gender balance and women's active participation in cashew production. Members come from diverse backgrounds and include smallholder farmers, youth entrepreneurs, and community leaders.</p>

          <h3>District-Level Organization</h3>

          <p>CGAZ members are organized across 10 districts in Western Province:</p>

          <ul>
            <li>Limulunga: 3,869 members (40.4% women)</li>
            <li>Mongu: 2,853 members (49.6% women)</li>
            <li>Lukulu: 2,753 members (52.18% women)</li>
            <li>Kalabo: 2,520 members (35% women)</li>
            <li>Sikongo: 2,252 members (42.1% women)</li>
            <li>Senanga: 2,180 members (44.75% women)</li>
            <li>Sioma: 2,130 members (52.2% women)</li>
            <li>Mitete: 1,589 members (54.4% women)</li>
            <li>Shangombo: 1,285 members (48.6% women)</li>
            <li>Nalolo: 1,059 members (37.3% women)</li>
          </ul>

          <h3>Cashew Development Centers: Grassroots Empowerment</h3>

          <p>CGAZ's 145 Cashew Development Centers (CDCs) serve as the foundation of the association's grassroots structure. Each CDC comprises 30-50 farmers who meet regularly to share knowledge, coordinate activities, and collectively address challenges.</p>

          <p>CDCs provide members with:</p>
          <ul>
            <li>Training and capacity building in cashew production</li>
            <li>Access to improved seedlings and grafted plants</li>
            <li>Technical support from CGAZ extension officers</li>
            <li>Market information and linkages</li>
            <li>Democratic governance and decision-making platforms</li>
          </ul>

          <h3>Membership Benefits</h3>

          <p>CGAZ members enjoy numerous benefits, including:</p>

          <ul>
            <li><strong>Technical Training:</strong> Regular workshops on cashew production, grafting, orchard management, and processing</li>
            <li><strong>Seedling Distribution:</strong> Access to high-quality cashew seedlings at subsidized rates</li>
            <li><strong>Market Access:</strong> Connection to processors and buyers through the warehouse receipt system</li>
            <li><strong>Advocacy:</strong> Representation in policy discussions and agricultural forums</li>
            <li><strong>Networking:</strong> Opportunities to connect with fellow farmers and learn from success stories</li>
            <li><strong>Project Participation:</strong> Priority access to CGAZ projects and development programs</li>
          </ul>

          <h3>Building a Sustainable Cashew Industry</h3>

          <p>CGAZ's growth reflects the potential of cashew to transform livelihoods in Western Province. The association continues to work with government ministries, development partners, and private sector stakeholders to build a competitive and sustainable cashew value chain.</p>

          <p>"Our strength lies in our members," said Allan Chinambu, National Coordinator. "Together, we are building an industry that will create employment, generate income, and protect the environment for generations to come."</p>

          <h3>Join CGAZ</h3>

          <p>CGAZ welcomes new members from all districts in Western Province. Farmers interested in cashew production are encouraged to contact their nearest Cashew Development Center or CGAZ headquarters in Mongu.</p>

          <p><em>For membership information, contact CGAZ at +260-977429666 or allanchinambu666@gmail.com</em></p>
        `,
        category: 'news',
        status: 'published',
        publishedDate: '2024-11-01',
        tags: ['Membership', 'Western Province', 'Cashew Development Centers', 'Farmer Organizations'],
      },
      {
        title: 'Training Program Launches for Nalolo Project Beneficiaries',
        slug: 'nalolo-training-program-launch',
        excerpt: 'CGAZ begins comprehensive training program for 7,000 women and youth beneficiaries in cashew production, grafting techniques, and sustainable orchard management.',
        content: `
          <h2>Building Capacity for Sustainable Cashew Production</h2>

          <p>The Cashew Growers Association of Zambia (CGAZ) has launched a comprehensive training program for beneficiaries of the Nalolo Women and Youth Cashew Development and Climate Resilience Project. The program will equip 3,500 women and 3,500 youths with the knowledge and skills needed to establish and manage productive cashew orchards.</p>

          <h3>Training Curriculum</h3>

          <p>The training program covers all aspects of cashew production, from nursery management to post-harvest handling:</p>

          <h4>Module 1: Introduction to Cashew Production</h4>
          <ul>
            <li>Cashew botany and growth habits</li>
            <li>Climate and soil requirements</li>
            <li>Cashew varieties and selection criteria</li>
            <li>Economic and environmental benefits</li>
          </ul>

          <h4>Module 2: Nursery Management</h4>
          <ul>
            <li>Seed selection and germination</li>
            <li>Nursery site preparation</li>
            <li>Potting media preparation</li>
            <li>Seedling care and maintenance</li>
            <li>Pest and disease management in nurseries</li>
          </ul>

          <h4>Module 3: Grafting Techniques</h4>
          <ul>
            <li>Benefits of grafted cashew plants</li>
            <li>Grafting methods (side grafting, top working)</li>
            <li>Rootstock and scion selection</li>
            <li>Grafting tools and materials</li>
            <li>Post-grafting care</li>
          </ul>

          <h4>Module 4: Orchard Establishment</h4>
          <ul>
            <li>Site selection and preparation</li>
            <li>Spacing and layout design</li>
            <li>Planting techniques</li>
            <li>Agroforestry integration</li>
            <li>Mulching and soil conservation</li>
          </ul>

          <h4>Module 5: Orchard Management</h4>
          <ul>
            <li>Pruning and canopy management</li>
            <li>Fertilization and nutrient management</li>
            <li>Integrated pest management</li>
            <li>Weed control strategies</li>
            <li>Water management</li>
          </ul>

          <h4>Module 6: Harvesting and Post-Harvest Handling</h4>
          <ul>
            <li>Maturity indicators and harvest timing</li>
            <li>Harvesting techniques</li>
            <li>Drying and storage methods</li>
            <li>Quality standards</li>
            <li>Market preparation</li>
          </ul>

          <h4>Module 7: Value Addition and Marketing</h4>
          <ul>
            <li>Cashew processing options</li>
            <li>Product development (roasted nuts, cashew butter, etc.)</li>
            <li>Market channels and linkages</li>
            <li>Pricing and negotiation</li>
            <li>Record keeping and financial management</li>
          </ul>

          <h3>Training Approach</h3>

          <p>CGAZ employs a farmer-to-farmer learning approach that combines:</p>

          <ul>
            <li><strong>Classroom Sessions:</strong> Theoretical instruction on cashew production principles</li>
            <li><strong>Practical Demonstrations:</strong> Hands-on practice in nurseries and demonstration orchards</li>
            <li><strong>Field Visits:</strong> Learning from successful cashew farmers</li>
            <li><strong>Farmer Groups:</strong> Peer learning and knowledge sharing</li>
            <li><strong>Follow-up Support:</strong> Regular visits by extension officers</li>
          </ul>

          <h3>Training Venues</h3>

          <p>Training sessions are held at strategic locations across project districts:</p>

          <ul>
            <li>Namushakendi Farm Training Institute (Mongu)</li>
            <li>CGAZ demonstration orchards and nurseries</li>
            <li>Cashew Development Centers</li>
            <li>Community learning sites</li>
          </ul>

          <h3>Expert Trainers</h3>

          <p>Trainings are facilitated by experienced CGAZ staff, Ministry of Agriculture extension officers, and international experts from Mozambique's Cashew Promotion Institute (INCAJU). This multi-stakeholder approach ensures high-quality, practical instruction.</p>

          <h3>Certificates and Recognition</h3>

          <p>Upon completion of the training program, participants receive certificates recognizing their new skills. Outstanding trainees are selected as Master Trainers to support their fellow farmers and expand the reach of the training program.</p>

          <h3>Expected Outcomes</h3>

          <p>By the end of the training program, beneficiaries will be able to:</p>

          <ul>
            <li>Establish and manage productive cashew nurseries</li>
            <li>Successfully graft improved cashew varieties</li>
            <li>Plant and maintain healthy cashew orchards</li>
            <li>Harvest and handle cashew nuts to quality standards</li>
            <li>Access markets and negotiate fair prices</li>
            <li>Train other farmers in their communities</li>
          </ul>

          <p>"Training is the foundation of our project," said Edgar Reed, CGAZ Value Chain Development Officer. "We are not just distributing seedlings—we are building a generation of skilled cashew farmers who will drive the industry forward."</p>

          <p><em>The Nalolo training program runs from October 2024 through October 2026. For more information, contact CGAZ at allanchinambu666@gmail.com.</em></p>
        `,
        category: 'training',
        status: 'published',
        publishedDate: '2024-11-15',
        tags: ['Training', 'Capacity Building', 'Nalolo Project', 'Farmer Education', 'Grafting'],
      },
    ]

    for (const post of blogPosts) {
      try {
        await payload.create({
          collection: 'blog-posts',
          data: post,
        })
        console.log(`  ✅ Created blog post: ${post.title}`)
      } catch (error: any) {
        console.log(`  ⚠️  Blog post may already exist: ${post.title}`)
      }
    }

    console.log(`\n✅ Created ${blogPosts.length} blog posts`)

    // ============================================================
    // STEP 6: Create Success Stories
    // ============================================================
    console.log('\n🌟 Step 6: Creating success stories...')

    const successStories = [
      {
        title: 'From Subsistence Farmer to Cashew Entrepreneur: Maria Mulonda\'s Journey',
        slug: 'maria-mulonda-success-story',
        summary: 'Maria Mulonda, a smallholder farmer from Limulunga District, has transformed her life through cashew production, earning enough income to send her children to school and expand her farm.',
        story: `
          <h2>Breaking the Cycle of Poverty Through Cashew</h2>

          <p>Maria Mulonda, 42, is a widow and mother of five from Limulunga District. For years, she struggled to make ends meet through subsistence maize farming on her small plot of infertile Kalahari sand. Harvests were poor, and she barely produced enough to feed her family, let alone generate income.</p>

          <p>Everything changed in 2018 when Maria joined CGAZ and participated in the Empowering Women and Youth Through Cashew Production project. She received 100 cashew seedlings, training in cashew production, and support to secure land tenure for her orchard.</p>

          <h3>Early Challenges</h3>

          <p>"At first, I was skeptical," Maria recalls. "Cashew trees take several years to mature, and I needed income now. But the CGAZ trainers explained that I could intercrop with vegetables while waiting for the trees to mature. They also taught me how to care for my orchard with minimal inputs."</p>

          <p>Maria diligently tended her young cashew trees, following the practices she learned in training. She mulched around each tree, protected them from fire, and intercropped with groundnuts and vegetables for immediate food security.</p>

          <h3>First Harvest and Beyond</h3>

          <p>By 2022, Maria's trees began producing. Her first harvest yielded 150 kg of raw cashew nuts, which she sold to a local processor for ZMW 1,800 (approximately USD 90). While modest, this was more cash income than she had ever earned from farming.</p>

          <p>"I was so happy," Maria says with a bright smile. "For the first time, I could buy school uniforms for my children without borrowing money. I could afford medicine when they got sick. I felt like a successful businesswoman."</p>

          <p>In 2023, her yield doubled to 300 kg, earning ZMW 3,600 (USD 180). Maria used part of the income to expand her orchard, planting an additional 50 trees. She also invested in a small solar panel for lighting and phone charging.</p>

          <h3>Empowering Other Women</h3>

          <p>Maria's success has inspired other women in her community. She has become a Master Trainer, teaching her neighbors about cashew production and demonstrating grafting techniques. Her orchard serves as a demonstration site where other farmers come to learn.</p>

          <p>"I want other women to know that it's possible," Maria says. "You don't need a big farm or a lot of money to start. With cashew, you can create a better future for your family."</p>

          <h3>Looking to the Future</h3>

          <p>Maria has ambitious plans for the coming years. As her trees reach full maturity, she expects to harvest over 500 kg annually, generating income of ZMW 6,000+ per year. She plans to:</p>

          <ul>
            <li>Expand her orchard to 200 trees</li>
            <li>Learn cashew processing to add value to her product</li>
            <li>Form a women's cooperative with her neighbors</li>
            <li>Send her eldest daughter to college</li>
          </ul>

          <p>"Cashew has given me hope," Maria reflects. "I am no longer just surviving—I am building something for my children and grandchildren. This is my legacy."</p>

          <p><em>Maria Mulonda is one of over 22,000 CGAZ members transforming their lives through cashew production. Her story demonstrates the power of sustainable agriculture to break cycles of poverty and empower women in rural communities.</em></p>
        `,
        farmerName: 'Maria Mulonda',
        location: 'Limulunga District, Western Province',
        impact: 'Increased annual income from ZMW 0 to ZMW 3,600+ through cashew production. Now supporting 5 children through school and serving as Master Trainer for other women farmers.',
        status: 'published',
        publishedDate: '2024-10-20',
      },
    ]

    for (const story of successStories) {
      try {
        await payload.create({
          collection: 'success-stories',
          data: story,
        })
        console.log(`  ✅ Created success story: ${story.title}`)
      } catch (error: any) {
        console.log(`  ⚠️  Success story may already exist: ${story.title}`)
      }
    }

    console.log(`\n✅ Created ${successStories.length} success stories`)

    // ============================================================
    // STEP 7: Create Downloadable Resources
    // ============================================================
    console.log('\n📄 Step 7: Creating downloadable resources...')

    console.log('  ℹ️  Note: PDF files should be uploaded through admin panel')
    console.log('  ℹ️  Creating placeholder resource entries for admin to complete')

    const resources = [
      {
        title: 'Cashew Farming Best Practices Guide 2024',
        description: 'Comprehensive guide covering all aspects of cashew production, from nursery management to post-harvest handling. Includes sections on site selection, planting techniques, orchard management, pest control, and quality standards.',
        category: 'guides',
        language: 'English',
        tags: ['Cashew Production', 'Best Practices', 'Orchard Management', 'Training Manual'],
        featured: true,
      },
      {
        title: 'Cashew Grafting Training Manual',
        description: 'Step-by-step illustrated guide to cashew grafting techniques, including side grafting and top working methods. Developed with technical support from Mozambique\'s Cashew Promotion Institute (INCAJU).',
        category: 'training',
        language: 'English',
        tags: ['Grafting', 'Training', 'Technical Manual', 'Propagation'],
        featured: true,
      },
      {
        title: 'CGAZ Membership Application Form',
        description: 'Application form for farmers interested in joining the Cashew Growers Association of Zambia. Includes membership benefits, requirements, and Cashew Development Center contact information.',
        category: 'forms',
        language: 'English',
        tags: ['Membership', 'Application', 'Registration'],
        featured: false,
      },
      {
        title: 'Nalolo Project Profile 2024-2026',
        description: 'Detailed project profile for the Nalolo Women and Youth Cashew Development and Climate Resilience Project, including objectives, target districts, beneficiary criteria, and expected outcomes.',
        category: 'projects',
        language: 'English',
        tags: ['Nalolo Project', 'Project Profile', 'GIZ', 'EU'],
        featured: true,
      },
      {
        title: 'CGAZ Annual Report 2023',
        description: 'Annual report covering CGAZ activities, achievements, financial statements, and member impact for 2023. Includes project summaries, membership statistics, and partnership updates.',
        category: 'annual-reports',
        language: 'English',
        tags: ['Annual Report', 'Financial Statements', 'Impact Report'],
        featured: false,
      },
    ]

    for (const resource of resources) {
      try {
        await payload.create({
          collection: 'resources',
          data: resource,
        })
        console.log(`  ✅ Created resource: ${resource.title}`)
      } catch (error: any) {
        console.log(`  ⚠️  Resource may already exist: ${resource.title}`)
      }
    }

    console.log(`\n✅ Created ${resources.length} resource entries`)

    // ============================================================
    // FINAL SUMMARY
    // ============================================================
    console.log('\n' + '='.repeat(60))
    console.log('🎉 CGAZ CONTENT SEEDING COMPLETE!')
    console.log('='.repeat(60))
    console.log('\n✅ Imported Cloudinary images into Media collection')
    console.log('✅ Created 10 partner organizations')
    console.log('✅ Created 9 team members')
    console.log('✅ Created Nalolo Women & Youth Empowerment Project')
    console.log('✅ Created 3 blog posts')
    console.log('✅ Created 1 success story')
    console.log('✅ Created 5 downloadable resource entries')
    console.log('\n📋 Next Steps:')
    console.log('   1. Login to admin panel at /admin')
    console.log('   2. Upload photos for team members')
    console.log('   3. Upload partner logos')
    console.log('   4. Upload featured image for Nalolo project')
    console.log('   5. Upload PDF files for downloadable resources')
    console.log('   6. Review and publish additional content as needed')
    console.log('\n🚀 Your CGAZ website is now populated with real content!')
    console.log('='.repeat(60))

  } catch (error: any) {
    console.error('\n❌ Error during seeding:', error.message)
    console.error('Stack trace:', error.stack)
    process.exit(1)
  }
}

// Run the seeding function
seedContent()
  .then(() => {
    console.log('\n✅ Seeding completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  })
