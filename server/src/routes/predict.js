const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Make and save burnout prediction
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Get prediction from ML service
    const response = await axios.post('http://localhost:9000/predict', {
      designation: req.body.designation,
      resource_allocation: req.body.resource_allocation,
      mental_fatigue_score: req.body.mental_fatigue_score,
      company_type: req.body.company_type,
      wfh_setup_available: req.body.wfh_setup_available,
      gender: req.body.gender,
    });

    // Save prediction to user's profile
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add prediction to user's burnoutPredictions array
    user.burnoutPredictions.push({
      prediction: response.data.prediction,
      date: new Date(),
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
      message: 'Prediction saved successfully'
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ 
      message: error.response?.data?.error || error.message || 'Error making prediction'
    });
  }
});

// Get user's prediction history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.burnoutPredictions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
