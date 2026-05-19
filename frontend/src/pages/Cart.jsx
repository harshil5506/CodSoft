import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, updateItemQty, removeItemFromCart } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateItemQty({ itemId: id, quantity: newQty }));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + (price * item.quantity);
  }, 0);

  if (loading && cartItems.length === 0) {
    return (
      <div className="container-custom py-24 text-center">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted w-1/4 mx-auto"></div>
          <div className="h-4 bg-muted w-2/4 mx-auto"></div>
          <div className="h-64 bg-muted w-full max-w-4xl mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="mb-12 border-b border-border pb-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">Your Bag</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-display font-bold mb-4">Your bag is empty</h2>
          <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-6 border border-border p-4 bg-card">
                <div className="w-24 h-24 bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img 
                    src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/400x500'} 
                    alt={item.product?.name || 'Product'} 
                    className="w-auto max-h-full object-cover" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg leading-tight mb-1">
                      {item.product ? (
                        <Link to={`/product/${item.product.slug}`} className="hover:underline">
                          {item.product.name}
                        </Link>
                      ) : (
                        'Product details unavailable'
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.attribute}</p>
                    <span className="font-semibold text-sm">₹{item.product?.price || 0}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border">
                      <button 
                        onClick={() => updateQty(item._id, item.quantity - 1)} 
                        className="px-2 py-1 hover:bg-muted"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQty(item._id, item.quantity + 1)} 
                        className="px-2 py-1 hover:bg-muted"
                      >
                        +
                      </button>
                    </div>
                    
                    <button onClick={() => removeItem(item._id)} className="text-xs text-red-500 hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border border-border p-6 bg-card h-fit space-y-6">
            <h2 className="text-2xl font-display font-bold uppercase tracking-tighter pb-4 border-b border-border">Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span className="font-medium text-green-500">FREE</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between text-base font-bold">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="w-full btn btn-primary py-4 uppercase font-bold tracking-widest text-center block">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
