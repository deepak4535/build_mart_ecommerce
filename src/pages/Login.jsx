
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const result = loginUser(form.email, form.password);

    if (!result.success) {
      setError(result.message || "Invalid email or password.");
      return;
    }

    if (result.user?.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }

  return (
    <div>
      <Navbar />

      <section className="products">
        <div className="product-card">
          <h2>Login to Your Account 🔐</h2>

          <p>
            Login to Construction Work Place to continue.
          </p>

          {error && (
            <p style={{ color: "red" }} role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="username"
                required
              />
            </p>

            <p>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </p>

            <button type="submit">
              Login
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link to="/register">Register here</Link>
          </p>

          <p style={{ fontSize: "13px" }}>
            Admin demo login details are available in the project setup
            instructions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Login;