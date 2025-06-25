const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`Profile route accessed: ${req.method} ${req.path}`);
  console.log('Headers:', req.headers.authorization ? 'Token present' : 'No token');
  next();
});

// Test endpoint (no auth required)
router.get('/test', (req, res) => {
  res.json({ message: 'Profile routes are working!', timestamp: new Date().toISOString() });
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get user profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id; // Handle both field names
    console.log('Profile GET request - User ID from token:', userId);
    console.log('Profile GET request - Full user object:', req.user);
    
    const user = await User.findById(userId).select('-password');
    console.log('User found in database:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found in database for ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('Returning user profile for:', user.email);
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { name, email, bio, location, company, position } = req.body;
    const userId = req.user.userId || req.user.id; // Handle both field names
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (company !== undefined) user.company = company;
    if (position !== undefined) user.position = position;

    await user.save();

    // Return user without password
    const updatedUser = await User.findById(userId).select('-password');
    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload profile picture
router.post('/upload-avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.user.userId || req.user.id; // Handle both field names
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's avatar path
    user.avatar = `/uploads/profiles/${req.file.filename}`;
    await user.save();

    res.json({ 
      message: 'Avatar uploaded successfully',
      avatar: user.avatar 
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user statistics (burnout predictions, etc.)
router.get('/statistics', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id; // Handle both field names
    console.log('Statistics GET request - User ID from token:', userId);
    
    const user = await User.findById(userId);
    console.log('User found for statistics:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found in database for statistics, ID:', userId);
      return res.status(404).json({ error: 'User not found' });
    }

    const stats = {
      totalAssessments: user.burnoutPredictions.length,
      latestScore: user.burnoutPredictions.length > 0 
        ? user.burnoutPredictions[user.burnoutPredictions.length - 1].prediction 
        : null,
      averageScore: user.burnoutPredictions.length > 0 
        ? user.burnoutPredictions.reduce((sum, pred) => sum + pred.prediction, 0) / user.burnoutPredictions.length
        : null,
      assessmentHistory: user.burnoutPredictions.slice(-10) // Last 10 assessments
    };

    console.log('Returning statistics:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 