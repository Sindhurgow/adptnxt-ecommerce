const orderModel = require('../models/orderModel');
const cartModel = require('../models/cartModel');

exports.createOrder = (req, res) => {
  const db = req.app.locals.db;
  cartModel.getCartByUser(db, req.user.id, (err, items) => {
    if (err || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const formattedItems = items.map(item => ({ productId: item.productId, quantity: item.quantity }));

    orderModel.createOrder(db, req.user.id, formattedItems, total, (err, result) => {
      if (err) return res.status(500).json({ message: 'Order failed' });

      cartModel.clearCart(db, req.user.id, () => {
        res.status(201).json({ message: 'Order placed', orderId: result.orderId });
      });
    });
  });
};

exports.getOrders = (req, res) => {
  const db = req.app.locals.db;
  orderModel.getOrdersByUser(db, req.user.id, (err, orders) => {
    if (err) return res.status(500).json({ message: 'Failed to get orders' });
    res.json(orders);
  });
};