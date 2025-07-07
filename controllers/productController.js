const productModel = require('../models/productModel');

exports.getAll = (req, res) => {
  const db = req.app.locals.db;
  productModel.getAllProducts(db, (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch products' });
    res.json(rows);
  });
};

exports.create = (req, res) => {
  const db = req.app.locals.db;
  productModel.createProduct(db, req.body, (err) => {
    if (err) return res.status(400).json({ message: 'Failed to create product' });
    res.status(201).json({ message: 'Product created' });
  });
};

exports.update = (req, res) => {
  const db = req.app.locals.db;
  productModel.updateProduct(db, req.params.id, req.body, (err) => {
    if (err) return res.status(400).json({ message: 'Failed to update product' });
    res.json({ message: 'Product updated' });
  });
};

exports.remove = (req, res) => {
  const db = req.app.locals.db;
  productModel.deleteProduct(db, req.params.id, (err) => {
    if (err) return res.status(400).json({ message: 'Failed to delete product' });
    res.json({ message: 'Product deleted' });
  });
};