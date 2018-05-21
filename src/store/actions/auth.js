import axios from 'axios';

import * as actionTypes from './actionTypes';
import secret from '../../secret';

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authSuccess = (idToken, userId) => ({ type: actionTypes.AUTH_SUCCESS, idToken, userId });
export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return { type: actionTypes.AUTH_LOGOUT };
};

export const checkAuthTimeout = expirationDate => async dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationDate * 1000);
};

export const auth = (email, password, isSignup) => async dispatch => {
  dispatch(authStart());
  try {
    const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
    const response = await axios({
      method: 'post',
      url: isSignup ? `${baseUrl}/signupNewUser` : `${baseUrl}/verifyPassword`,
      params: { key: secret.authFirebaseKey },
      data: { email, password, returnSecureToken: true }
    });
    const { data } = response;
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('expirationDate', new Date(new Date().getTime() + data.expiresIn * 1000));
    localStorage.setItem('userId', data.localId);
    dispatch(authSuccess(data.idToken, data.localId));
    dispatch(checkAuthTimeout(data.expiresIn));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};

export const setAuthRedirectPath = path => ({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path });

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) return dispatch(logout());

  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  if (expirationDate <= new Date()) {
    dispatch(logout());
  } else {
    dispatch(authSuccess(token, localStorage.getItem('userId')));
    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
  }
};
