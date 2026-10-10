import { createSlice } from "@reduxjs/toolkit";

const initialState = {
items: [],
};

const wishlistSlice = createSlice({
name: "wishlist",
initialState: initialState,

reducers: {
addToWishlist: function (state, action) {
const product = action.payload;


  if (!product || product.id === undefined) {
    return;
  }

  const alreadyExists = state.items.some(function (item) {
    return item.id === product.id;
  });

  if (!alreadyExists) {
    state.items.push(product);
  }
},

removeFromWishlist: function (state, action) {
  state.items = state.items.filter(function (item) {
    return item.id !== action.payload;
  });
},

clearWishlist: function (state) {
  state.items = [];
},

setWishlistItems: function (state, action) {
  if (Array.isArray(action.payload)) {
    state.items = action.payload;
  } else {
    state.items = [];
  }
},


},
});

export const {
addToWishlist,
removeFromWishlist,
clearWishlist,
setWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
