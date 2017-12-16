import { push } from "react-router-redux";
import { combineEpics } from "redux-observable";
import * as types from "./types";
import { isAuthenticated } from "./selectors";
import { protectRedirect } from "./actions";
import { paths } from "gateway";

// TODO: should it be in `protect` hoc instead?
export default combineEpics(
  action$ =>
    action$
      .ofType(types.AUTHENTICATE, types.UNAUHTENTICATE)
      .mapTo(protectRedirect()),
  (action$, store) =>
    action$.ofType(types.PROTECT_REDIRECT).map(() => {
      const state = store.getState();

      if (!isAuthenticated(state)) {
        return push(paths.login);
      }

      // TODO: redirect on last workspace / getting started page
      // return push(rootRoutes.workspace);
      return push("/w/1ven-org/front-end");
    })
);
