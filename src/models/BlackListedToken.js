import mongoose from 'mongoose';

const blackListedTokenSchema = new mongoose.Schema({
    token: {
      type: String,
      required: true,
      maxlength: 1000
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  });
  
  const BlackListedToken = mongoose.model('BlackListedToken', blackListedTokenSchema);
  export default BlackListedToken;