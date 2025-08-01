const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  companySize: {
    type: String,
    required: true,
    enum: ['1-10', '11-50', '51-200', '201-500', '501+'],
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'scheduled', 'completed', 'cancelled'],
    default: 'pending',
  },
  adminNotes: {
    type: String,
    default: '',
  },
  scheduledDate: {
    type: Date,
    default: null,
  },
  contactedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Consultation', consultationSchema); 