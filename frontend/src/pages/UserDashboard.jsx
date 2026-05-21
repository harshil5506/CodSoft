import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { logout } from "../store/slices/authSlice";
import api from "../services/api";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my-orders");
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4 sm:pb-6 md:pb-8 mb-6 sm:mb-8 md:mb-12 gap-3 sm:gap-4"
      >
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
            Account Portal
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mt-1">
            Welcome, {user?.name?.split(" ")[0] || "Athlete"}
          </h1>
        </div>
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 whitespace-nowrap"
        >
          Sign Out
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          {/* Account Details */}
          <div className="border border-border p-3 sm:p-4 md:p-6 bg-card space-y-4 sm:space-y-5 md:space-y-6 rounded-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4">
              Account Details
            </h2>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base">
              <div>
                <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold mb-0.5 sm:mb-1">
                  Name
                </span>
                <span className="font-medium text-sm sm:text-base md:text-lg">{user?.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold mb-0.5 sm:mb-1">
                  Email Address
                </span>
                <span className="font-medium text-sm sm:text-base md:text-lg break-all">{user?.email}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold mb-0.5 sm:mb-1">
                  Role
                </span>
                <span className="font-medium text-sm sm:text-base md:text-lg capitalize">
                  {user?.role}
                </span>
              </div>
              {user?.role === "seller" && (
                <div>
                  <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold mb-0.5 sm:mb-1">
                    Seller Status
                  </span>
                  <span
                    className={`inline-block text-[10px] sm:text-xs uppercase tracking-wider font-bold px-2 py-0.5 sm:px-2.5 rounded border ${
                      user.sellerStatus === "approved"
                        ? "bg-green-500/10 text-green-500 border-green-500/30"
                        : user.sellerStatus === "rejected"
                          ? "bg-red-500/10 text-red-500 border-red-500/30"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                    }`}
                  >
                    {user.sellerStatus}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 sm:pt-4 md:pt-6 border-t border-border">
              {user?.role === "user" ? (
                <Link
                  to="/register-seller"
                  className="btn btn-primary w-full py-2 sm:py-2.5 md:py-3 uppercase tracking-wider text-xs sm:text-sm md:text-base font-bold text-center block"
                >
                  Apply as Seller
                </Link>
              ) : user?.role === "seller" &&
                user?.sellerStatus === "approved" ? (
                <Link
                  to="/admin"
                  className="btn btn-primary w-full py-2 sm:py-2.5 md:py-3 uppercase tracking-wider text-xs sm:text-sm md:text-base font-bold text-center block"
                >
                  Seller Hub
                </Link>
              ) : user?.role === "seller" &&
                user?.sellerStatus === "pending" ? (
                <Link
                  to="/register-seller"
                  className="btn btn-outline w-full py-2 sm:py-2.5 md:py-3 uppercase tracking-wider text-xs sm:text-sm md:text-base font-bold text-center block"
                >
                  View Application
                </Link>
              ) : null}
            </div>
          </div>

          {/* HyperCoins Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="border border-primary/30 p-3 sm:p-4 md:p-6 bg-primary/5 space-y-3 sm:space-y-4 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-base sm:text-lg md:text-xl font-display font-bold uppercase tracking-tighter text-primary">
                HyperCoins
              </h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-primary text-primary-foreground px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm md:text-base font-bold rounded-full"
              >
                {user?.hyperCoins || 0}
              </motion.div>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              Earn 1 coin per ₹100 spent. Use at checkout for instant discounts! (1 = ₹1)
            </p>
            <div className="pt-3 sm:pt-4 border-t border-primary/20 flex justify-between text-xs sm:text-sm md:text-base">
              <span className="font-bold text-primary">Lifetime:</span>
              <span className="font-mono text-primary font-bold">
                {user?.lifetimeCoinsEarned || 0}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase tracking-tighter">
              Recent Orders
            </h2>
            <Link
              to="/track-orders"
              className="btn btn-primary py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base font-bold uppercase px-3 sm:px-4 md:px-6 whitespace-nowrap"
            >
              Track All
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3 sm:space-y-4 animate-pulse">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="h-20 sm:h-24 md:h-28 bg-muted w-full border border-border rounded"
                ></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="border border-border p-4 sm:p-6 md:p-8 text-center text-muted-foreground text-xs sm:text-sm md:text-base rounded-lg">
              You haven't placed any orders yet.
            </div>
          ) : (
            <motion.div
              className="space-y-3 sm:space-y-4 md:space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="border border-border p-3 sm:p-4 md:p-6 flex flex-col md:flex-row justify-between gap-3 sm:gap-4 md:gap-6 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                      Order ID
                    </span>
                    <span className="font-mono text-xs sm:text-sm break-all">
                      {order._id}
                    </span>
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-medium block mt-2">
                      Items
                    </span>
                    <ul className="text-xs sm:text-sm list-disc pl-4 space-y-0.5 sm:space-y-1">
                      {order.orderItems.slice(0, 2).map((item) => (
                        <li key={item._id} className="truncate">
                          {item.name} (x{item.quantity})
                        </li>
                      ))}
                      {order.orderItems.length > 2 && (
                        <li className="text-muted-foreground text-[10px] sm:text-xs">
                          +{order.orderItems.length - 2} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="md:text-right flex flex-row md:flex-col justify-between md:justify-between gap-2 md:gap-0">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-medium block">
                        Amount
                      </span>
                      <span className="text-sm sm:text-base md:text-lg font-bold">
                        ₹{order.totalAmount?.toLocaleString?.() || order.totalAmount}
                      </span>
                    </div>
                    <div className="mt-0 md:mt-2">
                      <span
                        className={`inline-block text-[10px] sm:text-xs uppercase tracking-wider font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded border ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-500/10 text-green-500 border-green-500"
                            : "bg-yellow-500/10 text-yellow-500 border-yellow-500"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
