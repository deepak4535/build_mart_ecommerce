import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { addOrder } from "../redux/orderSlice";
import { useAuth } from "../context/AuthContext";

function Checkout() {
const dispatch = useDispatch();
const navigate = useNavigate();
const { user } = useAuth();
const cartItems = useSelector((state) => state.cart.items || []);

const [form, setForm] = useState({
fullName: user?.name || "",
phone: user?.phone || "",
email: user?.email || "",
address: user?.address || "",
city: "",
state: "",
pincode: "",
paymentMethod: "Cash on Delivery",
});

const [error, setError] = useState("");

const total = cartItems.reduce(
(sum, item) =>
sum + Number(item.price || 0) * Number(item.quantity || 0),
0
);

function handleChange(event) {
const { name, value } = event.target;
setForm((previous) => ({ ...previous, [name]: value }));
}

function handleSubmit(event) {
event.preventDefault();
setError("");


if (!user || user.role !== "user") {
  navigate("/login");
  return;
}

if (cartItems.length === 0) {
  setError("Your cart is empty. Please add products first.");
  return;
}

if (
  !form.fullName.trim() ||
  !form.phone.trim() ||
  !form.email.trim() ||
  !form.address.trim() ||
  !form.city.trim() ||
  !form.state.trim() ||
  !form.pincode.trim()
) {
  setError("Please fill in all delivery details.");
  return;
}

if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
  setError("Enter a valid 10-digit Indian mobile number.");
  return;
}

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
  setError("Enter a valid email address.");
  return;
}

if (!/^\d{6}$/.test(form.pincode.trim())) {
  setError("Enter a valid 6-digit PIN code.");
  return;
}

const order = {
  id: "ORD-" + Date.now(),
  userId: user.id,
  email: form.email.trim(),
  customerName: form.fullName.trim(),
  phone: form.phone.trim(),
  address: form.address.trim(),
  city: form.city.trim(),
  state: form.state.trim(),
  pincode: form.pincode.trim(),
  paymentMethod: form.paymentMethod,
  paymentStatus: "Pending",
  status: "Placed",
  items: cartItems.map((item) => ({ ...item })),
  total,
  createdAt: new Date().toISOString(),
};

dispatch(addOrder(order));
dispatch(clearCart());
navigate("/orders", { replace: true });


}

if (!user || user.role !== "user") {
return ( <main className="checkout-page"> <section className="checkout-card"> <h2>Please log in</h2> <p>Log in to complete your purchase.</p> <Link to="/login" className="checkout-button">
Login </Link> </section> </main>
);
}

if (cartItems.length === 0) {
return ( <main className="checkout-page"> <section className="checkout-card"> <h2>Your cart is empty</h2> <p>Add products before proceeding to checkout.</p> <Link to="/products" className="checkout-button">
Browse Products </Link> </section> </main>
);
}

return ( <main className="checkout-page"> <div className="checkout-heading"> <div> <p className="checkout-eyebrow">YOUR ORDER</p> <h1>Checkout</h1> <p>Enter your delivery details to place your order.</p> </div> <Link to="/cart" className="checkout-back">
Back to Cart </Link> </div>

  <form onSubmit={handleSubmit} className="checkout-layout">
    <section className="checkout-card">
      <h2>Delivery Details</h2>

      <div className="checkout-fields">
        <label>
          Full Name
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </label>

        <label>
          Mobile Number
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
            required
          />
        </label>

        <label className="checkout-full-width">
          Email Address
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="checkout-full-width">
          Full Address
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="House number, street, area"
            autoComplete="street-address"
            rows={3}
            required
          />
        </label>

        <label>
          City
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Enter city"
            autoComplete="address-level2"
            required
          />
        </label>

        <label>
          State
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="Enter state"
            autoComplete="address-level1"
            required
          />
        </label>

        <label>
          PIN Code
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="6-digit PIN code"
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
            required
          />
        </label>
      </div>

      <h2 className="checkout-section-heading">Payment Method</h2>

      <div className="checkout-payment-option">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Cash on Delivery"
            checked={form.paymentMethod === "Cash on Delivery"}
            onChange={handleChange}
          />
          <span>
            <strong>Cash on Delivery</strong>
            <small>Pay when your order arrives</small>
          </span>
        </label>
      </div>

      <div className="checkout-payment-option">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="UPI"
            checked={form.paymentMethod === "UPI"}
            onChange={handleChange}
          />
          <span>
            <strong>UPI</strong>
            <small>Demo selection only; no real payment is processed</small>
          </span>
        </label>
      </div>

      {error && <p className="checkout-error">{error}</p>}

      <button type="submit" className="checkout-button checkout-place">
        Place Order · ₹{total.toLocaleString("en-IN")}
      </button>
    </section>

    <aside className="checkout-card checkout-order-card">
      <h2>Order Summary</h2>

      {cartItems.map((item) => (
        <div className="checkout-product" key={item.id}>
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            <div className="checkout-product-placeholder">Product</div>
          )}

          <div className="checkout-product-info">
            <strong>{item.name}</strong>
            <small>Qty: {item.quantity}</small>
            <span>
              ₹
              {(
                Number(item.price || 0) * Number(item.quantity || 0)
              ).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      ))}

      <div className="checkout-total-row">
        <span>Items</span>
        <span>
          {cartItems.reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
          )}
        </span>
      </div>

      <div className="checkout-total-row checkout-grand-total">
        <strong>Total Amount</strong>
        <strong>₹{total.toLocaleString("en-IN")}</strong>
      </div>

      <p className="checkout-note">
        Your order details will be saved in this browser.
      </p>
    </aside>
  </form>
</main>


);
}

export default Checkout;
