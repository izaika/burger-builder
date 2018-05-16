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

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => async dispatch => {
  dispatch(fetchOrdersStart());
  try {
    const response = await axios.get('/orders.json');
    const responseData = response.data;
    const orders = [];
    for (const key in responseData) {
      orders.push({ ...responseData[key], id: key });
    }
    dispatch(fetchOrdersSuccess(orders));
  } catch (e) {
    dispatch(fetchOrdersFail(e));
  }
};
