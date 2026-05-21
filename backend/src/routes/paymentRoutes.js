const express = require("express");
const {
  createRazorpayOrder,
  verifyPayment,
  getPaymentDetails,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);
router.get("/:paymentId", protect, getPaymentDetails);

module.exports = router;
