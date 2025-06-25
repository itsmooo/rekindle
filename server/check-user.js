const mongoose = require('mongoose');
const User = require('./src/models/User');

const mongoUri = 'mongodb+srv://Mohamed12:1234@cluster0.4bijvlo.mongodb.net/mern-test?retryWrites=true&w=majority';
const userIdToCheck = '685c306fb66758a41e0eefc4';

console.log('🔍 Checking if user exists:', userIdToCheck);

mongoose.connect(mongoUri)
.then(async () => {
  console.log('✅ Connected to MongoDB');
  
  try {
    const user = await User.findById(userIdToCheck);
    
    if (user) {
      console.log('✅ USER FOUND!');
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Role:', user.role);
      console.log('Created:', user.createdAt);
    } else {
      console.log('❌ USER NOT FOUND');
      console.log('This user ID does not exist in the database');
      console.log('You need to login with a valid account or register a new one');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  mongoose.connection.close();
})
.catch(err => {
  console.error('Connection error:', err);
}); 