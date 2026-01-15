import { getPayload } from 'payload'
import config from '../payload.config'

async function createAdminUser() {
  console.log('🔧 Creating admin user...')

  const payload = await getPayload({ config: await config })

  try {
    // First, try to delete existing user
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'allanchinambu666@gmail.com'
        }
      }
    })

    if (existingUsers.docs.length > 0) {
      console.log('Found existing user, deleting...')
      await payload.delete({
        collection: 'users',
        id: existingUsers.docs[0].id
      })
      console.log('✅ Deleted existing user')
    }

    // Create new admin user
    const newUser = await payload.create({
      collection: 'users',
      data: {
        name: "Allan Ching'ambu",
        email: 'allanchinambu666@gmail.com',
        password: 'CGAZ2026Admin!',
        role: 'admin'
      }
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', newUser.email)
    console.log('👤 Name:', newUser.name)
    console.log('🔑 Password: CGAZ2026Admin!')
    console.log('\nYou can now login at: http://localhost:3001/admin/login')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()
