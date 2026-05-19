import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: 'Apparel',
      description: 'Performance streetwear, engineered compression wear, and athletic training garments.',
      image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=600&auto=format&fit=crop',
      link: '/shop?category=Apparel',
      count: '4 Items'
    },
    {
      name: 'Supplements',
      description: 'Ultra-pure proteins, scientifically formulated pre-workouts, creatine, and daily wellness nutrition.',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop',
      link: '/shop?category=Supplements',
      count: '6 Items'
    },
    {
      name: 'Equipment',
      description: 'Adjustable dumbbells, premium heavy-duty resistance bands, and athletic mats for home training.',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop',
      link: '/shop?category=Equipment',
      count: '4 Items'
    },
    {
      name: 'Accessories',
      description: 'Powerlifting belts, cotton straps, shaker bottles, and gym tools built for maximum durability.',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=600&auto=format&fit=crop',
      link: '/shop?category=Accessories',
      count: '3 Items'
    }
  ];

  return (
    <div className="container-custom py-12">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-4">
          Categories
        </h1>
        <p className="text-muted-foreground max-w-lg">
          Browse our collections of premium training gear, sports supplements, and recovery products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <Link 
            key={cat.name} 
            to={cat.link}
            className="group relative h-[350px] overflow-hidden bg-muted flex items-end p-8 border border-border"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" 
            />
            
            <div className="relative z-20 text-white">
              <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">{cat.count}</span>
              <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-2">{cat.name}</h2>
              <p className="text-sm text-gray-300 max-w-sm transition-opacity duration-300 opacity-80 group-hover:opacity-100">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
