const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const { authorizeAdmin } = require('../middleware/auth');
const router = express.Router();

// Log all admin route requests
router.use((req, res, next) => {
  console.log(`Admin Route: ${req.method} ${req.path}`);
  next();
});

// Get all users with their burnout predictions
router.get('/users', authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find(
      { role: 'user' },
      { password: 0 } // Exclude password field
    ).sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post('/users', authorizeAdmin, async (req, res) => {
  try {
    const { name, email, password, role, bio, location, company, position } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'user',
      bio: bio || '',
      location: location || '',
      company: company || '',
      position: position || '',
    });

    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user details with burnout history
router.get('/users/:userId', authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a user
router.put('/users/:userId', authorizeAdmin, async (req, res) => {
  console.log('PUT /users/:userId called with userId:', req.params.userId);
  console.log('Request body:', req.body);
  
  try {
    const { name, email, role, bio, location, company, position, password } = req.body;
    
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('User not found with ID:', req.params.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found user:', user.name);

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (bio !== undefined) user.bio = bio;
    if (location !== undefined) user.location = location;
    if (company !== undefined) user.company = company;
    if (position !== undefined) user.position = position;
    if (password) user.password = password;

    await user.save();
    console.log('User updated successfully');

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a user
router.delete('/users/:userId', authorizeAdmin, async (req, res) => {
  console.log('DELETE /users/:userId called with userId:', req.params.userId);
  
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('User not found with ID:', req.params.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Found user to delete:', user.name);
    await User.findByIdAndDelete(req.params.userId);
    console.log('User deleted successfully');
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get burnout statistics
router.get('/statistics', authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    
    const stats = {
      totalUsers: users.length,
      highRiskCount: 0,
      mediumRiskCount: 0,
      lowRiskCount: 0,
      averageBurnoutScore: 0,
      recentPredictions: [],
    };

    let totalScore = 0;
    let predictionCount = 0;

    users.forEach(user => {
      if (user.burnoutPredictions && user.burnoutPredictions.length > 0) {
        const latestPrediction = user.burnoutPredictions[user.burnoutPredictions.length - 1];
        
        // Count risk levels
        if (latestPrediction.prediction >= 70) {
          stats.highRiskCount++;
        } else if (latestPrediction.prediction >= 40) {
          stats.mediumRiskCount++;
        } else {
          stats.lowRiskCount++;
        }

        // Calculate average
        totalScore += latestPrediction.prediction;
        predictionCount++;

        // Add to recent predictions
        stats.recentPredictions.push({
          userId: user._id,
          userName: user.name,
          prediction: latestPrediction.prediction,
          date: latestPrediction.date,
        });
      }
    });

    // Calculate average burnout score
    stats.averageBurnoutScore = predictionCount > 0 
      ? (totalScore / predictionCount).toFixed(2) 
      : 0;

    // Sort recent predictions by date
    stats.recentPredictions.sort((a, b) => b.date - a.date);
    // Limit to last 10 predictions
    stats.recentPredictions = stats.recentPredictions.slice(0, 10);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Make burnout prediction for a user
router.post('/predict/:userId', authorizeAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Make prediction using Python service
    const response = await axios.post('http://localhost:9000/predict', {
      designation: req.body.designation,
      resource_allocation: req.body.resource_allocation,
      mental_fatigue_score: req.body.mental_fatigue_score,
      company_type: req.body.company_type,
      wfh_setup_available: req.body.wfh_setup_available,
      gender: req.body.gender,
    });

    // Save prediction to user's history
    user.burnoutPredictions.push({
      prediction: response.data.prediction,
      designation: req.body.designation,
      resourceAllocation: req.body.resource_allocation,
      mentalFatigueScore: req.body.mental_fatigue_score,
      companyType: req.body.company_type,
      wfhSetupAvailable: req.body.wfh_setup_available,
      gender: req.body.gender,
    });

    await user.save();

    res.json({
      prediction: response.data.prediction,
      userId: user._id,
      userName: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
