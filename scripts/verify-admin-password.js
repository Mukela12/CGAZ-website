const bcrypt = require('bcrypt');

const storedHash = '$2b$10$NDykdfiNAt.oka10CKonie4ndE9akfnmTwvfEOLL7FbnCKx8aj1qi';
const passwordToTest = 'CGAZ2026Admin!';

async function verifyPassword() {
  try {
    const isMatch = await bcrypt.compare(passwordToTest, storedHash);
    console.log('Password verification result:', isMatch);

    if (!isMatch) {
      console.log('\n❌ Password does NOT match the stored hash');
      console.log('Need to reset the password');

      // Generate new hash for the correct password
      const newHash = await bcrypt.hash(passwordToTest, 10);
      console.log('\nNew hash for password "CGAZ2026Admin!":');
      console.log(newHash);
      console.log('\nRun this SQL to update:');
      console.log(`UPDATE users SET hash = '${newHash}', salt = NULL WHERE email = 'allanchinambu666@gmail.com';`);
    } else {
      console.log('\n✅ Password matches! Login should work.');
      console.log('The issue might be elsewhere (API route, Payload config, etc.)');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

verifyPassword();
