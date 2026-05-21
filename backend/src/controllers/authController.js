const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = generateToken(res, user._id);

    res.status(201).json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      sellerStatus: user.sellerStatus,
      businessDetails: user.businessDetails,
      hyperCoins: user.hyperCoins,
      lifetimeCoinsEarned: user.lifetimeCoinsEarned,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    res.json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      sellerStatus: user.sellerStatus,
      businessDetails: user.businessDetails,
      hyperCoins: user.hyperCoins,
      lifetimeCoinsEarned: user.lifetimeCoinsEarned,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      sellerStatus: user.sellerStatus,
      businessDetails: user.businessDetails,
      hyperCoins: user.hyperCoins,
      lifetimeCoinsEarned: user.lifetimeCoinsEarned,
      addresses: user.addresses,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Save address for user
// @route   POST /api/auth/address
// @access  Private
const saveAddress = asyncHandler(async (req, res) => {
  const { street, city, state, zipCode, country, isDefault } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const newAddress = {
    street,
    city,
    state,
    zipCode,
    country,
    isDefault: isDefault || false,
  };

  if (isDefault) {
    user.addresses.forEach((addr) => (addr.isDefault = false));
  }

  user.addresses.push(newAddress);
  await user.save();

  res.status(201).json(user.addresses);
});

// @desc    Get user addresses
// @route   GET /api/auth/addresses
// @access  Private
const getUserAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json(user.addresses);
});

const registerSeller = asyncHandler(async (req, res) => {
  const { companyName, taxId, phone, address } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = "seller";
  user.sellerStatus = "pending";
  user.businessDetails = { companyName, taxId, phone, address };

  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    sellerStatus: user.sellerStatus,
    businessDetails: user.businessDetails,
    hyperCoins: user.hyperCoins,
    lifetimeCoinsEarned: user.lifetimeCoinsEarned,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  registerSeller,
  saveAddress,
  getUserAddresses,
};
