import {
createContext,
useContext,
useEffect,
useState,
} from "react";
import { useDispatch, useStore } from "react-redux";
import { setCartItems } from "../redux/cartSlice";
import { setWishlistItems } from "../redux/wishlistSlice";

const AuthContext = createContext(null);

const ADMIN_EMAIL = "admin@construction.com";
const ADMIN_PASSWORD = "Admin@123";

function readJSON(key, fallback = null) {
try {
const value = localStorage.getItem(key);
return value === null ? fallback : JSON.parse(value);
} catch (error) {
console.error("Unable to read " + key + ":", error);
return fallback;
}
}

function getCartKey(id) {
return "constructionCart_" + id;
}

function getWishlistKey(id) {
return "constructionWishlist_" + id;
}

function getItems(key) {
const value = readJSON(key, []);

if (Array.isArray(value)) {
return value;
}

if (Array.isArray(value?.items)) {
return value.items;
}

return [];
}

export function AuthProvider({ children }) {
const dispatch = useDispatch();
const store = useStore();

const [user, setUser] = useState(() => {
const savedUser = readJSON("constructionUser", null);

if (
  savedUser &&
  (savedUser.role === "admin" || savedUser.role === "user")
) {
  return savedUser;
}

return null;


});

useEffect(() => {
if (user?.role === "user" && user.id != null) {
dispatch(setCartItems(getItems(getCartKey(user.id))));
dispatch(setWishlistItems(getItems(getWishlistKey(user.id))));
} else {
dispatch(setCartItems([]));
dispatch(setWishlistItems([]));
}
}, [dispatch, user]);

function loginUser(email, password) {
const cleanEmail = String(email || "").trim().toLowerCase();

if (
  cleanEmail === ADMIN_EMAIL &&
  password === ADMIN_PASSWORD
) {
  const admin = {
    id: "admin",
    name: "Admin",
    email: ADMIN_EMAIL,
    role: "admin",
  };

  localStorage.setItem(
    "constructionUser",
    JSON.stringify(admin)
  );

  dispatch(setCartItems([]));
  dispatch(setWishlistItems([]));
  setUser(admin);

  return { success: true, user: admin };
}

const savedUsers = readJSON("constructionUsers", []);
const users = Array.isArray(savedUsers) ? savedUsers : [];

const account = users.find(
  (item) =>
    String(item.email || "").trim().toLowerCase() === cleanEmail &&
    item.password === password
);

if (!account) {
  return {
    success: false,
    message: "Invalid email or password.",
  };
}

const customer = { ...account, role: "user" };

localStorage.setItem(
  "constructionUser",
  JSON.stringify(customer)
);

dispatch(setCartItems(getItems(getCartKey(customer.id))));
dispatch(
  setWishlistItems(getItems(getWishlistKey(customer.id)))
);

setUser(customer);

return { success: true, user: customer };


}

function registerUser(userData) {
const savedUsers = readJSON("constructionUsers", []);
const users = Array.isArray(savedUsers) ? savedUsers : [];
const email = String(userData.email || "").trim().toLowerCase();


if (!email || !userData.password) {
  return {
    success: false,
    message: "Email and password are required.",
  };
}

if (
  email === ADMIN_EMAIL ||
  users.some(
    (item) =>
      String(item.email || "").trim().toLowerCase() === email
  )
) {
  return {
    success: false,
    message: "This email is already registered.",
  };
}

const newUser = {
  ...userData,
  id: "USER-" + Date.now(),
  name: String(userData.name || "").trim(),
  email,
  role: "user",
};

users.push(newUser);

localStorage.setItem(
  "constructionUsers",
  JSON.stringify(users)
);

localStorage.setItem(
  getCartKey(newUser.id),
  JSON.stringify([])
);

localStorage.setItem(
  getWishlistKey(newUser.id),
  JSON.stringify([])
);

return { success: true, user: newUser };


}

function logoutUser() {
if (user?.role === "user" && user.id != null) {
const state = store.getState();


  localStorage.setItem(
    getCartKey(user.id),
    JSON.stringify(state.cart?.items || [])
  );

  localStorage.setItem(
    getWishlistKey(user.id),
    JSON.stringify(state.wishlist?.items || [])
  );
}

localStorage.removeItem("constructionUser");

dispatch(setCartItems([]));
dispatch(setWishlistItems([]));
setUser(null);

}

function updateUser(updatedData) {
if (!user || user.role !== "user") {
return {
success: false,
message: "Please log in as a customer.",
};
}


const updatedUser = {
  ...user,
  ...updatedData,
  id: user.id,
  email: user.email,
  role: "user",
};

const savedUsers = readJSON("constructionUsers", []);
const users = Array.isArray(savedUsers) ? savedUsers : [];

const updatedUsers = users.map((item) =>
  String(item.id) === String(user.id) ? updatedUser : item
);

localStorage.setItem(
  "constructionUsers",
  JSON.stringify(updatedUsers)
);

localStorage.setItem(
  "constructionUser",
  JSON.stringify(updatedUser)
);

setUser(updatedUser);

return { success: true, user: updatedUser };


}

return (
<AuthContext.Provider
value={{
user,
loginUser,
registerUser,
logoutUser,
updateUser,
}}
>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
const context = useContext(AuthContext);

if (!context) {
throw new Error("useAuth must be used inside AuthProvider.");
}

return context;
}
