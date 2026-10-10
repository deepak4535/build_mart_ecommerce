import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

function Register() {
const navigate = useNavigate();
const { registerUser, loginUser } = useAuth();

const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");

function handleSubmit(event) {
event.preventDefault();
setError("");

if (password.length < 6) {
  setError("Password must contain at least 6 characters.");
  return;
}

if (password !== confirmPassword) {
  setError("Passwords do not match.");
  return;
}

const cleanEmail = email.trim().toLowerCase();

const result = registerUser({
  name: name.trim(),
  phone: phone.trim(),
  email: cleanEmail,
  password,
});

if (!result.success) {
  setError(result.message);
  return;
}

const loginResult = loginUser(cleanEmail, password);

if (!loginResult.success) {
  navigate("/login");
  return;
}

navigate("/");


}

return ( <div> <Navbar />


  <section className="products">
    <div className="product-card">
      <h2>Create Account</h2>
      <p>Register for Construction Work Place</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </p>

        <p>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </p>

        <p>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </p>

        <p>
          <input
            type="password"
            placeholder="Password (minimum 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </p>

        <p>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </p>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  </section>

  <Footer />
</div>


);
}

export default Register;
