/**
 * Reset an admin user's password directly via Payload's local API.
 *
 * Usage:
 *   EMAIL=you@example.com NEW_PASSWORD='NewPass123!' tsx scripts/reset-admin-password.ts
 *
 * Uses DATABASE_URL from .env — point that at whichever database you need
 * to reset against (local or production). Payload hashes the new password
 * automatically via its auth strategy.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function main() {
  const email = process.env.EMAIL
  const newPassword = process.env.NEW_PASSWORD

  if (!email || !newPassword) {
    console.error('❌ EMAIL and NEW_PASSWORD environment variables are required')
    console.error("   Example: EMAIL=you@example.com NEW_PASSWORD='NewPass123!' tsx scripts/reset-admin-password.ts")
    process.exit(1)
  }

  console.log(`🔧 Resetting password for ${email}...`)
  const payload = await getPayload({ config: await config })

  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
  })

  if (docs.length === 0) {
    console.error(`❌ No user found with email ${email}`)
    process.exit(1)
  }

  const user = docs[0]
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { password: newPassword },
  })

  console.log(`✅ Password updated for ${email} (role: ${user.role ?? 'unknown'})`)
  console.log(`   You can now log in at /admin with the new password.`)
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Failed to reset password:', err)
  process.exit(1)
})
