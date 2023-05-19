import axios from 'axios';

import { setLoading, setError, cartAddItem, cartRemoveItem, clearCart, setExpressShipping } from '../slices/cart';

export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty,
    }
    dispatch(cartAddItem(itemToAdd));
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

export const removeCartItem = (id) => (dispatch) => {
  dispatch(cartRemoveItem(id));
}

export const resetCart = () => (dispatch) => {
  dispatch(clearCart());
}

export const setExpress = (value) => (dispatch) => {
  dispatch(setExpressShipping(value));
}
