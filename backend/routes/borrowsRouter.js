import express from "express";
import Borrow from "../models/borrowModel.js";

const router = express.Router();

// Borrow a book
router.post("/add", (req, res) => {
  const { user_id, book_id } = req.body;
  // Check if the book is already borrowed
  Borrow.isBookBorrowed(book_id, (err, row) => {
    if (err) {
      res.status(500).json({ error: "Failed to borrow book", message: err.message });
    } else if (row) {
      res.status(400).json({ error: "Book is already borrowed", message: err.message });
    } else {
        // If not already borrowed, proceed with borrowing
        Borrow.add(
          {
            user_id,
            book_id,
          },
          (err, borrowId) => {
            if (err) {
              res.status(500).json({ error: "Failed to borrow book", message: err.message });
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
  Borrow.returnBook(borrowId, (err, borrowId) => {
    if (err) {
      res.status(500).json({ error: "Failed to return book", message: err.message });
    } else {
      res.json({
        message: "Book returned successfully",
        borrowId,
      });
    }
  });
});

// Renew a book
router.post("/renew/:id", (req, res) => {
  const borrowId = req.params.id;
  Borrow.renewBook(borrowId, (err, borrowId) => {
    if (err) {
      res.status(500).json({ error: "Failed to renew book", message: err.message });
    } else {
      res.json({
        message: "Book renewed successfully",
        borrowId,
      });
    }
  });
});
export default router;
