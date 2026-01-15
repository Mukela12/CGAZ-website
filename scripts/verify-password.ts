import bcrypt from 'bcrypt'

const storedHash = '$2b$10$NDykdfiNAt.oka10CKonie4ndE9akfnmTwvfEOLL7FbnCKx8aj1qi'
const password = 'CGAZ2026Admin!'

async function verifyPassword() {
  try {
    const isValid = await bcrypt.compare(password, storedHash)

    if (isValid) {
      console.log('✅ Password is CORRECT - hash matches')
      console.log(`Password: ${password}`)
      console.log('You should be able to login with these credentials.')
    } else {
      console.log('❌ Password is INCORRECT - hash does not match')
      console.log(`Tried password: ${password}`)
      console.log('The password needs to be reset.')
    }
  } catch (error) {
    console.error('Error verifying password:', error)
  }
}

verifyPassword()
