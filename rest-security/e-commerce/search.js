import express from 'express';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();
app.use(express.json());
app.use(mongoSanitize());

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

app.get('/users/search', async (req, res) => {
  try {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Valid username required' });
    }

    if (username.startsWith('$')) {
      return res.status(400).json({ error: 'Invalid username format' });
    }

    const users = await User.find({ username: username }).select('-password');

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default app;