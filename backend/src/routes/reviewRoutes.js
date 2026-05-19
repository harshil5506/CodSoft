const express = require('express');
const router = express.Router();
const { getProductReviews, createReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.route('/product/:productId').get(getProductReviews);
router.route('/product/:productId').post(protect, createReview);
router.route('/:id').delete(protect, deleteReview);

module.exports = router;
