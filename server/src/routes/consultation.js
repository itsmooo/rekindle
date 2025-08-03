const express = require('express');
const Consultation = require('../models/Consultation');
const { authenticateToken, authorizeHR } = require('../middleware/auth');
const router = express.Router();

// Submit a new consultation request (public - no auth required)
router.post('/submit', async (req, res) => {
  try {
    const { name, company, email, phone, companySize, message } = req.body;

    // Validate required fields
    if (!name || !company || !email || !phone || !companySize || !message) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Create new consultation request
    const consultation = new Consultation({
      name,
      company,
      email,
      phone,
      companySize,
      message,
    });

    await consultation.save();

    res.status(201).json({ 
      message: 'Consultation request submitted successfully',
      consultation 
    });
  } catch (error) {
    console.error('Error submitting consultation:', error);
    res.status(500).json({ 
      message: 'Error submitting consultation request' 
    });
  }
});

// Get all consultations (HR/Admin can view)
router.get('/', authenticateToken, authorizeHR, async (req, res) => {
  try {
    const consultations = await Consultation.find()
      .sort({ createdAt: -1 })
      .populate('contactedBy', 'name email');

    res.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ 
      message: 'Error fetching consultations' 
    });
  }
});

// Get consultation by ID (HR/Admin can view)
router.get('/:id', authenticateToken, authorizeHR, async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('contactedBy', 'name email');

    if (!consultation) {
      return res.status(404).json({ 
        message: 'Consultation not found' 
      });
    }

    res.json(consultation);
  } catch (error) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({ 
      message: 'Error fetching consultation' 
    });
  }
});

// Update consultation status and notes (HR/Admin can manage)
router.put('/:id', authenticateToken, authorizeHR, async (req, res) => {
  try {
    const { status, adminNotes, scheduledDate, contactedBy } = req.body;

    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ 
        message: 'Consultation not found' 
      });
    }

    // Update fields
    if (status) consultation.status = status;
    if (adminNotes !== undefined) consultation.adminNotes = adminNotes;
    if (scheduledDate) consultation.scheduledDate = new Date(scheduledDate);
    if (contactedBy) consultation.contactedBy = contactedBy;

    await consultation.save();

    res.json({ 
      message: 'Consultation updated successfully',
      consultation 
    });
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(500).json({ 
      message: 'Error updating consultation' 
    });
  }
});

// Delete consultation (HR/Admin can delete)
router.delete('/:id', authenticateToken, authorizeHR, async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    
    if (!consultation) {
      return res.status(404).json({ 
        message: 'Consultation not found' 
      });
    }

    res.json({ 
      message: 'Consultation deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ 
      message: 'Error deleting consultation' 
    });
  }
});

module.exports = router; 