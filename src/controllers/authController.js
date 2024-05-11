// controllers/authController.js
// const bcrypt = require('bcryptjs');
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import apiResponseHandler from "../utils/responseHandler.js"
import BlackListedToken from "../models/BlackListedToken.js"



const authController = {
    // POST /auth/register
    register: async (req, res) => {
      try {
        const { username, password, email, socialId, role } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

        // Save the user to the database using Mongoose
        const newUser = new User({ 
          username, 
          password: hashedPassword, 
          email,
          socialId,
          role
        });
        await newUser.save();

        return apiResponseHandler(res, 201, 'User created successfully', newUser);
    } catch (error) {
        console.error(error);
        return apiResponseHandler(res, 500, 'Internal server error');
    }
      
    },
  
    // POST /auth/login
    login: async (req, res) => {
      const { token } = req;
      console.log("token", token);
      try{
        return apiResponseHandler(res, 200, 'User login successful', token);
      }catch (error) {
        console.error(error);
        return apiResponseHandler(res, 500, 'Internal server error');
    }
    },
  
    // POST /auth/social-login
    socialLogin: (req, res) => {
      // Logic to handle social login
      res.status(200).json({ message: 'Social login successful' });
    },
  
    // POST /auth/logout
    logout: async (req, res) => {
      // Logic to handle user logout
      const token = req.header('Authorization');

      if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
      }
    
      try {
        // Check if the token is already blacklisted
        const isTokenBlacklisted = await BlackListedToken.exists({ token: token.replace('Bearer ', '') });
        if (isTokenBlacklisted) {
          return res.status(200).json({ message: 'User logout successful' });
        }
      
        // Add the token to the blacklist
        const blackListedToken = new BlackListedToken({ token: token.replace('Bearer ', '') });
        await blackListedToken.save();
      
        res.status(200).json({ message: 'User logout successful' });
      } catch (err) {
        console.error('Error logging out and blacklisting token:', err);
        res.status(500).json({ message: 'Server Error' });
      }
        }
      };
  
  export default authController;
  