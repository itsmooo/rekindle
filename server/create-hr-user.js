const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Mohamed12:1234@cluster0.4bijvlo.mongodb.net/mern-test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

async function createHRUser() {
  try {
    console.log('\n=== Creating HR User ===\n');
    
    // Check if HR user already exists
    const existingHR = await User.findOne({ email: 'hr@rekindle.com' });
    
    if (existingHR) {
      console.log('HR user already exists:', existingHR.email);
      console.log('HR user role:', existingHR.role);
      return;
    }

    // Create HR user
    const hashedPassword = await bcrypt.hash('hr123', 10);
    
    const hrUser = new User({
      name: 'HR Manager',
      email: 'hr@rekindle.com',
      password: hashedPassword,
      role: 'hr',
      bio: 'HR Manager',
      company: 'Rekindle',
      position: 'HR Manager'
    });

    await hrUser.save();
    console.log('✅ HR user created successfully!');
    console.log('Email: hr@rekindle.com');
    console.log('Password: hr123');
    console.log('Role: hr');
    console.log('\n=== HR User Permissions ===');
    console.log('✅ Can view all users and their burnout data');
    console.log('✅ Can view statistics and reports');
    console.log('✅ Can manage consultations (view, update, delete)');
    console.log('❌ Cannot create, edit, or delete users');
    console.log('❌ Cannot make burnout predictions');
    
  } catch (error) {
    console.error('Error creating HR user:', error);
  } finally {
    mongoose.connection.close();
  }
}

createHRUser(); 