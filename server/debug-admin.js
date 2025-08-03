const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Mohamed12:1234@cluster0.4bijvlo.mongodb.net/mern-test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

async function debugAdmin() {
  try {
    console.log('\n=== Debugging Admin User ===\n');
    
    // Find the admin user by email
    const adminUser = await User.findOne({ email: 'admin@gmail.com' });
    
    if (!adminUser) {
      console.log('❌ Admin user not found in database!');
      console.log('Creating admin user...');
      
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      const newAdmin = new User({
        name: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@gmail.com');
      console.log('Password: admin123');
      console.log('Role: admin');
    } else {
      console.log('✅ Admin user found in database:');
      console.log('ID:', adminUser._id);
      console.log('Name:', adminUser.name);
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Created:', adminUser.createdAt);
      
      // Generate a test token
      const testToken = jwt.sign(
        { userId: adminUser._id, role: adminUser.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );
      
      console.log('\n=== Test JWT Token ===');
      console.log('Token:', testToken);
      
      // Decode the token
      const decoded = jwt.verify(testToken, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Decoded token:', decoded);
      
      // Check if the user ID matches
      if (decoded.userId === adminUser._id.toString()) {
        console.log('✅ Token user ID matches database user ID');
      } else {
        console.log('❌ Token user ID does not match database user ID');
        console.log('Token user ID:', decoded.userId);
        console.log('Database user ID:', adminUser._id.toString());
      }
    }
    
    // Check all users
    console.log('\n=== All Users in Database ===');
    const allUsers = await User.find({}, { password: 0 });
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
  } catch (error) {
    console.error('Error debugging admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

debugAdmin(); 