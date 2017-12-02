import { push } from "react-router-redux";
import { combineEpics } from "redux-observable";
import * as types from "./types";
import { isAuthenticated } from "./selectors";
import { protectRedirect } from "./actions";
import { routes as authRoutes } from "application/routes/auth";
import { routes as rootRoutes } from "application/routes";

export default combineEpics(
  action$ =>
    action$
      .ofType(types.AUTHENTICATE, types.UNAUHTENTICATE)
      .mapTo(protectRedirect()),
  (action$, store) =>
    action$.ofType(types.PROTECT_REDIRECT).map(() => {
      const state = store.getState();

      if (!isAuthenticated(state)) {
        return push(authRoutes.login);
      }

      return push(rootRoutes.workspaces);
    })
);
