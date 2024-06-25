import express from "express";
import Borrow from "../models/borrowModel.js";

const router = express.Router();

// Borrow a book
router.post("/add", (req, res) => {
  const { user_id, book_id } = req.body;
  // Check if the book is already borrowed
  Borrow.isBookBorrowed(book_id, (err, row) => {
    if (err) {
      res.status(500).json({ error: "Failed to borrow book" });
    } else if (row) {
      res.status(400).json({ error: "Book is already borrowed" });
    } else {
        // If not already borrowed, proceed with borrowing
        Borrow.add(
          {
            user_id,
            book_id,
          },
          (err, borrowId) => {
            if (err) {
              res.status(500).json({ error: "Failed to borrow book" });
            } else {
              res.json({ message: "Book borrowed successfully", borrowId });
            }
          }
        );
      }
    }
  );
});

// Return a book
router.post("/return/:id", (req, res) => {
  const borrowId = req.params.id;
  const { user_id } = req.body;
  Borrow.returnBook(user_id, borrowId, (err) => {
    if (err) {
      res.status(500).json(err.message);
    } else {
      res.json({
        message: "Book returned successfully"
      });
    }
  });
});

// Renew a book
router.post("/renew/:id", (req, res) => {
  const borrowId = req.params.id;
  const { user_id } = req.body;
  Borrow.renewBook(user_id, borrowId, (err) => {
    if (err) {
      res.status(500).json(err.message);
    } else {
      res.json({
        message: "Book renewed successfully"
      });
    }
  });
});
export default router;
