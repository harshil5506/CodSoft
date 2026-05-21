import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

const ShippingAndTrack = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/orders/my-orders");
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500";
      case "Processing":
        return "bg-blue-500/10 text-blue-700 border-blue-500";
      case "Shipped":
        return "bg-purple-500/10 text-purple-700 border-purple-500";
      case "Delivered":
        return "bg-green-500/10 text-green-700 border-green-500";
      case "Cancelled":
        return "bg-red-500/10 text-red-700 border-red-500";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500";
    }
  };

  const getStatusSteps = (status) => {
    const steps = [
      { name: "Order Placed", icon: "✓", status: "Pending" },
      { name: "Processing", icon: "⚙", status: "Processing" },
      { name: "Shipped", icon: "📦", status: "Shipped" },
      { name: "Delivered", icon: "✓", status: "Delivered" },
    ];

    const currentIndex = steps.findIndex((s) => s.status === status);
    return steps.map((step, idx) => ({
      ...step,
      completed: idx <= currentIndex,
      current: idx === currentIndex,
    }));
  };

  const getEstimatedDeliveryDate = (createdAt, status) => {
    const created = new Date(createdAt);
    let daysToAdd = 0;
    if (status === "Processing") daysToAdd = 3;
    else if (status === "Shipped") daysToAdd = 6;
    else if (status === "Delivered") daysToAdd = 7;

    const estimated = new Date(created);
    estimated.setDate(estimated.getDate() + daysToAdd);
    return estimated;
  };

  if (!isAuthenticated) {
    return (
      <div className="container-custom py-6 sm:py-8 md:py-12 min-h-[60vh] px-4 sm:px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 sm:mb-4">
            Tracking Not Available
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8">
            Please log in to track your orders
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
          >
            <Link to="/login" className="block">
              Sign In
            </Link>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 min-h-[60vh] px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 sm:mb-8 md:mb-12 border-b border-border pb-3 sm:pb-4 md:pb-6"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-2 sm:mb-3">
          Track Orders
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          Monitor the status and delivery of your orders
        </p>
      </motion.div>

      {loading ? (
        <div className="space-y-3 sm:space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="h-24 sm:h-28 md:h-32 bg-muted rounded border border-border"
            ></motion.div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 sm:py-16 md:py-20 bg-card border border-border rounded-lg p-4 sm:p-6 md:p-8"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-2 sm:mb-3">
            No Orders Yet
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8">
            Start shopping to track your orders here
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
          >
            <Link to="/shop" className="block">
              Continue Shopping
            </Link>
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-3 sm:space-y-4 md:space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
        >
          {orders.map((order) => (
            <motion.div
              key={order._id}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3 }
                }
              }}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <motion.button
                onClick={() =>
                  setExpandedOrder(
                    expandedOrder === order._id ? null : order._id,
                  )
                }
                whileHover={{ backgroundColor: "var(--muted-50)" }}
                className="w-full p-3 sm:p-4 md:p-6 text-left transition-colors flex justify-between items-start sm:items-center gap-3 sm:gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </span>
                    <span
                      className={`text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded border ${getStatusColor(order.orderStatus || "Pending")}`}
                    >
                      {order.orderStatus || "Pending"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">
                    Placed on {new Date(order.createdAt).toLocaleDateString()} •
                    ₹{order.totalAmount?.toLocaleString?.() || order.totalAmount}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    📅 Est. Delivery:{" "}
                    {getEstimatedDeliveryDate(
                      order.createdAt,
                      order.orderStatus,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <motion.svg
                  animate={{ rotate: expandedOrder === order._id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>
              </motion.button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedOrder === order._id ? "auto" : 0,
                  opacity: expandedOrder === order._id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-border p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                  {/* Status Timeline */}
                  <div>
                    <h3 className="font-bold mb-3 sm:mb-4 md:mb-6 uppercase text-xs sm:text-sm md:text-base">
                      Delivery Status
                    </h3>
                    <div className="relative">
                      {getStatusSteps(order.orderStatus || "Pending").map(
                        (step, idx, steps) => (
                          <div key={idx} className="relative pb-6 sm:pb-8 last:pb-0">
                            {/* Connecting Line */}
                            {idx < steps.length - 1 && (
                              <div
                                className={`absolute left-3 sm:left-4 top-8 sm:top-10 w-0.5 h-10 sm:h-12 ${
                                  step.completed ? "bg-primary" : "bg-border"
                                }`}
                              ></div>
                            )}
                            {/* Step */}
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div
                                className={`w-7 sm:w-8 h-7 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 z-10 ${
                                  step.completed
                                    ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {step.icon}
                              </div>
                              <div className="flex-1 pt-0.5">
                                <p
                                  className={`font-medium text-xs sm:text-sm md:text-base ${step.completed ? "text-foreground" : "text-muted-foreground"} ${step.current ? "text-primary" : ""}`}
                                >
                                  {step.name}
                                </p>
                                {step.current && (
                                  <p className="text-[10px] sm:text-xs text-primary font-medium mt-0.5 sm:mt-1">
                                    ⏱️ Current status
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t border-border pt-3 sm:pt-4 md:pt-6">
                    <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 uppercase text-xs sm:text-sm md:text-base">
                      Shipping Address
                    </h3>
                    <div className="text-xs sm:text-sm md:text-base space-y-0.5 sm:space-y-1 text-muted-foreground">
                      <p>{order.shippingAddress?.street}</p>
                      <p>
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state}{" "}
                        {order.shippingAddress?.zipCode}
                      </p>
                      <p>{order.shippingAddress?.country}</p>
                      <p className="pt-1 sm:pt-2 font-medium text-foreground">
                        {order.shippingAddress?.phone}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-border pt-3 sm:pt-4 md:pt-6">
                    <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 uppercase text-xs sm:text-sm md:text-base">
                      Items ({order.orderItems.length})
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} className="flex gap-2 sm:gap-3 md:gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 object-cover rounded bg-muted flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0 text-xs sm:text-sm md:text-base">
                            <p className="font-medium line-clamp-1">{item.name}</p>
                            {item.attribute && (
                              <p className="text-[10px] sm:text-xs text-muted-foreground">
                                {item.attribute}
                              </p>
                            )}
                            <p className="text-muted-foreground text-[10px] sm:text-xs">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0">
                            ₹{(item.price * item.quantity)?.toLocaleString?.() || item.price * item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-border pt-3 sm:pt-4 md:pt-6 space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{order.subtotal?.toLocaleString?.() || order.subtotal}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>₹{order.shippingCost?.toLocaleString?.() || order.shippingCost}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹{order.tax?.toLocaleString?.() || order.tax}</span>
                    </div>
                    {order.coinDiscount > 0 && (
                      <div className="flex justify-between gap-4 text-green-600">
                        <span>HyperCoins Discount</span>
                        <span>-₹{order.coinDiscount?.toLocaleString?.() || order.coinDiscount}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-1.5 sm:pt-2 flex justify-between gap-4 font-bold">
                      <span>Total</span>
                      <span>₹{order.totalAmount?.toLocaleString?.() || order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ShippingAndTrack;
