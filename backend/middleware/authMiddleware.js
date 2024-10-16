const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token

  if (!token) {
    console.error("No token provided in headers.");
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    console.log("Token received:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      console.error("User not found for decoded token ID:", decoded.id);
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;
    console.log("User authenticated:", user);

    next(); // Pass control to the next middleware
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authMiddleware;
