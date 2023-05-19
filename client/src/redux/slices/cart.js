import { createReducer, createSlice } from '@reduxjs/toolkit';

const calculateSubtotal = (cart) => {
  let result = 0;
  cart.forEach((item) => {
    result += item.price * item.qty;
  })
  return Number(result).toFixed(2);
};

const cartLocal = JSON.parse(localStorage.getItem('cart')) ?? [];
const subTotalLocal = JSON.parse(localStorage.getItem('subTotal')) ?? 0;

const initialState = {
  loading: false,
  error: null,
  cart: cartLocal,
  expressShipping: false,
  subTotal: subTotalLocal,
};

const updateLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('subTotal', calculateSubtotal(cart));
}

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
        state.cart = [...state.cart, payload];
      }
      state.loading = false;
      updateLocalStorage(state.cart);
      state.subTotal = calculateSubtotal(state.cart);
    },
    cartRemoveItem: (state, {payload}) => {
      const cartRemain = state.cart.filter((item) => item.id !== payload );
      state.cart = cartRemain;
      state.loading = false;
      updateLocalStorage(state.cart);
      state.subTotal = calculateSubtotal(state.cart);
    },
    clearCart: (state) => {
      state.cart = null;
      updateLocalStorage(state.cart);
    },
    setExpressShipping: (state, {payload}) => {
      state.expressShipping = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setError, setLoading, cartAddItem, cartRemoveItem, clearCart, setExpressShipping } = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
