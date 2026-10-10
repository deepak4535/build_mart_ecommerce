
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

function Dashboard() {
  const products = useSelector(
    (state) => state.products.products || []
  );

  const orders = useSelector(
    (state) => state.orders.orders || []
  );

  const customers = useMemo(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("constructionUsers") || "[]"
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }, []);

  const totalSales = orders.reduce((sum, order) => {
    const status = String(order.status || "").toLowerCase();

    if (["cancelled", "canceled"].includes(status)) {
      return sum;
    }

    return sum + Number(order.total || 0);
  }, 0);

  const lowStock = products.filter(
    (product) => Number(product.stock || 0) <= 5
  );

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.date || 0).getTime() -
        new Date(a.date || 0).getTime()
    )
    .slice(0, 5);

  const stats = [
    {
      label: "Total Products",
      value: products.length,
      icon: "📦",
      color: "blue",
      link: "/admin/products",
      action: "Manage products",
    },
    {
      label: "Customers",
      value: customers.length,
      icon: "👥",
      color: "purple",
      link: "/admin/users",
      action: "View customers",
    },
    {
      label: "Total Orders",
      value: orders.length,
      icon: "🛒",
      color: "orange",
      link: "/admin/orders",
      action: "Manage orders",
    },
    {
      label: "Order Value",
      value: `₹${totalSales.toLocaleString("en-IN")}`,
      icon: "💰",
      color: "green",
      link: "/admin/orders",
      action: "View orders",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      <Navbar />

      <main className="admin-dashboard">
        <div className="dashboard-heading">
          <div>
            <span className="dashboard-eyebrow">
              CONSTRUCTION WORK PLACE
            </span>
            <h1>Dashboard</h1>
            <p>Monitor your store and manage daily operations.</p>
          </div>

          <Link className="dashboard-primary-button" to="/admin/add-product">
            <span>＋</span> Add Product
          </Link>
        </div>

        <section className="dashboard-stats">
          {stats.map((stat) => (
            <article
              className="dashboard-stat-card"
              key={stat.label}
            >
              <div className={`dashboard-stat-icon ${stat.color}`}>
                {stat.icon}
              </div>

              <p className="dashboard-stat-label">{stat.label}</p>

              <h2>{stat.value}</h2>

              <Link to={stat.link} className="dashboard-stat-link">
                {stat.action} <span>→</span>
              </Link>
            </article>
          ))}
        </section>

        <section className="dashboard-content-grid">
          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <div>
                <h2>Quick Actions</h2>
                <p>Common store management tasks</p>
              </div>
            </div>

            <div className="dashboard-quick-actions">
              <Link to="/admin/products" className="dashboard-action">
                <span className="dashboard-action-icon">📦</span>
                <span>
                  <strong>Products</strong>
                  <small>View and edit inventory</small>
                </span>
                <span className="dashboard-arrow">→</span>
              </Link>

              <Link to="/admin/categories" className="dashboard-action">
                <span className="dashboard-action-icon">🗂️</span>
                <span>
                  <strong>Categories</strong>
                  <small>Organize your catalogue</small>
                </span>
                <span className="dashboard-arrow">→</span>
              </Link>

              <Link to="/admin/orders" className="dashboard-action">
                <span className="dashboard-action-icon">🧾</span>
                <span>
                  <strong>Orders</strong>
                  <small>Review customer orders</small>
                </span>
                <span className="dashboard-arrow">→</span>
              </Link>

              <Link to="/admin/users" className="dashboard-action">
                <span className="dashboard-action-icon">👥</span>
                <span>
                  <strong>Customers</strong>
                  <small>View registered accounts</small>
                </span>
                <span className="dashboard-arrow">→</span>
              </Link>
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <div>
                <h2>Stock Alerts</h2>
                <p>Products with 5 or fewer units</p>
              </div>

              <span className="dashboard-count-badge">
                {lowStock.length}
              </span>
            </div>

            {lowStock.length === 0 ? (
              <div className="dashboard-empty-state">
                <span>✓</span>
                <p>All products have sufficient stock.</p>
              </div>
            ) : (
              <div className="dashboard-stock-list">
                {lowStock.slice(0, 6).map((product) => (
                  <div
                    className="dashboard-stock-item"
                    key={product.id}
                  >
                    <div className="dashboard-stock-dot" />

                    <div className="dashboard-stock-info">
                      <strong>{product.name}</strong>
                      <small>Low inventory</small>
                    </div>

                    <span className="dashboard-stock-number">
                      {product.stock} left
                    </span>

                    <Link
                      to={`/admin/edit-product/${product.id}`}
                      className="dashboard-stock-edit"
                      aria-label={`Edit ${product.name}`}
                    >
                      →
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {lowStock.length > 6 && (
              <p className="dashboard-extra-count">
                And {lowStock.length - 6} more low-stock products
              </p>
            )}
          </article>
        </section>

        <section className="dashboard-panel dashboard-orders-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest orders placed in your store</p>
            </div>

            <Link to="/admin/orders" className="dashboard-view-all">
              View all orders →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="dashboard-empty-state">
              <span>🧾</span>
              <p>No orders yet. New orders will appear here.</p>
            </div>
          ) : (
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => {
                    const status = order.status || "Pending";
                    const statusClass = status
                      .toLowerCase()
                      .replace(/\s+/g, "-");

                    return (
                      <tr key={order.id}>
                        <td className="dashboard-order-id">
                          #{order.id}
                        </td>

                        <td>
                          {order.customer?.name ||
                            order.customerName ||
                            "Customer"}
                        </td>

                        <td>
                          {order.date
                            ? new Date(order.date).toLocaleDateString("en-IN")
                            : "—"}
                        </td>

                        <td className="dashboard-order-total">
                          ₹{Number(order.total || 0).toLocaleString("en-IN")}
                        </td>

                        <td>
                          <span
                            className={`dashboard-status ${statusClass}`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="dashboard-footer-note">
          Store overview · Data saved in this browser
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;