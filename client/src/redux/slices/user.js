import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
}

export const userSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    userLogin: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },
    userLogout: (state, {payload}) => {
      state.loading = false;
      state.userInfo = null;
      localStorage.setItem('userInfo', null);
      state.error = null;
    },
    setError: (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { userLogin, userLogout, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;

export const userSelector = ({state}) => state.user;
