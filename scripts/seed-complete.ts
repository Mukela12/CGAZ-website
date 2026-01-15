// Load environment variables FIRST
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Now import everything else
import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function seedComplete() {
  console.log('🌱 Starting comprehensive content seeding...\n')

  const payload = await getPayload({ config: await configPromise })

  // ACTUAL Cloudinary images (at root level, not in folder)
  const cloudinaryImages = {
    training: [
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379308/CashewMasterTrainers_MTPGraduates_AtaTrainingSessioninLimulungaDistrict3_qp5iug.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379305/TrainingincashewNurseryManagement10_vjkgne.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379294/TrainingInGraftingTechniquesDuringTheFarmerTrainingWorkshopAtNamushakendeFarmerTrainingInstituteInMongu12_yv0rix.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379300/CashewMasterTrainerduringTrainingingraftingofcashewseedlings9_vpu845.jpg',
    ],
    government: [
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/ParticipantsAtTheNationalCashewConsultativeForumOnTheNationalCashewDevelopmentStrategy_NCDS_OrganisedByCGAZAndTheAgriculturalConsultativeForum_ACF_6_katljk.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379294/AgricultureAndLivestockDeputyMinisterGreyfordMondeBeingBriefedOnTheWesternProvinceCashewDevelopmentInitiativeWhenHeVisitedCGAZPremisesInMongu5_bzb3h8.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379296/FormerRepublicanPresidentH.EEdgar.LunguandGenderMinisterProfessorNandiLuoAdmiresProcessedCashewNutsAtTheCGAZStandDuringTheWomenEmpowermentExhibition34_qifhjq.jpg',
    ],
    processing: [
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379294/WomenWorkingInACashewProcessingFactoryInMongu19_orkqwl.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379297/PromotingSmallScaleCashewprocessing_rvgssn.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379299/Sun-dryingofrawcashews_kfdmyc.jpg',
    ],
    distribution: [
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379298/DistributionOfImprovedCashewPlantingMaterials_gvrekg.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379308/Officiallaunchofthe2025_26cashewseedlingdistributionbyCGAZ22_mhtksl.jpg',
    ],
    nursery: [
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379295/Cashew-Nursery11_ujzxc6.jpg',
      'https://res.cloudinary.com/dvj7ayoot/image/upload/v1768379294/CashewGrowersAssociationOfZambiaNurseryAtSimulumbeResearchStationInMongu15_soa5ks.jpg',
    ],
  }

  try {
    // 1. CREATE PARTNERS
    console.log('\n👥 Creating Partners...')
    const partnersData = [
      {
        name: 'GIZ (German Agency for International Cooperation)',
        slug: 'giz-germany',
        type: 'international-development',
        status: 'active',
        description: 'Supporting agricultural development and farmer capacity building in Zambia',
        website: 'https://www.giz.de',
        country: 'Germany',
        displayOrder: 1,
        featured: true,
      },
      {
        name: 'European Union',
        slug: 'european-union',
        type: 'international-development',
        status: 'active',
        description: 'Funding sustainable agriculture and rural development programs',
        website: 'https://www.europa.eu',
        country: 'Europe',
        displayOrder: 2,
        featured: true,
      },
      {
        name: 'African Development Bank (AfDB)',
        slug: 'afdb',
        type: 'financial',
        status: 'active',
        description: 'Providing financial support for agricultural value chain development',
        website: 'https://www.afdb.org',
        country: 'Africa',
        displayOrder: 3,
        featured: true,
      },
      {
        name: 'Ministry of Agriculture - Zambia',
        slug: 'ministry-agriculture-zambia',
        type: 'government',
        status: 'active',
        description: 'Government partner supporting cashew sector policy and development',
        website: 'https://www.agriculture.gov.zm',
        country: 'Zambia',
        displayOrder: 4,
        featured: true,
      },
      {
        name: 'Agricultural Consultative Forum (ACF)',
        slug: 'acf-zambia',
        type: 'ngo',
        status: 'active',
        description: 'Collaborative partner for policy advocacy and farmer representation',
        country: 'Zambia',
        displayOrder: 5,
        featured: false,
      },
    ]

    for (const partner of partnersData) {
      const created = await payload.create({
        collection: 'partners',
        data: partner,
      })
      console.log(`  ✅ Created partner: ${partner.name}`)
    }

    // 2. CREATE TEAM MEMBERS
    console.log('\n👨‍💼 Creating Team Members...')
    const teamData = [
      {
        name: 'Allan Chinambu',
        position: 'Executive Director',
        department: 'management',
        bio: 'Leading CGAZ with over 15 years of experience in agricultural development and farmer empowerment',
        email: 'allanchinambu666@gmail.com',
        displayOrder: 1,
      },
      {
        name: 'Technical Coordinator',
        position: 'Technical Coordinator',
        department: 'technical',
        bio: 'Overseeing training programs and technical support for cashew farmers',
        displayOrder: 2,
      },
      {
        name: 'Field Operations Manager',
        position: 'Field Operations Manager',
        department: 'field',
        bio: 'Managing on-ground activities across 10 districts',
        displayOrder: 3,
      },
    ]

    for (const member of teamData) {
      const created = await payload.create({
        collection: 'team-members',
        data: member,
      })
      console.log(`  ✅ Created team member: ${member.name}`)
    }

    // 3. CREATE NALOLO PROJECT
    console.log('\n🌳 Creating Nalolo Women & Youth Empowerment Project...')
    const projectData = {
      title: 'Nalolo Women & Youth Empowerment Through Cashew Farming',
      slug: 'nalolo-women-youth-empowerment',
      description: 'Empowering 7,000 women and youth beneficiaries through sustainable cashew farming, tree planting, and income generation in Nalolo District.',
      status: 'active',
      startDate: '2024-10-01',
      endDate: '2026-10-31',
      districts: ['Nalolo'],
      beneficiaries: 7000,
      objectives: [
        { objective: 'Plant 700,000 cashew trees across Nalolo District' },
        { objective: 'Train 7,000 women and youth in cashew farming techniques' },
        { objective: 'Establish 50 demonstration farms for practical learning' },
        { objective: 'Create sustainable income sources for rural communities' },
      ],
      outcomes: [
        { outcome: '700,000 cashew trees planted (Target: 700,000)' },
        { outcome: '7,000 beneficiaries enrolled (Target: 7,000)' },
        { outcome: '50 demonstration farms established' },
      ],
      featuredImage: cloudinaryImages.training[0],
      featured: true,
    }

    const project = await payload.create({
      collection: 'projects',
      data: projectData,
    })
    console.log(`  ✅ Created project: ${projectData.title}`)

    // 4. CREATE BLOG POSTS
    console.log('\n📝 Creating Blog Posts...')
    const blogPosts = [
      {
        title: '700,000 Cashew Trees Planted in Nalolo District',
        slug: '700000-cashew-trees-planted-nalolo',
        excerpt: 'Major milestone achieved in our women and youth empowerment project with 700,000 trees planted across Nalolo District.',
        content: [
          {
            children: [
              {
                text: 'The Cashew Growers Association of Zambia (CGAZ) has successfully achieved a major milestone in the Nalolo Women & Youth Empowerment Project by planting 700,000 cashew trees across Nalolo District. This achievement represents a significant step forward in our mission to transform rural livelihoods through sustainable agriculture.',
              },
            ],
          },
        ],
        category: 'projects',
        status: 'published',
        publishedDate: new Date().toISOString(),
        featuredImage: cloudinaryImages.distribution[0],
        featured: true,
      },
      {
        title: 'Government Officials Visit CGAZ Training Session',
        slug: 'government-officials-visit-training',
        excerpt: 'Agriculture Deputy Minister Greyford Monde visits CGAZ premises to learn about Western Province Cashew Development Initiative.',
        content: [
          {
            children: [
              {
                text: 'CGAZ was honored to host Agriculture and Livestock Deputy Minister Greyford Monde who visited our training facilities in Mongu to be briefed on the Western Province Cashew Development Initiative. The visit highlighted government support for cashew sector development.',
              },
            ],
          },
        ],
        category: 'events',
        status: 'published',
        publishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        featuredImage: cloudinaryImages.government[1],
        featured: true,
      },
      {
        title: 'Master Trainer Program Graduates 50 Farmers',
        slug: 'master-trainer-program-graduates',
        excerpt: 'Cashew Master Trainers complete intensive grafting and nursery management training in Limulunga District.',
        content: [
          {
            children: [
              {
                text: 'CGAZ successfully graduated 50 farmers as Cashew Master Trainers following an intensive training program on grafting techniques and nursery management. These trainers will now cascade knowledge to farmers across Western Province.',
              },
            ],
          },
        ],
        category: 'training',
        status: 'published',
        publishedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        featuredImage: cloudinaryImages.training[0],
        featured: false,
      },
    ]

    for (const post of blogPosts) {
      const created = await payload.create({
        collection: 'blog-posts',
        data: post,
      })
      console.log(`  ✅ Created blog post: ${post.title}`)
    }

    // 5. CREATE SUCCESS STORY
    console.log('\n⭐ Creating Success Story...')
    const successStory = {
      title: 'Women in Nalolo Transform Lives Through Cashew Farming',
      slug: 'women-nalolo-transform-lives',
      farmerName: 'Grace Mwamba and Women Farmers Group',
      location: 'Nalolo District',
      story: [
        {
          children: [
            {
              text: 'Grace Mwamba, a lead farmer in Nalolo District, has transformed her life and her community through cashew farming. Starting with just 50 cashew seedlings in 2024, she has now established a thriving cashew plantation and trained over 100 women in her community on sustainable farming practices.',
            },
          ],
        },
      ],
      impact: 'Increased household income by 200%, trained 100+ women farmers, established community demonstration farm',
      featuredImage: cloudinaryImages.distribution[1],
      featured: true,
      status: 'published',
    }

    const story = await payload.create({
      collection: 'success-stories',
      data: successStory,
    })
    console.log(`  ✅ Created success story: ${successStory.title}`)

    // 6. CREATE MEDIA ITEMS (Import some key images)
    console.log('\n📸 Creating Media Items...')
    const mediaItems = [
      {
        alt: 'Cashew Master Trainers at a training session in Limulunga District',
        caption: 'MTP graduates demonstrating grafting techniques',
        category: 'training',
        cloudinaryUrl: cloudinaryImages.training[0],
      },
      {
        alt: 'Women working in cashew processing factory in Mongu',
        caption: 'Value addition through local processing',
        category: 'processing',
        cloudinaryUrl: cloudinaryImages.processing[0],
      },
      {
        alt: 'National Cashew Consultative Forum participants',
        caption: 'CGAZ and ACF collaborative policy forum',
        category: 'events',
        cloudinaryUrl: cloudinaryImages.government[0],
      },
      {
        alt: 'Distribution of improved cashew planting materials',
        caption: 'Seedling distribution to farmers',
        category: 'farming',
        cloudinaryUrl: cloudinaryImages.distribution[0],
      },
      {
        alt: 'Training in grafting techniques at Namushakende Farm Institute',
        caption: 'Practical farmer training workshop',
        category: 'training',
        cloudinaryUrl: cloudinaryImages.training[2],
      },
    ]

    for (const media of mediaItems) {
      const created = await payload.create({
        collection: 'media',
        data: media,
      })
      console.log(`  ✅ Created media: ${media.alt}`)
    }

    console.log('\n✅ SEEDING COMPLETE!')
    console.log('\n📊 Summary:')
    console.log(`  • ${partnersData.length} partners created`)
    console.log(`  • ${teamData.length} team members created`)
    console.log(`  • 1 project created (Nalolo)`)
    console.log(`  • ${blogPosts.length} blog posts created`)
    console.log(`  • 1 success story created`)
    console.log(`  • ${mediaItems.length} media items created`)
    console.log('\n🌐 Visit http://localhost:3000 to see your content!')

  } catch (error) {
    console.error('\n❌ Error during seeding:', error)
    throw error
  }

  process.exit(0)
}

seedComplete()
