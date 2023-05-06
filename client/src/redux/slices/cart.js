import { createReducer, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  cart: [],
  expressShipping: false,
  subTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    cartAddItem: (state, { payload }) => {
      const existingItems = state.cart.find((item) => item.id === payload.id);
      if (existingItems) {
        state.cart = state.cart.map((item) => item.id === existingItems.id ? payload : item)
      } else {
        console(payload);
        state.cart.cart = [...state.cart.cart, payload];
      }
      state.loading = false;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setError, setLoading, cartAddItem } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
