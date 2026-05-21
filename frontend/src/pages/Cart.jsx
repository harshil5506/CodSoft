import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchCart,
  updateItemQty,
  removeItemFromCart,
} from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateItemQty({ itemId: id, quantity: newQty }));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.price || item.product?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  if (loading && cartItems.length === 0) {
    return (
      <div className="container-custom py-12 md:py-24 text-center px-4 sm:px-6">
        <motion.div
          className="animate-pulse space-y-4 sm:space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-6 sm:h-8 bg-muted w-1/4 mx-auto rounded"></div>
          <div className="h-3 sm:h-4 bg-muted w-2/4 mx-auto rounded"></div>
          <div className="h-40 sm:h-64 bg-muted w-full max-w-4xl mx-auto rounded"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 sm:mb-8 md:mb-12 border-b border-border pb-3 sm:pb-4 md:pb-6"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Your Bag
        </h1>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 sm:py-16 md:py-20"
        >
          <h2 className="text-xl sm:text-2xl font-display font-bold mb-4">
            Your bag is empty
          </h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/shop"
              className="btn btn-primary text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4"
            >
              Go to Shop
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-12">
          {/* Cart Items List */}
          <motion.div
            className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.3, ease: "easeOut" },
                  },
                }}
                whileHover={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 border border-border p-3 sm:p-4 md:p-6 bg-card rounded-lg transition-shadow"
              >
                <div className="w-full sm:w-20 md:w-24 aspect-[4/3] sm:aspect-square bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden rounded">
                  <img
                    src={
                      item.product?.images?.[0]?.url ||
                      "https://via.placeholder.com/400x500"
                    }
                    alt={item.product?.name || "Product"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base md:text-lg leading-tight mb-1 line-clamp-2">
                      {item.product ? (
                        <Link
                          to={`/product/${item.product.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                      ) : (
                        "Product details unavailable"
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 md:mb-2 line-clamp-1">
                      {item.attribute}
                    </p>
                    <span className="font-semibold text-xs sm:text-sm md:text-base">
                      ₹
                      {(
                        item.price ||
                        item.product?.price ||
                        0
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between mt-2 sm:mt-3 md:mt-4 gap-2">
                    <motion.div
                      className="flex items-center border border-border rounded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.button
                        onClick={() => updateQty(item._id, item.quantity - 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs sm:text-sm md:text-base hover:bg-muted transition-colors"
                      >
                        −
                      </motion.button>
                      <span className="px-2 sm:px-3 text-xs sm:text-sm md:text-base font-medium">
                        {item.quantity}
                      </span>
                      <motion.button
                        onClick={() => updateQty(item._id, item.quantity + 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs sm:text-sm md:text-base hover:bg-muted transition-colors"
                      >
                        +
                      </motion.button>
                    </motion.div>

                    <motion.button
                      onClick={() => removeItem(item._id)}
                      whileHover={{ scale: 1.05, color: "rgb(239, 68, 68)" }}
                      whileTap={{ scale: 0.95 }}
                      className="text-[10px] sm:text-xs md:text-sm text-red-500/70 hover:text-red-500 transition-colors whitespace-nowrap"
                    >
                      Remove
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border border-border p-4 sm:p-5 md:p-6 bg-card h-fit space-y-4 sm:space-y-5 md:space-y-6 rounded-lg lg:sticky lg:top-24"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold uppercase tracking-tighter pb-3 sm:pb-4 border-b border-border">
              Summary
            </h2>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between gap-4"
              >
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  ₹{subtotal.toLocaleString()}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between gap-4"
              >
                <span className="text-muted-foreground">
                  Estimated Shipping
                </span>
                <span className="font-medium text-green-500">FREE</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="border-t border-border pt-3 sm:pt-4 flex justify-between gap-4 font-bold text-sm sm:text-base md:text-lg"
              >
                <span>Total</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/checkout"
                className="w-full btn btn-primary py-2.5 sm:py-3 md:py-4 uppercase font-bold tracking-widest text-center block text-xs sm:text-sm md:text-base"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
