import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchWishlist } from "../store/slices/wishlistSlice";
import api from "../services/api";
import { formatLabel } from "../utils/formatText";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: wishlistItems, loading } = useSelector(
    (state) => state.wishlist,
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await api.post(`/wishlist/toggle/${productId}`);
      dispatch(fetchWishlist());
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    }
  };

  const handleAddToCart = (productId) => {
    navigate(
      `/product/${wishlistItems.find((p) => p._id === productId)?.slug}`,
    );
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
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6">
            Please log in to view your wishlist
          </h2>
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-custom py-6 sm:py-8 md:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <motion.div
              key={n}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: n * 0.1 }}
              className="animate-pulse"
            >
              <div className="bg-muted aspect-[4/5] mb-3 sm:mb-4 rounded-lg"></div>
              <div className="h-3 sm:h-4 bg-muted w-2/3 mb-2 rounded"></div>
              <div className="h-3 sm:h-4 bg-muted w-1/3 rounded"></div>
            </motion.div>
          ))}
        </div>
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
          My Wishlist
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
        </p>
      </motion.div>

      {wishlistItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 sm:py-16 md:py-20"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-3 sm:mb-4">
            Your wishlist is empty
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8">
            Start adding your favorite products!
          </p>
          <motion.button
            onClick={() => navigate("/shop")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
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
          {wishlistItems.map((product) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, ease: "easeOut" }
                }
              }}
              whileHover={{ borderColor: "var(--primary)" }}
              className="bg-card border border-border rounded-lg overflow-hidden transition-colors"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <motion.img
                  src={
                    product.images[0]?.url ||
                    "https://via.placeholder.com/600x750"
                  }
                  alt={product.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-bold">
                  {formatLabel(product.category)}
                </p>
                <h3
                  className="font-bold mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors text-sm sm:text-base md:text-lg leading-tight"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  {product.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  <span className="font-bold text-sm sm:text-base md:text-lg">₹{product.price?.toLocaleString?.() || product.price}</span>
                  {product.comparePrice > product.price && (
                    <span className="text-muted-foreground line-through text-xs sm:text-sm">
                      ₹{product.comparePrice?.toLocaleString?.() || product.comparePrice}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <motion.button
                    onClick={() => handleAddToCart(product._id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 btn btn-primary py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
                  >
                    View Product
                  </motion.button>
                  <motion.button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 btn btn-outline py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Wishlist;
