const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, orderController.createOrder);
router.get('/', auth, orderController.getOrders);

module.exports = router;