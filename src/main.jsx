
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";


import AppRoutes from "./routes/AppRoutes.jsx";
import store from "./redux/store.js";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  </StrictMode>
);