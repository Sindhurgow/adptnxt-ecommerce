const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.get('/', productController.getAll);
router.post('/', auth, role('admin'), productController.create);
router.put('/:id', auth, role('admin'), productController.update);
router.delete('/:id', auth, role('admin'), productController.remove);

module.exports = router;