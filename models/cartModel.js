module.exports = {
  getCartByUser: (db, userId, callback) => {
    db.all(
      `SELECT cart.id, productId, products.name, quantity, products.price FROM cart JOIN products ON cart.productId = products.id WHERE cart.userId = ?`,
      [userId],
      callback
    );
  },
  addToCart: (db, userId, productId, quantity, callback) => {
    db.run(
      `INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)`,
      [userId, productId, quantity],
      callback
    );
  },
  updateCartItem: (db, userId, productId, quantity, callback) => {
    db.run(
      `UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ?`,
      [quantity, userId, productId],
      callback
    );
  },
  removeCartItem: (db, userId, productId, callback) => {
    db.run(
      `DELETE FROM cart WHERE userId = ? AND productId = ?`,
      [userId, productId],
      callback
    );
  },
  clearCart: (db, userId, callback) => {
    db.run(`DELETE FROM cart WHERE userId = ?`, [userId], callback);
  }
};