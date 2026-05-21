import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
  const categories = [
    {
      name: "Apparel",
      description:
        "Performance streetwear, engineered compression wear, and athletic training garments.",
      image:
        "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Apparel",
      count: "4 Items",
    },
    {
      name: "Supplements",
      description:
        "Ultra-pure proteins, scientifically formulated pre-workouts, creatine, and daily wellness nutrition.",
      image:
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Supplements",
      count: "6 Items",
    },
    {
      name: "Equipment",
      description:
        "Adjustable dumbbells, premium heavy-duty resistance bands, and athletic mats for home training.",
      image:
        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Equipment",
      count: "4 Items",
    },
    {
      name: "Accessories",
      description:
        "Powerlifting belts, cotton straps, shaker bottles, and gym tools built for maximum durability.",
      image:
        "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=600&auto=format&fit=crop",
      link: "/shop?category=Accessories",
      count: "3 Items",
    },
  ];

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4 sm:px-6 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 sm:mb-12 md:mb-16"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter mb-2 sm:mb-3 md:mb-4">
          Categories
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-lg">
          Browse our collections of premium training gear, sports supplements,
          and recovery products.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4 },
              },
            }}
          >
            <Link
              to={cat.link}
              className="group relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden bg-muted flex items-end p-3 sm:p-4 md:p-6 lg:p-8 border border-border rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <motion.img
                src={cat.image}
                alt={cat.name}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />

              <div className="relative z-20 text-white w-full">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground block mb-1 sm:mb-2">
                  {cat.count}
                </span>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter mb-1 sm:mb-2 line-clamp-2">
                  {cat.name}
                </h2>
                <motion.p
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  className="text-xs sm:text-sm md:text-base text-gray-300 max-w-sm transition-opacity duration-300 leading-relaxed line-clamp-2 sm:line-clamp-3"
                >
                  {cat.description}
                </motion.p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Categories;
