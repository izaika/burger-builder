import axios from 'axios';
import { delay } from 'redux-saga';
// import { put, call } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';

import secret from '../../secret';
import * as actions from '../actions';

export function* logoutSaga(action) {
  // yield call([localStorage, 'removeItem'], 'token'); // allows to test generators
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationDate * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  const { email, password, isSignup } = action;

  yield put(actions.authStart());
  const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  try {
    const response = yield axios({
      method: 'post',
      url: isSignup ? `${baseUrl}/signupNewUser` : `${baseUrl}/verifyPassword`,
      params: { key: secret.authFirebaseKey },
      data: { email, password, returnSecureToken: true }
    });
    const { data } = response;
    yield localStorage.setItem('token', data.idToken);
    yield localStorage.setItem('expirationDate', yield new Date(new Date().getTime() + data.expiresIn * 1000));
    yield localStorage.setItem('userId', data.localId);
    yield put(actions.authSuccess(data.idToken, data.localId));
    yield put(actions.checkAuthTimeout(data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) return yield put(actions.logout());
  const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

  if (expirationDate <= new Date()) {
    yield put(actions.logout());
  } else {
    yield put(actions.authSuccess(token, yield localStorage.getItem('userId')));
    yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
  }
}
