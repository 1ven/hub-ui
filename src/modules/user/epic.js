import { push } from "react-router-redux";
import { combineEpics } from "redux-observable";
import { replaceParams } from "core/utils";
import paths from "routes/paths";
import * as types from "./types";
import * as api from "./api";
import { isAuthenticated } from "./selectors";
import { authenticationRedirect } from "./actions";

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

      return push(paths.main);
    }),
  (action$, store) =>
    action$.ofType(types.AUTHORIZATION_REDIRECT).map(() => {
      const state = store.getState();
      const user = api.fetchUser.selectors.data(state);

      if (!user) {
        return authenticationRedirect();
      }

      const firstWorkspace = user.workspaces[0];

      if (!firstWorkspace) {
        return push(paths.noWorkspaces);
      }

      return push(
        replaceParams(paths.workspace, {
          org: firstWorkspace.assigned_to,
          slug: firstWorkspace.slug
        })
      );
    })
);
