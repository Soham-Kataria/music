import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  bio?: string;
  dateOfBirth?: Date;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/128/847/847969.png',
    },
    bio: { type: String, maxlength: 200 },
    dateOfBirth: { type: Date },
    location: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
