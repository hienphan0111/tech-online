import axios from 'axios';
import { userLogin, userLogout, setLoading, setError } from '../slices/user';

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