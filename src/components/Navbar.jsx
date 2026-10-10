import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

function Navbar() {
const navigate = useNavigate();
const cartItems = useSelector((state) => state.cart.items);
const wishlistItems = useSelector((state) => state.wishlist.items);
const { user, logoutUser } = useAuth();

const isAdmin = user?.role === "admin";

const cartCount = cartItems.reduce(
(total, item) => total + Number(item.quantity || 0),
0
);

function handleLogout() {
try {
logoutUser();
navigate("/login", { replace: true });
} catch (error) {
console.error("Logout failed:", error);
}
}

return ( <nav className="navbar"> <Link to="/" className="logo">
Construction Work Place </Link>

  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>

    {!user && (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}

    {user && !isAdmin && (
      <>
        <Link to="/wishlist">
          Wishlist ({wishlistItems.length})
        </Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>

        <Link to="/profile">
          {user.name || "My Profile"}
        </Link>

        <Link to="/orders">My Orders</Link>
      </>
    )}

    {isAdmin && (
      <>
        <Link to="/admin">Admin Dashboard</Link>
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/orders">Manage Orders</Link>
      </>
    )}

    {user && (
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    )}
  </div>
</nav>


);
}

export default Navbar;
