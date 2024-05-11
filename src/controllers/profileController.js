// controllers/profileController.js
// controllers/profileController.js
import Profile from '../models/Profile.js';
import User from '../models/User.js'

// Controller method to create or update a profile
const profileController = {

  createOrUpdateProfile : async (req, res) => {
    console.log("req", req);
    const { name, bio, photoUrl, phone, isPublic } = req.body;
    const username = req.user.username; // Assuming you have the authenticated user's username in the request
    
    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        // Handle case where user is not found
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the profile already exists for the user
      let profile = await Profile.findOne({ user: user._id });
  
      if (profile) {
        // Profile exists, update it
        profile.name = name;
        profile.bio = bio;
        profile.photoUrl = photoUrl;
        profile.phone = phone;
        profile.isPublic = isPublic;
        await profile.save();
        return res.status(200).json({ message: 'Profile updated successfully', profile });
      } else {
        // Profile doesn't exist, create a new one
        profile = new Profile({
          user: user._id,
          name,
          bio,
          photoUrl,
          phone,
          isPublic,
        });
        await profile.save();
        return res.status(201).json({ message: 'Profile created successfully', profile });
      }
    } catch (err) {
      console.error('Error creating or updating profile:', err);
      return res.status(500).json({ error: 'Could not create or update profile' });
    }
  },

    // GET /profiles/public
    getPublicProfiles : async (req, res) => {
      try {
        // Fetch public profiles from the database
        const publicProfiles = await Profile.find({ isPublic: true }).select('-__v');
        res.status(200).json({ profiles: publicProfiles });
      } catch (err) {
        console.error('Error fetching public profiles:', err);
        res.status(500).json({ error: 'Could not fetch public profiles' });
      }
    },
  
    // GET /profiles/:userId
    getProfileById: (req, res) => {
      const userId = req.params.userId;
      // Logic to fetch profile by userId from the database
      res.status(200).json({ message: `Get profile by ID: ${userId}` });
    },
  
    // PUT /profiles/:userId
    updateProfile: (req, res) => {
      const userId = req.params.userId;
      // Logic to update profile by userId in the database
      res.status(200).json({ message: `Update profile by ID: ${userId}` });
    },
  
    // PUT /profiles/:userId/privacy
    setProfilePrivacy: (req, res) => {
      const userId = req.params.userId;
      // Logic to set profile privacy by userId in the database
      res.status(200).json({ message: `Set privacy for profile ID: ${userId}` });
    }
  };
  
  export default profileController;
  