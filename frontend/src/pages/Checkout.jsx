import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock successful order request creation via order API
      const orderPayload = {
        shippingAddress,
        paymentInfo: {
          razorpayOrderId: 'order_' + Math.random().toString(36).substr(2, 9),
          razorpayPaymentId: 'pay_' + Math.random().toString(36).substr(2, 9),
          razorpaySignature: 'sig_' + Math.random().toString(36).substr(2, 9),
          status: 'Completed'
        }
      };

      await api.post('/orders', orderPayload);
      alert('Order Placed Successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="mb-12 border-b border-border pb-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handlePayment} className="space-y-6">
          <h2 className="text-2xl font-display font-bold uppercase tracking-tighter">Shipping Address</h2>
          
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold mb-2">Street Address</label>
            <input required type="text" name="street" value={shippingAddress.street} onChange={handleInputChange} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2">City</label>
              <input required type="text" name="city" value={shippingAddress.city} onChange={handleInputChange} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2">State</label>
              <input required type="text" name="state" value={shippingAddress.state} onChange={handleInputChange} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2">Zip Code</label>
              <input required type="text" name="zipCode" value={shippingAddress.zipCode} onChange={handleInputChange} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold mb-2">Phone Number</label>
              <input required type="text" name="phone" value={shippingAddress.phone} onChange={handleInputChange} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-4 uppercase font-bold tracking-widest disabled:opacity-50"
          >
            {loading ? 'Processing Order...' : 'Place Order (COD/Mock Pay)'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
