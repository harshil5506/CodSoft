import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter mb-2 sm:mb-3">
            Reset Password
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Enter your email address and we'll send you a recovery link.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-muted border border-border p-4 sm:p-5 md:p-6 text-center rounded-lg"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold mb-2 sm:mb-3">
              Check Your Inbox
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6">
              An email containing a reset link has been dispatched to {email}.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
            >
              <Link to="/login" className="block">
                Back to Login
              </Link>
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-6"
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
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
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

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ delay: 0.25 }}
              className="w-full btn btn-primary py-2.5 sm:py-3 md:py-4 uppercase font-bold tracking-widest text-xs sm:text-sm md:text-base mt-2 sm:mt-4 md:mt-6"
            >
              Send Recovery Link
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
