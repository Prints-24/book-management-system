import db from '../utils/db.js';

db.serialize(() => {
  // Create the users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    }
  });

  // Create the books table
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      isbn TEXT,
      publisher_id INTEGER,
      publication_year INTEGER,
      genre_id INTEGER,
      language TEXT,
      pages INTEGER,
      description TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating books table:', err.message);
    }
  });

  // Create the book_authors table
  db.run(`
    CREATE TABLE IF NOT EXISTS book_authors (
      book_id INTEGER,
      author_id INTEGER,
      PRIMARY KEY (book_id, author_id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating book_authors table:', err.message);
    }
  });

  // Create the authors table
  db.run(`
    CREATE TABLE IF NOT EXISTS authors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      bio TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating authors table:', err.message);
    }
  });

  // Create the publishers table
  db.run(`
    CREATE TABLE IF NOT EXISTS publishers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      address TEXT,
      website TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating publishers table:', err.message);
    }
  });

  // Create the genres table
  db.run(`
    CREATE TABLE IF NOT EXISTS genres (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating genres table:', err.message);
    }
  });

  // Create the borrows table
  db.run(`
    CREATE TABLE IF NOT EXISTS borrows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      book_id INTEGER,
      borrow_date TEXT,
      return_date TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating borrows table:', err.message);
    }
  });
});

export default db;
