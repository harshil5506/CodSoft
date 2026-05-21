import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const linkVariants = {
    rest: { color: "rgb(var(--color-muted-foreground))" },
    hover: {
      color: "rgb(var(--color-foreground))",
      transition: { duration: 0.2 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-background border-t border-border pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div variants={columnVariants} className="md:col-span-1">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-display text-xl sm:text-2xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              HYPERFIT.
            </motion.h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium fitness apparel and supplements for the modern athlete.
              Elevate your performance.
            </p>
          </motion.div>

          <motion.div variants={columnVariants}>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { href: "/shop?category=supplements", label: "Supplements" },
                { href: "/shop?category=apparel", label: "Apparel" },
                { href: "/shop?category=accessories", label: "Accessories" },
                { href: "/shop?sale=true", label: "Sale" },
              ].map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                    className="transition-colors"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={columnVariants}>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { href: "/faq", label: "FAQ" },
                { href: "/track-orders", label: "Track Orders" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    variants={linkVariants}
                    initial="rest"
                    whileHover="hover"
                    className="transition-colors"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={columnVariants}>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
              Join Us
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <motion.form
              className="flex flex-col xl:flex-row gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-muted border border-border rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-border pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HYPERFIT. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm text-muted-foreground">
            {[
              { href: "/privacy", label: "Privacy Policy" },
              { href: "/terms", label: "Terms of Service" },
            ].map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                variants={linkVariants}
                initial="rest"
                whileHover="hover"
                className="transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
