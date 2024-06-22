import express from 'express';
import Borrow from '../models/borrowModel.js';

const router = express.Router();

// Borrow a book
router.post('/add', (req, res) => {
  const { userId, bookId } = req.body;
  const borrowDate = new Date();
  const returnDate = null;
  Borrow.add({ user_id: userId, book_id: bookId, borrow_date: borrowDate, return_date: returnDate }, (err, id) => {
    if (err) {
      console.error('Failed to borrow book:', err.message);
      res.status(500).json({ error: 'Failed to borrow book' });
    } else {
      res.json({ message: 'Book borrowed successfully', borrowId: id });
    }
  });
});

// Return a book
router.post('/return/:id', (req, res) => {
  Borrow.returnBook(req.params.id, (err) => {
    if (err) {
      console.error('Failed to return book:', err.message);
      res.status(500).json({ error: 'Failed to return book' });
    } else {
      res.json({ message: 'Book returned successfully' });
    }
  });
});

export default router;
