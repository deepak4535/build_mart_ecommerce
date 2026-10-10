import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import orderReducer from "./orderSlice";

function readJSON(key, fallback = null) {
try {
const value = localStorage.getItem(key);
return value === null ? fallback : JSON.parse(value);
} catch (error) {
console.error("Unable to read " + key + ":", error);
return fallback;
}
}

function getCurrentCustomer() {
const user = readJSON("constructionUser", null);

if (user && user.role === "user" && user.id != null) {
return user;
}

return null;
}

function loadPersistedState() {
const savedState = {};

const products = readJSON("constructionProducts", null);
if (products && typeof products === "object") {
savedState.products = products;
}

const orders = readJSON("constructionOrders", null);

if (Array.isArray(orders)) {
  savedState.orders = { items: orders };
} else if (orders && Array.isArray(orders.items)) {
  savedState.orders = { items: orders.items };
} else {
  savedState.orders = { items: [] };
}
const customer = getCurrentCustomer();

if (customer) {
const cart = readJSON(
"constructionCart_" + customer.id,
[]
);


const wishlist = readJSON(
  "constructionWishlist_" + customer.id,
  []
);

savedState.cart = {
  items: Array.isArray(cart)
    ? cart
    : Array.isArray(cart?.items)
    ? cart.items
    : [],
};

savedState.wishlist = {
  items: Array.isArray(wishlist)
    ? wishlist
    : Array.isArray(wishlist?.items)
    ? wishlist.items
    : [],
};

}

return savedState;
}

const store = configureStore({
reducer: {
products: productReducer,
cart: cartReducer,
wishlist: wishlistReducer,
orders: orderReducer,
},
preloadedState: loadPersistedState(),
});

store.subscribe(() => {
try {
const state = store.getState();


localStorage.setItem(
  "constructionProducts",
  JSON.stringify(state.products)
);

localStorage.setItem(
  "constructionOrders",
  JSON.stringify(state.orders)
);

const customer = getCurrentCustomer();

if (customer) {
  localStorage.setItem(
    "constructionCart_" + customer.id,
    JSON.stringify(state.cart)
  );

  localStorage.setItem(
    "constructionWishlist_" + customer.id,
    JSON.stringify(state.wishlist)
  );
}


} catch (error) {
console.error("Unable to save store data:", error);
}
});

export default store;
