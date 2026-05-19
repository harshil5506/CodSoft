import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/product/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category = searchParams.get('category');
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = '/products';
        const params = [];
        if (category) params.push(`category=${category}`);
        if (search) params.push(`keyword=${search}`);
        if (params.length > 0) url += `?${params.join('&')}`;

        const { data } = await api.get(url);
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  return (
    <div className="container-custom py-12 min-h-[60vh]">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mb-4">
          {category ? category : search ? `Search: ${search}` : 'All Products'}
        </h1>
        <p className="text-muted-foreground">
          Showing {products.length} {products.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar (simplified for now) */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-bold uppercase tracking-wider mb-4 border-b border-border pb-2">Categories</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => setSearchParams({})} className={`hover:text-primary transition-colors ${!category ? 'font-bold' : 'text-muted-foreground'}`}>
                    All
                  </button>
                </li>
                {['Apparel', 'Supplements', 'Equipment', 'Accessories'].map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setSearchParams({ category: cat })}
                      className={`hover:text-primary transition-colors ${category === cat ? 'font-bold' : 'text-muted-foreground'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="animate-pulse">
                  <div className="bg-muted aspect-[4/5] mb-4"></div>
                  <div className="h-4 bg-muted w-2/3 mb-2"></div>
                  <div className="h-4 bg-muted w-1/3"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 py-8 text-center">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-display font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
