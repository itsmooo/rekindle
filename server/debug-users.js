const mongoose = require('mongoose');
const User = require('./src/models/User');

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Mohamed12:1234@cluster0.4bijvlo.mongodb.net/mern-test?retryWrites=true&w=majority';

console.log('🔍 Connecting to MongoDB to check users...');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  
  try {
    // Get all users
    const users = await User.find({}).select('-password');
    console.log('\n📊 Users in database:');
    console.log('Total users:', users.length);
    
    if (users.length === 0) {
      console.log('❌ No users found in database!');
      console.log('💡 You need to register a user first');
    } else {
      users.forEach((user, index) => {
        console.log(`\n👤 User ${index + 1}:`);
        console.log('  ID:', user._id.toString());
        console.log('  Name:', user.name);
        console.log('  Email:', user.email);
        console.log('  Role:', user.role);
        console.log('  Created:', user.createdAt);
      });
    }
    
    // Check if we can create a test user
    console.log('\n🔧 Would you like to create a test user? (Uncomment the code below)');
    
    /*
    // Uncomment this section to create a test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123', // This will be hashed automatically
      role: 'user'
    });
    
    await testUser.save();
    console.log('✅ Test user created:', testUser.email);
    console.log('🔑 Test user ID:', testUser._id.toString());
    */
    
  } catch (error) {
    console.error('❌ Error checking users:', error);
  }
  
  mongoose.connection.close();
  console.log('\n👋 Database connection closed');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}); 