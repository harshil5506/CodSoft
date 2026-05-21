const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const formatCartWithDynamicPrices = (cart) => {
  if (!cart) return null;
  const cartObj = cart.toObject();
  cartObj.items = cartObj.items.map(item => {
    let price = item.product?.price || 0;
    let comparePrice = item.product?.comparePrice || 0;
    if (item.attribute && item.product?.priceVariants && item.product.priceVariants.length > 0) {
      const variant = item.product.priceVariants.find(
        v => item.attribute.toLowerCase().includes(v.attributeValue.toLowerCase())
      );
      if (variant) {
        price = variant.price;
        if (variant.comparePrice) {
          comparePrice = variant.comparePrice;
        }
      }
    }
    return {
      ...item,
      price,
      comparePrice
    };
  });
  return cartObj;
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price images stock slug priceVariants comparePrice');

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  res.json(formatCartWithDynamicPrices(cart));
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1, attribute } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Not enough stock available');
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity, attribute }],
    });
  } else {
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.attribute === attribute
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, attribute });
    }

    await cart.save();
  }

  cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price images stock slug priceVariants comparePrice');
  res.json(formatCartWithDynamicPrices(cart));
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/update/:itemId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.items.id(req.params.itemId);

  if (!item) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  item.quantity = quantity;
  await cart.save();

  const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price images stock slug priceVariants comparePrice');
  res.json(formatCartWithDynamicPrices(updatedCart));
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);
  await cart.save();

  const updatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price images stock slug priceVariants comparePrice');
  res.json(formatCartWithDynamicPrices(updatedCart));
});

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = [];
    cart.coupon = undefined;
    await cart.save();
  }

  res.json({ message: 'Cart cleared' });
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
