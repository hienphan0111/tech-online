import axios from 'axios';
import { shippingAddressAdd, setError, clearOrder } from '../slices/order';

export const setShippingAddress = (data) => async (dispatch) => {
  dispatch(shippingAddressAdd(data));
}

export const setShippingAddressError = (value) => async (dispatch) => {
  dispatch(setError(value));
}

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    order: {shippingAddress},
    user: { userInfo },
  } = getState();

  console.log(order);
  const preparedOrder = { ...order, shippingAddress};
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
    }
    const { data } = await axios.post('/api/orders', preparedOrder, config);
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

export const resetOrder = () => (dispatch) => {
  dispatch(clearOrder());
}