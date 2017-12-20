import { push } from "react-router-redux";
import { combineEpics } from "redux-observable";
import * as types from "./types";
import { isAuthenticated } from "./selectors";
import { authenticationRedirect } from "./actions";
import { paths } from "gateway";

export default combineEpics(
  action$ =>
    action$
      .ofType(types.AUTHENTICATE, types.UNAUHTENTICATE)
      .mapTo(authenticationRedirect()),
  (action$, store) =>
    action$.ofType(types.AUTHENTICATION_REDIRECT).map(() => {
      const state = store.getState();

      if (!isAuthenticated(state)) {
        return push(paths.login);
      }
    })
);
