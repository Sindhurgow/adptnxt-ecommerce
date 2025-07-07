module.exports = {
  createOrder: (db, userId, items, total, callback) => {
    db.run(
      `INSERT INTO orders (userId, total) VALUES (?, ?)`,
      [userId, total],
      function (err) {
        if (err) return callback(err);
        const orderId = this.lastID;
        const stmt = db.prepare(`INSERT INTO order_items (orderId, productId, quantity) VALUES (?, ?, ?)`);
        items.forEach(item => {
          stmt.run(orderId, item.productId, item.quantity);
        });
        stmt.finalize();
        callback(null, { orderId });
      }
    );
  },
  getOrdersByUser: (db, userId, callback) => {
    db.all(`SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC`, [userId], callback);
  },
  getOrderItems: (db, orderId, callback) => {
    db.all(`SELECT * FROM order_items WHERE orderId = ?`, [orderId], callback);
  }
};
