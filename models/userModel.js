module.exports = {
  createUser: (db, user, callback) => {
    const { name, email, password, role } = user;
    db.run(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [name, email, password, role || 'customer'],
      callback
    );
  },
  findUserByEmail: (db, email, callback) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
  },
  findUserById: (db, id, callback) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], callback);
  }
};