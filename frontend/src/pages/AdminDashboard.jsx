import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states for creating products
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Apparel',
    stock: '',
    brand: 'HYPERFIT',
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const { data: statsData } = await api.get('/admin/dashboard');
        setStats(statsData);
        setOrders(statsData.recentOrders || []);

        const { data: productsData } = await api.get('/products');
        setProducts(productsData.products || []);

        const { data: usersData } = await api.get('/admin/users');
        setUsers(usersData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/admin/products', newProduct);
      setProducts([data, ...products]);
      alert('Product created successfully!');
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: 'Apparel',
        stock: '',
        brand: 'HYPERFIT',
      });
    } catch (err) {
      console.error(err);
      alert('Error creating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-24 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="border-b border-border pb-8 mb-12">
        <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Admin Portal</span>
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter mt-1">
          System Control
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="border border-border p-6 bg-card">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Total Products</span>
          <h3 className="text-3xl font-display font-bold mt-2">{stats?.totalProducts}</h3>
        </div>
        <div className="border border-border p-6 bg-card">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Total Orders</span>
          <h3 className="text-3xl font-display font-bold mt-2">{stats?.totalOrders}</h3>
        </div>
        <div className="border border-border p-6 bg-card">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Total Users</span>
          <h3 className="text-3xl font-display font-bold mt-2">{stats?.totalUsers}</h3>
        </div>
        <div className="border border-border p-6 bg-card">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Revenue</span>
          <h3 className="text-3xl font-display font-bold mt-2">₹{stats?.totalRevenue}</h3>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="flex lg:flex-col gap-2 border-b lg:border-b-0 lg:border-r border-border pb-4 lg:pb-0 lg:pr-6">
            {['products', 'orders', 'users'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-left font-display font-bold uppercase tracking-wider text-sm transition-colors ${
                  activeTab === tab 
                    ? 'bg-primary text-primary-foreground border border-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Panels */}
        <div className="flex-grow">
          {activeTab === 'products' && (
            <div className="space-y-12">
              {/* Product Creation Form */}
              <div className="border border-border p-6 bg-card">
                <h3 className="text-2xl font-display font-bold uppercase tracking-tighter mb-6">Create New Product</h3>
                <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-2">Product Name</label>
                    <input required type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-2">Category</label>
                    <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary">
                      {['Apparel', 'Supplements', 'Equipment', 'Accessories'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-2">Price (INR)</label>
                    <input required type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold mb-2">Stock</label>
                    <input required type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-bold mb-2">Description</label>
                    <textarea required rows="4" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="bg-muted border border-border rounded-md px-4 py-3 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary resize-none"></textarea>
                  </div>
                  <button type="submit" className="sm:col-span-2 btn btn-primary py-4 uppercase font-bold tracking-widest">
                    Create Product
                  </button>
                </form>
              </div>

              {/* Product List */}
              <div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tighter mb-6">Existing Inventory</h3>
                <div className="space-y-4">
                  {products.map((p) => (
                    <div key={p._id} className="border border-border p-4 flex justify-between items-center bg-card">
                      <div>
                        <h4 className="font-bold text-lg">{p.name}</h4>
                        <span className="text-xs text-muted-foreground uppercase tracking-widest">{p.category} | Stock: {p.stock}</span>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={() => handleDeleteProduct(p._id)} className="text-xs text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tighter mb-6">Incoming Orders</h3>
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o._id} className="border border-border p-6 bg-card flex justify-between items-start">
                    <div>
                      <span className="font-mono text-sm block mb-1">ID: {o._id}</span>
                      <span className="text-sm block">Customer: {o.user?.name} ({o.user?.email})</span>
                      <span className="text-sm block font-bold mt-2">Total: ₹{o.totalAmount}</span>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground px-3 py-1 mb-2">
                        {o.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tighter mb-6">Registered Users</h3>
              <div className="space-y-4">
                {users.map((u) => (
                  <div key={u._id} className="border border-border p-4 bg-card flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg">{u.name}</h4>
                      <span className="text-xs text-muted-foreground">{u.email}</span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-bold bg-muted px-3 py-1 border border-border rounded-full">
                        {u.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
