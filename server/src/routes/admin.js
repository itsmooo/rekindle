const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const { authorizeAdmin } = require('../middleware/auth');
const router = express.Router();

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
