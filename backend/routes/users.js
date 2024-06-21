import express from 'express';
import User from '../models/user.js';
import { verifyToken } from '../utils/auth.js';

const router = express.Router();

// Get user by username
router.get('/:username', (req, res) => {
  User.getByUsername(req.params.username, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    } else {
      res.json(user);
    }
  });
});

// Middleware to verify token for protected routes
router.use((req, res, next) => {
  const token = req.headers['authorization'];
  const user = verifyToken(token);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

export default router;