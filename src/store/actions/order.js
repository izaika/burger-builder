import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData
});

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });
export const purchaseBurgerStart = () => ({ type: actionTypes.PURCHASE_BURGER_START });
export const purchaseBurgerFail = error => ({ type: actionTypes.PURCHASE_BURGER_FAIL, error });
export const purchaseBurger = (data, token) => ({ type: actionTypes.PURCHASE_BURGER, data, token });

export const fetchOrders = (token, userId) => ({ type: actionTypes.FETCH_ORDERS, token, userId });
export const fetchOrdersStart = () => ({ type: actionTypes.FETCH_ORDERS_START });
export const fetchOrdersSuccess = orders => ({ type: actionTypes.FETCH_ORDERS_SUCCESS, orders });
export const fetchOrdersFail = error => ({ type: actionTypes.FETCH_ORDERS_FAIL, error });
