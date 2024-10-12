import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      let item = state.cart.find((i) => i.id === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseQuantity(state, action) {
      let item = state.cart.find((i) => i.id === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clear(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clear,
} = cartSlice.actions;
