import express from 'express';
import User from '../models/userModel.js';
import { hashPassword, verifyToken } from '../utils/authUtils.js';

const router = express.Router();

// Middleware to verify token for protected routes
router.use((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const user = verifyToken(token);  
  if (user && user.role === "librarian") {
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized", message: err.message });
  }
});

// Register a new user
router.post('/add', (req, res) => {
  const { username, password, role } = req.body;
  User.add(
    { username, password: hashPassword(password), role },
    (err, userId) => {
      if (err) {
        res.status(500).json({ error: 'Failed to add user', message:err.message });
      } else {
        res.json({ message: 'User added successfully', userId });
      }
    }
  );
});

// Get all users
router.get('/', (req, res) => {
  User.getUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch users', message:err.message });
    } else {
      res.json(users);
    }
  });
});

// Get user by username
router.get('/:username', (req, res) => {
  User.getByUsername(req.params.username, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve user', message:err.message });
    } else {
      res.json(user);
    }
  });
});

// Update user
router.put('/update/:id', (req, res) => {
  User.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update user', message:err.message });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  });
});

// Delete user
router.delete('/delete/:id', (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete user', message:err.message });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});

export default router;
