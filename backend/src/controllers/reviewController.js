const asyncHandler = require("express-async-handler");
const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

// @desc    Get all reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
  res.json(reviews);
});

// @desc    Create new review
// @route   POST /api/reviews/product/:productId
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;

  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if user has purchased the product
  const orders = await Order.find({ user: req.user._id });
  const hasPurchased = orders.some((order) =>
    order.orderItems.some(
      (item) => item.product.toString() === req.params.productId.toString(),
    ),
  );

  if (!hasPurchased) {
    res.status(400);
    throw new Error("You can only review products you have purchased");
  }

  const alreadyReviewed = await Review.findOne({
    user: req.user._id,
    product: req.params.productId,
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  // Upload images to Cloudinary
  const images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const cloudinaryResult = await uploadToCloudinary(
        file.path,
        "hyperfit/reviews",
      );
      images.push(cloudinaryResult);
    }
  }

  const review = await Review.create({
    user: req.user._id,
    product: req.params.productId,
    rating: Number(rating),
    title,
    comment,
    images,
  });

  res.status(201).json(review);
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  if (
    review.user.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized");
  }

  // Delete images from Cloudinary
  if (review.images && review.images.length > 0) {
    for (const image of review.images) {
      await deleteFromCloudinary(image.publicId);
    }
  }

  await review.deleteOne();
  res.json({ message: "Review removed" });
});

module.exports = { getProductReviews, createReview, deleteReview };
