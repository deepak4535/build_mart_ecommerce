import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Orders() {
const { user } = useAuth();
const orders = useSelector((state) => state.orders.items || []);

if (!user || user.role !== "user") {
return ( <div className="container py-5 text-center"> <h2>Please Login</h2> <p>Login to view your orders.</p> <Link to="/login" className="btn btn-primary">
Login </Link> </div>
);
}

const myOrders = orders
.filter(
(order) =>
String(order.userId) === String(user.id) ||
(order.userId === undefined &&
order.email &&
order.email.toLowerCase() === user.email?.toLowerCase())
)
.slice()
.sort(
(a, b) =>
new Date(b.createdAt || 0).getTime() -
new Date(a.createdAt || 0).getTime()
);

return ( <div className="container py-5"> <h2 className="mb-4">My Orders</h2>


  {myOrders.length === 0 ? (
    <div className="text-center py-5">
      <h4>No orders found</h4>
      <p>Your orders will appear here after checkout.</p>
      <Link to="/products" className="btn btn-primary">
        Start Shopping
      </Link>
    </div>
  ) : (
    <div className="row g-4">
      {myOrders.map((order) => (
        <div className="col-12" key={order.id}>
          <div className="card p-4">
            <div className="d-flex flex-wrap justify-content-between gap-3 mb-3">
              <div>
                <h5>Order {order.id}</h5>
                <p className="text-muted mb-0">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("en-IN")
                    : "Date unavailable"}
                </p>
              </div>

              <div>
                <span className="badge bg-primary me-2">
                  {order.status || "Placed"}
                </span>
                <span className="badge bg-secondary">
                  {order.paymentStatus || "Pending"}
                </span>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {(Array.isArray(order.items) ? order.items : []).map(
                    (item, index) => (
                      <tr key={item.id ?? index}>
                        <td>{item.name || "Product"}</td>
                        <td>
                          ₹
                          {Number(item.price || 0).toLocaleString("en-IN")}
                        </td>
                        <td>{Number(item.quantity || 0)}</td>
                        <td>
                          ₹
                          {(
                            Number(item.price || 0) *
                            Number(item.quantity || 0)
                          ).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="row g-3">
              <div className="col-md-8">
                <p className="mb-1">
                  <strong>Delivery Address:</strong>
                </p>
                <p className="text-muted">
                  {order.address}, {order.city}, {order.state} -{" "}
                  {order.pincode}
                </p>
                <p className="mb-1">
                  <strong>Payment Method:</strong>{" "}
                  {order.paymentMethod || "Not specified"}
                </p>
              </div>

              <div className="col-md-4 text-md-end">
                <h5>
                  Total: ₹
                  {Number(order.total ?? order.totalAmount ?? 0).toLocaleString("en-IN")}
                </h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


);
}

export default Orders;
