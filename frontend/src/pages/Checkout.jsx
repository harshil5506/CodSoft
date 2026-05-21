import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import api from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalItems } = useSelector(
    (state) => state.cart,
  );
  const { user } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phone: "",
  });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [showNewAddress, setShowNewAddress] = useState(true);
  const [useCoins, setUseCoins] = useState(false);
  const [loading, setLoading] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayReady(true);
    document.body.appendChild(script);

    // Load saved addresses
    loadSavedAddresses();
  }, []);

  const loadSavedAddresses = async () => {
    try {
      const { data } = await api.get("/auth/addresses");
      setSavedAddresses(data);
      if (data.length > 0) {
        setShowNewAddress(false);
      }
    } catch (err) {
      console.error("Failed to load addresses:", err);
    }
  };

  const handleAddressSelect = (index) => {
    const selected = savedAddresses[index];
    setShippingAddress(selected);
    setSelectedAddressId(index);
    setShowNewAddress(false);
  };

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSaveAndPayment = async (e) => {
    e.preventDefault();

    if (!razorpayReady) {
      alert("Razorpay is loading. Please wait...");
      return;
    }

    setLoading(true);

    try {
      // Save address if new
      if (showNewAddress) {
        await api.post("/auth/address", shippingAddress);
      }

      // Step 1: Create order first
      const orderPayload = {
        shippingAddress,
        useCoins,
      };

      const { data: createdOrder } = await api.post("/orders", orderPayload);
      console.log("✅ Order created:", createdOrder);

      if (!createdOrder || !createdOrder._id) {
        throw new Error("Invalid order response: missing _id");
      }

      // Step 2: Create Razorpay payment order
      const { data: razorpayOrder } = await api.post("/payments/create-order", {
        amount: createdOrder.totalAmount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      // Step 3: Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: razorpayOrder.orderId,
        amount: createdOrder.totalAmount * 100,
        currency: "INR",
        name: "HYPERFIT",
        description: `Order for ${user?.name || "Customer"}`,
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: shippingAddress.phone || "",
        },
        handler: async (response) => {
          try {
            // Step 4: Verify payment and update order
            await api.post("/payments/verify", {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: `${createdOrder._id}`,
            });

            alert("✅ Payment Successful! Order Confirmed!");
            navigate("/track-orders");
          } catch (err) {
            console.error(err);
            alert("❌ Payment verification failed. Order created but payment not verified.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            alert("Payment cancelled. Your order has been created with pending payment status.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Full error:", err);
      console.error("Error response:", err.response?.data);
      const errorMsg = err.response?.data?.message || err.message || "Unknown error";
      alert("❌ Failed: " + errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 md:mb-12 border-b border-border pb-4 md:pb-6"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Checkout
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSaveAndPayment}
          className="space-y-4 md:space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tighter">
            Shipping Address
          </h2>

          {savedAddresses.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border p-3 sm:p-4 rounded-lg"
            >
              <label className="block text-xs uppercase tracking-wider font-bold mb-3">
                Saved Addresses
              </label>
              <select
                value={selectedAddressId}
                onChange={(e) => handleAddressSelect(Number(e.target.value))}
                className="bg-muted border border-border rounded-md px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">-- Select Saved Address --</option>
                {savedAddresses.map((addr, idx) => (
                  <option key={idx} value={idx}>
                    {addr.street}, {addr.city}, {addr.state}
                  </option>
                ))}
              </select>
              <motion.button
                type="button"
                onClick={() => setShowNewAddress(!showNewAddress)}
                whileHover={{ scale: 1.02 }}
                className="text-primary text-xs font-bold mt-2 underline hover:text-primary/80 transition-colors"
              >
                {showNewAddress ? "Use Saved" : "Add New Address"}
              </motion.button>
            </motion.div>
          )}

          {showNewAddress && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 md:space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold mb-2">
                  Street Address
                </label>
                <input
                  required
                  type="text"
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleInputChange}
                  className="bg-muted border border-border rounded-md px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-2">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="bg-muted border border-border rounded-md px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-2">
                    State
                  </label>
                  <input
                    required
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    className="bg-muted border border-border rounded-md px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-2">
                    Zip Code
                  </label>
                  <input
                    required
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    className="bg-muted border border-border rounded-md px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-2">
                    Phone
                  </label>
                  <input
                    required
                    type="text"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="bg-muted border border-border rounded-md px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {user?.hyperCoins > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-primary bg-primary/5 p-3 md:p-4 rounded-lg"
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCoins}
                  onChange={(e) => setUseCoins(e.target.checked)}
                  className="w-4 md:w-5 h-4 md:h-5 text-primary border-primary focus:ring-primary cursor-pointer"
                />
                <div className="min-w-0">
                  <span className="block font-bold text-primary text-sm md:text-base">
                    Apply HyperCoins
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground block">
                    You have {user.hyperCoins} coins. Get ₹{user.hyperCoins} off!
                  </span>
                </div>
              </label>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading || !razorpayReady}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full btn btn-primary py-3 md:py-4 uppercase font-bold tracking-widest disabled:opacity-50 mt-4 text-sm md:text-base transition-all"
          >
            {loading
              ? "Processing Payment..."
              : razorpayReady
                ? "Pay with Razorpay"
                : "Loading..."}
          </motion.button>
        </motion.form>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border p-4 md:p-6 rounded-lg lg:h-fit lg:sticky lg:top-24"
        >
          <h2 className="text-xl md:text-2xl font-display font-bold uppercase tracking-tighter mb-3 md:mb-4">
            Order Tips
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mb-4 leading-relaxed">
            Please verify your shipping address. Standard delivery: 3-5 business days.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/5 border border-primary/20 p-3 md:p-4 rounded-lg"
          >
            <h3 className="font-bold text-primary text-xs md:text-sm uppercase mb-1">
              HyperCoins Loyalty
            </h3>
            <p className="text-[10px] md:text-xs text-muted-foreground">
              Earn 1 HyperCoin per ₹100 spent. Credits after delivery.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
