import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { addItemToCart } from "../store/slices/cartSlice";
import { fetchWishlist } from "../store/slices/wishlistSlice";
import api from "../services/api";
import { formatLabel } from "../utils/formatText";

const ProductDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [added, setAdded] = useState(false);

  // Review System States
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const fetchProductReviews = async (productId) => {
    try {
      setReviewsLoading(true);
      const { data } = await api.get(`/reviews/product/${productId}`);
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/slug/${slug}`);
        setProduct(data);
        fetchProductReviews(data._id);
        if (data.attributes && data.attributes.length > 0) {
          const initialAttrs = {};
          data.attributes.forEach((attr) => {
            const values = attr.value.split(", ");
            initialAttrs[attr.key] = values[0];
          });
          setSelectedAttributes(initialAttrs);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess(false);

    if (!comment.trim()) {
      setReviewError("Please add a comment");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("rating", rating);
      formData.append("title", reviewTitle);
      formData.append("comment", comment);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await api.post(`/reviews/product/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setReviewSuccess(true);
      setRating(5);
      setReviewTitle("");
      setComment("");
      setImages([]);
      fetchProductReviews(product._id);

      // Reload product details to update average rating and total review counts
      const { data } = await api.get(`/products/slug/${slug}`);
      setProduct(data);
    } catch (err) {
      setReviewError(err.response?.data?.message || "Failed to submit review");
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-8 sm:py-12 md:py-24 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="bg-muted aspect-[4/5] rounded"></div>
          <div className="space-y-6">
            <div className="h-8 bg-muted w-3/4 rounded"></div>
            <div className="h-6 bg-muted w-1/4 rounded"></div>
            <div className="h-24 bg-muted w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-12 md:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
          {error || "Product not found"}
        </h2>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Dynamic price evaluation
  let currentPrice = product.price;
  let currentComparePrice = product.comparePrice;

  if (product.priceVariants && product.priceVariants.length > 0) {
    const activeVariant = product.priceVariants.find((v) =>
      Object.values(selectedAttributes).some(
        (val) => val.toLowerCase() === v.attributeValue.toLowerCase(),
      ),
    );
    if (activeVariant) {
      currentPrice = activeVariant.price;
      if (activeVariant.comparePrice) {
        currentComparePrice = activeVariant.comparePrice;
      }
    }
  }

  const handleAddToCart = () => {
    const attributeString = Object.values(selectedAttributes).join(", ");
    dispatch(
      addItemToCart({
        productId: product._id,
        quantity,
        attribute: attributeString,
      }),
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-20"
      >
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border p-3 sm:p-4 rounded-lg aspect-[4/5] flex items-center justify-center overflow-hidden"
        >
          <img
            src={
              product.images[0]?.url || "https://via.placeholder.com/600x750"
            }
            alt={product.name}
            className="object-contain max-h-full w-full"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col justify-between min-w-0"
        >
          <div>
            <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest mb-2">
              {formatLabel(product.category)}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-6">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">₹{currentPrice.toLocaleString()}</span>
              {currentComparePrice > currentPrice && (
                <span className="text-muted-foreground line-through text-base md:text-lg">
                  ₹{currentComparePrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="border-t border-b border-border py-4 md:py-6 mb-6 md:mb-8">
              <h3 className="font-bold mb-2 text-sm md:text-base">Overview</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* Attributes Selection */}
            {product.attributes &&
              product.attributes.map((attr) => {
                const options = attr.value.split(", ");
                return (
                  <div key={attr.key} className="mb-4 md:mb-6">
                    <h3 className="font-bold mb-2 md:mb-3 uppercase text-xs md:text-sm tracking-wider">
                      {attr.key}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setSelectedAttributes((prev) => ({
                              ...prev,
                              [attr.key]: option,
                            }))
                          }
                          className={`px-3 md:px-4 py-1.5 md:py-2 border text-xs md:text-sm font-medium transition-colors rounded min-w-10 ${
                            selectedAttributes[attr.key] === option
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background hover:bg-muted text-foreground"
                          }`}
                        >
                          {option}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })}

            {/* Quantity Selector */}
            <div className="mb-6 md:mb-8">
              <h3 className="font-bold mb-2 md:mb-3 uppercase text-xs md:text-sm tracking-wider">
                Quantity
              </h3>
              <motion.div
                className="flex items-center border border-border rounded w-fit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 md:px-3 py-1.5 md:py-2 text-lg hover:bg-muted transition-colors"
                >
                  −
                </motion.button>
                <span className="px-3 md:px-4 font-medium text-sm md:text-base">{quantity}</span>
                <motion.button
                  onClick={() => setQuantity((q) => q + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2 md:px-3 py-1.5 md:py-2 text-lg hover:bg-muted transition-colors"
                >
                  +
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary w-full py-3 md:py-4 text-center font-bold tracking-widest uppercase text-xs sm:text-sm md:text-base"
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </motion.button>

            <motion.button
              onClick={async () => {
                if (!isAuthenticated)
                  return alert("Please login to add to wishlist");
                try {
                  await api.post(`/wishlist/toggle/${product._id}`);
                  dispatch(fetchWishlist());
                  alert("Wishlist updated!");
                } catch (err) {
                  alert(
                    err.response?.data?.message || "Failed to update wishlist",
                  );
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline w-full py-3 md:py-4 text-center font-bold tracking-widest uppercase text-xs sm:text-sm md:text-base"
            >
              Add to Wishlist
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Product Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="border-t border-border mt-12 md:mt-16 pt-8 md:pt-12"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter mb-6 md:mb-8">
          Customer Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {reviewsLoading ? (
              <p className="text-muted-foreground animate-pulse">
                Loading reviews...
              </p>
            ) : reviews.length === 0 ? (
              <p className="text-muted-foreground text-sm md:text-base">
                No reviews yet for this product. Be the first to share your
                thoughts!
              </p>
            ) : (
              <div className="space-y-6">
                {reviews.map((rev) => (
                  <motion.div
                    key={rev._id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-b border-border pb-6 last:border-b-0"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs text-primary uppercase flex-shrink-0">
                          {rev.name?.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm break-words">{rev.name}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(rev.createdAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-yellow-500 flex-shrink-0">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <svg
                            key={idx}
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={idx < rev.rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mr-0.5"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    {rev.title && (
                      <h5 className="font-bold text-sm mb-1">{rev.title}</h5>
                    )}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {rev.comment}
                    </p>

                    {/* Review Images */}
                    {rev.images && rev.images.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {rev.images.map((img, i) => (
                          <a
                            key={i}
                            href={`http://localhost:5000${img.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-border rounded overflow-hidden h-16 w-16 md:h-20 md:w-20 flex items-center justify-center bg-card hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={`http://localhost:5000${img.url}`}
                              alt="Review image"
                              className="object-cover h-full w-full"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Leave a Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card border border-border p-4 md:p-6 rounded-lg lg:h-fit"
          >
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter mb-4">
              Write a Review
            </h3>
            {isAuthenticated ? (
              <form onSubmit={handleReviewSubmit} className="space-y-3 md:space-y-4">
                {reviewSuccess && (
                  <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded text-xs md:text-sm font-medium">
                    Thank you! Your review has been submitted successfully.
                  </div>
                )}
                {reviewError && (
                  <div className="bg-destructive/10 border border-destructive text-destructive p-3 rounded text-xs md:text-sm font-medium">
                    {reviewError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                    Rating
                  </label>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const starValue = idx + 1;
                      return (
                        <motion.button
                          type="button"
                          key={idx}
                          onClick={() => setRating(starValue)}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          className="hover:scale-110 transition-transform p-0.5"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill={starValue <= rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                    Headline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Best ever!"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="bg-muted border border-border rounded px-3 py-2 text-xs md:text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                    Review
                  </label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="bg-muted border border-border rounded px-3 py-2 text-xs md:text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                    Photos (Max 3)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setImages(Array.from(e.target.files))}
                    className="w-full text-xs text-muted-foreground file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-primary file:text-primary-foreground hover:file:opacity-90 file:cursor-pointer"
                  />
                  {images.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {images.map((img, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-muted px-2 py-1 rounded truncate max-w-[70px]"
                        >
                          {img.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn btn-primary py-2 md:py-3 uppercase tracking-wider font-bold text-xs md:text-sm"
                >
                  Submit
                </motion.button>
              </form>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-xs md:text-sm mb-3">
                  Please log in to write a review.
                </p>
                <Link to="/login" className="btn btn-outline py-2 px-4 text-xs md:text-sm">
                  Sign In
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
