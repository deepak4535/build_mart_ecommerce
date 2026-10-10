
function CartCard(props) {
  return (
    <div className="cart-card">
      <h3>{props.name}</h3>

      <p>Price: ₹{props.price}</p>

      <p>Quantity: {props.quantity}</p>

      <h4>Total: ₹{props.price * props.quantity}</h4>

      <button onClick={props.onRemove}>
        Remove
      </button>
    </div>
  );
}

export default CartCard;