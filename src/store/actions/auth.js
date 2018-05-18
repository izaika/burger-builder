import axios from 'axios';

import * as actionTypes from './actionTypes';
import secret from '../../secret';

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authSuccess = authData => ({ type: actionTypes.AUTH_SUCCESS, authData });
export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const auth = (email, password, isSignup) => async dispatch => {
  dispatch(authStart());
  try {
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
    if (!isSignup) url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';

    const response = await axios({
      method: 'post',
      url,
      params: { key: secret.authFirebaseKey },
      data: { email, password, returnSecureToken: true }
    });
    console.log(response.data);
    dispatch(authSuccess(response.data));
  } catch (e) {
    console.error(e);
    dispatch(authFail(e));
  }
};
