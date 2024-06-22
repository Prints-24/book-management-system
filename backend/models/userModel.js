import db from '../utils/dbUtils.js';

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

  static getByRole(role, callback) {
    db.all('SELECT * FROM users WHERE role = ?', [role], callback);
  }

  static update(id, user, callback) {
    const { username, password, role } = user;
    db.run(
      `UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?`,
      [username, password, role, id],
      function(err) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  }

  static delete(id, callback) {
    db.run(`DELETE FROM users WHERE id = ?`, [id], callback);
  }
}

export default User;
