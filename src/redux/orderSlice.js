import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const orderSlice = createSlice({
name: "orders",
initialState,
reducers: {
addOrder: function (state, action) {
  if (!Array.isArray(state.items)) {
    state.items = [];
  }

  state.items.push(action.payload);
},


updateOrderStatus: function (state, action) {
  const order = state.items.find(function (item) {
    return item.id === action.payload.id;
  });

  if (order) {
    order.status = action.payload.status;
  }
},

updatePaymentStatus: function (state, action) {
  const order = state.items.find(function (item) {
    return item.id === action.payload.id;
  });

  if (order) {
    order.paymentStatus = action.payload.paymentStatus;
  }
},

deleteOrder: function (state, action) {
  state.items = state.items.filter(function (order) {
    return order.id !== action.payload;
  });
},

clearOrders: function (state) {
  state.items = [];
},

setOrders: function (state, action) {
  state.items = Array.isArray(action.payload)
    ? action.payload
    : [];
},


},
});

export const {
addOrder,
updateOrderStatus,
updatePaymentStatus,
deleteOrder,
clearOrders,
setOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
