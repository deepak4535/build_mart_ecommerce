
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "Bricks",
      description: "Strong bricks for building houses.",
      price: 8,
      unit: "piece",
      image: "🧱",
      category: "Building Materials",
      stock: 1000,
    },
    {
      id: 2,
      name: "Cement",
      description: "Quality cement for construction work.",
      price: 380,
      unit: "bag",
      image: "🏗️",
      category: "Building Materials",
      stock: 200,
    },
    {
      id: 3,
      name: "Steel",
      description: "Strong steel for building structures.",
      price: 65,
      unit: "kg",
      image: "🔩",
      category: "Steel",
      stock: 500,
    },
    {
      id: 4,
      name: "Sand",
      description: "Quality sand for construction.",
      price: 1500,
      unit: "load",
      image: "🪨",
      category: "Building Materials",
      stock: 100,
    },
  ],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
} = productSlice.actions;

export default productSlice.reducer;