import axios from 'axios';
import { userLogin, userLogout, setLoading, setError, userUpdateProfile, resetUpdate, setUserOrders } from '../slices/user';

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const { data } = await axios.post('/api/users/login', { email, password}, config);
    dispatch(userLogin(data));
  } catch (err) {
    dispatch(
      setError(
        err.response && err.response.data.message
        ? err.response.data.message
        : err.message
        ? err.message
        : 'an unexpected error has occured. Please try again later'
      )
    );
  }
}

export const logout = () => (dispatch) => {
  dispatch(userLogout());
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const { data } = await axios.post('/api/users/register', { name, email, password}, config);
    dispatch(userLogin(data));
  } catch (err) {
    dispatch(
      setError(
        err.response && err.response.data.message
        ? err.response.data.message
        : err.message
        ? err.message
        : 'an unexpected error has occured. Please try again later'
      )
    );
  }
}

export const updateProfile = (id, name, email, password) => async(dispatch, getState) => {
  const { user: {userInfo},} = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
    };
    const {data} = await axios.put(`/api/users/profile/${id}`, { _id: id, name, email, password }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(userUpdateProfile(data));
  } catch (err) {
    dispatch(
      setError(
        err.response && err.response.data.message
        ? err.response.data.message
        : err.message
        ? err.message
        : 'an unexpected error has occured. Please try again later'
      )
    );
  }
};

export const resetUpdateSuccess = () => async (dispatch) => {
  dispatch(resetUpdate());
};

export const getUserOrders = () => async (dispatch, getState) => {
  const { user: {userInfo},} = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
    };
    const { data } = await axios.get(`/api/users/${userInfo._id}`, config);
    dispatch(setUserOrders(data));
  } catch ( err ) {
    dispatch(
      setError(
        err.response && err.response.data.message
        ? err.response.data.message
        : err.message
        ? err.message
        : 'an unexpected error has occured. Please try again later'
      )
    );
  }
}
