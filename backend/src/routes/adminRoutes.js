const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getDashboardStats,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  deleteUser,
  createCoupon,
  getAllCoupons,
  deleteCoupon,
} = require('../controllers/adminController');

router.use(protect, admin);

router.get('/dashboard', getDashboardStats);

router.route('/products').post(createProduct);
router.route('/products/:id').put(updateProduct).delete(deleteProduct);

router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

router.route('/coupons').get(getAllCoupons).post(createCoupon);
router.delete('/coupons/:id', deleteCoupon);

module.exports = router;
