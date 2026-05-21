import React, { useState, useEffect } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [pendingSellers, setPendingSellers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Search, pagination, edit states
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const itemsPerPage = 10;

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Apparel",
    stock: "",
    brand: "HYPERFIT",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const { data: statsData } = await api.get("/admin/dashboard");
        setStats(statsData);
        setOrders(statsData.recentOrders || []);

        const { data: productsData } = await api.get("/products");
        setProducts(productsData.products || []);

        const { data: usersData } = await api.get("/admin/users");
        setUsers(usersData || []);

        const { data: sellersData } = await api.get("/admin/sellers/pending");
        setPendingSellers(sellersData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  // Create product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/admin/products", newProduct);
      setProducts([data, ...products]);
      alert("✅ Product created!");
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "Apparel",
        stock: "",
        brand: "HYPERFIT",
      });
    } catch (err) {
      alert("❌ Error creating product");
    }
  };

  // Edit product
  const handleEditProduct = async (id) => {
    try {
      const { data } = await api.put(`/admin/products/${id}`, editingProduct);
      setProducts(products.map((p) => (p._id === id ? data : p)));
      setEditingProduct(null);
      alert("✅ Product updated!");
    } catch (err) {
      alert("❌ Error updating product");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("✅ Product deleted!");
    } catch (err) {
      alert("❌ Error");
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const { data } = await api.put(`/admin/orders/${orderId}/status`, {
        status: newStatus,
      });
      setOrders(orders.map((o) => (o._id === orderId ? data : o)));
      alert("✅ Order status updated!");
    } catch (err) {
      alert("❌ Error updating status");
    }
  };

  // Seller actions
  const handleApproveSeller = async (id) => {
    try {
      await api.put(`/admin/sellers/${id}/status`, { status: "approved" });
      setPendingSellers(pendingSellers.filter((s) => s._id !== id));
      alert("✅ Seller approved!");
    } catch (err) {
      alert("❌ Error");
    }
  };

  const handleRejectSeller = async (id) => {
    try {
      await api.put(`/admin/sellers/${id}/status`, { status: "rejected" });
      setPendingSellers(pendingSellers.filter((s) => s._id !== id));
      alert("✅ Seller rejected!");
    } catch (err) {
      alert("❌ Error");
    }
  };

  // Filter logic
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredOrders = orders.filter(
    (o) =>
      o.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user?.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const getPaginated = (items) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };
  const getTotalPages = (items) => Math.ceil(items.length / itemsPerPage);

  if (loading) {
    return (
      <div className="container-custom py-12 md:py-24 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12">
      <div className="border-b border-border pb-4 sm:pb-6 md:pb-8 mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tighter">
          Admin Dashboard
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12">
        <div className="border border-border p-4 sm:p-5 md:p-6 bg-card rounded">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
            Products
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold mt-2">
            {stats?.totalProducts}
          </h3>
        </div>
        <div className="border border-border p-4 sm:p-5 md:p-6 bg-card rounded">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
            Orders
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold mt-2">
            {stats?.totalOrders}
          </h3>
        </div>
        <div className="border border-border p-4 sm:p-5 md:p-6 bg-card rounded">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
            Users
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold mt-2">
            {stats?.totalUsers}
          </h3>
        </div>
        <div className="border border-border p-4 sm:p-5 md:p-6 bg-card rounded">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
            Revenue
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold mt-2">
            ₹{stats?.totalRevenue}
          </h3>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="w-full bg-muted border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
        {/* Tabs */}
        <div className="w-full lg:w-48 flex-shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
            {["products", "orders", "users", "sellers"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 text-left font-bold uppercase text-xs sm:text-sm rounded transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-border"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0 space-y-6">
          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Create */}
              <div className="border border-border p-4 sm:p-6 bg-card rounded">
                <h3 className="text-lg sm:text-xl font-bold mb-4">➕ Create Product</h3>
                <form
                  onSubmit={handleCreateProduct}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="bg-muted border border-border rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    required
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="bg-muted border border-border rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    required
                    type="number"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    className="bg-muted border border-border rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="bg-muted border border-border rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {["Apparel", "Supplements", "Equipment", "Accessories"].map(
                      (c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ),
                    )}
                  </select>
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="sm:col-span-2 bg-muted border border-border rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    rows="3"
                  ></textarea>
                  <button
                    type="submit"
                    className="sm:col-span-2 btn btn-primary py-2"
                  >
                    Create
                  </button>
                </form>
              </div>

              {/* List */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-4">
                  📦 Products ({filteredProducts.length})
                </h3>
                {editingProduct && (
                  <div className="border border-border p-3 sm:p-4 bg-card rounded mb-4">
                    <div className="grid gap-3">
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                        className="bg-muted border border-border rounded px-3 py-2 text-sm w-full"
                      />
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: e.target.value,
                          })
                        }
                        className="bg-muted border border-border rounded px-3 py-2 text-sm w-full"
                      />
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            stock: e.target.value,
                          })
                        }
                        className="bg-muted border border-border rounded px-3 py-2 text-sm w-full"
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEditProduct(editingProduct._id)}
                          className="flex-1 btn btn-primary py-2 text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="flex-1 btn btn-outline py-2 text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  {getPaginated(filteredProducts).map((p) => (
                    <div
                      key={p._id}
                      className="border border-border p-3 sm:p-4 bg-card rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                    >
                      <div className="min-w-0 w-full">
                        <h4 className="font-bold break-words">{p.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          ₹{p.price} | Stock: {p.stock}
                        </p>
                      </div>
                      <div className="flex gap-3 sm:gap-2 self-start sm:self-center flex-shrink-0">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="text-xs text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {Array.from({ length: getTotalPages(filteredProducts) }).map(
                    (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 text-sm rounded ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        {i + 1}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">
                📋 Orders ({filteredOrders.length})
              </h3>
              <div className="space-y-3">
                {getPaginated(filteredOrders).map((o) => (
                  <div
                    key={o._id}
                    className="border border-border p-4 bg-card rounded"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
                      <div className="min-w-0">
                        <p className="font-bold break-words">
                          {o.user?.name} ({o.user?.email})
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₹{o.totalAmount} | {o.orderItems.length} items
                        </p>
                      </div>
                      <select
                        value={o.orderStatus}
                        onChange={(e) =>
                          handleUpdateOrderStatus(o._id, e.target.value)
                        }
                        className="bg-muted border border-primary rounded px-3 py-1 text-xs font-bold w-full sm:w-auto"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      📍 {o.shippingAddress?.city}, {o.shippingAddress?.state}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {Array.from({ length: getTotalPages(filteredOrders) }).map(
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-1 text-sm rounded ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      {i + 1}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">
                👥 Users ({filteredUsers.length})
              </h3>
              <div className="space-y-2">
                {getPaginated(filteredUsers).map((u) => (
                  <div
                    key={u._id}
                    className="border border-border p-3 bg-card rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                  >
                    <div className="min-w-0 w-full">
                      <p className="font-bold text-sm">{u.name}</p>
                      <p className="text-xs text-muted-foreground break-all">{u.email}</p>
                    </div>
                    <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-1 rounded">
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {Array.from({ length: getTotalPages(filteredUsers) }).map(
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-1 text-sm rounded ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      {i + 1}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {activeTab === "sellers" && (
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">
                🏪 Pending Sellers ({pendingSellers.length})
              </h3>
              {pendingSellers.length === 0 ? (
                <p className="text-muted-foreground">No pending applications</p>
              ) : (
                <div className="space-y-4">
                  {pendingSellers.map((s) => (
                    <div
                      key={s._id}
                      className="border border-border p-4 bg-card rounded"
                    >
                      <h4 className="font-bold mb-2">
                        {s.businessDetails?.companyName}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {s.name} | {s.email}
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Tax ID: {s.businessDetails?.taxId}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleApproveSeller(s._id)}
                          className="flex-1 btn btn-primary py-2 text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectSeller(s._id)}
                          className="flex-1 btn btn-outline py-2 text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
