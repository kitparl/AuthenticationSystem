// models/Profile.js
import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  bio: { type: String },
  photoUrl: { type: String },
  phone: { type: String },
  isPublic: { type: Boolean, default: true }, // Public or private profile
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile; // Default export

