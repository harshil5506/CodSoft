const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  registerSeller,
  saveAddress,
  getUserAddresses,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.post("/register-seller", protect, registerSeller);
router.post("/address", protect, saveAddress);
router.get("/addresses", protect, getUserAddresses);

module.exports = router;
