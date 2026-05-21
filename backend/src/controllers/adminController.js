const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const Coupon = require("../models/Coupon");
const { sendOrderStatusUpdate } = require("../utils/sendEmail");

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalUsers = await User.countDocuments();

  const revenueAgg = await Order.aggregate([
    { $match: { "paymentInfo.status": "Completed" } },
    { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
  ]);

  const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

  const recentOrders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    totalProducts,
    totalOrders,
    totalUsers,
    totalRevenue,
    recentOrders,
  });
});

// @desc    Create product (Admin)
// @route   POST /api/admin/products
// @access  Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc    Update product (Admin)
// @route   PUT /api/admin/products/:id
// @access  Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

// @desc    Delete product (Admin)
// @route   DELETE /api/admin/products/:id
// @access  Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.json({ message: "Product removed" });
});

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Update order status (Admin)
// @route   PUT /api/admin/orders/:id/status
// @access  Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const newStatus = req.body.status;
  order.orderStatus = newStatus;

  if (newStatus === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save();

  // Send status update email
  await sendOrderStatusUpdate(order.user, order, newStatus);

  res.json(order);
});

// @desc    Get all users (Admin)
// @route   GET /api/admin/users
// @access  Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

// @desc    Delete user (Admin)
// @route   DELETE /api/admin/users/:id
// @access  Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.json({ message: "User removed" });
});

// @desc    Create coupon (Admin)
// @route   POST /api/admin/coupons
// @access  Admin
const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(coupon);
});

// @desc    Get all coupons (Admin)
// @route   GET /api/admin/coupons
// @access  Admin
const getAllCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json(coupons);
});

// @desc    Delete coupon (Admin)
// @route   DELETE /api/admin/coupons/:id
// @access  Admin
const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  await coupon.deleteOne();
  res.json({ message: "Coupon removed" });
});

// @desc    Get pending sellers (Admin)
// @route   GET /api/admin/sellers/pending
// @access  Admin
const getPendingSellers = asyncHandler(async (req, res) => {
  const sellers = await User.find({
    role: "seller",
    sellerStatus: "pending",
  }).select("-password");
  res.json(sellers);
});

// @desc    Approve or reject seller (Admin)
// @route   PUT /api/admin/sellers/:id/status
// @access  Admin
const updateSellerStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'

  if (!["approved", "rejected"].includes(status)) {
    res.status(400);
    throw new Error("Invalid status value");
  }

  const seller = await User.findById(req.params.id);

  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }

  seller.sellerStatus = status;
  if (status === "rejected") {
    seller.role = "user";
  }

  await seller.save();
  res.json(seller);
});

module.exports = {
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
  getPendingSellers,
  updateSellerStatus,
};
