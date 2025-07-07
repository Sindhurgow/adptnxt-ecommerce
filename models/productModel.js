module.exports = {
  getAllProducts: (db, callback) => {
    db.all(`SELECT * FROM products`, [], callback);
  },
  getProductById: (db, id, callback) => {
    db.get(`SELECT * FROM products WHERE id = ?`, [id], callback);
  },
  createProduct: (db, product, callback) => {
    const { name, description, price, category } = product;
    db.run(
      `INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)`,
      [name, description, price, category],
      callback
    );
  },
  updateProduct: (db, id, product, callback) => {
    const { name, description, price, category } = product;
    db.run(
      `UPDATE products SET name = ?, description = ?, price = ?, category = ? WHERE id = ?`,
      [name, description, price, category, id],
      callback
    );
  },
  deleteProduct: (db, id, callback) => {
    db.run(`DELETE FROM products WHERE id = ?`, [id], callback);
  }
};