import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      _id: '1',
      name: 'HyperWhey Pro — Chocolate Fudge',
      price: 2999,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=600&auto=format&fit=crop',
      attribute: '1kg'
    }
  ]);

  const updateQty = (id, newQty) => {
    setCartItems(cartItems.map(item => item._id === id ? { ...item, quantity: Math.max(1, newQty) } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

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
                <div className="w-24 h-24 bg-muted flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg leading-tight mb-1">{item.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{item.attribute}</p>
                    <span className="font-semibold text-sm">₹{item.price}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border">
                      <button onClick={() => updateQty(item._id, item.quantity - 1)} className="px-2 py-1 hover:bg-muted">-</button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, item.quantity + 1)} className="px-2 py-1 hover:bg-muted">+</button>
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
