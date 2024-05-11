import Profile from "../models/Profile.js"

const adminController = {
    // GET /admin/profiles
    getAllProfiles: async (req, res) => {
      try {
        const allProfiles = await Profile.find({}).select('-__v');
        if (allProfiles.length === 0) {
          return res.status(404).json({ message: 'No profiles found' });
        }
        res.status(200).json({ profiles: allProfiles });
      } catch (err) {
        console.error('Error fetching profiles:', err);
        res.status(500).json({ error: 'Could not fetch profiles' });
      }
    },
  
    // GET /admin/profiles/:userId
    getProfileById: async (req, res) => {
      const userId = req.params.userId;
      try {
        const profile = await Profile.findOne({user: userId}).select('-__v');
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ profile });
      } catch (err) {
        console.error('Error fetching profile by ID:', err);
        res.status(500).json({ error: 'Could not fetch profile' });
      }
    },
  
    // PUT /admin/profiles/:userId
    updateProfile: async (req, res) => {
      const userId = req.params.userId;
      try {
    
        // Check if the profile already exists for the user
        let profile = await Profile.findOne({user: userId}).select('-__v');

    
        if (profile) {
          // Profile exists, update it
          if(req.body.name){
            profile.name = req.body.name;
          }
          if(req.body.bio){
            profile.bio = req.body.bio;
          }
          if(req.body.photo){
            profile.photoUrl = req.body.photoUrl;
          }
          if(req.body.phone){
            profile.phone = req.body.phone;
          }
          if(req.body.isPublic){
            profile.isPublic = req.body.isPublic;
          }
          await profile.save();
          return res.status(201).json({ message: 'Profile updated successfully', profile });
        } else {
          return res.status(201).json({ message: 'Profile created successfully', profile });
        }
      } catch (err) {
        console.error('Error creating or updating profile:', err);
        return res.status(500).json({ error: 'Could not create or update profile' });
      }
    }
  };
  
  export default adminController;
  