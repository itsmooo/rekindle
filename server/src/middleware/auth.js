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

const authorizeAdmin = (req, res, next) => {
  console.log('=== AUTHORIZE ADMIN DEBUG ===');
  console.log('AuthorizeAdmin - User from req:', req.user);
  console.log('AuthorizeAdmin - User role:', req.user?.role);
  console.log('AuthorizeAdmin - User ID:', req.user?.userId);
  
  if (req.user && (req.user.role === 'admin' || req.user.role === 'hr')) {
    console.log('AuthorizeAdmin - Access granted ✅');
    next();
  } else {
    console.log('AuthorizeAdmin - Access denied ❌');
    console.log('AuthorizeAdmin - User role:', req.user?.role);
    console.log('AuthorizeAdmin - Expected roles: admin or hr');
    res.status(403).json({ message: 'Access denied. Admin/HR privileges required.' });
  }
};

module.exports = {
  authenticateToken,
  authorizeAdmin,
};
