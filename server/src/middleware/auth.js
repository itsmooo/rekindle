const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Auth middleware - Token present:', token ? 'Yes' : 'No');

  if (!token) {
    console.log('Auth middleware - No token provided');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Auth middleware - Token decoded successfully:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Auth middleware - Token verification failed:', error.message);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'hr')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin/HR privileges required.' });
  }
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
};
