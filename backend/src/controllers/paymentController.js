const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  const options = {
    amount: Math.round(amount * 100), // Amount in paise
    currency,
    receipt: receipt || `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  });
});

// @desc    Verify Razorpay payment and mark order as paid
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

  const shasum = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  const isValidSignature = shasum === razorpaySignature;

  if (!isValidSignature) {
    res.status(400);
    throw new Error("Invalid payment signature");
  }

  // Update order with payment info
  if (orderId) {
    await Order.findByIdAndUpdate(orderId, {
      "paymentInfo.razorpayOrderId": razorpayOrderId,
      "paymentInfo.razorpayPaymentId": razorpayPaymentId,
      "paymentInfo.razorpaySignature": razorpaySignature,
      "paymentInfo.status": "Completed"
    });
  }

  res.json({
    success: true,
    message: "Payment verified successfully",
  });
});

// @desc    Get payment details
// @route   GET /api/payments/:paymentId
// @access  Private
const getPaymentDetails = asyncHandler(async (req, res) => {
  const payment = await razorpay.payments.fetch(req.params.paymentId);
  res.json(payment);
});

module.exports = {
  createRazorpayOrder,
  verifyPayment,
  getPaymentDetails,
};
