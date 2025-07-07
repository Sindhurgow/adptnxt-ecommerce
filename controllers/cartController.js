const cartModel = require('../models/cartModel');

exports.getCart = (req, res) => {
  const db = req.app.locals.db;
  cartModel.getCartByUser(db, req.user.id, (err, items) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch cart' });
    res.json(items);
  });
};

exports.addItem = (req, res) => {
  const db = req.app.locals.db;
  const { productId, quantity } = req.body;
  cartModel.addToCart(db, req.user.id, productId, quantity, (err) => {
    if (err) return res.status(400).json({ message: 'Failed to add to cart' });
    res.status(201).json({ message: 'Added to cart' });
  });
};

exports.updateItem = (req, res) => {
  const db = req.app.locals.db;
  const { quantity } = req.body;
  cartModel.updateCartItem(db, req.user.id, req.params.productId, quantity, (err) => {
    if (err) return res.status(400).json({ message: 'Failed to update cart' });
    res.json({ message: 'Cart updated' });
  });
};

exports.removeItem = (req, res) => {
  const db = req.app.locals.db;
  cartModel.removeCartItem(db, req.user.id, req.params.productId, (err) => {
    if (err) return res.status(400).json({ message: 'Failed to remove item' });
    res.json({ message: 'Item removed' });
  });
};