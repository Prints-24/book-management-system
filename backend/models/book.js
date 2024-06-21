import db from '../utils/db.js';
class Book {
  static add(book, callback) {
    const { title, isbn, publisherId, publicationYear, genreId, language, pages, description } = book;
    db.run(
      `INSERT INTO books (title, isbn, publisher_id, publication_year, genre_id, language, pages, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, isbn, publisherId, publicationYear, genreId, language, pages, description],
      function (err) {
        callback(err, this.lastID);
      }
    );
  }

  static getAll(callback) {
    db.all(`SELECT * FROM books`, [], callback);
  }

  static getById(id, callback) {
    db.get(`SELECT * FROM books WHERE id = ?`, [id], callback);
  }

  static update(id, book, callback) {
    const { title, isbn, publisherId, publicationYear, genreId, language, pages, description } = book;
    db.run(
      `UPDATE books SET title = ?, isbn = ?, publisher_id = ?, publication_year = ?, genre_id = ?, language = ?, pages = ?, description = ? WHERE id = ?`,
      [title, isbn, publisherId, publicationYear, genreId, language, pages, description, id],
      callback
    );
  }
  
  static delete(id, callback) {
    db.run(`DELETE FROM books WHERE id = ?`, [id], callback);
  }
}

export default Book;
