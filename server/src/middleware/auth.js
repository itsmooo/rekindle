const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('=== AUTH MIDDLEWARE DEBUG ===');
  console.log('Auth middleware - Token present:', token ? 'Yes' : 'No');
  console.log('Auth middleware - Full auth header:', authHeader);
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);

  if (!token) {
    console.log('Auth middleware - No token provided');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    console.log('Auth middleware - Token decoded successfully:', decoded);
    console.log('Auth middleware - User ID from token:', decoded.userId);
    console.log('Auth middleware - Role from token:', decoded.role);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('Auth middleware - Token verification failed:', error.message);
    console.log('Auth middleware - Error details:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Full admin privileges - can do everything
const authorizeAdmin = (req, res, next) => {
  console.log('=== AUTHORIZE ADMIN DEBUG ===');
  console.log('AuthorizeAdmin - User from req:', req.user);
  console.log('AuthorizeAdmin - User role:', req.user?.role);
  console.log('AuthorizeAdmin - User ID:', req.user?.userId);
  
  if (req.user && req.user.role === 'admin') {
    console.log('AuthorizeAdmin - Access granted ✅');
    next();
  } else {
    console.log('AuthorizeAdmin - Access denied ❌');
    console.log('AuthorizeAdmin - User role:', req.user?.role);
    console.log('AuthorizeAdmin - Expected role: admin');
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

// HR privileges - can view data and manage consultations, but limited CRUD
const authorizeHR = (req, res, next) => {
  console.log('=== AUTHORIZE HR DEBUG ===');
  console.log('AuthorizeHR - User from req:', req.user);
  console.log('AuthorizeHR - User role:', req.user?.role);
  console.log('AuthorizeHR - User ID:', req.user?.userId);
  
  if (req.user && (req.user.role === 'admin' || req.user.role === 'hr')) {
    console.log('AuthorizeHR - Access granted ✅');
    next();
  } else {
    console.log('AuthorizeHR - Access denied ❌');
    console.log('AuthorizeHR - User role:', req.user?.role);
    console.log('AuthorizeHR - Expected roles: admin or hr');
    res.status(403).json({ message: 'Access denied. HR/Admin privileges required.' });
  }
};

// Read-only access for HR users
const authorizeReadOnly = (req, res, next) => {
  console.log('=== AUTHORIZE READ ONLY DEBUG ===');
  console.log('AuthorizeReadOnly - User from req:', req.user);
  console.log('AuthorizeReadOnly - User role:', req.user?.role);
  console.log('AuthorizeReadOnly - User ID:', req.user?.userId);
  
  if (req.user && (req.user.role === 'admin' || req.user.role === 'hr')) {
    console.log('AuthorizeReadOnly - Access granted ✅');
    next();
  } else {
    console.log('AuthorizeReadOnly - Access denied ❌');
    console.log('AuthorizeReadOnly - User role:', req.user?.role);
    console.log('AuthorizeReadOnly - Expected roles: admin or hr');
    res.status(403).json({ message: 'Access denied. HR/Admin privileges required.' });
  }
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
  authorizeHR,
  authorizeReadOnly,
};
