import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let defaultAttr = '';
    if (product.attributes && product.attributes.length > 0) {
      defaultAttr = product.attributes[0].value.split(', ')[0];
    }
    dispatch(addItemToCart({ productId: product._id, quantity: 1, attribute: defaultAttr }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]?.url || 'https://via.placeholder.com/400x500'}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.comparePrice > product.price && (
            <span className="bg-foreground text-background text-xs font-bold px-2 py-1 uppercase">
              Sale
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 uppercase">
              Featured
            </span>
          )}
        </div>

        {/* Hover Action */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button 
            onClick={handleQuickAdd}
            className="w-full btn btn-primary py-3 uppercase text-sm tracking-wider shadow-lg"
          >
            {added ? 'Added!' : 'Quick Add'}
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
          {product.category}
        </div>
        <Link to={`/product/${product.slug}`} className="hover:underline underline-offset-2 mb-1">
          <h3 className="font-display font-bold text-lg leading-tight truncate">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="font-medium">₹{product.price}</span>
          {product.comparePrice > product.price && (
            <span className="text-muted-foreground line-through text-sm">
              ₹{product.comparePrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
