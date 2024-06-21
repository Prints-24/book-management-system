import express from 'express';
import Book from '../models/book.js';

const router = express.Router();

// Add a new book
router.post('/add', (req, res) => {
  Book.add(req.body, (err, id) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add book' });
    } else {
      res.json({ message: 'Book added successfully', bookId: id });
    }
  });
});

// Get all books
router.get('/', (req, res) => {
  Book.getAll((err, books) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve books' });
    } else {
      res.json(books);
    }
  });
});

// Get book by ID
router.get('/:id', (req, res) => {
  Book.getById(req.params.id, (err, book) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve book' });
    } else {
      res.json(book);
    }
  });
});

// Update a book
router.put('/update/:id', (req, res) => {
  Book.update(req.params.id, req.body, (err, updatedBook) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update book' });
    } else {
      res.json({ message: 'Book updated successfully', book: updatedBook });
    }
  });
});

// Delete a book
router.delete('/delete/:id', (req, res) => {
  Book.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete book' });
    } else {
      res.json({ message: 'Book deleted successfully' });
    }
  });
});

export default router;
