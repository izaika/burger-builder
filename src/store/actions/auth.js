import * as actionTypes from './actionTypes';

export const authCheckState = () => ({ type: actionTypes.AUTH_CHECK_STATE });
export const authStart = () => ({ type: actionTypes.AUTH_START });
export const auth = (email, password, isSignup) => ({ type: actionTypes.AUTH_USER, email, password, isSignup });
export const authSuccess = (idToken, userId) => ({ type: actionTypes.AUTH_SUCCESS, idToken, userId });
export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });
export const checkAuthTimeout = expirationDate => ({ type: actionTypes.AUTH_CHECK_TIMEOUT, expirationDate });

export const logout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });
export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

export const setAuthRedirectPath = path => ({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path });
