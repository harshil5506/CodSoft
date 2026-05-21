import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { registerUser, clearError } from "../store/slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="container-custom py-8 sm:py-12 md:py-24 flex items-center justify-center min-h-[80vh] px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md border border-border p-4 sm:p-6 md:p-8 bg-card rounded-lg"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-4 sm:mb-6 md:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter mb-1 sm:mb-2">
            Register
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Join HyperFit to purchase premium supplements & gear.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm mb-4 sm:mb-6 text-center rounded"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block text-xs uppercase tracking-wider font-bold mb-1.5 sm:mb-2">
              Full Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="bg-muted border border-border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base w-full focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-xs uppercase tracking-wider font-bold mb-1.5 sm:mb-2">
              Email Address
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="bg-muted border border-border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base w-full focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block text-xs uppercase tracking-wider font-bold mb-1.5 sm:mb-2">
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-muted border border-border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base w-full focus:outline-none focus:ring-1 focus:ring-primary pr-8 sm:pr-10"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
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
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </motion.button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: 0.3 }}
            className="w-full btn btn-primary py-2.5 sm:py-3 md:py-4 uppercase font-bold tracking-widest disabled:opacity-50 text-xs sm:text-sm md:text-base mt-2 sm:mt-4 md:mt-6"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 sm:mt-6 md:mt-8 text-center text-xs sm:text-sm text-muted-foreground"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-foreground font-medium hover:underline underline-offset-2"
          >
            Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
