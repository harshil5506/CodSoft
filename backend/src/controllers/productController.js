const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const normalizeCategory = (value = '') =>
  value
    .toString()
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
    
  const category = req.query.category
    ? { category: normalizeCategory(req.query.category) }
    : {};

  const count = await Product.countDocuments({ ...keyword, ...category, isActive: true });
  const products = await Product.find({ ...keyword, ...category, isActive: true })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), count });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product && product.isActive) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Fetch product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (product && product.isActive) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const Order = require('../models/Order');

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, images } = req.body;
  
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    // Check if user has purchased the product
    const orders = await Order.find({ user: req.user._id });
    const hasPurchased = orders.some((order) =>
      order.orderItems.some((item) => item.product.toString() === product._id.toString())
    );

    if (!hasPurchased) {
      res.status(400);
      throw new Error('You can only review products you have purchased');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      images: images || [],
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  getProductBySlug,
  createProductReview,
};
