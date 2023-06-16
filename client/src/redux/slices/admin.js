import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  error: null,
  userList: null,
  userRemoval: false,
  ordersList: null,
  orderRemoval: false,
  deliveredFlag: false,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getUsers: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.userList = payload;
    },
    getOrders: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.ordersList = payload;
    },
    userDelete: (state, {payload}) => {
      state.loading = false;
      state.userRemoval = true;
      state.error = null;
    },
    orderDelete: (state) => {
      state.error = false;
      state.loading = false;
      state.orderRemoval = true;
    },
    setError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = false;
      state.deliveredFlag = false;
      state.orderRemoval = false;
    },
    setDeliveredFlag: (state) => {
      state.deliveredFlag = true;
      state.loading = false;
    }
  },
});

export const { setLoading, setError, getUsers, userDelete, resetError, getOrders, orderDelete, setDeliveredFlag } = adminSlice.actions;
export default adminSlice.reducer;

export const userSelector = ({state}) => state.admin;
