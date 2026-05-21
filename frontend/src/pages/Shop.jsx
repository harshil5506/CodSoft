import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import ProductCard from "../components/product/ProductCard";
import { formatLabel } from "../utils/formatText";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = "/products";
        const params = [];
        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (search) params.push(`keyword=${search}`);
        if (params.length > 0) url += `?${params.join("&")}`;

        console.log("Fetching from URL:", url);
        const { data } = await api.get(url);
        console.log("API Response:", data);
        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch products",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 min-h-[60vh] px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8 md:mb-12"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-2 sm:mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          {category ? formatLabel(category) : search ? `Search: ${search}` : "All Products"}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          Showing {products.length}{" "}
          {products.length === 1 ? "result" : "results"}
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Mobile Filter Toggle */}
        <motion.button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden text-sm font-bold uppercase tracking-wider mb-4 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          {showFilters ? "✕ Hide Filters" : "☰ Show Filters"}
        </motion.button>

        {/* Filters Sidebar */}
        <motion.div
          initial={false}
          animate={{
            height: showFilters ? "auto" : 0,
            opacity: showFilters ? 1 : 0,
            marginBottom: showFilters ? 16 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:animate-none overflow-hidden lg:overflow-visible lg:mb-0 w-full lg:w-48 xl:w-64 flex-shrink-0"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full"
          >
            <div className="sticky top-24 space-y-6 sm:space-y-8 bg-card lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-0 border-border">
              <div>
                <h3 className="font-bold uppercase tracking-wider mb-3 sm:mb-4 border-b-2 border-primary pb-2 text-sm md:text-base">
                  Categories
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <motion.li
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <button
                      onClick={() => {
                        setSearchParams({});
                        setShowFilters(false);
                      }}
                      className={`hover:text-primary transition-colors ${!category ? "font-bold text-primary" : "text-muted-foreground"}`}
                    >
                      All
                    </button>
                  </motion.li>
                  {["Apparel", "Supplements", "Equipment", "Accessories"].map(
                    (cat) => (
                      <motion.li
                        key={cat}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <button
                          onClick={() => {
                            setSearchParams({ category: cat });
                            setShowFilters(false);
                          }}
                          className={`hover:text-primary transition-colors ${formatLabel(category) === cat ? "font-bold text-primary" : "text-muted-foreground"}`}
                        >
                          {cat}
                        </button>
                      </motion.li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 w-full"
        >
          {loading ? (
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
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 py-12 sm:py-16 md:py-20 text-center text-sm sm:text-base"
            >
              {error}
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-16 md:py-20"
            >
              <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">
                No products found
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                Try adjusting your filters or search term.
              </p>
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
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, ease: "easeOut" },
                    },
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
