import db from "../utils/dbUtils.js";

class Borrow {
  static add(borrowData, callback) {
    const { user_id, book_id, borrow_date, return_date } = borrowData;
    db.run(
      `INSERT INTO borrows (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)`,
      [user_id, book_id, borrow_date, return_date],
      function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null, this.lastID); // Return the last inserted ID
        }
      }
    );
  }

  static returnBook(borrowId, callback) {
    const returnDate = new Date().toISOString();
    db.run(
      `UPDATE borrows SET return_date = ? WHERE id = ? AND return_date IS NULL`,
      [returnDate, borrowId],
      function (err) {
        if (err) {
          callback(err);
        } else if (this.changes === 0) {
          callback(new Error("Book is already returned or does not exist"));
        } else {
          callback(null, borrowId);
        }
      }
    );
  }
  
  
}

export default Borrow;
