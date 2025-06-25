const jwt = require('jsonwebtoken');

console.log('🔍 JWT Token Decoder');
console.log('This script will help decode your token to see what user ID it contains');
console.log('\n📋 Instructions:');
console.log('1. Open your browser developer tools (F12)');
console.log('2. Go to Application/Storage tab');
console.log('3. Click on Local Storage');
console.log('4. Find the "token" entry');
console.log('5. Copy the token value');
console.log('6. Run: node debug-token.js YOUR_TOKEN_HERE');
console.log('\nExample: node debug-token.js eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

const token = process.argv[2];

if (!token) {
  console.log('\n❌ No token provided!');
  console.log('Usage: node debug-token.js YOUR_TOKEN_HERE');
  process.exit(1);
}

try {
  console.log('\n🔓 Decoding token...');
  
  // Decode without verification first to see the payload
  const decoded = jwt.decode(token);
  console.log('📄 Token payload:', decoded);
  
  // Try to verify with the secret
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('✅ Token is valid');
    console.log('👤 User ID in token:', verified.id);
    console.log('📧 Email in token:', verified.email);
    console.log('🏷️ Role in token:', verified.role);
    
    // Check if this user ID exists in our user list
    const userIds = [
      '65bf843bf961db37cf80c8d9', '65bf84d3f961db37cf80c8e1', '65bf8be1f961db37cf80c8ec',
      '65bf8be3f961db37cf80c8ef', '65bf8ce8f961db37cf80c8f8', '65bf9248329765c4cad4c171',
      '65bf9a4b5dd109fe257f3533', '65d0b0ccf45d66356ac81089', '65d24952686a3386f5519827',
      '65d24af721a6125953f95738', '65d24b8ae77c0b1fda2925af', '65d24bdb4eb3ca137d5593e8',
      '65d252b800bbaa0c00aa7bde', '65d2532300bbaa0c00aa7bea', '66bbcece94e52210b3cf25e8',
      '66d96a30d06a204a99b87e64', '66d96ae3d06a204a99b87e74', '6842134b055c39c0ecc37958',
      '684213c458e60e30d246852b', '6842159258e60e30d2468532', '6842182a58e60e30d246853c',
      '6842196f58e60e30d246854a', '68421e45a35141e31a92b37d', '684eec97176cf053bd6dd1c2',
      '684eefc5176cf053bd6dd1c9', '684ef21e62417975c93b7ff5', '684ef365a96d7c86538d20ff',
      '68585026ff87255f3fac006a', '685ae040a23b645c7a0bfaf5'
    ];
    
    if (userIds.includes(verified.id)) {
      console.log('✅ User ID exists in database!');
    } else {
      console.log('❌ User ID NOT found in database!');
      console.log('💡 This is why you\'re getting "User not found" error');
      console.log('🔧 You need to login again with a valid account');
    }
    
  } catch (verifyError) {
    console.log('❌ Token verification failed:', verifyError.message);
    console.log('💡 Token might be expired or using wrong secret key');
  }
  
} catch (error) {
  console.log('❌ Error decoding token:', error.message);
  console.log('💡 Token might be malformed');
}

console.log('\n🔧 Solutions:');
console.log('1. Login again with one of these accounts:');
console.log('   - mohamed@gmail.com');
console.log('   - farah@gmail.com');
console.log('   - admin@gmail.com');
console.log('2. Or register a new account');
console.log('3. Clear localStorage and login fresh'); 