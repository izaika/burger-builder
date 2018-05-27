import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  const { data, token } = action;
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios({
      method: 'post',
      url: '/orders.json',
      params: { auth: token },
      data
    });
    yield put(actions.purchaseBurgerSuccess(response.data, data.name));
  } catch (e) {
    yield put(actions.purchaseBurgerFail(e));
  }
}

export function* fetchOrdersSaga(action) {
  const { token, userId } = action;
  yield put(actions.fetchOrdersStart());
  try {
    const response = yield axios({
      url: '/orders.json',
      params: {
        auth: token,
        orderBy: '"userId"',
        equalTo: `"${userId}"`
      }
    });
    const responseData = response.data;
    const orders = [];
    for (const key in responseData) {
      orders.push({ ...responseData[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(orders));
  } catch (e) {
    yield put(actions.fetchOrdersFail(e));
  }
}
