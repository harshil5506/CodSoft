import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Orders are processed within 1-2 business days. Express shipping takes 2-4 business days, while standard shipping takes 5-7 business days depending on your location.",
    },
    {
      q: "What is your return policy?",
      a: "We offer a 30-day hassle-free return policy on all unworn apparel with original tags attached, and unopened supplement tubs. Return shipping is free.",
    },
    {
      q: "Are your supplements third-party tested?",
      a: "Yes, all HYPERFIT sports nutrition products are third-party lab tested for purity, heavy metals, and banned substances. We publish our lab certificates on our product pages.",
    },
    {
      q: "Can I change or cancel my order?",
      a: "Orders are processed instantly. Please contact us via email within 30 minutes of placing the order if you need to modify shipping addresses or cancel.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4 sm:px-6 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-6 sm:mb-8 md:mb-10 text-center"
        >
          FAQ
        </motion.h1>

        <motion.div
          className="space-y-2 sm:space-y-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3 },
                },
              }}
              className="border border-border rounded-lg overflow-hidden"
            >
              <motion.button
                onClick={() => toggle(index)}
                whileHover={{ backgroundColor: "var(--muted-50)" }}
                className="w-full text-left p-3 sm:p-4 md:p-6 flex justify-between items-start sm:items-center gap-3 focus:outline-none transition-colors"
              >
                <span className="font-bold text-sm sm:text-base md:text-lg leading-tight">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg sm:text-xl font-medium flex-shrink-0"
                >
                  {openIndex === index ? "−" : "+"}
                </motion.span>
              </motion.button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border pt-2 sm:pt-3 md:pt-4">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FAQ;
