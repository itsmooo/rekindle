const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
console.log('Loading routes...');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const predictRoutes = require('./routes/predict');
const profileRoutes = require('./routes/profile');
const consultationRoutes = require('./routes/consultation');
const { authenticateToken } = require('./middleware/auth');
console.log('All routes loaded successfully');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Rekindle server is running!'
  });
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
console.log('Registering routes...');
app.use('/api/auth', authRoutes);
console.log('✓ Auth routes registered');
app.use('/api/admin', authenticateToken, adminRoutes);
console.log('✓ Admin routes registered');
app.use('/api/predict', predictRoutes);
console.log('✓ Predict routes registered');
app.use('/api/profile', profileRoutes);
console.log('✓ Profile routes registered');
app.use('/api/consultation', consultationRoutes);
console.log('✓ Consultation routes registered');

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Mohamed12:1234@cluster0.4bijvlo.mongodb.net/mern-test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
