
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addToCart } from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useAuth();

  const product = useSelector((state) =>
    state.products.products.find(
      (item) => String(item.id) === String(id)
    )
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product?.id
  );

  function requireLogin() {
    const shouldLogin = window.confirm(
      "Please login or register to use this feature.\n\nOK = Login\nCancel = Register"
    );

    navigate(shouldLogin ? "/login" : "/register");
  }

  function handleAddToCart() {
    if (!user) {
      requireLogin();
      return;
    }

    if (product.stock <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    dispatch(addToCart(product));
    alert(`${product.name} added to cart successfully!`);
  }

  function handleWishlist() {
    if (!user) {
      requireLogin();
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      alert(`${product.name} removed from your wishlist.`);
    } else {
      dispatch(addToWishlist(product));
      alert(`${product.name} added to your wishlist!`);
    }
  }

  if (!product) {
    return (
      <div>
        <Navbar />

        <section className="products">
          <h2>Product Not Found</h2>
          <p>This product may have been removed.</p>

          <Link to="/products">
            <button>Browse Products</button>
          </Link>
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
          <div className="product-image">
            {product.image}
          </div>

          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <h3>
            ₹{product.price} / {product.unit}
          </h3>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Availability:</strong>{" "}
            {product.stock > 0
              ? `In Stock (${product.stock})`
              : "Out of Stock"}
          </p>

          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Add to Cart 🛒
            </button>

            <button onClick={handleWishlist}>
              {isWishlisted
                ? "❤️ Remove from Wishlist"
                : "♡ Add to Wishlist"}
            </button>

            <button onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductDetails;