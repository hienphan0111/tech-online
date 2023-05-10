import axios from 'axios';
import { userLogin, setLoading, setError } from '../slices/user';

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
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