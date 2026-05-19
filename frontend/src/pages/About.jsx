import React from 'react';

const About = () => {
  return (
    <div className="container-custom py-16">
      <div className="max-w-3xl mx-auto mb-20 text-center">
        <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground block mb-4">Our Mission</span>
        <h1 className="text-5xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-8 leading-none">
          WE EXIST TO FUEL <br />YOUR ABSOLUTE LIMITS.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          HyperFit is built for the new era of athletes. We reject over-hyped marketing, 
          under-dosed formulas, and low-quality materials. We deliver honest, premium, 
          and minimalist products that optimize recovery, performance, and style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24 items-center">
        <div>
          <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-6">Honest Formulations</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            All our sports nutrition supplements are cold-processed, manufactured in GMP-certified facilities, 
            and undergo strict third-party lab testing. What you see on the label is exactly what you get. 
            No proprietary blends. No fillers.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our apparel is built from the ground up, selecting performance fabric compositions with sweat-wicking 
            fibers and multi-directional stretch to sustain high-intensity workouts.
          </p>
        </div>
        <div className="bg-muted aspect-[4/3] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop" 
            alt="Training session" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
