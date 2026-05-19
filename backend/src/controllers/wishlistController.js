const asyncHandler = require('express-async-handler');
const Wishlist = require('../models/Wishlist');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products', 'name price images slug ratings numReviews category');

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  }

  res.json(wishlist);
});

// @desc    Toggle product in wishlist
// @route   POST /api/wishlist/toggle/:productId
// @access  Private
const toggleWishlist = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [req.params.productId] });
    return res.json({ message: 'Added to wishlist', wishlist });
  }

  const index = wishlist.products.indexOf(req.params.productId);

  if (index > -1) {
    wishlist.products.splice(index, 1);
    await wishlist.save();
    return res.json({ message: 'Removed from wishlist', wishlist });
  } else {
    wishlist.products.push(req.params.productId);
    await wishlist.save();
    return res.json({ message: 'Added to wishlist', wishlist });
  }
});

module.exports = { getWishlist, toggleWishlist };
