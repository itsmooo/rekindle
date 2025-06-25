const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Rekindle Server...');
console.log('📁 Current directory:', __dirname);

// Check if required directories exist
const uploadsDir = path.join(__dirname, 'uploads');
const profilesDir = path.join(__dirname, 'uploads', 'profiles');

if (!fs.existsSync(uploadsDir)) {
  console.log('📁 Creating uploads directory...');
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(profilesDir)) {
  console.log('📁 Creating profiles directory...');
  fs.mkdirSync(profilesDir, { recursive: true });
}

// Import routes
try {
  const authRoutes = require('./src/routes/auth');
  const adminRoutes = require('./src/routes/admin');
  const predictRoutes = require('./src/routes/predict');
  const profileRoutes = require('./src/routes/profile');
  const { authenticateToken } = require('./src/middleware/auth');
  
  console.log('✅ All routes imported successfully');

  const app = express();
  const PORT = process.env.PORT || 8000;

  // Middleware
  app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
  }));
  app.use(express.json());

  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  console.log('📂 Static files served from:', path.join(__dirname, 'uploads'));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      message: 'Rekindle server is running!'
    });
  });

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', authenticateToken, adminRoutes);
  app.use('/api/predict', predictRoutes);
  app.use('/api/profile', profileRoutes);

  console.log('🛣️  Routes configured:');
  console.log('   - GET  /health');
  console.log('   - POST /api/auth/register');
  console.log('   - POST /api/auth/login');
  console.log('   - GET  /api/profile');
  console.log('   - PUT  /api/profile');
  console.log('   - POST /api/profile/upload-avatar');
  console.log('   - GET  /api/profile/statistics');

  // Connect to MongoDB
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Mohamed12:1234@cluster0.4bijvlo.mongodb.net/mern-test?retryWrites=true&w=majority';
  
  console.log('🔌 Connecting to MongoDB...');
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log('🎉 Server is running successfully!');
      console.log(`📡 Server URL: http://localhost:${PORT}`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log(`📤 Upload Test: http://localhost:${PORT}/api/profile/upload-avatar`);
      console.log('\n✨ Ready to accept requests!');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Make sure MongoDB is running or check your connection string');
    process.exit(1);
  });

} catch (error) {
  console.error('❌ Error starting server:', error.message);
  console.log('💡 Check if all dependencies are installed: npm install');
  process.exit(1);
} 