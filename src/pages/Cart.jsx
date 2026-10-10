import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
increaseQuantity,
decreaseQuantity,
removeFromCart,
} from "../redux/cartSlice";
import { useAuth } from "../context/AuthContext";

function Cart() {
const dispatch = useDispatch();
const navigate = useNavigate();
const { user } = useAuth();
const cartItems = useSelector((state) => state.cart.items || []);

if (!user || user.role !== "user") {
return ( <div className="cart-container"> <h2>Please Login</h2> <p>Login to view and manage your shopping cart.</p> <Link to="/login" className="btn btn-primary">
Login </Link> </div>
);
}

const totalAmount = cartItems.reduce(
(total, item) =>
total + Number(item.price || 0) * Number(item.quantity || 0),
0
);

const totalItems = cartItems.reduce(
(total, item) => total + Number(item.quantity || 0),
0
);

return ( <div className="cart-container"> <h1>My Shopping Cart</h1> <p>Review your items before checkout.</p>

  <Link to="/products" className="btn btn-secondary mb-3">
    Continue Shopping
  </Link>

  {cartItems.length === 0 ? (
    <div className="cart-card">
      <h2>Your cart is empty</h2>
      <p>You haven't added any products yet.</p>
      <Link to="/products" className="btn btn-primary">
        Explore Products
      </Link>
    </div>
  ) : (
    <>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-card" key={item.id}>
            {item.image && (
              <img
                className="product-image"
                src={item.image}
                alt={item.name}
              />
            )}

            <h3>{item.name}</h3>
            <p>
              Price: ₹{Number(item.price || 0).toLocaleString("en-IN")}
            </p>

            {item.stock !== undefined &&
              item.stock !== null &&
              item.stock !== "" && (
                <p>Available stock: {item.stock}</p>
              )}

            <div className="quantity-controls">
              <button
                type="button"
                disabled={Number(item.quantity) <= 1}
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                type="button"
                disabled={
                  item.stock !== undefined &&
                  item.stock !== null &&
                  item.stock !== "" &&
                  Number(item.quantity) >= Number(item.stock)
                }
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
            </div>

            <p>
              Subtotal: ₹
              {(
                Number(item.price || 0) * Number(item.quantity || 0)
              ).toLocaleString("en-IN")}
            </p>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-card">
        <h2>Order Summary</h2>
        <p>Total Items: {totalItems}</p>
        <h3>Total: ₹{totalAmount.toLocaleString("en-IN")}</h3>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  )}
</div>


);
}

export default Cart;
