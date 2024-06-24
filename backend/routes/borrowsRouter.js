import express from "express";
import Borrow from "../models/borrowModel.js";
import db from "../utils/dbUtils.js";

const router = express.Router();

// Borrow a book
router.post("/add", (req, res) => {
  const { user_id, book_id } = req.body;
  const borrow_date = new Date().toISOString();
  const return_date = null;

  // Check if the book is already borrowed
  db.get(
    `SELECT * FROM borrows WHERE book_id = ? AND return_date IS NULL`,
    [book_id],
    (err, row) => {
      if (err) {
        console.error("Failed to check if book is borrowed:", err.message);
        res.status(500).json({ error: "Failed to borrow book" });
      } else if (row) {
        res.status(400).json({ error: "Book is already borrowed" });
      } else {
        // If not already borrowed, proceed with borrowing
        Borrow.add(
          { user_id, book_id, borrow_date, return_date },
          (err, id) => {
            if (err) {
              console.error("Failed to borrow book:", err.message);
              res.status(500).json({ error: "Failed to borrow book" });
            } else {
              res.json({ message: "Book borrowed successfully", borrowId: id });
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
  console.log(`Request to return book with ID: ${borrowId}`);
  Borrow.returnBook(borrowId, (err, id) => {
    if (err) {
      console.error("Failed to return book:", err.message);
      res.status(500).json({ error: "Failed to return book" });
    } else {
      res.json({
        message: "Book returned successfully",
        borrowId: id,
      });
    }
  });
});

// Renew a book
router.post("/renew/:id", (req, res) => {
  const borrowId = req.params.id;
  const newReturnDate = new Date();
  newReturnDate.setDate(newReturnDate.getDate() + 7); // Example: extend the return date by 7 days

  db.run(
    `UPDATE borrows SET return_date = ? WHERE id = ? AND return_date IS NULL`,
    [newReturnDate.toISOString(), borrowId],
    function (err) {
      if (err) {
        console.error("Failed to renew book:", err.message);
        res.status(500).json({ error: "Failed to renew book" });
      } else if (this.changes === 0) {
        res
          .status(400)
          .json({ error: "Book is already returned or does not exist" });
      } else {
        res.json({
          message: "Book renewed successfully",
          borrowId: parseInt(borrowId),
        });
      }
    }
  );
});

export default router;
