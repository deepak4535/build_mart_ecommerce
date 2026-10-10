
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlistSlice";
import { useAuth } from "../context/AuthContext";

function ProductCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useAuth();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === props.id
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

    if (props.stock <= 0) {
      alert("Sorry, this product is out of stock.");
      return;
    }

    dispatch(addToCart(props));

    alert(`${props.name} added to cart successfully!`);
  }

  function handleWishlist() {
    if (!user) {
      requireLogin();
      return;
    }

    if (isWishlisted) {
      dispatch(removeFromWishlist(props.id));
      alert(`${props.name} removed from your wishlist.`);
    } else {
      dispatch(addToWishlist(props));
      alert(`${props.name} added to your wishlist!`);
    }
  }

  function viewProduct() {
    navigate(`/product/${props.id}`);
  }

  return (
    <div className="product-card">
      <div
        className="product-image"
        onClick={viewProduct}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") viewProduct();
        }}
      >
        {props.image}
      </div>

      <h3
        onClick={viewProduct}
        style={{ cursor: "pointer" }}
      >
        {props.name}
      </h3>

      <p>{props.description}</p>

      <h4>
        ₹{props.price} / {props.unit}
      </h4>

      <p>
        {props.stock > 0
          ? `In Stock: ${props.stock}`
          : "Out of Stock"}
      </p>

      <button
        onClick={handleAddToCart}
        disabled={props.stock <= 0}
      >
        Add to Cart 🛒
      </button>

      <button onClick={handleWishlist}>
        {isWishlisted
          ? "❤️ Remove Wishlist"
          : "♡ Add to Wishlist"}
      </button>

      <button onClick={viewProduct}>
        View Details
      </button>
    </div>
  );
}

export default ProductCard;