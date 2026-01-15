const { getPayload } = require('payload')
const config = require('./payload.config')

async function createFirstUser() {
  try {
    // Initialize Payload
    const payload = await getPayload({ config })

    console.log('Creating first admin user...')

    // Create the first admin user
    const user = await payload.create({
      collection: 'users',
      data: {
        name: 'Allan Ching\'ambu',
        email: 'allanchinambu666@gmail.com',
        password: 'CGAZ2026Admin!',
        role: 'admin',
      },
    })

    console.log('✅ First admin user created successfully!')
    console.log('Email:', user.email)
    console.log('Name:', user.name)
    console.log('Role:', user.role)
    console.log('\nYou can now login at: http://localhost:3000/admin/login')
    console.log('Email: allanchinambu666@gmail.com')
    console.log('Password: CGAZ2026Admin!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating first user:', error.message)
    process.exit(1)
  }
}

createFirstUser()
