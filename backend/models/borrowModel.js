import db from "../utils/dbUtils.js";

class Borrow {
  static add(borrow, callback) {
    const { userId, bookId, borrowDate, returnDate } = borrow;
    db.run(
      `INSERT INTO borrows (user_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)`,
      [userId, bookId, borrowDate, returnDate],
      function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null, this.lastID);
        }
      }
    );
  }

  static returnBook(id, callback) {
    db.run(
      `UPDATE borrows SET return_date = ? WHERE id = ?`,
      [new Date().toISOString(), id],
      callback
    );
  }
}

export default Borrow;
