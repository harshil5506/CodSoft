const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeCartItem, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/').get(getCart);
router.route('/add').post(addToCart);
router.route('/update/:itemId').put(updateCartItem);
router.route('/remove/:itemId').delete(removeCartItem);
router.route('/clear').delete(clearCart);

module.exports = router;
