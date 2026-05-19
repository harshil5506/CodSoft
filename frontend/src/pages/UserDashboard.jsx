import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import api from '../services/api';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border pb-8 mb-12 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Account Portal</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mt-1">
            Welcome, {user?.name || 'Athlete'}
          </h1>
        </div>
        <button onClick={handleLogout} className="btn btn-outline py-3">
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Account Details */}
        <div className="border border-border p-6 bg-card">
          <h2 className="text-2xl font-display font-bold uppercase tracking-tighter mb-6">Account Details</h2>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold mb-1">Name</span>
              <span className="font-medium text-lg">{user?.name}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold mb-1">Email Address</span>
              <span className="font-medium text-lg">{user?.email}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs uppercase tracking-wider font-bold mb-1">Account Role</span>
              <span className="font-medium text-lg capitalize">{user?.role}</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-display font-bold uppercase tracking-tighter mb-6">Recent Orders</h2>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2].map((n) => (
                <div key={n} className="h-24 bg-muted w-full border border-border"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="border border-border p-8 text-center text-muted-foreground">
              You haven't placed any orders yet.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="border border-border p-6 flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium block">Order ID</span>
                    <span className="font-mono text-sm block mb-2">{order._id}</span>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium block">Items</span>
                    <ul className="text-sm list-disc pl-4 space-y-1">
                      {order.orderItems.map((item) => (
                        <li key={item._id}>
                          {item.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:text-right flex flex-col justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium block">Total Amount</span>
                      <span className="text-lg font-bold">₹{order.totalAmount}</span>
                    </div>
                    <div className="mt-4">
                      <span className={`inline-block text-xs uppercase tracking-wider font-bold px-3 py-1 ${
                        order.orderStatus === 'Delivered' 
                          ? 'bg-green-500/10 text-green-500 border border-green-500' 
                          : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
