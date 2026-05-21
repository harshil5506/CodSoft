import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4 sm:px-6 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
            Drop us a message below or email us at support@hyperfit.co. We'll
            get back to you within 24 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-muted border border-border p-4 sm:p-6 md:p-8 text-center rounded-lg"
          >
            <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold mb-2 sm:mb-3">
              Message Sent!
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6">
              Thank you for reaching out. A support team representative will
              contact you shortly.
            </p>
            <motion.button
              onClick={() => setSubmitted(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider"
            >
              Send another message
            </motion.button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 md:space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-xs uppercase tracking-wider font-bold mb-1.5 sm:mb-2">
                  Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  className="bg-muted border border-border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-xs uppercase tracking-wider font-bold mb-1.5 sm:mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="bg-muted border border-border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-xs uppercase tracking-wider font-bold mb-1.5 sm:mb-2">
                Subject
              </label>
              <input
                required
                type="text"
                placeholder="Query subject"
                className="bg-muted border border-border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-xs uppercase tracking-wider font-bold mb-1.5 sm:mb-2">
                Message
              </label>
              <textarea
                required
                rows="5"
                placeholder="Write your message here..."
                className="bg-muted border border-border rounded-md px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base w-full focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: 0.35 }}
              className="w-full btn btn-primary py-2.5 sm:py-3 md:py-4 uppercase font-bold tracking-widest text-xs sm:text-sm md:text-base"
            >
              Send Message
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;
