import axios from 'axios';

import * as actionTypes from './actionTypes';
import secret from '../../secret';

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authSuccess = (idToken, userId) => ({ type: actionTypes.AUTH_SUCCESS, idToken, userId });
export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () => ({ type: actionTypes.AUTH_LOGOUT });

export const checkAuthTimeout = expirationTime => async dispatch => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
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
    console.log(response.data);
    dispatch(authSuccess(response.data.idToken, response.data.localId));
    dispatch(checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};
