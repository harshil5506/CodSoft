import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttribute, setSelectedAttribute] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/slug/${slug}`);
        setProduct(data);
        if (data.attributes && data.attributes.length > 0) {
          // If there is an attribute like Sizes or Flavors, set the first choice as default
          const values = data.attributes[0].value.split(', ');
          setSelectedAttribute(values[0]);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container-custom py-24 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-muted aspect-[4/5]"></div>
          <div className="space-y-6">
            <div className="h-8 bg-muted w-3/4"></div>
            <div className="h-6 bg-muted w-1/4"></div>
            <div className="h-24 bg-muted w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-24 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">{error || 'Product not found'}</h2>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Dispatch to Redux or use API call
    console.log(`Add to cart: ${product.name}, Qty: ${quantity}, Attr: ${selectedAttribute}`);
  };

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Product Images */}
        <div className="bg-card border border-border p-4 aspect-[4/5] flex items-center justify-center overflow-hidden">
          <img
            src={product.images[0]?.url || 'https://via.placeholder.com/600x750'}
            alt={product.name}
            className="object-cover max-h-full w-auto"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
            {product.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold">₹{product.price}</span>
            {product.comparePrice > product.price && (
              <span className="text-muted-foreground line-through text-lg">
                ₹{product.comparePrice}
              </span>
            )}
          </div>

          <div className="border-t border-b border-border py-6 mb-8">
            <h3 className="font-bold mb-2">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Attributes Selection */}
          {product.attributes && product.attributes.map((attr) => {
            const options = attr.value.split(', ');
            return (
              <div key={attr.key} className="mb-6">
                <h3 className="font-bold mb-3 uppercase text-sm tracking-wider">{attr.key}</h3>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedAttribute(option)}
                      className={`px-4 py-2 border text-sm font-medium transition-colors ${
                        selectedAttribute === option
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background hover:bg-muted text-foreground'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Quantity Selector */}
          <div className="mb-8">
            <h3 className="font-bold mb-3 uppercase text-sm tracking-wider">Quantity</h3>
            <div className="flex items-center border border-border w-32 justify-between">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 text-lg hover:bg-muted transition-colors"
              >
                -
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 text-lg hover:bg-muted transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary w-full py-4 text-center font-bold tracking-widest uppercase mb-4"
          >
            Add to Cart
          </button>
          
          <button className="btn btn-outline w-full py-4 text-center font-bold tracking-widest uppercase">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
