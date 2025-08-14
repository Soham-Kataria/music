import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/847/847969.png"
  },

  bio: { type: String, maxlength: 200 }, // short description
  dateOfBirth: { type: Date }, // DOB for age-based features
  location: { type: String }, // city/country
}, { timestamps: true });

export default mongoose.model('User', userSchema);
