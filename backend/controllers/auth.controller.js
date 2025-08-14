import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, avatar, bio, dateOfBirth, location } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const existingUsername = await User.findOne({ username: username.trim() });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hash,
      avatar,
      bio,
      dateOfBirth,
      location
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        dateOfBirth: user.dateOfBirth,
        location: user.location
      }
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        dateOfBirth: user.dateOfBirth,
        location: user.location
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};
