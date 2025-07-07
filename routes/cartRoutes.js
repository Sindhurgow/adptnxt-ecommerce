const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, cartController.getCart);
router.post('/', auth, cartController.addItem);
router.put('/:productId', auth, cartController.updateItem);
router.delete('/:productId', auth, cartController.removeItem);

module.exports = router;