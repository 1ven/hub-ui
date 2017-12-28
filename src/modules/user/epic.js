import { push } from "react-router-redux";
import { combineEpics } from "redux-observable";
import { replaceParams } from "core/utils";
import paths from "routes/paths";
import * as types from "./types";
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
  action$ =>
    action$.ofType(types.AUTHORIZATION_REDIRECT).map(({ payload }) => {
      const firstWorkspace = payload.workspaces[0];

      if (!firstWorkspace) {
        return push(paths.noWorkspaces);
      }

      return push(
        replaceParams(paths.workspace, {
          // TODO: not expose workspace internals
          org: firstWorkspace.assigned_to,
          slug: firstWorkspace.slug
        })
      );
    })
);
