
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { updateOrderStatus } from "../redux/orderSlice";

function AdminOrders() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  function changeStatus(orderId, status) {
    dispatch(updateOrderStatus({ id: orderId, status }));
  }

  return (
    <div>
      <Navbar />

      <section className="products">
        <h2>Manage Orders</h2>
        <p>View customer orders and update their status.</p>

        {orders.length === 0 ? (
          <div className="product-card">
            <h3>No Orders Yet</h3>
            <p>Customer orders will appear here after checkout.</p>
            <Link to="/admin">
              <button>Back to Dashboard</button>
            </Link>
          </div>
        ) : (
          <div className="product-container">
            {orders.slice().reverse().map((order) => (
              <div className="product-card" key={order.id}>
                <h3>Order #{order.id}</h3>

                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Customer:</strong> {order.customer.name}</p>
                <p><strong>Phone:</strong> {order.customer.phone}</p>
                <p><strong>Email:</strong> {order.customer.email}</p>
                <p><strong>Address:</strong> {order.customer.address}</p>
                <p><strong>Status:</strong> {order.status}</p>

                <h4>Products</h4>

                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.name} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </p>
                ))}

                <h3>Total: ₹{order.totalAmount}</h3>

                {order.status !== "Cancelled" && (
                  <div>
                    <label htmlFor={`status-${order.id}`}>
                      Update Status:{" "}
                    </label>

                    <select
                      id={`status-${order.id}`}
                      value={order.status}
                      onChange={(event) =>
                        changeStatus(order.id, event.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Link to="/admin">
          <button>Back to Dashboard</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default AdminOrders;