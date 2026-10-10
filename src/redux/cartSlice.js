import { createSlice } from "@reduxjs/toolkit";

const initialState = {
items: [],
};

const cartSlice = createSlice({
name: "cart",
initialState: initialState,
reducers: {
addToCart: function (state, action) {
const product = action.payload;


  if (!product || product.id === undefined) {
    return;
  }

  const existingItem = state.items.find(function (item) {
    return item.id === product.id;
  });

  if (existingItem) {
    const hasStock =
      existingItem.stock !== undefined &&
      existingItem.stock !== null &&
      existingItem.stock !== "";

    if (
      !hasStock ||
      existingItem.quantity < Number(existingItem.stock)
    ) {
      existingItem.quantity += 1;
    }

    return;
  }

  const hasStock =
    product.stock !== undefined &&
    product.stock !== null &&
    product.stock !== "";

  if (hasStock && Number(product.stock) < 1) {
    return;
  }

  state.items.push({
    ...product,
    quantity: 1,
  });
},

removeFromCart: function (state, action) {
  state.items = state.items.filter(function (item) {
    return item.id !== action.payload;
  });
},

increaseQuantity: function (state, action) {
  const item = state.items.find(function (product) {
    return product.id === action.payload;
  });

  if (!item) {
    return;
  }

  const hasStock =
    item.stock !== undefined &&
    item.stock !== null &&
    item.stock !== "";

  if (!hasStock || item.quantity < Number(item.stock)) {
    item.quantity += 1;
  }
},

decreaseQuantity: function (state, action) {
  const item = state.items.find(function (product) {
    return product.id === action.payload;
  });

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
},

clearCart: function (state) {
  state.items = [];
},

setCartItems: function (state, action) {
  state.items = Array.isArray(action.payload)
    ? action.payload
    : [];
},


},
});

export const {
addToCart,
removeFromCart,
increaseQuantity,
decreaseQuantity,
clearCart,
setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
