import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData
});

export const purchaseBurgerStart = () => ({ type: actionTypes.PURCHASE_BURGER_START });
export const purchaseBurgerFail = error => ({ type: actionTypes.PURCHASE_BURGER_FAIL, error });

export const purchaseBurger = orderData => async dispatch => {
  dispatch(purchaseBurgerStart());
  try {
    const response = await axios.post('/orders.json', orderData);
    console.log(response.data);
    dispatch(purchaseBurgerSuccess(response.data, orderData.name));
  } catch (e) {
    console.error(e);
    dispatch(purchaseBurgerFail(e));
  }
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});
