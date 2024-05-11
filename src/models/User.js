
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socialId: { type: String }, // For social login (Google, Facebook, etc.)
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  apiKey: {type: String}
});

const User = mongoose.model('User', userSchema);

export default User;
