const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const predictRoutes = require('./routes/predict');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);
app.use('/api/predict', predictRoutes);

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
