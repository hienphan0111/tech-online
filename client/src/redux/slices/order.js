import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  shippingAddress: null,
  orderInfo: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    shippingAddressAdd: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.shippingAddress = payload;
    },
    clearOrder: (state) => {
      state.orderInfo = null;
    },
    setError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { shippingAddressAdd, clearOrder, setError, setLoading } = orderSlice.actions;
export default orderSlice.reducer;

export const orderSelector = ({state}) => state.order;
