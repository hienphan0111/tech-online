import axios from 'axios';

import { setProducts, setProduct, setLoading, setError, productReviewed, resetError } from '../slices/product';

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get('api/products');
    dispatch(setProducts(data));
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

export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
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

export const createProductReview = (productId, userId, comment, rating, title) => async (dispatch, getState) => {

  dispatch(setLoading(true));
  const { user: {userInfo},} = getState();
  
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
    };
    const {data} = await axios.put(`/api/products/reviews/${productId}`, { comment, userId, rating, title }, config);
    dispatch(productReviewed(data));
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

export const resetProductError = () => async(dispatch) => {
  dispatch(resetError());
};
