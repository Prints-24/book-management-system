import db from "../utils/dbUtils.js";

class Borrow {
  static add(borrowData, callback) {
    const { user_id, book_id } = borrowData;
    const borrow_date = new Date();
    const due_date = new Date(borrow_date);
    due_date.setDate(due_date.getDate() + 14);
    const return_date = null;

    db.run(
      `INSERT INTO borrows (user_id, book_id, borrow_date, due_date, return_date) VALUES (?, ?, ?, ?, ?)`,
      [
        user_id,
        book_id,
        borrow_date.toISOString(),
        due_date.toISOString(),
        return_date,
      ],
      function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null, this.lastID); // Return the last inserted ID
        }
      }
    );
  }

  static isBookBorrowed(book_id, callback) {
    db.get(
      `SELECT * FROM borrows WHERE book_id = ? AND return_date IS NULL`,
      [book_id],
      (err, row) => {
        if (err) {
          callback(err);
        } else {
          callback(null, row);
        }
      }
    );
  }

  static returnBook(user_id, borrowId, callback) {
    const returnDate = new Date().toISOString();
    db.run(
      `UPDATE borrows SET return_date = ? WHERE id = ? AND user_id = ? AND return_date IS NULL`,
      [returnDate, borrowId, user_id],
      function (err) {
        if (err) {
          callback(err);
        } else if (this.changes === 0) {
          callback(
            new Error(
              "Book not borrowed"
            )
          );
        } else {
          callback(null, borrowId);
        }
      }
    );
  }

  static renewBook(user_id, borrowId, callback) {
    db.get(
      `SELECT due_date FROM borrows WHERE id = ? AND user_id = ? AND return_date IS NULL`,
      [borrowId, user_id],
      (err, row) => {
        if (err) {
          callback(err);
        } else if (!row) {
          callback(
            new Error(
              "Book not borrowed"
            )
          );
        } else {
          const currentDueDate = new Date(row.due_date);
          const newDueDate = new Date(currentDueDate);
          newDueDate.setDate(newDueDate.getDate() + 7); // Extend the due date by 7 days

          db.run(
            `UPDATE borrows SET due_date = ? WHERE id = ? AND user_id = ? AND return_date IS NULL`,
            [newDueDate.toISOString(), borrowId, user_id],
            function (err) {
              if (err) {
                callback(err);
              } else if (this.changes === 0) {
                callback(
                  new Error(
                    "Book not borrowed"
                  )
                );
              } else {
                callback(null, borrowId);
              }
            }
          );
        }
      }
    );
  }
}

export default Borrow;
