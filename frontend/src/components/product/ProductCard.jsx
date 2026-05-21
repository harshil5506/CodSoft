import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultAttr = product.attributes?.[0]?.value?.split(", ")[0] || "";

    dispatch(
      addItemToCart({
        productId: product._id,
        quantity: 1,
        attribute: defaultAttr,
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercentage = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100,
      )
    : 0;

  const containerVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link to={`/product/${product.slug}`} className="block h-full">
          <img
            src={product.images?.[0]?.url || "https://via.placeholder.com/400x500"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </Link>

        {discountPercentage > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.22 }}
            className="absolute left-3 top-3 rounded-md bg-red-500 px-2.5 py-1.5 text-xs font-bold text-white"
          >
            -{discountPercentage}%
          </motion.div>
        )}

        {isAuthenticated && (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm backdrop-blur transition-colors hover:bg-white"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              className={`h-5 w-5 ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "fill-transparent text-gray-700"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </motion.button>
        )}

        {product.isFeatured && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.16, duration: 0.22 }}
            className={`absolute right-3 rounded-md bg-primary px-2.5 py-1.5 text-xs font-bold text-primary-foreground ${
              isAuthenticated ? "top-14" : "top-3"
            }`}
          >
            Featured
          </motion.div>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
          <motion.button
            onClick={handleQuickAdd}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full rounded-md px-3 py-2.5 text-sm font-bold uppercase tracking-wide shadow-lg transition-colors duration-300 ${
              added
                ? "bg-green-500 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {added ? "Added" : "Quick Add"}
          </motion.button>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {product.brand}
        </div>

        <Link to={`/product/${product.slug}`} className="group/link">
          <h3 className="mb-2 line-clamp-2 font-display text-base font-bold leading-tight transition-colors group-hover/link:text-primary">
            {product.name}
          </h3>
        </Link>

        {product.ratings > 0 && (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className={`text-xs ${
                    i < Math.round(product.ratings)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </motion.span>
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              ({product.numReviews})
            </span>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-foreground"
          >
            Rs.{product.price.toLocaleString()}
          </motion.span>
          {product.comparePrice > product.price && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground line-through"
            >
              Rs.{product.comparePrice.toLocaleString()}
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
