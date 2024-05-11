// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
// import config from '../config/config.js';
import User from '../models/User.js';
import BlackListedToken from "../models/BlackListedToken.js"
import bcrypt from 'bcryptjs';
import crypto from 'crypto'


const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

    // Check if the token is blacklisted
    try {
      const isTokenBlacklisted = await BlackListedToken.exists({ token: token.replace('Bearer ', '') });
      if (isTokenBlacklisted) {
        return res.status(401).json({ message: 'Token is expired/blacklisted' });
      }
    } catch (err) {
      console.error('Error checking blacklisted token:', err);
      return res.status(500).json({ message: 'Server Error' });
    }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY);
    req.user = decoded; // Assuming your JWT payload contains user information directly
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username }); // Assuming username is unique
    console.log(
      "usererere", user
    );

    if (!user || user.role !== 'admin') {
      console.log("User is not an admin");
      return res.status(403).json({ message: 'Admin access required' });
    }

    next();
  } catch (err) {
    console.error("Error in isAdmin middleware:", err);
    return res.status(500).json({ message: 'Server Error' });
  }
};


const generateApiKey = () => {
  return crypto.randomBytes(20).toString('hex'); // Generate a random API key
}


const jwtAuthMiddleware = async (req, res, next) => {
  console.log(1);
  const { username, password } = req.body;
  console.log(1);

  try {
  console.log(1);

    const user = await User.findOne({ username }); // Assuming username is unique
    console.log(1, user);

    if (user) {
  console.log(1);

      // Compare hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Generate API key
        const apiKey = generateApiKey();
        user.apiKey = apiKey;
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ username: user.username, apiKey }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log("token --------->", token);
        // Set response headers
        res.set('X-API-Key', apiKey);
        res.set('Authorization', `Bearer ${token}`);
        console.log("res ---------_>", res);

        req.token = token;
        console.log("req.token", req.token);

        return next();
      }
    }

    res.status(401).json({ message: 'Unauthorized' });
  } catch (error) {
    console.error('Error in JWT authentication middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

// module.exports = { authenticate, isAdmin };
export default {
    authenticate,
    isAdmin,
    jwtAuthMiddleware
  };
