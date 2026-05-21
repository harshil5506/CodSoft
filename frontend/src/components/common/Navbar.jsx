import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectCartCount } from "../../store/slices/cartSlice";
import { selectWishlistCount } from "../../store/slices/wishlistSlice";

const Navbar = () => {
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const showBackButton =
    location.pathname !== "/" &&
    location.pathname !== "/shop" &&
    location.pathname !== "/categories";

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const linkVariants = {
    idle: { color: "rgb(var(--color-muted-foreground))" },
    hover: { color: "rgb(var(--color-foreground))", transition: { duration: 0.2 } }
  };

  const iconVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500 } }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="container-custom py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 min-w-0">
          {showBackButton && (
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 flex-shrink-0"
              title="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="font-display text-xl sm:text-2xl font-bold tracking-tighter bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent whitespace-nowrap"
            >
              HYPERFIT.
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              { to: "/shop", label: "Shop" },
              { to: "/categories", label: "Categories" },
              { to: "/about", label: "About" }
            ].map((link) => (
              <motion.div
                key={link.to}
                variants={linkVariants}
                initial="idle"
                whileHover="hover"
              >
                <Link
                  to={link.to}
                  className="relative group text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
          {/* Interactive Search */}
          <motion.div
            initial={false}
            animate={{ width: searchOpen ? "clamp(8.5rem, 42vw, 12.5rem)" : 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative"
          >
            {searchOpen ? (
              <motion.form
                onSubmit={handleSearchSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center border border-primary/30 bg-muted rounded-md px-2 py-1 gap-1 w-full"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                  className="bg-transparent text-sm flex-1 min-w-0 focus:outline-none placeholder-muted-foreground"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-1 hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  className="p-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </motion.button>
              </motion.form>
            ) : (
              <motion.button
                onClick={() => setSearchOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </motion.button>
            )}
          </motion.div>

          {user?.role === "admin" && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/admin"
                className="items-center text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/50 hover:bg-primary/10 transition-colors px-2 py-1 rounded flex"
              >
                Admin
              </Link>
            </motion.div>
          )}

          <motion.div
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </motion.div>

          {isAuthenticated && (
            <motion.div
              variants={iconVariants}
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                to="/wishlist"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
              {wishlistCount > 0 && (
                <motion.span
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </motion.div>
          )}

          <motion.div
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link
              to="/cart"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </Link>
            {cartCount > 0 && (
              <motion.span
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
