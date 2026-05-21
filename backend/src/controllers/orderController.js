const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { sendOrderConfirmation } = require("../utils/sendEmail");

// @desc    Create new order (payment comes after)
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, useCoins } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
  );

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const orderItems = cart.items.map((item) => {
    let price = item.product.price;
    if (
      item.attribute &&
      item.product.priceVariants &&
      item.product.priceVariants.length > 0
    ) {
      const variant = item.product.priceVariants.find((v) =>
        item.attribute.toLowerCase().includes(v.attributeValue.toLowerCase()),
      );
      if (variant) {
        price = variant.price;
      }
    }
    return {
      product: item.product._id,
      name: item.product.name,
      image: item.product.images[0]?.url || "",
      price: price,
      quantity: item.quantity,
      attribute: item.attribute,
    };
  });

  const subtotal = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingCost = subtotal > 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  let totalAmount = subtotal + shippingCost + tax;

  let coinDiscount = 0;
  let coinsUsed = 0;

  if (useCoins && req.user.hyperCoins > 0) {
    // 1 HyperCoin = ₹1 Discount
    coinsUsed = Math.min(req.user.hyperCoins, Math.floor(totalAmount));
    coinDiscount = coinsUsed;
    totalAmount -= coinDiscount;
  }

  // Earn 1 HyperCoin per ₹100 spent
  const coinsEarned = Math.floor(totalAmount / 100);

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentInfo: {
      status: 'Pending'
    },
    subtotal,
    shippingCost,
    tax,
    totalAmount,
    coinsEarned,
    coinsUsed,
    coinDiscount,
  });

  if (coinsUsed > 0 || coinsEarned > 0) {
    req.user.hyperCoins = req.user.hyperCoins - coinsUsed + coinsEarned;
    req.user.lifetimeCoinsEarned += coinsEarned;
    await req.user.save({ validateBeforeSave: false });
  }

  // Update stock
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity, sold: item.quantity },
    });
  }

  // Clear cart
  cart.items = [];
  cart.coupon = undefined;
  await cart.save();

  // Send order confirmation email
  await sendOrderConfirmation(req.user, order);

  res.status(201).json(order);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      res.status(403);
      throw new Error("Not authorized to view this order");
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = { createOrder, getMyOrders, getOrderById };
