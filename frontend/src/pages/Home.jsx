import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
        </div>
        
        <div className="container-custom relative z-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter uppercase mb-6"
          >
            Defy <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
              Limits
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Premium fitness apparel and supplements engineered for the modern athlete. 
            Designed to be worn. Built to perform.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="/shop" className="btn btn-primary w-full sm:w-auto text-lg px-8 py-4">
              Shop Collection
            </a>
            <a href="/about" className="btn btn-outline w-full sm:w-auto text-lg px-8 py-4">
              Our Story
            </a>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - Minimalist approach */}
      <section className="py-24 bg-card">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">
              Explore
            </h2>
            <a href="/categories" className="text-sm font-medium hover:underline underline-offset-4 hidden md:block">
              View All Categories
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category Cards */}
            <a href="/shop?category=apparel" className="group relative h-[400px] overflow-hidden bg-muted flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80" />
              <img src="https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=2041&auto=format&fit=crop" alt="Apparel" className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
              <h3 className="relative z-20 text-3xl font-display font-bold text-white uppercase tracking-tighter">Apparel</h3>
            </a>
            
            <a href="/shop?category=supplements" className="group relative h-[400px] overflow-hidden bg-muted flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80" />
              <img src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2070&auto=format&fit=crop" alt="Supplements" className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
              <h3 className="relative z-20 text-3xl font-display font-bold text-white uppercase tracking-tighter">Supplements</h3>
            </a>
            
            <a href="/shop?category=equipment" className="group relative h-[400px] overflow-hidden bg-muted flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-80" />
              <img src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop" alt="Equipment" className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
              <h3 className="relative z-20 text-3xl font-display font-bold text-white uppercase tracking-tighter">Equipment</h3>
            </a>
          </div>
        </div>
      </section>

      {/* Signature Collection Marquee or Banner */}
      <section className="py-24 border-y border-border overflow-hidden">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter mb-6">
            Signature Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-lg">
            A celebration of minimalism, functionality, and pure performance. 
            No distractions, just the essentials you need to reach your peak.
          </p>
          <a href="/shop?collection=signature" className="btn btn-primary">
            View Lookbook
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
