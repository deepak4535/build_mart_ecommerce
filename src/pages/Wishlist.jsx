
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { addToCart } from "../redux/cartSlice";
import { removeFromWishlist } from "../redux/wishlistSlice";

function Wishlist() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  function handleAddToCart(product) {
    if (product.stock <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    dispatch(addToCart(product));
    alert(`${product.name} added to cart successfully!`);
  }

  if (!user) {
    return (
      <div>
        <Navbar />

        <section className="products">
          <div className="product-card">
            <h2>Login Required 🔐</h2>
            <p>Please login or register to view your wishlist.</p>

            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button onClick={() => navigate("/register")}>
              Register
            </button>

            <p>
              <Link to="/products">Continue browsing products</Link>
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
        <h2>My Wishlist ❤️</h2>

        {wishlistItems.length === 0 ? (
          <div className="product-card">
            <h3>Your wishlist is empty</h3>
            <p>Save your favourite construction materials here.</p>

            <Link to="/products">
              <button>Browse Products</button>
            </Link>
          </div>
        ) : (
          <div className="product-container">
            {wishlistItems.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  {product.image}
                </div>

                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <h4>
                  ₹{product.price} / {product.unit}
                </h4>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                >
                  Add to Cart 🛒
                </button>

                <button
                  onClick={() =>
                    dispatch(removeFromWishlist(product.id))
                  }
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Wishlist;