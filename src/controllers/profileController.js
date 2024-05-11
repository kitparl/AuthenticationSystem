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
  
    // GET /profiles/:name
    getProfileByName : async (req, res) => {
      try {
        const profileName = req.params.name;
        // similar to like wise operation in sql
        const regexName = new RegExp(profileName, 'i'); // 'i' flag for case-insensitive matching
        const profile = await Profile.findOne({ name: { $regex: regexName } });
    
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }
    
        // Logic to handle the found profile
        res.status(200).json({ message: `Get profile by name: ${profileName}`, profile });
      } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: 'Server Error' });
      }
    },
  
    // PUT /profiles/:userId/privacy
    setProfilePrivacy: async (req, res) => {
    
      if(!req.body.hasOwnProperty('isPublic')){
        return res.status(404).json({ error: 'Privacy setting is undefined in body' });
    }
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
        profile.isPublic = req.body.isPublic;
        await profile.save();
        return res.status(200).json({ message: 'Profile updated successfully', profile });
      } else {
        return res.status(404).json({ error: 'Profile not created yet' });
      }
    } catch (err) {
      console.error('Error creating or updating profile:', err);
      return res.status(500).json({ error: 'Could not create or update profile' });
    }
    }
  };
  
  export default profileController;
  