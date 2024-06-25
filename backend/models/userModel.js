import db from '../utils/dbUtils.js';
import { hashPassword } from '../utils/authUtils.js';

class User {
  static add(user, callback) {
    const { username, password, role } = user;
    db.run(
      `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`,
      [username, password, role],
      function (err) {
        if (err) {
          callback(err);
        } else {
          callback(null, this.lastID);
        }
      }
    );
  }

  static getUsers(callback) {
    db.all(`SELECT * FROM users`, callback);
  }

  static getByUsername(username, callback) {
    db.get(`SELECT * FROM users WHERE username = ?`, [username], callback);
  }

  static update(id, user, callback) {
    const { username, password, role } = user;
    const updateQuery = `UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?`;

    // Check if password needs to be hashed
    if (password) {
      const hashedPassword = hashPassword(password)
      db.run(updateQuery, [username, hashedPassword, role, id], function(err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    } else {
      db.run(updateQuery, [username, password, role, id], function(err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  }

  static delete(id, callback) {
    db.run(`DELETE FROM users WHERE id = ?`, [id], callback);
  }
}

export default User;
