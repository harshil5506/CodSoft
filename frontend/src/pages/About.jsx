import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-6 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-3 sm:mb-4"
        >
          Our Mission
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tighter mb-4 sm:mb-6 md:mb-8 leading-tight"
        >
          WE EXIST TO FUEL <br />
          YOUR ABSOLUTE LIMITS.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed"
        >
          HyperFit is built for the new era of athletes. We reject over-hyped
          marketing, under-dosed formulas, and low-quality materials. We deliver
          honest, premium, and minimalist products that optimize recovery,
          performance, and style.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20 lg:mb-24 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter mb-3 sm:mb-4 md:mb-6">
            Honest Formulations
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4 md:mb-6">
            All our sports nutrition supplements are cold-processed,
            manufactured in GMP-certified facilities, and undergo strict
            third-party lab testing. What you see on the label is exactly what
            you get. No proprietary blends. No fillers.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            Our apparel is built from the ground up, selecting performance
            fabric compositions with sweat-wicking fibers and multi-directional
            stretch to sustain high-intensity workouts.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-muted aspect-[4/3] overflow-hidden rounded-lg"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
            alt="Training session"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
