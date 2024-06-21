import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;

const db = new (verbose().Database)('./backend/db/database.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

export default db;
