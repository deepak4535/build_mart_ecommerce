
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        address: user.address || "",
      });
    }
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setMessage("Please enter your name, phone number and email.");
      return;
    }

    const registeredUsers = JSON.parse(
      localStorage.getItem("constructionUsers") || "[]"
    );

    const emailExists = registeredUsers.some(
      (registeredUser) =>
        registeredUser.id !== user.id &&
        registeredUser.email.toLowerCase() === form.email.trim().toLowerCase()
    );

    if (emailExists) {
      setMessage("This email is already used by another account.");
      return;
    }

    updateUser({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
    });

    setMessage("Profile updated successfully!");
    setIsEditing(false);
  }

  if (!user) {
    return (
      <div>
        <Navbar />

        <section className="products">
          <div className="product-card">
            <h2>🔐 Login Required</h2>
            <p>Please login to view your profile.</p>

            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button onClick={() => navigate("/register")}>
              Create Account
            </button>

            <p>
              <Link to="/products">Continue Shopping</Link>
            </p>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <section className="products">
        <div className="product-card">
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "60px" }}>👤</div>

            <h2>My Profile</h2>
            <h3>Welcome, {user.name}!</h3>

            <p>
              Account ID: {user.id}
            </p>

            <p>
              Manage your personal information here.
            </p>
          </div>

          {message && (
            <p
              role="status"
              style={{
                color: message.includes("successfully")
                  ? "green"
                  : "red",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <p>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </p>

              <p>
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </p>

              <p>
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </p>

              <p>
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter your delivery address"
                  rows={4}
                />
              </p>

              <button type="submit">
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm({
                    name: user.name || "",
                    phone: user.phone || "",
                    email: user.email || "",
                    address: user.address || "",
                  });
                  setIsEditing(false);
                  setMessage("");
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <hr />

              <p>
                <strong>Full Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Phone:</strong> {user.phone || "Not provided"}
              </p>

              <p>
                <strong>Delivery Address:</strong>{" "}
                {user.address || "Address not added yet"}
              </p>

              <button
                onClick={() => {
                  setIsEditing(true);
                  setMessage("");
                }}
              >
                ✏️ Edit Profile
              </button>
            </div>
          )}

          <hr />

          <div className="product-actions">
            <Link to="/orders">
              <button type="button">📦 My Orders</button>
            </Link>

            <Link to="/wishlist">
              <button type="button">❤️ My Wishlist</button>
            </Link>

            <Link to="/cart">
              <button type="button">🛒 My Cart</button>
            </Link>

            <Link to="/products">
              <button type="button">Continue Shopping</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Profile;