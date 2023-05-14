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
      state.shippingAddressAdd = payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    userLogout: (state, {payload}) => {
      state.loading = false;
      state.userInfo = null;
      localStorage.setItem('userInfo', null);
      state.error = null;
    },
    userUpdateProfile: (state, {payload}) => {
      state.userInfo = payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    setError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { shippingAddressAdd, userLogout, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;

export const orderSelector = ({state}) => state.order;
