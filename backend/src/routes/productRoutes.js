const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductBySlug,
} = require('../controllers/productController');

router.route('/').get(getProducts);
router.route('/slug/:slug').get(getProductBySlug);
router.route('/:id').get(getProductById);

module.exports = router;
