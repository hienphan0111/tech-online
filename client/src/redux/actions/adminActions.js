import axios from 'axios';
import { getUsers, userDelete, resetError, setError } from '../slices/admin';

export const getAllUsers = () => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
    }
    const { data } = await axios.get('/api/users', config);
    dispatch(getUsers(data));
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

export const deleteUser = (id) => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
    }

    const { data } = await axios.delete(`/api/users/${id}`, config);
    dispatch(userDelete(data));
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

export const resetErrorAndRemoval = () => async(dispatch) => {
  dispatch(resetError());
}
