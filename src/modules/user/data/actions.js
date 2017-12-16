import * as types from "./types";

export const authenticate = token => ({
  type: types.AUTHENTICATE,
  payload: { token }
});

export const unauthenticate = () => ({
  type: types.UNAUHTENTICATE
});

export const protectRedirect = () => ({
  type: types.PROTECT_REDIRECT
});
